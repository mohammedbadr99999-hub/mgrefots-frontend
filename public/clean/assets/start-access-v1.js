async function startStudio() {
  const response = await fetch('/api/clean/config', { cache: 'no-store' });
  if (!response.ok) throw new Error('Configuration unavailable');
  const config = await response.json();
  if (config.accessMode === 'guest') {
    await import('./studio-guest-v1.js');
    return;
  }
  if (config.accessMode !== 'subscription') throw new Error('Unknown access mode');
  const script = document.createElement('script');
  script.src = 'https://cdn.paddle.com/paddle/v2/paddle.js';
  document.head.appendChild(script);
  await import('./index-CH3y6puk.js');
}

startStudio().catch(() => {
  const root = document.getElementById('root');
  root.textContent = 'Pixel Clean could not load. ';
  const retry = document.createElement('button');
  retry.textContent = 'Try again';
  retry.onclick = () => location.reload();
  root.appendChild(retry);
});
