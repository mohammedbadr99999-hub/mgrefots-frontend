import { copy } from './storefront-copy.js';

const productIds = ['creatine', 'citrulline', 'czinc', 'carnitine', 'milga'];

// Send product data only; never include the customer's form or WhatsApp text.
export function ecommerce(items) {
  const products = items.filter(item => productIds.includes(item.product)).map(item => {
    const index = productIds.indexOf(item.product);
    return { item_id: item.product, item_name: copy.en.names[index],
      price: copy.en.prices[index], quantity: item.quantity };
  });
  return { currency: 'RWF', value: products.reduce((sum, item) => sum + item.price * item.quantity, 0), items: products };
}

export function trackEvent(name, parameters = {}) {
  try {
    window.gtag?.('event', name, { ...parameters, transport_type: 'beacon' });
  } catch { /* Analytics must never interrupt ordering. */ }
}

export function trackOrderResult(result, items) {
  if (result?.ok !== true || !result.orderId) return;
  trackEvent('generate_lead', { ...ecommerce(items), order_id: result.orderId, lead_source: 'website_order' });
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
