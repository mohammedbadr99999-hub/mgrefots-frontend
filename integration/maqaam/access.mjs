import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';

export const COOKIE = '__Secure-maqaam_session';
const AGE = 12 * 60 * 60;
const attributes = 'Path=/maqaam; HttpOnly; Secure; SameSite=Strict';
const digest = text => createHash('sha256').update(text).digest();

export function configured(password) {
  return typeof password === 'string' && password.length >= 16;
}

export function correctPassword(input, expected) {
  return configured(expected) && typeof input === 'string' && input.length <= 1024 &&
    timingSafeEqual(digest(input), digest(expected));
}

function signature(payload, password) {
  return createHmac('sha256', password).update('maqaam-session/v1/' + payload).digest('base64url');
}

export function signInCookie(password, now = Date.now()) {
  const payload = Math.floor(now / 1000) + AGE + '.' + randomBytes(16).toString('hex');
  return COOKIE + '=' + payload + '.' + signature(payload, password) + '; Max-Age=' + AGE + '; ' + attributes;
}

export function hasSession(cookies, password, now = Date.now()) {
  if (!configured(password)) return false;
  const value = (cookies || '').split(';').map(part => part.trim()).find(part => part.startsWith(COOKIE + '='))?.slice(COOKIE.length + 1);
  if (!value || !/^\d{10}\.[a-f0-9]{32}\.[A-Za-z0-9_-]{43}$/.test(value)) return false;
  const [expiry, nonce, mac] = value.split('.');
  const time = Math.floor(now / 1000);
  return Number(expiry) > time && Number(expiry) <= time + AGE &&
    timingSafeEqual(Buffer.from(mac), Buffer.from(signature(expiry + '.' + nonce, password)));
}

export function signOutCookie() {
  return COOKIE + '=; Max-Age=0; ' + attributes;
}
