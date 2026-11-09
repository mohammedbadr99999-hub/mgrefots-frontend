import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';
import firebaseConfig from './firebase-applet-config.json' with { type: 'json' };
import {
  VERIFIED_FOOD_DATABASE,
  CLINICAL_HEALTH_GUIDANCE,
  type FoodReferenceItem,
} from './src/utils/nutritionCalculator.ts';
import type { Locale } from './src/data/muscleGroups.ts';

dotenv.config({ override: false });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const PUBLIC_APP_BASE_PATH = '/coachmohamedzeina';
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-3-flash-preview';
const OWNER_NOTIFICATION_EMAIL =
  process.env.OWNER_NOTIFICATION_EMAIL || 'mohamed.saad.elsayed3@gmail.com';
const VERIFIED_ADMIN_EMAILS = [
  'mohammedbadr99999@gmail.com',
  'mohamed.saad.elsayed3@gmail.com',
];

// Legacy Server Storage for Registered Users (Used for legacy migration & owner notification tracking)
const DATA_DIR = path.join(__dirname, 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');

export type NotificationStatus =
  | 'pending'
  | 'sent'
  | 'failed_retryable'
  | 'not_required';

export interface StoredRegistration {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneDialCode: string;
  phoneNumber: string;
  phoneVerified: boolean;
  countryCode: string;
  countryName: string;
  stateProvince: string;
  city: string;
  areaDistrict: string;
  preferredLocale: string;
  preferredUnits: 'metric' | 'imperial';
  marketingConsent: boolean;
  termsAccepted: boolean;
  lastMuscleGroupId: string;
  lastExerciseId: string;
  createdAt: string;
  updatedAt: string;
  emailNotified: boolean;
  notificationStatus?: NotificationStatus;
  notificationAttempts?: number;
  lastNotificationAttemptAt?: string;
  notifiedAt?: string;
  migratedToUid?: string;
  migratedAt?: string;
}

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(REGISTRATIONS_FILE)) {
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readRegistrations(): StoredRegistration[] {
  try {
    ensureDataDir();
    const raw = fs.readFileSync(REGISTRATIONS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeRegistrations(list: StoredRegistration[]) {
  try {
    ensureDataDir();
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to write registrations file:', err);
  }
}

const inFlightNotificationUids = new Set<string>();

function escapeHtml(input: string): string {
  return String(input || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

async function sendRegistrationEmailServerSide(
  reg: StoredRegistration
): Promise<boolean> {
  // Support deterministic test failure simulation ONLY in isolated test runs
  if (process.env.MGREFOTS_SIMULATE_EMAIL_FAILURE === 'true') {
    return false;
  }

  const smtpUser = process.env.SMTP_USER || OWNER_NOTIFICATION_EMAIL;
  const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  const stateDisplay = reg.stateProvince?.trim()
    ? reg.stateProvince.trim()
    : 'غير مُدخل';
  const areaDisplay = reg.areaDistrict?.trim()
    ? reg.areaDistrict.trim()
    : 'غير مُدخل';
  const marketingDisplay = reg.marketingConsent ? 'موافق' : 'غير موافق';
  const exactSubject = 'New MGREFOTS Trainer Registration';

  const htmlBody = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #CEDFD9; border-radius: 16px; overflow: hidden;">
      <div style="background-color: #087F76; color: #FFFFFF; padding: 20px 24px;">
        <h2 style="margin: 0; font-size: 20px;">${exactSubject}</h2>
      </div>
      <div style="padding: 24px; background-color: #FFFFFF;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76; width: 42%;">الاسم الأول (First name)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;">${escapeHtml(reg.firstName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">الاسم الأخير (Last name)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;">${escapeHtml(reg.lastName)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">إيميل العميل (Email address)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;" dir="ltr">${escapeHtml(reg.email)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">رقم الهاتف (Phone number)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;" dir="ltr">${escapeHtml(`${reg.phoneDialCode} ${reg.phoneNumber}`)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">الدولة (Country)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;">${escapeHtml(`${reg.countryName} (${reg.countryCode})`)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">المحافظة (State / Province)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;">${escapeHtml(stateDisplay)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">المدينة (City)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;">${escapeHtml(cityOrDefault(reg.city))}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">المنطقة (Area / District)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;">${escapeHtml(areaDisplay)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">اللغة (Language)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;">${escapeHtml(reg.preferredLocale)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; font-weight: bold; color: #087F76;">الموافقة التسويقية (Marketing consent)</td>
            <td style="padding: 10px; border-bottom: 1px solid #E6EFEB; color: #1E293B;">${escapeHtml(marketingDisplay)}</td>
          </tr>
          <tr>
            <td style="padding: 10px; font-weight: bold; color: #087F76;">تاريخ ووقت التسجيل (Registered at)</td>
            <td style="padding: 10px; color: #64748B;" dir="ltr">${escapeHtml(reg.createdAt)}</td>
          </tr>
        </table>
      </div>
    </div>
  `;

  // 1. Direct SMTP if configured
  if (smtpPass && smtpPass.trim().length > 3) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: smtpUser,
          pass: smtpPass.trim(),
        },
      });
      await transporter.sendMail({
        from: `"MGREFOTS Trainer" <${smtpUser}>`,
        to: OWNER_NOTIFICATION_EMAIL,
        subject: exactSubject,
        html: htmlBody,
      });
      return true;
    } catch (err) {
      console.error('Direct SMTP send failed:', err);
    }
  }

  // 2. Fallback: FormSubmit AJAX endpoint (sends strictly to OWNER_NOTIFICATION_EMAIL)
  try {
    const appOrigin = process.env.APP_URL || 'https://mgrefots.firebaseapp.com';
    const response = await fetch(
      `https://formsubmit.co/ajax/${OWNER_NOTIFICATION_EMAIL}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Origin: appOrigin,
          Referer: `${appOrigin}/`,
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        },
        body: JSON.stringify({
          _subject: exactSubject,
          _template: 'table',
          _captcha: 'false',
          'First name': reg.firstName,
          'Last name': reg.lastName,
          'Email address (as entered)': reg.email,
          'Phone number': `${reg.phoneDialCode} ${reg.phoneNumber}`,
          Country: `${reg.countryName} (${reg.countryCode})`,
          'State / Province': stateDisplay,
          City: reg.city,
          'Area / District': areaDisplay,
          Language: reg.preferredLocale,
          'Marketing consent': marketingDisplay,
          'Registered at': reg.createdAt,
        }),
      }
    );
    if (response.ok) {
      const resJson = (await response.json().catch(() => null)) as {
        success?: string | boolean;
      } | null;
      if (!resJson || resJson.success !== 'false') {
        return true;
      }
    }
  } catch (err) {
    console.error('FormSubmit server fallback error:', err);
  }

  return false;
}

function cityOrDefault(city: string): string {
  return String(city || '').trim();
}

async function dispatchOwnerNotificationOnce(uid: string): Promise<boolean> {
  if (!uid || inFlightNotificationUids.has(uid)) {
    return false;
  }
  const initialList = readRegistrations();
  const initialIdx = initialList.findIndex((r) => r.uid === uid);
  if (initialIdx === -1) return false;
  const target = initialList[initialIdx];
  if (
    target.emailNotified ||
    target.notificationStatus === 'sent' ||
    target.notificationStatus === 'not_required'
  ) {
    return true;
  }

  inFlightNotificationUids.add(uid);
  try {
    const attemptAt = new Date().toISOString();
    const sent = await sendRegistrationEmailServerSide(target);
    const updatedList = readRegistrations();
    const idx = updatedList.findIndex((r) => r.uid === uid);
    if (idx >= 0) {
      const attempts = (updatedList[idx].notificationAttempts || 0) + 1;
      updatedList[idx] = {
        ...updatedList[idx],
        emailNotified: sent,
        notificationStatus: sent ? 'sent' : 'failed_retryable',
        notificationAttempts: attempts,
        lastNotificationAttemptAt: attemptAt,
        ...(sent ? { notifiedAt: attemptAt } : {}),
      };
      writeRegistrations(updatedList);
    }
    return sent;
  } catch {
    const updatedList = readRegistrations();
    const idx = updatedList.findIndex((r) => r.uid === uid);
    if (idx >= 0 && !updatedList[idx].emailNotified) {
      updatedList[idx] = {
        ...updatedList[idx],
        notificationStatus: 'failed_retryable',
        notificationAttempts: (updatedList[idx].notificationAttempts || 0) + 1,
        lastNotificationAttemptAt: new Date().toISOString(),
      };
      writeRegistrations(updatedList);
    }
    return false;
  } finally {
    inFlightNotificationUids.delete(uid);
  }
}

// Rate limiting per user/IP (max 15 requests per 10 minutes)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(key, { count: 1, resetAt: now + 10 * 60 * 1000 });
    return true;
  }
  if (entry.count >= 15) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function createServerApp(serveFrontend = false) {
  const app = express();

  // Allow embedding on https://www.mgrefots.com and https://mgrefots.com
  app.use((_req, res, next) => {
    res.removeHeader('X-Frame-Options');
    res.setHeader(
      'Content-Security-Policy',
      "frame-ancestors 'self' https://www.mgrefots.com https://mgrefots.com *"
    );
    next();
  });

  app.use(express.json({ limit: '20mb' }));

  // Digital Asset Links for Google Play Trusted Web Activity (TWA / PWABuilder)
  app.get('/.well-known/assetlinks.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.sendFile(
      path.join(__dirname, 'public', '.well-known', 'assetlinks.json'),
      { dotfiles: 'allow' }
    );
  });

  // ==================== FIREBASE AUTH VERIFICATION & LEGACY MIGRATION ====================

  interface VerifiedAuthUser {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
  }

  let cachedGoogleCerts: { certs: Record<string, string>; expiresAt: number } | null =
    null;

  async function getGooglePublicCerts(forceRefresh = false): Promise<Record<string, string>> {
    const now = Date.now();
    if (!forceRefresh && cachedGoogleCerts && now < cachedGoogleCerts.expiresAt) {
      return cachedGoogleCerts.certs;
    }
    const res = await fetch(
      'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'
    );
    if (!res.ok) {
      throw new Error(`Failed to fetch Google public certs: ${res.status}`);
    }
    const certs = (await res.json()) as Record<string, string>;
    cachedGoogleCerts = {
      certs,
      expiresAt: now + 30 * 60 * 1000,
    };
    return certs;
  }

  function decodeBase64UrlJson(segment: string): Record<string, unknown> | null {
    try {
      const jsonStr = Buffer.from(segment, 'base64url').toString('utf-8');
      return JSON.parse(jsonStr);
    } catch {
      return null;
    }
  }

  async function verifyFirebaseIdToken(
    idToken: string
  ): Promise<VerifiedAuthUser | null> {
    if (!idToken || typeof idToken !== 'string' || idToken.length > 16384) {
      return null;
    }
    const parts = idToken.split('.');
    if (parts.length !== 3) {
      return null;
    }

    const header = decodeBase64UrlJson(parts[0]);
    const payload = decodeBase64UrlJson(parts[1]);
    if (!header || !payload) {
      return null;
    }

    const alg = String(header.alg || '');
    const kid = String(header.kid || '');
    const aud = String(payload.aud || '');
    const iss = String(payload.iss || '');
    const sub = String(payload.sub || '').trim();
    const email = String(payload.email || '').trim().toLowerCase();
    const emailVerified = Boolean(payload.email_verified === true && email);
    const firebaseClaim = payload.firebase as
      | { sign_in_provider?: string }
      | undefined;
    const isAnonymous =
      firebaseClaim?.sign_in_provider === 'anonymous' || !email;
    const exp = Number(payload.exp || 0);
    const iat = Number(payload.iat || 0);
    const nowSec = Math.floor(Date.now() / 1000);

    const expectedProjectId = firebaseConfig.projectId || 'mgrefots';
    if (
      alg !== 'RS256' ||
      !kid ||
      aud !== expectedProjectId ||
      iss !== `https://securetoken.google.com/${expectedProjectId}` ||
      !sub ||
      sub.length > 128 ||
      exp <= nowSec - 30 ||
      iat > nowSec + 300
    ) {
      return null;
    }

    const signedContent = `${parts[0]}.${parts[1]}`;
    const signatureBytes = Buffer.from(parts[2], 'base64url');

    // Local test-runner key support ONLY when explicitly injected in isolated test process
    if (
      kid === 'mgrefots-local-test-kid' &&
      process.env.MGREFOTS_TEST_PUBLIC_KEY_PEM
    ) {
      try {
        const verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(signedContent);
        verifier.end();
        if (
          verifier.verify(
            process.env.MGREFOTS_TEST_PUBLIC_KEY_PEM,
            signatureBytes
          )
        ) {
          return { uid: sub, email, emailVerified, isAnonymous };
        }
      } catch {
        return null;
      }
      return null;
    }

    // Primary: Cryptographic RSA-SHA256 verification against Google SecureToken X.509 certificates
    try {
      let certs = await getGooglePublicCerts(false);
      if (!certs[kid]) {
        certs = await getGooglePublicCerts(true);
      }
      const certPem = certs[kid];
      if (certPem) {
        const verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(signedContent);
        verifier.end();
        if (verifier.verify(certPem, signatureBytes)) {
          return { uid: sub, email, emailVerified, isAnonymous };
        }
        return null;
      }
    } catch {
      // Fallback to Identity Toolkit accounts:lookup if cert endpoint had a network error
    }

    // Secondary fallback: Google Identity Toolkit accounts:lookup verification
    try {
      const lookupRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseConfig.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        }
      );
      if (!lookupRes.ok) return null;
      const lookupData = (await lookupRes.json()) as {
        users?: Array<{
          localId?: string;
          email?: string;
          emailVerified?: boolean;
        }>;
      };
      const u = lookupData.users?.[0];
      if (u && u.localId === sub) {
        const verifiedFlag = Boolean(
          u.email &&
            u.email.toLowerCase() === email &&
            u.emailVerified === true
        );
        return {
          uid: sub,
          email: u.email ? u.email.toLowerCase() : '',
          emailVerified: verifiedFlag,
          isAnonymous: !u.email,
        };
      }
    } catch {
      return null;
    }

    return null;
  }

  async function authenticateRequest(
    req: express.Request
  ): Promise<
    | { ok: true; user: VerifiedAuthUser; idToken: string }
    | { ok: false; status: number; error: string }
  > {
    const authHeader = String(req.headers.authorization || '').trim();
    if (!authHeader.toLowerCase().startsWith('bearer ')) {
      return { ok: false, status: 401, error: 'MISSING_AUTH_TOKEN' };
    }
    const idToken = authHeader.slice(7).trim();
    const user = await verifyFirebaseIdToken(idToken);
    if (!user) {
      return { ok: false, status: 401, error: 'INVALID_AUTH_TOKEN' };
    }
    return { ok: true, user, idToken };
  }

  async function requireVerifiedEmailRequest(
    req: express.Request
  ): Promise<
    | { ok: true; user: VerifiedAuthUser; idToken: string }
    | { ok: false; status: number; error: string }
  > {
    const authRes = await authenticateRequest(req);
    if ('error' in authRes) return authRes;
    if (!authRes.user.email || authRes.user.emailVerified !== true) {
      return {
        ok: false,
        status: 401,
        error: 'EMAIL_VERIFICATION_REQUIRED',
      };
    }
    return authRes;
  }

  async function requireAdminRequest(
    req: express.Request
  ): Promise<
    | { ok: true; user: VerifiedAuthUser; idToken: string }
    | { ok: false; status: number; error: string }
  > {
    const authRes = await requireVerifiedEmailRequest(req);
    if ('error' in authRes) return authRes;

    if (VERIFIED_ADMIN_EMAILS.includes(authRes.user.email.toLowerCase())) {
      return authRes;
    }

    // Also check if admins/{uid} exists in the named Firestore database
    try {
      const adminDocUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.firestoreDatabaseId}/documents/admins/${encodeURIComponent(authRes.user.uid)}`;
      const fsRes = await fetch(adminDocUrl, {
        headers: { Authorization: `Bearer ${authRes.idToken}` },
      });
      if (fsRes.ok) {
        return authRes;
      }
    } catch {
      // ignore
    }

    return { ok: false, status: 403, error: 'FORBIDDEN_ADMIN_ONLY' };
  }

  // Cached check for whether Passwordless Email Link is enabled in Firebase Console
  let cachedEmailLinkEnabled: { enabled: boolean; checkedAt: number } | null =
    null;

  app.get('/api/auth/provider-status', async (_req, res) => {
    const now = Date.now();
    if (
      cachedEmailLinkEnabled &&
      now - cachedEmailLinkEnabled.checkedAt < 5 * 60 * 1000
    ) {
      return res.json({
        projectId: firebaseConfig.projectId,
        firestoreDatabaseId: firebaseConfig.firestoreDatabaseId,
        googleSignInEnabled: true,
        emailLinkEnabled: cachedEmailLinkEnabled.enabled,
        emailLinkSetupRequired:
          'Firebase Console → Project "mgrefots" → Authentication → Sign-in method → Email/Password → Enable "Email link (passwordless sign-in)"',
      });
    }

    let emailLinkEnabled = false;
    try {
      const probeRes = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseConfig.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requestType: 'EMAIL_SIGNIN',
            email: 'probe-check-noreply@mgrefots.invalid',
            continueUrl: `https://${firebaseConfig.authDomain || 'mgrefots.firebaseapp.com'}`,
            canHandleCodeInApp: true,
          }),
        }
      );
      const text = await probeRes.text();
      if (!text.includes('OPERATION_NOT_ALLOWED')) {
        emailLinkEnabled = true;
      }
    } catch {
      emailLinkEnabled = false;
    }

    cachedEmailLinkEnabled = { enabled: emailLinkEnabled, checkedAt: now };
    return res.json({
      projectId: firebaseConfig.projectId,
      firestoreDatabaseId: firebaseConfig.firestoreDatabaseId,
      googleSignInEnabled: true,
      emailLinkEnabled,
      emailLinkSetupRequired:
        'Firebase Console → Project "mgrefots" → Authentication → Sign-in method → Email/Password → Enable "Email link (passwordless sign-in)"',
    });
  });

  // Migrate Legacy Registration Record for Verified User (Idempotent, Conflict-Safe, Non-Destructive)
  app.post('/api/auth/migrate-legacy', async (req, res) => {
    try {
      const authRes = await requireVerifiedEmailRequest(req);
      if ('error' in authRes) {
        return res.status(authRes.status).json({ error: authRes.error });
      }

      const verifiedUid = authRes.user.uid;
      const verifiedEmail = authRes.user.email.toLowerCase();
      const emailKey =
        'leg_' +
        crypto
          .createHash('sha256')
          .update(verifiedEmail)
          .digest('hex')
          .slice(0, 40);

      // First: Check durable Firestore backup collection `/legacyRegistrations/{emailKey}` in database `ai-studio-mgrefots-c589f979-89d7-4bbd-8d06-c3046cb4771b`
      try {
        const fsDocUrl = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/${firebaseConfig.firestoreDatabaseId}/documents/legacyRegistrations/${encodeURIComponent(emailKey)}`;
        const fsRes = await fetch(fsDocUrl, {
          headers: { Authorization: `Bearer ${authRes.idToken}` },
        });
        if (fsRes.ok) {
          const fsDoc = (await fsRes.json()) as {
            fields?: Record<
              string,
              { stringValue?: string; booleanValue?: boolean }
            >;
          };
          const f = fsDoc.fields || {};
          const strVal = (k: string) => String(f[k]?.stringValue || '').trim();
          const boolVal = (k: string) => Boolean(f[k]?.booleanValue);
          const docEmail = strVal('email').toLowerCase();

          if (docEmail === verifiedEmail) {
            const existingTargetUid = strVal('migratedToUid');
            if (existingTargetUid && existingTargetUid !== verifiedUid) {
              return res.status(409).json({
                status: 'conflict',
                code: 'ALREADY_LINKED_TO_OTHER_UID',
                message:
                  'This legacy registration is already linked to another verified user identity.',
              });
            }

            return res.json({
              status: 'migrated',
              alreadyMigrated: existingTargetUid === verifiedUid,
              source: 'firestore_legacy_backup',
              profile: {
                uid: verifiedUid,
                firstName: strVal('firstName'),
                lastName: strVal('lastName'),
                email: verifiedEmail,
                emailVerified: true,
                phoneDialCode: strVal('phoneDialCode') || '+250',
                phoneNumber: strVal('phoneNumber'),
                phoneVerified: false,
                countryCode: strVal('countryCode') || 'RW',
                countryName:
                  strVal('countryName') || strVal('countryCode') || 'Rwanda',
                stateProvince: strVal('stateProvince'),
                city: strVal('city'),
                areaDistrict: strVal('areaDistrict'),
                preferredLocale: ['en', 'ar', 'fr', 'rw'].includes(
                  strVal('preferredLocale')
                )
                  ? strVal('preferredLocale')
                  : 'en',
                preferredUnits: 'metric',
                marketingConsent: boolVal('marketingConsent'),
                termsAccepted: true,
                lastMuscleGroupId: strVal('lastMuscleGroupId'),
                lastExerciseId: strVal('lastExerciseId'),
                legacyCreatedAt: strVal('legacyCreatedAt'),
                migratedFromUid: strVal('legacyUid'),
              },
            });
          }
        }
      } catch {
        // Continue to local registrations fallback if REST lookup fails
      }

      const list = readRegistrations();
      const matchingIndices: number[] = [];
      for (let i = 0; i < list.length; i++) {
        if ((list[i].email || '').trim().toLowerCase() === verifiedEmail) {
          matchingIndices.push(i);
        }
      }

      if (matchingIndices.length === 0) {
        return res.json({ status: 'not_found' });
      }

      // 1. Check if any matching record is already linked to a DIFFERENT Firebase Auth UID
      for (const idx of matchingIndices) {
        const rec = list[idx];
        if (rec.migratedToUid && rec.migratedToUid !== verifiedUid) {
          return res.status(409).json({
            status: 'conflict',
            code: 'ALREADY_LINKED_TO_OTHER_UID',
            message:
              'This legacy registration is already linked to another verified user identity.',
          });
        }
      }

      // 2. Check if there are multiple records for this email with conflicting identity details
      const baseRec = list[matchingIndices[0]];
      const normalizeStr = (s: string) => String(s || '').trim().toLowerCase();
      const normalizePhone = (s: string) => String(s || '').replace(/\D/g, '');

      for (let k = 1; k < matchingIndices.length; k++) {
        const other = list[matchingIndices[k]];
        const nameConflict =
          (baseRec.firstName &&
            other.firstName &&
            normalizeStr(baseRec.firstName) !== normalizeStr(other.firstName)) ||
          (baseRec.lastName &&
            other.lastName &&
            normalizeStr(baseRec.lastName) !== normalizeStr(other.lastName));
        const phoneConflict =
          baseRec.phoneNumber &&
          other.phoneNumber &&
          normalizePhone(baseRec.phoneNumber) !==
            normalizePhone(other.phoneNumber);
        const countryConflict =
          baseRec.countryCode &&
          other.countryCode &&
          normalizeStr(baseRec.countryCode) !==
            normalizeStr(other.countryCode);

        if (nameConflict || phoneConflict || countryConflict) {
          return res.status(409).json({
            status: 'conflict',
            code: 'CONFLICTING_LEGACY_RECORDS',
            message:
              'Conflicting legacy registration records were found for this email. Automatic merge was halted to protect your data.',
          });
        }
      }

      // 3. Unique unambiguous match: mark as linked to verifiedUid without deleting original record
      const alreadyMigrated = baseRec.migratedToUid === verifiedUid;
      const nowIso = new Date().toISOString();

      for (const idx of matchingIndices) {
        list[idx] = {
          ...list[idx],
          migratedToUid: verifiedUid,
          migratedAt: list[idx].migratedAt || nowIso,
          notificationStatus: 'not_required',
          emailNotified: true,
        };
      }
      if (!alreadyMigrated) {
        writeRegistrations(list);
      }

      return res.json({
        status: 'migrated',
        alreadyMigrated,
        profile: {
          uid: verifiedUid,
          firstName: (baseRec.firstName || '').trim(),
          lastName: (baseRec.lastName || '').trim(),
          email: verifiedEmail,
          emailVerified: true,
          phoneDialCode: (baseRec.phoneDialCode || '+250').trim(),
          phoneNumber: (baseRec.phoneNumber || '').trim(),
          phoneVerified: Boolean(baseRec.phoneVerified),
          countryCode: (baseRec.countryCode || 'RW').trim(),
          countryName: (
            baseRec.countryName ||
            baseRec.countryCode ||
            'Rwanda'
          ).trim(),
          stateProvince: (baseRec.stateProvince || '').trim(),
          city: (baseRec.city || '').trim(),
          areaDistrict: (baseRec.areaDistrict || '').trim(),
          preferredLocale: ['en', 'ar', 'fr', 'rw'].includes(
            baseRec.preferredLocale
          )
            ? baseRec.preferredLocale
            : 'en',
          preferredUnits:
            baseRec.preferredUnits === 'imperial' ? 'imperial' : 'metric',
          marketingConsent: Boolean(baseRec.marketingConsent),
          termsAccepted: true,
          lastMuscleGroupId: baseRec.lastMuscleGroupId || '',
          lastExerciseId: baseRec.lastExerciseId || '',
          legacyCreatedAt: baseRec.createdAt || '',
          migratedFromUid: baseRec.uid || '',
        },
      });
    } catch (err) {
      console.error(
        'Error in POST /api/auth/migrate-legacy:',
        err instanceof Error ? err.message : 'unknown'
      );
      return res.status(500).json({ error: 'SERVER_ERROR' });
    }
  });

  // 1. Authenticated Registration Mirror & One-Time Owner Email Notification
  app.post('/api/registrations', async (req, res) => {
    try {
      const authRes = await authenticateRequest(req);
      if ('error' in authRes) {
        return res.status(authRes.status).json({ error: authRes.error });
      }

      const verifiedUid = authRes.user.uid;
      const isTokenEmailVerified = Boolean(
        authRes.user.emailVerified && authRes.user.email
      );

      // Reject any attempt to write a profile for a different UID
      if (req.body?.uid && String(req.body.uid).trim() !== verifiedUid) {
        return res.status(403).json({
          error: 'FORBIDDEN_IDENTITY_MISMATCH',
          message: 'Cannot create or modify a registration for another user.',
        });
      }

      // If the user has a verified email in their token, enforce that body email matches it
      const enteredEmail = String(req.body?.email || '')
        .trim()
        .toLowerCase()
        .slice(0, 160);
      if (
        isTokenEmailVerified &&
        enteredEmail &&
        enteredEmail !== authRes.user.email.toLowerCase()
      ) {
        return res.status(403).json({
          error: 'FORBIDDEN_IDENTITY_MISMATCH',
          message: 'Email does not match verified account identity.',
        });
      }

      const effectiveEmail = isTokenEmailVerified
        ? authRes.user.email.toLowerCase()
        : enteredEmail;
      // Never mark emailVerified true unless the Firebase Auth token proves email ownership
      const effectiveEmailVerified = isTokenEmailVerified;

      const firstName = String(req.body?.firstName || '').trim().slice(0, 80);
      const lastName = String(req.body?.lastName || '').trim().slice(0, 80);
      const phoneDialCode = String(req.body?.phoneDialCode || '+250')
        .trim()
        .slice(0, 10);
      const phoneNumber = String(req.body?.phoneNumber || '')
        .trim()
        .slice(0, 30);
      const countryCode = String(req.body?.countryCode || '')
        .trim()
        .slice(0, 10);
      const countryName = String(req.body?.countryName || '')
        .trim()
        .slice(0, 80);
      const stateProvince = String(req.body?.stateProvince || '')
        .trim()
        .slice(0, 100);
      const city = String(req.body?.city || '').trim().slice(0, 100);
      const areaDistrict = String(req.body?.areaDistrict || '')
        .trim()
        .slice(0, 100);
      const preferredLocale = String(req.body?.preferredLocale || 'en')
        .trim()
        .slice(0, 5);
      const marketingConsent = Boolean(req.body?.marketingConsent);
      const silentSync = Boolean(
        req.body?.silentSync ||
          req.body?.isLegacyMigration ||
          req.body?.migratedFromUid
      );
      const awaitNotification = Boolean(req.body?.awaitNotification);

      if (
        !firstName ||
        !lastName ||
        !effectiveEmail ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(effectiveEmail) ||
        !phoneNumber ||
        !countryCode ||
        !city
      ) {
        return res.status(400).json({
          error: 'MISSING_REQUIRED_FIELDS',
          message:
            'First name, Last name, valid Email, Phone number, Country, and City are required.',
        });
      }

      const list = readRegistrations();
      // Match strictly by UID (or verified email ONLY when token proves email ownership).
      // Never match or merge an unverified typed email into someone else's existing record!
      const existingIdx = list.findIndex(
        (r) =>
          r.uid === verifiedUid ||
          r.migratedToUid === verifiedUid ||
          (isTokenEmailVerified && r.email.toLowerCase() === effectiveEmail)
      );
      const nowIso = new Date().toISOString();

      let record: StoredRegistration;
      const isFirstRegistrationForUid = existingIdx === -1;

      if (existingIdx >= 0) {
        const prev = list[existingIdx];
        record = {
          ...prev,
          uid: verifiedUid,
          migratedToUid: verifiedUid,
          firstName,
          lastName,
          email: effectiveEmail,
          emailVerified: effectiveEmailVerified || prev.emailVerified,
          phoneDialCode,
          phoneNumber,
          countryCode,
          countryName: countryName || prev.countryName,
          stateProvince,
          city,
          areaDistrict,
          preferredLocale,
          marketingConsent,
          termsAccepted: true,
          updatedAt: nowIso,
        };
        list[existingIdx] = record;
      } else {
        record = {
          uid: verifiedUid,
          migratedToUid: verifiedUid,
          firstName,
          lastName,
          email: effectiveEmail,
          emailVerified: effectiveEmailVerified,
          phoneDialCode,
          phoneNumber,
          phoneVerified: false,
          countryCode,
          countryName: countryName || countryCode,
          stateProvince,
          city,
          areaDistrict,
          preferredLocale,
          preferredUnits: 'metric',
          marketingConsent,
          termsAccepted: true,
          lastMuscleGroupId: String(req.body?.lastMuscleGroupId || ''),
          lastExerciseId: String(req.body?.lastExerciseId || ''),
          createdAt: nowIso,
          updatedAt: nowIso,
          emailNotified: silentSync,
          notificationStatus: silentSync ? 'not_required' : 'pending',
          notificationAttempts: 0,
        };
        list.unshift(record);
      }

      writeRegistrations(list);

      // Single-event Owner Email Notification for first completed registration:
      // Never repeats on double-click, reload, next-day reopen, sign-in, or legacy migration.
      const shouldAttemptNotification =
        !silentSync &&
        !record.emailNotified &&
        record.notificationStatus !== 'sent' &&
        record.notificationStatus !== 'not_required' &&
        (isFirstRegistrationForUid ||
          record.notificationStatus === 'failed_retryable' ||
          record.notificationStatus === 'pending');

      if (shouldAttemptNotification) {
        if (awaitNotification) {
          await dispatchOwnerNotificationOnce(verifiedUid);
          const refreshed = readRegistrations().find(
            (r) => r.uid === verifiedUid
          );
          if (refreshed) record = refreshed;
        } else {
          dispatchOwnerNotificationOnce(verifiedUid).catch(() => {});
        }
      }

      return res.json({
        profile: record,
        notification: {
          status: record.notificationStatus || (record.emailNotified ? 'sent' : 'pending'),
          emailNotified: Boolean(record.emailNotified),
          attempts: record.notificationAttempts || 0,
        },
      });
    } catch (err) {
      console.error(
        'Error in POST /api/registrations:',
        err instanceof Error ? err.message : 'unknown'
      );
      return res.status(500).json({ error: 'SERVER_ERROR' });
    }
  });

  // Periodic background retry for any failed_retryable owner notifications (up to 5 attempts)
  const retryInterval = setInterval(() => {
    const list = readRegistrations();
    for (const r of list) {
      if (
        !r.emailNotified &&
        r.notificationStatus === 'failed_retryable' &&
        (r.notificationAttempts || 0) < 5
      ) {
        dispatchOwnerNotificationOnce(r.uid).catch(() => {});
      }
    }
  }, 60 * 1000);
  retryInterval.unref?.();

  // 2. List All Registrations (Strictly Protected for Verified Admins Only)
  app.get('/api/registrations', async (req, res) => {
    const adminRes = await requireAdminRequest(req);
    if ('error' in adminRes) {
      return res.status(adminRes.status).json({ error: adminRes.error });
    }
    const list = readRegistrations();
    return res.json({
      ownerNotificationEmail: OWNER_NOTIFICATION_EMAIL,
      smtpConfigured: Boolean(
        process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD
      ),
      total: list.length,
      registrations: list,
    });
  });

  // 3. Update User Profile (Strictly Protected for Authenticated Owner Only)
  app.put('/api/registrations/:uid', async (req, res) => {
    const authRes = await authenticateRequest(req);
    if ('error' in authRes) {
      return res.status(authRes.status).json({ error: authRes.error });
    }
    const { uid } = req.params;
    if (uid !== authRes.user.uid) {
      return res.status(403).json({
        error: 'FORBIDDEN_NOT_OWNER',
        message: 'You can only update your own profile.',
      });
    }

    const list = readRegistrations();
    const idx = list.findIndex(
      (r) =>
        r.uid === authRes.user.uid ||
        r.migratedToUid === authRes.user.uid ||
        (authRes.user.emailVerified &&
          authRes.user.email &&
          r.email.toLowerCase() === authRes.user.email.toLowerCase())
    );
    const nowIso = new Date().toISOString();

    if (idx === -1) {
      return res.status(404).json({ error: 'NOT_FOUND' });
    }

    const current = list[idx];
    const updated: StoredRegistration = {
      ...current,
      uid: authRes.user.uid,
      migratedToUid: authRes.user.uid,
      email: authRes.user.emailVerified && authRes.user.email
        ? authRes.user.email.toLowerCase()
        : String(req.body?.email ?? current.email).trim().toLowerCase(),
      emailVerified: Boolean(
        authRes.user.emailVerified || current.emailVerified
      ),
      firstName: String(req.body?.firstName ?? current.firstName)
        .trim()
        .slice(0, 80),
      lastName: String(req.body?.lastName ?? current.lastName)
        .trim()
        .slice(0, 80),
      phoneDialCode: String(req.body?.phoneDialCode ?? current.phoneDialCode)
        .trim()
        .slice(0, 10),
      phoneNumber: String(req.body?.phoneNumber ?? current.phoneNumber)
        .trim()
        .slice(0, 30),
      countryCode: String(req.body?.countryCode ?? current.countryCode)
        .trim()
        .slice(0, 10),
      countryName: String(req.body?.countryName ?? current.countryName)
        .trim()
        .slice(0, 80),
      stateProvince: String(req.body?.stateProvince ?? current.stateProvince)
        .trim()
        .slice(0, 100),
      city: String(req.body?.city ?? current.city).trim().slice(0, 100),
      areaDistrict: String(req.body?.areaDistrict ?? current.areaDistrict)
        .trim()
        .slice(0, 100),
      preferredLocale: String(
        req.body?.preferredLocale ?? current.preferredLocale
      )
        .trim()
        .slice(0, 5),
      preferredUnits:
        req.body?.preferredUnits === 'imperial' ? 'imperial' : 'metric',
      marketingConsent: Boolean(
        req.body?.marketingConsent ?? current.marketingConsent
      ),
      lastMuscleGroupId: String(
        req.body?.lastMuscleGroupId ?? current.lastMuscleGroupId
      ),
      lastExerciseId: String(
        req.body?.lastExerciseId ?? current.lastExerciseId
      ),
      updatedAt: nowIso,
    };
    list[idx] = updated;
    writeRegistrations(list);
    return res.json({ profile: updated });
  });

  // 4. Delete User Registration (Strictly Protected for Authenticated Owner Only)
  app.delete('/api/registrations/:uid', async (req, res) => {
    const authRes = await authenticateRequest(req);
    if ('error' in authRes) {
      return res.status(authRes.status).json({ error: authRes.error });
    }
    const { uid } = req.params;
    if (uid !== authRes.user.uid) {
      return res.status(403).json({
        error: 'FORBIDDEN_NOT_OWNER',
        message: 'You can only delete your own account.',
      });
    }
    const list = readRegistrations();
    const filtered = list.filter(
      (r) =>
        r.uid !== authRes.user.uid &&
        r.migratedToUid !== authRes.user.uid &&
        !(
          authRes.user.emailVerified &&
          authRes.user.email &&
          r.email.toLowerCase() === authRes.user.email.toLowerCase()
        )
    );
    writeRegistrations(filtered);
    return res.json({ deleted: true });
  });

  // ==================== AI NUTRITION ASSISTANT ROUTES ====================

  interface SafeAttachment {
    name: string;
    mimeType: string;
    base64Data: string;
  }

  interface BoundedChatTurn {
    role: 'user' | 'assistant';
    text: string;
  }

  interface SafeProfileContext {
    hasSavedPlan: boolean;
    age: number | null;
    weightKg: number | null;
    heightCm: number | null;
    countryName: string;
    goal: string | null;
    mealsPerDay: number | null;
    dietPattern: string;
    halalPreference: boolean;
    allergies: string[];
    favoriteFoods: string;
    dislikedFoods: string;
    localFoods: string;
    budget: string;
    trainingDaysPerWeek: number | null;
    trainingType: string;
    targetKcal: number | null;
    proteinG: number | null;
    carbsG: number | null;
    fatG: number | null;
    fiberG: number | null;
    waterLiters: number | null;
    safetyFlags: {
      isUnder18: boolean;
      hasUrgentSymptoms: boolean;
      conditions: string[];
      usesInsulinOrHypoglycemiaMeds: string;
      takesPrescriptionMedsWithDietRules: string;
    };
  }

  type CoachResponseStatus =
    | 'ok'
    | 'needs_more_info'
    | 'plan_ready'
    | 'safety_referral'
    | 'urgent_care';

  interface StructuredCoachResponse {
    status: CoachResponseStatus;
    reply: string;
    answer: string;
    keyTakeaways: string[];
    followUpQuestions: string[];
    referenceNote: string;
    conversationSummary: string;
    sourceMode: 'gemini' | 'usda_deterministic';
  }

  function detectVisitorLocale(text: string, fallbackLocale: string): Locale {
    const clean = text.trim();
    const fallback: Locale = ['en', 'ar', 'fr', 'rw'].includes(fallbackLocale)
      ? (fallbackLocale as Locale)
      : 'en';
    if (!clean) return fallback;

    // 1. Arabic script detection
    if (/[\u0600-\u06FF]/.test(clean)) {
      return 'ar';
    }
    // 2. Kinyarwanda common words
    if (
      /\b(muraho|amakuru|mwiriwe|mwaramutse|ibiryo|proteyine|amazi|imikaya|ibiro|urakoze|ndabaza|ifunguro|muganga|ndashaka)\b/i.test(
        clean
      )
    ) {
      return 'rw';
    }
    // 3. French words or accented characters
    if (
      /[éèêàùçœ]/i.test(clean) ||
      /\b(bonjour|salut|bonsoir|comment|merci|repas|protéine|glucides|alimentation|combien|quel|quelle|poids|santé|je veux|objectif)\b/i.test(
        clean
      )
    ) {
      return 'fr';
    }
    // 4. Latin characters -> English (unless UI locale is fr/rw and text is ambiguous)
    if (/[a-zA-Z]{2,}/.test(clean)) {
      return 'en';
    }
    return fallback;
  }

  function isConversationalGreeting(text: string): boolean {
    const clean = text
      .trim()
      .replace(/[!?.,،؟~❤️👍👋]+/g, '')
      .trim();
    if (!clean || clean.length > 48) return false;
    return /^(ازيك|إزيك|ازيكم|عامل ايه|عامله ايه|اخبارك|أخبارك|اخبارك ايه|اهلا|أهلا|أهلاً|اهلا بك|مرحبا|مرحباً|هلا|السلام عليكم|وعليكم السلام|صباح الخير|مساء الخير|شكرا|شكراً|شكرا جزيلا|تمام|الحمد لله|كيف حالك|كيفك|مين انت|انت مين|hi|hello|hey|how are you|howdy|good morning|good afternoon|good evening|thanks|thank you|who are you|bonjour|salut|bonsoir|comment ça va|ça va|merci|muraho|amakuru|mwiriwe|mwaramutse|urakoze)$/i.test(
      clean
    );
  }

  function sanitizePlainText(text: string): string {
    return text
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
      .replace(/<\/?[a-z][^>]*>/gi, '')
      .trim();
  }

  interface ExtractedConversationState {
    urgentSymptomsDetected: boolean;
    under18Detected: boolean;
    detectedConditionKey:
      | 'diabetes'
      | 'high_bp'
      | 'low_bp'
      | 'gout'
      | 'possible_lipedema'
      | 'kidney_disease'
      | 'heart_failure'
      | 'pregnant_lactating'
      | 'eating_disorder_history'
      | null;
    effectiveGoal: 'lose_fat' | 'build_muscle' | 'maintain' | 'improve_eating' | null;
    goalStatedInChat: boolean;
    planRequestedInChat: boolean;
    swapOrAdjustRequested: boolean;
    age: number | null;
    weightKg: number | null;
    heightCm: number | null;
    countryName: string;
    mealsPerDay: number | null;
    trainingScheduleKnown: boolean;
    trainingScheduleNote: string;
    foodPreferencesKnown: boolean;
    foodPreferencesNote: string;
    dislikedFoodKeywords: string[];
    preferredFoodKeywords: string[];
    missingCoreBodyStats: string[];
    missingPersonalizationItems: string[];
    updatedSummary: string;
  }

  function analyzeConversationState(
    question: string,
    recentMessages: BoundedChatTurn[],
    priorSummary: string,
    ctx: SafeProfileContext | null
  ): ExtractedConversationState {
    const userTurnsText = [
      priorSummary,
      ...recentMessages.filter((m) => m.role === 'user').map((m) => m.text),
      question,
    ]
      .filter(Boolean)
      .join(' \n ');
    const qLower = question.toLowerCase();
    const allUserLower = userTurnsText.toLowerCase();

    // 1. Urgent medical symptoms check
    const urgentPattern =
      /fainting|fainted|passed out|chest pain|severe dizziness|confusion|severe weakness|severe hypoglycemia|إغماء|اغمى|أغمى|ألم في الصدر|الم في الصدر|دوخة شديدة|دوار شديد|ارتباك حاد|ضعف شديد مفاجئ|هبوط حاد في السكر|évanouissement|douleur thoracique|vertige sévère|kwikubita hasi|kubabara mu gatuza/i;
    const urgentSymptomsDetected =
      Boolean(ctx?.safetyFlags?.hasUrgentSymptoms) ||
      urgentPattern.test(qLower);

    // 2. Age extraction & Under-18 check
    let extractedAge = ctx?.age ?? null;
    const ageMatch =
      userTurnsText.match(
        /(?:age|years?\s*old|yo|عمري|سني|عندي\s*من\s*العمر|ans|imyaka)\s*[:=]?\s*(\d{1,2})\b/i
      ) ||
      userTurnsText.match(
        /\b(\d{1,2})\s*(?:years?\s*old|yo|سنة|سنه|عاماً|عاما|ans)\b/i
      );
    if (ageMatch) {
      const parsedAge = parseInt(ageMatch[1], 10);
      if (parsedAge >= 10 && parsedAge <= 100) {
        extractedAge = parsedAge;
      }
    }
    const under18Detected =
      Boolean(ctx?.safetyFlags?.isUnder18) ||
      (extractedAge !== null && extractedAge < 18);

    // 3. Chronic condition / special medical status detection
    let detectedConditionKey: ExtractedConversationState['detectedConditionKey'] =
      null;

    if (
      /lipedema|lipoedema|lumps in thigh|nodules in thigh|disproportionate fat|الوذمة الشحمية|ليبيديما|تكتلات في الفخذ|عقد في الفخذ|دهون الفخذين غير المتناسبة|lipoedème/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'possible_lipedema';
    } else if (
      /diabet|insulin|type 1|type 2|blood sugar|hypoglycemi|السكري|مرض السكر|سكر الدم|أنسولين|انسولين|diabète|insuline|diyabete/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'diabetes';
    } else if (
      /low blood pressure|hypotension|ضغط منخفض|الضغط المنخفض|ضغط واطي|هبوط الضغط|hypotension artérielle|umuvuduko muke w'amaraso/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'low_bp';
    } else if (
      /high blood pressure|hypertension|blood pressure|ضغط الدم|ضغط مرتفع|الضغط العالي|الضغط المرتفع|ضغط عالي|hypertension artérielle|tension artérielle|umuvuduko ukabije w'amaraso/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'high_bp';
    } else if (
      /\bgout\b|uric acid|purine|النقرس|نقرس|حمض اليوريك|أيريك أسيد|goutte|\bgute\b/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'gout';
    } else if (
      /kidney disease|renal|chronic kidney|مرض الكلى|أمراض الكلى|قصور كلوي|فشل كلوي|وظائف الكلى|maladie rénale|indwara y'impyiko/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'kidney_disease';
    } else if (
      /heart failure|heart disease|cardiac|قصور القلب|فشل القلب|ضعف عضلة القلب|مرض القلب|insuffisance cardiaque|ikibazo cy'umutima/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'heart_failure';
    } else if (
      /pregnant|pregnancy|breastfeeding|lactating|حامل|حمل|فترة الحمل|مرضع|رضاعة طبيعية|enceinte|grossesse|allaitement|gutwita|konsa/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'pregnant_lactating';
    } else if (
      /eating disorder|anorexia|bulimia|binge eating|اضطرابات الأكل|اضطراب أكل|فقدان الشهية العصبي|الشره المرضي|trouble alimentaire/i.test(
        allUserLower
      )
    ) {
      detectedConditionKey = 'eating_disorder_history';
    } else if (
      ctx?.safetyFlags?.conditions &&
      ctx.safetyFlags.conditions.length > 0
    ) {
      const firstCond = ctx.safetyFlags.conditions[0];
      if (
        [
          'diabetes',
          'high_bp',
          'low_bp',
          'gout',
          'possible_lipedema',
          'kidney_disease',
          'heart_failure',
          'pregnant_lactating',
          'eating_disorder_history',
        ].includes(firstCond)
      ) {
        detectedConditionKey =
          firstCond as ExtractedConversationState['detectedConditionKey'];
      }
    }

    // 4. Weight & Height extraction (from profile or chat)
    let weightKg = ctx?.weightKg ?? null;
    const weightMatch = userTurnsText.match(
      /(\d{2,3}(?:\.\d)?)\s*(?:kg|kilos?|كجم|كيلو|كيلوغرام)/i
    );
    if (weightMatch) {
      const w = parseFloat(weightMatch[1]);
      if (w >= 30 && w <= 260) weightKg = w;
    }

    let heightCm = ctx?.heightCm ?? null;
    const heightMatch = userTurnsText.match(
      /(\d{3})\s*(?:cm|سم|سنتيمتر)/i
    );
    if (heightMatch) {
      const h = parseInt(heightMatch[1], 10);
      if (h >= 120 && h <= 230) heightCm = h;
    }

    // 5. Country extraction
    let countryName = (ctx?.countryName || '').trim();
    const countryMatch = userTurnsText.match(
      /\b(Egypt|Rwanda|Saudi Arabia|UAE|Morocco|Algeria|Tunisia|Jordan|France|Kenya|Uganda|مصر|رواندا|السعودية|الإمارات|المغرب|الجزائر|تونس|الأردن|فرنسا)\b/i
    );
    if (!countryName && countryMatch) {
      countryName = countryMatch[1];
    }

    // 6. Goal detection
    let chatGoal: ExtractedConversationState['effectiveGoal'] = null;
    if (
      /build muscle|gain muscle|gain weight|bulk|hypertrophy|بناء عضلات|تضخيم|زيادة وزن|زيادة العضلات|كسب عضلات|ابني عضل|أبني عضلات|ازيد وزني|أزيد وزني|prendre du muscle|prise de masse|kubaka imikaya|kongera ibiro/i.test(
        allUserLower
      )
    ) {
      chatGoal = 'build_muscle';
    } else if (
      /lose fat|lose weight|fat loss|weight loss|cut|cutting|lean|خسارة دهون|تنشيف|انقاص الوزن|إنقاص الوزن|تخسيس|اخس|أخس|حرق دهون|انزل وزني|أنزل وزني|perdre du poids|perte de gras|kugabanya ibinure|kugabanya ibiro/i.test(
        allUserLower
      )
    ) {
      chatGoal = 'lose_fat';
    } else if (
      /maintain weight|maintenance|ثبات الوزن|الحفاظ على الوزن|أحافظ على وزني|maintenir mon poids/i.test(
        allUserLower
      )
    ) {
      chatGoal = 'maintain';
    }

    const goalStatedInChat = Boolean(chatGoal);
    const planRequestedInChat =
      goalStatedInChat ||
      /meal plan|diet plan|daily plan|what should i eat|example plan|نظام غذائي|جدول غذائي|خطة غذائية|خطة وجبات|وجبات يومية|أكل إيه|اكل ايه|plan alimentaire|menu|gahunda y'amafunguro/i.test(
        allUserLower
      );

    const effectiveGoal =
      chatGoal ||
      (ctx?.goal as ExtractedConversationState['effectiveGoal']) ||
      'improve_eating';

    // 7. Meals per day, training time/schedule, and food preferences from chat or profile
    let mealsPerDay = ctx?.mealsPerDay ?? null;
    const mealsMatch = userTurnsText.match(
      /\b([345])\s*(?:meals?|وجبات|repas)|(?:وجبات|amafunguro)\s*([345])\b|(ثلاث\s*وجبات|أربع\s*وجبات|اربع\s*وجبات)/i
    );
    const mealsMatchedInChat = Boolean(mealsMatch);
    if (mealsMatch) {
      if (mealsMatch[3]?.includes('أربع') || mealsMatch[3]?.includes('اربع')) {
        mealsPerDay = 4;
      } else if (mealsMatch[3]?.includes('ثلاث')) {
        mealsPerDay = 3;
      } else {
        const num = parseInt(mealsMatch[1] || mealsMatch[2], 10);
        mealsPerDay = num === 4 ? 4 : 3;
      }
    }

    const trainingChatMatch =
      /\b(morning|afternoon|evening|night|at\s*\d{1,2}\s*(?:am|pm)?|\d\s*days?\s*(?:a|per)\s*week|pre-workout|post-workout|gym|بتمرن|أتمرن|تمريني|الصبح|صباحاً|صباحا|مساءً|مساء|بالليل|بعد الشغل|بعد العصر|ظهر|أيام في الأسبوع|ايام في الاسبوع|matin|soir|après-midi|mu gitondo|nimugoroba)\b/i.test(
        allUserLower
      );
    const trainingScheduleKnown = trainingChatMatch;
    const trainingScheduleNote = trainingChatMatch
      ? 'Specified in conversation'
      : ctx?.trainingDaysPerWeek
      ? `${ctx.trainingDaysPerWeek} days/week (${ctx.trainingType || 'resistance'})`
      : '';

    const foodKeywordsMap: { id: string; pattern: RegExp }[] = [
      { id: 'chicken_breast_cooked', pattern: /chicken|poultry|فراخ|دجاج|صدور دجاج|poulet|inkoko/i },
      { id: 'whole_eggs_boiled', pattern: /egg|eggs|بيض|œuf|amagi/i },
      { id: 'tilapia_white_fish', pattern: /fish|tilapia|سمك|بلطي|poisson|amafi/i },
      { id: 'canned_tuna_water', pattern: /tuna|تونة|تونه|thon/i },
      { id: 'lean_beef_cooked', pattern: /beef|meat|لحم|لحمة|bœuf|inyama/i },
      { id: 'red_kidney_beans_boiled', pattern: /beans|fava|فول|فاصوليا|haricots|ibishyimbo/i },
      { id: 'lentils_boiled', pattern: /lentil|عدس|lentilles|inkori/i },
      { id: 'greek_yogurt_plain', pattern: /yogurt|curd|milk|dairy|زبادي|لبن|حليب|yaourt|amata/i },
      { id: 'tofu_firm', pattern: /tofu|soy|توفو|صويا/i },
      { id: 'white_rice_cooked', pattern: /rice|أرز|رز|riz|umuceri/i },
      { id: 'oats_rolled_dry', pattern: /oat|oats|oatmeal|شوفان|avoine/i },
      { id: 'sweet_potato_boiled', pattern: /sweet potato|potato|بطاطا|بطاطس|patate|ibijumba|ibirayi/i },
      { id: 'whole_wheat_bread', pattern: /bread|toast|خبز|عيش|pain|umugati/i },
      { id: 'banana_fresh', pattern: /banana|موز|banane|imineke/i },
    ];

    const preferredFoodKeywords: string[] = [];
    const dislikedFoodKeywords: string[] = [];

    // Check explicit dislike clauses in chat or profile
    const combinedDislikeSource = `${ctx?.dislikedFoods || ''} ${userTurnsText}`;
    for (const fk of foodKeywordsMap) {
      if (fk.pattern.test(combinedDislikeSource)) {
        // Check if preceded by dislike / avoid words
        const dislikeRegex = new RegExp(
          `(?:dislike|don't like|do not like|hate|avoid|no |allergic to|مبحبش|لا أحب|ما بحبش|مش بحب|أبتعد عن|حساسية من|تجنب|بدون|sans |pas de )[^.,،\\n]{0,25}(?:${fk.pattern.source})`,
          'i'
        );
        if (
          dislikeRegex.test(userTurnsText) ||
          (ctx?.dislikedFoods && fk.pattern.test(ctx.dislikedFoods))
        ) {
          dislikedFoodKeywords.push(fk.id);
        } else {
          preferredFoodKeywords.push(fk.id);
        }
      }
    }

    const foodChatMatch =
      preferredFoodKeywords.length > 0 ||
      dislikedFoodKeywords.length > 0 ||
      /no allergies|no disliked|eat anything|all foods|مفيش حساسية|لا توجد حساسية|باكل كل حاجة|أي أكل|aucune allergie|nta kibazo/i.test(
        allUserLower
      );

    const foodPreferencesKnown =
      foodChatMatch ||
      Boolean(ctx?.favoriteFoods?.trim() || ctx?.dislikedFoods?.trim());

    const swapOrAdjustRequested =
      recentMessages.length >= 2 &&
      /\b(swap|replace|instead of|change|adjust|substitute|more|less|بدل|غير|استبدل|تبديل|مكان|زود|قلل|remplacer|changer|hindura)\b/i.test(
        qLower
      );

    const missingCoreBodyStats: string[] = [];
    if (!extractedAge) missingCoreBodyStats.push('age');
    if (!weightKg) missingCoreBodyStats.push('weight');
    if (!heightCm) missingCoreBodyStats.push('height');

    const missingPersonalizationItems: string[] = [];
    if (!trainingScheduleKnown && !mealsMatchedInChat) {
      missingPersonalizationItems.push('training_time_and_meals');
    }
    if (!foodPreferencesKnown) {
      missingPersonalizationItems.push('food_preferences_and_allergies');
    }

    const summaryParts: string[] = [];
    if (effectiveGoal) summaryParts.push(`Goal: ${effectiveGoal}`);
    if (extractedAge) summaryParts.push(`Age: ${extractedAge}`);
    if (weightKg) summaryParts.push(`Weight: ${weightKg}kg`);
    if (heightCm) summaryParts.push(`Height: ${heightCm}cm`);
    if (countryName) summaryParts.push(`Country: ${countryName}`);
    if (mealsPerDay) summaryParts.push(`Meals/day: ${mealsPerDay}`);
    if (ctx?.targetKcal) summaryParts.push(`Target: ${ctx.targetKcal} kcal (${ctx.proteinG}g P, ${ctx.carbsG}g C, ${ctx.fatG}g F)`);
    if (trainingScheduleKnown) summaryParts.push(`Training schedule: confirmed in chat`);
    if (preferredFoodKeywords.length > 0)
      summaryParts.push(`Preferred foods: ${preferredFoodKeywords.join(', ')}`);
    if (dislikedFoodKeywords.length > 0)
      summaryParts.push(`Disliked/avoided: ${dislikedFoodKeywords.join(', ')}`);
    if (detectedConditionKey)
      summaryParts.push(`Safety condition flagged: ${detectedConditionKey}`);

    return {
      urgentSymptomsDetected,
      under18Detected,
      detectedConditionKey,
      effectiveGoal,
      goalStatedInChat,
      planRequestedInChat,
      swapOrAdjustRequested,
      age: extractedAge,
      weightKg,
      heightCm,
      countryName,
      mealsPerDay: mealsPerDay || 3,
      trainingScheduleKnown,
      trainingScheduleNote,
      foodPreferencesKnown,
      foodPreferencesNote:
        preferredFoodKeywords.length > 0
          ? preferredFoodKeywords.join(', ')
          : ctx?.favoriteFoods || '',
      dislikedFoodKeywords,
      preferredFoodKeywords,
      missingCoreBodyStats,
      missingPersonalizationItems,
      updatedSummary: summaryParts.join(' | ').slice(0, 900),
    };
  }

  function buildTargetAlignedOneDayPlan(
    loc: Locale,
    state: ExtractedConversationState,
    ctx: SafeProfileContext | null
  ): {
    planMarkdown: string;
    keyTakeaways: string[];
    targetKcal: number;
    totalKcal: number;
    totalProteinG: number;
    totalCarbsG: number;
    totalFatG: number;
    totalFiberG: number;
  } {
    // 1. Determine daily calorie and macro targets (use saved targets if available, else compute via Mifflin-St Jeor)
    const wKg = state.weightKg || ctx?.weightKg || 72;
    const hCm = state.heightCm || ctx?.heightCm || 172;
    const age = state.age || ctx?.age || 28;
    const bmr = Math.round(10 * wKg + 6.25 * hCm - 5 * age - 78);
    const tdee = Math.round(bmr * 1.35 + 160);
    const fallbackKcal =
      state.effectiveGoal === 'lose_fat'
        ? Math.max(1350, Math.round(tdee * 0.86))
        : state.effectiveGoal === 'build_muscle'
        ? tdee + 220
        : tdee;

    const targetKcal = ctx?.targetKcal || fallbackKcal;
    const targetProteinG =
      ctx?.proteinG ||
      Math.round(
        wKg *
          (state.effectiveGoal === 'lose_fat' ||
          state.effectiveGoal === 'build_muscle'
            ? 1.8
            : 1.5)
      );
    const targetFatG =
      ctx?.fatG || Math.max(45, Math.round((targetKcal * 0.27) / 9));
    const targetCarbsG =
      ctx?.carbsG ||
      Math.max(
        90,
        Math.round((targetKcal - targetProteinG * 4 - targetFatG * 9) / 4)
      );
    const targetFiberG = ctx?.fiberG || 28;
    const waterLiters =
      ctx?.waterLiters || Number(Math.max(2.0, wKg * 0.035).toFixed(1));

    const diet = ctx?.dietPattern || 'omnivore';
    const halalOnly = ctx?.halalPreference ?? true;
    const allergies = (ctx?.allergies || []).map((a) => a.toLowerCase());
    const dislikedIds = new Set(state.dislikedFoodKeywords);
    const preferredIds = new Set(state.preferredFoodKeywords);

    const compatibleFoods = VERIFIED_FOOD_DATABASE.filter(
      (f: FoodReferenceItem) => {
        if (halalOnly && !f.tags.halalCompatible) return false;
        if (diet === 'vegan' && !f.tags.vegan) return false;
        if (diet === 'vegetarian' && !f.tags.vegetarian) return false;
        if (diet === 'pescatarian' && !f.tags.pescatarian) return false;
        if (dislikedIds.has(f.id)) return false;
        for (const alg of allergies) {
          if (f.tags.allergens.includes(alg)) return false;
        }
        return true;
      }
    );

    const sortByPreference = (list: FoodReferenceItem[]) => {
      return [...list].sort((a, b) => {
        const aPref = preferredIds.has(a.id) ? 1 : 0;
        const bPref = preferredIds.has(b.id) ? 1 : 0;
        return bPref - aPref;
      });
    };

    const proteins = sortByPreference(
      compatibleFoods.filter((f) => f.category === 'protein')
    );
    const carbs = sortByPreference(
      compatibleFoods.filter((f) => f.category === 'carb')
    );
    const vegFats = sortByPreference(
      compatibleFoods.filter((f) => f.category === 'fat_veg')
    );

    const safeProteins =
      proteins.length > 0
        ? proteins
        : VERIFIED_FOOD_DATABASE.filter((f) => f.category === 'protein');
    const safeCarbs =
      carbs.length > 0
        ? carbs
        : VERIFIED_FOOD_DATABASE.filter((f) => f.category === 'carb');
    const safeVegs =
      vegFats.length > 0
        ? vegFats
        : VERIFIED_FOOD_DATABASE.filter((f) => f.category === 'fat_veg');

    const mealsCount = state.mealsPerDay === 4 ? 4 : 3;
    const shares =
      mealsCount === 4 ? [0.25, 0.3, 0.15, 0.3] : [0.3, 0.38, 0.32];

    const mealTitles: Record<Locale, string[]> = {
      en:
        mealsCount === 4
          ? [
              'Meal 1 — Breakfast',
              'Meal 2 — Lunch (Pre-Workout Fuel)',
              'Meal 3 — Afternoon Snack / Post-Workout',
              'Meal 4 — Dinner (Recovery)',
            ]
          : [
              'Meal 1 — Breakfast',
              'Meal 2 — Lunch (Pre-Workout Fuel)',
              'Meal 3 — Dinner (Post-Workout Recovery)',
            ],
      ar:
        mealsCount === 4
          ? [
              'الوجبة 1 — الإفطار',
              'الوجبة 2 — الغداء (طاقة قبل التمرين)',
              'الوجبة 3 — سناك / وجبة حول التمرين',
              'الوجبة 4 — العشاء (استشفاء بعد التمرين)',
            ]
          : [
              'الوجبة 1 — الإفطار',
              'الوجبة 2 — الغداء (طاقة قبل التمرين)',
              'الوجبة 3 — العشاء (استشفاء بعد التمرين)',
            ],
      fr:
        mealsCount === 4
          ? [
              'Repas 1 — Petit-déjeuner',
              'Repas 2 — Déjeuner (Avant entraînement)',
              'Repas 3 — Collation',
              'Repas 4 — Dîner (Récupération)',
            ]
          : [
              'Repas 1 — Petit-déjeuner',
              'Repas 2 — Déjeuner (Avant entraînement)',
              'Repas 3 — Dîner (Récupération après séance)',
            ],
      rw:
        mealsCount === 4
          ? [
              'Ifunguro rya 1 — Mu gitondo',
              'Ifunguro rya 2 — Saa sita (Mbere y’imyitozo)',
              'Ifunguro rya 3 — Ifunguro rito',
              'Ifunguro rya 4 — Nimugoroba (Nyuma y’imyitozo)',
            ]
          : [
              'Ifunguro rya 1 — Mu gitondo',
              'Ifunguro rya 2 — Saa sita (Mbere y’imyitozo)',
              'Ifunguro rya 3 — Nimugoroba (Nyuma y’imyitozo)',
            ],
    };

    let totalKcal = 0;
    let totalProteinG = 0;
    let totalCarbsG = 0;
    let totalFatG = 0;
    let totalFiberG = 0;

    const mealLines: string[] = [];

    shares.forEach((share, idx) => {
      const pFood = safeProteins[idx % safeProteins.length];
      const cFood = safeCarbs[idx % safeCarbs.length];
      const vFood = safeVegs[idx % safeVegs.length];

      const mealTargetKcal = targetKcal * share;
      const mealTargetP = targetProteinG * share;

      const vGrams = 100;
      const vKcal = (vFood.per100g.kcal * vGrams) / 100;
      const vP = (vFood.per100g.proteinG * vGrams) / 100;
      const vC = (vFood.per100g.carbsG * vGrams) / 100;
      const vF = (vFood.per100g.fatG * vGrams) / 100;
      const vFib = (vFood.per100g.fiberG * vGrams) / 100;

      // Scale protein food grams to hit meal protein target
      const rawPGrams =
        ((mealTargetP * 0.78) / Math.max(6, pFood.per100g.proteinG)) * 100;
      const pGrams = Math.max(
        60,
        Math.min(280, Math.round(rawPGrams / 10) * 10)
      );
      const pKcal = (pFood.per100g.kcal * pGrams) / 100;
      const pP = (pFood.per100g.proteinG * pGrams) / 100;
      const pC = (pFood.per100g.carbsG * pGrams) / 100;
      const pF = (pFood.per100g.fatG * pGrams) / 100;
      const pFib = (pFood.per100g.fiberG * pGrams) / 100;

      // Scale carb food grams so total meal kcal aligns with mealTargetKcal
      const remainingKcal = Math.max(80, mealTargetKcal - pKcal - vKcal);
      const rawCGrams =
        (remainingKcal / Math.max(50, cFood.per100g.kcal)) * 100;
      const cGrams = Math.max(
        50,
        Math.min(340, Math.round(rawCGrams / 10) * 10)
      );
      const cKcal = (cFood.per100g.kcal * cGrams) / 100;
      const cP = (cFood.per100g.proteinG * cGrams) / 100;
      const cC = (cFood.per100g.carbsG * cGrams) / 100;
      const cF = (cFood.per100g.fatG * cGrams) / 100;
      const cFib = (cFood.per100g.fiberG * cGrams) / 100;

      const mKcal = Math.round(pKcal + cKcal + vKcal);
      const mP = Math.round(pP + cP + vP);
      const mC = Math.round(pC + cC + vC);
      const mF = Math.round(pF + cF + vF);
      const mFib = Math.round((pFib + cFib + vFib) * 10) / 10;

      totalKcal += mKcal;
      totalProteinG += mP;
      totalCarbsG += mC;
      totalFatG += mF;
      totalFiberG = Math.round((totalFiberG + mFib) * 10) / 10;

      const title = mealTitles[loc][idx];
      if (loc === 'ar') {
        mealLines.push(
          `**${title}** (~${mKcal} سعرة | ${mP} جم بروتين | ${mC} جم كربوهيدرات | ${mF} جم دهون)\n` +
            `- ${pFood.nameByLocale.ar}: **${pGrams} جم** (${pFood.householdMeasureByLocale.ar} — ${pFood.stateLabelByLocale.ar})\n` +
            `- ${cFood.nameByLocale.ar}: **${cGrams} جم** (${cFood.householdMeasureByLocale.ar} — ${cFood.stateLabelByLocale.ar})\n` +
            `- ${vFood.nameByLocale.ar}: **${vGrams} جم** (${vFood.householdMeasureByLocale.ar})`
        );
      } else if (loc === 'fr') {
        mealLines.push(
          `**${title}** (~${mKcal} kcal | ${mP}g P | ${mC}g G | ${mF}g L)\n` +
            `- ${pFood.nameByLocale.fr} : **${pGrams}g** (${pFood.householdMeasureByLocale.fr} — ${pFood.stateLabelByLocale.fr})\n` +
            `- ${cFood.nameByLocale.fr} : **${cGrams}g** (${cFood.householdMeasureByLocale.fr} — ${cFood.stateLabelByLocale.fr})\n` +
            `- ${vFood.nameByLocale.fr} : **${vGrams}g** (${vFood.householdMeasureByLocale.fr})`
        );
      } else if (loc === 'rw') {
        mealLines.push(
          `**${title}** (~${mKcal} kcal | ${mP}g P | ${mC}g C | ${mF}g F)\n` +
            `- ${pFood.nameByLocale.rw}: **${pGrams}g** (${pFood.householdMeasureByLocale.rw} — ${pFood.stateLabelByLocale.rw})\n` +
            `- ${cFood.nameByLocale.rw}: **${cGrams}g** (${cFood.householdMeasureByLocale.rw} — ${cFood.stateLabelByLocale.rw})\n` +
            `- ${vFood.nameByLocale.rw}: **${vGrams}g** (${vFood.householdMeasureByLocale.rw})`
        );
      } else {
        mealLines.push(
          `**${title}** (~${mKcal} kcal | ${mP}g P | ${mC}g C | ${mF}g F)\n` +
            `- ${pFood.nameByLocale.en}: **${pGrams}g** (${pFood.householdMeasureByLocale.en} — ${pFood.stateLabelByLocale.en})\n` +
            `- ${cFood.nameByLocale.en}: **${cGrams}g** (${cFood.householdMeasureByLocale.en} — ${cFood.stateLabelByLocale.en})\n` +
            `- ${vFood.nameByLocale.en}: **${vGrams}g** (${vFood.householdMeasureByLocale.en})`
        );
      }
    });

    const countryLabel = state.countryName ? ` (${state.countryName})` : '';

    if (loc === 'ar') {
      const planMarkdown =
        `شكراً على توضيح تفضيلاتك! إليك **نموذج خطة ليوم واحد** مصمم خصيصاً لهدفك وأطعمتك المتاحة${countryLabel} وموزع على **${mealsCount} وجبات**:\n\n` +
        mealLines.join('\n\n') +
        `\n\n**إجمالي اليوم التقديري مقارنة بهدفك اليومي:**\n` +
        `- السعرات الحرارية: **${totalKcal} kcal** (الهدف اليومي المحفوظ: ~${targetKcal} kcal)\n` +
        `- البروتين: **${totalProteinG} جم** (الهدف: ${targetProteinG} جم) | الكربوهيدرات: **${totalCarbsG} جم** (الهدف: ${targetCarbsG} جم) | الدهون: **${totalFatG} جم** (الهدف: ${targetFatG} جم)\n` +
        `- الألياف: **~${totalFiberG} جم** (الهدف: ${targetFiberG} جم) | الماء المقترح: **~${waterLiters} لتر/يوم**\n\n` +
        `*ملاحظة هامة حول دقة الأرقام:* هذه القيم تقديرية من قاعدة بيانات USDA FoodData Central وتختلف في الواقع حسب العلامة التجارية، طريقة الطهي، نسبة الدهون في القطعية، وحجم الحصة الفعلي (وليست قياساً معملياً).\n\n` +
        `هل ترغب في تبديل أي صنف غذائي، أو تعديل كمية وجبة معينة، أو تغيير توزيع الوجبات حول موعد تمرينك؟`;

      return {
        planMarkdown,
        keyTakeaways: [
          `إجمالي الخطة (${totalKcal} سعرة و${totalProteinG} جم بروتين) متوافق مع هدفك اليومي (~${targetKcal} سعرة).`,
          'الكميات موضحة بالجرام والمعيار المنزلي مع التفرقة بين الوزن النيئ والمطبوخ.',
          'يمكنك طلب تبديل أي صنف (مثل استبدال الدجاج بالبيض أو البقوليات) وسأعيد حساب الوجبة فوراً.',
        ],
        targetKcal,
        totalKcal,
        totalProteinG,
        totalCarbsG,
        totalFatG,
        totalFiberG,
      };
    }

    if (loc === 'fr') {
      const planMarkdown =
        `Merci pour ces précisions ! Voici un **exemple de plan sur une journée** adapté à votre objectif et aux aliments disponibles${countryLabel} sur **${mealsCount} repas** :\n\n` +
        mealLines.join('\n\n') +
        `\n\n**Total estimé sur la journée (comparé à votre cible) :**\n` +
        `- Calories : **${totalKcal} kcal** (Cible enregistrée : ~${targetKcal} kcal)\n` +
        `- Protéines : **${totalProteinG}g** (Cible : ${targetProteinG}g) | Glucides : **${totalCarbsG}g** (Cible : ${targetCarbsG}g) | Lipides : **${totalFatG}g** (Cible : ${targetFatG}g)\n` +
        `- Fibres : **~${totalFiberG}g** | Hydratation : **~${waterLiters} L/jour**\n\n` +
        `*Note sur les estimations :* Les valeurs nutritionnelles varient selon la marque, la recette, le mode de cuisson et la portion exacte (il s’agit d’estimations USDA FoodData Central et non de mesures de laboratoire).\n\n` +
        `Souhaitez-vous remplacer un aliment, ajuster une portion ou modifier l’horaire autour de votre entraînement ?`;

      return {
        planMarkdown,
        keyTakeaways: [
          `Total journalier (${totalKcal} kcal, ${totalProteinG}g protéines) aligné sur votre cible (~${targetKcal} kcal).`,
          'Portions indiquées en grammes et mesures domestiques (poids cru vs cuit précisé).',
          'Demandez à tout moment un échange d’aliment ou un ajustement de portion.',
        ],
        targetKcal,
        totalKcal,
        totalProteinG,
        totalCarbsG,
        totalFatG,
        totalFiberG,
      };
    }

    if (loc === 'rw') {
      const planMarkdown =
        `Urakoze ku makuru watanze! Dore **urugero rwa gahunda y’umunsi umwe** ijyanye n’intego yawe n’ibiribwa biboneka${countryLabel} mu **mafunguro ${mealsCount}**:\n\n` +
        mealLines.join('\n\n') +
        `\n\n**Igiteranyo cy’umunsi ugereranyije n’intego yawe:**\n` +
        `- Ingufu (Calories): **${totalKcal} kcal** (Intego yawe: ~${targetKcal} kcal)\n` +
        `- Proteyine: **${totalProteinG}g** (Intego: ${targetProteinG}g) | Ibitera imbaraga: **${totalCarbsG}g** | Amavuta: **${totalFatG}g**\n` +
        `- Fibre: **~${totalFiberG}g** | Amazi: **~${waterLiters} L/umunsi**\n\n` +
        `*Icyitonderwa:* Iyi mibare ni igereranya rya USDA FoodData Central kandi ishobora guhinduka bitewe n’uko ibiryo bitetse cyangwa ingano nyayo.\n\n` +
        `Wifuza ko duhindura ikiribwa runaka cyangwa ingano yacyo?`;

      return {
        planMarkdown,
        keyTakeaways: [
          `Igiteranyo cy’umunsi (${totalKcal} kcal, ${totalProteinG}g proteyine) kijyanye n’intego yawe (~${targetKcal} kcal).`,
          'Ingano yerekanywe muri garama (g) n’igipimo cyo mu rugo.',
          'Ushobora gusaba guhindura ikiribwa icyo ari cyo cyose.',
        ],
        targetKcal,
        totalKcal,
        totalProteinG,
        totalCarbsG,
        totalFatG,
        totalFiberG,
      };
    }

    // Default English ('en')
    const planMarkdown =
      `Thank you for sharing those details! Here is a practical **one-day example meal plan** tailored to your schedule and local foods${countryLabel} across **${mealsCount} meals**:\n\n` +
      mealLines.join('\n\n') +
      `\n\n**Estimated Full-Day Totals vs. Your Saved Targets:**\n` +
      `- Calories: **${totalKcal} kcal** (Saved Daily Target: ~${targetKcal} kcal)\n` +
      `- Protein: **${totalProteinG}g** (Target: ${targetProteinG}g) | Carbohydrates: **${totalCarbsG}g** (Target: ${targetCarbsG}g) | Fat: **${totalFatG}g** (Target: ${targetFatG}g)\n` +
      `- Fiber: **~${totalFiberG}g** (Target: ${targetFiberG}g) | Daily Water: **~${waterLiters} L/day**\n\n` +
      `*Important estimation note:* Nutrient values are approximate estimates based on USDA FoodData Central and naturally vary by brand, recipe, cooking method, and exact portion size (they are not laboratory-grade measurements).\n\n` +
      `Would you like to swap any food item, adjust portion sizes, or shift meals around your workout time?`;

    return {
      planMarkdown,
      keyTakeaways: [
        `Full-day totals (${totalKcal} kcal, ${totalProteinG}g protein) align closely with your daily target (~${targetKcal} kcal).`,
        'Quantities include grams and household measures with raw vs. cooked state specified.',
        'Ask anytime to swap a food, adjust portions, or change meal timing.',
      ],
      targetKcal,
      totalKcal,
      totalProteinG,
      totalCarbsG,
      totalFatG,
      totalFiberG,
    };
  }

  function buildDeterministicCoachTurn(
    question: string,
    loc: Locale,
    state: ExtractedConversationState,
    ctx: SafeProfileContext | null,
    attachment: SafeAttachment | null
  ): StructuredCoachResponse {
    // 1. Natural Conversational Greeting
    if (!attachment && isConversationalGreeting(question)) {
      if (loc === 'ar') {
        return {
          status: 'ok',
          reply:
            'أهلاً وسهلاً بك! أنا بخير الحمد لله، وسعيد بوجودك في MGREFOTS. كيف تحب أن نبدأ اليوم — هل لديك سؤال غذائي محدد أم ترغب في تنظيم وجباتك اليومية لهدفك الرياضي؟',
          answer:
            'أهلاً وسهلاً بك! أنا بخير الحمد لله، وسعيد بوجودك في MGREFOTS. كيف تحب أن نبدأ اليوم — هل لديك سؤال غذائي محدد أم ترغب في تنظيم وجباتك اليومية لهدفك الرياضي؟',
          keyTakeaways: [],
          followUpQuestions: [],
          referenceNote: 'MGREFOTS Nutrition Coach',
          conversationSummary: state.updatedSummary,
          sourceMode: 'usda_deterministic',
        };
      }
      if (loc === 'fr') {
        const text =
          'Bonjour ! Je vais très bien, merci. Comment souhaitez-vous commencer aujourd’hui : avez-vous une question sur un aliment ou souhaitez-vous organiser vos repas selon votre objectif ?';
        return {
          status: 'ok',
          reply: text,
          answer: text,
          keyTakeaways: [],
          followUpQuestions: [],
          referenceNote: 'MGREFOTS Nutrition Coach',
          conversationSummary: state.updatedSummary,
          sourceMode: 'usda_deterministic',
        };
      }
      if (loc === 'rw') {
        const text =
          'Muraho neza! Nishimiye kugufasha muri MGREFOTS. Wifuza kubaza ikibazo ku biribwa cyangwa gupanga amafunguro ajyanye n’intego yawe ya siporo?';
        return {
          status: 'ok',
          reply: text,
          answer: text,
          keyTakeaways: [],
          followUpQuestions: [],
          referenceNote: 'MGREFOTS Nutrition Coach',
          conversationSummary: state.updatedSummary,
          sourceMode: 'usda_deterministic',
        };
      }
      const text =
        'Hello! Glad to have you here. How would you like to start today—do you have a question about a specific food, or would you like help organizing your daily meals around your fitness goal?';
      return {
        status: 'ok',
        reply: text,
        answer: text,
        keyTakeaways: [],
        followUpQuestions: [],
        referenceNote: 'MGREFOTS Nutrition Coach',
        conversationSummary: state.updatedSummary,
        sourceMode: 'usda_deterministic',
      };
    }

    // 2. Urgent Medical Symptoms -> Urgent Care Referral (Never a meal plan)
    if (state.urgentSymptomsDetected) {
      const card = CLINICAL_HEALTH_GUIDANCE.urgent_symptoms;
      const text = `${card.titleByLocale[loc]}\n\n${card.summaryByLocale[loc]}\n\n${card.whenToConsultClinicianByLocale[loc]}`;
      return {
        status: 'urgent_care',
        reply: text,
        answer: text,
        keyTakeaways: card.educationalPointsByLocale[loc],
        followUpQuestions: [],
        referenceNote: `${card.sourceName} (${card.sourceUrl})`,
        conversationSummary: state.updatedSummary,
        sourceMode: 'usda_deterministic',
      };
    }

    // 3. Under-18 Safety Boundary
    if (state.under18Detected) {
      const card = CLINICAL_HEALTH_GUIDANCE.under_18;
      const text = `${card.titleByLocale[loc]}\n\n${card.summaryByLocale[loc]}\n\n${card.whenToConsultClinicianByLocale[loc]}`;
      return {
        status: 'safety_referral',
        reply: text,
        answer: text,
        keyTakeaways: card.educationalPointsByLocale[loc],
        followUpQuestions: [],
        referenceNote: `${card.sourceName} (${card.sourceUrl})`,
        conversationSummary: state.updatedSummary,
        sourceMode: 'usda_deterministic',
      };
    }

    // 4. Chronic Condition / Pregnancy / Eating Disorder Safety Boundary
    if (state.detectedConditionKey) {
      const condKey = state.detectedConditionKey;
      const card =
        CLINICAL_HEALTH_GUIDANCE[condKey] ||
        CLINICAL_HEALTH_GUIDANCE.other_chronic;
      const medSafetyLine =
        loc === 'ar'
          ? 'تنبيه أمان هام: هذا المساعد يقدم معلومات تثقيفية عامة فقط ولا يحدد سعرات أو جرامات علاجية للحالات الطبية، ولا ينصح أبداً بتغيير أو إيقاف أي دواء أو أنسولين أو مكمل علاجي موصوف. يرجى المتابعة مع طبيبك المختص أو أخصائي التغذية الإكلينيكية.'
          : loc === 'fr'
          ? 'Rappel de sécurité : Cet assistant fournit uniquement des informations éducatives générales sans cibles thérapeutiques chiffrées et ne recommande jamais de modifier ou d’arrêter un médicament prescrit. Consultez votre médecin ou un diététicien agréé.'
          : loc === 'rw'
          ? 'Icyitonderwa cy’umutekano: Uyu mufasha atanga ubumenyi rusange gusa kandi ntabwo ategeka guhindura cyangwa guhagarika imiti wandikiwe na muganga. Gana muganga cyangwa inzobere mu mirire.'
          : 'Important safety note: This assistant provides general educational information only—not disease-specific calorie, carbohydrate, sodium, or purine targets—and never recommends changing or stopping prescribed medication, insulin, or treatment. Please consult a qualified physician or registered dietitian for individualized care.';

      const text = `${card.titleByLocale[loc]}\n\n${card.summaryByLocale[loc]}\n\n${medSafetyLine}\n\n${card.whenToConsultClinicianByLocale[loc]}`;
      return {
        status: 'safety_referral',
        reply: text,
        answer: text,
        keyTakeaways: card.educationalPointsByLocale[loc].slice(0, 3),
        followUpQuestions: [],
        referenceNote: `${card.sourceName} (${card.sourceUrl})`,
        conversationSummary: state.updatedSummary,
        sourceMode: 'usda_deterministic',
      };
    }

    // 5. General Fitness Goal / Meal Plan Flow:
    // If user states a goal or asks for a meal plan, check if we still need 1-2 follow-up questions before generating the plan!
    const needsBodyStats = state.missingCoreBodyStats.length > 0;
    const needsPersonalization = state.missingPersonalizationItems.length > 0;

    if (
      (state.goalStatedInChat || state.planRequestedInChat) &&
      !state.swapOrAdjustRequested &&
      (needsBodyStats || needsPersonalization)
    ) {
      const followUps: string[] = [];

      if (loc === 'ar') {
        const knownParts: string[] = [];
        if (state.age) knownParts.push(`العمر ${state.age} سنة`);
        if (state.weightKg) knownParts.push(`الوزن ${state.weightKg} كجم`);
        if (state.heightCm) knownParts.push(`الطول ${state.heightCm} سم`);
        if (state.countryName) knownParts.push(`الدولة: ${state.countryName}`);
        if (ctx?.targetKcal)
          knownParts.push(
            `الهدف اليومي المسجل: ~${ctx.targetKcal} سعرة و${ctx.proteinG} جم بروتين`
          );

        const goalLabelAr =
          state.effectiveGoal === 'build_muscle'
            ? 'زيادة الكتلة العضلية'
            : state.effectiveGoal === 'lose_fat'
            ? 'خفض الدهون مع الحفاظ على العضلات'
            : 'تنظيم التغذية والحفاظ على الوزن';

        if (needsBodyStats) {
          const missingAr = state.missingCoreBodyStats
            .map((m) =>
              m === 'age' ? 'العمر' : m === 'weight' ? 'الوزن الحالي' : 'الطول'
            )
            .join(' و');
          followUps.push(
            `ما هو ${missingAr} لديك حالياً حتى أحسب احتياجك اليومي بدقة دون تخمين؟`
          );
        }
        if (
          state.missingPersonalizationItems.includes('training_time_and_meals')
        ) {
          followUps.push(
            'كم عدد الوجبات المفضل لديك يومياً (3 أم 4 وجبات)، وفي أي وقت من اليوم تتمرن عادةً؟'
          );
        }
        if (
          followUps.length < 2 &&
          state.missingPersonalizationItems.includes(
            'food_preferences_and_allergies'
          )
        ) {
          followUps.push(
            'ما هي الأطعمة التي تفضلها (مثل الدجاج، البيض، الشوفان، الأرز، البقوليات) وهل توجد أطعمة لا تحبها أو لديك حساسية منها؟'
          );
        }

        const limitedFollowUps = followUps.slice(0, 2);
        const knownLine =
          knownParts.length > 0
            ? `لقد اعتمدت بياناتك المسجلة بالفعل (${knownParts.join('، ')}) ولن أكرر السؤال عنها.`
            : 'بعض القياسات الأساسية غير مسجلة بعد في ملفك، لذا لن أفترض أرقاماً من عندي.';

        const reply =
          `هدف ممتاز (${goalLabelAr})! ${knownLine}\n\n` +
          `قبل أن أجهز لك جدول وجبات ليوم كامل متوافق مع احتياجك، أحتاج فقط إلى إجابتك على ${
            limitedFollowUps.length === 1 ? 'هذا السؤال السريع' : 'هذين السؤالين السريعين'
          }:\n` +
          limitedFollowUps.map((q, idx) => `${idx + 1}. ${q}`).join('\n');

        return {
          status: 'needs_more_info',
          reply,
          answer: reply,
          keyTakeaways: [],
          followUpQuestions: limitedFollowUps,
          referenceNote: 'MGREFOTS Multi-Turn Nutrition Coach',
          conversationSummary: state.updatedSummary,
          sourceMode: 'usda_deterministic',
        };
      }

      if (loc === 'fr') {
        const knownParts: string[] = [];
        if (state.age) knownParts.push(`${state.age} ans`);
        if (state.weightKg) knownParts.push(`${state.weightKg} kg`);
        if (state.heightCm) knownParts.push(`${state.heightCm} cm`);
        if (state.countryName) knownParts.push(`Pays : ${state.countryName}`);
        if (ctx?.targetKcal)
          knownParts.push(
            `Cible enregistrée : ~${ctx.targetKcal} kcal & ${ctx.proteinG}g protéines`
          );

        if (needsBodyStats) {
          followUps.push(
            'Quels sont vos âge, poids et taille actuels afin d’estimer vos besoins sans inventer de valeurs ?'
          );
        }
        if (
          state.missingPersonalizationItems.includes('training_time_and_meals')
        ) {
          followUps.push(
            'Combien de repas par jour préférez-vous (3 ou 4) et à quel moment de la journée vous entraînez-vous ?'
          );
        }
        if (
          followUps.length < 2 &&
          state.missingPersonalizationItems.includes(
            'food_preferences_and_allergies'
          )
        ) {
          followUps.push(
            'Quels sont vos aliments préférés et avez-vous des aliments que vous évitez ou des allergies ?'
          );
        }

        const limitedFollowUps = followUps.slice(0, 2);
        const knownLine =
          knownParts.length > 0
            ? `J’ai bien pris en compte vos données enregistrées (${knownParts.join(', ')}).`
            : 'Certaines mesures de base ne figurent pas encore dans votre profil.';

        const reply =
          `Très bon objectif ! ${knownLine}\n\n` +
          `Avant de générer votre plan d’exemple sur une journée, pourriez-vous préciser :\n` +
          limitedFollowUps.map((q, idx) => `${idx + 1}. ${q}`).join('\n');

        return {
          status: 'needs_more_info',
          reply,
          answer: reply,
          keyTakeaways: [],
          followUpQuestions: limitedFollowUps,
          referenceNote: 'MGREFOTS Multi-Turn Nutrition Coach',
          conversationSummary: state.updatedSummary,
          sourceMode: 'usda_deterministic',
        };
      }

      if (loc === 'rw') {
        if (needsBodyStats) {
          followUps.push(
            'Ufite imyaka ingahe, ibiro bingahe n’uburebure bungana iki?'
          );
        }
        if (
          state.missingPersonalizationItems.includes('training_time_and_meals')
        ) {
          followUps.push(
            'Wifuza amafunguro angahe ku munsi (3 cyangwa 4), kandi ukora imyitozo ryari?'
          );
        }
        if (
          followUps.length < 2 &&
          state.missingPersonalizationItems.includes(
            'food_preferences_and_allergies'
          )
        ) {
          followUps.push(
            'Ni ibihe biribwa ukunda cyangwa udakunda (cyangwa bikugwa nabi)?'
          );
        }
        const limitedFollowUps = followUps.slice(0, 2);
        const reply =
          `Intego nziza cyane! Mbere yo kugupangira gahunda y’umunsi, ndagusaba gusubiza ibi bibazo:\n` +
          limitedFollowUps.map((q, idx) => `${idx + 1}. ${q}`).join('\n');

        return {
          status: 'needs_more_info',
          reply,
          answer: reply,
          keyTakeaways: [],
          followUpQuestions: limitedFollowUps,
          referenceNote: 'MGREFOTS Multi-Turn Nutrition Coach',
          conversationSummary: state.updatedSummary,
          sourceMode: 'usda_deterministic',
        };
      }

      // Default English ('en')
      const knownParts: string[] = [];
      if (state.age) knownParts.push(`age ${state.age}`);
      if (state.weightKg) knownParts.push(`${state.weightKg} kg`);
      if (state.heightCm) knownParts.push(`${state.heightCm} cm`);
      if (state.countryName) knownParts.push(`country: ${state.countryName}`);
      if (ctx?.targetKcal)
        knownParts.push(
          `saved target: ~${ctx.targetKcal} kcal & ${ctx.proteinG}g protein`
        );

      const goalLabelEn =
        state.effectiveGoal === 'build_muscle'
          ? 'building muscle and strength'
          : state.effectiveGoal === 'lose_fat'
          ? 'losing body fat while preserving muscle'
          : 'supporting your daily nutrition';

      if (needsBodyStats) {
        const missingEn = state.missingCoreBodyStats.join(', ');
        followUps.push(
          `What is your current ${missingEn} so I can estimate your daily needs without guessing?`
        );
      }
      if (
        state.missingPersonalizationItems.includes('training_time_and_meals')
      ) {
        followUps.push(
          'How many meals per day do you prefer (3 or 4), and what time of day do you usually train?'
        );
      }
      if (
        followUps.length < 2 &&
        state.missingPersonalizationItems.includes(
          'food_preferences_and_allergies'
        )
      ) {
        followUps.push(
          'Which staple foods do you enjoy most (e.g., chicken, eggs, rice, oats, beans), and are there any foods you dislike or have allergies to?'
        );
      }

      const limitedFollowUps = followUps.slice(0, 2);
      const knownLine =
        knownParts.length > 0
          ? `I already have your profile details on file (${knownParts.join(', ')}), so I won't ask for those again.`
          : 'Some baseline measurements are not saved in your profile yet, so I will not invent them.';

      const reply =
        `Great goal—focusing on ${goalLabelEn}! ${knownLine}\n\n` +
        `Before I build your one-day example meal plan, please let me know:\n` +
        limitedFollowUps.map((q, idx) => `${idx + 1}. ${q}`).join('\n');

      return {
        status: 'needs_more_info',
        reply,
        answer: reply,
        keyTakeaways: [],
        followUpQuestions: limitedFollowUps,
        referenceNote: 'MGREFOTS Multi-Turn Nutrition Coach',
        conversationSummary: state.updatedSummary,
        sourceMode: 'usda_deterministic',
      };
    }

    // 6. If enough information is collected (or user requested a food swap / adjustment on the plan), build the Target-Aligned One-Day Example Plan!
    if (
      state.planRequestedInChat ||
      state.goalStatedInChat ||
      state.swapOrAdjustRequested
    ) {
      const builtPlan = buildTargetAlignedOneDayPlan(loc, state, ctx);
      return {
        status: 'plan_ready',
        reply: builtPlan.planMarkdown,
        answer: builtPlan.planMarkdown,
        keyTakeaways: builtPlan.keyTakeaways,
        followUpQuestions: [],
        referenceNote:
          'USDA FoodData Central (Foundation / SR Legacy) & Mifflin-St Jeor Equation',
        conversationSummary: `${state.updatedSummary} | Plan generated: ${builtPlan.totalKcal} kcal`,
        sourceMode: 'usda_deterministic',
      };
    }

    // 7. Standalone educational question (e.g. protein sources, hydration, pre/post-workout, or file attachment)
    if (attachment) {
      const isPdf = attachment.mimeType === 'application/pdf';
      const text =
        loc === 'ar'
          ? `تم استلام المرفق (${attachment.name} — ${
              isPdf ? 'ملف PDF' : 'صورة'
            }). عند مراجعة أي ملصق غذائي أو جدول وجبات، تأكد من حجم الحصة بالجرام (وهل الوزن نيئ أم مطبوخ)، وقارن كمية البروتين والألياف والصوديوم مع هدفك اليومي${
              ctx?.targetKcal ? ` (~${ctx.targetKcal} سعرة و${ctx.proteinG} جم بروتين)` : ''
            }. إذا كان الملف يتضمن تحاليل طبية، يُرجى مراجعته مع طبيبك المختص.`
          : `Received your attachment (${attachment.name} — ${
              isPdf ? 'PDF document' : 'image'
            }). When reviewing a nutrition label or meal table, check the serving size in grams (and whether weights are raw or cooked) and compare protein, fiber, and sodium against your daily targets${
              ctx?.targetKcal ? ` (~${ctx.targetKcal} kcal & ${ctx.proteinG}g protein)` : ''
            }. If the file contains medical lab results, please review them with your physician.`;
      return {
        status: 'ok',
        reply: text,
        answer: text,
        keyTakeaways:
          loc === 'ar'
            ? [
                'تحقق من حجم الحصة بالجرام والفرق بين الوزن النيئ والمطبوخ.',
                'استشر الطبيب المختص إذا كان المرفق يحتوي على نتائج تحاليل طبية.',
              ]
            : [
                'Verify serving size in grams and raw vs. cooked weight.',
                'Consult a qualified clinician for medical lab reports.',
              ],
        followUpQuestions: [],
        referenceNote: 'USDA FoodData Central & Clinical Safety Guidelines',
        conversationSummary: state.updatedSummary,
        sourceMode: 'usda_deterministic',
      };
    }

    // General Q&A fallback using verified foods
    const builtPlan = buildTargetAlignedOneDayPlan(loc, state, ctx);
    const generalReply =
      loc === 'ar'
        ? `بخصوص سؤالك: يمكنك الاعتماد على مصادر البروتين والكربوهيدرات الكاملة المتوفرة في بلدك مع قياس الحصص بالجرام والمعيار المنزلي. إذا كنت ترغب في جدول وجبات يومي كامل مخصص لهدفك${
            ctx?.targetKcal ? ` (~${ctx.targetKcal} سعرة)` : ''
          }، أخبرني بعدد الوجبات المفضل لديك وموعد تمرينك!`
        : `To support your nutrition goal${
            ctx?.targetKcal ? ` (~${ctx.targetKcal} kcal/day, ${ctx.proteinG}g protein)` : ''
          }, focus on whole-food protein anchors, high-fiber carbohydrates measured in cooked weight, and steady hydration. If you would like a personalized one-day example meal plan, let me know your preferred number of meals and training time!`;

    return {
      status: 'ok',
      reply: generalReply,
      answer: generalReply,
      keyTakeaways: builtPlan.keyTakeaways.slice(0, 2),
      followUpQuestions: [],
      referenceNote: 'USDA FoodData Central (Foundation / SR Legacy)',
      conversationSummary: state.updatedSummary,
      sourceMode: 'usda_deterministic',
    };
  }

  function extractJsonSafe(rawText: string): {
    reply?: string;
    answer?: string;
    keyTakeaways?: string[];
    followUpQuestions?: string[];
    referenceNote?: string;
    conversationSummary?: string;
    status?: CoachResponseStatus;
  } | null {
    const trimmed = rawText.trim();
    if (!trimmed) return null;
    const stripped = trimmed
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();
    try {
      return JSON.parse(stripped);
    } catch {
      const firstBrace = stripped.indexOf('{');
      const lastBrace = stripped.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace > firstBrace) {
        try {
          return JSON.parse(stripped.slice(firstBrace, lastBrace + 1));
        } catch {
          return null;
        }
      }
      return {
        reply: sanitizePlainText(stripped),
        answer: sanitizePlainText(stripped),
        keyTakeaways: [],
        followUpQuestions: [],
        referenceNote: 'USDA FoodData Central / MGREFOTS Nutrition Coach',
      };
    }
  }

  // Status route: checks Gemini configuration independently of any Gmail/notification variables
  app.get('/api/nutrition/status', (_req, res) => {
    const rawApiKey = (
      process.env.GEMINI_API_KEY ||
      process.env.API_KEY ||
      ''
    ).trim();
    const geminiConfigured =
      rawApiKey.length > 8 &&
      rawApiKey !== 'MY_GEMINI_API_KEY' &&
      !rawApiKey.includes('YOUR_API_KEY');
    res.json({
      available: true,
      geminiConfigured,
      model: GEMINI_MODEL,
    });
  });

  // Multi-Turn Educational Nutrition Coach Endpoint
  app.post('/api/nutrition/ask', async (req, res) => {
    try {
      // Allow testing API failure handling cleanly when simulateFailure is requested
      if (req.body?.simulateFailure === true) {
        console.error(
          '[NutritionAssistant] Technical error: code=SIMULATED_FAILURE'
        );
        return res.status(503).json({
          status: 'error',
          code: 'UPSTREAM_UNAVAILABLE',
          message:
            'The nutrition assistant is temporarily unavailable. Please try again.',
        });
      }

      const rawQuestion = sanitizePlainText(
        String(req.body?.message || req.body?.question || '')
      ).slice(0, 1500);
      const uiLocale = String(req.body?.locale || 'en').slice(0, 5);

      // Validate bounded recent chat messages (max 8 messages, max 800 chars each)
      const recentMessages: BoundedChatTurn[] = Array.isArray(
        req.body?.recentMessages
      )
        ? req.body.recentMessages
            .slice(-8)
            .filter(
              (m: unknown) =>
                m &&
                typeof m === 'object' &&
                ((m as { role?: string }).role === 'user' ||
                  (m as { role?: string }).role === 'assistant') &&
                typeof (m as { text?: string }).text === 'string'
            )
            .map((m: { role: 'user' | 'assistant'; text: string }) => ({
              role: m.role,
              text: sanitizePlainText(m.text).slice(0, 800),
            }))
        : [];

      const priorSummary = sanitizePlainText(
        String(req.body?.conversationSummary || '')
      ).slice(0, 1000);

      // Parse optional Image or PDF attachment
      const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
        'application/pdf',
      ];
      let safeAttachment: SafeAttachment | null = null;
      if (
        req.body?.attachment &&
        typeof req.body.attachment.mimeType === 'string' &&
        typeof req.body.attachment.base64Data === 'string'
      ) {
        const mimeType = req.body.attachment.mimeType.trim().toLowerCase();
        const base64Clean = req.body.attachment.base64Data
          .replace(/^data:[^;]+;base64,/, '')
          .trim();
        if (allowedMimeTypes.includes(mimeType) && base64Clean.length > 0) {
          safeAttachment = {
            name: String(req.body.attachment.name || 'attachment').slice(0, 120),
            mimeType,
            base64Data: base64Clean,
          };
        }
      }

      if (!rawQuestion && !safeAttachment) {
        return res.status(400).json({
          status: 'error',
          code: 'EMPTY_QUESTION',
          message: 'Please enter a message or attach a file.',
        });
      }

      const detectedLocale = detectVisitorLocale(rawQuestion, uiLocale);

      // Parse validated, strictly non-PII relevant profile & assessment fields
      const rawCtx = req.body?.profileContext || req.body?.dietaryContext || null;
      const safeContext: SafeProfileContext | null = rawCtx
        ? {
            hasSavedPlan: Boolean(rawCtx.hasSavedPlan ?? true),
            age:
              typeof rawCtx.age === 'number' &&
              rawCtx.age >= 10 &&
              rawCtx.age <= 110
                ? Math.round(rawCtx.age)
                : null,
            weightKg:
              typeof rawCtx.weightKg === 'number' &&
              rawCtx.weightKg >= 20 &&
              rawCtx.weightKg <= 300
                ? Number(rawCtx.weightKg.toFixed(1))
                : null,
            heightCm:
              typeof rawCtx.heightCm === 'number' &&
              rawCtx.heightCm >= 100 &&
              rawCtx.heightCm <= 250
                ? Math.round(rawCtx.heightCm)
                : null,
            countryName: String(
              rawCtx.countryName || rawCtx.country || ''
            )
              .trim()
              .slice(0, 60),
            goal: rawCtx.goal ? String(rawCtx.goal).slice(0, 40) : null,
            mealsPerDay:
              Number(rawCtx.mealsPerDay) === 4
                ? 4
                : Number(rawCtx.mealsPerDay) === 3
                ? 3
                : null,
            dietPattern: String(rawCtx.dietPattern || 'omnivore').slice(0, 40),
            halalPreference: Boolean(rawCtx.halalPreference ?? true),
            allergies: Array.isArray(rawCtx.allergies)
              ? rawCtx.allergies
                  .slice(0, 8)
                  .map((a: unknown) => String(a).slice(0, 30))
              : [],
            favoriteFoods: String(rawCtx.favoriteFoods || '').slice(0, 200),
            dislikedFoods: String(rawCtx.dislikedFoods || '').slice(0, 200),
            localFoods: String(rawCtx.localFoods || '').slice(0, 200),
            budget: String(rawCtx.budget || 'medium').slice(0, 20),
            trainingDaysPerWeek:
              typeof rawCtx.trainingDaysPerWeek === 'number'
                ? Math.min(7, Math.max(0, Math.round(rawCtx.trainingDaysPerWeek)))
                : null,
            trainingType: String(rawCtx.trainingType || 'resistance').slice(
              0,
              30
            ),
            targetKcal:
              typeof rawCtx.targetKcal === 'number' && rawCtx.targetKcal > 800
                ? Math.round(rawCtx.targetKcal)
                : null,
            proteinG:
              typeof rawCtx.proteinG === 'number' && rawCtx.proteinG > 20
                ? Math.round(rawCtx.proteinG)
                : null,
            carbsG:
              typeof rawCtx.carbsG === 'number' && rawCtx.carbsG >= 20
                ? Math.round(rawCtx.carbsG)
                : null,
            fatG:
              typeof rawCtx.fatG === 'number' && rawCtx.fatG >= 15
                ? Math.round(rawCtx.fatG)
                : null,
            fiberG:
              typeof rawCtx.fiberG === 'number' && rawCtx.fiberG >= 10
                ? Math.round(rawCtx.fiberG)
                : null,
            waterLiters:
              typeof rawCtx.waterLiters === 'number' && rawCtx.waterLiters >= 1
                ? Number(rawCtx.waterLiters.toFixed(1))
                : null,
            safetyFlags: {
              isUnder18: Boolean(rawCtx.safetyFlags?.isUnder18),
              hasUrgentSymptoms: Boolean(rawCtx.safetyFlags?.hasUrgentSymptoms),
              conditions: Array.isArray(rawCtx.safetyFlags?.conditions)
                ? rawCtx.safetyFlags.conditions
                    .slice(0, 10)
                    .map((c: unknown) => String(c).slice(0, 40))
                : [],
              usesInsulinOrHypoglycemiaMeds: String(
                rawCtx.safetyFlags?.usesInsulinOrHypoglycemiaMeds || 'no'
              ).slice(0, 15),
              takesPrescriptionMedsWithDietRules: String(
                rawCtx.safetyFlags?.takesPrescriptionMedsWithDietRules || 'no'
              ).slice(0, 15),
            },
          }
        : null;

      // Analyze multi-turn state, known profile fields, missing personalization fields, and safety boundaries
      const convState = analyzeConversationState(
        rawQuestion,
        recentMessages,
        priorSummary,
        safeContext
      );

      // Pre-compute deterministic coach response (used immediately for greetings, urgent care, safety referrals, and needs_more_info, or as reference/fallback for Gemini)
      const deterministicTurn = buildDeterministicCoachTurn(
        rawQuestion,
        detectedLocale,
        convState,
        safeContext,
        safeAttachment
      );

      // Always return instant deterministic response for:
      // 1) Simple greetings ("ازيك", "Hello", etc.)
      // 2) Urgent medical symptoms
      // 3) Chronic medical conditions / under-18 safety boundary
      // 4) Goal stated when 1-2 follow-up questions are still needed before generating a meal plan
      if (
        !safeAttachment &&
        (isConversationalGreeting(rawQuestion) ||
          deterministicTurn.status === 'urgent_care' ||
          deterministicTurn.status === 'safety_referral' ||
          deterministicTurn.status === 'needs_more_info')
      ) {
        return res.json(deterministicTurn);
      }

      const rawApiKey = (
        process.env.GEMINI_API_KEY ||
        process.env.API_KEY ||
        ''
      ).trim();
      const hasValidKey =
        rawApiKey.length > 8 &&
        rawApiKey !== 'MY_GEMINI_API_KEY' &&
        !rawApiKey.includes('YOUR_API_KEY');

      if (!hasValidKey && process.env.REQUIRE_LIVE_GEMINI === 'true') {
        console.error(
          '[NutritionAssistant] Technical error: code=GEMINI_CONFIG_MISSING'
        );
        return res.status(503).json({
          status: 'error',
          code: 'GEMINI_CONFIG_MISSING',
          message:
            'The AI assistant is not configured yet. Please try again later.',
          ownerSetupMessage:
            'Owner Setup Notice: GEMINI_API_KEY is missing in the server environment.',
        });
      }

      const clientKey = String(req.body?.userId || req.ip || 'anonymous').slice(
        0,
        64
      );
      const withinRateLimit = checkRateLimit(clientKey);

      if (hasValidKey && withinRateLimit) {
        const ai = new GoogleGenAI({
          apiKey: rawApiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const languageMap: Record<Locale, string> = {
          en: 'English',
          ar: 'Arabic (العربية)',
          fr: 'French (Français)',
          rw: 'Kinyarwanda',
        };
        const targetLang = languageMap[detectedLocale];

        const referencePlanSection =
          deterministicTurn.status === 'plan_ready'
            ? `\nVERIFIED TARGET-ALIGNED 1-DAY REFERENCE PLAN (Use these exact USDA gram quantities, household measures, per-meal macros, and full-day totals so the plan aligns with the user's daily targets):\n${deterministicTurn.reply}\n`
            : '';

        const systemInstruction = `You are the MGREFOTS Multi-Turn Educational Nutrition Coach.
CRITICAL LANGUAGE RULE:
- Respond strictly in ${targetLang}. If the visitor writes in Arabic, reply in natural, clear Arabic; if English, reply in English; if French, French; if Kinyarwanda, Kinyarwanda.

MULTI-TURN COACHING & SAFETY RULES:
1. Never invent age, weight, height, calorie targets, or health information. Use the provided Profile & Conversation Summary. Do NOT repeat questions that are already answered in the profile or recent messages.
2. When generating a one-day example meal plan for a healthy adult, include:
   - Meals suited to their preferred number of meals (${convState.mealsPerDay || 3} meals) and training schedule.
   - Realistic foods available in their country (${convState.countryName || 'local market'}) compatible with their preferences and allergies.
   - Approximate quantities in grams (g) plus household measures, distinguishing raw vs. cooked weights.
   - Estimated calories, protein, carbohydrates, and fat per meal AND for the full day, aligned with their saved daily targets.
   - A clear note that food values vary by brand, recipe, cooking method, and portion size (not laboratory-level precision).
3. HEALTH & SAFETY BOUNDARIES:
   - Provide general education only, never medical diagnosis or Medical Nutrition Therapy (MNT).
   - For diabetes, high/low blood pressure, gout, kidney/heart disease, pregnancy, under-18, eating disorders, or suspected lipedema, NEVER generate disease-specific calorie/carbohydrate/sodium/purine targets, NEVER advise changing or stopping medication/insulin, and NEVER diagnose lipedema from thigh fat or lumps. Recommend a physician or registered dietitian.
4. Format your reply as clean plain text / Markdown (no raw HTML tags).`;

        const recentTurnsBlock =
          recentMessages.length > 0
            ? `Recent Conversation Turns:\n${recentMessages
                .map((m) => `${m.role.toUpperCase()}: ${m.text}`)
                .join('\n')}`
            : '';

        const textPrompt = [
          `Known Profile & Conversation Summary: ${convState.updatedSummary || 'None yet'}`,
          recentTurnsBlock,
          referencePlanSection,
          `Current Visitor Message: ${
            rawQuestion ||
            'Please analyze this attached file and explain the nutrition takeaways.'
          }`,
        ]
          .filter(Boolean)
          .join('\n\n');

        const contentParts: Array<
          | { text: string }
          | { inlineData: { mimeType: string; data: string } }
        > = [];

        if (safeAttachment) {
          contentParts.push({
            inlineData: {
              mimeType: safeAttachment.mimeType,
              data: safeAttachment.base64Data,
            },
          });
        }
        contentParts.push({ text: textPrompt });

        const responseSchema = {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description:
                'Clear, natural response in the visitor’s language (plain text or Markdown, no raw HTML).',
            },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description:
                '2 to 3 brief, helpful bullet points in the visitor’s language.',
            },
            followUpQuestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description:
                'Optional 1 to 2 follow-up questions if more information is needed.',
            },
            referenceNote: {
              type: Type.STRING,
              description:
                'Short source note (e.g., USDA FoodData Central / MGREFOTS Nutrition Coach).',
            },
          },
          required: ['reply', 'keyTakeaways'],
        };

        const candidateModels = Array.from(
          new Set([
            'gemini-3-flash-preview',
            GEMINI_MODEL,
            'gemini-3.8-flash',
            'gemini-flash-latest',
          ])
        );

        const perModelTimeoutMs = safeAttachment ? 15000 : 7500;

        for (const modelName of candidateModels) {
          try {
            const supportsThinking =
              modelName.startsWith('gemini-3.8') ||
              modelName.startsWith('gemini-4');
            const response = await ai.models.generateContent({
              model: modelName,
              contents: { parts: contentParts },
              config: {
                abortSignal: AbortSignal.timeout(perModelTimeoutMs),
                systemInstruction,
                ...(supportsThinking
                  ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
                  : {}),
                responseMimeType: 'application/json',
                responseSchema,
              },
            });

            const parsed = extractJsonSafe(response.text ?? '');
            const cleanReply = sanitizePlainText(
              String(parsed?.reply || parsed?.answer || '')
            );
            if (cleanReply.length > 0) {
              return res.json({
                status: deterministicTurn.status,
                reply: cleanReply,
                answer: cleanReply,
                keyTakeaways: Array.isArray(parsed?.keyTakeaways)
                  ? parsed!.keyTakeaways.map((k) => sanitizePlainText(String(k)))
                  : deterministicTurn.keyTakeaways,
                followUpQuestions: Array.isArray(parsed?.followUpQuestions)
                  ? parsed!.followUpQuestions
                      .slice(0, 2)
                      .map((q) => sanitizePlainText(String(q)))
                  : deterministicTurn.followUpQuestions,
                referenceNote: parsed?.referenceNote
                  ? sanitizePlainText(String(parsed.referenceNote))
                  : deterministicTurn.referenceNote,
                conversationSummary: convState.updatedSummary,
                sourceMode: 'gemini',
              } satisfies StructuredCoachResponse);
            }
          } catch (err) {
            console.warn(
              `[NutritionAssistant] Model ${modelName} timeout/error, trying next:`,
              err instanceof Error ? err.message.slice(0, 90) : 'upstream_error'
            );
          }
        }
      }

      // Deterministic USDA & Clinical Coach Fallback
      return res.json(deterministicTurn);
    } catch (err) {
      console.error(
        '[NutritionAssistant] Unexpected route error:',
        err instanceof Error ? err.message.slice(0, 100) : 'unknown_error'
      );
      return res.status(500).json({
        status: 'error',
        code: 'INTERNAL_ERROR',
        message: 'Something went wrong while processing your request. Please try again.',
      });
    }
  });

  if (serveFrontend) {
    if (process.env.NODE_ENV !== 'production') {
      const vite = await createViteServer({
        server: { middlewareMode: true, hmr: false },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } else {
      const distPath = path.join(__dirname, 'dist');
      app.use(PUBLIC_APP_BASE_PATH, express.static(distPath, { dotfiles: 'allow' }));
      app.get(`${PUBLIC_APP_BASE_PATH}/*`, (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
      app.get(PUBLIC_APP_BASE_PATH, (_req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  }

  return app;
}

if (process.env.VERCEL !== '1') {
  createServerApp(true).then((app) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`MGREFOTS server running on http://0.0.0.0:${PORT}`);
    });
  });
}
