import { Language } from '../types';

export interface SupplementData {
  id: string;
  emoji: string;
  category: {
    ar: string;
    en: string;
    rw: string;
  };
  badgeColor: string;
  borderColor: string;
  textColor: string;
  name: {
    ar: string;
    en: string;
    rw: string;
  };
  subtitle: {
    ar: string;
    en: string;
    rw: string;
  };
  summary: {
    ar: string;
    en: string;
    rw: string;
  };
  benefits: {
    ar: string[];
    en: string[];
    rw: string[];
  };
  mechanism: {
    ar: string;
    en: string;
    rw: string;
  };
  dosage: {
    ar: string;
    en: string;
    rw: string;
  };
  bestFor: {
    ar: string;
    en: string;
    rw: string;
  };
  synergies: {
    ar: string;
    en: string;
    rw: string;
  };
  safetyNote: {
    ar: string;
    en: string;
    rw: string;
  };
}

export const SUPPLEMENT_ENCYCLOPEDIA: SupplementData[] = [
  {
    id: 'creatine',
    emoji: '⚡',
    category: {
      ar: 'بناء العضلات والقوة',
      en: 'Muscle & Strength',
      rw: 'Kubaka Imikaya n\'Ingufu'
    },
    badgeColor: 'bg-amber-950/80 border-amber-800 text-amber-400',
    borderColor: 'border-amber-500/30 hover:border-amber-500',
    textColor: 'text-amber-400',
    name: {
      ar: 'الكرياتين مونوهيدرات (Creatine Monohydrate)',
      en: 'Creatine Monohydrate Ultra-Pure',
      rw: 'Creatine Monohydrate Imbere'
    },
    subtitle: {
      ar: 'المكمل الأول عالمياً المثبت علمياً لزيادة القوة والحجم العضلي',
      en: 'The #1 gold-standard supplement for explosive power and hypertrophy',
      rw: 'Inzira ya mbere yitiriwe kubaka ingufu n\'imikaya'
    },
    summary: {
      ar: 'الكرياتين هو مركب طبيعي يُخزن في الخلايا العضلية على شكل فوسفوكرياتين. يُساعد في إعادة إنتج جزيئات الطاقة ATP بسرعة فائقة أثناء التمارين عالية الشدة.',
      en: 'Creatine is a naturally occurring compound stored in muscle tissue as phosphocreatine. It rapidly regenerates ATP molecules during short, high-intensity exercise.',
      rw: 'Creatine ni ikinyabutabire cyitsindagira mu mikaya nka phosphocreatine. Byafasha gusudira ATP mu gihe cyo gukora imyitozo ikaye.'
    },
    benefits: {
      ar: [
        'زيادة القوة الانفجارية والقدرة على رفع أوزان أكبر بنسبة 10-15%',
        'تسريع التضخم العضلي عبر زيادة حبس الماء داخل الخلايا العضلية (Intracellular Hydration)',
        'تحسين الاستشفاء بين المجموعات التدريبية وتقليل الإجهاد العضلي',
        'دعم وظائف المخ والذاكرة والوقاية من التعب الذهني أثناء التمارين الشديدة'
      ],
      en: [
        'Increases explosive power output and max lifts by 10-15%',
        'Accelerates muscle hypertrophy via cellular hydration and cell voluming',
        'Enhances ATP resynthesis between heavy training sets',
        'Supports cognitive function, focus, and reduces neuro-fatigue'
      ],
      rw: [
        'Gukurura ingufu n\'ubushobozi bwo kuzamura ibiremereye ku 10-15%',
        'Kuzamura ubunini bw\'imikaya mu buryo bwihuse',
        'Kugarura ingufu mu gihe gito hagati y\'imyitozo',
        'Gushyigikira ubwonko n\'intege mu myitozo'
      ]
    },
    mechanism: {
      ar: 'عند رفع الأوزان الثقيلة، تستهلك العضلات طاقة ATP وتتحول إلى ADP. يمنح الكرياتين مجموعة الفوسفات لـ ADP ليعيد تحويلها فوراً إلى ATP، مما يتيح لك أداء تكرارات إضافية.',
      en: 'During intense muscle contraction, ATP loses a phosphate group and turns into ADP. Stored phosphocreatine donates a phosphate to ADP, instantly synthesizing fresh ATP for extra muscle contractions.',
      rw: 'Iyo uzamura ibiremereye, ATP ihinduka ADP. Creatine itanga phosphate ikenewe kugira ngo ADP isubire kuba ATP mu segronda chache.'
    },
    dosage: {
      ar: '5 جرامات يومياً (سكوب واحد) في أي وقت ثابت من اليوم. لا داعي لمرحلة التحميل، لكن الاستمرارية يومياً هي السر.',
      en: '5 grams (1 scoop) daily, taken consistently every day. Loading phase (20g/day for 5 days) is optional; 5g daily reaches full saturation in 3 weeks.',
      rw: 'Gramu 5 buri munsi (scoop 1). Birahagije gukoresha buri munsi utagomba gukora loading phase.'
    },
    bestFor: {
      ar: 'لاعبو كمال الأجسام، رفع الأثقال، الرياضات الانفجارية (الجري السريع، الفنون القتالية)، وأي شخص يسعى لبناء عضلات صافية.',
      en: 'Bodybuilders, powerlifters, sprinters, combat athletes, and anyone striving to build lean muscle mass.',
      rw: 'Abazamura ibiremereye, abiruka mu gihe gito, n\'abantu bose bashaka kubaka imikaya.'
    },
    synergies: {
      ar: 'يتوافق بشكل ممتاز مع البروتين والسيترولين والكاربوهيدرات سريعة الامتصاص بعد التمرين.',
      en: 'Pairs perfectly with Plant/Whey Protein, L-Citrulline, and post-workout carbohydrates.',
      rw: 'Bikorana neza na Protein, L-Citrulline n\'ibyo kurya bitoza carbohydrates.'
    },
    safetyNote: {
      ar: 'آمن تماماً ومرخص من جميع الهيئات الرياضية الدولية. يُنصح بشرب 3-4 لتر ماء يومياً لضمان أفضل ترطيب الخلية العضلية.',
      en: '100% safe and permitted by WADA and all sports bodies. Drink 3-4 liters of water daily for optimal intracellular hydration.',
      rw: 'Irakoreshwa neza kandi ntayindi ngaruka. Nywa amazي ahagije buri munsi.'
    }
  },
  {
    id: 'citrulline',
    emoji: '❤️',
    category: {
      ar: 'ضخ الدم والضخ العضلي',
      en: 'Pump & Blood Flow',
      rw: 'Gushyira Amaraso mu Mikaya'
    },
    badgeColor: 'bg-rose-950/80 border-rose-800 text-rose-400',
    borderColor: 'border-rose-500/30 hover:border-rose-500',
    textColor: 'text-rose-400',
    name: {
      ar: 'إل-سيترولين الصافي (L-Citrulline Pure)',
      en: 'L-Citrulline Pure 99.9%',
      rw: 'L-Citrulline Pure'
    },
    subtitle: {
      ar: 'المعزز الأقوى لأكسيد النيتريك لضخ الدم والأوكسجين للعضلات',
      en: 'The ultimate Nitric Oxide booster for massive muscle pumps and vasodilation',
      rw: 'Inzira yokubaka amaraso mu mikaya n\'oxigene'
    },
    summary: {
      ar: 'إل-سيترولين هو حمض أميني يتحول في الكلى إلى L-Arginine بفاعلية أكبر من الأرجينين نفسه، مما يزيد إنتاج أكسيد النيتريك (NO) وتوسيع الأوعية الدموية.',
      en: 'L-Citrulline converts efficiently into L-Arginine in the kidneys, elevating plasma Arginine levels higher than oral Arginine itself to stimulate Nitric Oxide synthesis.',
      rw: 'L-Citrulline ihinduka L-Arginine mu rinini, ikazamura Nitric Oxide mu gukurura amaraso mu mikaya.'
    },
    benefits: {
      ar: [
        'توسيع الأوعية الدموية وضخ كميات هائلة من الأوكسجين والمغذيات داخل الألياف العضلية',
        'تأخير الشعور بالتعب والإجهاد عبر تسريع التخلص من الأمونيا وحمض اللاكتيك',
        'تحسين تدفق الدم وصحة القلب والشرايين وتنظيم ضغط الدم',
        'إعطاء شعور الامتلاء العضلي (Muscle Pump) أثناء التدريب'
      ],
      en: [
        'Maximizes vasodilation and pumps vital nutrients and oxygen directly into working muscles',
        'Delays muscular fatigue by flushing metabolic waste, ammonia, and lactic acid',
        'Enhances cardiovascular endurance and supports healthy endothelial blood pressure',
        'Produces intense, skin-splitting muscle pumps during exercise'
      ],
      rw: [
        'Gukurura amaraso mu mikaya n\'oxigene myiza',
        'Gukura amoniya n\'umunaniro mu mikaya',
        'Kugabanya umudundo w\'amaraso n\'umutima',
        'Kuzana pump mu myitozo'
      ]
    },
    mechanism: {
      ar: 'يزيد مستويات أكسيد النيتريك (NO) الذي يسترخي العضلات الملساء في جدران الشرايين، فيتسع قطر الشريان ويتدفق الدم بغزارة أكبر.',
      en: 'Stimulates Nitric Oxide Synthase (NOS), relaxing vascular smooth muscle walls and increasing arterial diameter for maximal hemodynamic blood flow.',
      rw: 'Izamura Nitric Oxide yagura inzira z\'amaraso ikemerera amaraso kutembera neza.'
    },
    dosage: {
      ar: '3 إلى 6 جرامات قبل التمرين بـ 30-45 دقيقة مع الماء.',
      en: '3g to 6g taken 30-45 minutes pre-workout with water.',
      rw: 'Gramu 3 kugeza 6 imbere y\'imyitozo iminota 30-45.'
    },
    bestFor: {
      ar: 'الرياضيون الباحثون عن ضخ عضلي قوي، زيادة التحمل، وتقليل آلام العضلات بعد التمرين.',
      en: 'Athletes targeting intense muscle pumps, endurance enhancement, and reduced delayed onset muscle soreness (DOMS).',
      rw: 'Abatwara ibiremereye n\'abashaka gukora imyitozo ndende utananiwe.'
    },
    synergies: {
      ar: 'يُفضل دمجه مع الكرياتين والبيتا ألانين لخلطة قبل التمرين (Pre-Workout) الخارقة.',
      en: 'Combines exceptionally well with Creatine Monohydrate and Beta-Alanine for the ultimate stimulant-free pre-workout stack.',
      rw: 'Bikorana neza na Creatine n\'Beta-Alanine.'
    },
    safetyNote: {
      ar: 'مكون نقي وآمن جداً على المعدة والصحة العامة، ولا يسبب أي ارتفاع غير مرغوب في ضربات القلب.',
      en: 'Pure amino acid with zero stimulants. Highly tolerable and gentle on the stomach with no tachycardia side-effects.',
      rw: 'Ntayindi ngaruka mbwe kandi ntiyazamura umudundo w\'umutima.'
    }
  },
  {
    id: 'l-carnitine',
    emoji: '🔥',
    category: {
      ar: 'حرق الدهون والتمثيل الغذائي',
      en: 'Fat Loss & Energy',
      rw: 'Gukura Iburemere n\'Ingufu'
    },
    badgeColor: 'bg-orange-950/80 border-orange-800 text-orange-400',
    borderColor: 'border-orange-500/30 hover:border-orange-500',
    textColor: 'text-orange-400',
    name: {
      ar: 'إل-كارنيتين (L-Carnitine 750mg)',
      en: 'L-Carnitine Metabolism Matrix',
      rw: 'L-Carnitine Ubuziranenge'
    },
    subtitle: {
      ar: 'ناقل الدهون الخلوي لتحويل الأحماض الدهنية إلى طاقة حقيقية',
      en: 'Cellular fat transporter for mitochondrial energy and oxidation',
      rw: 'Inzira yo gukoresها ibinure mu kurema ingufu'
    },
    summary: {
      ar: 'إل-كارنيتين هو ناقل حيوي ينقل الأحماض الدهنية طويلة السلسلة إلى داخل بيوت الطاقة في الخلية (الميتوكندريا) ليتم حرقها وتحويلها إلى طاقة ATP.',
      en: 'L-Carnitine acts as a cellular shuttle, transporting long-chain fatty acids into the mitochondrial matrix where they undergo beta-oxidation to synthesize energy.',
      rw: 'L-Carnitine itwara ibinure mu cell mitochondrial ikazihinduramo ingufu z\'imyitozo.'
    },
    benefits: {
      ar: [
        'تسريع عملية حرق الدهون واستخدامها كمصدر رئيسي للوقود أثناء التمرين',
        'حماية الكتلة العضلية من الهدم أثناء فترات التنشيف والتخسيس',
        'زيادة التحمل القلبي والتنفسي وتقليل الإجهاد أثناء الكارديو',
        'دعم الاستشفاء العضلي وتقليل التلف الناتج عن التمارين القاسية'
      ],
      en: [
        'Accelerates fatty acid oxidation, utilizing stored fat as kinetic energy source',
        'Preserves lean muscle tissue during caloric deficit and cutting phases',
        'Enhances aerobic capacity, VO2 max, and stamina during cardio sessions',
        'Attenuates exercise-induced muscle damage and accelerates recovery'
      ],
      rw: [
        'Kugabanya ibinure no gukoresha ibinure nka pawa',
        'Kurinda imikaya mu gihe cyo kugabanya ibiro',
        'Kuzamura endurance mu myitozo ya cardio',
        'Kugarura ingufu mu mikaya'
      ]
    },
    mechanism: {
      ar: 'يعمل كعبّارة ميكروسكوبية تنقل جزيئات الفات داخل الميتوكندريا. بدون الكارنيتين، تصعب عملية حرق الدهون مهما زاد المجهود.',
      en: 'Binds to acyl group fatty acids forming Acyl-Carnitine, crossing the inner mitochondrial membrane where fatty oxidation takes place.',
      rw: 'Itwara acyl fatty acids mu bitaro by\'ingufu bya cell biyihindura ingufu.'
    },
    dosage: {
      ar: 'كبسولتان (750mg-1500mg) قبل التمرين بـ 30 دقيقة، أو مع وجبة نشويات لزيادة الامتصاص.',
      en: '1-2 capsules (750mg - 1500mg) taken 30 minutes prior to workout or with a carb meal for optimal insulin-mediated cellular uptake.',
      rw: 'Capsules 1-2 (750mg-1500mg) kabere y\'imyitozo iminota 30.'
    },
    bestFor: {
      ar: 'من يهدف للتخسيس، التنشيف، رفع كفاءة حرق الدهون، وزيادة اللياقة البدنية.',
      en: 'Individuals in weight management, fat loss cycles, endurance athletes, and bodybuilders cutting bodyfat.',
      rw: 'Abantu bashaka kugabanya ibiro n\'ibinure mu myitozo.'
    },
    synergies: {
      ar: 'ممتاز جداً مع الكافيين، فيتامين سي، وأوميجا 3 لتحفيز أقصى معدل أكسدة للدهون.',
      en: 'Combines effectively with Green Tea extract, Vitamin C, Omega-3, and pre-workout hydration.',
      rw: 'Bikorana neza na Caffeine, Vitamin C n\'Omega-3.'
    },
    safetyNote: {
      ar: 'مركب طبيعي خالٍ من المنبهات الصناعية، ولا يسبب الأرق أو التوتر.',
      en: 'Non-stimulant natural derivative. Safe for daily use without jitteriness or sleep disruption.',
      rw: 'Ntayindi ngaruka mbwe kandi ntiguha ibitotsi mbibi.'
    }
  },
  {
    id: 'protein-pea-rice',
    emoji: '🌱',
    category: {
      ar: 'البروتين والتغذية البنائية',
      en: 'Protein & Muscle Building',
      rw: 'Poroteyine n\'Ubwubatsi'
    },
    badgeColor: 'bg-emerald-950/80 border-emerald-800 text-emerald-400',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500',
    textColor: 'text-emerald-400',
    name: {
      ar: 'بروتين البسلة والأرز النباتي (Plant Protein Pea & Rice)',
      en: 'Organic Plant Protein (Pea + Rice 81.3%)',
      rw: 'Plant Protein Pea & Rice'
    },
    subtitle: {
      ar: 'المزيج النباتي الكامل الخالي من اللاكتوز والمعزز بالأحماض الأمينية الكاملة',
      en: 'Complete vegan protein blend with 100% full amino acid profile & 81.3% purity',
      rw: 'Poroteyine y\'ibimera idafite lactose irimo amino acids zose'
    },
    summary: {
      ar: 'دمج بروتين البسلة (الغني باللايسين) مع بروتين الأرز (الغني بالميثيونين) يخلق ملف أحماض أمينية كاملاً يضاهي الواي بروتين تماماً وبدون أي مشاكل هضمية.',
      en: 'Combining Pea Protein (rich in Lysine) and Rice Protein (rich in Methionine) creates a complementary protein profile identical in Quality (PDCAAS 1.0) to Whey Protein.',
      rw: 'Kuvanga Pea Protein na Rice Protein biyineza gukora amino acids zose ziba muri Whey Protein.'
    },
    benefits: {
      ar: [
        'إمداد العضلات بـ 24.3 جرام بروتين خالص في السكوب الواحد لبناء واستشفاء الألياف',
        'خالٍ تماماً من اللاكتوز والمنبهات والهرمونات، ومناسب جداً للقولون العصبي والهضم الحساس',
        'نسبة بروتين عالية جداً مطابقة للاختبارات المعملية (81.3% بروتين صافي)',
        'يحوي جميع الأحماض الأمينية الأساسية BCAA لبناء العضلات بدون أي مكونات حيوانية'
      ],
      en: [
        'Delivers 24.3g of pure protein per serving to trigger muscle protein synthesis (MPS)',
        '100% Lactose-free, hypoallergenic, and gentle on IBS or sensitive digestion',
        'Verified 81.3% protein concentration under lab testing',
        'Packed with BCAAs (Leucine, Isoleucine, Valine) without animal or dairy additives'
      ],
      rw: [
        'Ihabwa gramu 24.3 z\'poroteyine mu scoop 1 yo kubaka imikaya',
        'Ntidafite lactose kandi iroroshye mu igogora',
        'Ibipimo bivuga ko ifite 81.3% za poroteyine',
        'Irimo BCAAs zose zikeneve'
      ]
    },
    mechanism: {
      ar: 'يُهضم ويمتص بسهولة في الأمعاء الدقيقة، مفرزاً الأحماض الأمينية في مجرى الدم لتحفيز بناء البروتين العضلي Muscle Protein Synthesis.',
      en: 'Hydrolyzed plant proteins break down into di- and tri-peptides, rapidly absorbed in the jejunum to elevate blood amino acid concentration for muscle repair.',
      rw: 'Irigogora mu buryo bworoshye ikajya mu maraso gukora ubwubatsi bw\'imikaya.'
    },
    dosage: {
      ar: 'سكوب واحد (30g) يخلط مع 250-300 مل ماء أو حليب نباتي بعد التمرين أو بين الوجبات.',
      en: '1 scoop (30g) blended with 250-300ml water, almond milk, or smoothie post-workout or daily.',
      rw: 'Scoop 1 (30g) ivange n\'amazzi 250ml nyuma y\'imyitozo.'
    },
    bestFor: {
      ar: 'النباتيون، الأشخاص الذين يعانون من حساسية اللاكتوز أو مشاكل الهضم، ولكل من يبحث عن بروتين نظيف وصحي.',
      en: 'Vegans, lactose-intolerant athletes, individuals with IBS, and clean-eating enthusiasts.',
      rw: 'Abantu batarya inyama, abafite shingano z\'igogora n\'abashaka poroteyine yisukuye.'
    },
    synergies: {
      ar: 'يتكامل تماماً مع الكرياتين والجلوتامين لوجبة الاستشفاء الكاملة بعد التمارين الشاقة.',
      en: 'Pairs perfectly with Creatine, Glutamine, or frozen fruit smoothies post-workout.',
      rw: 'Bikorana neza na Creatine n\'Glutamine.'
    },
    safetyNote: {
      ar: 'منتج طبيعي نقي 100% غير معدل وراثياً ومفحوص معملياً.',
      en: '100% Organic, Non-GMO, pesticide-free plant formulation.',
      rw: 'Irimo ibintu bizima ntampungenge ku buzima.'
    }
  },
  {
    id: 'c-zinc',
    emoji: '🛡️',
    category: {
      ar: 'المناعة والصحة العامة',
      en: 'Immunity & Shield',
      rw: 'Uburinzi n\'Ubuzima'
    },
    badgeColor: 'bg-sky-950/80 border-sky-800 text-sky-400',
    borderColor: 'border-sky-500/30 hover:border-sky-500',
    textColor: 'text-sky-400',
    name: {
      ar: 'فيتامين سي والزنك (C-Zinc Immunity Shield)',
      en: 'C-Zinc (1000mg Vit C + 20mg Zinc Chelate)',
      rw: 'C-Zinc Vitamin C n\'Zinc'
    },
    subtitle: {
      ar: 'درع المناعة الثنائي المضاد للأكسدة والداعم للهرمونات والتعافي',
      en: 'Dual synergistic antioxidant shield for immune cell defense and hormone balance',
      rw: 'Inzira yo gushyigikira uburinzi n\'imbaraga'
    },
    summary: {
      ar: 'تركيبة فائقة الجمع بين 1000mg فيتامين سي عالي النقاء مع 20mg زنك بيسجليسينات مخلبي عالي الامتصاص لحماية خلايا الجسم وتنشيط المناعة.',
      en: 'Combines 1000mg Vitamin C with 20mg Zinc Bisglycinate Chelate for superior bioavailability, shielding cells against oxidative stress and pathogenic load.',
      rw: 'Ikuvanga Vitamin C 1000mg na Zinc 20mg mu buryo bwiza gukingira ubuzima.'
    },
    benefits: {
      ar: [
        'تقوية الجهاز المناعي وتسريع التعافي من المجهود البدني والنزلات الموسمية',
        'الزنك يدعم مستويات التستوستيرون الطبيعي وتخليق البروتين في الجسم',
        'فيتامين سي يحفز إنتاج الكولاجين لصحة المفاصل، الأربطة، والبشرة',
        'مضاد أكسدة قوي يحيّد الشوارد الحرة الناتجة عن التمارين الشديدة'
      ],
      en: [
        'Fortifies white blood cells and immune defense against viruses and physical exhaustion',
        'Zinc Chelate optimizes natural testosterone biosynthesis and cellular repair',
        'Vitamin C stimulates endogenous collagen synthesis for joints, tendons, and skin',
        'Neutralizes free radicals generated by heavy athletic training'
      ],
      rw: [
        'Gukomeza uburinzi bw\'umubiri no kugarura ingufu',
        'Zinc izamura testosterone n\'ubwubatsi bw\'imikaya',
        'Vitamin C ikora collagen y\'ingingo n\'uruhu',
        'Gukura amaprotofe mu mubiri'
      ]
    },
    mechanism: {
      ar: 'يعمل فيتامين سي على تحفيز خلايا الدم البيضاء، بينما ينظم الزنك انقسام الخلايا وتخليق الإنزيمات الحيوية والهرمونات البنائية.',
      en: 'Vitamin C accumulates in phagocytic cells to enhance chemotaxis and killing of microbes; Zinc operates as a cofactor for over 300 enzymatic pathways.',
      rw: 'Vitamin C izamura uburinzi bw\'amaraso ayera, Zinc ikora mu enzymes zirenga 300.'
    },
    dosage: {
      ar: 'كبسولة واحدة يومياً بعد الوجبة الرئيسية مع الماء.',
      en: '1 capsule daily with a main meal and water.',
      rw: 'Capsule 1 buri munsi nyuma y\'ifunguro.'
    },
    bestFor: {
      ar: 'الرياضيون، الأشخاص الأكثر عرضة للإجهاد والأنفلونزا، وكل من يريد تحسين المناعة والهرمونات.',
      en: 'Athletes under high physical stress, individuals seeking immune resilience and hormonal balance.',
      rw: 'Abantu bose bashaka gukomeza uburinzi bw\'umubiri.'
    },
    synergies: {
      ar: 'يتماشى مع بي-كومبليكس وفيتامين د3 لمنظومة صحية ومناعية كاملة.',
      en: 'Works synergistically with B-Complex and Vitamin D3.',
      rw: 'Bikorana neza na B-Complex n\'Vitamin D3.'
    },
    safetyNote: {
      ar: 'الزنك المخلبي خفيف جداً على المعدة ولا يسبب أي غثيان.',
      en: 'Bisglycinate Chelate form ensures high digestive comfort without nausea.',
      rw: 'Zinc ifite isuku ntigutera isesemi.'
    }
  },
  {
    id: 'b-complex',
    emoji: '💜',
    category: {
      ar: 'الأعصاب والطاقة الخلوية',
      en: 'Energy & Nervous System',
      rw: 'Imitsi n\'Ingufu'
    },
    badgeColor: 'bg-purple-950/80 border-purple-800 text-purple-400',
    borderColor: 'border-purple-500/30 hover:border-purple-500',
    textColor: 'text-purple-400',
    name: {
      ar: 'بي-كومبليكس مصفوفة فيتامينات ب (+ فيتامين سي)',
      en: 'B-Complex Spectrum Matrix (+ Vit C 60mg)',
      rw: 'B-Complex Matrix'
    },
    subtitle: {
      ar: 'المجموعة الكاملة لفيتامينات ب لدعم الأعصاب وتحويل الطعام إلى طاقة',
      en: 'Complete 8 B-vitamin complex for neural health, focus, and nutrient metabolism',
      rw: 'Inzira y\'amavitamini B yo gushyigikira imitsi n\'ingufu'
    },
    summary: {
      ar: 'تحتوي على كافة فيتامينات ب (B1, B2, B3, B5, B6, B7 Biotin, B9 Folate, B12 1000mcg) بالإضافة إلى فيتامين سي لتعزيز الامتصاص والصحة العصبية.',
      en: 'Provides all essential B-vitamins with high-dose B12 (1000mcg) and Biotin, optimizing neurological neurotransmitters and ATP energy conversion.',
      rw: 'Irimo amavitamini B yose na B12 1000mcg yo gushyigikira imitsi n\'ingufu.'
    },
    benefits: {
      ar: [
        'تحويل النشويات والدهون والبروتينات إلى طاقة حيوية مستمرة طوال اليوم',
        'تقوية الجهاز العصبي وتقليل تنميل الأطراف وصداع الإجهاد',
        'دعم إنتاج كرات الدم الحمراء والوقاية من الأنيميا وإرهاق التمرين',
        'تحسين صحة الشعر والبشرة والأظافر بفضل تركيز البيوتين العالي (B7)'
      ],
      en: [
        'Converts dietary carbs, fats, and proteins into bioavailable cellular fuel',
        'Protects peripheral nerve sheath integrity and reduces neurological fatigue',
        'Essential for red blood cell formation and preventing athletic anemia',
        'Promotes hair, skin, and nail strength via high-dose Biotin (B7)'
      ],
      rw: [
        'Guhindura ibyo kurya mu ngufu z\'umubiri',
        'Gukomeza imitsi no kugabanya umunaniro',
        'Gukora amaraso atukura mu umubiri',
        'Gukomeza imishatsi n\'enzoro'
      ]
    },
    mechanism: {
      ar: 'تعد فيتامينات ب عوامل مساعدة (Co-enzymes) أساسية في دورة كريبس (Krebs Cycle) داخل الخلايا لإنتاج الطاقة وحماية الأعصاب.',
      en: 'Serves as essential coenzymes in the TCA cycle and mitochondrial oxidative phosphorylation pathways for cellular energy yield.',
      rw: 'Bikoramo nka co-enzymes mu kurema ingufu mu cells.'
    },
    dosage: {
      ar: 'كبسولة واحدة صباحاً مع وجبة الإفطار.',
      en: '1 capsule daily in the morning with breakfast.',
      rw: 'Capsule 1 buri gitondo mugihe ufungura.'
    },
    bestFor: {
      ar: 'الرياضيون، الأشخاص الذين يعانون من الإجهاد البدني والذهني، ومتبعو الحميات الغذائية.',
      en: 'Athletes, busy professionals experiencing mental fatigue, and individuals on strict diets.',
      rw: 'Abantu bose bakora imyitozo n\'abafite umunaniro.'
    },
    synergies: {
      ar: 'تتكامل مع المغنيسيوم والزنك للحصول على أقصى نشاط واستشفاء عصبي.',
      en: 'Pairs perfectly with Magnesium Bisglycinate and C-Zinc.',
      rw: 'Bikorana neza na Magnesium na Zinc.'
    },
    safetyNote: {
      ar: 'فيتامينات ذائبة في الماء، وما يزيد عن حاجة الجسم يخرج بسلامة بدون أي تراكم.',
      en: 'Water-soluble complex. Excess amount is safely excreted naturally without bioaccumulation.',
      rw: 'Amavitamini ashonga mu amazi ntangaruka afite.'
    }
  },
  {
    id: 'omega3',
    emoji: '🐟',
    category: {
      ar: 'القلب والمفاصل والدماغ',
      en: 'Heart, Brain & Joints',
      rw: 'Umutima, Ubwonko n\'Ingingo'
    },
    badgeColor: 'bg-indigo-950/80 border-indigo-800 text-indigo-400',
    borderColor: 'border-indigo-500/30 hover:border-indigo-500',
    textColor: 'text-indigo-400',
    name: {
      ar: 'أوميجا 3 زيت السمك النقي (Omega-3 Fish Oil)',
      en: 'Omega-3 Ultra Concentrate (EPA / DHA)',
      rw: 'Omega-3 Fish Oil Pure'
    },
    subtitle: {
      ar: 'الأحماض الدهنية الأساسية لمكافحة التهابات المفاصل ودعم صحة القلب والعقل',
      en: 'High-yield EPA/DHA fatty acids for joint mobility, cardiovascular & cognitive wellness',
      rw: 'Ibinure byiza byo gushyigikira umutima n\'ingingo'
    },
    summary: {
      ar: 'زيت سمك نقي مُستخلص من أسماك الأعماق ومفلتر خالي من المعادن الثقيلة، محضر بتركيز مرتفع من EPA و DHA.',
      en: 'Molecularly distilled deep-sea fish oil, ultra-purified to remove heavy metals, yielding potent dosages of active EPA and DHA fatty acids.',
      rw: 'Amavuta y\'ifaki ahabwa gukora omega-3 ifite isuku ntamiti mibi.'
    },
    benefits: {
      ar: [
        'تقليل التهابات المفاصل والأربطة الناتجة عن أوزان التمرين الشديدة',
        'تحسين صحة القلب والشرايين وخفض نسبة الترايجليسريد (الدهون الثلاثية)',
        'تعزيز التركيز الذهني وصحة الدماغ والغشاء الخلوي',
        'تحسين حساسيه الإنسولين والمساعدة في توجيه المواد الغذائية للعضلات'
      ],
      en: [
        'Alleviates joint inflammation and tendon stiffness from heavy weightlifting',
        'Supports cardiovascular health and significantly lowers blood triglycerides',
        'Enhances cognitive focus, mood stability, and neuronal membrane fluidity',
        'Improves insulin sensitivity for better nutrient partitioning into muscle'
      ],
      rw: [
        'Kugabanya ububabare mu ngingo nyuma y\'imyitozo',
        'Gushyigikira umutima n\'amaraso',
        'Kuzamura ubwonko n\'ibitekerezo',
        'Kugabanya ibinure bibi'
      ]
    },
    mechanism: {
      ar: 'تندمج جزيئات EPA و DHA في أغشية الخلايا، وتتنافس مع حمض الأراشيدونيك لتقليل إنتاج المركبات المسببة للالتهاب (Eicosanoids).',
      en: 'Incorporates into phospholipid cell membranes, downregulating pro-inflammatory cytokines and COX enzymes while promoting resolvins.',
      rw: 'Bikora mu cells z\'umubiri kugira ngo bigabanye inflammation.'
    },
    dosage: {
      ar: 'كبسولتان يومياً مع الوجبات الغذائية الحاوية على دهون صحية.',
      en: '1-2 softgels daily with fat-containing meals for optimal lymphatic absorption.',
      rw: 'Softgels 1-2 buri munsi na funguro.'
    },
    bestFor: {
      ar: 'الجميع، وبشكل خاص الرياضيون وكبار السن وأصحاب الآلام المفصلية.',
      en: 'Essential for everyone, particularly powerlifters, runners, and joint-health conscious individuals.',
      rw: 'Abantu bose bakora imyitozo n\'abafite ububabare mu ngingo.'
    },
    synergies: {
      ar: 'ممتاز مع فيتامين د3 والكارنيتين لتعزيز صحة الجسم الشاملة.',
      en: 'Synergizes with Vitamin D3 and L-Carnitine.',
      rw: 'Bikorana neza na Vitamin D3 na L-Carnitine.'
    },
    safetyNote: {
      ar: 'مقطر جزيئياً وخالٍ من الزئبق والمعادن الثقيلة والطعم الزفري.',
      en: 'Molecularly purified, heavy metal tested, with enteric coating to prevent fishy burps.',
      rw: 'Ntamiti mibi irimo ntayindi ngaruka.'
    }
  },
  {
    id: 'beta-alanine',
    emoji: '🏎️',
    category: {
      ar: 'التحمل ومقاومة حرق العضلات',
      en: 'Endurance & Buffer',
      rw: 'Endurance n\'Ingufu'
    },
    badgeColor: 'bg-red-950/80 border-red-800 text-red-400',
    borderColor: 'border-red-500/30 hover:border-red-500',
    textColor: 'text-red-400',
    name: {
      ar: 'بيتا ألانين (Beta-Alanine CarnoSyn)',
      en: 'Beta-Alanine Muscle Endurance Matrix',
      rw: 'Beta-Alanine Imbaraga'
    },
    subtitle: {
      ar: 'منظم حموضة العضلات وتأخير الإجهاد في المجموعات الطويلة',
      en: 'Intracellular intramuscular pH buffer to delay muscle burn and burn-out',
      rw: 'Inzira yokugabanya acid mu mikaya'
    },
    summary: {
      ar: 'حمض أميني يتحد مع الهستيدين داخل العضلات لتكوين مركب الكارنوزين (Carnosine)، الذي يعمل كبافر مضاد لحمض اللاكتيك وحموضة العضلات أثناء المجهود الشديد.',
      en: 'Beta-Alanine is the rate-limiting precursor to intramuscular Carnosine. Carnosine acts as a buffer against hydrogen ion (H+) accumulation during anaerobic exercise.',
      rw: 'Beta-Alanine ikora Carnosine mu mikaya, ikagabanya حموضة y\'imikaya mu myitozo.'
    },
    benefits: {
      ar: [
        'تأخير حرق العضلات (Muscle Burn) والقدرة على ضغط 3 إلى 5 تكرارات إضافية',
        'رفع كفاءة التحمل العضلي في المجموعات بين 60 إلى 240 ثانية',
        'ملازمة شعور الوخز الخفيف الممتع (Paresthesia) المانح لطاقة الحماس قبل التمرين',
        'تحسين الأداء في الرياضات المجهدة (CrossFit، الجري، السباحة، كرة القدم)'
      ],
      en: [
        'Delays lactic burn, allowing 3-5 additional high-threshold muscle reps',
        'Dramatically improves anaerobic endurance for sets lasting 60-240 seconds',
        'Elicits a harmless, highly motivating tingling sensation (paresthesia) indicating cellular absorption',
        'Boosts power capacity in CrossFit, sprinting, martial arts, and weight training'
      ],
      rw: [
        'Kugabanya ububabare mu mikaya mu gihe cyo kuzamura ibiremereye',
        'Kuzamura endurance mu myitozo ikaye',
        'Iza izana agashinge gato ku ruhu kakwereka ko irimo gukora',
        'Kuzamura ingufu mu CrossFit n\'imipira'
      ]
    },
    mechanism: {
      ar: 'أثناء التمرين المكثف، تراكم أيونات الهيدروجين يرفع حمضية العضلات ويوقف انقباض الألياف. يعادل الكارنوزين هذه الحموضة ويحافظ على انقباض القوة.',
      en: 'Intense exercise causes H+ accumulation, dropping muscle pH and causing acidosis. Carnosine neutralizes H+ ions, maintaining optimal muscle enzymatic function.',
      rw: 'Iyo ukora imyitozo H+ ihindura acid mu mikaya. Carnosine iragabanya acid ikakwemerera gukomeza.'
    },
    dosage: {
      ar: '3.2 جرام يومياً (يمكن تقسيمها لجرعتين لتفادي الوخز الشديد إن رغبت).',
      en: '3.2g to 6.4g daily. Daily accumulation builds muscle carnosine stores over 2-4 weeks.',
      rw: 'Gramu 3.2 buri munsi gukomeza ingufu.'
    },
    bestFor: {
      ar: 'لاعبي كمال الأجسام، الكروس فيت، الجري، والرياضات القتالية.',
      en: 'CrossFitters, combat athletes, high-volume bodybuilders, and endurance runners.',
      rw: 'Abazamura ibiremereye, abiruka n\'abakora CrossFit.'
    },
    synergies: {
      ar: 'يندمج بقوة مع الكرياتين والسيترولين لتغطية أنظمة الطاقة الثلاثة بالكامل.',
      en: 'Synergizes synergistically with Creatine Monohydrate and L-Citrulline.',
      rw: 'Bikorana neza na Creatine na L-Citrulline.'
    },
    safetyNote: {
      ar: 'شعور الوخز بالجلد آمن تماماً وطبيعي ويعكس امتصاص المادة بالجسم.',
      en: 'Paresthesia (skin tingling) is a benign, transient neuro-physiological response.',
      rw: 'Agashinge kaza ku ruhu ntiyandi ngaruka nk’ibyo.'
    }
  },
  {
    id: 'ashwagandha',
    emoji: '🌿',
    category: {
      ar: 'تقليل التوتر والهرمونات والتعافي',
      en: 'Stress, Hormones & Sleep',
      rw: 'Gukura Stress n\'Ibitotsi'
    },
    badgeColor: 'bg-emerald-950/80 border-emerald-800 text-emerald-400',
    borderColor: 'border-emerald-500/30 hover:border-emerald-500',
    textColor: 'text-emerald-400',
    name: {
      ar: 'أشواغاندا كيه إس إم-66 (Ashwagandha KSM-66)',
      en: 'Ashwagandha KSM-66 Adaptogen',
      rw: 'Ashwagandha KSM-66'
    },
    subtitle: {
      ar: 'عشبة التكيف الشهيرة لخفض هرمون الكورتيزول وزيادة التستوستيرون وجودة النوم',
      en: 'Premium adaptogenic herb clinically proven to lower cortisol and optimize testosterone',
      rw: 'Inzira yo kugabanya cortisol no kuzamura ibitotsi'
    },
    summary: {
      ar: 'مستخلص جذور الأشواغاندا الموحد بنسبة 5% ويثانوليدات (Withanolides) المثبت بالدراسات في تقليل التوتر العصبي وضبط الهرمونات البنائية.',
      en: 'Full-spectrum KSM-66 root extract standardized to 5% withanolides, scientifically validated to reduce stress biomarker cortisol and enhance athletic recovery.',
      rw: 'KSM-66 ihashya stress no kugabanya cortisol ikazaza ibitotsi byiza.'
    },
    benefits: {
      ar: [
        'خفض مستويات هرمون التوتر (الكورتيزول) بنسبة تصل إلى 27-30%',
        'تحسين جودة النوم العميق وتأمين أقصى استشفاء لعضلات ومخ الجسم',
        'دعم مستويات هرمون الذكورة (التستوستيرون) الطبيعي لدى الرياضيين',
        'زيادة التحمل البدني والقوة في تمارين رفع الأثقال'
      ],
      en: [
        'Reduces serum cortisol levels by up to 27-30% in clinical trials',
        'Enhances sleep architecture, deep REM recovery, and neuro-restoration',
        'Supports endogenous testosterone production and thyroid balance',
        'Increases muscle strength and VO2 max during resistance training'
      ],
      rw: [
        'Kugabanya cortisol ku 27-30%',
        'Kuzamura ibitotsi bya REM n\'umunaniro',
        'Gushyigikira testosterone y\'umubiri',
        'Kuzamura imibaraga mu myitozo'
      ]
    },
    mechanism: {
      ar: 'تعدل نشاط المحور الهرموني (HPA Axis)، مما يقلل إفراز الغدة الكظرية لهرمون الكورتيزول ويهدئ الجهاز العصبي السمبثاوي.',
      en: 'Modulates the Hypothalamic-Pituitary-Adrenal (HPA) axis, attenuating adrenal cortisol secretion and balancing sympathetic tone.',
      rw: 'Iragabanya ikora rya HPA axis no gukora kwa cortisol.'
    },
    dosage: {
      ar: '600mg يومياً مساءً قبل النوم بـ 30-60 دقيقة.',
      en: '300mg to 600mg daily, preferably in the evening or 1 hour before sleep.',
      rw: '600mg buri munsi imbere yo kuryama.'
    },
    bestFor: {
      ar: 'من يعانون من التوتر، أرق النوم، ارتفاع الكورتيزول، وتأخر الاستشفاء العضلي.',
      en: 'Athletes under heavy physical strain, high-stress individuals, and those with insomnia.',
      rw: 'Abantu bafite stress, ibitotsi mbibi n\'unaniro.'
    },
    synergies: {
      ar: 'تتكامل مع المغنيسيوم والزنك لتركيبة النوم والاستشفاء الذهبي (ZMA + Ashwagandha).',
      en: 'Pairs perfectly with Magnesium Bisglycinate and Zinc for ultimate sleep recovery.',
      rw: 'Bikorana neza na Magnesium na Zinc.'
    },
    safetyNote: {
      ar: 'عشب طبيعي آمن، يُفضل التوقف أسبوع كل 8 أسابيع لتنظيم مستقبلات الجسم.',
      en: 'Safe botanical adaptogen. Cycling (8 weeks on, 1 week off) is recommended.',
      rw: 'Bikoreshwa neza gusa ni bwiza kufata ikiruhuko gito nyuma y\'ibyumweru 8.'
    }
  },
  {
    id: 'magnesium',
    emoji: '🌙',
    category: {
      ar: 'الاسترخاء واستشفاء العضلات',
      en: 'Muscle Relaxation & Sleep',
      rw: 'Kuruhuka n\'Ibitotsi'
    },
    badgeColor: 'bg-blue-950/80 border-blue-800 text-blue-400',
    borderColor: 'border-blue-500/30 hover:border-blue-500',
    textColor: 'text-blue-400',
    name: {
      ar: 'ماغنسيوم بيسجليسينات (Magnesium Bisglycinate)',
      en: 'Magnesium Bisglycinate Chelate',
      rw: 'Magnesium Bisglycinate'
    },
    subtitle: {
      ar: 'الصيغة الأعلى امتصاصاً لمنع الشد العضلي واسترسال النوم العميق',
      en: 'Highly bioavailable chelated magnesium for muscular spasm relief and restorative sleep',
      rw: 'Inzira y\'magnesium yoroshye mu igogora'
    },
    summary: {
      ar: 'ماغنسيوم مرتبط بجزيئتين من حمض الجلايسين الأميني، مما يجعله يمتص عبر مسارات الأحماض الأمينية بدون أي إسهال أو اضطراب هضمي.',
      en: 'Magnesium bound to two glycine molecules. This amino acid chelate utilizes peptide absorption channels, guaranteeing maximum bioavailability without laxative effect.',
      rw: 'Magnesium ivanze na glycine ikazana absorption yisukuye idaterekeza n’igogora.'
    },
    benefits: {
      ar: [
        'إنهاء الشد العضلي والانقباضات اللارادية أثناء النوم والتمرين',
        'تهدئة الجهاز العصبي المركزي والمساعدة على الاستغراق في نوم عميق بسرعة',
        'تنشيط أكثر من 300 تفاعل إنزيمي لبناء الطاقة والبروتين في الجسم',
        'دعم صحة العظام والحد من آلام المفاصل والصداع النصفي'
      ],
      en: [
        'Eliminates nocturnal muscle cramps, spasms, and restless leg syndrome',
        'Calms the central nervous system by activating GABA receptors for deep sleep',
        'Essential cofactor for over 300 enzymatic biochemical reactions including ATP synthesis',
        'Supports bone mineral density and mitigates tension headaches'
      ],
      rw: [
        'Kugabanya ibinya no kubabara mu mikaya mu ibitotsi',
        'Gushyikira GABA mu bwonko no kuzana ibitotsi byiza',
        'Kukora mu enzymes zirenga 300',
        'Kugabanya umutwe n\'ingingo'
      ]
    },
    mechanism: {
      ar: 'يعمل كمضاد لطبيعة الكالسيوم داخل الخلية العضلية، مما يسمح للألياف العضلية بالاسترخاء التام بعد الانقباض.',
      en: 'Acts as a natural calcium antagonist in muscle cells, clearing intracellular calcium to permit full muscular relaxation post-contraction.',
      rw: 'Iragabanya calcium mu mikaya ikayemerera kuruhuka kikagenze.'
    },
    dosage: {
      ar: '200mg إلى 400mg مساءً قبل النوم بـ 30-45 دقيقة.',
      en: '200mg to 400mg taken 30-45 minutes before bedtime.',
      rw: '200mg kugeza 400mg imbere yo kuryama.'
    },
    bestFor: {
      ar: 'من يعانون من الشد العضلي، أرق النوم، الإجهاد العصبى والرياضيون المكثفون.',
      en: 'Athletes suffering from muscle cramps, insomnia, high mental stress, or magnesium deficiency.',
      rw: 'Abantu bafite ibinya mu mikaya, ibitotsi mbibi n\'stress.'
    },
    synergies: {
      ar: 'يتحد مع فيتامين B6 والزنك والأشواغاندا لخلطة الاستشفاء واستعادة الطاقة.',
      en: 'Works synergistically with Vitamin B6, Zinc, and Ashwagandha.',
      rw: 'Bikorana neza na Vitamin B6, Zinc na Ashwagandha.'
    },
    safetyNote: {
      ar: 'صيغة البيسجليسينات هي اللطيفة على الأمعاء ولا تسبب إسهال كصيغة الأكسيد الرخيصة.',
      en: 'Bisglycinate chelate eliminates gastrointestinal distress commonly seen with low-grade Magnesium Oxide.',
      rw: 'Ntidaterekana n\'igogora nka Magnesium Oxide.'
    }
  },
  {
    id: 'glutamine',
    emoji: '🧬',
    category: {
      ar: 'صحة الأمعاء والتعافي العضلي',
      en: 'Gut Health & Muscle Repair',
      rw: 'Ubuzima bw\'Amato'
    },
    badgeColor: 'bg-teal-950/80 border-teal-800 text-teal-400',
    borderColor: 'border-teal-500/30 hover:border-teal-500',
    textColor: 'text-teal-400',
    name: {
      ar: 'إل-جلوتامين النقي (L-Glutamine Pure)',
      en: 'L-Glutamine Micronized Gut & Muscle Recovery',
      rw: 'L-Glutamine Pure'
    },
    subtitle: {
      ar: 'الحمض الأميني الأكثر توافراً بالعضلات والمغذي الأول لبطانة الأمعاء والمناعة',
      en: 'The most abundant amino acid in muscular tissue and primary fuel for enterocyte gut lining',
      rw: 'Inzira y\'amino acid y\'amato n\'imikaya'
    },
    summary: {
      ar: 'الجلوتامين يمثل أكثر من 60% من الأحماض الأمينية الحرة في العضلات الهيكلية. ينخفض بشدة بعد التمارين الشاقة، وتناوله يعيد ترميم جدار الأمعاء والعضلات.',
      en: 'L-Glutamine constitutes over 60% of free skeletal muscle amino acid pool. Depleted rapidly during intense exercise, supplemental Glutamine repairs gut lining and prevents muscular catabolism.',
      rw: 'Glutamine irimo mu mikaya ku 60%. Iyo ukora imyitozo ikaye iragabanuka, ikaba ikeneve gukora ubwubatsi.'
    },
    benefits: {
      ar: [
        'ترميم بطانة الأمعاء وعلاج مشكلة نفاذية الأمعاء (Leaky Gut) وتحسين الامتصاص',
        'حماية العضلات من التفكك والهدم العضلي أثناء التمرين الشديد والتخسيس',
        'تغذية خلايا المناعة في الجهاز الهضمي والحد من عدوى بعد التمارين القاسية',
        'تسريع إعادة تخزين الجليكوجين العضلي بعد التدريبات المكثفة'
      ],
      en: [
        'Seals gut mucosal lining, mitigating leaky gut syndrome and improving nutrient absorption',
        'Prevents muscle catabolism and nitrogen loss during intense cut cycles',
        'Fuels immune cells (lymphocytes and macrophages) in the digestive tract',
        'Accelerates muscle glycogen resynthesis post-workout'
      ],
      rw: [
        'Kugorora no gukomeza inzira z\'amato no gukura uburwayi',
        'Kurinda imikaya gusamara mu gihe cyo kugabanya ibiro',
        'Gushyigikira uburinzi bw\'amato',
        'Gushyira glycogen mu mikaya'
      ]
    },
    mechanism: {
      ar: 'يوفر الوقود الرئيسي لخلايا بطانة الأمعاء (Enterocytes) وخلايا المناعة، ويحافظ على توازن النيتروجين الموجب في الأنسجة العضلية.',
      en: 'Serves as primary metabolic substrate for enterocyte division and tight-junction protein synthesis while maintaining positive nitrogen balance.',
      rw: 'Iguha pawa cells z\'amato gukora neza no kugarura nitrogen mu mikaya.'
    },
    dosage: {
      ar: '5 جرامات على الريق صباحاً أو بعد التمرين مباشرة مع الماء.',
      en: '5g to 10g daily, taken post-workout or on an empty stomach upon waking.',
      rw: 'Gramu 5 nyuma y\'imyitozo cyangwa mu gitondo.'
    },
    bestFor: {
      ar: 'من يعانون من مشاكل الهضم والقولون، والرياضيون في فترات التمرين المكثف والتنشيف.',
      en: 'Athletes undergoing high-volume training, individuals with leaky gut or digestive issues.',
      rw: 'Abantu bafite uburwayi bw\'amato n\'abakora imyitozo ikaye.'
    },
    synergies: {
      ar: 'يتكامل ممتازاً مع الواي بروتين والبروتين النباتي والبروبيوتيك.',
      en: 'Pairs effectively with Plant/Whey Protein and Probiotics.',
      rw: 'Bikorana neza na Protein na Probiotics.'
    },
    safetyNote: {
      ar: 'حمض أميني طبيعي متواجد بالطعام وآمن للغاية للاستخدام اليومي.',
      en: 'Naturally occurring amino acid with excellent safety profile.',
      rw: 'Ntayindi ngaruka irimo n\'ibyo Kurya.'
    }
  },
  {
    id: 'vit-d3-k2',
    emoji: '☀️',
    category: {
      ar: 'العظام والهرمونات والصحة العامة',
      en: 'Bones, Testosterone & Health',
      rw: 'Amagufa n\'Hormones'
    },
    badgeColor: 'bg-amber-950/80 border-amber-800 text-amber-400',
    borderColor: 'border-amber-500/30 hover:border-amber-500',
    textColor: 'text-amber-400',
    name: {
      ar: 'فيتامين د3 مع ك2 (Vitamin D3 + K2 MK7)',
      en: 'Vitamin D3 5000 IU + K2 MK7 Synergistic Complex',
      rw: 'Vitamin D3 + K2 MK7'
    },
    subtitle: {
      ar: 'الثنائي الذهبي للامتصاص المثالي للكالسيوم وصحة العظام والهرمونات',
      en: 'Synergistic hormonal & bone matrix pairing D3 with K2 MK7 for directed calcium delivery',
      rw: 'Inzira y\'amavitamini yo gushyigikira amagufa'
    },
    summary: {
      ar: 'فيتامين D3 يمتص الكالسيوم في الدم، بينما يقوم فيتامين K2 (MK-7) بتوجيه الكالسيوم إلى العظام والأسنـان ومنعه من التراكم في الشرايين.',
      en: 'Vitamin D3 promotes intestinal calcium absorption into the bloodstream, while Vitamin K2 (MK-7) activates Osteocalcin to direct calcium into bones and away from arterial walls.',
      rw: 'Vitamin D3 ikora absorption ya calcium, K2 MK7 ikayitwara mu magufa ntabe mu maraso.'
    },
    benefits: {
      ar: [
        'رفع كفاءة وصحة العظام والمفاصل والوقاية من الهشاشة وآلام الظهر',
        'دعم المستويات الطبيعية لهرمون التستوستيرون وزيادة القوة العضلية',
        'تحسين المزاج ومحاربة الاكتئاب الخريفي والشتوي والخمول',
        'تنشيط المناعة وتنظيم الاستجابة التهابية في الجسم'
      ],
      en: [
        'Enhances bone mineral density and structural integrity against stress fractures',
        'Directly linked with maintaining optimal free and total serum testosterone levels',
        'Elevates mood, mitigates seasonal affective disorder (SAD), and boosts vigor',
        'Modulates immune system cell receptors for antiviral resistance'
      ],
      rw: [
        'Kugira amagufa akomeye n\'ingingo',
        'Gushyigikira testosterone n\'ingufu',
        'Kuzamura ibitekerezo n\'umunezero',
        'Kuzamura uburinzi bw\'umubiri'
      ]
    },
    mechanism: {
      ar: 'D3 ينشط مستقبلات VDR الخلوية، و K2 ينشط بروتين Matrix GLA لقفل تكلس الشرايين وتثبيت الكالسيوم بالهيكل العظمي.',
      en: 'D3 binds to VDR receptors triggering osteocalcin expression; K2 carboxylates osteocalcin to bind hydroxyapatite crystals in skeletal matrix.',
      rw: 'D3 irazamura calcium, K2 ikayishyira mu magufa neza.'
    },
    dosage: {
      ar: 'كبسولة واحدة يومياً مع أكبر وجبة تحوي دهون صحية.',
      en: '1 capsule daily with a fat-containing meal (e.g. eggs, olive oil, avocado).',
      rw: 'Capsule 1 buri munsi hamwe n\'ifunguro ririmo amavuta byiza.'
    },
    bestFor: {
      ar: 'معظم الأشخاص الذين لا يتعرضون للشمس بشكل كافٍ، والرياضيون لبناء العظام والتستوستيرون.',
      en: 'Individuals with low sun exposure, athletes seeking hormonal optimization and bone density.',
      rw: 'Abantu batabona izuba rihagije n\'abakora imyitozo.'
    },
    synergies: {
      ar: 'يتحد بفاعلية مع أوميجا 3 والمغنيسيوم للامتصاص الأقصى.',
      en: 'Pairs perfectly with Omega-3 Fish Oil and Magnesium.',
      rw: 'Bikorana neza na Omega-3 na Magnesium.'
    },
    safetyNote: {
      ar: 'فيتامين ذائب في الدهون، الالتزام بالجرعة المحددة يضمن نتائج فائقة وأماناً تاماً.',
      en: 'Fat-soluble vitamin. Safe at recommended dosages; K2 prevents arterial calcification risks.',
      rw: 'Bikoreshwa neza ku bipimo byabwiwe.'
    }
  },
  {
    id: 'eaa-bcaa',
    emoji: '🧪',
    category: {
      ar: 'بناء العضلات والأحماض الأمينية',
      en: 'Aminos & Muscle Building',
      rw: 'Amino Acids n\'Imikaya'
    },
    badgeColor: 'bg-purple-950/80 border-purple-800 text-purple-400',
    borderColor: 'border-purple-500/30 hover:border-purple-500',
    textColor: 'text-purple-400',
    name: {
      ar: 'الأحماض الأمينية الأساسية الكاملة (EAA + BCAA Matrix)',
      en: 'Full-Spectrum EAA + BCAA Intra-Workout',
      rw: 'EAA + BCAA Matrix'
    },
    subtitle: {
      ar: 'الأحماض الأمينية التسعة الأساسية لمنع الهدم العضلي أثناء التمرين المكثف',
      en: 'All 9 essential amino acids with high Leucine ratio for maximum mTOR activation',
      rw: 'Inzira y\'amino acids 9 zikeneve mu myitozo'
    },
    summary: {
      ar: 'تضم جميع الأحماض الأمينية التسعة التي لا يستطيع الجسم تصنيعها بمفرده، بنسبة 2:1:1 للـ BCAA المعززة باللوسين لتشغيل مفتاح البناء العضلي mTOR.',
      en: 'Contains all 9 essential amino acids required for protein synthesis, featuring 2:1:1 BCAA ratio with elevated Leucine to trigger the mTOR anabolic cascade.',
      rw: 'Irimo amino acids 9 zose umubiri utikorera n\'isosi y\'Leucine yo gukora ubwubatsi.'
    },
    benefits: {
      ar: [
        'تشغيل مفتاح البناء العضلي (mTOR) أثناء وبعد التمرين مباشرة',
        'حماية العضلات من التفكك وتوفير طاقة فورية للألياف أثناء التمارين الصائمة',
        'ترطيب الخلايا العضلية واستبدال الأحماض الأمينية المفقودة بسرعة',
        'سرعة هضم فائقة بدون أي ثقل على المعدة أثناء التمرين'
      ],
      en: [
        'Triggers muscle protein synthesis pathway (mTOR) directly during workout',
        'Prevents muscular catabolism during fasted training or low-calorie diets',
        'Supports cellular hydration and rapid intracellular amino replenishment',
        'Zero digestion burden, absorbed almost instantly into bloodstream'
      ],
      rw: [
        'Gukora mTOR mu kubaka imikaya mu myitozo',
        'Kurinda imikaya gusamara mugihe utararya',
        'Kuzana amazi n\'amino acids mu cells',
        'Irigogora mu buryo bwihuse'
      ]
    },
    mechanism: {
      ar: 'تصل الأحماض الأمينية الحرة إلى مجرى الدم في دقائق معدودة بدون الحاجة لهضم الهياكل البروتينية المعقدة، مما يوقف الهدم العضلي فوراً.',
      en: 'Free-form EAAs bypass stomach breakdown and enter the portal vein in minutes, rapidly spiking plasma amino levels to stimulate protein translation.',
      rw: 'Jya mu maraso mu minota chache idakeneve igogora ndende.'
    },
    dosage: {
      ar: 'سكوب واحد (10-15g) يذاب في 500 مل ماء بارد يُشرب أثناء التمرين (Intra-Workout).',
      en: '1 scoop (10g - 15g) in 500ml cold water, sipped during workouts.',
      rw: 'Scoop 1 (10-15g) mu amazi 500ml mu gihe cyo gukora imyitozo.'
    },
    bestFor: {
      ar: 'الرياضيون في التمارين الطويلة، المتمرنون في الصيام، والراغبون في استشفاء سريع جداً.',
      en: 'Athletes in high-volume workouts, fasted lifters, and endurance competitors.',
      rw: 'Abantu bakora imyitozo ndende n\'abakorera mu gihe cyo gusiba.'
    },
    synergies: {
      ar: 'ممتازة جداً عند مزجها مع الإلكتروليتات والسيترولين أثناء التمرين.',
      en: 'Combines exceptionally with Electrolytes and L-Citrulline.',
      rw: 'Bikorana neza na Electrolytes na L-Citrulline.'
    },
    safetyNote: {
      ar: 'أحماض أمينية نقية خالصة وآمنة ومناسبة لجميع الأوقات.',
      en: 'Pure crystalline amino acids. Extremely safe and fast acting.',
      rw: 'Ntayindi ngaruka afite ni meza buri gihe.'
    }
  },
  {
    id: 'electrolytes',
    emoji: '💧',
    category: {
      ar: 'التوازن الهيدروليكي والترطيب',
      en: 'Hydration & Electrolytes',
      rw: 'Amazi n\'Munyu'
    },
    badgeColor: 'bg-sky-950/80 border-sky-800 text-sky-400',
    borderColor: 'border-sky-500/30 hover:border-sky-500',
    textColor: 'text-sky-400',
    name: {
      ar: 'أملاح الهيدريشن والإلكتروليتات (Electrolytes Hydration)',
      en: 'Electrolytes & Peak Hydration Matrix',
      rw: 'Electrolytes Hydration'
    },
    subtitle: {
      ar: 'تركيبة الأملاح الخمسة الأساسية لمنع الجفاف والدوخة والشد العضلي',
      en: 'Precision 5-mineral electrolyte matrix for nerve conduction and fluid balance',
      rw: 'Inzira y\'amunyu 5 yo kurwanya umunaniro'
    },
    summary: {
      ar: 'تضم الصوديوم، البوتاسيوم، المغنيسيوم، الكالسيوم، والكلوريد بجرعات متوازنة لتعويض الأملاح المفقودة في العرق ومنع الهبوط أثناء التدريب المكثف.',
      en: 'Contains balanced bioavailable Sodium, Potassium, Magnesium, Calcium, and Chloride to restore osmolarity lost through sweat during heavy exertion.',
      rw: 'Irimo Sodium, Potassium, Magnesium, Calcium na Chloride yo kugarura amunyu yagiye mu cyafi.'
    },
    benefits: {
      ar: [
        'منع الهبوط الجسدي والتعب المفاجئ والدوخة أثناء التمارين الحارة أو الشديدة',
        'حماية العضلات من التقلصات الشديدة والشد الناتج عن نقص البوتاسيوم والصوديوم',
        'تحسين النقل العصبي وانقباض الألياف العضلية بأقصى قوة',
        'سرعة إعادة ترطيب الخلايا والدم أفضل من الماء المفرد بمراحل'
      ],
      en: [
        'Prevents sudden energy crashes, dizziness, and heat exhaustion during intense sessions',
        'Eliminates cramping caused by hyponatremia and electrolyte imbalance',
        'Optimizes action potential transmission across neuromuscular junctions',
        'Rehydrates cellular tissue faster and more efficiently than water alone'
      ],
      rw: [
        'Kugabanya umunaniro n\'isezi mu myitozo',
        'Kukuraho ibinya mu mikaya nyuma y\'icyafi',
        'Gushyigikira imitsi n\'imikaya',
        'Kugarura amazi mu mubiri mu buryo bwihuse'
      ]
    },
    mechanism: {
      ar: 'تُنظم المضخة الخلوية (Sodium-Potassium Pump) التي تولد الإشارات الكهربائية اللازمة لانقباض العضلات وحفظ الضغط الأسموزي.',
      en: 'Maintains cellular membrane potential via Na+/K+-ATPase pump, sustaining action potentials and osmotic cell volume.',
      rw: 'Izamura Na+/K+ pump mu kurema signals z\'imitsi n\'imikaya.'
    },
    dosage: {
      ar: 'سكوب واحد يخلط مع 500-700 مل ماء ويُشرب أثناء التمرين أو في الأيام الحارة.',
      en: '1 scoop mixed in 500-700ml water during exercise or throughout hot days.',
      rw: 'Scoop 1 mu amazi 500-700ml mu myitozo.'
    },
    bestFor: {
      ar: 'الرياضيون في الجو الحار، ممارسو الكارديو، لاعب الأثقال، والذين يعرقون بكثرة.',
      en: 'Endurance runners, CrossFitters, heavy sweaters, and athletes in hot climates.',
      rw: 'Abantu bakora imyitozo mu bishyoha n\'abazana icyafi cyinshi.'
    },
    synergies: {
      ar: 'ممتازة جداً مع السيترولين والـ EAA والسكريات أثناء التمرين.',
      en: 'Pairs perfectly with EAA/BCAA and L-Citrulline.',
      rw: 'Bikorana neza na EAA na L-Citrulline.'
    },
    safetyNote: {
      ar: 'خالية من السكر الصناعي والمواد الضارة ومناسبة للاستخدام اليومي.',
      en: 'Zero added artificial sugar. Safe and refreshing.',
      rw: "Ntasukari y'imiti irimo ni meza."
    }
  },
  {
    id: 'coq10',
    emoji: '⚙️',
    category: {
      ar: 'طاقة الميتوكندريا وقوة القلب',
      en: 'Cellular Energy & Heart',
      rw: 'Ingufu z\'Umutima'
    },
    badgeColor: 'bg-amber-950/80 border-amber-800 text-amber-400',
    borderColor: 'border-amber-500/30 hover:border-amber-500',
    textColor: 'text-amber-400',
    name: {
      ar: 'كو إنزيم كيو 10 (Coenzyme Q10 / Ubiquinone)',
      en: 'CoQ10 Ultra-Pure Mitochondrial Power',
      rw: 'Coenzyme Q10'
    },
    subtitle: {
      ar: 'المحرك الخلوي الرئيسي لإنتاج طاقة ATP وحماية خلايا القلب الشريانية',
      en: 'Essential mitochondrial electron carrier for cardiac muscle vitality and ATP output',
      rw: 'Inzira y\'ingufu z\'umutima n\' cells'
    },
    summary: {
      ar: 'مركب طبيعي يتواجد بكثافة في الأعضاء الأكثر استهلاكاً للطاقة مثل القلب، الكبد، والعضلات. ضروري لنقل الإلكترونات وإنتاج الطاقة الخلوية.',
      en: 'Crucial antioxidant coenzyme concentrated in high-energy demand organs like heart, liver, and skeletal muscle, driving electron transport chain synthesis.',
      rw: 'CoQ10 irimo mu umutima n\'imikaya yo kurema ingufu z\'ATP.'
    },
    benefits: {
      ar: [
        'تعزيز قوة عضلة القلب وضخ الدم والوقاية من الإجهاد القلبي أثناء التمارين العنيفة',
        'تغذية الميتوكندريا وزيادة مستويات الطاقة الحيوية على المستوى الخلوي',
        'مضاد أكسدة قوي يحمي الأغشية الخلوية والحمض النووي من الأكسدة',
        'تحسين اللياقة البدنية والسرعة في التعافي بعد المجهود'
      ],
      en: [
        'Strengthens myocardial muscle contractility and cardiac endurance under fatigue',
        'Revitalizes mitochondrial electron transport chain for heightened cellular ATP',
        'Potent lipid-soluble antioxidant guarding cell membrane DNA against oxidative stress',
        'Enhances physical stamina and reduces post-workout systemic fatigue'
      ],
      rw: [
        'Gukomeza imikaya y\'umutima no pump y\'amaraso',
        'Kuzamura ingufu muri mitochondrial cells',
        'Gukura amaprotofe mu mubiri',
        'Kuzamura endurance mu myitozo'
      ]
    },
    mechanism: {
      ar: 'ينقل الإلكترونات بين المركبات I و II و III في سلسلة نقل الإلكترون بالميتوكندريا لتصنيع أقصى كمية من الـ ATP.',
      en: 'Shuttles electrons between Complexes I/II and Complex III in inner mitochondrial membrane to generate proton gradient for ATP synthase.',
      rw: 'Itwara electrons mu bitaro by\'ingufu bya cell ikaza ATP.'
    },
    dosage: {
      ar: '100mg إلى 200mg يومياً مع وجبة تحوي دهون صحية لزيادة الامتصاص.',
      en: '100mg to 200mg daily, consumed with a meal containing healthy fats.',
      rw: '100mg kugeza 200mg buri munsi na funguro.'
    },
    bestFor: {
      ar: 'الرياضيون فوق سن الـ 25، ممارسو الرياضات المجهدة، وكل من يسعى لحماية صحة القلب والطاقة.',
      en: 'Athletes over 25, high-intensity endurance competitors, and cardiovascular health-conscious users.',
      rw: 'Abantu bakora imyitozo ikaye n\'abashaka gukomeza umutima.'
    },
    synergies: {
      ar: 'يتكامل ممتازاً مع أوميجا 3، الكارنيتين، وفيتامين سي.',
      en: 'Pairs perfectly with Omega-3, L-Carnitine, and Vitamin C.',
      rw: 'Bikorana neza na Omega-3, L-Carnitine na Vitamin C.'
    },
    safetyNote: {
      ar: 'مركب طبيعي ينتجه الجسم ويقل مع التقدم بالسن، آمن جداً.',
      en: 'Naturally occurring coenzyme; safe and well-tolerated.',
      rw: "Ni kintu cy'umubiri ntangaruka afite."
    }
  }
];
