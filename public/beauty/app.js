import {products} from './catalog.js?v=vaseline-webp-1';
const enhancements=document.createElement('script');enhancements.type='module';enhancements.src='/beauty/enhancements.js?v=skin1004-1';document.head.append(enhancements);
const $=s=>document.querySelector(s), money=n=>new Intl.NumberFormat('en-EG',{maximumFractionDigits:2}).format(n)+' EGP';
let en=localStorage.getItem('beauty-language')==='en', category='All',brand='All',query='',sort='featured',bag={};
const brandNames = [...new Set(products.map(product => product.brand))];
const staticPreview = location.pathname.endsWith('/beauty/index.html');
const beautyBase = staticPreview ? '/beauty/index.html' : '/beauty';
const urlParams = new URLSearchParams(location.search);
const brandUrl = name => beautyBase + '?brand=' + encodeURIComponent(name);
function mountFloatingSeal(){
  if(document.querySelector('.floating-company-seal')) return;
  const seal=document.createElement('a');
  seal.className='floating-company-seal';
  seal.href=beautyBase;
  seal.setAttribute('aria-label',t('العودة إلى كل البراندات','Back to all brands'));
  seal.title=t('Refots Beauty','Refots Beauty');
  seal.innerHTML='<img src="/beauty/assets/refots-beauty-company-seal.jpg" alt="Refots Beauty">';
  document.body.append(seal);
}
const requestedBrand = urlParams.get('brand');
if (products.some(product => product.brand === requestedBrand)) brand = requestedBrand;
try{bag=JSON.parse(localStorage.getItem('beauty-cart')||'{}')}catch{}
bag=Object.fromEntries(Object.entries(bag).filter(([id,q])=>products.some(p=>p.id===id)&&Number.isInteger(q)&&q>0&&q<=99));
const t=(ar,eng)=>en?eng:ar;
const cats={'All':'الكل','Serums':'السيرومات','Moisturizers':'المرطبات','Toners':'التونر والبادز','Cleansers':'الغسول','Mists':'الميست','Sun care':'الحماية من الشمس','Lip care':'العناية بالشفاه','Masks':'الماسكات','Sets':'المجموعات','Essences':'الإيسنس','Eye care':'العناية بالعين','Body care':'العناية بالجسم','Deodorants':'مزيلات العرق','Hair care':'العناية بالشعر'};
function save(){localStorage.setItem('beauty-cart',JSON.stringify(bag));$('#count').textContent=Object.values(bag).reduce((a,b)=>a+b,0)}
function add(id){bag[id]=Math.min(99,(bag[id]||0)+1);save();$('#toast').textContent=t('اتضاف لحقيبتك','Added to your bag');$('#toast').classList.add('show');setTimeout(()=>$('#toast').classList.remove('show'),1800)}
const productUrl=p=>staticPreview
  ? beautyBase+'?product='+encodeURIComponent(p.id)
  : `/beauty/${(p.brand||'ANUA').toLowerCase().replace(/[^a-z0-9]+/g,'-')}/${p.id}`;
function brandHero() {
  const covers = {
    ANUA: 'peach-70-niacin-serum',
    Arencia: 'arencia-fresh-green-rice-mochi-cleanser',
    COSRX: 'cosrx-advanced-snail-96-mucin-power-essence'
  };
  const collections = brandNames.map(name => {
    const items = products.filter(product => product.brand === name);
    return { name, count: items.length, cover: items.find(item => item.id === covers[name]) || items[0] };
  });
  const tiles = collections.map(({name, count}, index) => {
    return `<a class="brand-tile" href="${brandUrl(name)}"${brand === name ? ' aria-current="page"' : ''}>
      <span class="brand-surface">
        <span class="brand-index" aria-hidden="true">0${index + 1}</span>
        <span class="brand-info"><strong dir="ltr">${name}</strong><span>${count} ${t('منتج', 'products')}</span></span>
        <span class="brand-arrow" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6h12v12"/></svg></span>
      </span>
    </a>`;
  });
  const heading = t('اختاري البراند الي يناسبك 😊❤️', 'Choose the brand that suits you 😊❤️');
  const portraits = collections.slice(0, 3).map(({cover}) =>
    `<img src="${cover.image}" alt="${cover.name}">`
  ).join('');
  return `<section class="hero directory-hero">
    <div class="hero-copy">
      <span class="eyebrow" dir="ltr">REFOTS BEAUTY · ${collections.map(item => item.name).join(' + ')}</span>
      <div class="original-products-wrap"><span class="original-products-badge" dir="ltr"><svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2 14.6 9.4 22 12 14.6 14.6 12 22 9.4 14.6 2 12 9.4 9.4Z" fill="currentColor"/></svg>ORIGINAL PRODUCTS</span></div>
      <h1>${t('لحظتكِ الهادئة.<br>إشراقتكِ الخاصة.', 'A little ritual.<br>A brighter you.')}<em dir="ltr">Beautifully, you.</em></h1>
      <div class="brand-directory" id="brands">
        <h2>${heading}</h2>
        <div class="brand-tiles">${tiles.join('')}</div>
      </div>
    </div>
    <div class="hero-art">
      <span class="bigtype" aria-hidden="true">${[...'Refots'].map(letter => `<span class="hero-letter">${letter}</span>`).join('')}</span>
      <div class="hero-portraits">${portraits}</div>
      <span class="art-caption" dir="ltr">YOUR EVERYDAY BEAUTY RITUAL</span>
    </div>
  </section>`;
}
function cards(){let list=products.filter(p=>(brand==='All'||p.brand===brand)&&(category==='All'||p.category===category)&&p.name.toLowerCase().includes(query.toLowerCase()));if(sort!=='featured')list.sort((a,b)=>sort==='low'?a.price-b.price:b.price-a.price);$('#grid').innerHTML=list.map(p=>`<article class="card"><a class="photo" href="${productUrl(p)}"><img src="${p.image}" alt="${p.name}" loading="lazy" decoding="async" width="700" height="900"></a><small>${p.brand} · ${en?p.category:cats[p.category]} · ${p.size}</small><h3><a href="${productUrl(p)}">${p.name}</a></h3><div class="card-bottom"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}">${t('أضيفي للحقيبة','Add to bag')}</button></div></article>`).join('')||`<p class="empty">${t('لا توجد نتائج','No matching products')}</p>`;$('#results').textContent=`${list.length} ${t('منتج','products')}`}
function render(){document.documentElement.lang=en?'en':'ar';document.documentElement.dir=en?'ltr':'rtl';$('#language').textContent=en?'عربي':'EN';let slug=urlParams.get('product')||location.pathname.replace(/\/$/,'').split('/')[3];const p=products.find(p=>p.id===slug);if(slug&&!p){$('#main').innerHTML='<section class="detail"><h1>Product not found</h1><a href="'+beautyBase+'">View collection</a></section>';return}if(p){document.title=p.name+' | Refots Beauty';$('#main').innerHTML=`<section class="detail"><a class="crumb" href="${brandUrl(p.brand)}">${t('المجموعة','Collection')} / ${p.brand||'ANUA'}</a><div class="detail-grid"><div class="detail-photo"><img src="${p.image}" alt="${p.name}"></div><div><span class="eyebrow">REFOTS BEAUTY · ${p.brand||'ANUA'} EDIT</span><h1>${p.name}</h1><p>${en?p.category:cats[p.category]} · ${p.size}</p><div class="price">${money(p.price)}</div><button class="primary" data-add="${p.id}">${t('أضيفي إلى حقيبتك','Add to your bag')}</button><p class="details-note">${t('اختيارك من مجموعة '+(p.brand||'ANUA')+' لدى Refots Beauty. أضيفي المنتج إلى حقيبتك وأكملي بياناتك لإرسال طلب الشراء.','Your selection from the '+(p.brand||'ANUA')+' collection at Refots Beauty. Add it to your bag and complete your details to request an order.')}</p><p class="note">${t('السعر بالجنيه المصري. التوفر والشحن يتم تأكيدهما عند التواصل.','Prices in Egyptian pounds. Availability and delivery are confirmed when we contact you.')}</p></div></div></section>`;return}
if (brand === 'All') {
  document.title = 'Refots Beauty | ' + t('اختاري البراند الي يناسبك 😊❤️', 'Choose your brand 😊❤️');
  $('#main').innerHTML = brandHero();
  return;
}
document.title = brand + ' | Refots Beauty';
const brandCategories = new Set(products.filter(item => item.brand === brand).map(item => item.category));
$('#main').innerHTML=brandHero()+`<section class="collection" id="collection"><a class="back-brands" href="/beauty">${t('كل البراندات','All brands')}</a><div class="heading"><div><h1 dir="ltr">${brand}</h1><p id="results"></p></div><div class="tools"><input id="search" aria-label="Search products" placeholder="${t('ابحثي باسم المنتج…','Find your product…')}"><select id="sort" aria-label="Sort"><option value="featured">${t('ترتيب المجموعة','Collection order')}</option><option value="low">${t('السعر: الأقل أولًا','Price: low to high')}</option><option value="high">${t('السعر: الأعلى أولًا','Price: high to low')}</option></select></div></div><div class="filters">${Object.entries(cats).filter(([key]) => key === 'All' || brandCategories.has(key)).map(([k,v])=>`<button data-cat="${k}" class="${category===k?'active':''}">${en?k:v}</button>`).join('')}</div><div class="grid" id="grid"></div></section>`;cards();$('#search').oninput=e=>{query=e.target.value;cards()};$('#sort').onchange=e=>{sort=e.target.value;cards()}}
function cart(){$('#submit').hidden=false;$('#notice').textContent='';$('#wa-fallback').hidden=true;const items=products.filter(p=>bag[p.id]);$('#cart-title').textContent=t('حقيبتكِ','Your bag');$('#cart-items').innerHTML=items.map(p=>`<div class="cart-row"><img src="${p.image}" alt=""><div><p>${p.name} · ${p.size}</p><p>${money(p.price)}</p><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease quantity">−</button><span class="qty">${bag[p.id]}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase quantity">+</button></div></div>`).join('')||t('حقيبتك لسه فاضية. اختاري أول منتج.','Your bag is empty. Discover your first product.');$('#checkout').hidden=!items.length;$('#order-total').textContent=t('إجمالي المنتجات: ','Products total: ')+money(items.reduce((s,p)=>s+p.price*bag[p.id],0));}
document.addEventListener('click',e=>{const a=e.target.closest('[data-add]');if(a)add(a.dataset.add);const c=e.target.closest('[data-cat]');if(c){category=c.dataset.cat;document.querySelectorAll('[data-cat]').forEach(b=>b.classList.toggle('active',b===c));cards()}const q=e.target.closest('[data-qty]');if(q){bag[q.dataset.qty]=Math.min(99,bag[q.dataset.qty]+Number(q.dataset.delta));if(!bag[q.dataset.qty])delete bag[q.dataset.qty];save();cart()}});
$('#language').onclick=()=>{en=!en;localStorage.setItem('beauty-language',en?'en':'ar');render()};$('#bag').onclick=()=>{cart();$('#cart').showModal()};$('.close').onclick=()=>$('#cart').close();
let orderKey=null, orderSignature='';$('#checkout').onsubmit=async e=>{e.preventDefault();const b=$('#submit');b.disabled=true;$('#notice').textContent=t('جارٍ تسجيل الطلب…','Submitting…');const data=Object.fromEntries(new FormData(e.target));const items=products.filter(p=>bag[p.id]).map(p=>({id:p.id,quantity:bag[p.id]}));const total=items.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.quantity,0);const message=['Refots Beauty — order',data.name,data.phone,data.city,data.address,...items.map(i=>{const p=products.find(p=>p.id===i.id);return `${p.name} ${p.size} × ${i.quantity} — ${money(p.price*i.quantity)}`}),`Total: ${money(total)} (delivery to be confirmed)`].join('\n');const link='https://wa.me/201557022071?text='+encodeURIComponent(message);const fallback=$('#wa-fallback');fallback.href=link;fallback.hidden=false;const signature=JSON.stringify({...data,items});if(signature!==orderSignature){orderSignature=signature;orderKey=crypto.randomUUID()}orderKey ||= crypto.randomUUID();try{const r=await fetch('/api/beauty-order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...data,items,orderKey})});if(!r.ok)throw new Error();$('#notice').textContent=t('تم إرسال الطلب بالإيميل. افتحي واتساب واضغطي إرسال لتأكيد الرسالة.','Order emailed. Open WhatsApp and tap Send to send your message.');fallback.click();bag={};save();orderKey=null;b.hidden=true;}catch{$('#notice').textContent=t('تعذر إرسال الإيميل. طلبك محفوظ في الحقيبة؛ افتحي واتساب بالزر أدناه لإرساله.','Email delivery failed. Your bag is saved; use WhatsApp below to send your order.')}finally{b.disabled=false}};
window.__beautyAdd=add;window.__beautyCart=cart;
mountFloatingSeal();save();render();
