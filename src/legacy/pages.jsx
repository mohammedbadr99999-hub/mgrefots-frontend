import React, { useState } from 'react';
import { pricesFor, currencyFor, productImage, productSpec } from '../market';
import { ArrowRight, BookOpen, CheckCircle2, FlaskConical, MessageCircle, Search, ShieldCheck } from 'lucide-react';
import { PRODUCTS as OLD_PRODUCTS } from './data/products';
import { SUPPLEMENT_ENCYCLOPEDIA } from './data/supplementEncyclopediaData';
import { FEATURED_GUIDES, KNOWLEDGE_ARTICLES, KNOWLEDGE_CATEGORIES, KNOWLEDGE_FAQS } from './data/knowledgeCenterData';
import { faqData } from './data/faqData';
import { manufacturingStandards, productEducation } from './productEducation';
import { customerProvidedEducation, customerProvidedEducationEnglish } from './customerProvidedEducation';

const words = {
  en: { discover:'Explore more from MGREFOTS', browse:'Browse products', read:'Read the guide', details:'Product details', ask:'Ask about availability', related:'Related product', usage:'Directions', ingredients:'Ingredients', facts:'Supplement facts', benefits:'Highlights', science:'More information', references:'References', question:'Questions and answers', articles:'Articles', guides:'Guides', search:'Search', all:'All', contact:'Contact us', send:'Send on WhatsApp', noResults:'No matching results', choose:'Choose a category', analysis:'InBody analysis', chat:'Ask MGREFOTS', submit:'Analyze scan', sending:'Working…', unavailable:'Answers are not available right now. Please contact us on WhatsApp.', file:'Upload an InBody image or PDF', goal:'Tell us your goal', learning:'Educational content; confirm personal health decisions with a qualified professional.', home:'Back to shop', rating:'Customer rating', more:'Show more information', less:'Show less', goalTitle:'Who is this information for?', training:'Muscle gain', fatLoss:'Fat loss', fitness:'Fitness and sport', women:'Women', older:'Older adults', orderProduct:'Order this product', standards:'Manufacturing standards', coa:'Certificate of Analysis (COA)', coaFull:'Certificate of Analysis', coaPage:'View certificate and test results', coaNote:'', coaContents:'What the certificate reports', batch:'Batch', assay:'Creatine assay', particle:'Particle size', metals:'Heavy metals', micro:'Microbiology', conclusion:'Conclusion', zoom:'Open full-size image', sold:'sold' },
  ar: { discover:'اكتشف المزيد من MGREFOTS', browse:'تصفح المنتجات', read:'اقرأ الدليل', details:'تفاصيل المنتج', ask:'استفسر عن التوفر', related:'منتج مرتبط', usage:'طريقة الاستخدام', ingredients:'المكونات', facts:'حقائق المكمل', benefits:'أبرز المميزات', science:'معلومات إضافية', references:'المراجع', question:'أسئلة وإجابات', articles:'مقالات', guides:'أدلة', search:'بحث', all:'الكل', contact:'تواصل معنا', send:'أرسل عبر واتساب', noResults:'لا توجد نتائج مطابقة', choose:'اختر تصنيفًا', analysis:'تحليل InBody', chat:'اسأل MGREFOTS', submit:'حلّل التقرير', sending:'جارٍ العمل…', unavailable:'الإجابات غير متاحة الآن. تواصل معنا عبر واتساب.', file:'ارفع صورة أو PDF لتقرير InBody', goal:'اكتب هدفك', learning:'محتوى تثقيفي؛ راجع مختصًا في القرارات الصحية الشخصية.', home:'العودة للمتجر', rating:'تقييم العملاء', more:'عرض المزيد', less:'عرض معلومات أقل', goalTitle:'', training:'زيادة العضلات', fatLoss:'خفض الدهون', fitness:'اللياقة والرياضة', women:'السيدات', older:'كبار السن', orderProduct:'اطلب هذا المنتج', standards:'معايير التصنيع', coa:'شهادة تحليل (COA)', coaFull:'Certificate of Analysis', coaPage:'عرض الشهادة ونتائج الاختبار', coaNote:'', coaContents:'ماذا توضح الشهادة؟', batch:'رقم الدفعة', assay:'نسبة الكرياتين', particle:'حجم الجزيئات', metals:'المعادن الثقيلة', micro:'الفحوص الميكروبية', conclusion:'النتيجة', zoom:'افتح الصورة بالحجم الكامل', sold:'مبيعات' },
  rw: { discover:'Menya byinshi kuri MGREFOTS', browse:'Reba ibicuruzwa', read:'Soma inyoborabumenyi', details:'Amakuru y’igicuruzwa', ask:'Baza niba gihari', related:'Igicuruzwa kijyanye', usage:'Uko gikoreshwa', ingredients:'Ibigize', facts:'Amakuru y’inyongeramirire', benefits:'Ibyiza', science:'Andi makuru', references:'Inkomoko', question:'Ibibazo n’ibisubizo', articles:'Inyandiko', guides:'Inyoborabumenyi', search:'Shakisha', all:'Byose', contact:'Twandikire', send:'Ohereza kuri WhatsApp', noResults:'Nta bisubizo', choose:'Hitamo icyiciro', analysis:'Isuzuma rya InBody', chat:'Baza MGREFOTS', submit:'Suzuma raporo', sending:'Birakorwa…', unavailable:'Ubu ntidushobora gusubiza. Twandikire kuri WhatsApp.', file:'Shyiraho ifoto cyangwa PDF ya InBody', goal:'Andika intego yawe', learning:'Amakuru yo kwiga; baza inzobere ku byerekeye ubuzima bwawe.', home:'Subira ku iduka', rating:'Amanota y’abakiriya', more:'Reba andi makuru', less:'Hisha andi makuru', goalTitle:'Aya makuru agenewe ba nde?', training:'Kongera imikaya', fatLoss:'Kugabanya ibinure', fitness:'Siporo n’ubuzima bwiza', women:'Abagore', older:'Abakuze', orderProduct:'Tumiza iki gicuruzwa', standards:'Ibipimo by’inganda', coa:'Icyemezo cy’isesengura (COA)', coaFull:'Certificate of Analysis', coaPage:'Reba icyemezo n’ibyapimwe', coaNote:'', coaContents:'Ibyo icyemezo kivuga', batch:'Batch', assay:'Creatine yapimwe', particle:'Ingano y’uduce', metals:'Ibyuma biremereye', micro:'Ibizamini bya mikorobe', conclusion:'Umwanzuro', zoom:'Fungura ifoto yuzuye', sold:'byaguzwe' },
};
const local = (v, lang) => v?.[lang] || v?.en || '';
const whatsapp = msg => `https://wa.me/250792294432?text=${encodeURIComponent(msg)}`;
const ids = ['creatine', 'citrulline', 'czinc', 'carnitine', 'b-complex'];
const oldIds = ['creatine-monohydrate', 'citrulline', 'c-zinc', 'l-carnitine', null];
const currentCategories = ['power', 'pump', 'immunity', 'energy', 'immunity'];
const legacyExtras = OLD_PRODUCTS.filter(p => ['protein-pea-rice'].includes(p.id));

function Heading({ eyebrow, title, subtitle }) {
  return <div className="legacy-heading"><p className="section-kicker">{eyebrow || 'MGREFOTS · KIGALI'}</p><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>;
}
function Action({ href, children, outline=false }) {
  return <a className={`btn ${outline ? 'btn-outline' : 'btn-gold'}`} href={href}>{children}<ArrowRight size={16} /></a>;
}
function frame(children) { return <div className="container legacy-content">{children}</div>; }

function currentProducts(t, market, lang) {
  return ids.map((id, i) => ({
    id, name:t.names[i], description:t.descriptions[i], spec:productSpec(id,market,t.specs[i],lang), price:pricesFor(market,t)[i], category:currentCategories[i],
    image:productImage(id,market), sales:t.sales?.[i],
    old: OLD_PRODUCTS.find(p => p.id === oldIds[i]), orderable:true,
  }));
}
function extraProducts(lang) {
  return legacyExtras.map(p => ({
    id:p.id, name:local(p.name, lang), description:lang==='ar'?'من الكتالوج السابق؛ استفسر عن التوفر والمواصفات الحالية.':'From the previous catalogue; ask us to confirm current availability and specifications.',
    spec:`${p.size} · ${p.servings}`, image:`/legacy-products/${p.id}.png`,
    old:p, category:p.category, orderable:false,
  }));
}
function ProductTile({ product, lang, market }) {
  const w=words[lang];
  return <article className="legacy-product-card">
    <a href={`/products/${product.id}`}><img src={product.image} alt={product.name} loading="lazy" /></a>
    <div><h3><a href={`/products/${product.id}`}>{product.name}</a></h3><small>{product.spec}</small>{product.id==='citrulline'&&market==='EG'&&<strong className="serving-highlight">{lang==='ar'?'سيترولين نقي · ٥ جم للحصة':'Pure L-Citrulline · 5 g per serving'}</strong>}<p>{product.description}</p>
      {product.sales && <p className="legacy-sales">{product.sales} {lang==='ar'?'مبيعات':lang==='rw'?'byaguzwe':'sold'}</p>}
      {product.orderable ? <strong>{product.price.toLocaleString('en-US')} {currencyFor(market)}</strong> : <span className="legacy-muted">{w.ask}</span>}
    </div>
    <Action href={`/products/${product.id}`}>{w.details}</Action>
  </article>;
}
export function WelcomePage({ lang, t }) {
  const w=words[lang];
  const sections=[
    ['/products',w.browse,'Five current products, details and availability.','المنتجات الحالية، تفاصيلها والتوفر.'],
    ['/knowledge',lang==='ar'?'مركز المعرفة':'Knowledge Center','Guides, articles and frequently asked questions.','الأدلة والمقالات والأسئلة الشائعة.'],
    ['/analysis',w.analysis,'Upload a scan and describe your goal.','ارفع التقرير واكتب هدفك.'],
    ['/supplements',lang==='ar'?'موسوعة المكملات':'Supplement Encyclopedia','Learn about 15 nutrients and supplements.','معلومات عن ١٥ عنصرًا ومكملًا.'],
    ['/chat',w.chat,'Ask a question about training or nutrition.','اسأل عن التغذية أو التدريب.'],
    ['/faq',lang==='ar'?'الأسئلة الشائعة':'FAQ','Ordering, products and services.','الطلب والمنتجات والخدمات.'],
  ];
  return frame(<><Heading title={w.discover} subtitle={t.intro} />
    <div className="legacy-feature-grid">{sections.map(([href,title,en,ar])=><a className="legacy-feature" href={href} key={href}><BookOpen size={24}/><h2>{title}</h2><p>{lang==='ar'?ar:en}</p><span>{w.read}<ArrowRight size={15}/></span></a>)}</div>
    <div className="legacy-link-row"><Action href="/about" outline>{t.about}</Action><Action href="/contact" outline>{t.contact}</Action><Action href="/order">{t.orderNav}</Action></div>
  </>);
}
export function ProductsPage({ lang,t,market }) {
  const w=words[lang], [category,setCategory]=useState('all');
  const products=[...currentProducts(t,market,lang),...extraProducts(lang)];
  const cats=[['all',w.all],['power',lang==='ar'?'القوة':'Power'],['pump',lang==='ar'?'الضخ':'Pump'],['energy',lang==='ar'?'الطاقة':'Energy'],['protein',lang==='ar'?'البروتين':'Protein'],['immunity',lang==='ar'?'المناعة':'Immunity']];
  const filtered=products.filter(p=>category==='all'||p.category===category);
  return frame(<><Heading title={w.browse} subtitle={t.intro} /><div className="legacy-chips" aria-label={w.choose}>{cats.map(([id,label])=><button className={category===id?'active':''} onClick={()=>setCategory(id)} key={id}>{label}</button>)}</div>
    <div className="legacy-product-grid">{filtered.map(p=><ProductTile key={p.id} product={p} lang={lang} market={market}/>)}</div>
    <p className="legacy-note">{lang==='ar'?'منتجا البروتين وB-Complex من الكتالوج القديم للعرض والاستفسار فقط؛ لا يدخلان في طلب الموقع حتى تتأكد إتاحتهما وسعرهما.':'Protein is from the earlier catalogue and is for enquiries only; it is not part of online checkout.'}</p>
  </>);
}
export function ProductDetailPage({ lang,t,slug,market }) {
  const w=words[lang], [expanded,setExpanded]=useState(false);
  const product=[...currentProducts(t,market,lang),...extraProducts(lang)].find(p=>p.id===slug||p.old?.id===slug);
  if(!product)return frame(<><Heading title={lang==='ar'?'المنتج غير موجود':'Product not found'} /><Action href="/products">{w.browse}</Action></>);
  const education=lang==='ar'?customerProvidedEducation[product.id]:lang==='en'?customerProvidedEducationEnglish[product.id]:productEducation[product.id]?.[lang]||productEducation[product.id]?.en;
  const rating=['5.0/5','4.8/5','4.7/5','4.8/5','4.7/5'][ids.indexOf(product.id)];
  const standard=manufacturingStandards[lang]||manufacturingStandards.en;
  const old=product.id==='creatine'?product.old:null;
  return frame(<><p className="legacy-breadcrumb"><a href="/products">{w.browse}</a> / {product.name}</p>
    <div className="legacy-detail-grid product-detail-layout"><aside className="legacy-detail-photo"><img src={product.image} alt={product.name}/>{product.orderable?<div className="product-buy-box"><strong className="legacy-price">{product.price.toLocaleString('en-US')} {currencyFor(market)}</strong><a className="btn btn-gold product-order-cta" href={`/order?product=${product.id}${new URLSearchParams(window.location.search).get('ref')?.toUpperCase() === 'COACH01' ? '&ref=COACH01' : ''}#order-products`}>{w.orderProduct}<ArrowRight size={16}/></a></div>:<Action href={whatsapp(`Hello MGREFOTS, is ${product.name} available?`)}>{w.ask}</Action>}</aside>
      <div className="legacy-detail-copy"><p className="section-kicker">MGREFOTS · {product.spec}</p><h1>{product.name}</h1>{product.id==='citrulline'&&market==='EG'&&<strong className="serving-highlight">{lang==='ar'?'سيترولين نقي · ٥ جم للحصة':'Pure L-Citrulline · 5 g per serving'}</strong>}
        <div className="product-rating" aria-label={`${w.rating}: ${rating}`}><span aria-hidden="true">★★★★★</span><strong>{rating}</strong><small>{w.rating}</small></div>
        {product.sales&&<p className="legacy-sales">{product.sales} {w.sold}</p>}
        <p>{education?.summary||product.description}</p>
      </div></div>
    {education&&<section className="product-education">
      <ul className="product-point-list">{education.points.map(([,description],i)=><li className={i>2&&!expanded?'product-point-hidden':''} key={i}>{description}</li>)}</ul>
      <button className="product-more" type="button" aria-expanded={expanded} onClick={()=>setExpanded(v=>!v)}>{expanded?w.less:w.more}</button>
      {expanded&&<>{lang!=='ar'&&<section className="legacy-info-grid"><div className="legacy-panel"><h3>{w.usage}</h3><p>{education.use}</p></div><div className="legacy-panel"><h3>{w.benefits}</h3><p>{education.note}</p></div></section>}
        {old?.supplementFacts?.length>0&&<section className="legacy-panel"><h2>{w.facts}</h2><div className="legacy-facts">{old.supplementFacts.map((f,i)=><div key={i}><span>{f.ingredient}</span><strong>{f.amount}</strong><span>{f.dv}</span></div>)}</div></section>}
        {lang!=='ar'&&education.sources?.length>0&&<section className="legacy-panel product-references"><h3>{w.references}</h3><ul>{education.sources.map(([title,url])=><li key={url}><a href={url} target="_blank" rel="noreferrer">{title}</a></li>)}</ul></section>}
      </>}
    </section>}
    {product.id==='creatine'&&<section className="legacy-panel coa-card"><h2>{w.coa}</h2><p><a href={`/products/creatine/certificate?lang=${lang}`}>{w.coaPage} <ArrowRight size={15}/></a></p></section>}
    <details className="legacy-panel standards-details"><summary>{w.standards}</summary><p>{standard.intro}</p><ul>{standard.items.map(([title,description])=><li key={title}><strong>{title}:</strong> {description}</li>)}</ul>
      <div className="product-references">{standard.sources.map(([title,url])=><a key={url} href={url} target="_blank" rel="noreferrer">{title}</a>)}</div></details>
    
  </>);
}

export function CreatineCertificatePage({lang='en'}) {
  const w=words[lang]||words.en, image='/certificates/creatine-coa.png';
  const details=lang==='ar'?[
    ['رقم الدفعة','YT20260324 · كمية الدفعة 20,000 كجم'],['نسبة الكرياتين','99.86% (المواصفة ≥99.5%)'],['حجم الجزيئات','98% يمر من منخل 200 mesh'],['المعادن الثقيلة','الإجمالي 2.14 ppm (الحد ≤10 ppm)؛ الرصاص 0.15، الكادميوم 0.24، الزرنيخ 0.31، الزئبق 0.44 ppm'],['الفحوص الميكروبية','إجمالي الأحياء الدقيقة <100 CFU/g؛ الخمائر والعفن <20؛ وE. coli وStaphylococcus aureus وSalmonella غير مكتشفة'],['النتيجة','مطابق للمواصفة بحسب وثيقة المورد. التصنيع 24 مارس 2026، التحليل 27 مارس 2026، والانتهاء 23 مارس 2028. التخزين في مكان بارد وجاف.']
  ]:lang==='rw'?[
    ['Batch','YT20260324 · ingano ya batch 20,000 kg'],['Creatine yapimwe','99.86% (igipimo gisabwa ≥99.5%)'],['Ingano y’uduce','98% inyura kuri 200 mesh'],['Ibyuma biremereye','Byose 2.14 ppm (ntibirenge 10); lead 0.15, cadmium 0.24, arsenic 0.31, mercury 0.44 ppm'],['Mikorobe','Total plate count <100 CFU/g; yeast na mold <20; E. coli, Staphylococcus aureus na Salmonella ntibyabonetse'],['Umwanzuro','Ukurikije inyandiko y’uwatanze ibikoresho, sample yujuje ibisabwa. Yakozwe 24 Werurwe 2026, isuzumwa 27 Werurwe 2026, irangira 23 Werurwe 2028. Bika ahakonje kandi humutse.']
  ]:[
    ['Batch','YT20260324 · batch quantity 20,000 kg'],['Creatine assay','99.86% (specification ≥99.5%)'],['Particle size','98% passes 200 mesh'],['Heavy metals','Total 2.14 ppm (limit ≤10); lead 0.15, cadmium 0.24, arsenic 0.31, mercury 0.44 ppm'],['Microbiology','Total plate count <100 CFU/g; yeast and mold <20; E. coli, Staphylococcus aureus and Salmonella not detected'],['Conclusion','Reported as conforming to specification by the supplier document. Manufactured 24 March 2026, analyzed 27 March 2026, expires 23 March 2028. Store cool and dry.']
  ];
  return frame(<article className="coa-page"><p className="legacy-breadcrumb"><a href={`/products/creatine?lang=${lang}`}>Creatine Monohydrate</a> / {w.coaFull}</p><Heading title={w.coaFull} subtitle="Creatine Monohydrate · YT20260324"/>
    {w.coaNote&&<p className="legacy-note">{w.coaNote}</p>}<a className="coa-image-link" href={image} target="_blank" rel="noreferrer" aria-label={w.zoom}><img src={image} alt="Creatine Monohydrate Certificate of Analysis"/><span>{w.zoom}</span></a>
    <section className="legacy-panel"><h2>{w.coaContents}</h2><div className="coa-facts">{details.map(([label,value])=><div key={label}><strong>{label}</strong><p>{value}</p></div>)}</div></section>
  </article>);
}
function Article({ item,lang }) {
  const w=words[lang], title=local(item.title,lang);
  return <article className="legacy-article"><p className="legacy-breadcrumb"><a href="/knowledge">{w.guides}</a> / {title}</p>
    <Heading eyebrow={item.category} title={title} subtitle={local(item.summary||item.excerpt||item.subtitle,lang)} />
    <p className="legacy-note">{w.learning}</p>
    {item.sections?.map(s=><section className="legacy-panel legacy-prose" id={s.id} key={s.id}><h2>{local(s.title,lang)}</h2><p>{local(s.content,lang)}</p>
      {s.callout&&<aside><strong>{local(s.callout.title,lang)}</strong><p>{local(s.callout.text,lang)}</p></aside>}
      {s.table&&<div className="legacy-table-scroll"><table><thead><tr>{local(s.table.headers,lang)?.map((h,i)=><th key={i}>{h}</th>)}</tr></thead><tbody>{local(s.table.rows,lang)?.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
    </section>)}
    {item.faqs?.length>0&&<section className="legacy-panel"><h2>{w.question}</h2>{item.faqs.map((f,i)=><details key={i}><summary>{local(f.question,lang)}</summary><p>{local(f.answer,lang)}</p></details>)}</section>}
    {item.references?.length>0&&<section className="legacy-panel"><h2>{w.references}</h2><ol>{item.references.map((r,i)=><li key={i}>{r.doiOrUrl?<a href={r.doiOrUrl} target="_blank" rel="noreferrer">{r.title}</a>:r.title} — {r.authors}, {r.year}</li>)}</ol></section>}
    {(!item.sections||item.sections.length===0)&&<p className="legacy-note">{lang==='ar'?'ملخص الدليل متاح حاليًا، والتفاصيل قيد المراجعة.':'The summary is available; full details are under review.'}</p>}
  </article>;
}
export function KnowledgePage({ lang,detailId }) {
  const w=words[lang], [query,setQuery]=useState(''),[category,setCategory]=useState('all');
  if(detailId){const item=[...FEATURED_GUIDES,...KNOWLEDGE_ARTICLES].find(g=>g.id===detailId||g.slug===detailId);return frame(item?<Article item={item} lang={lang}/>:<><Heading title={w.noResults}/><Action href="/knowledge">{w.guides}</Action></>);}
  const match=s=>!query||s.toLocaleLowerCase().includes(query.toLocaleLowerCase());
  const guides=FEATURED_GUIDES.filter(g=>(category==='all'||g.category?.toLowerCase().includes(category)||g.id.includes(category))&&match(local(g.title,lang)+' '+local(g.summary,lang)));
  const articles=KNOWLEDGE_ARTICLES.filter(a=>match(local(a.title,lang)+' '+local(a.excerpt,lang)));
  const faqs=KNOWLEDGE_FAQS.filter(f=>match(local(f.question,lang)+' '+local(f.answer,lang))&&(category==='all'||f.category===category));
  return frame(<><Heading title={lang==='ar'?'مركز المعرفة':'Knowledge Center'} subtitle={lang==='ar'?'أدلة ومقالات وأسئلة عن المكملات والتغذية الرياضية.':'Guides, articles and answers about supplements and sports nutrition.'}/>
    <div className="legacy-search"><Search size={18}/><input aria-label={w.search} placeholder={w.search} value={query} onChange={e=>setQuery(e.target.value)}/></div>
    <div className="legacy-chips"><button className={category==='all'?'active':''} onClick={()=>setCategory('all')}>{w.all}</button>{KNOWLEDGE_CATEGORIES.map(c=><button className={category===c.id?'active':''} onClick={()=>setCategory(c.id)} key={c.id}>{local(c.title,lang)}</button>)}</div>
    <h2 className="legacy-section-title">{w.guides} ({guides.length})</h2><div className="legacy-feature-grid">{guides.map(g=><a className="legacy-feature" href={`/knowledge/guides/${g.slug}`} key={g.id}><BookOpen size={23}/><h3>{local(g.title,lang)}</h3><p>{local(g.summary,lang)}</p><span>{w.read}<ArrowRight size={15}/></span></a>)}</div>
    {articles.length>0&&<><h2 className="legacy-section-title">{w.articles}</h2><div className="legacy-feature-grid">{articles.map(a=><a className="legacy-feature" href={`/knowledge/articles/${a.slug}`} key={a.id}><BookOpen size={23}/><h3>{local(a.title,lang)}</h3><p>{local(a.excerpt,lang)}</p><span>{w.read}<ArrowRight size={15}/></span></a>)}</div></>}
    <h2 className="legacy-section-title">{w.question} ({faqs.length})</h2><div className="legacy-panel legacy-questions">{faqs.length?faqs.map((f,i)=><details key={i}><summary>{local(f.question,lang)}</summary><p>{local(f.answer,lang)}</p></details>):<p>{w.noResults}</p>}</div>
    <p className="legacy-note">{w.learning}</p>
  </>);
}
export function FaqPage({lang}) {
  const w=words[lang], [query,setQuery]=useState(''),[category,setCategory]=useState('all');
  const categories=['all',...new Set(faqData.map(f=>f.category))];
  const filtered=faqData.filter(f=>(category==='all'||f.category===category)&&(!query||local(f.question,lang).toLowerCase().includes(query.toLowerCase())||local(f.answer,lang).toLowerCase().includes(query.toLowerCase())));
  return frame(<><Heading title={lang==='ar'?'الأسئلة الشائعة':'Frequently Asked Questions'}/><div className="legacy-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={w.search} aria-label={w.search}/></div>
    <div className="legacy-chips">{categories.map(c=><button key={c} className={category===c?'active':''} onClick={()=>setCategory(c)}>{c==='all'?w.all:c}</button>)}</div>
    <div className="legacy-panel legacy-questions">{filtered.length?filtered.map((f,i)=><details key={i}><summary>{local(f.question,lang)}</summary><p>{local(f.answer,lang)}</p></details>):<p>{w.noResults}</p>}</div>
    <div className="legacy-link-row"><Action href="/knowledge">{w.guides}</Action><Action href="/contact" outline>{w.contact}</Action></div>
  </>);
}
export function SupplementsPage({lang}) {
  const w=words[lang],[query,setQuery]=useState(''),[selected,setSelected]=useState(null);
  const filtered=SUPPLEMENT_ENCYCLOPEDIA.filter(s=>!query||local(s.name,lang).toLowerCase().includes(query.toLowerCase()));
  return frame(<><Heading title={lang==='ar'?'موسوعة المكملات':'Supplement Encyclopedia'} subtitle={w.learning}/><div className="legacy-search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder={w.search} aria-label={w.search}/></div>
    <div className="legacy-chips">{filtered.map(s=><button key={s.id} className={selected?.id===s.id?'active':''} onClick={()=>setSelected(s)}>{s.emoji} {local(s.name,lang)}</button>)}</div>
    {selected?<section className="legacy-panel legacy-prose"><h2>{selected.emoji} {local(selected.name,lang)}</h2><p>{local(selected.summary,lang)}</p>
      {['benefits','mechanism','dosage','bestFor','synergies','safetyNote'].map(field=><div key={field}><h3>{field.replace(/([A-Z])/g,' $1')}</h3>{Array.isArray(local(selected[field],lang))?<ul>{local(selected[field],lang).map((v,i)=><li key={i}>{v}</li>)}</ul>:<p>{local(selected[field],lang)}</p>}</div>)}
      <Action href={`/chat?topic=${encodeURIComponent(local(selected.name,lang))}`}>{w.chat}</Action></section>:
      <div className="legacy-feature-grid">{filtered.map(s=><button className="legacy-feature legacy-feature-button" key={s.id} onClick={()=>setSelected(s)}><FlaskConical size={22}/><h3>{s.emoji} {local(s.name,lang)}</h3><p>{local(s.summary,lang)}</p><span>{w.details}<ArrowRight size={15}/></span></button>)}</div>}
  </>);
}
export function AnalysisPage({lang}) {
  const w=words[lang],[file,setFile]=useState(null),[goal,setGoal]=useState(''),[answer,setAnswer]=useState(''),[busy,setBusy]=useState(false);
  async function submit(e){e.preventDefault();if(!file||!goal.trim())return;if(file.size>2_500_000){setAnswer(lang==='ar'?'الحد الأقصى للملف 2.5 ميجابايت.':'Maximum file size is 2.5 MB.');return;}
    setBusy(true);setAnswer('');try{const base64=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result).split(',')[1]);reader.onerror=reject;reader.readAsDataURL(file)});
      const response=await fetch('/api/ai/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({goal,lang,fileBase64:base64,mimeType:file.type})});
      const data=await response.json();if(!response.ok)throw new Error(data.error||w.unavailable);setAnswer(data.text||w.unavailable);
    }catch{setAnswer(w.unavailable)}finally{setBusy(false)}}
  return frame(<><Heading title={w.analysis} subtitle={w.learning}/><form className="legacy-panel legacy-form" onSubmit={submit}>
    <label>{w.file}<input type="file" accept="image/jpeg,image/png,image/webp,application/pdf" onChange={e=>setFile(e.target.files?.[0]||null)} required/></label>
    <label>{w.goal}<textarea required value={goal} maxLength={500} onChange={e=>setGoal(e.target.value)} /></label>
    <button className="btn btn-gold" type="submit" disabled={busy}>{busy?w.sending:w.submit}</button>
  </form>{answer&&<section className="legacy-panel legacy-prose" role="status"><h2>{w.analysis}</h2><p>{answer}</p></section>}
    <p className="legacy-note">{w.learning}</p></>);
}
export function ChatPage({lang}) {
  const w=words[lang],[input,setInput]=useState(()=>new URLSearchParams(window.location.search).get('topic')||''),[messages,setMessages]=useState([]),[busy,setBusy]=useState(false);
  async function submit(e){e.preventDefault();const prompt=input.trim();if(!prompt||busy)return;const history=messages.slice(-8).map(m=>({role:m.role==='you'?'user':'model',text:m.text.slice(0,1200)}));setMessages(m=>[...m,{role:'you',text:prompt}]);setInput('');setBusy(true);
    try{const response=await fetch('/api/ai/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt,lang,history})});const data=await response.json();if(!response.ok)throw new Error(data.error||w.unavailable);setMessages(m=>[...m,{role:'expert',text:data.text||w.unavailable}]);}
    catch{setMessages(m=>[...m,{role:'expert',text:w.unavailable}])}finally{setBusy(false)}}
  return frame(<><Heading title={w.chat} subtitle={w.learning}/><div className="legacy-panel legacy-chat" aria-live="polite">{messages.length?messages.map((m,i)=><div className={`legacy-message ${m.role}`} key={i}><strong>{m.role==='you'?(lang==='ar'?'أنت':'You'):'MGREFOTS'}</strong><p>{m.text}</p></div>):<p>{lang==='ar'?'اسأل عن المكملات والتغذية والتمرين.':'Ask about supplements, nutrition and training.'}</p>}</div>
    <form className="legacy-chat-form" onSubmit={submit}><label className="sr-only" htmlFor="legacy-chat-input">{w.chat}</label><textarea id="legacy-chat-input" value={input} maxLength={2000} onChange={e=>setInput(e.target.value)} required/><button className="btn btn-gold" disabled={busy}>{busy?w.sending:w.send}</button></form>
    <div className="legacy-link-row"><Action href={whatsapp('Hello MGREFOTS, I would like to speak to the coach.')} outline>WhatsApp</Action></div>
  </>);
}
export function AboutPage({lang,t}) {
  const w=words[lang],codes=['ISO 9001','ISO 22000','FSSC 22000','HALAL','EU Organic','USDA Organic'];
  return frame(<><Heading title={t.aboutTitle} subtitle={t.aboutText}/><div className="legacy-info-grid">{t.badges.map(b=><div className="legacy-panel" key={b}><CheckCircle2 size={23}/><h2>{b}</h2></div>)}</div>
    <section className="legacy-panel"><ShieldCheck size={26}/><h2>{lang==='ar'?'معايير الجودة المذكورة في موادنا القديمة':'Quality standards in earlier materials'}</h2>
      <p>{lang==='ar'?'كانت النسخة القديمة تشرح هذه المعايير. يجب التحقق من الشهادة والجهة الحاصلة عليها ونطاق المنتجات قبل نسبتها إلى MGREFOTS.':'The earlier site explained these standards. Verify the certificate holder and product scope before attributing any certification to MGREFOTS.'}</p>
      <div className="legacy-chips">{codes.map(code=><span key={code}>{code}</span>)}</div></section><div className="legacy-link-row"><Action href="/contact">{w.contact}</Action></div></>);
}
export function ContactPage({lang,t}) {
  const w=words[lang],[form,setForm]=useState({name:'',email:'',phone:'',message:''});
  function send(e){e.preventDefault();const text=`MGREFOTS website enquiry\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`;window.open(whatsapp(text),'_blank','noopener,noreferrer')}
  return frame(<><Heading title={t.contact} subtitle={t.contactText}/><div className="legacy-contact-grid"><form className="legacy-panel legacy-form" onSubmit={send}>
    <label>{t.fieldName}<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>
    <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>
    <label>{t.fieldPhone}<input type="tel" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>
    <label>{lang==='ar'?'رسالتك':'Your message'}<textarea required value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label>
    <button className="btn btn-gold" type="submit">{w.send}</button></form>
    <aside className="legacy-panel"><h2>MGREFOTS · KIGALI</h2><p><a href="tel:+250792294432">+250 792 294 432</a></p><p><a href="mailto:info@mgrefots.com">info@mgrefots.com</a></p><p>Kigali View Hotel, Nyamirambo</p><Action href="/order">{t.orderNav}</Action></aside></div></>);
}
