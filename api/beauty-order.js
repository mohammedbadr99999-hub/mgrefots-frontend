import {products} from '../public/beauty/catalog.js';
export default async function handler(req,res){
 if(req.method!=='POST'){res.setHeader('Allow','POST');return res.status(405).json({ok:false})}
 const b=req.body||{},clean=(v,n)=>String(v||'').trim().slice(0,n);
 if(b.website)return res.status(400).json({ok:false});
 const name=clean(b.name,100),phone=clean(b.phone,24),city=clean(b.city,80),address=clean(b.address,300);
 if(!name||!city||!address||!/^\+?[0-9 ().-]{7,24}$/.test(phone)||!Array.isArray(b.items)||!b.items.length||b.items.length>products.length||!(/^[a-f0-9-]{36}$/i.test(b.orderKey||'')))return res.status(400).json({ok:false});
 const items=b.items.map(i=>({p:products.find(p=>p.id===i.id),q:i.quantity}));
 if(items.some(i=>!i.p||!Number.isInteger(i.q)||i.q<1||i.q>99)||new Set(b.items.map(i=>i.id)).size!==b.items.length)return res.status(400).json({ok:false});
 if(!process.env.RESEND_API_KEY)return res.status(503).json({ok:false});
 const total=items.reduce((s,i)=>s+i.p.price*i.q,0),text=['Refots Beauty — ANUA order',`Reference: ${b.orderKey}`,`Name: ${name}`,`Phone: ${phone}`,`City: ${city}`,`Address: ${address}`,...items.map(i=>`${i.p.name} ${i.p.size} × ${i.q}: ${i.p.price*i.q} EGP`),`Products total: ${total} EGP`,'Confirm stock, delivery charge and payment with the customer.'].join('\n');
 try{const result=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`beauty-${b.orderKey}`},body:JSON.stringify({from:process.env.RESEND_FROM_EMAIL||'MGREFOTS Orders <orders@notifications.mgrefots.com>',to:['info@mgrefots.com'],subject:`Refots Beauty order — ${b.orderKey}`,text})});return res.status(result.ok?200:502).json({ok:result.ok,total:result.ok?total:undefined})}catch{return res.status(502).json({ok:false})}
}
