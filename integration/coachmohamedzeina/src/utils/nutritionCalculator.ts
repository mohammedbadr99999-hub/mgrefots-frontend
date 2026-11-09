/**
 * MGREFOTS — Deterministic, Auditable Nutrition Calculation, Food Database & Clinical Triage Layer
 *
 * Scientific & Reference Documentation:
 * 1. Resting Energy Expenditure (REE / BMR):
 *    Mifflin-St Jeor Equation (Mifflin MD et al., Am J Clin Nutr 1990;51(2):241-7):
 *    - Men:   10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) + 5
 *    - Women: 10 × weight(kg) + 6.25 × height(cm) - 5 × age(y) - 161
 *    - Unspecified sex: midpoint of male and female equations (-78 constant) labeled as a broad estimate.
 *
 * 2. Separation of Everyday Non-Exercise Activity (NEAT/PAL) and Structured Training:
 *    - Baseline daily movement multiplier (excluding structured workouts):
 *      sedentary: 1.20 | light: 1.32 | moderate: 1.45 | active: 1.60
 *    - Structured training energy expenditure added separately:
 *      (trainingDaysPerWeek × sessionDurationMinutes × MET_factor × weightKg / 60) / 7
 *      where MET_factor = 4.5 (resistance), 6.5 (cardio), 5.5 (mixed).
 *
 * 3. Food Nutrient Reference Database:
 *    Values per 100g from USDA FoodData Central (Foundation / SR Legacy) with explicit
 *    preparation state (raw vs. cooked weight), fiber, and household measures.
 */

import { Locale } from '../data/muscleGroups';

export type NutritionPathway = 'general_fitness' | 'health_condition';
export type GoalType = 'lose_fat' | 'build_muscle' | 'maintain' | 'improve_eating';
export type PacePreference = 'conservative' | 'moderate';
export type WeightTrendType = 'stable' | 'losing_slowly' | 'gaining_slowly' | 'fluctuating' | 'not_tracked';
export type SexEquationType = 'male' | 'female' | 'prefer_not';
export type DailyActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active';
export type TrainingType = 'resistance' | 'cardio' | 'mixed' | 'none';
export type DietPattern = 'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian';
export type CookingTimePref = 'quick' | 'moderate' | 'flexible';
export type CookingAccessType = 'minimal_equipment' | 'basic_kitchen' | 'full_kitchen';
export type BudgetPref = 'low' | 'medium' | 'flexible';
export type HealthFlag =
  | 'none'
  | 'pregnant_lactating'
  | 'medical_condition'
  | 'eating_disorder_history'
  | 'prefer_not';

export type ChronicConditionId =
  | 'high_bp'
  | 'low_bp'
  | 'diabetes'
  | 'gout'
  | 'possible_lipedema'
  | 'other_chronic'
  | 'kidney_disease'
  | 'heart_failure'
  | 'pregnant_lactating'
  | 'eating_disorder_history';

export type ScreeningStatus = 'none' | 'diagnosed' | 'unsure' | 'prefer_not';
export type DiabetesTypeOption = 'type1' | 'type2' | 'gestational' | 'prediabetes' | 'unsure';
export type YesNoUnsure = 'no' | 'yes' | 'unsure';
export type LipedemaStatus = 'diagnosed' | 'suspected_not_diagnosed' | 'unsure';

export interface HealthScreeningDetails {
  screeningStatus: ScreeningStatus;
  selectedConditions: ChronicConditionId[];
  hasUrgentSymptoms: boolean; // fainting, confusion, chest pain, severe weakness/dizziness
  // Diabetes specific
  diabetesType: DiabetesTypeOption;
  usesInsulinOrHypoglycemiaMeds: YesNoUnsure;
  hasClinicianCarbPlan: YesNoUnsure;
  // Blood Pressure specific
  bpDiagnosisType: 'high' | 'low' | 'both' | 'unsure';
  hasBpDizzinessOrFainting: boolean;
  hasClinicianSodiumFluidPlan: YesNoUnsure;
  // Gout specific
  goutDiagnosed: YesNoUnsure;
  hasGoutClinicianPlan: YesNoUnsure;
  // Possible Lipedema specific
  lipedemaStatus: LipedemaStatus;
  // Medication safety flag
  takesSafetyCriticalMedications: YesNoUnsure;
  // Privacy & consent
  consentToSaveHealthData: boolean;
}

export interface WeeklyCheckInData {
  lastCheckedInAt: string | null;
  weightChangeTrend: 'lost_fast' | 'lost_steady' | 'maintained' | 'gained_steady' | 'gained_fast';
  hungerLevel: 'low' | 'manageable' | 'high';
  adherenceLevel: 'high' | 'moderate' | 'low';
  trainingPerformance: 'improving' | 'stable' | 'fatigued';
  kcalAdjustmentApplied: number; // e.g., -125, 0, +125
}

export interface NutritionAssessmentData {
  pathway?: NutritionPathway;
  goal: GoalType;
  pacePreference?: PacePreference;
  age: number | null;
  weightValue: number | null;
  weightUnit: 'kg' | 'lb';
  recentWeightTrend?: WeightTrendType;
  heightCm: number | null;
  heightFeet: number | null;
  heightInches: number | null;
  heightUnit: 'cm' | 'ft_in';
  sexForEquation: SexEquationType;
  dailyActivity: DailyActivityLevel;
  trainingDaysPerWeek: number;
  trainingType: TrainingType;
  sessionDurationMinutes: number;
  mealsPerDay: 3 | 4;
  favoriteFoods: string;
  dislikedFoods: string;
  allergies: string[];
  dietPattern: DietPattern;
  halalPreference: boolean;
  cookingTime: CookingTimePref;
  cookingAccess?: CookingAccessType;
  budget: BudgetPref;
  localFoods: string;
  countryHint?: string;
  cityAreaHint?: string;
  healthFlag: HealthFlag;
  healthScreening?: HealthScreeningDetails;
  weeklyCheckIn?: WeeklyCheckInData;
}

export const DEFAULT_HEALTH_SCREENING: HealthScreeningDetails = {
  screeningStatus: 'none',
  selectedConditions: [],
  hasUrgentSymptoms: false,
  diabetesType: 'unsure',
  usesInsulinOrHypoglycemiaMeds: 'no',
  hasClinicianCarbPlan: 'no',
  bpDiagnosisType: 'unsure',
  hasBpDizzinessOrFainting: false,
  hasClinicianSodiumFluidPlan: 'no',
  goutDiagnosed: 'no',
  hasGoutClinicianPlan: 'no',
  lipedemaStatus: 'unsure',
  takesSafetyCriticalMedications: 'no',
  consentToSaveHealthData: false,
};

export const DEFAULT_WEEKLY_CHECKIN: WeeklyCheckInData = {
  lastCheckedInAt: null,
  weightChangeTrend: 'maintained',
  hungerLevel: 'manageable',
  adherenceLevel: 'high',
  trainingPerformance: 'stable',
  kcalAdjustmentApplied: 0,
};

export interface ClinicalGuidanceCard {
  conditionId: ChronicConditionId | 'under_18' | 'urgent_symptoms';
  titleByLocale: Record<Locale, string>;
  summaryByLocale: Record<Locale, string>;
  educationalPointsByLocale: Record<Locale, string[]>;
  whatWeDoNotDoByLocale: Record<Locale, string>;
  whenToConsultClinicianByLocale: Record<Locale, string>;
  sourceName: string;
  sourceUrl: string;
  reviewDate: string;
  contentOwner: string;
}

export const CLINICAL_HEALTH_GUIDANCE: Record<string, ClinicalGuidanceCard> = {
  urgent_symptoms: {
    conditionId: 'urgent_symptoms',
    titleByLocale: {
      en: 'Urgent Symptom Safety Notice — Seek Immediate Medical Evaluation',
      ar: 'تنبيه أمان لأعراض عاجلة — يرجى طلب التقييم الطبي الفوري',
      fr: 'Avis de sécurité (Symptômes urgents) — Consultez immédiatement un médecin',
      rw: 'Iburira ry’ubuzima bwihutirwa — Ganira na muganga ako kanya',
    },
    summaryByLocale: {
      en: 'Symptoms such as fainting, chest pain, confusion, severe dizziness, or sudden severe weakness require prompt medical evaluation before starting or changing any nutrition or exercise plan.',
      ar: 'الأعراض مثل الإغماء أو ألم الصدر أو الارتباك أو الدوار الشديد أو الضعف الحاد المفاجئ تتطلب تقييماً طبياً عاجلاً قبل البدء في أي خطة تغذية أو تمارين.',
      fr: 'Des symptômes tels que l’évanouissement, une douleur thoracique, de la confusion ou des étourdissements graves nécessitent une évaluation médicale immédiate avant tout programme alimentaire.',
      rw: 'Ibimenyetso nko kwikubita hasi, kubabara mu gatuza, cyangwa isereri ikabije bisaba gusuzumwa na muganga mbere yo gutangira gahunda y’imirire.',
    },
    educationalPointsByLocale: {
      en: [
        'Do not start caloric restriction, fasting, or salt/fluid loading while experiencing acute symptoms.',
        'Contact emergency services or an urgent-care physician right away for fainting, chest discomfort, or confusion.',
      ],
      ar: [
        'لا تبدأ بتقليل السعرات أو الصيام أو زيادة الملح/السوائل أثناء وجود أعراض حادة.',
        'تواصل مع الطوارئ الطبية أو الطبيب المختص فوراً عند الشعور بالإغماء أو ألم الصدر أو الدوار الشديد.',
      ],
      fr: [
        'Ne commencez aucune restriction calorique ni modification brusque de sel ou de liquides.',
        'Contactez immédiatement un service médical d’urgence.',
      ],
      rw: [
        'Ntugatangire kugabanya ingufu z’ibiryo cyangwa kongera umunyu utabaza muganga.',
        'Sura ivuriro ryihutirwa ako kanya.',
      ],
    },
    whatWeDoNotDoByLocale: {
      en: 'This app pauses meal-plan generation when urgent symptoms are reported and never replaces emergency or clinical care.',
      ar: 'يوقف التطبيق توليد الجداول الغذائية تلقائياً عند وجود أعراض عاجلة، ولا يحل أبداً محل الرعاية الطبية الطارئة.',
      fr: 'Cette application suspend la génération de plans alimentaires en cas de symptômes urgents.',
      rw: 'Porogaramu ihagarika gukora gahunda y’ibiryo iyo hari ibimenyetso bikomeye.',
    },
    whenToConsultClinicianByLocale: {
      en: 'Seek immediate clinical care now before making dietary or training changes.',
      ar: 'اطلب الرعاية الطبية الفورية الآن قبل إجراء أي تغييرات غذائية أو تدريبية.',
      fr: 'Consultez un médecin immédiatement.',
      rw: 'Sura muganga ako kanya.',
    },
    sourceName: 'NHS & American Heart Association — Urgent Warning Signs',
    sourceUrl: 'https://www.nhs.uk/conditions/low-blood-pressure-hypotension/',
    reviewDate: '2025-01-15',
    contentOwner: 'MGREFOTS Clinical Safety & Nutrition Review',
  },
  under_18: {
    conditionId: 'under_18',
    titleByLocale: {
      en: 'Age Under 18 — Growth-Supportive Guidance Only',
      ar: 'العمر أقل من 18 سنة — إرشادات عامة لدعم النمو فقط',
      fr: 'Moins de 18 ans — Conseils généraux pour la croissance uniquement',
      rw: 'Munsi y’imyaka 18 — Inama rusange z’imikurire gusa',
    },
    summaryByLocale: {
      en: 'Adolescents have unique energy, bone-mineral, and developmental needs. We do not generate adult calorie-deficit or aggressive physique prescriptions for users under 18.',
      ar: 'يحتاج المراهقون والشباب دون 18 عاماً إلى طاقة وعناصر غذائية خاصة للنمو وبناء العظام. لذلك لا يقوم التطبيق بإنشاء أنظمة عجز سعرات للبالغين لمن هم دون 18 سنة.',
      fr: 'Les adolescents ont des besoins spécifiques liés à la croissance. Nous ne générons pas de déficit calorique adulte pour les moins de 18 ans.',
      rw: 'Abakiri bato bakeneye intungamubiri zihariye zo gukura; ntitugenera munsi y’imyaka 18 gahunda yo kugabanya ibiro.',
    },
    educationalPointsByLocale: {
      en: [
        'Focus on regular, balanced meals combining whole grains, lean proteins, dairy or calcium-rich alternatives, fruits, and vegetables.',
        'Stay hydrated with water before, during, and after sports or resistance training supervised by a qualified coach.',
        'Avoid skipping meals, restrictive fad diets, or unprescribed physique supplements.',
      ],
      ar: [
        'التركيز على وجبات منتظمة ومتوازنة تجمع بين الحبوب الكاملة، البروتينات الجيدة، منتجات الألبان أو بدائل الكالسيوم، الفواكه، والخضروات.',
        'شرب الماء بانتظام قبل وأثناء وبعد النشاط البدني تحت إشراف مدرب مؤهل.',
        'تجنب تخطي الوجبات أو الحميات القاسية أو المكملات غير الموصوفة طبياً.',
      ],
      fr: [
        'Privilégiez des repas réguliers et équilibrés (protéines, céréales complètes, calcium, fruits et légumes).',
        'Évitez les régimes restrictifs pendant la croissance.',
      ],
      rw: [
        'Fata amafunguro yuzuye kandi ku gihe (proteyine, imboga, imbuto, n’ibyubaka amagufa).',
        'Irinde kwiyicisha inzara mu gihe cyo gukura.',
      ],
    },
    whatWeDoNotDoByLocale: {
      en: 'We do not prescribe calorie deficits, weight-loss targets, or adult macro prescriptions for users under 18.',
      ar: 'لا نفرض عجز سعرات حرارية أو أهداف إنقاص وزن أو حصص ماكروز للبالغين لمن هم دون 18 عاماً.',
      fr: 'Aucun déficit calorique ni prescription adulte n’est généré pour les mineurs.',
      rw: 'Ntabwo dutanga gahunda yo kugabanya калоري ku bari munsi y’imyaka 18.',
    },
    whenToConsultClinicianByLocale: {
      en: 'Consult a pediatrician or registered pediatric dietitian for individualized nutrition planning.',
      ar: 'استشر طبيب الأطفال أو أخصائي التغذية العلاجية المعتمد لتصميم خطة غذائية مخصصة.',
      fr: 'Consultez un pédiatre ou un diététicien qualifié.',
      rw: 'Ganira na muganga w’abana cyangwa inzobere mu mirire.',
    },
    sourceName: 'World Health Organization (WHO) & Academy of Nutrition and Dietetics — Adolescent Nutrition',
    sourceUrl: 'https://www.who.int/health-topics/adolescent-health',
    reviewDate: '2025-01-15',
    contentOwner: 'MGREFOTS Clinical Safety & Nutrition Review',
  },
  high_bp: {
    conditionId: 'high_bp',
    titleByLocale: {
      en: 'High Blood Pressure (Hypertension) — Heart-Healthy Educational Guide',
      ar: 'ارتفاع ضغط الدم — دليل تثقيفي للتغذية الصحية للقلب',
      fr: 'Hypertension artérielle — Guide éducatif pour la santé cardiaque',
      rw: 'Umuvuduko ukabije w’amaraso — Inama rusange z’imirire',
    },
    summaryByLocale: {
      en: 'A heart-healthy eating pattern (such as the DASH approach) emphasizes vegetables, fruits, whole grains, legumes, and lean proteins while moderating sodium and heavily processed foods.',
      ar: 'يركز النمط الغذائي الصحي للقلب (مثل نمط DASH) على الخضروات والفواكه والحبوب الكاملة والبقوليات والبروتينات قليلة الدهون مع تقليل الصوديوم والأطعمة فائقة التصنيع.',
      fr: 'Une alimentation saine pour le cœur (type DASH) privilégie les légumes, fruits, céréales complètes et protéines maigres tout en limitant le sodium.',
      rw: 'Imirire ifasha umutima (nk’uburyo bwa DASH) yibanda ku mboga, imbuto, ibinyampeke byuzuye, no kugabanya umunyu mwinshi mu biryo.',
    },
    educationalPointsByLocale: {
      en: [
        'Flavor meals with herbs, garlic, lemon, and spices instead of adding extra table salt, bouillon cubes, or salty sauces.',
        'Choose fresh poultry, fish, eggs, and unsalted legumes over cured meats, canned high-sodium foods, and pickled items.',
        'Note on potassium & fluids: While potassium-rich whole foods (greens, beans, bananas) are part of general heart-healthy diets, potassium and fluid targets must be individualized by a physician if you have kidney disease, heart failure, or take blood-pressure/diuretic medications.',
      ],
      ar: [
        'تتبيل الطعام بالأعشاب الطبيعية والثوم والليمون والتوابل بدلاً من الإكثار من ملح الطعام أو مكعبات المرقة الجاهزة والمخللات.',
        'اختيار الدواجن والأسماك الطازجة والبيض والبقوليات غير المملحة بدلاً من اللحوم المصنعة والمعلبات عالية الصوديوم.',
        'ملاحظة هامة حول البوتاسيوم والسوائل: رغم أن الأطعمة الغنية بالبوتاسيوم مفيدة عامةً، إلا أن تحديد كميات الصوديوم والبوتاسيوم والسوائل يجب أن يتم بواسطة الطبيب المعالج خاصةً في حال وجود أمراض الكلى أو ضعف عضلة القلب أو تناول أدوية الضغط ومدرات البول.',
      ],
      fr: [
        'Assaisonnez avec des herbes, de l’ail et du citron plutôt qu’avec du sel ajouté ou des cubes de bouillon.',
        'Les objectifs en sodium, potassium et liquides doivent être validés par votre médecin, surtout en cas de maladie rénale ou de traitement antihypertenseur.',
      ],
      rw: [
        'Koresha ibirungo karemano nk’indimu na tungurusumu aho kongeramo umunyu mwinshi.',
        'Ingano y’umunyu, potasiyumu n’amazi bigomba kwemezwa na muganga wawe, cyane cyane niba ufite ikibazo cy’impyiko cyangwa ufata imiti.',
      ],
    },
    whatWeDoNotDoByLocale: {
      en: 'We do not prescribe individualized sodium/potassium limits, alter blood-pressure medications, or auto-generate a medical therapeutic diet.',
      ar: 'لا يصف التطبيق جرعات علاجية فردية للصوديوم أو البوتاسيوم، ولا يغير أدوية الضغط، ولا ينشئ حمية طبية علاجية تلقائياً.',
      fr: 'Nous ne prescrivons pas de cibles médicales de sodium/potassium et ne modifions jamais vos médicaments.',
      rw: 'Ntabwo dutanga gahunda y’imiti cyangwa ngo duhindure imiti yawe y’umuvuduko w’amaraso.',
    },
    whenToConsultClinicianByLocale: {
      en: 'Consult your physician or registered dietitian for your exact sodium, potassium, fluid, and calorie targets—and never stop or change prescribed blood-pressure medication without your doctor.',
      ar: 'استشر طبيبك المعالج أو أخصائي التغذية الإكلينيكية لتحديد أهداف الصوديوم والبوتاسيوم والسوائل المناسبة لحالتك، ولا تتوقف عن تناول أدوية الضغط أو تعدلها دون استشارة طبيبك.',
      fr: 'Consultez votre médecin ou diététicien pour vos cibles personnalisées sans jamais arrêter votre traitement.',
      rw: 'Ganira na muganga wawe mbere yo guhindura imirire cyangwa imiti ufata.',
    },
    sourceName: 'NHLBI / NIH — DASH Eating Plan & American Heart Association',
    sourceUrl: 'https://www.nhlbi.nih.gov/education/dash-eating-plan',
    reviewDate: '2025-01-15',
    contentOwner: 'MGREFOTS Clinical Safety & Nutrition Review',
  },
  low_bp: {
    conditionId: 'low_bp',
    titleByLocale: {
      en: 'Low Blood Pressure (Hypotension) — Safe Educational Guidance',
      ar: 'انخفاض ضغط الدم — إرشادات تثقيفية وخطوات آمنة',
      fr: 'Hypotension artérielle — Informations éducatives et sécurité',
      rw: 'Umuvuduko muke w’amaraso (Hypotension) — Inama rusange n’umutekano',
    },
    summaryByLocale: {
      en: 'Low blood pressure can have many different underlying causes (dehydration, medications, endocrine or cardiac factors, or orthostatic changes). We do not assume you need extra salt or fluid loading.',
      ar: 'قد ينتج انخفاض ضغط الدم عن أسباب متعددة ومختلفة (مثل الجفاف، بعض الأدوية، أسباب هرمونية أو قلبية، أو هبوط الضغط الوضعي عند الوقوف). لذلك لا يفترض التطبيق أبداً أنك بحاجة إلى زيادة الملح أو السوائل عشوائياً.',
      fr: 'L’hypotension a des causes variées. Nous ne supposons jamais que vous devez augmenter votre consommation de sel sans avis médical.',
      rw: 'Umuvuduko muke w’amaraso uterwa n’impamvu nyinshi; ntidutegeka kongera umunyu cyangwa amazi menshi hatabayeho isuzuma rya muganga.',
    },
    educationalPointsByLocale: {
      en: [
        'Do not self-prescribe high-salt diets or excessive fluid loading;only a clinician who has evaluated the cause of your low blood pressure can advise whether sodium or fluid adjustments are safe.',
        'If you experience post-meal lightheadedness, discuss smaller, more frequent balanced meals and posture transitions with your physician.',
        'Avoid skipping meals or prolonged fasting if prone to dizziness or weakness.',
      ],
      ar: [
        'لا تقم بزيادة الملح أو شرب كميات مفرطة من السوائل من تلقاء نفسك؛ فالطبيب وحده بعد تشخيص سبب انخفاض الضغط هو من يقرر مدى أمان ذلك.',
        'في حال الشعور بدوار بعد الوجبات الكبيرة، ناقش مع طبيبك فكرة تقسيم الطعام إلى وجبات أصغر ومتوازنة على مدار اليوم والنهوض ببطء.',
        'تجنب تخطي الوجبات أو الصيام الطويل إذا كنت معرضاً للدوخة أو الهبوط.',
      ],
      fr: [
        'Ne pratiquez pas de surcharge en sel ou en eau sans prescription médicale.',
        'Évitez les jeûnes prolongés et parlez à votre médecin si des étourdissements surviennent après les repas.',
      ],
      rw: [
        'Ntukongere umunyu mwinshi ku gيسو cyawe utabibwiwe na muganga.',
        'Irinde kumara igihe kinini utariye niba ugira isereri.',
      ],
    },
    whatWeDoNotDoByLocale: {
      en: 'We never prescribe salt loading, fluid loading, or calorie deficits for symptomatic low blood pressure.',
      ar: 'لا يصف التطبيق أبداً تحميل الملح (Salt loading) أو السوائل الزائدة أو أنظمة خفض الوزن الحادة لحالات انخفاض الضغط.',
      fr: 'Aucune surcharge en sel ou en liquide n’est prescrite par l’application.',
      rw: 'Ntabwo dutanga itegeko ryo kongera umunyu cyangwa amazi.',
    },
    whenToConsultClinicianByLocale: {
      en: 'Seek medical evaluation if low blood pressure causes dizziness, lightheadedness, blurred vision, or weakness—and seek urgent care immediately for fainting, confusion, or chest pain.',
      ar: 'راجع الطبيب لتشخيص السبب إذا كان انخفاض الضغط مصحوباً بدوخة أو زغللة أو إرهاق، واطلب الرعاية الطارئة فوراً في حال حدوث إغماء أو ألم بالصدر أو ارتباك.',
      fr: 'Consultez un médecin en cas de vertiges ou faiblesse, et les urgences en cas de malaise ou douleur thoracique.',
      rw: 'Sura muganga niba ugira isereri cyangwa intege nke.',
    },
    sourceName: 'NHS — Low Blood Pressure (Hypotension) Clinical Guidance',
    sourceUrl: 'https://www.nhs.uk/conditions/low-blood-pressure-hypotension/',
    reviewDate: '2025-01-15',
    contentOwner: 'MGREFOTS Clinical Safety & Nutrition Review',
  },
  diabetes: {
    conditionId: 'diabetes',
    titleByLocale: {
      en: 'Diabetes — General Food-Pattern Education & Medication Safety',
      ar: 'السكري — تثقيف غذائي عام وضوابط الأمان مع الأدوية والأنسولين',
      fr: 'Diabète — Éducation nutritionnelle générale et sécurité médicamenteuse',
      rw: 'Diyabete — Inama rusange z’imirire n’umutekano w’imiti',
    },
    summaryByLocale: {
      en: 'Nutrition needs in diabetes depend on diabetes type (Type 1, Type 2, gestational, or prediabetes), glucose patterns, kidney health, and whether you use insulin or medications that can lower blood sugar.',
      ar: 'تختلف الاحتياجات الغذائية لمرضى السكري حسب نوع السكري (النوع الأول، النوع الثاني، سكري الحمل، أو مرحلة ما قبل السكري)، وقراءات السكر، ووظائف الكلى، ونوع الأدوية أو الأنسولين المستخدم.',
      fr: 'Les besoins nutritionnels varient selon le type de diabète, la fonction rénale et l’utilisation d’insuline ou d’hypoglycémiants.',
      rw: 'Imirire ku barwayi ba diyabete iterwa n’ubwoko bwayo, imikorere y’impyiko, ndetse n’imiti cyangwa insuline ufata.',
    },
    educationalPointsByLocale: {
      en: [
        'Critical Safety Rule for Insulin & Hypoglycemia-Causing Medicines: Do NOT start fasting, ketogenic/very-low-carbohydrate diets, or sudden major carbohydrate cuts without direct supervision from your prescribing clinician, as this can trigger dangerous low blood sugar (hypoglycemia).',
        'Pair high-fiber carbohydrates (lentils, beans, intact whole grains, non-starchy vegetables) with lean protein and healthy fats to support steadier post-meal glucose responses.',
        'Follow the carbohydrate targets and meal timing given by your diabetes care team or Certified Diabetes Care and Education Specialist (CDCES).',
      ],
      ar: [
        'قاعدة أمان قصوى لمستخدمي الأنسولين وأدوية خفض السكر: لا تبدأ بالصيام أو حمية الكيتو أو تقليل الكربوهيدرات بشكل حاد ومفاجئ دون إشراف مباشر من طبيبك المعالج، لأن ذلك قد يسبب هبوطاً خطيراً في سكر الدم (Hypoglycemia).',
        'الجمع بين مصادر الكربوهيدرات الغنية بالألياف (مثل العدس والبقوليات والحبوب الكاملة والخضروات غير النشوية) مع البروتين والدهون الصحية يساعد في توازن استجابة السكر بعد الوجبة.',
        'التزم دائماً بمواعيد الوجبات وحصص الكربوهيدرات التي حددها لك طبيب السكري أو أخصائي التغذية العلاجية.',
      ],
      fr: [
        'Sécurité insuline/médicaments : Ne commencez jamais de jeûne, de régime cétogène ou de réduction brutale des glucides sans avis médical (risque d’hypoglycémie sévère).',
        'Associez des glucides riches en fibres (légumineuses, légumes non féculents) à des protéines maigres.',
      ],
      rw: [
        'Umutekano ku bafata insuline: Ntugatangire kwiyicisha inzara cyangwa kugabanya ibinyamasukari cyane utabaza muganga, kuko bishobora gutera kugwa kw’isukari mu maraso.',
        'Fatanya imboga, ibishyimbo na proteyine mu mafunguro yawe.',
      ],
    },
    whatWeDoNotDoByLocale: {
      en: 'We never calculate insulin doses, adjust diabetes medications, or prescribe ketogenic/fasting regimens.',
      ar: 'لا يقوم التطبيق أبداً بحساب جرعات الأنسولين أو تعديل أدوية السكري أو وصف أنظمة الصيام والكيتو.',
      fr: 'Nous ne calculons jamais les doses d’insuline et ne modifions aucun traitement.',
      rw: 'Ntabwo tugena ingano ya insuline cyangwa ngo duhindure imiti yawe.',
    },
    whenToConsultClinicianByLocale: {
      en: 'Work with your endocrinologist, primary physician, or registered dietitian before changing your carbohydrate intake or physical activity volume.',
      ar: 'تواصل مع طبيب الغدد الصماء/السكري أو أخصائي التغذية العلاجية المعتمد قبل تغيير كمية الكربوهيدرات أو شدة التمارين.',
      fr: 'Consultez votre diabétologue ou diététicien avant de modifier vos apports glucidiques.',
      rw: 'Ganira na muganga wawe wa diyabete mbere yo guhindura ingano y’ibiryo cyangwa imyitozo.',
    },
    sourceName: 'American Diabetes Association (ADA) — Food & Nutrition Standards',
    sourceUrl: 'https://diabetes.org/food-nutrition',
    reviewDate: '2025-01-15',
    contentOwner: 'MGREFOTS Clinical Safety & Nutrition Review',
  },
  gout: {
    conditionId: 'gout',
    titleByLocale: {
      en: 'Gout — General Dietary Pattern & Uric Acid Education',
      ar: 'النقرس (Gout) — تثقيف غذائي عام حول حمض اليوريك والمهيجات الشائعة',
      fr: 'Goutte — Éducation nutritionnelle générale et acide urique',
      rw: 'Indwara ya Gout — Inama rusange z’imirire',
    },
    summaryByLocale: {
      en: 'While general eating patterns and hydration can support overall health in people with gout, diet alone often cannot normalize serum uric acid and does not replace prescribed urate-lowering medication.',
      ar: 'بينما يساعد النمط الغذائي المتوازن وشرب الماء الكافي في دعم الصحة العامة لمرضى النقرس، فإن النظام الغذائي وحده غالباً لا يكفي لضبط مستوى حمض اليوريك في الدم ولا يغني عن الأدوية الخافضة لحمض اليوريك التي يصفها الطبيب.',
      fr: 'L’alimentation et l’hydratation aident, mais le régime seul ne remplace pas les traitements hypo-uricémiants prescrits.',
      rw: 'Imirire myiza no kunywa amazi birafasha, ariko ibiryo byonyine ntibisimbura imiti muganga yanditse.',
    },
    educationalPointsByLocale: {
      en: [
        'Common dietary triggers to limit include organ meats (liver, kidneys), certain high-purine shellfish/anchovies/sardines, alcohol, and beverages sweetened with high-fructose corn syrup.',
        'Include adequate water intake (unless fluid-restricted by a physician), low-fat dairy, vegetables, whole grains, eggs, and plant proteins.',
        'Avoid rapid crash dieting or fasting, as rapid weight loss and ketosis can temporarily raise uric acid and trigger a gout flare.',
      ],
      ar: [
        'من المهيجات الغذائية الشائعة التي يُنصح بتقليلها: لحوم الأعضاء (الكبد والكلى)، بعض الأسماك عالية البيورين (السردين والأنشوجة)، المشروبات المحلاة بشراب الفركتوز العالي، والكحوليات.',
        'الاهتمام بشرب الماء الكافي (ما لم يكن هناك تقييد سوائل طبي)، وتناول الألبان قليلة الدسم، البيض، الخضروات، والحبوب الكاملة.',
        'تجنب الحميات القاسية السريعة أو الصيام الحاد؛ لأن النزول السريع جداً في الوزن قد يرفع حمض اليوريك مؤقتاً ويهيج نوبة النقرس.',
      ],
      fr: [
        'Limitez les abats, les boissons riches en fructose et l’alcool, et évitez les pertes de poids rapides qui peuvent déclencher une crise.',
        'Maintenez une bonne hydratation et suivez votre traitement médical.',
      ],
      rw: [
        'Gabanya inyama z’imyanya y’imbere (nk’umwijima) n’ibinyobwa birimo isukari nyinshi.',
        'Irinde kugabanya ibiro mu buryo bwihuse cyane kuko bishobora kongera uburibwe.',
      ],
    },
    whatWeDoNotDoByLocale: {
      en: 'We never claim that any food or meal plan cures gout, prevents every flare, or replaces urate-lowering medication.',
      ar: 'لا ندّعي أن أي طعام أو جدول غذائي يشفي النقرس نهائياً أو يمنع جميع النوبات أو يغني عن علاج الطبيب.',
      fr: 'Nous ne prétendons jamais qu’un aliment guérit la goutte ou remplace vos médicaments.',
      rw: 'Ntiduvuga ko ibiryo bikiza Gout burundu cyangwa ngo bisimbure imiti ya muganga.',
    },
    whenToConsultClinicianByLocale: {
      en: 'Consult your rheumatologist or primary care physician for urate-lowering therapy and individualized nutrition guidance.',
      ar: 'راجع طبيب الروماتيزم أو الطبيب المعالج لمتابعة العلاج الدوائي وأهداف التغذية الخاصة بك.',
      fr: 'Consultez votre rhumatologue ou médecin traitant.',
      rw: 'Ganira na muganga wawe ku bijyanye n’imiti n’imirire ikwiye.',
    },
    sourceName: 'American College of Rheumatology (ACR) & Arthritis Foundation — Gout Management',
    sourceUrl: 'https://www.arthritis.org/diseases/gout',
    reviewDate: '2025-01-15',
    contentOwner: 'MGREFOTS Clinical Safety & Nutrition Review',
  },
  possible_lipedema: {
    conditionId: 'possible_lipedema',
    titleByLocale: {
      en: 'Possible or Diagnosed Lipedema — Compassionate, Realistic Guidance',
      ar: 'الوذمة الشحمية المحتملة أو المشخصة (Lipedema) — معلومات علمية واقعية',
      fr: 'Lipoedème possible ou diagnostiqué — Informations réalistes et bienveillantes',
      rw: 'Lipedema ishoboka cyangwa yasuzumwe — Inama rusange z’ubuzima',
    },
    summaryByLocale: {
      en: 'Lipedema is a chronic condition involving symmetrical adipose tissue accumulation (often in the legs, thighs, or hips) that may be accompanied by tenderness, easy bruising, or nodular texture. Only a qualified clinician can diagnose lipedema.',
      ar: 'الوذمة الشحمية (Lipedema) هي حالة مزمنة تتسم بتجمع متناظر للأنسجة الدهنية (غالباً في الفخذين أو الساقين أو الوركين) وقد يصاحبها ألم عند اللمس أو سهولة ظهور الكدمات أو تكتلات تحت الجلد. الطبيب المختص وحده هو من يمكنه تشخيص الحالة.',
      fr: 'Le lipoedème est une affection chronique touchant le tissu adipeux (souvent aux jambes/cuisses). Seul un médecin spécialiste peut poser ce diagnostic.',
      rw: 'Lipedema ni indwara igaragazwa no kwiyongera kw’ibinure ku maguru cyangwa ku matako. Muganga wabyigiye ni we wenyine ushobora kuyisuzuma.',
    },
    educationalPointsByLocale: {
      en: [
        'Realistic expectations: Standard calorie-deficit diets do not selectively "spot-reduce" or eliminate lipedema tissue, and aggressive crash dieting can cause muscle loss and fatigue.',
        'Supportive everyday habits: Whole-food, anti-inflammatory-style balanced meals (vegetables, berries/fruits, omega-3-rich fish, lean proteins, adequate hydration) alongside low-impact movement (swimming, walking, guided strength training) can support mobility, comfort, and overall metabolic health.',
        'Comprehensive care often involves specialist evaluation (vascular, lymphedema/lipedema clinic, compression therapy, and physical therapy).',
      ],
      ar: [
        'توقعات واقعية وصادقة: الحميات الغذائية التقليدية لا تقوم بإزالة تكتلات الوذمة الشحمية موضعياً (Spot reduction)، والحميات القاسية جداً قد تؤدي إلى فقدان الكتلة العضلية والإرهاق دون إزالة نسيج الوذمة.',
        'عادات يومية داعمة: تناول وجبات متوازنة من الأطعمة الكاملة غير المصنعة (الخضروات، الفواكه، الأسماك، البروتينات الكافية) مع الحركة منخفضة الإجهاد للمفاصل (مثل المشي، السباحة، وتمارين المقاومة المتدرجة) يدعم اللياقة العامة وتخفيف الالتهاب والحفاظ على العضلات.',
        'الرعاية المتكاملة تشمل تقييم الطبيب المختص (جراحة الأوعية الدموية أو عيادات الوذمة اللمفاوية/الشحمية والعلاج الطبيعي).',
      ],
      fr: [
        'Attentes réalistes : Aucun régime ne permet une réduction ciblée du tissu lipoedémateux ; évitez les régimes drastiques qui font perdre du muscle.',
        'Une alimentation équilibrée non transformée et une activité douce soutiennent la mobilité et la santé globale.',
      ],
      rw: [
        'Ukuri ku mirire: Nta mirire ikuraho ibinure ku gice kimwe cy’umubiri gusa; irinde kwiyicisha inzara kuko bigabanya imbaraga z’imikaya.',
        'Imirire yuzuye n’imyitozo yoroheje bifasha ubuzima rusange.',
      ],
    },
    whatWeDoNotDoByLocale: {
      en: 'We never diagnose lipedema from leg shape or nodules, never promise spot reduction, and never claim a diet removes lipedema tissue.',
      ar: 'لا يقوم التطبيق بتشخيص الوذمة الشحمية بناءً على شكل الفخذين أو التكتلات، ولا يعد بالتنحيف الموضعي أو إزالة نسيج الوذمة بالحمية.',
      fr: 'Nous ne diagnostiquons jamais le lipoedème et ne promettons aucune perte localisée.',
      rw: 'Ntabwo dusuzuma Lipedema kandi ntidusezeranya kugabanya ibinure ku gice kimwe.',
    },
    whenToConsultClinicianByLocale: {
      en: 'Consult a vascular specialist, lipidologist, or clinician experienced in lipedema/lymphedema for an accurate diagnosis and multidisciplinary care plan.',
      ar: 'استشر طبيب الأوعية الدموية أو المختص في تشخيص وعلاج الوذمة الشحمية واللمفاوية للحصول على تشخيص دقيق وخطة علاجية متكاملة.',
      fr: 'Consultez un médecin vasculaire ou un spécialiste du lipoedème pour un bilan complet.',
      rw: 'Sura muganga w’inzobere kugira ngo agusuzume kandi aguhe inama zihariye.',
    },
    sourceName: 'NHS — Lipoedema Clinical Overview & Self-Care Guidance',
    sourceUrl: 'https://www.nhs.uk/conditions/lipoedema/',
    reviewDate: '2025-01-15',
    contentOwner: 'MGREFOTS Clinical Safety & Nutrition Review',
  },
  other_chronic: {
    conditionId: 'other_chronic',
    titleByLocale: {
      en: 'Chronic Health Condition / Kidney / Cardiac / Pregnancy / Eating History — Clinician-Guided Care',
      ar: 'الحالات الصحية المزمنة أو الحمل أو الكلى أو القلب — رعاية بإشراف طبي مختص',
      fr: 'Condition médicale chronique / Grossesse / Reins / Cœur — Suivi médical requis',
      rw: 'Indwara zidakira / Gutwita / Impyiko / Umutima — Gukurikiranwa na muganga',
    },
    summaryByLocale: {
      en: 'Conditions such as kidney disease, heart failure, pregnancy/breastfeeding, history of disordered eating, or other complex chronic illnesses require individualized Medical Nutrition Therapy (MNT) from a licensed clinician.',
      ar: 'الحالات مثل أمراض الكلى، قصور القلب، الحمل والرضاعة، تاريخ اضطرابات الأكل، أو الأمراض المزمنة الأخرى تتطلب تغذية علاجية طبية مخصصة (Medical Nutrition Therapy) تحت إشراف طبيب أو أخصائي تغذية إكلينيكية مرخص.',
      fr: 'Les maladies rénales, cardiaques, la grossesse, l’allaitement ou les troubles alimentaires nécessitent une prise en charge nutritionnelle médicale personnalisée.',
      rw: 'Indwara z’impyiko, umutima, gutwita cyangwa konsa bisaba gukurikiranwa na muganga w’imirire.',
    },
    educationalPointsByLocale: {
      en: [
        'Kidney disease & heart failure require precise clinician-determined limits for protein, potassium, phosphorus, sodium, and daily fluid volume.',
        'Pregnancy and breastfeeding require specialized energy, folate, iron, iodine, and protein support rather than weight-loss deficits.',
        'If you have a history of disordered eating, numerical calorie/macro tracking is hidden to support a safe, non-restrictive relationship with food.',
      ],
      ar: [
        'أمراض الكلى وقصور القلب تتطلب تحديداً طبياً دقيقاً لكميات البروتين والبوتاسيوم والفوسفور والصوديوم والسوائل اليومية.',
        'الحمل والرضاعة يتطلبان دعماً غذائياً خاصاً للطاق�