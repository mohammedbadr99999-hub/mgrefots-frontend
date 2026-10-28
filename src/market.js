export const EGYPT_PRICES = [500, 600, 160, 160, 150];
export const marketFor = (country, lang) => country === 'EG' || lang === 'ar' ? 'EG' : 'RW';
export const pricesFor = (market, copy) => market === 'EG' ? EGYPT_PRICES : copy.prices;
export const currencyFor = market => market === 'EG' ? 'EGP' : 'RWF';
export const productImage = (id, market) => `/products/${id}${market === 'EG' && ['czinc','carnitine'].includes(id) ? '-eg' : ''}.webp`;
export const productSpec = (id, market, spec, lang) => {
  if (market !== 'EG') return spec;
  if (id === 'czinc' || id === 'carnitine') return lang === 'ar' ? '٦٠ كبسولة' : '60 capsules';
  if (id === 'citrulline') return lang === 'ar' ? 'نقي · ١٥٠ جم · ٣٠ حصة · ٥ جم للحصة' : 'Pure L-Citrulline · 150 g · 30 servings · 5 g per serving';
  return spec;
};
