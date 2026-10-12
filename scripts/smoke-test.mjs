import assert from 'node:assert/strict';
const base = process.env.SMOKE_TEST_URL ?? 'http://127.0.0.1:3001';
for (const pathname of ['/', '/reservation', '/reservation?branch=bigbowlroma', '/reservation?branch=bigbowltelheiras', '/reservation?branch=bigbowlspacio', '/reservation?branch=roma', '/reservation?branch=telheiras', '/reservation?branch=spacio', '/reservation?branch=invalid', '/reservation?branch=roma&branch=spacio', '/robots.txt', '/sitemap.xml']) {
  const response = await fetch(base + pathname);
  assert.equal(response.status, 200, pathname);
  assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  assert.equal(response.headers.get('x-frame-options'), 'SAMEORIGIN');
  assert.equal(response.headers.get('x-powered-by'), null);
  const body = await response.text();
  if (pathname === '/') {
    assert(/rel="canonical" href="https:\/\/bigbowl.pt\/?"/.test(body), 'Home canonical URL');
    assert(/social-preview.jpg/.test(body), "Expected production metadata");
    const data = JSON.parse(body.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
    assert.equal(data['@graph'].length, 3);
    assert(!body.includes('data-pending-lang'));
    console.log('Home metadata, structured data and language fallback passed.');
  }
  if (pathname.startsWith('/reservation')) {
    assert(/rel="canonical" href="https:\/\/bigbowl.pt\/reservation"/.test(body), "Expected production metadata");
    const branch = (pathname.endsWith('=telheiras') || pathname.endsWith('=bigbowltelheiras')) ? 'telheiras' : (pathname.endsWith('=spacio') || pathname.endsWith('=bigbowlspacio')) && !pathname.includes('&') ? 'spacio' : 'roma';
    assert(body.includes(`src="https://reserve.intelis.pt/bigbowl${branch}"`), pathname);
  }
  if (pathname === '/sitemap.xml') assert(/https:\/\/bigbowl.pt\/reservation/.test(body), "Expected production metadata");
  if (pathname === '/robots.txt') assert(/Sitemap: https:\/\/bigbowl.pt\/sitemap.xml/.test(body), "Expected production metadata");
  console.log('200 + security headers:', pathname);
}
assert.equal((await fetch(base+'/not-a-real-page')).status, 404);
const image = await fetch(base+'/_next/image?url=%2Fimages%2Fspace-roma.webp&w=1080&q=75', {headers:{accept:'image/webp'}});
assert.equal(image.status,200);
assert.equal(image.headers.get('content-type'),'image/webp');
const imageBytes=(await image.arrayBuffer()).byteLength;
console.log('Optimized hero at 1080px:', imageBytes, 'bytes;', image.headers.get('cache-control'));
assert.equal((await fetch(base+'/_next/image?url=https%3A%2F%2Fexample.com%2Fphoto.jpg&w=1080&q=75')).status,400);
console.log('404 page, optimized images and remote image restriction passed.');
