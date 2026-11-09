import { createDecipheriv } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../../', import.meta.url));
const work = path.join(root, '.maqaam-build');
const output = path.join(root, 'maqaam-runtime');

export async function prepare() {
  await rm(work, { recursive: true, force: true });
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  await writeFile(path.join(output, 'status.json'), '{"ready":false}');
  if (!process.env.MAQAAM_BUNDLE_KEY) return; // The storefront can deploy while the owner provisions secrets.
  const bytes = Buffer.from((await readFile(new URL('studio.enc', import.meta.url), 'utf8')).trim(), 'base64');
  const key = Buffer.from(process.env.MAQAAM_BUNDLE_KEY, 'base64');
  if (key.length !== 32) throw new Error('Invalid MAQAAM_BUNDLE_KEY length.');
  const decoder = createDecipheriv('aes-256-gcm', key, bytes.subarray(0, 12));
  decoder.setAuthTag(bytes.subarray(12, 28));
  const compressed = Buffer.concat([decoder.update(bytes.subarray(28)), decoder.final()]);
  const files = JSON.parse(gunzipSync(compressed).toString('utf8'));
  try {
    for (const [name, text] of Object.entries(files)) {
      if (!/^(?:src\/(?:[\w-]+\/)*[\w.-]+\.(?:ts|tsx|css)|server\.ts|index\.html|tsconfig\.json|vite\.config\.mjs)$/.test(name)) throw new Error('Unexpected studio source path.');
      const dest = path.join(work, name);
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, text);
    }
    const { build: viteBuild } = await import('vite');
    const { build: esbuild } = await import('esbuild');
    await viteBuild({ root: work, configFile: path.join(work, 'vite.config.mjs'),
      build: { outDir: path.join(output, 'ui'), sourcemap: false, emptyOutDir: true } });
    await esbuild({ entryPoints: [path.join(work, 'server.ts')], outfile: path.join(output, 'api.cjs'),
      bundle: true, platform: 'node', format: 'cjs', packages: 'external', target: 'node20' });
    await writeFile(path.join(output, 'status.json'), '{"ready":true}');
  } finally {
    await rm(work, { recursive: true, force: true });
  }
}
await prepare();
