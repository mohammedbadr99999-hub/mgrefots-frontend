import React from 'react';
import { currencyFor } from './market.js';

const offers = { czinc: 20, carnitine: 20, 'b-complex': 25 };

export default function PriceDisplay({ id, price, market, lang, compact = false }) {
  const currency = currencyFor(market);
  const discount = market === 'EG' ? offers[id] : undefined;
  if (!discount) return <span className="offer-current">{price.toLocaleString('en-US')} {currency}</span>;
  const priceLabel = lang === 'ar' ? 'ج.م' : currency;
  const offerLabel = lang === 'ar' ? `خصم ${discount}٪ لفترة محدودة` : `Limited-time ${discount}% off`;
  return <span className={`offer-price${compact ? ' offer-price-compact' : ''}`}>
    <del className="offer-old">200 {priceLabel}</del>
    <strong className="offer-current">{price.toLocaleString('en-US')} {priceLabel}</strong>
    <span className="offer-badge">{offerLabel}</span>
  </span>;
}
