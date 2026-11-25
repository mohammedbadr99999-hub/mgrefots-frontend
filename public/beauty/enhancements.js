import {products} from './catalog.js?v=hero-motion5';

const brandOf=p=>p.brand||((p.name.match(/^([A-Za-z][A-Za-z0-9-]*)\b/)||[])[1]||'ANUA');
const brands=[...new Set(products.map(brandOf))];

function enhanceBrandNavigation(){
  const menu=document.querySelector('.brand-menu > div');
  const menuHtml=brands.map(b=>`<a href="/beauty?brand=${encodeURIComponent(b)}" data-brand-link="${b}">${b}</a>`).join('');
  if(menu&&menu.innerHTML!==menuHtml)menu.innerHTML=menuHtml;
  const strip=document.querySelector('.brand-strip > div');
  const stripHtml=[...brands,...brands,...brands].map(b=>`<b>${b}</b><span>REFOTS BEAUTY</span>`).join('');
  if(strip&&strip.innerHTML!==stripHtml)strip.innerHTML=stripHtml;

}

function ensureViewer(){
  if(document.getElementById('image-viewer'))return;
  document.body.insertAdjacentHTML('beforeend','<dialog id="image-viewer" class="image-viewer"><button type="button" class="viewer-close" aria-label="Close image">×</button><figure><img id="viewer-image" alt=""><figcaption id="viewer-caption"></figcaption></figure></dialog>');
  const viewer=document.getElementById('image-viewer');
  viewer.addEventListener('click',e=>{if(e.target===viewer||e.target.closest('.viewer-close'))viewer.close()});
}
function openViewer(src,caption){ensureViewer();const viewer=document.getElementById('image-viewer');document.getElementById('viewer-image').src=src;document.getElementById('viewer-image').alt=caption||'';document.getElementById('viewer-caption').textContent=caption||'';viewer.showModal()}
function enhanceImages(){
  document.querySelectorAll('.photo,.detail-photo').forEach(host=>{
    if(host.querySelector('.zoom-button'))return;
    const img=host.querySelector('img');if(!img)return;
    const b=document.createElement('button');b.type='button';b.className='zoom-button';b.dataset.zoom=img.currentSrc||img.src;b.dataset.caption=img.alt;b.setAttribute('aria-label','تكبير صورة المنتج');b.textContent='+';host.append(b);
  });
}
function ensurePicker(){
  const form=document.getElementById('checkout');if(!form||form.querySelector('.order-picker'))return;
  const picker=document.createElement('section');picker.className='order-picker';picker.innerHTML='<h3>اختاري المنتجات للطلب</h3><p>اختاري البراند أولًا، ثم المنتج. يمكنك إضافة أكثر من براند ومنتج إلى حقيبتك قبل إرسال الطلب.</p><div class="picker-row"><label>البراند<select id="picker-brand"></select></label><label>المنتج<select id="picker-product"></select></label><button type="button" id="picker-add">أضف للحقيبة</button></div>';
  form.insertBefore(picker,form.firstElementChild);
  const bs=picker.querySelector('#picker-brand'),ps=picker.querySelector('#picker-product');
  bs.innerHTML=brands.map(b=>`<option value="${b}">${b}</option>`).join('');
  function fill(){const list=products.filter(p=>brandOf(p)===bs.value);ps.innerHTML=list.map(p=>`<option value="${p.id}">${p.name}${p.size?' · '+p.size:''}</option>`).join('')}
  bs.addEventListener('change',fill);fill();
  picker.querySelector('#picker-add').addEventListener('click',()=>{const id=ps.value;if(window.__beautyAdd&&id){window.__beautyAdd(id);window.__beautyCart?.()}});
}
document.addEventListener('click',e=>{
  const zoom=e.target.closest('.zoom-button');
  if(zoom){e.preventDefault();e.stopPropagation();openViewer(zoom.dataset.zoom,zoom.dataset.caption);return}
  const detailImage=e.target.closest('.detail-photo img');
  if(detailImage){e.preventDefault();openViewer(detailImage.currentSrc||detailImage.src,detailImage.alt)}
});
// Refresh after the application replaces cards or a product detail.
const main = document.getElementById('main');
const observer = new MutationObserver(refreshProducts);
function refreshProducts() {
  observer.disconnect();
  enhanceImages();
  enhanceBrandNavigation();
  observer.observe(main, { childList: true, subtree: true });
}
ensureViewer();
ensurePicker();
refreshProducts();
