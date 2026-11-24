// Price basis: Imported_Korean_All_Products.xlsx, newest explicit dated entry per exact size.
// Retail is cost × 1.25 EGP. Private purchasing costs are not published.
export const products = [
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
].map(([id,name,size,price,category,image])=>({id,name:'ANUA '+name,size,price,category,image:id==='serum-minis-discovery-kit'?'/beauty/assets/anua-1-0-cropped.png':'/beauty/assets/anua-'+image+'.webp'}));
