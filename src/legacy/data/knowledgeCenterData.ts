import { KnowledgeGuide, KnowledgeArticle, KnowledgeFAQ, Language } from '../types';

export interface KnowledgeCategoryItem {
  id: string;
  slug: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
  count: number;
}

export interface KnowledgeGoalItem {
  id: string;
  slug: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  icon: string;
}

export const KNOWLEDGE_CATEGORIES: KnowledgeCategoryItem[] = [
  {
    id: 'creatine',
    slug: 'creatine',
    title: { en: 'Creatine', ar: 'الكرياتين', rw: 'Creatine' },
    description: {
      en: 'ATP energy resynthesis, strength output, and intracellular muscle hydration.',
      ar: 'إعادة تصنيع طاقة ATP، القوة العضلية، والترطيب الخلوي داخل العضلات.',
      rw: 'Ingufu za ATP, kwongera imbaraga, no gukaza imikaya.'
    },
    icon: '⚡',
    count: 14
  },
  {
    id: 'protein',
    slug: 'protein',
    title: { en: 'Protein & Amino Acids', ar: 'البروتين والأحماض الأمينية', rw: 'Aboroteyine' },
    description: {
      en: 'Muscle protein synthesis (mTOR pathway), nitrogen balance, and repair.',
      ar: 'تحفيز مسار mTOR للبناء العضلي، توازن النيتروجين، وتسريع الاستشفاء.',
      rw: 'Kubaka imikaya, gukira vuba, n’ikoreshwa ry’ubwonko.'
    },
    icon: '💪',
    count: 22
  },
  {
    id: 'performance',
    slug: 'performance',
    title: { en: 'Nitric Oxide & Pump', ar: 'ضخ الدم والأكسيد النيتريك', rw: 'Pompe y’Amaso' },
    description: {
      en: 'Endothelial vasodilation, L-Citrulline Malate mechanisms, and hyperemia.',
      ar: 'توسيع الأوعية الدموية، آليات السيترولين مالات، وزيادة التدفق الدموي.',
      rw: 'Kugura imitsi y’amaraso no gutwara umwuka mwiza mubimasa.'
    },
    icon: '🔥',
    count: 18
  },
  {
    id: 'fat-loss',
    slug: 'fat-loss',
    title: { en: 'Fat Loss & Carnitine', ar: 'حرق الدهون والكارنيتين', rw: 'Gutwika Ibinure' },
    description: {
      en: 'Mitochondrial fatty acid oxidation, metabolic rate, and L-Carnitine L-Tartrate.',
      ar: 'أكسدة الدهون داخل المايتوكندريا، تسريع الأيض، وآليات L-Carnitine.',
      rw: 'Guhindura ibinure ingufu mu bice by’ingirabwimatsiko.'
    },
    icon: '📉',
    count: 15
  },
  {
    id: 'vitamins',
    slug: 'vitamins-minerals',
    title: { en: 'Vitamins & Minerals', ar: 'الفيتامينات والمعادن', rw: 'Vitamini na Minerals' },
    description: {
      en: 'Micronutrient co-factors, Vitamin C, D3, Zinc, Magnesium, and enzymatic efficiency.',
      ar: 'العوامل المساعدة الأنزيمية، فيتامينات C وD3، الزنك والماغنيسيوم.',
      rw: 'Isura nshya y’ubuzima bwiza no gukora neza kw’ingingo.'
    },
    icon: '🛡️',
    count: 19
  },
  {
    id: 'hydration',
    slug: 'hydration-electrolytes',
    title: { en: 'Hydration & Electrolytes', ar: 'التوازن المائي والألكتروليتات', rw: 'Amazi na Electrolytes' },
    description: {
      en: 'Sodium-Potassium ATPase pump, osmotic balance, and cramp prevention.',
      ar: 'مضخة الصوديوم والبوتاسيوم، التوازن الأسموزي، وتجنب الشد العضلي.',
      rw: 'Kubika amazi mu bice by’umubiri no kurinda ububabare.'
    },
    icon: '💧',
    count: 12
  },
  {
    id: 'science',
    slug: 'supplement-science',
    title: { en: 'Supplement Science & Clinicals', ar: 'علوم المكملات والأبحاث', rw: 'Ubuhanga bwa Inyongeramirire' },
    description: {
      en: 'ISSN position stands, PubMed randomized controlled trials, and NASM physiology.',
      ar: 'أبحاث ISSN الدورية، التجارب السريرية في PubMed، وفيزيولوجيا NASM.',
      rw: 'Ubushakashatsi buzwi bwa gihanga bwa ISSN na PubMed.'
    },
    icon: '🧬',
    count: 31
  }
];

export const KNOWLEDGE_GOALS: KnowledgeGoalItem[] = [
  {
    id: 'hypertrophy',
    slug: 'muscle-building',
    title: { en: 'Maximum Muscle Building', ar: 'الضخامة والبناء العضلي', rw: 'Kurema Imikaya' },
    description: {
      en: 'Science-backed protocols for myofibrillar protein synthesis & progressive overload.',
      ar: 'بروتوكولات علمية لتحفيز البناء العضلي والتضخم وزيادة الأحمال التدريبية.',
      rw: 'Uburyo bwizewe bwo gukora imikaya n’imbaraga.'
    },
    icon: '🏋️‍♂️'
  },
  {
    id: 'fat-loss-goal',
    slug: 'fat-loss-shredding',
    title: { en: 'Fat Loss & Definition', ar: 'حرق الدهون والترشيق', rw: 'Gutwika Ibinure' },
    description: {
      en: 'Maximize lipid oxidation while protecting lean muscle tissue under deficit.',
      ar: 'أكسدة شحوم الجسم مع حماية الكتلة العضلية الصلبة من الهدم.',
      rw: 'Gukura ibinure mu mubiri n’ubuzima bwiza.'
    },
    icon: '🔥'
  },
  {
    id: 'endurance-pump',
    slug: 'endurance-nitric-oxide',
    title: { en: 'Peak Vascularity & Pump', ar: 'ضخ الدم العالي والتحمل', rw: 'Kwiruka n’Imbaraga' },
    description: {
      en: 'Delay lactic acid buffering and optimize capillary blood flow to active muscles.',
      ar: 'تأخير التعب العضلي وتوسيع الشرايين لضخ الأكسجين والماء داخل الخلايا.',
      rw: 'Gukuraho umunaniro mu mikaya no gutwara umwuka.'
    },
    icon: '⚡'
  },
  {
    id: 'recovery-health',
    slug: 'rapid-recovery-health',
    title: { en: 'Rapid Recovery & Wellness', ar: 'الاستشفاء السريع والصحة العامة', rw: 'Gukira Vuba' },
    description: {
      en: 'Reduce systemic inflammation, restore glycogen, and boost cellular immunity.',
      ar: 'تقليل الالتهابات، تجديد الجلايكوجين، وتعزيز الجهاز المناعي.',
      rw: 'Gukira vuba na gahunda y’ubuzima bwiza.'
    },
    icon: '🩹'
  }
];

export const FEATURED_GUIDES: KnowledgeGuide[] = [
  {
    id: 'married-men-health-guide',
    slug: 'married-men-health-guide',
    title: {
      en: 'Married Men\'s Health & Sexual Physiology Guide: Managing Chemical Balance, Erection Mechanics, & Control',
      ar: 'دليل صحة الرجال المتزوجين: إدارة المعركة الفسيولوجية والانتصاب والتحكم المستدام',
      rw: 'Inyoborabuhanga y\'ubuzima bw\'abagabo bashatse: Ucunga ikinyabutabire, gukomera k\'igitsina n\'umutuzo'
    },
    subtitle: {
      en: 'Scientific physiology behind stress, impulsive desire, cGMP vs PDE5, Prolactin suppression, and the 4-element M.G.REFOTS protocol.',
      ar: 'تفنيط علمي فسيولوجي لمشاكل ضعف الانتصاب اللحظي والقذف السريع والتوتر وإعادة تنظيم cGMP والبرولاكتين ومكملات M.G.REFOTS',
      rw: 'Ibisobanuro bya Biochemie ku mu hangayiko, cGMP na PDE5, no gukoresha inyongeramirire za M.G.REFOTS.'
    },
    category: 'Men\'s Health',
    targetGoal: 'Rapid Recovery & Wellness',
    badge: {
      en: 'Married Men\'s Health',
      ar: 'دليل شامل للرجال المتزوجين',
      rw: 'Inyoborabuhanga y\'abagabo'
    },
    readingTime: '10 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: {
        en: 'NASM Master Certified Coach & Sports Nutrition Director',
        ar: 'مدرب معتمد NASM ومدير التغذية الرياضية بـ MGREFOTS',
        rw: 'Umutoza Wemerewe na NASM'
      },
      credentials: 'NASM-CPT, CNC, PES | 13+ Years Experience'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: {
        en: 'Clinical Biochemistry & Male Health Physiology Unit',
        ar: 'وحدة الكيمياء الحيوية السريرية والصحة الفسيولوجية للرجال',
        rw: 'Ikipe y’Inzobere mu Ubuzima'
      }
    },
    summary: {
      en: 'A comprehensive clinical breakdown showing how stress and elevated Cortisol destroy cGMP, activate PDE5, and trigger premature ejaculation, and how the 4-element M.G.REFOTS protocol restores control, rigidity, and spontaneous morning erections.',
      ar: 'تفنيط علمي فسيولوجي شامل يوضح كيف يؤدي التوتر والكورتيزول المرتفع إلى تدمير cGMP وتنشيط PDE5 والقذف السريع، وكيف يعيد بروتوكول M.G.REFOTS (السيترولين، الأشواجاندا، الزنك، والماغنيسيوم جليسينات) التحكم والصلابة والانتصاب الصباحي التلقائي.',
      rw: 'Inyoborabuhanga igaragaza uko umuhangayiko ubyara Cortisol yangiza cGMP ikagabanya gukomera k\'igitsina, n\'uko M.G.REFOTS (L-Citrulline, Ashwagandha, Zinc, Magnesium) igarura imbaraga.'
    },
    sections: [
      {
        id: 'section-1-problem-breakdown',
        title: {
          ar: '١. تفنيط مشكلة الانتصاب اللحظي والقذف السريع',
          en: '1. Decoding Tactile Erection & Premature Ejaculation',
          rw: '1. Gusobanukirwa ikibazo: Gukora no gusohora vuba'
        },
        content: {
          ar: 'تعال آخدك من إيدك ثانية واحدة، ونفصص مشكلة بتأرق رجالة كتير جداً، ومحدش بيفهمها صح. تخيل معايا السيناريو ده: إنسان عنده رغبة جنسية عالية جداً، وجسمه مشحون، لكن مفيش انتصاب بيحصل إلا في لحظة الالتحام الجسدي المباشر! ومش بس كده.. أول ما بيحصل الالتحام، بيحصل قذف سريع جداً، وبعدها الانتصاب بيختفي تماماً، ولو حاول يستنهضه تاني.. المنظومة كلها بتقفل ومبتستجيبش!\n\nلو السيناريو ده بيحصل معاك أو شفته، فأنسب حاجة أقولها لك: جسمك مش مريض، جسمك بس مش عارف يدير المعركة الكيميائية اللي جواه. تعال نفنط الأمور دي علمياً ونشوف الحرب دي دايرة ازاي.',
          en: 'Let me take you by the hand for a second, and break down a problem that bothers a vast number of men, yet very few truly understand. Imagine this scenario: a man has high sexual desire and an energized body, but no erection occurs until the exact moment of direct physical contact! Not only that—the moment contact happens, premature ejaculation occurs, followed by an immediate loss of erection. And if he tries to regain it, the entire system shuts down and refuses to respond!\n\nIf you experience or recognize this scenario, the most accurate thing I can tell you is: your body is not diseased; your body simply doesn\'t know how to manage the chemical war waging inside it. Let\'s break this down scientifically and see how this conflict unfolds.',
          rw: 'Reka tukunyure mu nzira mu minota mike, tugusesengurire ikibazo gihangayikisha abagabo benshi, ariko bake cyane nibo bagisobanukiwe neza. Tekereza kuri ibi: umugabo afite icyifuzo kinhi n\'umubiri ufite ingufu, ariko igitsina ntikigoreke kugeza igihe habayeho gukoranaho k\'umubiri! Ndetse ngo uwo mwanya, ahita asohora vuba cyane, maze igitsina kigahita kigwa. Niyo agerageje gukomeza, umubiri wose urifunga ntiwemerere!\n\nNiba ibi bikubaho, ikintu cy\'ingenzi cyo kumenya ni uko: umubiri wawe ntabwo urwaye; umubiri wawe gusa ntuzi uko ucunga intambara y\'ibinyabutabire irimo. Reka tubisesengure mu buryo bw\'ubuhanga Bwa Biochemie.'
        },
        callout: {
          type: 'science',
          title: {
            ar: 'التشخيص الفسيولوجي المعتمد',
            en: 'Clinical Physiological Diagnosis',
            rw: 'Isuzuma ry\'ubuhanga'
          },
          text: {
            ar: 'الجسم لا يعاني من تلف عضوي، بل من خلل في إدارة أكسيد النيتريك وcGMP تحت تأثير هرمون الكورتيزول المرتفع.',
            en: 'The tissue itself is healthy; the issue is a transient biochemical imbalance in Nitric Oxide signaling and cGMP degradation under elevated Cortisol.',
            rw: 'Umubiri utagira ikirwara, ahubwo ufite ikibazo cy\'ibinyabutabire cGMP na Cortisol.'
          }
        }
      },
      {
        id: 'section-2-cgmp-pde5-war',
        title: {
          ar: '٢. كيمياء الأوعية الدموية: جنود cGMP ضد القاتل الشرير PDE5',
          en: '2. Vascular Mechanics: cGMP Soldiers vs. PDE5 Sweeper',
          rw: '2. Ibinyabutabire by\'imitsi: cGMP n\'umwanzi PDE5'
        },
        content: {
          ar: 'علشان يحصل انتصاب قوي ومستمر، إحنا عندنا في الأوعية الدموية طرفين مسؤولين عن العملية دي؛ واحد بيحرك ويحفز، وواحد بيقتل ويكنس.\n\nالطرف الأول، ودول الجنود، جزيئات كيميائية اسمها cGMP. دول الجنود اللي بيفتحوا الأوعية الدموية وبيخلوا الدم يتدفق بقوة ويحبسوه علشان الانتصاب يفضل صلب.\n\nالطرف الثاني هو القاتل الشرير، إنزيم اسمه PDE5. ده جوبير أو كَنّاس.. أول ما بيشوف جنود الـ cGMP بيجري وراهم ويكنسهم علشان يرجع العضو لحالة الارتخاء.\n\nالمعادلة بسيطة جداً: لو عدد جنود الـ cGMP عندك أكتر من جنود القاتل الشرير، الانتصاب هيفضل طويل، وهيكون عندك قدرة غريبة وسريعة إنك ترجع للمعركة تاني بعد القذفة الأولى بسرعة أسرع من المعتاد بـ 70%! لكن لو القاتل الشرير هو اللي مسيطر؟ الانتصاب هيفشل أو هينهار في ثواني.',
          en: 'To achieve a strong, sustained erection, our blood vessels rely on two opposing forces: one that drives and stimulates, and one that destroys and clears out.\n\nThe first side—the soldiers—are chemical molecules called cGMP. These soldiers dilate blood vessels, driving powerful blood flow and trapping it to maintain a rigid erection.\n\nThe second side is the villain: an enzyme named PDE5. Think of PDE5 as a relentless sweeper; the moment it detects cGMP molecules, it hunts them down and clears them to return the organ to a flaccid state.\n\nThe math is simple: if your cGMP soldiers outnumber the PDE5 sweepers, your erection stays hard and long-lasting, and you gain an astonishing ability to bounce back for a second round up to 70% faster! But if PDE5 dominates? The erection collapses or fails within seconds.',
          rw: 'Kugirango ubonereho igitsina gikomeye kandi kiramba, mu mitsi y\'amaraso harimo impande ebyiri zishinzwe icyo gikorwa: rumwe rurakangura rukazamura, urundi rukica rukangiza.\n\nUruhande rwa mbere - abasirikare - ni ibinyabutabire byitwa cGMP. Aba basirikare bafungura imitsi y\'amaraso bagatuma amaraso azamuka cyane akagumamo kugira ngo igitsina kigumya gukomera.\n\nUruhande rwa kabiri ni umwanzi PDE5. Uyu ni umubyeyikazi unyagaza cGMP.\n\nIyo cGMP ibaye nyinshi kurenza PDE5, igitsina kiguma gikomeye kandi ukagira ubushobozi bwo gusubiramo ibikorwa vuba ku kigero cya 70% nshya! Ariko iyo PDE5 ari yo ifite ubushobozi, igitsina gihita kigwa mu masogonda.'
        }
      },
      {
        id: 'section-3-stress-cortisol-desire',
        title: {
          ar: '٣. التوتر والكورتيزول: الرغبة المندفعة مقابل الرغبة الناعمة المستقرة',
          en: '3. Stress & Cortisol: Impulsive vs. Soft Desire',
          rw: '3. Umuhangayiko, Cortisol n\'Icyifuzo cyoroshye'
        },
        content: {
          ar: 'طيب، ليه الراجل بيبدأ العلاقة بتوتر؟ وليه الانتصاب مبيجيش إلا باللمس؟\n\nلأن أغلب الرجالة حالياً بيدخلوا العلاقة بـ "رغبة مندفعة" يغذيها التوتر والأدرينالين وضغوط اليوم.. التوتر ده بيعلي هرمون اسمه الكورتيزول. الكورتيزول المرتفع ده بيعمل إيه؟ بيروح يصحّي "القاتل الشرير" ويخليه متوحش!\n\nفبالتالي، الإشارات الذهنية اللي جاية من دماغك بتتكسر ومبتوصلش للحوض، ومبيحصلش انتصاب إلا لما تتدخل الإشارة الميكانيكية اللمسية اللحظية.. والنتيجة؟ الجهاز العصبي بيكون مشدود على آخره، ومجرد ما بيحصل اللمس، بيحصل قذف سريع جداً لتفريغ الشحنة العصبية، والقاتل الشرير بيكنس الـ cGMP في ثانية.. والمنظومة بتنهار!\n\nإحنا مش عايزين مهدئات كيميائية تقفل الجسم.. إحنا عايزين نرجع لـ "الرغبة الناعمة".. الرغبة المستقرة اللي بتبدأ بهدوء، وتخلي الراجل يتحكم في إيقاع اللقاء بالملي علشان يوصل هو والمرأة لمرحلة التشبع الكامل.',
          en: 'Why do so many men enter intimacy with high anxiety, and why does an erection only occur with direct touch?\n\nBecause most men today approach intimacy driven by "impulsive desire" fueled by daily stress, adrenaline, and performance pressure. This anxiety spikes Cortisol. Elevated Cortisol awakens the villainous PDE5 enzyme and turns it hyperactive!\n\nConsequently, mental signals sent from your brain get scrambled and fail to reach the pelvic floor—requiring direct tactile stimulation to force an erection. The outcome? The nervous system is overstimulated, leading to rapid premature ejaculation to release nervous tension. PDE5 sweeps away cGMP in an instant, and the entire system collapses!\n\nWe don\'t want synthetic sedatives. We want to restore "Soft Desire"—a steady, composed arousal starting in calm, allowing the man to master every rhythm and reach complete mutual fulfillment with his partner.',
          rw: 'Kuki abagabo benshi binjira mu gikorwa bafite igihunga, kuki igitsina gipfupfuka gusa bakozeho?\n\nKuko abenshi bagenda bafite "icyifuzo gihuse" kizamuwe n\'umuhangayiko, adrenaline n\'umunaniro w\'umunsi. Umuhangayiko uzamura Cortisol. Cortisol izamutse ikangura umwanzi PDE5!\n\nIbi bituma ibimenyetso bituruka mu bwonko bitagera mu mbavu z\'igitsina, bikagombwa gusa gukoraho. Result? Sisitemu y\'iminsi iba yajagaje, hagahita habaho gusohora vuba, PDE5 ikagira cGMP mu isegonda.\n\nNtitwe twifuza imiti y\'ibinyabutabire; twifuza gukira "Icyifuzo cyoroshye" - ubushake butuje butuma umugabo ayobora igikorwa akageza umugore n\'umugabo ku mutuzo wuzuye.'
        }
      },
      {
        id: 'section-4-strategic-4-elements',
        title: {
          ar: '٤. الخطة الاستراتيجية الرباعية مع مكملات M.G.REFOTS',
          en: '4. The 4-Element Strategic Protocol with M.G.REFOTS Supplements',
          rw: '4. Gahunda y\'ibintu 4 hamwe n\'inyongeramirire za M.G.REFOTS'
        },
        content: {
          ar: 'علشان نكسب الحرب دي بالطبيعة وبدون أي أدوية، إحنا محتاجين خطة استراتيجية بتعتمد على 4 عناصر أساسية، وكل واحد فيهم ليه وظيفة فسيولوجية قاتلة:\n\nأولاً: M.G.REFOTS L-Citrulline\nده مُولد الجنود ومصنع أكسيد النيتريك اللي بيفيض في الأوعية الدموية ويصنع جيش مرعب من جنود الـ cGMP. لما ناخده بذكاء، مثلاً 3000 مجم كل 12 ساعة في أيام الراحة أو 6 جرام قبل التمرين، إحنا بنضمن إن الأنابيب مفتوحة والجنود مستعدين دايماً.\n\nثانياً: M.G.REFOTS Ashwagandha KSM-66\nقائد عمليات الهدوء. دي اللي هتنزل في منتصف اليوم تفرمل الكورتيزول والتوتر، وتنقّي غرفة التحكم في الدماغ وتزود الدوبامين. M.G.REFOTS Ashwagandha بتخليك تدخل المساء برغبة ناعمة وأعصاب حديد. وتذكر إن 600 مجم من مستخلص M.G.REFOTS الموحد بتعادل 6 جرام كاملة من الجذور العادية اللي عند العطار.\n\nثالثاً: M.G.REFOTS Zinc Picolinate\nالممول وحارس البوابة. ده اللي بيضمن إن مصنع التستوستيرون شغال، والأهم إنه بيحجم هرمون البرولاكتين الشرير اللي بيفرزه الجسم بعد القذف ويسبب فترة الخمول والارتخاء الدائم. M.G.REFOTS Zinc بيقفل الباب ده ويخليك مستعد ترجع بسرعة.\n\nرابعاً: M.G.REFOTS Magnesium Glycinate\nالحارس والمسترخي. المكمل اللي بيكمل المنظومة.. بيمنع تشنج الأوعية الدموية وبيضمن استرخاءها، وبياخد جسمك بالليل ويدخله في أعمق مراحل النوم اللي اسمها الـ REM Sleep.',
          en: 'To win this battle naturally without synthetic drugs, we rely on a 4-element strategy where each component serves a critical physiological function:\n\n1. M.G.REFOTS L-Citrulline:\nThe cGMP generator and Nitric Oxide factory that saturates blood vessels with an army of cGMP molecules. Dosed at 3,000 mg every 12 hours on rest days or 6g pre-workout, it guarantees open vascular pathways.\n\n2. M.G.REFOTS Ashwagandha KSM-66:\nThe commander of tranquility. Taken midday, it lowers Cortisol and stress, clears brain control centers, and elevates Dopamine. Dosed at 600 mg of standardized M.G.REFOTS extract (equivalent to 6g of raw root), it establishes composure and nerves of steel.\n\n3. M.G.REFOTS Zinc Picolinate:\nThe gatekeeper and testosterone catalyst. It maintains endogenous testosterone production while suppressing Prolactin—the post-ejaculatory hormone responsible for the refractory delay and fatigue. It shuts down recovery lag so you bounce back rapidly.\n\n4. M.G.REFOTS Magnesium Glycinate:\nThe vascular relaxer. It prevents vascular muscle spasms, ensures smooth arterial dilation, and guides your nervous system into deep REM sleep.',
          rw: 'Kugira ngo dutsinde iyi ntambara bila miti y\'ibinyabutabire, dukoresha ibintu 4 by\'ingenzi:\n\n1. M.G.REFOTS L-Citrulline:\nIgikoresho cya cGMP na Nitric Oxide. Igufasha gutuma imitsi ihhora ifunguye (3000mg buri masaha 12 cyangwa 6g mbere y\'imyitozo).\n\n2. M.G.REFOTS Ashwagandha KSM-66:\nIzamura Dopamine ikagabanya Cortisol n\'umuhangayiko (600mg ya M.G.REFOTS ikora nka 6g y\'imandwa).\n\n3. M.G.REFOTS Zinc Picolinate:\nUrinza Prolactin nyuma yo gusohora ikagufasha gukira vuba no gusubira mu gikorwa.\n\n4. M.G.REFOTS Magnesium Glycinate:\nIrinda gukanyaga k\'imitsi ikakwinjiza mu bitotsi byinshi bya REM Sleep.'
        },
        table: {
          headers: {
            ar: ['المكمل الغذائي', 'الجرعة الموصى بها', 'التوقيت المثالي', 'الوظيفة الفسيولوجية الأساسية'],
            en: ['Supplement', 'Recommended Dosage', 'Optimal Timing', 'Primary Physiological Action'],
            rw: ['Inyongeramirire', 'Ingano isabwa', 'Igihe cyiza', 'Umumaro w\'ingenzi']
          },
          rows: {
            ar: [
              ['M.G.REFOTS L-Citrulline', '3000 مجم - 6000 مجم', 'كل 12 ساعة / قبل التمرين', 'توليد أكسيد النيتريك ومضاعفة جزيئات cGMP لتوسيع الأوعية'],
              ['M.G.REFOTS Ashwagandha', '600 مجم مستخلص مركز', 'منتصف اليوم أو العصر', 'كبح الكورتيزول والتوتر وتنشيط الدوبامين للرغبة الناعمة'],
              ['M.G.REFOTS Zinc Picolinate', '30 - 50 مجم', 'مع الوجبة الرئيسية', 'حظر ارتفاع هرمون البرولاكتين وتصنيع التستوستيرون'],
              ['M.G.REFOTS Magnesium Glycinate', '400 مجم', 'قبل النوم بـ 45 دقيقة', 'بسط الأوعية الدموية والدخول في مرحلة الـ REM Sleep العميق']
            ],
            en: [
              ['M.G.REFOTS L-Citrulline', '3000 mg - 6000 mg', 'Every 12 hrs / Pre-workout', 'Nitric oxide synthesis & cGMP multiplication for arterial dilation'],
              ['M.G.REFOTS Ashwagandha', '600 mg extract', 'Midday / Afternoon', 'Cortisol suppression, nervous calming & dopamine elevation'],
              ['M.G.REFOTS Zinc Picolinate', '30 - 50 mg', 'With main meal', 'Testosterone synthesis & post-ejaculatory prolactin suppression'],
              ['M.G.REFOTS Magnesium Glycinate', '400 mg', '45 mins before sleep', 'Vascular smooth muscle relaxation & deep REM sleep induction']
            ],
            rw: [
              ['M.G.REFOTS L-Citrulline', '3000mg - 6000mg', 'Masaha 12 / Mbere y\'imyitozo', 'Kugura imitsi y\'amaraso no kurema cGMP'],
              ['M.G.REFOTS Ashwagandha', '600mg extract', 'Mugitondo / Ni midday', 'Kugabanya Cortisol n\'umuhangayiko'],
              ['M.G.REFOTS Zinc Picolinate', '30 - 50mg', 'Hamwe n\'ibiryo', 'Kurinda Prolactin no kurema Testosterone'],
              ['M.G.REFOTS Magnesium Glycinate', '400mg', 'Minota 45 mbere yo kuryama', 'Kuruhura imitsi no kwinjira mu bitotsi bya REM Sleep']
            ]
          }
        }
      },
      {
        id: 'section-5-morning-erections-success',
        title: {
          ar: '٥. مؤشر النجاح الفسيولوجي: الانتصاب الصباحي والتوازن المستدام',
          en: '5. The Clinical Biomarker of Success: Spontaneous Morning Erections',
          rw: '5. Icyemezo cy\'ubuzima bwiza: Gukomera k\'umutondo'
        },
        content: {
          ar: 'عارف يعني إيه تدخل في مرحلة الـ REM Sleep وجسمك متشبع بالسيترولين والمغنيسيوم والزنك والأشواجاندا من M.G.REFOTS؟\n\nيعني الكورتيزول صفر، التستوستيرون في أعلى قمة ليه، والأوعية مسترخية ومفتوحة.. والنتيجة؟ جسمك هيستعيد أقوى مؤشر على كفاءته الفسيولوجية وهو الانتصاب الصباحي التلقائي القوي.\n\nلما يتصلح الانتصاب الصباحي، اعرف إن الأوعية بقت سليمة، وإن الرغبة المندفعة المتوترة اتقفلت، وحل مكانها التحكم والصلابة المستدامة. فّنط جسمك صح، وافهم كيمياء المعركة.. تكسَب صحتك وعلاقتك. أشوفكم الفيديو الجاي.',
          en: 'Do you know what it means to enter deep REM sleep while your body is saturated with M.G.REFOTS L-Citrulline, M.G.REFOTS Magnesium Glycinate, M.G.REFOTS Zinc, and M.G.REFOTS Ashwagandha?\n\nIt means Cortisol drops to zero, Testosterone reaches its natural physiological peak, and blood vessels remain fully relaxed and dilated. The result? Your body recovers its strongest clinical marker of male vascular vitality: strong, spontaneous morning erections.\n\nOnce morning erections return, you know your vascular system is restored, anxious impulsive desire has been extinguished, and sustainable control and rock-solid rigidity have replaced it. Understand your body\'s internal chemistry, win the physiological battle, and safeguard your health and relationship.',
          rw: 'Iyo utuje mu bitotsi bya REM Sleep umubiri wawe ufite M.G.REFOTS L-Citrulline, M.G.REFOTS Magnesium, M.G.REFOTS Zinc na M.G.REFOTS Ashwagandha, Cortisol iba ari 0, Testosterone ikaba kuri 100%.\n\nResult? Umubiri uzabyuka ufite gukomera k\'umutondo (morning erection).\n\nIbi ni icyemezo ko imitsi yawe yakize kandi umutuzo wagukoreye.'
        },
        callout: {
          type: 'key-takeaway',
          title: {
            ar: 'الخلاصة المعتمدة',
            en: 'Final Clinical Takeaway',
            rw: 'Umwanzuro w\'ubuhanga'
          },
          text: {
            ar: 'عودة الانتصاب الصباحي هي الإشارة الفسيولوجية المؤكدة على تعافي الأوعية وتوازن الهرمونات والتحكم العالي.',
            en: 'The return of spontaneous morning erections is the ultimate physiological biomarker of vascular health, hormonal balance, and neural control.',
            rw: 'Gukomera k\'umutondo ni ikimenyetso ntakuka ko imitsi n\'imisemburo yawe biri mu buryo bwiza.'
          }
        }
      }
    ],
    faqs: [
      {
        question: {
          ar: 'هل يمكن خلط M.G.REFOTS L-Citrulline مع M.G.REFOTS Ashwagandha يومياً؟',
          en: 'Can M.G.REFOTS L-Citrulline be taken alongside M.G.REFOTS Ashwagandha daily?',
          rw: 'Esese M.G.REFOTS L-Citrulline yavangwa na M.G.REFOTS Ashwagandha buri munsi?'
        },
        answer: {
          ar: 'نعم بالتأكيد! يعمل L-Citrulline على توليد أكسيد النيتريك ومضاعفة cGMP، بينما تعمل Ashwagandha KSM-66 على كبح الكورتيزول وتهدئة الأعصاب، مما يوفر تكاملاً فسيولوجياً ممتازاً.',
          en: 'Yes, absolutely. L-Citrulline stimulates nitric oxide and cGMP, while Ashwagandha KSM-66 lowers Cortisol and calms the nervous system, providing exceptional biological synergy.',
          rw: 'Yego, L-Citrulline ifungura imitsi y\'amaraso, naho Ashwagandha ikagabanya umuhangayiko n\'igihunga.'
        }
      },
      {
        question: {
          ar: 'كم من الوقت يحتاجه بروتوكول M.G.REFOTS لإظهار النتائج واستعادة الانتصاب الصباحي؟',
          en: 'How quickly does the M.G.REFOTS protocol restore spontaneous morning erections?',
          rw: 'Bifata igihe kihe ngo M.G.REFOTS igarure gukomera k\'umutondo?'
        },
        answer: {
          ar: 'يبدأ تحسن جودة النوم والهدوء العصبي خلال 3-5 أيام، بينما تظهر استعادة الانتصاب الصباحي التلقائي والصلابة المستدامة خلال 10 إلى 14 يوماً من الالتزام اليومي.',
          en: 'Noticeable improvements in sleep depth and nervous tranquility occur within 3–5 days, with spontaneous morning erections and steady rigidity returning consistently within 10 to 14 days.',
          rw: 'Bifata iminsi 3-5 ngo utuje mu bitotsi, n\'iminsi 10-14 ngo ugire gukomera k\'umutondo.'
        }
      },
      {
        question: {
          ar: 'لماذا يعتبر M.G.REFOTS Magnesium Glycinate ضرورياً ضمن هذه المنظومة؟',
          en: 'Why is M.G.REFOTS Magnesium Glycinate essential for married men\'s health?',
          rw: 'Kuki M.G.REFOTS Magnesium Glycinate ari ngombwa ku bagabo bashatse?'
        },
        answer: {
          ar: 'لأنه يتميز بأعلى امتصاص معوي، ويمنع تشنج الأوعية الدموية العضلية، ويدخل الجهاز العصبي في مرحلة الـ REM Sleep العميق الضرورية لتخزين التستوستيرون الطبيعي.',
          en: 'Its glycinate amino acid chelate guarantees maximum absorption without gastrointestinal distress, relaxing vascular smooth muscle and guiding the brain into deep REM sleep required for natural testosterone synthesis.',
          rw: 'Magnesium Glycinate ifasha imitsi koroha no kwinjira mu bitotsi byinshi bya REM Sleep.'
        }
      }
    ],
    references: [
      {
        id: 'ref-1',
        title: 'Endothelial nitric oxide synthase and cGMP signaling pathways in erectile physiological integrity',
        authors: 'Burnett A.L. et al.',
        journal: 'Journal of Sexual Medicine',
        year: 2023
      },
      {
        id: 'ref-2',
        title: 'Cortisol-mediated inactivation of vascular smooth muscle relaxation and PDE5 upregulation',
        authors: 'Kim N.N. et al.',
        journal: 'International Journal of Impotence Research',
        year: 2022
      },
      {
        id: 'ref-3',
        title: 'Standardized Withania somnifera (Ashwagandha) extract reduces cortisol and stress in healthy men',
        authors: 'Chandrasekhar K. et al.',
        journal: 'Indian Journal of Psychological Medicine',
        year: 2021
      }
    ],
    relatedGuideIds: ['complete-citrulline-guide', 'complete-magnesium-guide', 'complete-zinc-guide'],
    isFeatured: true
  },
  {
    id: 'complete-creatine-guide',
    slug: 'complete-creatine-guide',
    title: {
      en: 'The Complete Creatine Monohydrate Scientific Guide',
      ar: 'الدليل العلمي الشامل للكرياتين مونوهيدرات (Creatine Monohydrate)',
      rw: 'Inyoborabuhanga Yuzuye ya Creatine Monohydrate'
    },
    subtitle: {
      en: 'Mechanisms of ATP resynthesis, loading protocols, brain energy, kidney safety, and stacking strategies.',
      ar: 'آليات إعادة تجديد ATP، بروتوكولات التحميل والصيانة، الأمان الكلوي، وتأثيره على الأداء الذهني والعضلي.',
      rw: 'Uburyo Creatine yakora, ingano yo kunywa, n’isuzuma ry’ubuziranenge.'
    },
    category: 'Creatine',
    targetGoal: 'Muscle Building',
    supplementId: 'mgrefots-creatine',
    badge: { en: 'Ultimate Guide', ar: 'دليل علمي شامل', rw: 'Inyoborabuhanga' },
    readingTime: '12 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach & Sports Nutrition Director', ar: 'مدرب معتمد NASM ومدير التغذية الرياضية بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC, PES | 13+ Years Experience'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Clinical Biochemistry & Exercise Physiology Unit', ar: 'وحدة الكيمياء الحيوية السريرية وفيزيولوجيا الرياضة', rw: 'Ikipe y’Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'Creatine is the most thoroughly researched sports supplement in human history, backed by over 500 peer-reviewed clinical studies. It works primarily by saturating muscle phosphocreatine stores to rapidly regenerate ATP during maximal intensity muscular contractions.',
      ar: 'يعتبر الكرياتين المكمل الغذائي الأكثر بحثاً ودراسة في تاريخ علوم الرياضة، حيث تدعمه أكثر من ٥٠٠ دراسة سريرية محكمة. يعمل الكرياتين بشكل أساسي عن طريق مشبع مخازن الفوسفوكرياتين بالعضلات لإعادة تصنيع طاقة ATP فوراً أثناء الرفع الثقيل.',
      rw: 'Creatine ni inyongeramirire yakozweho ubushakashatsi bwinshi cyane ku isi. Ifasha mu kurema ingufu za ATP mu mikaya vuba cyane.'
    },
    sections: [
      {
        id: 'what-is-creatine',
        title: {
          en: '1. Biochemistry & Mechanism of Action (ATP-PCr System)',
          ar: '١. الكيمياء الحيوية وآلية العمل (نظام فوسفات الكرياتين ATP-PCr)',
          rw: '1. Biochemistry n’uburyo yakora'
        },
        content: {
          en: 'During high-intensity explosive movements (such as a heavy bench press or 100m sprint), muscles rely on Adenosine Triphosphate (ATP) for energy. ATP yields energy by losing a phosphate molecule, becoming Adenosine Diphosphate (ADP). Because cellular ATP reserves are exhausted within 2–3 seconds, creatine phosphate donates its phosphate group to ADP, instantly resynthesizing ATP and sustaining peak strength output for up to 10 seconds.',
          ar: 'خلال التدريبات الانفجارية عالية الشدة (مثل رفعة البنش الثقيلة أو الجري السريع)، تعتمد الخلايا العضلية على جزيئات الأدينوزين ثلاثي الفوسفات (ATP) كوقود رئيسي. يفقد الـ ATP جزيء فوسفات ليتحول إلى ADP ذي الطاقة المنخفضة. هنا يتدخل الكرياتين الفوسفاتي المتبرع بجزيء فوسفات ليعيد تحويل الـ ADP إلى ATP في أجزاء من الثانية، مما يتيح لك استكمال التكرارات الحاسمة دون هبوط مفاجئ في القوة.',
          rw: 'Mu gihe ukora imyitozo ikomeye, imikaya ikoresha ATP. Creatine ifasha kugarura ingufu za ATP mu gihe gito cyane.'
        },
        callout: {
          type: 'key-takeaway',
          title: { en: 'Key Physiological Takeaway', ar: 'خلاصة فيزيولوجية حاسمة', rw: "Icy'o kuzirikana" },
          text: {
            en: 'Creatine does NOT directly build muscle; it creates the bioenergetic environment that allows you to lift heavier weights for more repetitions, triggering greater myofibrillar protein synthesis.',
            ar: 'الكرياتين لا يبني العضلات تلقائياً بشكل مباشر؛ بل يمنح الخلايا البيئة العالية الطاقة للتمرين بأوزان أكبر وتكرارات أكثر، مما يعطي الإشارة للخلية لبناء ألياف جديدة.',
            rw: 'Creatine ntabwo yubaka imikaya yo nyine, ahubwo iguha ingufu zo gukora imyitozo ikomeye yubaka imikaya.'
          }
        }
      },
      {
        id: 'dosing-protocols',
        title: {
          en: '2. Optimal Dosing Protocols: Loading vs. Daily Maintenance',
          ar: '٢. بروتوكولات الجرعة المثالية: مرحلة التحميل مقابل الصيانة اليومية',
          rw: '2. Ingano yo kunywa: Loading na Maintenance'
        },
        content: {
          en: 'Clinical research indicates two equally effective approaches to reach full muscle creatine saturation (160 mmol/kg dry muscle mass):\n\n• Rapid Loading Method: 20 grams daily (divided into 4 doses of 5g) for 5–7 days, followed by a daily maintenance dose of 3–5 grams.\n• Steady Daily Method: 3–5 grams daily consistently for 28 days to achieve identical muscle saturation without digestive load.\n\nTiming note: Post-workout ingestion alongside a carbohydrate/protein source increases creatine retention by up to 25% via insulin-mediated transport (GLUT4/SNAT2 transporters).',
          ar: 'تؤكد الدراسات السريرية وجود طريقتين متساويتين في النتيجة النهائية للوصول لتشبع العضلات الكامل بالكرياتين:\n\n• طريقة التحميل السريع: تناول ٢٠ جرام يومياً (مقسمة على ٤ جرعات كل منها ٥ جرام) لمدة ٥-٧ أيام، ثم الاستمرار على جرعة صيانة ٣-٥ جرام يومياً.\n• طريقة الاستمرار المنتظم: تناول ٥ جرام يومياً بانتظام لمدة ٢٨ يوماً للوصول لنفس نسبة التشبع دون إجهاد الجهاز الهضمي.\n\nتوقيت التناول: تناول الكرياتين بعد التمرين مع وجبة تحتوي على كربوهيدرات وبروتين يزيد من نسبة امتصاص الكرياتين داخل الخلية العضلية بنسبة تصل إلى ٢٥٪ بفضل هرمون الإنسولين.',
          rw: 'Ushobora kunywa gramu 20 ku munsi mu minsi 5, cyane ukazagenda unywa gramu 3-5 ku munsi.'
        },
        table: {
          headers: {
            en: ['Protocol', 'Daily Dose', 'Duration to Full Saturation', 'Best Suited For'],
            ar: ['البروتوكول', 'الجرعة اليومية', 'المدة للوصول للتشبع', 'الفئة الأنسب'],
            rw: ['Uburyo', 'Ingano ku munsi', 'Igihe bizafata', 'Uwo bibereye']
          },
          rows: {
            en: [
              ['Fast Loading', '20g (4x 5g)', '5 to 7 Days', 'Athletes needing immediate strength peak within a week'],
              ['Daily Steady', '3g to 5g once', '21 to 28 Days', 'Long-term athletes preferring simple daily routines']
            ],
            ar: [
              ['التحميل السريع', '٢٠ جرام (٤ مرات × ٥ج)', '٥ إلى ٧ أيام', 'الرياضيون المحتاجون لطاقة فورية قبل بطولة خلال أسبوع'],
              ['الثابت اليومي', '٣ إلى ٥ جرام مرة واحدة', '٢١ إلى ٢٨ يوماً', 'من يفضلون الانتظام السلس دون تغيير الجرعات']
            ],
            rw: [
              ['Loading Vuba', '20g (4x 5g)', 'Iminsi 5-7', 'Abasportifu bakeneye ingufu vuba'],
              ['Kunywa Buri Munsi', '3g-5g', 'Iminsi 21-28', 'Abantu bashaka gahunda yoroshye']
            ]
          }
        }
      },
      {
        id: 'myths-kidney-safety',
        title: {
          en: '3. Scientific Debunking: Kidney Safety & Hair Loss Myths',
          ar: '٣. الحقائق السريرية: حقيقة الأمان الكلوي وشائعات تساقط الشعر',
          rw: '3. Ubuziranenge ku Pyiko n’Ubusobanuro'
        },
        content: {
          en: 'Safety & Kidneys: Blood tests in creatine users often show elevated creatinine—a harmless metabolic byproduct of creatine breakdown excreted by kidneys. Numerous long-term studies (up to 5 continuous years) in healthy individuals demonstrate zero impairment in Glomerular Filtration Rate (GFR) or renal biomarkers.\n\nHair Loss Myth: A single 2009 trial in rugby players showed a modest increase in DHT. Over 12 subsequent clinical trials failed to replicate this finding. Creatine does not cause hair follicle miniaturization.',
          ar: 'الأمان والكلى: أظهرت الفحوصات الطبية لمستخدمي الكرياتين ارتفاعاً طفيفاً في مادة الكرياتينين بالدم، وهي ناتج طبيعي وغير ضار عن تفكك الكرياتين وتطرد عبر الكلى. الدراسات الطويلة الأجل (حتى ٥ سنوات متواصلة) أثبتت كفاءة وظائف الكلى (GFR) والسلامة الكاملة لدى الأفراد الأصحاء.\n\nشائعة تساقط الشعر: نتجت هذه الشائعة عن دراسة فردية واحدة عام ٢٠٠٩ على لاعبي روغبي، بينما فشلت أكثر من ١٢ دراسة سريرية لاحقة في إثبات أي ارتباط بين الكرياتين وهرمون DHT أو تساقط الشعر.',
          rw: 'Creatine ntabwo yangiza ipyiko ku bantu bazima, kandi ntabwo itera gupfuka umusatsi.'
        },
        callout: {
          type: 'warning',
          title: { en: 'Medical Hydration Note', ar: 'تنبيه صحي هام بخصوص شرب الماء', rw: 'Icyitonderwa ku Mazi' },
          text: {
            en: 'Because creatine draws water into muscle cells (intracellular hydration), ensure you drink an extra 1 to 1.5 liters of water daily to prevent dehydration and maximize muscle fullness.',
            ar: 'نظراً لأن الكرياتين يسحب الماء داخل الخلايا العضلية (ترطيب خلوي مفيد)، يجب زيادة استهلاك الماء بمقدار ١ إلى ١.٥ لتر يومياً لضمان أقصى كفاءة للخلية.',
            rw: 'Creatine ikurura amazي mu mikaya, niyo mpamvu ugomba kunywa amazi ahagije buri munsi.'
          }
        }
      }
    ],
    faqs: [
      {
        question: {
          en: 'Does creatine cause subcutaneous water retention (bloating)?',
          ar: 'هل يسبب الكرياتين احتباس الماء تحت الجلد أو انتفاخ البطن؟',
          rw: 'Esese Creatine itera kuzana amazi mu ruhu?'
        },
        answer: {
          en: 'No. Creatine increases intracellular water (inside the muscle cell), which makes muscles appear fuller and harder. It does NOT accumulate under the skin (extracellular fluid) unless lower-quality unrefined products are used.',
          ar: 'لا. الكرياتين يحتبس الماء داخل الخلية العضلية نفسها وليس تحت الجلد، مما يمنح العضلة مظهراً ممتلئاً ومشدوداً، ولا يسبب أي انتفاخ عشوائي بشرط استخدام كرياتين نقي دقيق التنعيم Micronized.',
          rw: 'Oya, Creatine ibika amazi imbere mu mikaya, bituma umukaya uba munini ukanakomera.'
        }
      },
      {
        question: {
          en: 'Should I cycle off creatine every month?',
          ar: 'هل يجب التوقف عن تناول الكرياتين وتدويره شهرياً؟',
          rw: 'Esese ngomba gukora cycle yo guhagarika Creatine?'
        },
        answer: {
          en: 'No. Clinical trials show that continuous long-term creatine monohydrate supplementation does not suppress natural endogenous synthesis once supplementation stops.',
          ar: 'لا يوجد سبب علمي لتطوير دورات انقطاع. أثبتت الدراسات أن تناول الكرياتين بانتظام مستمر لا يؤثر على قدرة الجسم الطبيعية على تصنيعه بعد التوقف.',
          rw: 'Oya, ushobora gukomeza kunywa Creatine buri munsi ntasimbuka.'
        }
      }
    ],
    references: [
      {
        id: 'ref-1',
        title: 'International Society of Sports Nutrition position stand: safety and efficacy of creatine supplementation in exercise, sport, and medicine',
        authors: 'Kreider RB, Kalman DS, Antonio J, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2017,
        doiOrUrl: 'https://pubmed.ncbi.nlm.nih.gov/28615996/'
      },
      {
        id: 'ref-2',
        title: 'Common questions and misconceptions about creatine supplementation: what does the scientific evidence really show?',
        authors: 'Antonio J, Candow DG, Forbes SC, et al.',
        journal: 'Journal of the International Society of Sports Nutrition',
        year: 2021,
        doiOrUrl: 'https://pubmed.ncbi.nlm.nih.gov/33557850/'
      }
    ],
    relatedGuideIds: ['complete-citrulline-guide', 'complete-whey-protein-guide'],
    relatedProductId: 'mgrefots-creatine',
    isFeatured: true
  },
  {
    id: 'complete-citrulline-guide',
    slug: 'complete-citrulline-guide',
    title: {
      en: 'The Complete L-Citrulline Malate 2:1 Physiology Guide',
      ar: 'الدليل الفيزيولوجي الكامل لـ السيترولين مالات 2:1 (L-Citrulline Malate)',
      rw: 'Inyoborabuhanga ya L-Citrulline Malate 2:1'
    },
    subtitle: {
      en: 'Endothelial nitric oxide synthases (eNOS), vasodilation, lactic acid buffering, and vascular pump dynamics.',
      ar: 'إنزيمات الأكسيد النيتريك الشرياني، توسع الأوعية الدموية، التخلص من حمض اللاكتيك، وضخ الدم العالي.',
      rw: 'Uburyo L-Citrulline ifungura imitsi y’amaraso ikongera umwuka mu mikaya.'
    },
    category: 'Performance',
    targetGoal: 'Nitric Oxide Pump',
    supplementId: 'mgrefots-citrulline',
    badge: { en: 'Nitric Oxide Science', ar: 'علوم ضخ الدم', rw: 'Ubuhanga bwa Pump' },
    readingTime: '10 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach & Sports Nutrition Director', ar: 'مدرب معتمد NASM ومدير التغذية الرياضية بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC | 13+ Years Experience'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Clinical Biochemistry & Exercise Physiology Unit', ar: 'وحدة الكيمياء الحيوية السريرية وفيزيولوجيا الرياضة', rw: 'Ikipe y’Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'L-Citrulline is a potent non-essential amino acid that bypasses hepatic first-pass metabolism, converting directly into L-Arginine in the kidneys to boost systemic Nitric Oxide (NO) levels far more effectively than Arginine itself.',
      ar: 'يعتبر السيترولين حمضاً أمينياً قوياً يتجاوز عملية الأيض الكبدي الأولى، ليتحول مباشرة إلى أرجينين داخل الكلى، مما يرفع مستويات الأكسيد النيتريك (NO) في الدم بكفاءة أعلى بكثير من تناول الأرجينين المباشر.',
      rw: 'L-Citrulline ifasha kurema Nitric Oxide mu maraso, bituma umukaya ugira amaraso ahagije.'
    },
    sections: [
      {
        id: 'citrulline-mechanism',
        title: {
          en: '1. Why L-Citrulline Outperforms L-Arginine Supplementation',
          ar: '١. لماذا يتفوق السيترولين على الأرجينين المباشر في ضخ الدم؟',
          rw: '1. Kuki L-Citrulline irusha L-Arginine gukora neza?'
        },
        content: {
          en: 'Oral L-Arginine is extensively degraded in the gastrointestinal tract and liver by the arginase enzyme (up to 70% loss). In contrast, L-Citrulline escapes hepatic degradation, reaching the kidneys where it is systematically converted to L-Arginine. This produces sustained plasma Arginine concentration peaks, stimulating endothelial nitric oxide synthase (eNOS) to relax smooth muscle in blood vessels.',
          ar: 'يتعرض الأرجينين الفموي للتكسر الشديد في الجهاز الهضمي والكبد بفضل إنزيم الأرجينيز (يفقد حتى ٧٠٪ من قيمته). في المقابل، يمر السيترولين بسلام عبر الكبد ليصل للكلى، حيث يتحول هناك بانتظام إلى أرجينين نقي، مما يرفع نسبة الأرجينين بالدم لفترات أطول ويحفز إنزيم eNOS لتوسيع الأوعية وتسهيل تدفق الدم.',
          rw: 'L-Citrulline ntabwo yangirika mu igogora, igera mu pyiko ikahinduka Arginine nshya.'
        }
      },
      {
        id: 'malate-krebs-cycle',
        title: {
          en: '2. The Role of Malic Acid (Malate) in the Krebs Energy Cycle',
          ar: '٢. دور حمض المالك (Malate) في دورة كريبس وإنتاج الطاقة',
          rw: '2. Akamaro ka Malate mu kurema ingufu'
        },
        content: {
          en: 'The 2:1 ratio combines two molecules of L-Citrulline with one molecule of Malic Acid. Malate is a key intermediate in the tricarboxylic acid (TCA / Krebs) cycle. It facilitates aerobic ATP production and accelerates ammonia and lactic acid clearance from working muscle fibers during high-volume endurance sets.',
          ar: 'تجمع نسبة ٢:١ بين جزيئين من السيترولين مع جزيء واحد من حمض المالك. حمض المالك هو مركب أساسي في دورة كريبس لتوليد الطاقة الهوائية، حيث يسعد في التخلص من تراكم الأمونيا وحمض اللاكتيك المسبب للحرقان العضلي أثناء المجموعات العالية التكرار.',
          rw: 'Malate ifasha mu kurema ingufu n’okugabanya umunaniro mu mikaya.'
        }
      }
    ],
    faqs: [
      {
        question: {
          en: 'When should I consume L-Citrulline Malate 2:1?',
          ar: 'متى يجب تناول السيترولين مالات للحصول على أقصى فائدة؟',
          rw: 'Ni ryari ngomba kunywa L-Citrulline Malate?'
        },
        answer: {
          en: 'Consume 6 to 8 grams 30–45 minutes prior to intense resistance training sessions on an empty or light stomach.',
          ar: 'تناول ٦ إلى ٨ جرامات قبل التمرين بـ ٣٠ إلى ٤٥ دقيقة على معدة فارغة أو بعد وجبة خفيفة.',
          rw: 'Nyo gramu 6-8 mu minota 30-45 mbere yo gukora imyitozo.'
        }
      }
    ],
    references: [
      {
        id: 'ref-cit-1',
        title: 'Citrulline malate enhances athletic anaerobic performance and relieves muscle soreness',
        authors: 'Pérez-Guisado J, Jakeman PM.',
        journal: 'Journal of Strength and Conditioning Research',
        year: 2010,
        doiOrUrl: 'https://pubmed.ncbi.nlm.nih.gov/20386132/'
      }
    ],
    relatedGuideIds: ['complete-creatine-guide', 'complete-l-carnitine-guide'],
    relatedProductId: 'mgrefots-citrulline',
    isFeatured: true
  },
  {
    id: 'complete-whey-protein-guide',
    slug: 'complete-whey-protein-guide',
    title: {
      en: 'The Complete Plant & Whey Protein Master Guide',
      ar: 'الدليل العلمي الشامل للبروتين النباتي والوي بروتين (Protein Guide)',
      rw: 'Inyoborabuhanga ya Protein na Pea/Rice Blend'
    },
    subtitle: {
      en: 'PDCAAS & DIAAS amino acid scoring, mTOR pathway activation, 70/30 Pea & Rice synergy, and lactose digestion.',
      ar: 'تقييم الأحماض الأمينية DIAAS، تنشيط مسار mTOR للبناء، تركيبة البازلاء والأرز ٧٠/٣٠، وسهولة الهضم.',
      rw: 'Isezerano rya Pea n’Oruro protein n’uburyo yubaka imikaya.'
    },
    category: 'Protein',
    targetGoal: 'Muscle Building',
    supplementId: 'mgrefots-plant-protein',
    badge: { en: 'Protein Science', ar: 'علوم البروتين والبناء', rw: 'Ubuhanga bwa Protein' },
    readingTime: '15 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach & Sports Nutrition Director', ar: 'مدرب معتمد NASM ومدير التغذية الرياضية بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC, PES | 13+ Years Experience'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Clinical Biochemistry & Exercise Physiology Unit', ar: 'وحدة الكيمياء الحيوية السريرية وفيزيولوجيا الرياضة', rw: 'Ikipe y’Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'Muscle Protein Synthesis (MPS) relies on supplying all 9 Essential Amino Acids, with special emphasis on Leucine thresholds (2.5–3.0g per serving). Combining 70% Yellow Pea and 30% Brown Rice isolates completes the amino acid profile, matching pure Whey Isolate effectiveness without lactose intolerance.',
      ar: 'تحفيز البناء العضلي (MPS) يتطلب توفير جميع الأحماض الأمينية الأساسية الـ ٩، وخاصة عتبة الليوسين (٢.٥ - ٣ جرام لكل وجبة). دمج ٧٠٪ بروتين البازلاء الصفراء مع ٣٠٪ بروتين الأرز البني يكتمل المظهر الأميني كاملاً ليضاهي الوي إيزوليت دون أي مشاكل هضمية أو لاكتوز.',
      rw: 'Igipimo cy’ubatswe bw’imikaya gisaba amino acids 9 zose. Igiteranyo cya Pea 70% na Rice 30% giha umubiri proteyine yuzuye.'
    },
    sections: [
      {
        id: 'pea-rice-synergy',
        title: {
          en: '1. The 70/30 Pea & Brown Rice Isolate Amino Acid Synergy',
          ar: '١. التآزر الأميني بين بروتين البازلاء وبروتين الأرز بنسبة ٧٠/٣٠',
          rw: '1. Akamaro k’igiteranyo cya Pea na Rice 70/30'
        },
        content: {
          en: 'Individual plant sources have specific amino acid limitations: Pea protein is rich in Lysine but slightly lower in Methionine and Cysteine. Brown Rice protein is exceptionally high in Methionine and Cysteine but lower in Lysine. Formulating a precise 70% Pea and 30% Rice ratio yields a DIAAS score > 1.0, equaling milk whey isolate digestibility.',
          ar: 'تمتلك المصادر النباتية الفردية حدوداً للأحماض الأمينية: فبروتين البازلاء غني باللايسين ولكنه أقل في الميثيونين. بينما بروتين الأرز البني غني جداً بالميثيونين وأقل في اللايسين. دمج نسبة ٧٠٪ بازلاء و٣٠٪ أرز يمنحك بروتيناً كاملاً مع درجة هضم DIAAS تتجاوز ١.٠ لتساوي الوي بروتين تماماً.',
          rw: 'Pea ifite Lysine nyinshi, Rice ikagira Methionine nyinshi. Kubimvanga biha umubiri proteyine yuzuye.'
        }
      }
    ],
    faqs: [
      {
        question: {
          en: 'Is plant protein as effective as dairy whey for building muscle?',
          ar: 'هل البروتين النباتي المركب بنفس كفاءة الوي بروتين في بناء العضلات؟',
          rw: 'Esese plant protein irashobora kubaka imikaya nka whey?'
        },
        answer: {
          en: 'Yes. Clinical studies published in the Journal of the International Society of Sports Nutrition proved that when total leucine and essential amino acid profiles are matched (as in MGREFOTS 70/30 Blend), muscle thickness and strength gains are identical to whey isolate.',
          ar: 'نعم تماماً. أثبتت الدراسات السريرية المحكمة في مجلة ISSN أن عند متوافق كمية الليوسين والأحماض الأمينية الأساسية، تكون النتائج في زيادة سمك الألياف العضلية والقوة متطابقة تماماً بين الوي والبروتين النباتي المركب.',
          rw: 'Yego, iyo amino acids ziba zihagije, zombi zubaka imikaya mu buryو bwizerwe.'
        }
      }
    ],
    references: [
      {
        id: 'ref-prot-1',
        title: 'The effects of 8 weeks of whey or rice protein supplementation on body composition and exercise performance',
        authors: 'Joy JM, Lowery RP, Wilson JM, et al.',
        journal: 'Nutrition Journal',
        year: 2013,
        doiOrUrl: 'https://pubmed.ncbi.nlm.nih.gov/23782212/'
      }
    ],
    relatedGuideIds: ['complete-creatine-guide', 'complete-citrulline-guide'],
    relatedProductId: 'mgrefots-plant-protein',
    isFeatured: true
  },
  {
    id: 'complete-vitamin-c-guide',
    slug: 'complete-vitamin-c-guide',
    title: {
      en: 'The Complete Vitamin C & Collagen Synthesis Guide',
      ar: 'الدليل الكامل لفيتامين سي وتصنيع الكولاجين والمناعة',
      rw: 'Inyoborabuhanga ya Vitamin C'
    },
    subtitle: {
      en: 'Proline hydroxylation, macrophage immune signaling, and tendon collagen cross-linking.',
      ar: 'هيدروكسيلة البرولين لتصنيع الكولاجين، تعزيز المناعة، وتقوية المفاصل والأوتار.',
      rw: 'Kurinda ubuzima no kubaka collagen mu ngingo.'
    },
    category: 'Vitamins',
    targetGoal: 'Overall Vitality & Immune Health',
    badge: { en: 'Micronutrient Science', ar: 'علوم المغذيات الدقيقة', rw: 'Ubuhanga bwa Vitamini' },
    readingTime: '8 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Biochemistry Unit', ar: 'وحدة الكيمياء الحيوية', rw: 'Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'Vitamin C (Ascorbic Acid) is a non-negotiable co-factor for prolyl and lysyl hydroxylase enzymes, which form stable triple-helix collagen fibers protecting ligaments and joints during heavy lifting.',
      ar: 'يعتبر فيتامين سي المساعد الأنزيمي الأساسي لإنزيمات تصنيع بروتين الكولاجين، حيث يدعم قوة المفاصل والأربطة ويحمي الخلايا من الإجهاد التأكسدي أثناء التمارين العنيفة.',
      rw: 'Vitamin C ifasha kurema collagen mu ngingo no kurinda umubiri indwara.'
    },
    sections: [
      {
        id: 'vit-c-collagen',
        title: {
          en: '1. Tendon Repair & Collagen Hydroxylation',
          ar: '١. ترميم الأوتار والمفاصل وتصنيع الكولاجين',
          rw: '1. Kurinda imitsi n’ingingo'
        },
        content: {
          en: 'Without adequate Vitamin C, collagen synthesis halts, weakening connective tissue integrity. Consuming Vitamin C prior to mobility or rehab workouts triples collagen bio-incorporation into heavy-loaded tendons.',
          ar: 'بدون كميات كافية من فيتامين سي، تتوقف عملية ربط ألياف الكولاجين، مما يضعف الأنسجة الضامة والمفاصل. تناول فيتامين سي يعزز مرونة المفاصل وقدرتها على تحمل الأوزان الثقيلة.',
          rw: 'Vitamin C ifasha imitsi n’ingingo gukora neza mu gihe ukora imyitozo ikomeye.'
        }
      }
    ],
    faqs: [
      {
        question: {
          en: 'What is the optimal dose for hard-training athletes?',
          ar: 'ما هي الجرعة اليومية المثالية للرياضيين؟',
          rw: 'Ingano ikwiye ku munsi ni iyihe?'
        },
        answer: {
          en: '500mg to 1000mg daily supports connective tissue health and neutrophil function without blunting desirable exercise-induced metabolic adaptations.',
          ar: '٥٠٠ إلى ١٠٠٠ مجم يومياً توفر الدعم المناعي الكامل وتصنيع الكولاجين دون التأثير السلبي على التكيف العضلي.',
          rw: '500mg-1000mg ku munsi zihagije mu gukomeza ubuzima.'
        }
      }
    ],
    references: [],
    relatedGuideIds: ['complete-zinc-guide', 'complete-magnesium-guide'],
    isFeatured: false
  },
  {
    id: 'complete-magnesium-guide',
    slug: 'complete-magnesium-guide',
    title: {
      en: 'The Complete Magnesium Glycinate & Muscle Relaxation Guide',
      ar: 'الدليل الشامل للماغنيسيوم جليسينات والاسترخاء العضلي ونوم REM',
      rw: 'Inyoborabuhanga ya Magnesium Glycinate'
    },
    subtitle: {
      en: 'Neuromuscular transmission, NMDA receptor antagonism, and deep sleep recovery.',
      ar: 'تنظيم شحنات العضلات والأعصاب، تهدئة مستقبلات NMDA، وضمان النوم العميق للتعافي.',
      rw: 'Kuruhura imikaya no gusinzira neza.'
    },
    category: 'Minerals',
    targetGoal: 'Rapid Recovery & Wellness',
    badge: { en: 'Mineral Science', ar: 'علوم المعادن والتعافي', rw: 'Ubuhanga bwa Minerals' },
    readingTime: '9 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Biochemistry Unit', ar: 'وحدة الكيمياء الحيوية', rw: 'Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'Magnesium regulates over 300 enzymatic reactions. In athletes, it acts as a natural calcium channel blocker, allowing muscles to relax after contraction and enabling parasympathetic nervous system dominance for deep REM sleep.',
      ar: 'ينظم الماغنيسيوم أكثر من ٣٠٠ تفاعل أنزيمي في الجسم. بالنسبة للرياضيين، يعمل كمحفز لاستخار الألياف العضلية بعد الانقباض شديد القوة، ويعزز الجهاز العصبي الباراسمبثاوي للدخول في أعمق مراحل النوم والتعافي.',
      rw: 'Magnesium ifasha imikaya kuruhuka nyuma yo gukora imyitozo no gusinzira neza.'
    },
    sections: [
      {
        id: 'magnesium-glycinate',
        title: {
          en: '1. Why Magnesium Glycinate is Superior to Oxide/Citrate',
          ar: '١. لماذا تعتبر صيغة الماغنيسيوم جليسينات الأفضل للرياضيين؟',
          rw: '1. Kuki Magnesium Glycinate ari nziza?'
        },
        content: {
          en: 'Bound to two glycine molecules, Magnesium Glycinate boasts >85% bioavailability without osmotic laxative side effects common in citrate or oxide forms. Glycine acts as an inhibitory neurotransmitter in the brain, synergizing for restorative sleep.',
          ar: 'ترتبط صيغة الماغنيسيوم جليسينات بجزيئين من حمض الجلايسين الأميني، مما يمنحها نسبة امتصاص عالية تجاوز ٨٥٪ دون إحداث أي ملينات معوية. يعمل الجلايسين كناقل عصبي مهدئ للمخ لضمان التعافي التام.',
          rw: 'Magnesium Glycinate iranyobwa neza cyane ikagira akamaro mu kuruhura ubwonko.'
        }
      }
    ],
    faqs: [
      {
        question: {
          en: 'When is the best time to take Magnesium?',
          ar: 'ما هو الوقت الأنسب لتناول الماغنيسيوم؟',
          rw: 'Ni ryari nziza kunywa Magnesium?'
        },
        answer: {
          en: '30 to 60 minutes before bedtime to promote muscle relaxation and nocturnal growth hormone release.',
          ar: 'قبل النوم بـ ٣٠ إلى ٦٠ دقيقة لتحفيز استرخاء العضلات وزيادة إفراز هرمون النمو أثناء النوم.',
          rw: 'Iminota 30-60 mbere yo kuryama.'
        }
      }
    ],
    references: [],
    relatedGuideIds: ['complete-zinc-guide', 'complete-vitamin-d-guide'],
    isFeatured: false
  },
  {
    id: 'complete-zinc-guide',
    slug: 'complete-zinc-guide',
    title: {
      en: 'The Complete Zinc Picolinate & Endocrine Optimization Guide',
      ar: 'الدليل الكامل للزنك بيكولينات ودعم الهرمونات البنائية والمناعة',
      rw: 'Inyoborabuhanga ya Zinc'
    },
    subtitle: {
      en: 'Testosterone synthesis enzymatic pathways, aromatase balancing, and cellular repair.',
      ar: 'مسارات تصنيع هرمون التستوستيرون، موازنة إنزيم الأرومايز، وإصلاح الخلايا.',
      rw: 'Gukora imfashanyigisho z endocrine n ubuzima.'
    },
    category: 'Minerals',
    targetGoal: 'Overall Vitality & Immune Health',
    badge: { en: 'Endocrine Support', ar: 'دعم الهرمونات والمناعة', rw: 'Ubuhanga bwa Zinc' },
    readingTime: '8 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Biochemistry Unit', ar: 'وحدة الكيمياء الحيوية', rw: 'Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'Zinc is a critical trace mineral essential for luteinizing hormone (LH) conversion to testosterone. Intense sweating causes rapid zinc depletion in athletes, leading to endocrine drops if unsupplemented.',
      ar: 'يعتبر الزنك معدناً حيوياً لتصنيع هرمون التستوستيرون الطبيعي ودعم المناعة. يفقد الرياضيون كميات كبيرة من الزنك عن طريق العرق أثناء التمارين الشاقة، مما يستدعي تعويضه لحماية البيئة الهرمونية البنائية.',
      rw: 'Zinc ifasha mu gukora testosterone no kurema ubudahangarwa bz’umubiri.'
    },
    sections: [
      {
        id: 'zinc-endocrine',
        title: {
          en: '1. Zinc & Endocrine Optimization',
          ar: '١. الزنك وتحسين النسبة الهرمونية الطبيعية',
          rw: '1. Zinc n’ubuzima bw’imfashanyigisho'
        },
        content: {
          en: 'Zinc deficiency suppresses pituitary gonadotropin secretion, lowering serum free testosterone. Zinc picolinate provides optimal intestinal absorption to restore endocrine balance.',
          ar: 'نقص الزنك يؤدي إلى هبوط إفراز هرمون التستوستيرون الحر. تناول صيغة البيكولينات يضمن أسرع امتصاص معوي لتعويض هذا النقص وإبقاء الهرمونات البنائية في النطاق المثالي.',
          rw: 'Zinc ifasha kubika testosterone mu rugero rwikwiye.'
        }
      }
    ],
    faqs: [],
    references: [],
    relatedGuideIds: ['complete-magnesium-guide', 'complete-vitamin-d-guide'],
    isFeatured: false
  },
  {
    id: 'complete-l-carnitine-guide',
    slug: 'complete-l-carnitine-guide',
    title: {
      en: 'The Complete L-Carnitine L-Tartrate Metabolic Guide',
      ar: 'الدليل العلمي الكامل لـ L-Carnitine L-Tartrate وأكسدة الدهون',
      rw: 'Inyoborabuhanga ya L-Carnitine'
    },
    subtitle: {
      en: 'Mitochondrial CPT-1 fatty acid shuttle, androgen receptor upregulation, and metabolic flexibility.',
      ar: 'نقل أحماض الدهون عبر إنزيم CPT-1 للمايتوكندريا، تحفيز مستقبلات الأندرين، والترشيق العضلي.',
      rw: 'Gutwika ibinure mu gukoresha CPT-1.'
    },
    category: 'Fat Loss',
    targetGoal: 'Fat Loss & Definition',
    badge: { en: 'Metabolic Science', ar: 'علوم حرق الدهون والأيض', rw: 'Ubuhanga bwa Fat Loss' },
    readingTime: '11 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Biochemistry Unit', ar: 'وحدة الكيمياء الحيوية', rw: 'Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'L-Carnitine acts as a molecular transport shuttle (via Carnitine Palmitoyltransferase-1) moving long-chain fatty acids into mitochondrial matrix for beta-oxidation into ATP fuel.',
      ar: 'يعمل L-Carnitine كناقل جزيئي يحمل الأحماض الدهنية طويلة السلسلة إلى داخل المايتوكندريا (أفران الطاقة بالخلية) ليتم حرقها وأكسدتها إلى طاقة ATP يستفيد منها الجسم أثناء التمرين.',
      rw: 'L-Carnitine itwara ibinure mu furnace y’ingirabwimatsiko ikabihinduramo ingufu.'
    },
    sections: [
      {
        id: 'carnitine-shuttle',
        title: {
          en: '1. Fatty Acid Transport & CPT-1 Enzymatic Shuttle',
          ar: '١. نقل الأحماض الدهنية وآلية إنزيم CPT-1',
          rw: '1. Gutwara ibinure mu ngirabwimatsiko'
        },
        content: {
          en: 'Fatty acids cannot cross the inner mitochondrial membrane independently. L-Carnitine binds fatty acyl-CoA, allowing transport into the mitochondria. L-Tartrate form additionally increases androgen receptor density in muscle cells post-workout.',
          ar: 'لا تستطيع الدهون عبور غشاء المايتوكندريا بمفردها. يندمج الكارنيتين مع جزيئات الدهون لتسهيل نفلها إلى الداخل لإنتاج الطاقة. صيغة الـ L-Tartrate تمتاز كذلك بزيادة كثافة مستقبلات الأندروجين بالعضلات.',
          rw: 'L-Carnitine ifasha gutwara ibinure imbere mu bice bitwika fat.'
        }
      }
    ],
    faqs: [],
    references: [],
    relatedGuideIds: ['complete-citrulline-guide', 'complete-creatine-guide'],
    isFeatured: true
  },
  {
    id: 'complete-vitamin-d-guide',
    slug: 'complete-vitamin-d-guide',
    title: {
      en: 'The Complete Vitamin D3 & K2 Musculoskeletal Guide',
      ar: 'الدليل الكامل لفيتامين د٣ وفيتامين ك٢ لصحة العظام والأداء العضلي',
      rw: 'Inyoborabuhanga ya Vitamin D3 & K2'
    },
    subtitle: {
      en: 'Calcium homeostasis, VDR receptor binding in muscle fibers, and osteocalcin activation.',
      ar: 'توازن الكالسيوم، تحفيز مستقبلات VDR داخل الألياف العضلية، وتنشيط الأوستيوكالسين.',
      rw: 'Gukomeza amagufa n’imikaya.'
    },
    category: 'Vitamins',
    targetGoal: 'Overall Vitality & Immune Health',
    badge: { en: 'Endocrine Vitamin', ar: 'الفيتامين الهرموني', rw: 'Ubuhanga bwa Vitamini D3' },
    readingTime: '10 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Biochemistry Unit', ar: 'وحدة الكيمياء الحيوية', rw: 'Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'Vitamin D3 operates as a secosteroid hormone binding directly to Vitamin D Receptors (VDR) inside skeletal muscle cells, enhancing muscle contraction force, bone density, and immune resilience.',
      ar: 'يعمل فيتامين د3 كهرمون ستيرويدي يرتبط مباشرة بـ VDR داخل الخلايا العضلية، مما يعزز قوة الانقباض، كثافة العظام والمناعة.',
      rw: 'Vitamin D3 ikora nka secosteroid hormone ifasha mu gukomeza imikaya no kuringaniza ibyiyumviro.'
    },
    sections: [
      {
        id: 'vitamin-d3-vdr',
        title: {
          en: '1. VDR Activation & Musculoskeletal Power',
          ar: '١. تنشيط مستقبلات VDR والقوة العضلية العظمية',
          rw: '1. VDR Activation & Musculoskeletal Power'
        },
        content: {
          en: 'Vitamin D3 binds to intracellular nuclear Vitamin D Receptors (VDR) in skeletal muscle tissue, regulating protein synthesis and calcium handling during explosive muscle contractions.',
          ar: 'يرتبط فيتامين د3 بمستقبلات الفيتامين داخل نواة خلايا العضلات الهيكلية، ليضبط تخليق البروتين وتوازن الكالسيوم أثناء الانقباضات العضلية السريعة.',
          rw: 'Vitamin D3 ifasha gukora no gukomeza amagufa n’imikaya.'
        }
      }
    ],
    faqs: [],
    references: [],
    relatedGuideIds: ['complete-creatine-guide', 'complete-citrulline-guide'],
    isFeatured: true
  },
  {
    id: 'complete-omega3-guide',
    slug: 'complete-omega3-guide',
    title: {
      en: 'The Complete Omega-3 Fatty Acids & Muscle Recovery Guide',
      ar: 'الدليل الكامل لأحماض أوميجا-٣ الدهنية والاستشفاء العضلي',
      rw: 'Inyoborabuhanga ya Omega-3'
    },
    subtitle: {
      en: 'EPA & DHA cellular membrane integration, DOMS reduction, and cardiovascular performance.',
      ar: 'دمج الأحماض الدهنية EPA وDHA في غشاء الخلية، تقليل آلام العضلات DOMS، وصحة القلب.',
      rw: 'Ibinure bya Omega-3 no gukira kw’imikaya.'
    },
    category: 'Vitamins',
    targetGoal: 'Muscle Recovery & Inflammation Control',
    badge: { en: 'Essential Fatty Acid', ar: 'حمض دهني أساسي', rw: 'Ubuhanga bwa Omega-3' },
    readingTime: '9 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Biochemistry Unit', ar: 'وحدة الكيمياء الحيوية', rw: 'Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'EPA and DHA integrate into muscle cell membranes, improving nutrient transport and reducing delayed onset muscle soreness (DOMS) after high-intensity training.',
      ar: 'تندمج أحماض EPA وDHA في أغشية الخلايا العضلية، مما يسرع نقل المغذيات ويقلل من آلام العضلات المتأخرة (DOMS) بعد التمارين العنيفة.',
      rw: 'Omega-3 ifasha kurinda ububabare bw’imikaya no kubika amaraso meza.'
    },
    sections: [],
    faqs: [],
    references: [],
    relatedGuideIds: ['complete-vitamin-c-guide', 'complete-magnesium-guide'],
    isFeatured: false
  },
  {
    id: 'complete-electrolytes-guide',
    slug: 'complete-electrolytes-guide',
    title: {
      en: 'The Complete Cellular Electrolytes & Osmolality Guide',
      ar: 'الدليل الكامل للالكتروليتات والتوازن الأسموزي والوقاية من الشد العضلي',
      rw: 'Inyoborabuhanga ya Electrolytes'
    },
    subtitle: {
      en: 'Sodium, Potassium, Magnesium ion channels, membrane action potentials, and stamina.',
      ar: 'قنوات أيونات الصوديوم والبوتاسيوم، جهد الفعل الغشائي، والحفاظ على اللياقة دون تقلصات.',
      rw: 'Kubika amazi n’imbaraga mu mubiri.'
    },
    category: 'Hydration',
    targetGoal: 'Peak Vascularity & Pump',
    badge: { en: 'Hydration Science', ar: 'علوم التوازن المائي', rw: 'Ubuhanga bwa Electrolytes' },
    readingTime: '8 min read',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' },
      credentials: 'NASM-CPT, CNC'
    },
    medicalReviewer: {
      name: 'MGREFOTS Sports Advisory Panel',
      role: { en: 'Biochemistry Unit', ar: 'وحدة الكيمياء الحيوية', rw: 'Inzobere mu Ubuzima' }
    },
    summary: {
      en: 'Electrolytes maintain cellular electrical gradients. A 2% loss in fluid/electrolyte equilibrium triggers rapid strength decline, neural fatigue, and muscular cramping.',
      ar: 'تحافظ الالكتروليتات على التوازن الكهربائي للخلية. انخفاض نسبة السوائل بـ ٢٪ فقط يؤدي لتراجع القوة بـ ٢٠٪ وظهور الشد العضلي المؤلم.',
      rw: 'Electrolytes zigawe mu maraso zirinda kumva unaniwe no gukanya imikaya.'
    },
    sections: [],
    faqs: [],
    references: [],
    relatedGuideIds: ['complete-creatine-guide', 'complete-citrulline-guide'],
    isFeatured: false
  }
];

export const KNOWLEDGE_FAQS: KnowledgeFAQ[] = [
  // ==========================================
  // 1. CREATINE FAQS (الكرياتين - 26 FAQ)
  // ==========================================
  {
    category: 'creatine',
    question: {
      ar: '1. ما هو الكرياتين؟',
      en: '1. What is Creatine?',
      rw: '1. Ni iki Creatine?'
    },
    answer: {
      ar: 'الكرياتين مركب طبيعي يُخزن في العضلات ويساعد على إنتاج الطاقة السريعة (ATP) أثناء التمارين عالية الشدة.',
      en: 'Creatine is a natural compound stored in muscle tissue that helps rapidly regenerate cellular energy (ATP) during high-intensity exercise.',
      rw: 'Creatine ni inyongeramirire ibikwa mu mikaya ifasha gukora ingufu za ATP mu buryo bwihuse mu gihe cyo gukora imyitozo.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '2. هل الكرياتين آمن؟',
      en: '2. Is Creatine safe?',
      rw: '2. Esese Creatine irafite umutekano?'
    },
    answer: {
      ar: 'نعم، تشير الآلاف من الدراسات إلى أن الكرياتين مونوهيدرات آمن لمعظم البالغين الأصحاء عند استخدامه بالجرعات الموصى بها.',
      en: 'Yes, thousands of clinical trials confirm that Creatine Monohydrate is safe for healthy adults when consumed at recommended dosages.',
      rw: 'Yego, ubushakashatsi bwinshi bwerekana ko Creatine Monohydrate ifite umutekano ku bantu bakuru bazima.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '3. هل الكرياتين يضر الكلى؟',
      en: '3. Does Creatine damage kidneys?',
      rw: '3. Esese Creatine yangiza ingigo y’ifunguro?'
    },
    answer: {
      ar: 'لا توجد أدلة على أنه يضر الكلى لدى الأشخاص الأصحاء، لكن من يعاني من أمراض الكلى يجب أن يستشير الطبيب قبل استخدامه.',
      en: 'There is no scientific evidence that Creatine causes kidney damage in healthy individuals. However, anyone with pre-existing renal disease should consult a physician.',
      rw: 'Nta gihamya gihari cyerekana ko Creatine yangiza impyiko ku bantu bazima, ariko abafite uburwayي bw’impyiko bagomba kubaza muganga.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '4. هل الكرياتين يزيد الوزن؟',
      en: '4. Does Creatine cause weight gain?',
      rw: '4. Esese Creatine yongera ibiro?'
    },
    answer: {
      ar: 'يزيد الوزن نتيجة زيادة الاحتباس المائي داخل الخلايا العضلية ونمو الكتلة العضلية الصافية.',
      en: 'Weight gain occurs due to intracellular muscle hydration and long-term increases in lean muscle mass.',
      rw: 'Yongera ibiro bitewe n’amazi ajya mu bice by’imikaya no gukura kw’imikaya.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '5. هل يجب عمل مرحلة تحميل؟',
      en: '5. Is a loading phase necessary?',
      rw: '5. Esese ni ngombwa gukora loading phase?'
    },
    answer: {
      ar: 'لا، مرحلة التحميل ليست ضرورية. تناول 3-5 جرام يومياً يؤدي إلى نفس النتيجة وتشبّع العضلات خلال عدة أسابيع (3-4 أسابيع).',
      en: 'No, a loading phase is not required. Taking 3-5g daily fully saturates muscle phosphocreatine stores within 3-4 weeks.',
      rw: 'Oya, ntabwo ari ngombwa. Gufata 3-5g ku munsi biragera ku ntego mu myoshyo mike.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '6. ما أفضل وقت لتناول الكرياتين؟',
      en: '6. What is the best time to take Creatine?',
      rw: '6. Ni ryari igihe cyiza cyo gufata Creatine?'
    },
    answer: {
      ar: 'الأهم هو الانتظام اليومي، سواء قبل أو بعد التمرين أو مع أي وجبة.',
      en: 'Consistency is key. You can take it pre-workout, post-workout, or with any meal.',
      rw: 'Ikintu cy’ingenzi ni ukuyifata buri munsi, haba mbere cyangwa nyuma y’imyitozo.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '7. هل يؤخذ في أيام الراحة؟',
      en: '7. Should Creatine be taken on rest days?',
      rw: '7. Esese Creatine ifatwa mu minsi y’ikiruhuko?'
    },
    answer: {
      ar: 'نعم، للحصول على أفضل النتائج يجب تناوله يومياً حتى في أيام الراحة للحفاظ على تشبّع العضلات.',
      en: 'Yes, to maintain full muscle saturation, Creatine must be taken consistently every day, including rest days.',
      rw: 'Yego, kugirango imikaya ihoreshe ingufu zose, igomba gufatwa buri munsi no mu minsi y’ikiruhuko.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '8. هل يجب شرب كمية كبيرة من الماء؟',
      en: '8. Should I drink large amounts of water with Creatine?',
      rw: '8. Esese ngomba kunywa amazi menshi?'
    },
    answer: {
      ar: 'يفضل الحفاظ على ترطيب جيد، لكن لا توجد كمية خاصة ضخمة مطلوبة بسبب الكرياتين وحده.',
      en: 'Proper hydration is always recommended, but no extreme water intake is specifically required solely due to Creatine.',
      rw: 'Ni byiza kunywa amazi ahagije, ariko nta ngano ikabije isabwa kuri Creatine yonyine.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '9. هل الكرياتين يبني العضلات وحده؟',
      en: '9. Does Creatine build muscle on its own?',
      rw: '9. Esese Creatine yubaka imikaya yonyine?'
    },
    answer: {
      ar: 'لا، الكرياتين يساعد على تحسين الأداء والقوة، أما بناء العضلات فيعتمد على التدريب والتغذية.',
      en: 'No. Creatine enhances energy and strength output, but muscle growth depends on proper resistance training and nutrition.',
      rw: 'Oya, Creatine ifasha gukora imyitozo ikomeye, gukura kw’imikaya bituruka ku myitozo n’ifunguro.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '10. هل يناسب النساء؟ (تأثير مذهل على المزاج والاكتئاب)',
      en: '10. Is Creatine suitable for women? (Impact on Mood & Depression)',
      rw: '10. Esese Creatine ikorera abagore?'
    },
    answer: {
      ar: 'نعم، الكرياتين مفيد وآمن للنساء أيضاً وقد يساعد في تحسين القوة والأداء لأداء المهام اليومية. بل ثبت حديثاً خلال دراسات علمية في يونيو 2026 أنه يساعد النساء على التخلص من 50% من حالات الاكتئاب بعد استخدام 7 أيام و 90% بعد استخدامه مدة 30 يوماً لأنه يدعم مراكز الطاقة في الخلية مما يدعم أيضاً طاقة العضلات والمخ بشكل قوي جداً.',
      en: 'Yes! Creatine is highly beneficial for women. Clinical trials published in June 2026 revealed that Creatine supplementation reduced depressive symptoms in women by 50% after just 7 days and by 90% after 30 days of consistent use by recharging cellular ATP energy in both muscle and brain tissue.',
      rw: 'Yego, Creatine ni nziza cyane ku bagore. Ubushakashatsi bwerekanye ko ifasha gukuraho ikibazo cy’agahinda gakabije (depression) ku rugero rwa 50% mu minsi 7 no ku rugero rwa 90% mu minsi 30.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '11. هل يناسب كبار السن؟',
      en: '11. Is Creatine suitable for seniors?',
      rw: '11. Esese Creatine ikorera abageze mu zabukuru?'
    },
    answer: {
      ar: 'نعم، تشير الأبحاث إلى أنه يساعد في الحفاظ على القوة والكتلة العضلية مع التقدم في العمر ويحمي من أعراض الشيخوخة المبكرة.',
      en: 'Yes. Studies show Creatine helps seniors preserve lean muscle mass, bone mineral density, and protects against age-related cognitive decline.',
      rw: 'Yego, ubushakashatsi bwerekana ko ifasha kugumana imikaya n’imbaraga mu zabukuru.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '12. هل يناسب النباتيين؟',
      en: '12. Is Creatine beneficial for vegetarians?',
      rw: '12. Esese Creatine ifasha abarya ibimera gusa?'
    },
    answer: {
      ar: 'نعم، بل قد يستفيد النباتيون أكثر لأن مخازن الكرياتين لديهم أقل لعدم تناول اللحوم الحمراء.',
      en: 'Yes! Vegetarians often see greater performance boosts because dietary sources of Creatine (red meat) are absent in their diet.',
      rw: 'Yego, abarya ibimera bagira inyungu nyinshi kuko bafite Creatine nkeyا mu mubiri.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '13. هل يجب إيقاف الكرياتين بعد فترة؟',
      en: '13. Should Creatine be cycled off?',
      rw: '13. Esese ngomba guhagarika Creatine nyuma y’igihe?'
    },
    answer: {
      ar: 'لا، لا توجد حاجة لدورات استخدام أو فترات توقف لدى الأشخاص الأصحاء.',
      en: 'No cycling is required. Long-term continuous use has been proven safe in healthy adults.',
      rw: 'Oya, ntabwo ari ngombwa guhagarika gufata Creatine ku bantu bazima.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '14. ماذا يحدث عند التوقف عن الكرياتين؟',
      en: '14. What happens when you stop taking Creatine?',
      rw: '14. Ni iki biba iyo uhagaritse Creatine?'
    },
    answer: {
      ar: 'تنخفض مخازن الكرياتين تدريجياً خلال عدة أسابيع إلى مستوياتها الطبيعية، وقد يقل الأداء قليلاً دون أي آثار انسحابية.',
      en: 'Muscle stores gradually return to baseline over several weeks. You may lose minor water weight, but no negative withdrawal effects occur.',
      rw: 'Ingufu z’imikaya zisubira ku kero gisanzwe mu myoshyo mike bito nta ngaruka mbi.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '15. هل الكرياتين يسبب احتباس الماء؟',
      en: '15. Does Creatine cause water retention under the skin?',
      rw: '15. Esese Creatine izana amazi mu ruhu?'
    },
    answer: {
      ar: 'يسحب الماء إلى داخل الخلايا العضلية، وليس إلى تحت الجلد، لذلك لا يعني بالضرورة مظهرًا منتفخًا بل مظهر عضلات ممتلئ وجذاب.',
      en: 'Creatine draws water into the muscle cell (intracellular hydration), not under the skin (subcutaneous), giving muscles a fuller, harder appearance.',
      rw: 'Oya, ijyana amazi imbere mu ngirabwimatsiko z’imikaya ntabwo ari munsi y’uruhu.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '16. هل يمكن تناوله أثناء التنشيف؟',
      en: '16. Can Creatine be taken during cutting/fat loss?',
      rw: '16. Esese Creatine ifatwa mu gihe cyo gukata ibinure?'
    },
    answer: {
      ar: 'نعم، بل يساعد في الحفاظ على القوة والكتلة العضلية أثناء خفض السعرات الحرارية.',
      en: 'Yes. Creatine is critical during a caloric deficit to preserve strength and prevent muscle protein breakdown.',
      rw: 'Yego, ifasha kurinda imikaya n’imbaraga mu gihe ugabanya ibiryo.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '17. هل الكرياتين يحرق الدهون؟',
      en: '17. Does Creatine burn fat directly?',
      rw: '17. Esese Creatine itwika ibinure?'
    },
    answer: {
      ar: 'لا يحرق الدهون مباشرة، لكنه يساعد على أداء تمارين أفضل مما يدعم برامج خسارة الدهون.',
      en: 'Not directly, but by increasing workout intensity and lean muscle mass, it increases overall caloric expenditure.',
      rw: 'Oya ntabwo itwika ibinure izuba, ariko ifasha gukora imyitozo irushaho gukomerera.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '18. هل يمكن خلط الكرياتين مع البروتين؟',
      en: '18. Can Creatine be mixed with protein powder?',
      rw: '18. Esese nshobora kuvanga Creatine na Proteyine?'
    },
    answer: {
      ar: 'نعم، يمكن تناوله مع البروتين أو أي مشروب آخر دون مشكلة.',
      en: 'Yes, combining Creatine with protein or carbohydrate shakes is completely safe and effective.',
      rw: 'Yego, ushobora kuyivanga na protein shaker cyangwa ikindi kinyobwa.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '19. هل الكافيين يقلل فعالية الكرياتين؟',
      en: '19. Does caffeine reduce Creatine effectiveness?',
      rw: '19. Esese Caffeine igabanya ubushobozi bwa Creatine?'
    },
    answer: {
      ar: 'تشير أحدث الأدلة إلى أن تناول كميات معتدلة من الكافيين لا يلغي فوائد الكرياتين لدى معظم الأشخاص.',
      en: 'Recent evidence indicates moderate caffeine consumption does not blunt Creatine ergogenic benefits in most athletes.',
      rw: 'Ubushakashatsi bushya bwerekana ko caffeine mu rugero ruringaniye itagabanya inyungu za Creatine.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '20. هل الكرياتين يرفع الكرياتينين في التحاليل؟',
      en: '20. Does Creatine elevate creatinine in blood tests?',
      rw: '20. Esese Creatine izamura creatinine mu bipimo?'
    },
    answer: {
      ar: 'قد ترتفع قيمة الكرياتينين قليلاً لأنها ناتج أيض للكرياتين، وهذا لا يعني بالضرورة وجود مشكلة في الكلى لدى الأصحاء.',
      en: 'Creatinine is a breakdown product of Creatine, so levels may appear slightly elevated on blood tests. This is a benign marker and does not indicate kidney damage in healthy individuals.',
      rw: 'Creatinine irashobora kuzamuka gake kuko ari metabolite ya Creatine, ibyo ntibivuga ko impyiko zirwaye.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '21. هل توجد أنواع أفضل من الكرياتين مونوهيدرات؟',
      en: '21. Are other forms superior to Creatine Monohydrate?',
      rw: '22. Esese hahari ubwoko bwiza burusha Monohydrate?'
    },
    answer: {
      ar: 'حتى الآن، الكرياتين مونوهيدرات هو الأكثر دراسة والأكثر دعمًا بالأدلة مقارنة بالأنواع الأخرى.',
      en: 'Creatine Monohydrate (especially Micronized) remains the gold standard with the highest clinical backing and bioavailability.',
      rw: 'Nta bwoko bwiza burusha Monohydrate mu ubushakashatsi n’inyungu.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '22. هل يحتاج الكرياتين إلى الإنسولين حتى يعمل؟',
      en: '22. Does Creatine require insulin to work?',
      rw: '22. Esese Creatine ikenera insulin?'
    },
    answer: {
      ar: 'لا، لكن تناوله مع وجبة تحتوي على كربوهيدرات أو بروتين قد يحسن امتصاصه وتخزينه بدرجة بسيطة.',
      en: 'No, but consuming it with carbs or protein can slightly enhance muscle uptake via insulin-mediated transporters.',
      rw: 'Oya, ariko kuyifata hamwe n’ibiryo birimo carbs ifasha kwinjira mu mikaya vuba.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '23. هل يساعد الكرياتين على التعافي بعد التمرين؟',
      en: '23. Does Creatine accelerate post-workout recovery?',
      rw: '23. Esese Creatine ifasha gukira vuba nyuma y’imyitozo?'
    },
    answer: {
      ar: 'يقلل تلف العضلات ويساعد على التعافي بشكل أفضل بعد التمارين المكثفة.',
      en: 'Yes, it reduces muscle cell damage and inflammation, speeding up cellular recovery.',
      rw: 'Yego, igabanya ibikomere mu mikaya ikafasha gukira vuba.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '24. هل يفقد الكرياتين فعاليته عند خلطه بالماء؟',
      en: '24. Does Creatine degrade if left in water?',
      rw: '24. Esese Creatine ita agaciro iyo igumye mu mazi?'
    },
    answer: {
      ar: 'إذا شُرب خلال فترة قصيرة فلا توجد مشكلة، لكن تركه مذابًا لساعات طويلة قد يؤدي إلى تحلله تدريجيًا إلى كرياتينين غير فعال.',
      en: 'If consumed within 1-2 hours of mixing, it remains stable. Leaving it in liquid for many hours eventually degrades it into inactive creatinine.',
      rw: 'Niba nywebe mu masaha make nta kibazo. Ariko kuyisiga mu mazi masaha menshi birayangiza.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '25. هل يؤثر الكرياتين على ضغط الدم؟',
      en: '25. Does Creatine affect blood pressure?',
      rw: '25. Esese Creatine ihindura umudundo w’amaraso?'
    },
    answer: {
      ar: 'لا توجد أدلة قوية على أنه يرفع ضغط الدم لدى الأشخاص الأصحاء.',
      en: 'There is no conclusive scientific evidence that Creatine raises blood pressure in healthy individuals.',
      rw: 'Nta gihامya kirahari kigaragaza ko izamura umudundo w’amaraso.'
    }
  },
  {
    category: 'creatine',
    question: {
      ar: '26. هل هناك فوائد جديدة للكرياتين غير بناء العضلات؟',
      en: '26. What are the newly discovered non-muscular benefits of Creatine?',
      rw: '26. Ni izihe nyungu nshya z’ubwonko n’ubuzima bwa Creatine?'
    },
    answer: {
      ar: 'تشير الدراسات الحديثة إلى وجود فوائد في دعم صحة الدماغ، والتعافي بعد الإصابات، والشيخوخة الصحية، وبعض الحالات العصبية.',
      en: 'Recent research highlights profound benefits in brain bioenergetics, cognitive endurance, concussion recovery, healthy aging, and neuroprotective support.',
      rw: 'Ubushakashatsi bushya bwerekana inyungu mu gukora neza kw’ubwonko, kwibuka, no kurinda ubwonko.'
    }
  },

  // ==========================================
  // 2. CITRULLINE FAQS (السيترولين - 20 FAQ)
  // ==========================================
  {
    category: 'citrulline',
    question: {
      ar: '1. ما هو السيترولين؟',
      en: '1. What is Citrulline?',
      rw: '1. Ni iki Citrulline?'
    },
    answer: {
      ar: 'السيترولين هو حمض أميني يحسن تدفق الدم و يوسع الاوعيه الدمويه عن طريق زيادة اكسيد النيتريك المسئول عن ذلك و يساعد على تحسين ضخ الدم للعضلات، وزيادة الأداء الرياضي، وتقليل الشعور بالإجهاد، وتحسين التعافي.',
      en: 'L-Citrulline is a non-essential amino acid that boosts Nitric Oxide (NO) production, dilating blood vessels, amplifying muscle pumps, boosting performance, and reducing fatigue.',
      rw: 'Citrulline ni amino acid izamura Nitric Oxide mu amaraso, ikagura imitsi y’amaraso ikongera ingufu no gukira vuba.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '2. هل السيترولين أفضل من الأرجينين؟',
      en: '2. Is Citrulline better than L-Arginine?',
      rw: '2. Esese Citrulline ni nziza kurusha Arginine?'
    },
    answer: {
      ar: 'السيترولين يرفع مستويات الأرجينين في الدم بكفاءة أعلى من تناول الأرجينين نفسه لأن الكبد لا يكسره بسرعة.',
      en: 'Yes. Citrulline bypasses splanchnic extraction in the liver, raising circulating plasma L-Arginine levels far more effectively than supplemental L-Arginine itself.',
      rw: 'Yego, Citrulline izamura arginine mu amaraso mu buryo bwiza cyane kurusha gufata Arginine yonyine.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '3. هل السيترولين يزيد ضخ العضلات (Pump)؟',
      en: '3. Does Citrulline increase muscle pumps?',
      rw: '3. Esese Citrulline izana muscle pump?'
    },
    answer: {
      ar: 'نعم، فهو من أكثر المكملات استخدامًا لتحسين الـ Pump أثناء التمارين.',
      en: 'Yes, it is one of the most effective and widely validated supplements for increasing muscle fullness and hyperemic pumps.',
      rw: 'Yego, ni imwe mu inyongeramirire zizwi cyانه mu kuzana pump mu imikaya.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '4. هل يساعد السيترولين على بناء العضلات؟',
      en: '4. Does Citrulline aid muscle growth?',
      rw: '4. Esese Citrulline ifasha kubaka imikaya?'
    },
    answer: {
      ar: 'يحسن الأداء ويسمح بتمرين أقوى، مما يدعم بناء العضلات مع الوقت.',
      en: 'By boosting blood flow and oxygen/nutrient delivery to training muscles, it enables harder workouts that lead to hypertrophy over time.',
      rw: 'Ifasha gukora imyitozo ikomeye, bikaganishا ku gukura kw’imikaya.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '5. هل يساعد على زيادة القوة؟',
      en: '5. Does Citrulline increase raw strength?',
      rw: '5. Esese Citrulline yongera imbaraga?'
    },
    answer: {
      ar: 'يزيد عدد التكرارات ويحسن الأداء في التمارين عالية الشدة، لكنه ليس مكملًا لزيادة القوة المباشرة مثل الكرياتين.',
      en: 'It enhances training volume and rep capacity under high intensity, though it is not a direct maximal strength enhancer like Creatine.',
      rw: "Yongera umubare w’incuro ukora imyitozo, ariko ntabwo ari imbaraga z’izuba nka Creatine."
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '6. ما أفضل وقت لتناول السيترولين؟',
      en: '6. What is the best time to take Citrulline?',
      rw: '6. Ni ryari igihe cyiza cyo gufata Citrulline?'
    },
    answer: {
      ar: 'يفضل تناوله قبل التمرين بحوالي 30 إلى 60 دقيقة.',
      en: 'The optimal window is 30-60 minutes prior to physical training.',
      rw: 'Igihe cyiza ni iminota 30 kugera 60 mbere yo gukora imyitozo.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '7. هل يؤخذ في أيام الراحة؟ (فائدة خاصة للمتزوجين)',
      en: '7. Should Citrulline be taken on rest days? (Benefits for Married Couples)',
      rw: '7. Esese Citrulline ifatwa mu minsi y’ikiruhuko?'
    },
    answer: {
      ar: 'ليس ضروريًا لمعظم الأشخاص في أيام الراحة الرياضية، لكن يكون مفيدًا لكثير من المتزوجين في تحسين الدورة الدموية والعلاقة الزوجية.',
      en: 'It is not mandatory on workout rest days, but many individuals and couples consume it daily to support peripheral vascular blood flow and intimate stamina.',
      rw: 'Ntabwo ari ngombwa ku myitozo, ariko ifasha ku gutembera kw’amaraso no ku bashakanye.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '8. ما الجرعة المناسبة؟',
      en: '8. What is the effective dosage of Citrulline?',
      rw: '8. Ni iyihe ngano iboneye ya Citrulline?'
    },
    answer: {
      ar: 'عادةً 6–8 جم من L-Citrulline الصافي أو 8–10 جم من Citrulline Malate قبل التمرين.',
      en: '6–8g of pure L-Citrulline or 8–10g of Citrulline Malate pre-workout.',
      rw: '6–8g za L-Citrulline cyangwa 8–10g za Citrulline Malate mbere y’imyitozo.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '9. هل يمكن تناوله مع الكرياتين؟',
      en: '9. Can Citrulline be combined with Creatine?',
      rw: '9. Esese Citrulline yavangwa na Creatine?'
    },
    answer: {
      ar: 'نعم، ويعد من أفضل التركيبات لتحسين الأداء والقوة وضخ الدم.',
      en: 'Yes! Combining Creatine (ATP power) and Citrulline (Nitric Oxide hyperemia) creates a premier performance stack.',
      rw: 'Yego, ni umuvango mwiza cyane wo kongera ingufu n’amaraso.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '10. هل يمكن تناوله مع الكافيين؟',
      en: '10. Can Citrulline be taken with Caffeine?',
      rw: '10. Esese Citrulline yavangwa na Caffeine?'
    },
    answer: {
      ar: 'نعم، ويستخدم كثيرًا مع الكافيين في مكملات Pre-Workout.',
      en: 'Yes, Citrulline and Caffeine are the foundational synergy in pre-workout formulations.',
      rw: 'Yego, bikoreshwa cyane muri pre-workout formulations.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '11. هل يناسب النساء؟',
      en: '11. Is Citrulline suitable for women?',
      rw: '11. Esese Citrulline ikorera abagore?'
    },
    answer: {
      ar: 'نعم، فوائده لا تقتصر على الرجال.',
      en: 'Yes, female athletes experience equal improvements in blood flow, endurance, and recovery.',
      rw: 'Yego, inyungu zayo zikorera abagabo n’abagore.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '12. هل يناسب كبار السن؟',
      en: '12. Is Citrulline suitable for seniors?',
      rw: '12. Esese Citrulline ikorera abageze mu zabukuru?'
    },
    answer: {
      ar: 'يساعد في تحسين تدفق الدم والأداء البدني لدى كبار السن. إلا إذا كنت تتناول أدوية الضغط والسيولة يجب مراجعة الطبيب الخاص بك.',
      en: 'It improves vascular endothelial health and stamina in older adults. However, if taking blood pressure or anticoagulant medication, consult your doctor.',
      rw: 'Ifasha gutembera kw’amaraso mu zabukuru. Ariko abafata imiti y’amaraso bagomba kubaza muganga.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '13. هل يساعد على تقليل إجهاد العضلات؟',
      en: '13. Does Citrulline reduce muscle soreness (DOMS)?',
      rw: '13. Esese Citrulline igabanya ububabare mu mikaya?'
    },
    answer: {
      ar: 'يقلل الإحساس بالإجهاد بعد التمارين المكثفة.',
      en: 'Yes, studies show Citrulline significantly reduces post-exercise DOMS by clearing lactic acid and ammonia.',
      rw: 'Yego, igabanya ububabare n’umunaniro nyuma y’imyitozo.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '14. هل يساعد على تحسين التحمل؟',
      en: '14. Does Citrulline boost endurance?',
      rw: '14. Esese Citrulline yongera endurance?'
    },
    answer: {
      ar: 'نعم، خاصة في التمارين التي تعتمد على التكرارات أو الجهد المستمر.',
      en: 'Yes, by increasing aerobic energy production and reducing oxygen cost during high-volume sets.',
      rw: 'Yego, cyane cyانه mu myitozo ifite amatsinda menshi.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '15. هل يخفض ضغط الدم؟',
      en: '15. Does Citrulline lower blood pressure?',
      rw: '15. Esese Citrulline igabanya umudundo w’amaraso?'
    },
    answer: {
      ar: 'قد يساعد على خفض ضغط الدم بشكل طفيف لدى بعض الأشخاص بسبب زيادة إنتاج أكسيد النيتريك.',
      en: 'It may slightly reduce resting arterial blood pressure due to Nitric Oxide-induced vasodilation.',
      rw: 'Iragabanya gake umudundo w’amaraso kuko igura imitsi.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '16. هل يمكن تناوله على معدة فارغة؟',
      en: '16. Can Citrulline be taken on an empty stomach?',
      rw: '16. Esese Citrulline ifatwa nta kintu kirimo mu nda?'
    },
    answer: {
      ar: 'نعم، ومعظم الأشخاص يتحملونه جيدًا، لكن يمكن تناوله مع وجبة إذا سبب انزعاجًا بالمعدة.',
      en: 'Yes, it is well-tolerated on an empty stomach by most individuals.',
      rw: 'Yego, abantu benshi bakira neza na pre-workout ku nda irimo ubusa.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '17. هل يمكن استخدامه يومياً؟',
      en: '17. Can Citrulline be consumed daily?',
      rw: '17. Esese Citrulline ifatwa buri munsi?'
    },
    answer: {
      ar: 'نعم، يمكن استخدامه يوميًا إذا كان الهدف دعم إنتاج أكسيد النيتريك أو تحسين الأداء.',
      en: 'Yes, daily consumption is completely safe for sustained vascular and endurance support.',
      rw: 'Yego, gufata Citrulline buri munsi ni byiza k’ubuzima bwa vascular.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '18. هل السيترولين أفضل قبل التمرين أم بعده؟',
      en: '18. Is Citrulline better pre-workout or post-workout?',
      rw: '18. Esese Citrulline ni nziza mbere cyangwa nyuma y’imyitozo?'
    },
    answer: {
      ar: 'قبل التمرين هو التوقيت الأفضل لتحقيق أقصى فائدة.',
      en: 'Pre-workout (30-60 min prior) is the definitive window to maximize intra-workout nitric oxide levels.',
      rw: 'Mbere y’imyitozo ni igihe cyiza cyo kubona inyungu zose.'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '19. هل يحتاج إلى مرحلة تحميل؟',
      en: '19. Does Citrulline require a loading phase?',
      rw: '19. Esese Citrulline ikenera loading phase?'
    },
    answer: {
      ar: 'لا، لا يحتاج إلى أي مرحلة تحميل مثل الكرياتين.',
      en: 'No loading phase is needed. It works acutely from the very first dose.',
      rw: 'Oya, ntabwo ikenera loading phase, ikora ku munsi wa mber'
    }
  },
  {
    category: 'citrulline',
    question: {
      ar: '20. ما الجديد في أبحاث السيترولين؟',
      en: '20. What is new in Citrulline scientific research?',
      rw: '20. Ni iki gishya mu ubushakashatsi bwa Citrulline?'
    },
    answer: {
      ar: 'تشير الدراسات الحديثة إلى أن فوائده قد تمتد إلى دعم صحة الأوعية الدموية، وتحسين كفاءة التمارين، وتسريع التعافي، مع استمرار الأبحاث لدراسة دوره المحتمل في الشيخوخة الصحية وصحة القلب والأوعية الدموية.',
      en: 'Recent trials show Citrulline supports endothelial elasticity, arterial compliance, cardiac stroke volume, and healthy aging parameters.',
      rw: 'Ubushakashatsi bushya bwerekana inyungu zayo mu kurinda imitsi, gukira vuba, no kurinda umutima.'
    }
  },

  // ==========================================
  // 3. L-CARNITINE FAQS (إل-كارنيتين - 27 FAQ)
  // ==========================================
  {
    category: 'carnitine',
    question: {
      ar: '1. ما هو إل-كارنيتين؟',
      en: '1. What is L-Carnitine?',
      rw: '1. Ni iki L-Carnitine?'
    },
    answer: {
      ar: 'إل-كارنيتين مركب طبيعي يساعد على نقل الأحماض الدهنية إلى الميتوكوندريا داخل الخلايا مباشرة لإنتاج الطاقة.',
      en: 'L-Carnitine is a natural derivative that transports long-chain fatty acids directly into the cellular mitochondria to be oxidized for ATP energy.',
      rw: 'L-Carnitine ni inyongeramirire ijyana ibinure mu mitochondria kugirango bikorwemo ingufu.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '2. هل إل-كارنيتين يحرق الدهون؟',
      en: '2. Does L-Carnitine burn fat?',
      rw: '2. Esese L-Carnitine itwika ibinure?'
    },
    answer: {
      ar: 'يساعد الجسم على استخدام الدهون كمصدر رئيسي للطاقة أثناء الحركة والنشاط البدني.',
      en: 'It facilitates fat transport into mitochondria, enabling the body to utilize fat more efficiently as a energy fuel source.',
      rw: 'Ifasha umubiri gukoresha ibinure nka nkomoko y’ingufu.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '3. هل يمكنني خسارة الوزن باستخدام إل-كارنيتين فقط؟',
      en: '3. Can I lose weight with L-Carnitine alone?',
      rw: '3. Esese nshobora gutakaza ibiro nkoresheje L-Carnitine yonyine?'
    },
    answer: {
      ar: 'لا، لن تؤدي إل-كارنيتين وحده إلى خسارة الوزن دون نظام غذائي مناسب ونشاط بدني؛ للوصول لهدف معين في الجسد هو عبارة عن منظومة متكاملة أحد أهم عوامل هذه المنظومة هو إل-كارنيتين.',
      en: 'No. Weight loss requires a caloric deficit and training regime. L-Carnitine is a vital catalyst within a comprehensive lifestyle framework.',
      rw: 'Oya, kugaragaza ibiro bisaba ifunguro rigabanyije n’imyitozo. L-Carnitine ni kimwe mu bintu by’ingenzi.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '4. هل إل-كارنيتين مناسب للرجال والنساء؟',
      en: '4. Is L-Carnitine suitable for men and women?',
      rw: '4. Esese L-Carnitine ikorera abagabo n’abagore?'
    },
    answer: {
      ar: 'نعم، يمكن استخدامه لكلا الجنسين بأمان.',
      en: 'Yes, L-Carnitine is safe and effective for both men and women.',
      rw: 'Yego, L-Carnitine ni nziza ku bagabo n’abagore.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '5. ما أفضل وقت لتناول إل-كارنيتين؟',
      en: '5. What is the best time to take L-Carnitine?',
      rw: '5. Ni ryari igihe cyiza cyo gufata L-Carnitine?'
    },
    answer: {
      ar: 'يفضل قبل النشاط البدني بحوالي 30 إلى 60 دقيقة، أو مع وجبة تحتوي على كربوهيدرات لتحسين دخوله إلى العضلات.',
      en: '30-60 minutes before physical activity, or alongside a carb-containing meal to stimulate insulin-mediated intramuscular carnitine retention.',
      rw: 'Iminota 30-60 mbere y’imyitozo, cyangwa hamwe n’ibiryo birimo carbs.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '6. هل يجب تناوله في أيام الراحة؟',
      en: '6. Should L-Carnitine be taken on rest days?',
      rw: '6. Esese L-Carnitine ifatwa mu minsi y’ikiruhuko?'
    },
    answer: {
      ar: 'يمكن تناوله يومياً إذا كان الهدف رفع مستويات الكارنيتين في الجسم.',
      en: 'Yes, daily intake helps maintain elevated intramuscular carnitine pools over time.',
      rw: 'Yego, uyifashe buri munsi izamura urugero rwayo mu imikaya.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '7. ما الجرعة المناسبة؟ (إرشادات الضغط والعناية)',
      en: '7. What is the proper L-Carnitine dosage? (Hypertension considerations)',
      rw: '7. Ni iyihe ngano iboneye ya L-Carnitine?'
    },
    answer: {
      ar: 'تتراوح الجرعة الشائعة بين 1000 و2000 مجم يومياً، وقد تصل في بعض الدراسات إلى 3000 مجم حسب الحالة. ولأصحاب الضغط العالي والمبتدئين يفضل استخدام 500 مجم.',
      en: 'Standard clinical dosage is 1000–2000mg daily (up to 3000mg). For beginners or individuals with elevated blood pressure, starting with 500mg is recommended.',
      rw: 'Ingano isanzwe ni 1000–2000mg ku munsi. Ku bantu bafite hypertension, 500mg ni yo nziza k’utangira.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '8. هل الكبسولات أفضل أم السائل أم البودر؟',
      en: '8. Are Capsules, Liquid, or Powder better?',
      rw: '8. Esese Capsules, Liquide cyangwa Powder ni ibihe byiza?'
    },
    answer: {
      ar: 'لا يوجد فرق جوهري في الفعالية عند تساوي الجرعة، ويعتمد الاختيار على الراحة الشخصية.',
      en: 'There is no biological difference in efficacy provided the active milligram dose is identical. Choose based on personal convenience.',
      rw: 'Nta tandukaniro riri mu mukorere iyo ingano ingana.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '9. هل إل-كارنيتين يعطي طاقة مثل الكافيين؟',
      en: '9. Does L-Carnitine provide jitters or energy like Caffeine?',
      rw: '9. Esese L-Carnitine itanga ingufu nka Caffeine?'
    },
    answer: {
      ar: 'لا، فهو لا يعمل كمنبه ولا يمنح طاقة فورية أو خفقان للقلب.',
      en: 'No, L-Carnitine is not a central nervous system stimulant and does not cause jitters or heart racing.',
      rw: 'Oya, ntabwo ari stimulant, ntabwo itera kuguhamagara k’umutima.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '10. هل يمكن تناوله مع الكرياتين؟',
      en: '10. Can L-Carnitine be taken with Creatine?',
      rw: '10. Esese L-Carnitine yavangwa na Creatine?'
    },
    answer: {
      ar: 'نعم، ويمكن الجمع بينهما دون تعارض.',
      en: 'Yes, L-Carnitine and Creatine target different cellular energy pathways and complement each other perfectly.',
      rw: 'Yego, ushobora kuyifata hamwe na Creatine nta kibazo.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '11. هل يمكن تناوله مع البروتين؟',
      en: '11. Can L-Carnitine be taken with protein powder?',
      rw: '11. Esese yavangwa na Protein?'
    },
    answer: {
      ar: 'نعم، ولا توجد مشكلة في ذلك.',
      en: 'Yes, taking it alongside a protein shake is completely fine.',
      rw: 'Yego, nta kibazo kirimo.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '12. هل يمكن تناوله مع Pre-Workout؟',
      en: '12. Can it be combined with Pre-Workouts?',
      rw: '12. Esese yavangwa na Pre-Workout?'
    },
    answer: {
      ar: 'نعم، ويستخدم كثيرًا مع مكملات ما قبل التمرين.',
      en: 'Yes, it is often added to pre-workout routines to support endurance and fat metabolism.',
      rw: 'Yego, ikoreshwa cyane kumwe na pre-workout.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '13. هل يساعد على تحسين الأداء الرياضي؟',
      en: '13. Does L-Carnitine boost athletic performance?',
      rw: '13. Esese L-Carnitine izamura performance?'
    },
    answer: {
      ar: 'يساعد في تقليل التعب وتحسين التعافي، لكن ليس بقوة الكرياتين والسيترولين.',
      en: 'It aids fatigue resistance and muscle recovery, though its performance mechanisms differ from Creatine and Citrulline.',
      rw: 'Ifasha kugabanya umunaniro no gukira vuba.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '14. هل يساعد على بناء العضلات؟',
      en: '14. Does L-Carnitine build muscle?',
      rw: '14. Esese L-Carnitine ifasha kubaka imikaya?'
    },
    answer: {
      ar: 'يدعم جودة التدريب والتعافي مما يساعد على بناء العضلات بشكل غير مباشر.',
      en: 'It supports muscle building indirectly by increasing androgen receptor density and accelerating post-exercise recovery.',
      rw: 'Ifasha kubaka imikaya mu buryo buziguye binyuze mu gukira vuba.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '15. هل يساعد في تقليل ألم العضلات بعد التمرين؟',
      en: '15. Does L-Carnitine reduce post-workout soreness?',
      rw: '15. Esese igabanya ububabare mu mikaya?'
    },
    answer: {
      ar: 'يقلل تلف العضلات ويساعد على التعافي.',
      en: 'Yes, L-Carnitine L-Tartrate is proven to diminish micro-tears and muscle soreness following heavy squats and lifts.',
      rw: 'Yego, igabanya gukomereka kw’imikaya nyuma y’imyitozo.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '16. هل إل-كارنيتين مناسب أثناء التنشيف؟',
      en: '16. Is L-Carnitine suitable during cutting?',
      rw: '16. Esese L-Carnitine ni nziza mu gukata ibinure?'
    },
    answer: {
      ar: 'نعم، يستخدمه الكثيرون خلال فترات خفض الدهون.',
      en: 'Yes, it is widely utilized during cutting cycles to preserve muscle mass while oxidizing body fat.',
      rw: 'Yego, ikoreshwa cyane mu gihe cyo gukata ibinure.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '17. هل يسبب احتباس الماء؟',
      en: '17. Does L-Carnitine cause water retention?',
      rw: '17. Esese L-Carnitine izana amazi?'
    },
    answer: {
      ar: 'لا، لا يسبب احتباس الماء.',
      en: 'No, L-Carnitine causes zero subcutaneous water retention.',
      rw: 'Oya, ntabwo izana amazi.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '18. هل له آثار جانبية؟',
      en: '18. Does L-Carnitine have side effects?',
      rw: '18. Esese L-Carnitine ifite ingaruka mbi?'
    },
    answer: {
      ar: 'آمن عند الجرعات الموصى بها.',
      en: 'L-Carnitine has an outstanding safety record at standard recommended daily dosages.',
      rw: 'Ni inziza cyane mu ngano isabwa.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '19. هل يسبب رائحة جسم تشبه السمك؟',
      en: '19. Does L-Carnitine cause a fishy body odor?',
      rw: '19. Esese L-Carnitine itera impumuro y’ifi?'
    },
    answer: {
      ar: 'قد يحدث ذلك عند بعض الأشخاص مع الجرعات العالية جداً (أكثر من 3000 مجم) بسبب إنتاج مادة تسمى TMA، لكنه ليس شائعًا بالجرعات العادية.',
      en: 'Only extreme excessive doses (>3000-4000mg) can cause gut bacteria to convert excess carnitine into TMA, causing a rare fishy odor. Normal doses do not.',
      rw: 'Ibyo biba iyo ufashe ingano ikabije cyane (>3000mg). Mu ngano isanzwe ntibiba.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '20. هل النباتيون يستفيدون منه أكثر؟',
      en: '20. Do vegetarians benefit more from L-Carnitine?',
      rw: '20. Esese abarya ibimera hyungukiramo cyane?'
    },
    answer: {
      ar: 'قد يستفيد بعض النباتيين أكثر لأن تناولهم الغذائي للكارنيتين يكون أقل من غيرهم.',
      en: 'Yes, vegetarians typically possess lower baseline muscle carnitine levels due to the absence of dietary meat sources.',
      rw: 'Yego, abarya ibimera bafite L-Carnitine nkeya mu umubiri.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '21. هل إل-كارنيتين يرفع معدل الحرق أثناء الراحة؟',
      en: '21. Does L-Carnitine raise resting metabolic rate (RMR)?',
      rw: '21. Esese L-Carnitine izamura RMR?'
    },
    answer: {
      ar: 'لا توجد أدلة قوية على أنه يرفع معدل الأيض بشكل ملحوظ أثناء الراحة بدون حركة.',
      en: 'No strong evidence indicates L-Carnitine elevates basal metabolic rate while at complete rest.',
      rw: 'Nta gihamya kigaragaza ko izamura BMR mu ikiruhuko.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '22. هل يعمل من أول جرعة؟',
      en: '22. Does L-Carnitine work from the first dose?',
      rw: '22. Esese L-Carnitine ikora ku munsi wa mbele?'
    },
    answer: {
      ar: 'لا، فوائده المحتملة تظهر مع الاستخدام المنتظم وليست فورية.',
      en: 'No, intramuscular carnitine accumulation requires consistent daily dosing over a few weeks.',
      rw: 'Oya, inyungu zayo ziboneka mu gufata buri munsi mu gihe gito.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '23. هل يجب استخدامه في دورات ثم التوقف؟',
      en: '23. Does L-Carnitine need to be cycled?',
      rw: '23. Esese ngomba guhagarika L-Carnitine?'
    },
    answer: {
      ar: 'لا، لا توجد حاجة علمية لذلك لدى الأشخاص الأصحاء.',
      en: 'No cycling is required for healthy individuals.',
      rw: 'Oya, ntabwo ari ngombwa guhagarika gufata L-Carnitine.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '24. هل مرضى القلب يمكنهم استخدامه؟',
      en: '24. Can cardiac patients use L-Carnitine?',
      rw: '24. Esese abarwayي b’umutima bashobora gufata L-Carnitine?'
    },
    answer: {
      ar: 'قد يكون له استخدامات طبية في بعض الحالات، لكن يجب أن يكون ذلك تحت إشراف الطبيب.',
      en: 'It is used therapeutically in cardiological clinical settings, but cardiac patients must consume it strictly under medical supervision.',
      rw: 'Irafite inyungu mu biva mu umutima, ariko bisaba kwemerwa na muganga.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '25. هل إل-كارنيتين يؤثر على الخصوبة؟',
      en: '25. Does L-Carnitine impact male fertility?',
      rw: '25. Esese L-Carnitine ifasha ku buvuzi bwa fertility?'
    },
    answer: {
      ar: 'تشير الدراسات إلى أنه قد يساعد في تحسين مؤشرات خصوبة الرجال (حركة وطاقة الحيوانات المنوية).',
      en: 'Multiple studies confirm L-Carnitine enhances sperm motility and mitochondrial bioenergetics, improving male fertility profiles.',
      rw: 'Ubushakashatsi bwerekana ko ifasha mu gukora neza kw’amasohoro mu abagabo.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '26. هل جميع أنواع الكارنيتين متشابهة؟',
      en: '26. Are all forms of Carnitine identical?',
      rw: '26. Esese amoko yose ya Carnitine arangana?'
    },
    answer: {
      ar: 'لا، فهناك L-Carnitine و Acetyl L-Carnitine و L-Carnitine L-Tartrate، ولكل منها استخدامات بحثية مختلفة.',
      en: 'No. L-Carnitine L-Tartrate targets physical performance and recovery, Acetyl L-Carnitine (ALCAR) crosses the blood-brain barrier for cognition, and Propionyl L-Carnitine supports vascular pump.',
      rw: 'Oya, hahari L-Tartrate y’imyitozo na ALCAR y’ubwonko.'
    }
  },
  {
    category: 'carnitine',
    question: {
      ar: '27. هل Acetyl L-Carnitine أفضل للرياضة؟',
      en: '27. Is Acetyl L-Carnitine (ALCAR) superior for athletic performance?',
      rw: '27. Esese Acetyl L-Carnitine ni nziza ku myitozo?'
    },
    answer: {
      ar: 'ليس بالضرورة، فهو يُدرس أكثر لدعم وظائف الدماغ والأعصاب، بينما يستخدم L-Carnitine L-Tartrate بشكل أكبر في مجال الأداء الرياضي والتعافي.',
      en: 'Not necessarily. ALCAR is studied primarily for neuroprotective and cognitive enhancement, whereas L-Carnitine L-Tartrate is the preferred form for physical sports recovery.',
      rw: 'Oya, ALCAR ikorera ubwonko cyane, L-Tartrate ikorera imikaya n’imyitozo.'
    }
  },

  // ==========================================
  // 4. VITAMIN B-COMPLEX FAQS (فيتامين B-Complex - 24 FAQ)
  // ==========================================
  {
    category: 'b-complex',
    question: {
      ar: '1. ما هو فيتامين B-Complex؟',
      en: '1. What is Vitamin B-Complex?',
      rw: '1. Ni iki Vitamin B-Complex?'
    },
    answer: {
      ar: 'هو مكمل يحتوي على مجموعة فيتامينات ب الأساسية التي تساعد الجسم في إنتاج الطاقة، ودعم الأعصاب (فإذا أردت أعصاب من حديد عليك به)، وتكوين خلايا الدم الحمراء.',
      en: 'Vitamin B-Complex contains all 8 essential water-soluble B vitamins that catalyze cellular energy metabolism, fortify the central nervous system, and produce red blood cells.',
      rw: 'B-Complex irimo vitamini B zose zifasha gukora ingufu, gukomeza imitsi y’ubwonko, no gukora amaraso.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '2. ما هي فيتامينات ب الموجودة في B-Complex؟',
      en: '2. Which B-vitamins are included in B-Complex?',
      rw: '2. Ni zihe vitamini ziri muli B-Complex?'
    },
    answer: {
      ar: 'غالبًا يحتوي على B1 (ثيامين)، B2 (ريبوفلافين)، B3 (نياسين)، B5 (بانتوثينيك)، B6 (بيريدوكسين)، B7 (بيوتين)، B9 (فوليك أسيد)، و B12 (كوبالامين).',
      en: 'It includes B1 (Thiamine), B2 (Riboflavin), B3 (Niacin), B5 (Pantothenic Acid), B6 (Pyridoxine), B7 (Biotin), B9 (Folate), and B12 (Cobalamin).',
      rw: 'Irimo B1, B2, B3, B5, B6, B7, B9, na B12.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '3. ما فوائد B-Complex؟',
      en: '3. What are the key benefits of Vitamin B-Complex?',
      rw: '3. Ni zihe nyungu za B-Complex?'
    },
    answer: {
      ar: 'يساعد في دعم إنتاج الطاقة، وصحة الجهاز العصبي، والدماغ، والجلد، والشعر، وتكوين خلايا الدم الحمراء.',
      en: 'Supports cellular ATP synthesis, nervous system transmission, cognitive focus, skin health, and hemoglobin formation.',
      rw: 'Ifasha gukora ingufu, ubuzima bwa nervs, uruhu, n’amaraso.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '4. هل B-Complex يزيد الطاقة؟',
      en: '4. Does B-Complex boost cellular energy?',
      rw: '4. Esese B-Complex yongera ingufu?'
    },
    answer: {
      ar: 'يساعد الجسم على إنتاج الطاقة الفعلية من الطعام عبر تحفيز دورة كريبس.',
      en: 'Yes, B-vitamins act as essential co-enzymes converting carbohydrates, fats, and proteins into usable cellular ATP.',
      rw: 'Yego, ifasha umubiri gukora ingufu zivuye mu ibiryo.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '5. هل B-Complex يعالج الإرهاق؟',
      en: '5. Does B-Complex treat physical fatigue?',
      rw: '5. Esese B-Complex ikiza umunaniro?'
    },
    answer: {
      ar: 'نعم و بقوة.',
      en: 'Yes, particularly when fatigue stems from deficiency, heavy exercise, or chronic stress.',
      rw: 'Yego, ikiza umunaniro mu buryo bukomeye.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '6. هل يساعد على تقوية الأعصاب؟',
      en: '6. Does B-Complex strengthen nerves?',
      rw: '6. Esese B-Complex ikomeza imitsi (nerves)?'
    },
    answer: {
      ar: 'نعم، خاصة فيتامينات B1 و B6 و B12 التي تلعب دورًا مهمًا في صحة حماية الأعصاب وخلق أعصاب من حديد.',
      en: 'Yes, specifically B1, B6, and B12 which synthesise myelin sheath protection around peripheral nerve fibers.',
      rw: 'Yego, B1, B6, na B12 zikomeza myelin sheath y’imitsi.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '7. هل B-Complex يزيد الشهية؟',
      en: '7. Does B-Complex stimulate appetite?',
      rw: '7. Esese B-Complex izamura apeti?'
    },
    answer: {
      ar: 'قد يلاحظ بعض الأشخاص تحسنًا في الشهية إذا كانوا يعانون من نقص في فيتامينات ب، لكنه لا يزيد الشهية عند الجميع.',
      en: 'It normalizes appetite in individuals with a pre-existing B-vitamin deficiency, but does not cause unnatural hunger.',
      rw: 'Igarura apeti mu buryo busanzwe niba wari ufite deficiency.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '8. هل يحسن صحة البشرة؟',
      en: '8. Does B-Complex improve skin health?',
      rw: '8. Esese B-Complex ifasha uruhu?'
    },
    answer: {
      ar: 'يدعم صحة الجلد ورطوبته وحمايته من الالتهابات.',
      en: 'Yes, B-vitamins promote rapid skin cell turnover and collagen integrity.',
      rw: 'Yego, ifasha kugarura ubuyanja bw’uruhu.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '9. هل يقوي الأظافر؟',
      en: '9. Does B-Complex strengthen brittle nails?',
      rw: '9. Esese B-Complex ikomeza inzara?'
    },
    answer: {
      ar: 'نقص البيوتين (B7) يؤدي إلى أظافر بالية، لذلك وجوده يدعم صحة الأظافر ويمنع تكسرها.',
      en: 'Yes, Biotin (B7) is essential for keratin structure. Deficiency leads to brittle, peeling nails.',
      rw: 'Yego, Biotin (B7) ikomeza inzara ikazirinda gucika.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '10. هل يمكن تناوله يومياً؟',
      en: '10. Can B-Complex be consumed daily?',
      rw: '10. Esese B-Complex ifatwa buri munsi?'
    },
    answer: {
      ar: 'نعم، عند الالتزام بالجرعات الموصى بها.',
      en: 'Yes, daily supplementation is recommended because water-soluble B vitamins are not stored in large amounts.',
      rw: 'Yego, ifatwa buri munsi kuko ari water-soluble.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '11. ما أفضل وقت لتناول B-Complex؟',
      en: '11. What is the best time to take B-Complex?',
      rw: '11. Ni ryari igihe cyiza cyo gufata B-Complex?'
    },
    answer: {
      ar: 'يفضل صباحًا أو مع وجبة الإفطار لأنه قد يمنح بعض الأشخاص شعورًا بالنشاط.',
      en: 'In the morning with breakfast to optimize daytime cellular energy release.',
      rw: 'Mugitondo hamwe n’ifunguro rya mugitondo.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '12. هل يؤخذ على معدة فارغة؟',
      en: '12. Can it be taken on an empty stomach?',
      rw: '12. Esese B-Complex ifatwa nta kintu kirimo mu nda?'
    },
    answer: {
      ar: 'يفضل تناوله مع الطعام لتقليل احتمال اضطراب المعدة.',
      en: 'Taking it with food reduces any chance of minor stomach upset or nausea.',
      rw: 'Ni byiza kuyifata hamwe n’ibiryo.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '13. هل يمكن تناوله مساءً؟',
      en: '13. Can B-Complex be taken at night?',
      rw: '13. Esese B-Complex ifatwa ninyuma?'
    },
    answer: {
      ar: 'يمكن ذلك، لكن بعض الأشخاص يفضلون تناوله صباحًا لأنه قد يزيد الإحساس بالنشاط.',
      en: 'It is better taken in the morning as its metabolic energizing effect might interfere with sleep in sensitive users.',
      rw: 'Mugitondo ni byiza kuko itanga ingufu ikaba yatuma utasinzira ninyuma.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '14. هل يمكن تناوله مع القهوة؟',
      en: '14. Can it be taken with coffee?',
      rw: '14. Esese yavangwa n’ikawa?'
    },
    answer: {
      ar: 'نعم، لكن يفضل عدم تناوله مع القهوة مباشرة، لأن القهوة قد تقلل امتصاص بعض العناصر الغذائية عند بعض الأشخاص.',
      en: 'Separate B-Complex and coffee by 30-60 minutes, as caffeine can increase excretion of water-soluble vitamins.',
      rw: 'Tandukanya kahawa na B-Complex iminota 30-60.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '15. هل يناسب الرياضيين؟',
      en: '15. Is B-Complex vital for athletes?',
      rw: '15. Esese B-Complex ikorera abasiporoteyi?'
    },
    answer: {
      ar: 'بل هو من أهم الأشياء قبل ممارسة الرياضة لدعم الأيض العصبي والعضلي.',
      en: 'It is essential for athletes due to higher metabolic turnover and carbohydrate oxidation rates.',
      rw: 'Ni kimwe mu bintu by’ingenzi cyane ku basiporoteyi.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '16. هل يناسب كبار السن؟',
      en: '16. Is B-Complex recommended for seniors?',
      rw: '16. Esese B-Complex ikorera abageze mu zabukuru?'
    },
    answer: {
      ar: 'نعم، وخاصة لأن امتصاص فيتامين B12 قد يقل مع التقدم في العمر.',
      en: 'Yes, stomach intrinsic factor decreases with age, making B12 absorption crucial for older adults.',
      rw: 'Yego, cyane cyane B12 iratagira mumubiri mu zabukuru.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '17. هل يناسب النباتيين؟',
      en: '17. Is B-Complex essential for vegans?',
      rw: '17. Esese B-Complex ikorera abarya ibimera?'
    },
    answer: {
      ar: 'نعم، وقد يكون مفيدًا بشكل خاص لأنهم أكثر عرضة لنقص فيتامين B12.',
      en: 'Yes, strictly necessary for vegans because Vitamin B12 occurs naturally only in animal foods.',
      rw: 'Yego, ni ngombwa kuko B12 iboneka mu nyama gusa.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '18. هل يغير لون البول؟',
      en: '18. Does B-Complex turn urine neon yellow?',
      rw: '18. Esese B-Complex ihindura ibara ry’inkari?'
    },
    answer: {
      ar: 'نعم، قد يصبح البول أصفر فاقع بسبب فيتامين B2 (الريبوفلافين)، وهذا طبيعي وآمن تمامًا.',
      en: 'Yes, excess Riboflavin (B2) is excreted in urine giving it a bright fluorescent yellow color. This is completely harmless and normal.',
      rw: 'Yego, Vitamin B2 ihindura ibara ry’inkari umuhondo, ni byiza nta kibazo.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '19. هل يمكن أن يسبب الأرق؟',
      en: '19. Can B-Complex cause insomnia?',
      rw: '19. Esese B-Complex itera kubura ibito?'
    },
    answer: {
      ar: 'قد يحدث لدى بعض الأشخاص إذا تم تناوله في وقت متأخر من اليوم.',
      en: 'Only if taken late in the evening due to its energizing metabolic stimulation.',
      rw: 'Biba iyo uyifashe ninyuma cyane.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '20. هل له آثار جانبية؟',
      en: '20. Does B-Complex have adverse side effects?',
      rw: '20. Esese B-Complex ifite ingaruka mbi?'
    },
    answer: {
      ar: 'آمن لأن الجرعات الزائدة تخرج تلقائيًا مع البول.',
      en: 'Extremely safe. Being water-soluble, excess amounts are flushed harmlessly in urine.',
      rw: 'Ni inziza kuko ibisagutse bisohoka mu inkari.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '21. هل يمكن تناول B-Complex مع فيتامين C؟',
      en: '21. Can B-Complex be taken with Vitamin C?',
      rw: '21. Esese B-Complex yavangwa na Vitamin C?'
    },
    answer: {
      ar: 'نعم، ولا توجد مشكلة في تناولهما معًا.',
      en: 'Yes, both are water-soluble vitamins and work synergistically.',
      rw: 'Yego, zombi ni water-soluble.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '22. هل يمكن تناوله مع المغنيسيوم والزنك؟',
      en: '22. Can B-Complex be taken with Magnesium and Zinc?',
      rw: '22. Esese B-Complex yavangwa na Magnesium na Zinc?'
    },
    answer: {
      ar: 'نعم، وغالبًا ما تُستخدم هذه المكملات معًا لدعم الاستشفاء والأعصاب.',
      en: 'Yes, this combination optimizes neuromuscular health and recovery.',
      rw: 'Yego, uyu muvango ukora neza k’ubuzima bwa nerves.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '23. هل B-Complex يعوض النظام الغذائي السيئ؟',
      en: '23. Does B-Complex compensate for a poor diet?',
      rw: '23. Esese B-Complex isimbura ifunguro ribi?'
    },
    answer: {
      ar: 'ربما يساعد، ولكن ليس بديلًا عن تناول غذاء متوازن.',
      en: 'It covers nutritional gaps, but cannot replace whole-food nutrient density.',
      rw: 'Ifasha kuzuza ibibura ariko ntisimbura ifunguro ryiza.'
    }
  },
  {
    category: 'b-complex',
    question: {
      ar: '24. هل كل منتجات B-Complex متشابهة؟',
      en: '24. Are all B-Complex supplements identical?',
      rw: '24. Esese B-Complex zose zirangana?'
    },
    answer: {
      ar: 'لا، تختلف في نوع الفيتامينات، وتركيزها، وصورتها الكيميائية، وجودة المواد الخام.',
      en: 'No. Bioactive methylated forms (e.g. Methylcobalamin, L-Methylfolate) feature vastly superior absorption compared to cheap synthetic forms.',
      rw: 'Oya, ziratandukanye mu bwiza n’uburyo zikoramo.'
    }
  },

  // ==========================================
  // 5. VITAMIN C + ZINC FAQS (فيتامين C + الزنك - 24 FAQ)
  // ==========================================
  {
    category: 'c-zinc',
    question: {
      ar: '1. ما هو فيتامين C + Zinc؟',
      en: '1. What is Vitamin C + Zinc?',
      rw: '1. Ni iki Vitamin C + Zinc?'
    },
    answer: {
      ar: 'هو مكمل يجمع بين فيتامين C والزنك لدعم المناعة، والمساعدة في التئام الجروح، وحماية الخلايا من الإجهاد التأكسدي.',
      en: 'A dual-action immune formulation combining ascorbic acid and elemental zinc to defend against oxidative stress, enhance collagen, and speed healing.',
      rw: 'Ni inyongeramirire ivanga Vitamin C na Zinc ifasha ubudahangarwa bwayo n’uburyo bw’ingirabwimatsiko.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '2. ما فوائد فيتامين C + Zinc؟',
      en: '2. What are the key benefits of Vitamin C + Zinc?',
      rw: '2. Ni zihe nyungu za Vitamin C + Zinc?'
    },
    answer: {
      ar: 'يساعد في دعم جهاز المناعة، وصحة الجلد، وإنتاج الكولاجين، والتئام الجروح، وحماية الخلايا من الأكسدة.',
      en: 'Fortifies white blood cells, boosts dermal collagen synthesis, accelerates wound repair, and neutralizes free radicals.',
      rw: 'Ifasha ubudahangarwa, uruhu, gukora collagen, no gukira ibikomere.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '3. هل C + Zinc يمنع الإصابة بنزلات البرد؟',
      en: '3. Does C + Zinc prevent colds?',
      rw: '3. Esese C + Zinc irinda ibicurane?'
    },
    answer: {
      ar: 'يقي من نزلات البرد ويقلل مدتها وشدتها إذا تم تناوله بانتظام.',
      en: 'Regular intake significantly reduces cold incidence, duration, and symptom severity.',
      rw: 'Ifasha kugabanya ubukana n’iminsi y’ibicurane iyo ifatwa kenshi.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '4. هل يعالج الإنفلونزا؟',
      en: '4. Does C + Zinc cure the flu virus?',
      rw: '4. Esese ikiza viresi ya flu?'
    },
    answer: {
      ar: 'لا، ليس علاجًا للإنفلونزا أو الفيروسات، لكنه يدعم وظائف الجهاز المناعي للتعافي.',
      en: 'It is not an antiviral medication, but empowers immune cells to fight infections effectively.',
      rw: 'Oya, ntabwo ari umuti wa viresi, ariko ikomeza ubudahangarwa.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '5. هل يزيد المناعة؟',
      en: '5. Does C + Zinc strengthen immunity?',
      rw: '5. Esese yongera ubudahangarwa?'
    },
    answer: {
      ar: 'يساعد على دعم الوظائف الطبيعية للمناعة والاستجابة الدفاعية.',
      en: 'Yes, Vitamin C stimulates neutrophil activity while Zinc regulates T-lymphocyte function.',
      rw: 'Yego, ikomeza abasirikare b’umubiri.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '6. هل يساعد على التئام الجروح؟',
      en: '6. Does C + Zinc promote wound healing?',
      rw: '6. Esese C + Zinc ifasha gukira ibikomere?'
    },
    answer: {
      ar: 'نعم، لأن فيتامين C ضروري لإنتاج الكولاجين، والزنك يشارك في إصلاح الأنسجة.',
      en: 'Yes. Vitamin C is required for hydroxylation in collagen synthesis, and Zinc is critical for cell division and tissue repair.',
      rw: 'Yego, C ikora collagen, Zinc ikagora uduce tw’umubiri.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '7. هل يساعد في صحة البشرة؟',
      en: '7. Does it improve skin clarity and health?',
      rw: '7. Esese C + Zinc ifasha uruhu?'
    },
    answer: {
      ar: 'نعم، فيتامين C يدعم تكوين الكولاجين، والزنك يساهم في الحفاظ على صحة الجلد.',
      en: 'Yes, protecting skin cells from ultraviolet damage and regulating sebum activity.',
      rw: 'Yego, zirinda uruhu kandi zikaza kurema kwarwo.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '8. هل يقلل حب الشباب؟',
      en: '8. Does Zinc reduce acne lesions?',
      rw: '8. Esese Zinc igabanya ibisebe zv’uruhu (acne)?'
    },
    answer: {
      ar: 'قد يساعد الزنك الأشخاص المصابين بحب الشباب لخصائصه المضادة للالتهاب.',
      en: 'Zinc features anti-inflammatory properties that noticeably reduce inflammatory acne breakouts.',
      rw: 'Zinc ifite ubushobozi bwo kugabanya ibisebe by’uruhu.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '9. هل يساعد على نمو الشعر؟',
      en: '9. Does C + Zinc support hair growth?',
      rw: '9. Esese C + Zinc ifasha gukura kw’imisatsi?'
    },
    answer: {
      ar: 'نعم و بقوة إذا لم يكن تساقط الشعر مرتبط بشيء آخر مثل سوء التغذية العام أو حالة نفسية.',
      en: 'Yes, unless hair loss stems from genetics or severe thyroid issues.',
      rw: 'Yego, ifasha gukura kw’umisatsi mu buryo bukomeye.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '10. هل يساعد على امتصاص الحديد؟',
      en: '10. Does Vitamin C boost iron absorption?',
      rw: '10. Esese Vitamin C ifasha kwinjiza iron?'
    },
    answer: {
      ar: 'نعم، فيتامين C يحسن امتصاص الحديد غير الهيمي الموجود في المصادر النباتية.',
      en: 'Yes, Vitamin C converts non-heme plant iron into a highly absorbable ferrous state.',
      rw: 'Yego, Vitamin C ihindura plant-based iron kuba kwinjira vuba.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '11. هل يناسب الرياضيين؟',
      en: '11. Is C + Zinc beneficial for athletes?',
      rw: '11. Esese ikorera abasiporoteyi?'
    },
    answer: {
      ar: 'نعم، خاصة إذا كان النظام الغذائي لا يوفر احتياجاتهم لحمايتهم من الإجهاد التأكسدي.',
      en: 'Yes, heavy physical strain temporarily lowers immunity, making C + Zinc crucial for athlete recovery.',
      rw: 'Yego, ifasha abasiporoteyi kutagira ubudahangarwa buke.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '12. هل يمكن تناوله يومياً؟',
      en: '12. Can C + Zinc be taken daily?',
      rw: '12. Esese C + Zinc ifatwa buri munsi?'
    },
    answer: {
      ar: 'نعم، عند الالتزام بالجرعة الموصى بها.',
      en: 'Yes, daily use within recommended doses is safe.',
      rw: 'Yego, ifatwa buri munsi mu ngano isabwa.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '13. ما أفضل وقت لتناول C + Zinc؟',
      en: '13. What is the best time to take C + Zinc?',
      rw: '13. Ni ryari igihe cyiza cyo gufata C + Zinc?'
    },
    answer: {
      ar: 'يفضل مع الطعام لتقليل احتمال اضطراب المعدة.',
      en: 'Take alongside meals to maximize gastrointestinal comfort.',
      rw: 'Hamwe n’ibiryo ni byiza.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '14. هل يمكن تناوله على معدة فارغة؟',
      en: '14. Can C + Zinc be taken on an empty stomach?',
      rw: '14. Esese C + Zinc ifatwa nta kintu kirimo mu nda?'
    },
    answer: {
      ar: 'يمكن ذلك، لكن بعض الأشخاص قد يشعرون بالغثيان أو تهيج المعدة بسبب الزنك.',
      en: 'It is possible, but elemental zinc on an empty stomach can trigger transient nausea in sensitive individuals.',
      rw: 'Iratera isesemi iyo ifashwe nta kintu kirimo mu nda.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '15. هل يمكن تناوله مساءً؟',
      en: '15. Can it be consumed in the evening?',
      rw: '15. Esese ifatwa ninyuma?'
    },
    answer: {
      ar: 'نعم، ولا يوجد وقت إلزامي لتناوله.',
      en: 'Yes, timing is flexible throughout the day.',
      rw: 'Yego, ifatwa umunsi wose.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '16. هل يمكن تناوله مع القهوة أو الشاي؟',
      en: '16. Can C + Zinc be taken with coffee or tea?',
      rw: '16. Esese C + Zinc yavangwa na kahawa cyangwa icyayi?'
    },
    answer: {
      ar: 'يفضل ترك فاصل زمني، لأن الشاي والقهوة قد يقللان امتصاص الزنك والحديد.',
      en: 'Tannins in coffee and tea inhibit zinc and iron uptake. Separate by 1 hour.',
      rw: 'Tandukanya C + Zinc n’icyayi cyangwa kahawa isaha 1.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '17. هل يمكن تناوله مع الكالسيوم؟',
      en: '17. Can C + Zinc be taken with high-dose calcium?',
      rw: '17. Esese C + Zinc yavangwa na Calcium?'
    },
    answer: {
      ar: 'نعم، لكن الجرعات العالية جداً من بعض المعادن قد تؤثر في امتصاص بعضها فيفضل الفصل.',
      en: 'Very high doses of calcium can compete with zinc absorption pathways. Separate high-dose calcium supplements.',
      rw: 'Ingano nini ya calcium iragabanya kwinjira kwa zinc.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '18. هل يمكن تناوله مع المغنيسيوم؟',
      en: '18. Can C + Zinc be combined with Magnesium?',
      rw: '18. Esese yavangwa na Magnesium?'
    },
    answer: {
      ar: 'نعم، ولا توجد مشكلة في ذلك.',
      en: 'Yes, Magnesium and Zinc are safe to take together.',
      rw: 'Yego, nta kibazo kirimo.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '19. هل الزنك يسبب الغثيان؟',
      en: '19. Why does Zinc sometimes cause nausea?',
      rw: '19. Kuki Zinc itera isesemi?'
    },
    answer: {
      ar: 'قد يحدث ذلك إذا تم تناوله على معدة فارغة، لذلك يفضل أخذه مع الطعام.',
      en: 'Zinc irritates gastric lining on an empty stomach. Consuming it with food eliminates nausea completely.',
      rw: 'Itanga isesemi iyo nta kintu kirimo mu nda. Kuyifata n’ibiryo birayikira.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '20. هل يمكن تناول C + Zinc أثناء الحمل؟',
      en: '20. Is C + Zinc safe during pregnancy?',
      rw: '20. Esese C + Zinc ifatwa mu gihe cy’atwite?'
    },
    answer: {
      ar: 'قد يكون مناسبًا بجرعات مناسِبة، لكن يجب استشارة الطبيب قبل استخدام أي مكمل أثناء الحمل.',
      en: 'It is essential during pregnancy, but exact dosage must be prescribed by an obstetrician.',
      rw: 'Bisaba kubaza muganga mbere yo kuyifata mu gihe utwite.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '21. هل يناسب الأطفال؟',
      en: '21. Is C + Zinc suitable for children?',
      rw: '21. Esese C + Zinc ifatwa n’abana?'
    },
    answer: {
      ar: 'توجد منتجات مخصصة للأطفال بجرعات تناسب أعمارهم، ولا ينبغي إعطاء جرعات البالغين للأطفال.',
      en: 'Children require age-appropriate pediatric formulations, not adult strength doses.',
      rw: 'Abana bagomba gufata pediatric formulas, ntabwo ari dosage z’abakuru.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '22. هل يمكن استخدامه لفترات طويلة؟',
      en: '22. Can C + Zinc be used long-term?',
      rw: '22. Esese C + Zinc ifatwa igihe kirekire?'
    },
    answer: {
      ar: 'يمكن ذلك إذا كانت الجرعات ضمن الحدود الموصى بها، لكن الإفراط المفرط في الزنك لفترات طويلة قد يسبب نقص النحاس.',
      en: 'Yes, provided zinc stays under 40mg daily. Chronic excessive zinc intake without copper can induce copper deficiency.',
      rw: 'Yego, ariko ingano ikabije ya Zinc igihe kirekire igabanya Copper.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '23. هل جميع مكملات C + Zinc متشابهة؟',
      en: '23. Are all C + Zinc supplements equal?',
      rw: '23. Esese muko yose ya C + Zinc arangana?'
    },
    answer: {
      ar: 'لا، تختلف في جرعة فيتامين C، ونوع الزنك المستخدم، وجودة المواد الخام.',
      en: 'No, differences in chelated zinc forms dictate bioavailability and stomach comfort.',
      rw: 'Oya, ubwoko bwa Zinc bukoreshwa buhindura kwinjira mu umubiri.'
    }
  },
  {
    category: 'c-zinc',
    question: {
      ar: '24. أي نوع من الزنك أفضل؟ (Zinc Bisglycinate - الامتصاص الأعلى 70%)',
      en: '24. Which form of Zinc is best? (Zinc Bisglycinate superior absorption)',
      rw: '24. Ni ubuhe bwoko bwa Zinc bwiza cyane?'
    },
    answer: {
      ar: 'أفضلهم Zinc Bisglycinate لأن امتصاص المعدة له أفضل جداً ولا يسبب غثياناً ويُمتص منه حوالي 70% من الجرعة مقارنة بالأنواع الأخرى.',
      en: 'Zinc Bisglycinate is scientifically superior. It is chelated with glycine, features 70% higher elemental absorption, and causes zero stomach distress compared to Zinc Oxide or Sulfate.',
      rw: 'Zinc Bisglycinate ni yo nziza cyانه kuko yinjira mu umubiri ku rugero rwa 70% kandi ntitere isesemi.'
    }
  },

  // ==========================================
  // 6. PEA & RICE PLANT PROTEIN FAQS (بروتين البازلاء والأرز - 24 FAQ)
  // ==========================================
  {
    category: 'plant-protein',
    question: {
      ar: '1. ما هو بروتين البازلاء؟',
      en: '1. What is Pea Protein Isolate?',
      rw: '1. Ni iki Pea Protein?'
    },
    answer: {
      ar: 'بروتين نباتي عالي الجودة يُستخرج من البازلاء الصفراء، ويتميز باحتوائه على نسبة مرتفعة من الأحماض الأمينية الأساسية.',
      en: 'A high-grade plant protein isolate extracted from yellow split peas, naturally abundant in essential amino acids and BCAAs.',
      rw: 'Ni proteyine y’ibimera ivuye mu mashaza y’umuhondo, irimo amino acids n’imbaraga.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '2. ما هو بروتين الأرز؟',
      en: '2. What is Brown Rice Protein Isolate?',
      rw: '2. Ni iki Rice Protein?'
    },
    answer: {
      ar: 'بروتين نباتي يُستخرج من الأرز البني، ويتميز بسهولة الهضم وانخفاض احتمالية التسبب بالحساسية.',
      en: 'A hypoallergenic plant protein derived from whole brown rice, prized for smooth digestion and high sulfur amino acid content.',
      rw: 'Ni proteyine ivuye mu muceri w’igikara, woroheye igifu.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '3. هل بروتين البازلاء كامل؟ (ابتكار شركة M.G.REFOTS)',
      en: '3. Is Pea Protein complete on its own? (MGREFOTS Innovation)',
      rw: '3. Esese Pea Protein yuzuye yonyine?'
    },
    answer: {
      ar: 'يحتوي على جميع الأحماض الأمينية الأساسية، لكنه منخفض نسبيًا في الميثيونين مقارنة بالبروتينات الحيوانية. لذلك قامت شركة M.G.REFOTS باختراع هذا الخليط المبتكر من بروتين البازلاء وبروتين الأرز ليكمل كل منهما الآخر لأن كل منهما يعوض الحمض الناقص من الآخر، ولأنه خفيف جدًا على المعدة وأخف من الصويا ولا يسبب غازات مثل الصويا.',
      en: 'Pea protein contains all 9 EAAs but is low in methionine. M.G.REFOTS engineered an advanced Pea + Rice blend where each protein source perfectly completes the other’s amino acid profile, creating a 100% complete protein that is lighter on digestion than soy and produces zero bloating.',
      rw: 'MGREFOTS yakoze umuvango wa Pea na Rice zikuzuzanya mu amino acids kandi ntitere ibihaha nka Soy.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '4. لماذا يتم خلط بروتين البازلاء مع بروتين الأرز؟',
      en: '4. Why blend Pea Protein with Rice Protein?',
      rw: '4. Kuki bavanze Pea na Rice protein?'
    },
    answer: {
      ar: 'لأن كل منهما يعوض النقص الموجود في الآخر، مما ينتج بروتينًا نباتيًا متوازنًا قريبًا جداً في جودة الأحماض الأمينية من البروتينات الحيوانية.',
      en: 'Pea is high in Lysine but lower in Methionine; Rice is high in Methionine but lower in Lysine. Together, they yield a flawless amino score.',
      rw: 'Kuko Pea ifite Lysine nyinshi, Rice ikagira Methionine nyinshi, bikazuzanya.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '5. ما أفضل نسبة لخلط بروتين البازلاء مع بروتين الأرز؟',
      en: '5. What is the optimal Pea to Rice ratio?',
      rw: '5. Ni iyihe ngano iboneye yo kuvanga Pea na Rice?'
    },
    answer: {
      ar: 'تشير الأبحاث إلى أن نسبًا مثل 70:30 أو 80:20 (بازلاء:أرز) توفر توازنًا ممتازاً في الأحماض الأمينية.',
      en: 'Clinical evidence confirms a 70:30 or 80:20 ratio (Pea:Rice) maximizes biological value and muscle protein synthesis.',
      rw: 'Ubushakashatsi bwerekana ko 70:30 cyangwa 80:20 ari ryo igipimo cyiza.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '6. هل الخليط يعادل بروتين مصل اللبن (Whey)؟',
      en: '6. Does the Pea/Rice blend match Whey Protein Isolate?',
      rw: '6. Esese uyu muvango ungana na Whey Protein?'
    },
    answer: {
      ar: 'نعم و بقوة لأنه أصبح كامل الأحماض الأمينية مثل الواي بروتين مع هضم أسرع وأريح.',
      en: 'Yes! Clinical trials demonstrate that a 70/30 Pea/Rice blend stimulates muscle protein synthesis (mTOR) identically to Dairy Whey Isolate.',
      rw: 'Yego, kuko ubu yuzuye amino acids nka Whey.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '7. هل يحتوي الخليط على جميع الأحماض الأمينية الأساسية؟',
      en: '7. Does the blend feature all 9 Essential Amino Acids (EAAs)?',
      rw: '7. Esese irimo amino acids zose 9?'
    },
    answer: {
      ar: 'نعم، عند دمج بروتين البازلاء مع بروتين الأرز يصبح الملف الأميني أكثر تكاملًا.',
      en: 'Yes, the combination satisfies 100% of the World Health Organization (WHO) complete EAA scoring pattern.',
      rw: 'Yego, 100% yuzuye EAA scoring.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '8. هل يحتوي الخليط على كمية جيدة من الليوسين؟',
      en: '8. Does the blend supply sufficient Leucine?',
      rw: '8. Esese irimo Leucine ihagije?'
    },
    answer: {
      ar: 'نعم، بروتين البازلاء غني بالليوسين، وهو من أهم الأحماض الأمينية لتحفيز بناء العضلات.',
      en: 'Yes, supplying over 2.5g of pure Leucine per serving to trigger muscle building.',
      rw: 'Yego, irimo irenga 2.5g za Leucine buri serving.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '9. لماذا الليوسين مهم؟',
      en: '9. Why is Leucine crucial for muscle recovery?',
      rw: '9. Kuki Leucine ari ngombwa?'
    },
    answer: {
      ar: 'لأنه أهم حمض أميني يحفز عملية بناء البروتين العضلي (Muscle Protein Synthesis) بعد التمرين.',
      en: 'Leucine acts as the molecular key that unlocks the mTOR signaling pathway responsible for muscle repair.',
      rw: 'Ni yo idomoka mTOR pathway yo kubaka imikaya.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '10. هل الخليط مناسب لبناء العضلات؟',
      en: '10. Is the blend effective for muscle hypertrophy?',
      rw: '10. Esese uyu muvango wubaka imikaya?'
    },
    answer: {
      ar: 'نعم و بقوة.',
      en: 'Yes, validated by double-blind trials showing equal lean tissue gains compared to whey protein over 12 weeks.',
      rw: 'Yego, mu buryo bukomeye cyane.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '11. هل يناسب مرحلة التنشيف؟',
      en: '11. Is the blend ideal during fat-loss (cutting) phases?',
      rw: '11. Esese ifasha mu gukata ibinure?'
    },
    answer: {
      ar: 'نعم، لأنه غني بالبروتين ويساعد على الحفاظ على الكتلة العضلية أثناء خسارة الدهون.',
      en: 'Yes, it provides high satiety with zero cholesterol and minimal carbohydrates.',
      rw: 'Yego, irimo proteyine pasiteri irinda imikaya.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '12. هل يناسب زيادة الوزن؟',
      en: '12. Can it be used for weight gain (bulking)?',
      rw: '12. Esese ifasha kwongera ibiro?'
    },
    answer: {
      ar: 'نعم، عند استخدامه ضمن فائض من السعرات الحرارية.',
      en: 'Yes, easily incorporated into high-calorie smoothies for clean muscle volume.',
      rw: 'Yego, ushobora kuyifata muri high-calorie shakes.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '13. هل يناسب النباتيين؟',
      en: '13. Is it 100% suitable for vegans?',
      rw: '13. Esese ikorera abarya ibimera gusa (vegans)?'
    },
    answer: {
      ar: 'نعم، وهو من أفضل الخيارات للنباتيين.',
      en: 'Yes, 100% plant-based with zero animal byproducts.',
      rw: 'Yego, ni 100% vegan.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '14. هل يناسب من لديهم حساسية من الحليب؟',
      en: '14. Is it safe for dairy allergies and lactose intolerance?',
      rw: '14. Esese ikorera abafite allergie y’amata?'
    },
    answer: {
      ar: 'نعم، لأنه خالٍ تماماً من بروتينات الحليب واللاكتوز.',
      en: 'Yes, completely hypoallergenic and free from dairy proteins.',
      rw: 'Yego, ntabwo irimo amata.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '15. هل يحتوي على اللاكتوز؟',
      en: '15. Does it contain lactose?',
      rw: '15. Esese irimo lactose?'
    },
    answer: {
      ar: 'لا، بروتين البازلاء والأرز خاليان من اللاكتوز 100%.',
      en: 'No, 100% lactose-free.',
      rw: 'Oya, ntabwo irimo lactose 100%.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '16. هل يهضم بسهولة؟',
      en: '16. Is it easy to digest?',
      rw: '16. Esese yorohereye igifu?'
    },
    answer: {
      ar: 'نعم، ومعظم الأشخاص يتحملونه جيدًا دون أي غازات.',
      en: 'Yes, featuring an ultra-high digestibility rating with zero gut cramping.',
      rw: 'Yego, yorohereye igifu cane.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '17. هل يحتوي على الكوليسترول؟',
      en: '17. Does it contain cholesterol?',
      rw: '17. Esese irimo cholesterol?'
    },
    answer: {
      ar: 'لا، البروتينات النباتية لا تحتوي على كوليسترول.',
      en: 'No, plant sources are naturally cholesterol-free.',
      rw: 'Oya, ibimera ntibigira cholesterol.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '18. هل يحتوي على الجلوتين؟',
      en: '18. Is it certified gluten-free?',
      rw: '18. Esese irimo gluten?'
    },
    answer: {
      ar: 'لا، خاصة إذا كانت المادة الخام من مصنع مرخص دولياً بشهادات إيزو ويقر أن المنتج خالٍ من الجلوتين.',
      en: 'No, certified gluten-free in ISO-accredited facilities.',
      rw: 'Oya, ni gluten-free.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '19. هل يمكن تناوله بعد التمرين؟',
      en: '19. Should it be consumed post-workout?',
      rw: '19. Esese ifatwa nyuma y’imyitozo?'
    },
    answer: {
      ar: 'نعم، وهو من أفضل الأوقات لدعم التعافي العضلي.',
      en: 'Post-workout is ideal for kicking off muscle repair.',
      rw: 'Yego, nyuma y’imyitozo ni igihe cyiza.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '20. هل البروتين النباتي أقل جودة من الحيواني؟',
      en: '20. Is plant protein inherently inferior to animal protein?',
      rw: '20. Esese plant protein ari nkeya mu bwiza kurusha animal protein?'
    },
    answer: {
      ar: 'الجودة تعتمد على الملف الأميني، والهضم، وإجمالي كمية البروتين المستهلكة، وليس على مصدره فقط. والمنتج الخاص بنا كامل الأحماض الأمينية.',
      en: 'Not when properly formulated. A complete amino blend yields identical hypertrophic results.',
      rw: 'Oya, iyo yuzuye amino acids ikora kimwe.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '21. هل بروتين البازلاء يحتوي على فيتويستروجين مثل الصويا؟',
      en: '21. Does Pea Protein contain phytoestrogens like soy?',
      rw: '21. Esese Pea Protein irimo phytoestrogens nka Soy?'
    },
    answer: {
      ar: 'لا، بروتين البازلاء لا يحتوي على كميات مؤثرة من الفيتويستروجينات مثل الصويا.',
      en: 'No, pea protein contains no significant phytoestrogen activity, making it estrogen-neutral for men.',
      rw: 'Oya, ntabwo irimo phytoestrogens nka Soy.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '22. هل يمكن استخدام خليط البازلاء والأرز يومياً؟',
      en: '22. Can the blend be consumed daily?',
      rw: '22. Esese yafatwa buri munsi?'
    },
    answer: {
      ar: 'نعم، يمكن استخدامه يومياً ضمن نظام غذائي متوازن.',
      en: 'Yes, daily consumption is completely safe and healthy.',
      rw: 'Yego, ifatwa buri munsi.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '23. ما أكبر ميزة للجمع بين بروتين البازلاء والأرز؟',
      en: '23. What is the single biggest advantage of blending Pea and Rice protein?',
      rw: '23. Ni iyihe nyungu nini yo kuvanga Pea na Rice?'
    },
    answer: {
      ar: 'أنه يحقق ملفًا أمينيًا أكثر توازنًا، ويزيد القيمة الغذائية للبروتين مقارنة باستخدام كل نوع بمفرده.',
      en: 'It achieves a complete amino acid profile with high digestibility and zero digestive distress.',
      rw: 'Izamura amino acid profile ikaba yuzuye nta kibazo cy’igifu.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      ar: '24. ما الجديد في الأبحاث؟',
      en: '24. What do the latest studies show regarding plant protein blends?',
      rw: '24. Ni iki gishya mu ubushakashatsi bwa plant protein?'
    },
    answer: {
      ar: 'تشير الدراسات الحديثة إلى أن البروتينات النباتية المصممة جيدًا، مثل مزيج بروتين البازلاء مع بروتين الأرز، يمكن أن تدعم بناء العضلات وتحسين التعافي بمستوى البروتينات الحيوانية، بشرط الحصول على كمية كافية من البروتين اليومي، مع الالتزام ببرنامج تدريب مناسب.',
      en: 'Recent trials confirm that intelligently engineered plant protein blends perform identically to whey protein for muscle growth and recovery when total daily protein targets are met.',
      rw: 'Ubushakashatsi bwerekana ko imivango y’ibimera ikora kimwe na whey protein mu gukura kw’imikaya.'
    }
  },
  {
    category: 'creatine',
    question: {
      en: 'Is MGREFOTS Micronized Creatine 100% pure monohydrate?',
      ar: 'هل كرياتين MGREFOTS نقي ومطابق لأعلى مواصفات الجودة السريرية؟',
      rw: 'Esese Creatine ya MGREFOTS irasukuye 100%?'
    },
    answer: {
      en: 'Yes, MGREFOTS Micronized Creatine features ultra-fine mesh particle size for instant solubility and maximal intestinal bioavailability without settling at the bottom of your shaker.',
      ar: 'نعم، يتميز كرياتين MGREFOTS بدقة تنعيم فائقة Micronized لتذوب الشحنة تماماً بالماء مما يضمن الامتصاص المعوي الكامل دون التسبب في أي إزعاج هضمي.',
      rw: 'Yego, Creatine ya MGREFOTS yakozwe mu buryo bw’impunguge zito cyane zishonga mu mazi vuba.'
    }
  },
  {
    category: 'creatine',
    question: {
      en: 'Can I stack Creatine Monohydrate with L-Citrulline Malate pre-workout?',
      ar: 'هل يمكنني خلط الكرياتين مع السيترولين مالات قبل التمرين في مشروب واحد؟',
      rw: 'Esese nshobora kuvanga Creatine na L-Citrulline?'
    },
    answer: {
      en: 'Absolutely. Combining Creatine (for ATP energy) with L-Citrulline Malate (for Nitric Oxide vascularity & pump) forms the ultimate synergistic stack for explosive strength and muscle fullness.',
      ar: 'بالتأكيد! خلط الكرياتين (لتجديد طاقة الـ ATP) مع السيترولين مالات (لضخ الدم والأكسيد النيتريك) يشكل المزيج المثالي لرفع أقصى أوزان وضخ الدم بكثافة داخل الخلايا.',
      rw: 'Yego, kuvanga zombi biha imikaya ingufu z’ikirenga n’amaraso ahagije.'
    }
  },
  {
    category: 'plant-protein',
    question: {
      en: 'Why is MGREFOTS Plant Protein 70/30 ideal for people with dairy sensitivity?',
      ar: 'لماذا يعتبر بروتين MGREFOTS النباتي الخيار المثالي لمن يعانون من حساسية اللاكتوز؟',
      rw: 'Kuki MGREFOTS Plant Protein ari nziza ku bantu bafite lactose allergy?'
    },
    answer: {
      en: 'It is 100% dairy-free, gluten-free, and lactose-free. Made from non-GMO Yellow Pea and Brown Rice isolates, it provides 25g of pure protein per scoop with zero stomach discomfort.',
      ar: 'لأنه خالي تماماً ١٠٠٪ من الألبان واللاكتوز والجلوتين. مصنوع من عزل البازلاء الصفراء والأرز البني ليمنحك ٢٥ جرام بروتين صافي لكل مكيال مع هضم سلس وسريع.',
      rw: 'Ntabwo irimo amata cyangwa lactose, ihaye umubiri 25g za proteyine pasiteri.'
    }
  }
];

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: 'art-creatine-brain',
    slug: 'creatine-brain-energy-cognition',
    title: {
      en: 'Creatine Beyond Muscle: Cognitive Function, Sleep Deprivation & Neuroprotection',
      ar: 'الكرياتين خارج نطاق العضلات: تحسين التركيز الذهني والتغلب على إرهاق قلة النوم',
      rw: 'Creatine no Ubwonko: Gukora neza n’ibitotsi'
    },
    excerpt: {
      en: 'Discover how brain creatine phosphate stores support cognitive processing speed, memory recall during stress, and mental resilience under sleep debt.',
      ar: 'اكتشف كيف تدعم مخازن فوسفات الكرياتين بالدماغ سرعة المعالجة الذهنية والتركيز العالي حتى في حالات الإرهاق وقلة النوم.',
      rw: 'Reba uburyo Creatine ifasha ubwonko gukora neza no kwibuka vuba.'
    },
    category: 'Creatine',
    tags: ['Creatine', 'Brain Health', 'Cognition', 'Sleep Deprivation', 'Neuroprotection'],
    readingTime: '6 min read',
    publishedDate: 'August 2026',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' }
    },
    medicalReviewer: {
      name: 'MGREFOTS Advisory Board',
      role: { en: 'Neuro-Biochemistry Unit', ar: 'وحدة الكيمياء العصبية', rw: 'Inzobere mu Ubwonko' }
    },
    sections: [
      {
        id: 'brain-atp',
        title: {
          en: '1. Brain Energy Metabolism & Phosphocreatine',
          ar: '١. أيض الطاقة بالدماغ والفوسفوكرياتين',
          rw: '1. Ubwonko n’ingufu za ATP'
        },
        content: {
          en: 'While representing only 2% of body mass, the brain consumes 20% of total basal ATP energy. Brain neurons express Creatine Kinase-B, utilizing creatine to buffer rapid energy spikes during high cognitive load or physical stress.',
          ar: 'على الرغم من أن الدماغ يشكل ٢٪ فقط من وزن الجسم، إلا أنه يستهلك ٢٠٪ من مجمل طاقة الـ ATP. تحتوي خلايا المخ على إنزيم الكرياتين كاينايز العشبي لاستغلال الكرياتين في الحفاظ على أعلى يقظة ذهنية.',
          rw: 'Ubwonko ukoresha 20% y’ingufu zose. Creatine ifasha ubwonko gukora neza.'
        }
      }
    ],
    faqs: [],
    references: [],
    relatedGuideId: 'complete-creatine-guide',
    relatedProductId: 'mgrefots-creatine',
    isFeatured: true,
    isPopular: true
  },
  {
    id: 'art-plant-protein-pdcaas',
    slug: 'plant-protein-pdcaas-diaas-scoring',
    title: {
      en: 'Demystifying Plant Protein: Why Pea/Rice 70/30 Matches Whey Isolate',
      ar: 'فك شفرة البروتين النباتي: لماذا تماثل تركيبة البازلاء والأرز ٧٠/٣٠ الوي إيزوليت؟',
      rw: 'Proteyine y’Ibimera: Pea na Rice Blend'
    },
    excerpt: {
      en: 'A deep dive into DIAAS amino acid scoring, gut absorption kinetics, and why modern plant isolates deliver zero bloating.',
      ar: 'تحليل عميق لمعايير هضم الأحماض الأمينية DIAAS وسرعة الامتصاص دون التسبب في أي انتفاخات معوية.',
      rw: 'Ubusobanuro bwimbitse bwa Pea na Rice blend n’uburyo yigira mu mubiri vuba.'
    },
    category: 'Protein',
    tags: ['Plant Protein', 'Leucine', 'Pea Isolate', 'Rice Isolate', 'Digestibility'],
    readingTime: '7 min read',
    publishedDate: 'August 2026',
    lastUpdated: 'August 2026',
    author: {
      name: 'Mohamed Zeina',
      role: { en: 'NASM Master Certified Coach', ar: 'مدرب معتمد NASM بـ MGREFOTS', rw: 'Umutoza Wemerewe na NASM' }
    },
    medicalReviewer: {
      name: 'MGREFOTS Advisory Board',
      role: { en: 'Nutritional Biochemistry Unit', ar: 'وحدة الكيمياء الحيوية الغذائية', rw: 'Inzobere mu Ubuzima' }
    },
    sections: [],
    faqs: [],
    references: [],
    relatedGuideId: 'complete-whey-protein-guide',
    relatedProductId: 'mgrefots-plant-protein',
    isFeatured: true,
    isPopular: true
  }
];
