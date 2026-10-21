import React, { useState } from 'react';
import { ArrowRight, Globe2, Menu, X } from 'lucide-react';
import {
  AboutPage, AnalysisPage, ChatPage, ContactPage, FaqPage, KnowledgePage,
  ProductDetailPage, ProductsPage, SupplementsPage, WelcomePage,
} from './pages.jsx';
import './explore.css';

const labels = {
  en: { explore: 'Explore', products: 'Products', knowledge: 'Knowledge', analysis: 'InBody', supplements: 'Supplements', chat: 'Ask an Expert', faq: 'FAQ', home: 'Home', order: 'Order' },
  ar: { explore: 'اكتشف', products: 'المنتجات', knowledge: 'مركز المعرفة', analysis: 'تحليل InBody', supplements: 'موسوعة المكملات', chat: 'اسأل الخبير', faq: 'الأسئلة الشائعة', home: 'الرئيسية', order: 'اطلب الآن' },
  rw: { explore: 'Menya byinshi', products: 'Ibicuruzwa', knowledge: 'Ubumenyi', analysis: 'Isuzuma rya InBody', supplements: 'Inyongeramirire', chat: 'Baza impuguke', faq: 'Ibibazo', home: 'Ahabanza', order: 'Tumiza' },
};

function Brand() {
  return <a className="brand" href="/#home" aria-label="MGREFOTS"><img className="brand-symbol" src="/brand/mark.png" width="240" height="194" alt="" /><span className="brand-wordmark"><strong>M.G.REFOTS<sup>®</sup></strong><small>DIETARY SUPPLEMENTS</small></span></a>;
}

export default function ExploreSite({ lang, setLang, t }) {
  const [menu, setMenu] = useState(false);
  const l = labels[lang];
  const path = decodeURIComponent(window.location.pathname).replace(/\/+$/, '') || '/';
  const productSlug = path.match(/^\/products\/([^/]+)$/)?.[1];
  const guideSlug = path.match(/^\/knowledge\/(?:guides|articles)\/([^/]+)$/)?.[1];
  let page;
  if (productSlug) page = <ProductDetailPage lang={lang} t={t} slug={productSlug} />;
  else if (guideSlug) page = <KnowledgePage lang={lang} detailId={guideSlug} />;
  else switch (path) {
    case '/products': page = <ProductsPage lang={lang} t={t} />; break;
    case '/knowledge': page = <KnowledgePage lang={lang} />; break;
    case '/analysis': page = <AnalysisPage lang={lang} />; break;
    case '/supplements': page = <SupplementsPage lang={lang} />; break;
    case '/chat': page = <ChatPage lang={lang} />; break;
    case '/faq': page = <FaqPage lang={lang} />; break;
    case '/about': page = <AboutPage lang={lang} t={t} />; break;
    case '/contact': page = <ContactPage lang={lang} t={t} />; break;
    default: page = <WelcomePage lang={lang} t={t} />;
  }
  const links = [
    ['/#home', l.home], ['/products', l.products], ['/knowledge', l.knowledge],
    ['/analysis', l.analysis], ['/supplements', l.supplements], ['/chat', l.chat],
  ];
  return <div className="site-shell legacy-site">
    <header className="site-header"><div className="container header-inner">
      <Brand />
      <nav className={`main-nav legacy-nav ${menu ? 'open' : ''}`} aria-label={l.explore}>
        {links.map(([href, title]) => <a key={href} href={href} onClick={() => setMenu(false)}>{title}</a>)}
        <a className="order-nav-link" href="/order">{l.order}</a>
      </nav>
      <div className="header-controls">
        <label className="language-picker"><Globe2 size={17} /><select aria-label={t.language} value={lang} onChange={e => setLang(e.target.value)}><option value="en">English</option><option value="rw">Kinyarwanda</option><option value="ar">العربية</option></select></label>
        <button className="menu-toggle" aria-expanded={menu} aria-label={menu ? t.close : t.open} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
    </div></header>
    <main className="legacy-main">{page}</main>
    <footer className="site-footer"><div className="container legacy-footer">
      <Brand /><nav aria-label={l.explore}><a href="/faq">{l.faq}</a><a href="/about">{t.about}</a><a href="/contact">{t.contact}</a><a href="/order">{l.order}</a></nav>
      <p>© 2020 MGREFOTS LTD · {t.cities} · {t.rights}</p>
    </div></footer>
    <nav className="legacy-bottom-nav" aria-label={l.explore}>
      <a href="/#home">{l.home}</a><a href="/products">{l.products}</a><a href="/knowledge">{l.knowledge}</a><a href="/chat">{l.chat}</a><a href="/order">{l.order}<ArrowRight size={13} /></a>
    </nav>
  </div>;
}
