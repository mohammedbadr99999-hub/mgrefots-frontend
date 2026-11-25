import { beautyOfJoseon, vaseline, medicube } from './catalog-three-brands.js';

// Price basis: Imported_Korean_All_Products.xlsx, newest explicit dated entry per exact size.
// Retail is cost × 1.25 EGP. Private purchasing costs are not published.
const anua = [
['serum-minis-discovery-kit','Serum Minis Discovery Kit','3 × 10 ml',1087.5,'Sets','1-0'],
['golden-firming-collagen-mask','Golden Firming Collagen Wrapping Mask','80 ml',1050,'Masks','1-1'],
['rice-70-glow-milky-toner','Rice 70 Glow Milky Toner','250 ml',1162.5,'Toners','1-2'],
['pdrn-hyaluronic-moisturizing-cream','PDRN Hyaluronic Acid 100 Moisturizing Cream','60 ml',1093.75,'Moisturizers','1-3'],
['heartleaf-quercetinol-cleansing-foam','Heartleaf Quercetinol Pore Deep Cleansing Foam','150 ml',1093.75,'Cleansers','2-0'],
['invisible-glow-sunscreen-stick','Invisible Glow Finish Sunscreen Stick SPF50+ PA++++','18 g',987.5,'Sun care','2-1'],
['rice-70-ceramide-milk','Rice 70 + Ceramide Intensive Moisturizing Milk','150 ml',1025,'Moisturizers','2-2'],
['pdrn-hydrating-capsule-mist-100ml','PDRN Hyaluronic Acid Hydrating Capsule Mist','100 ml',1312.5,'Mists','3-0'],
['azelaic-hyaluron-soothing-pads','Azelaic 10 + Hyaluron Redness Soothing Pad','90 pads',1187.5,'Toners','3-1'],
['pdrn-hyaluronic-capsule-serum','PDRN Hyaluronic Acid Capsule 100 Serum','30 ml',1050,'Serums','3-2'],
['niacinamide-10-txa-4-serum','Niacinamide 10 + TXA 4 Serum','30 ml',1050,'Serums','4-0'],
['peach-77-conditioning-milk','Peach 77 Niacin Conditioning Milk','150 ml',1062.5,'Moisturizers','4-1'],
['peach-70-niacin-serum','Peach 70 Niacin Serum','30 ml',1050,'Serums','4-2'],
['azelaic-acid-10-hyaluron-serum','Azelaic Acid 10 + Hyaluron Redness Soothing Serum','30 ml',1050,'Serums','4-3'],
['dewy-glow-capsule-mist-30ml','Dewy Glow PDRN Hyaluronic Acid Hydrating Capsule Mist','30 ml',987.5,'Mists','5-0'],
['collagen-retinol-gua-sha-cream','Visibly Firming Collagen Retinol Refining Gua Sha Cream','80 ml',1375,'Moisturizers','5-1'],
['heartleaf-succinic-cleansing-foam','Heartleaf + Succinic Acid Moisture Cleansing Foam','150 ml',1093.75,'Cleansers','5-2'],
['pdrn-hyaluron-lip-serum','PDRN Hyaluron Lip Serum','',725,'Lip care','5-3'],
['barrier-reboot-intensive-cream','Barrier Reboot Intensive Cream','100 ml',1187.5,'Moisturizers','6-0'],
['heartleaf-80-soothing-ampoule','Heartleaf 80 Moisture Soothing Ampoule','30 ml',1025,'Serums','6-1'],
['peach-77-essence-toner','Peach 77+ Niacin Essence Toner','250 ml',1025,'Toners','6-2']
].map(([id,name,size,price,category,image])=>({id,name:'ANUA '+name,brand:'ANUA',size,price,category,image:id==='serum-minis-discovery-kit'?'/beauty/assets/anua-1-0-cropped.png':'/beauty/assets/anua-'+image+'.webp'}));

// Arencia — latest non-duplicate explicit price in Arencia.xlsx, then +25% retail markup.
const arencia = [
  ['arencia-eraser-glycolic-booster','Eraser Shot Glycolic Acid Booster','30 ml',900,'Serums','eraser-glycolic-booster'],
  ['arencia-nad-booster-shot','NAD+ Booster Shot','30 ml',900,'Moisturizers','nad-booster-shot'],
  ['arencia-pdrn-booster-shot','PDRN Booster Shot','30 ml',900,'Moisturizers','pdrn-booster-shot'],
  ['arencia-retinal-booster-shot','Retinal Booster Shot','30 ml',900,'Serums','retinal-booster-shot'],
  ['arencia-txa-booster-shot','TXA Booster Shot','30 ml',900,'Serums','txa-booster-shot'],
  ['arencia-vitamin-c-booster-shot','Vitamin C Booster Shot','30 ml',850,'Serums','vitamin-c-booster-shot'],
  ['arencia-black-tea-rice-mochi-cleanser','Black Tea Rice Mochi Cleanser','120 g',1025,'Cleansers','black-tea-cleanser'],
  ['arencia-eraser-soothing-cream','Eraser Soothing Cream','50 ml',968.75,'Moisturizers','eraser-soothing-cream'],
  ['arencia-fresh-blue-hyssop-rice-mochi-cleanser','Fresh Blue Hyssop Rice Mochi Cleanser','120 g',1037.5,'Cleansers','fresh-blue-hyssop-cleanser'],
  ['arencia-fresh-green-rice-mochi-cleanser','Fresh Green Rice Mochi Cleanser','120 g',1062.5,'Cleansers','fresh-green-cleanser-clean'],
  ['arencia-fresh-rosehip-rice-mochi-cleanser','Fresh Rosehip Rice Mochi Cleanser','120 g',1037.5,'Cleansers','fresh-rosehip-cleanser'],
  ['arencia-pore-melt-mochi-cleansing-oil','Pore Melt Mochi Cleansing Oil','200 ml',937.5,'Cleansers','pore-melt-cleansing-oil'],
  ['arencia-rice-mucin-cleanser','Rice Mucin Cleanser','120 g',1025,'Cleansers','rice-mucin-cleanser']
].map(([id,name,size,price,category,image])=>({id,name:'Arencia '+name,brand:'Arencia',size,price,category,image:'/beauty/assets/arencia/'+image+'.png'}));

const cosrx = [
  ["all-about-snail-kit", "All About Snail Kit", "4-step", 887.5, "Sets"],
  ["advanced-snail-96-mucin-power-essence", "Advanced Snail 96 Mucin Power Essence", "100 ml", 850.0, "Essences"],
  ["advanced-snail-92-all-in-one-cream", "Advanced Snail 92 All In One Cream", "100 g", 825.0, "Moisturizers"],
  ["hyaluronic-acid-hydra-power-essence", "Hyaluronic Acid Hydra Power Essence", "100 ml", 850.0, "Essences"],
  ["hyaluronic-acid-intensive-cream", "Hyaluronic Acid Intensive Cream", "100 g", 825.0, "Moisturizers"],
  ["low-ph-good-morning-gel-cleanser", "Low pH Good Morning Gel Cleanser", "150 ml", 825.0, "Cleansers"],
  ["oil-free-ultra-moisturizing-lotion-with-birch-sap", "Oil-Free Ultra-Moisturizing Lotion with Birch Sap", "100 ml", 975.0, "Moisturizers"],
  ["salicylic-acid-daily-gentle-cleanser", "Salicylic Acid Daily Gentle Cleanser", "150 ml", 737.5, "Cleansers"],
  ["the-6-peptide-skin-booster-serum", "The 6 Peptide Skin Booster Serum", "150 ml", 1106.25, "Serums"],
  ["the-ceramide-skin-barrier-moisturizer", "The Ceramide Skin Barrier Moisturizer", "80 ml", 1087.5, "Moisturizers"],
  ["the-niacinamide-15-serum", "The Niacinamide 15 Serum", "20 ml", 975.0, "Serums"],
  ["the-peptide-collagen-hydrogel-eye-patch", "The Peptide Collagen Hydrogel Eye Patch", "60 patches", 1012.5, "Eye care"],
  ["the-vitamin-c-23-serum", "The Vitamin C 23 Serum", "20 g", 975.0, "Serums"]
].map(([slug, name, size, price, category]) => ({
  id: "cosrx-" + slug, name: "COSRX " + name, brand: "COSRX", size, price, category,
  image: "/beauty/assets/cosrx/" + slug + ".webp"
}));

const skin1004 = [
  {
    "id": "skin1004-air-fit-suncream-plus-50ml",
    "name": "SKIN1004 Madagascar Centella Air-Fit Suncream Plus SPF50+ PA++++",
    "brand": "SKIN1004",
    "size": "50 ml",
    "price": 762.5,
    "category": "Sun care",
    "image": "/beauty/assets/skin1004/skin1004-air-fit-suncream-plus-50ml.png"
  },
  {
    "id": "skin1004-centella-ampoule-55ml",
    "name": "SKIN1004 Madagascar Centella Ampoule",
    "brand": "SKIN1004",
    "size": "55 ml",
    "price": 937.5,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-ampoule-55ml.png"
  },
  {
    "id": "skin1004-centella-ampoule-foam-125ml",
    "name": "SKIN1004 Madagascar Centella Ampoule Foam",
    "brand": "SKIN1004",
    "size": "125 ml",
    "price": 900,
    "category": "Cleansers",
    "image": "/beauty/assets/skin1004/skin1004-centella-ampoule-foam-125ml.png"
  },
  {
    "id": "skin1004-centella-cream-75ml",
    "name": "SKIN1004 Madagascar Centella Cream",
    "brand": "SKIN1004",
    "size": "75 ml",
    "price": 937.5,
    "category": "Moisturizers",
    "image": "/beauty/assets/skin1004/skin1004-centella-cream-75ml.png"
  },
  {
    "id": "skin1004-centella-light-cleansing-oil-200ml",
    "name": "SKIN1004 Madagascar Centella Light Cleansing Oil",
    "brand": "SKIN1004",
    "size": "200 ml",
    "price": 1000,
    "category": "Cleansers",
    "image": "/beauty/assets/skin1004/skin1004-centella-light-cleansing-oil-200ml.png"
  },
  {
    "id": "skin1004-centella-hyalu-cica-blue-serum-50ml",
    "name": "SKIN1004 Madagascar Centella Hyalu-Cica Blue Serum",
    "brand": "SKIN1004",
    "size": "50 ml",
    "price": 900,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-hyalu-cica-blue-serum-50ml.png"
  },
  {
    "id": "skin1004-centella-hyalu-cica-water-fit-sun-serum-50ml",
    "name": "SKIN1004 Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++",
    "brand": "SKIN1004",
    "size": "50 ml",
    "price": 850,
    "category": "Sun care",
    "image": "/beauty/assets/skin1004/skin1004-centella-hyalu-cica-water-fit-sun-serum-50ml.png"
  },
  {
    "id": "skin1004-centella-light-cleansing-oil-30ml",
    "name": "SKIN1004 Madagascar Centella Light Cleansing Oil",
    "brand": "SKIN1004",
    "size": "30 ml",
    "price": 437.5,
    "category": "Cleansers",
    "image": "/beauty/assets/skin1004/skin1004-centella-light-cleansing-oil-30ml.png"
  },
  {
    "id": "skin1004-centella-niacinamide-10-boosting-shot-ampoule-30ml",
    "name": "SKIN1004 Madagascar Centella Niacinamide 10 Boosting Shot Ampoule",
    "brand": "SKIN1004",
    "size": "30 ml",
    "price": 937.5,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-niacinamide-10-boosting-shot-ampoule-30ml.png"
  },
  {
    "id": "skin1004-centella-poremizing-deep-cleansing-foam-125ml",
    "name": "SKIN1004 Madagascar Centella Poremizing Deep Cleansing Foam",
    "brand": "SKIN1004",
    "size": "125 ml",
    "price": 900,
    "category": "Cleansers",
    "image": "/beauty/assets/skin1004/skin1004-centella-poremizing-deep-cleansing-foam-125ml.png"
  },
  {
    "id": "skin1004-centella-poremizing-fresh-ampoule-100ml",
    "name": "SKIN1004 Madagascar Centella Poremizing Fresh Ampoule",
    "brand": "SKIN1004",
    "size": "100 ml",
    "price": 1062.5,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-poremizing-fresh-ampoule-100ml.png"
  },
  {
    "id": "skin1004-centella-poremizing-quick-clay-stick-mask-27g",
    "name": "SKIN1004 Madagascar Centella Poremizing Quick Clay Stick Mask",
    "brand": "SKIN1004",
    "size": "27 g",
    "price": 950,
    "category": "Masks",
    "image": "/beauty/assets/skin1004/skin1004-centella-poremizing-quick-clay-stick-mask-27g.png"
  },
  {
    "id": "skin1004-centella-probio-cica-bakuchiol-eye-cream-20ml",
    "name": "SKIN1004 Madagascar Centella Probio-Cica Bakuchiol Eye Cream",
    "brand": "SKIN1004",
    "size": "20 ml",
    "price": 750,
    "category": "Eye care",
    "image": "/beauty/assets/skin1004/skin1004-centella-probio-cica-bakuchiol-eye-cream-20ml.png"
  },
  {
    "id": "skin1004-centella-probio-cica-enrich-cream-50ml",
    "name": "SKIN1004 Madagascar Centella Probio-Cica Enrich Cream",
    "brand": "SKIN1004",
    "size": "50 ml",
    "price": 1012.5,
    "category": "Moisturizers",
    "image": "/beauty/assets/skin1004/skin1004-centella-probio-cica-enrich-cream-50ml.png"
  },
  {
    "id": "skin1004-centella-probio-cica-intensive-ampoule-95ml",
    "name": "SKIN1004 Madagascar Centella Probio-Cica Intensive Ampoule",
    "brand": "SKIN1004",
    "size": "95 ml",
    "price": 1062.5,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-probio-cica-intensive-ampoule-95ml.png"
  },
  {
    "id": "skin1004-centella-quick-calming-pad-70-pads-130ml",
    "name": "SKIN1004 Madagascar Centella Quick Calming Pad",
    "brand": "SKIN1004",
    "size": "70 pads / 130 ml",
    "price": 1000,
    "category": "Toners",
    "image": "/beauty/assets/skin1004/skin1004-centella-quick-calming-pad-70-pads-130ml.png"
  },
  {
    "id": "skin1004-centella-retinol-0-2-ampoule-30ml",
    "name": "SKIN1004 Madagascar Centella Retinol 0.2% Ampoule",
    "brand": "SKIN1004",
    "size": "30 ml",
    "price": 937.5,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-retinol-0-2-ampoule-30ml.png"
  },
  {
    "id": "skin1004-centella-soothing-cream-75ml",
    "name": "SKIN1004 Madagascar Centella Soothing Cream",
    "brand": "SKIN1004",
    "size": "75 ml",
    "price": 937.5,
    "category": "Moisturizers",
    "image": "/beauty/assets/skin1004/skin1004-centella-soothing-cream-75ml.png"
  },
  {
    "id": "skin1004-centella-tea-trica-bha-foam-125ml",
    "name": "SKIN1004 Madagascar Centella Tea-Trica BHA Foam",
    "brand": "SKIN1004",
    "size": "125 ml",
    "price": 900,
    "category": "Cleansers",
    "image": "/beauty/assets/skin1004/skin1004-centella-tea-trica-bha-foam-125ml.png"
  },
  {
    "id": "skin1004-centella-tea-trica-relief-ampoule-100ml",
    "name": "SKIN1004 Madagascar Centella Tea-Trica Relief Ampoule",
    "brand": "SKIN1004",
    "size": "100 ml",
    "price": 1062.5,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-tea-trica-relief-ampoule-100ml.png"
  },
  {
    "id": "skin1004-centella-teca-ampoule-50ml",
    "name": "SKIN1004 Madagascar Centella Teca Ampoule",
    "brand": "SKIN1004",
    "size": "50 ml",
    "price": 912.5,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-teca-ampoule-50ml.png"
  },
  {
    "id": "skin1004-centella-teca-cream-75ml",
    "name": "SKIN1004 Madagascar Centella Teca Cream",
    "brand": "SKIN1004",
    "size": "75 ml",
    "price": 962.5,
    "category": "Moisturizers",
    "image": "/beauty/assets/skin1004/skin1004-centella-teca-cream-75ml.png"
  },
  {
    "id": "skin1004-centella-tone-brightening-capsule-ampoule-100ml",
    "name": "SKIN1004 Madagascar Centella Tone Brightening Capsule Ampoule",
    "brand": "SKIN1004",
    "size": "100 ml",
    "price": 1050,
    "category": "Serums",
    "image": "/beauty/assets/skin1004/skin1004-centella-tone-brightening-capsule-ampoule-100ml.png"
  },
  {
    "id": "skin1004-centella-tone-brightening-capsule-cream-75ml",
    "name": "SKIN1004 Madagascar Centella Tone Brightening Capsule Cream",
    "brand": "SKIN1004",
    "size": "75 ml",
    "price": 937.5,
    "category": "Moisturizers",
    "image": "/beauty/assets/skin1004/skin1004-centella-tone-brightening-capsule-cream-75ml.png"
  },
  {
    "id": "skin1004-centella-tone-brightening-cleansing-gel-foam-125ml",
    "name": "SKIN1004 Madagascar Centella Tone Brightening Cleansing Gel Foam",
    "brand": "SKIN1004",
    "size": "125 ml",
    "price": 900,
    "category": "Cleansers",
    "image": "/beauty/assets/skin1004/skin1004-centella-tone-brightening-cleansing-gel-foam-125ml.png"
  },
  {
    "id": "skin1004-centella-tone-brightening-tone-up-sunscreen-spf50-50ml",
    "name": "SKIN1004 Madagascar Centella Tone Brightening Tone Up Sunscreen SPF50+ PA++++",
    "brand": "SKIN1004",
    "size": "50 ml",
    "price": 862.5,
    "category": "Sun care",
    "image": "/beauty/assets/skin1004/skin1004-centella-tone-brightening-tone-up-sunscreen-spf50-50ml.png"
  },
  {
    "id": "skin1004-centella-toning-toner-30ml",
    "name": "SKIN1004 Madagascar Centella Toning Toner",
    "brand": "SKIN1004",
    "size": "30 ml",
    "price": 375,
    "category": "Toners",
    "image": "/beauty/assets/skin1004/skin1004-centella-toning-toner-30ml.png"
  },
  {
    "id": "skin1004-centella-watergel-sheet-ampoule-mask-25ml-x5",
    "name": "SKIN1004 Madagascar Centella Watergel Sheet Ampoule Mask",
    "brand": "SKIN1004",
    "size": "25 ml x 5 sheets",
    "price": 875,
    "category": "Masks",
    "image": "/beauty/assets/skin1004/skin1004-centella-watergel-sheet-ampoule-mask-25ml-x5.png"
  }
];

export const products = [...anua, ...arencia, ...cosrx, ...skin1004, ...beautyOfJoseon, ...vaseline, ...medicube].map(product =>
  product.brand === 'Vaseline'
    ? {...product, image: `${product.image}?v=vaseline-drive-20261125`}
    : product
);
