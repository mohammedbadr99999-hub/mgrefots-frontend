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
  FoodReferenceItem,
} from './src/utils/nutritionCalculator';
import { Locale } from './src/data/muscleGroups';

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
    if (!authRes.ok) return authRes;
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
    if (!authRes.ok) return authRes;

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
      if (!authRes.ok) {
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
      if (!authRes.ok) {
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
    if (!adminRes.ok) {
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
    if (!authRes.ok) {
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
      email: authRes.user.emailVerified 