import { copy } from './storefront-copy.js';
import { EGYPT_PRODUCT_PRICES, currencyFor } from './market.js';

const productIds = ['creatine', 'citrulline', 'czinc', 'carnitine', 'b-complex','ashwagandha','nad-plus','men-multivitamin','women-multivitamin','coq10','magnesium-glycinate','vitamin-b','omega-3'];
const extraNames = {ashwagandha:'Nutriville Ashwagandha KSM-66 600 mg','nad-plus':'Nutriville NAD+ 300 mg','men-multivitamin':'Nutriville Men Multivitamin','women-multivitamin':'Nutriville Women Multivitamin',coq10:'Nutriville CoQ10 100 mg','magnesium-glycinate':'Nutriville Magnesium Glycinate 150 mg','vitamin-b':'Nutriville Vitamin B Complex','omega-3':'Nutriville DHA/EPA Omega 3'};

// Send product data only; never include the customer's form or WhatsApp text.
export function ecommerce(items, market = 'RW') {
  const products = items.filter(item => productIds.includes(item.product)).map(item => {
    const index = productIds.indexOf(item.product);
    return { item_id: item.product, item_name: extraNames[item.product] || copy.en.names[index],
      price: market === 'EG' ? EGYPT_PRODUCT_PRICES[item.product] : copy.en.prices[index], quantity: item.quantity };
  });
  return { currency: currencyFor(market), value: products.reduce((sum, item) => sum + item.price * item.quantity, 0), items: products };
}

export function trackEvent(name, parameters = {}) {
  try {
    window.gtag?.('event', name, { ...parameters, transport_type: 'beacon' });
  } catch { /* Analytics must never interrupt ordering. */ }
}

export function trackOrderResult(result, items, referralCode = '', market = 'RW') {
  if (result?.ok !== true || !result.orderId) return;
  trackEvent('generate_lead', { ...ecommerce(items, market), order_id: result.orderId, lead_source: 'website_order', ...(referralCode === 'COACH01' ? { referral_partner: 'COACH01', referral_channel: 'instagram' } : {}) });
}

export function installClickTracking() {
  const handleClick = event => {
    const link = event.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, window.location.origin);
    const placement = link.closest('header') ? 'header' : link.closest('section')?.id || (link.closest('.order-page') ? 'order' : 'page');
    if (url.hostname === 'wa.me') trackEvent('whatsapp_click', { placement });
    if (url.origin === window.location.origin && url.pathname.replace(/\/$/, '') === '/order') {
      const product = url.searchParams.get('product');
      trackEvent('order_button_click', { placement, ...(productIds.includes(product) ? { item_id: product } : {}) });
    }
  };
  document.addEventListener('click', handleClick);
  return () => document.removeEventListener('click', handleClick);
}
