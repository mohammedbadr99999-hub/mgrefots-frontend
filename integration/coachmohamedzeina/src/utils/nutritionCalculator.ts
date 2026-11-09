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

import type { Locale } from '../data/muscleGroups.ts';

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
        'الحمل والرضاعة يتطلبان دعماً غذائياً خاصاً للطاقة والحديد وحمض الفوليك والبروتين وليس أنظمة عجز سعرات لإنقاص الوزن.',
        'في حال وجود تاريخ لاضطرابات الأكل، يتجنب التطبيق عرض عدادات السعرات الصارمة لدعم علاقة صحية وآمنة مع الطعام.',
      ],
      fr: [
        'Les apports en protéines, électrolytes et liquides doivent être fixés par votre médecin en cas d’atteinte rénale ou cardiaque.',
        'Aucun objectif de perte de poids n’est appliqué pendant la grossesse ou en cas d’antécédent de trouble alimentaire.',
      ],
      rw: [
        'Ingano ya proteyine, umunyu n’amazi bigombaugenwa na muganga ku barwayi b’impyiko cyangwa umutima.',
        'Abatwite n’abonsa ntibagomba kugabanya ingufu z’ibiryo.',
      ],
    },
    whatWeDoNotDoByLocale: {
      en: 'We pause automated therapeutic meal-plan generation and do not prescribe high-protein loads, fluid targets, or calorie deficits for these conditions.',
      ar: 'يوقف التطبيق التوليد التلقائي للخطط العلاجية ولا يفرض أحمال بروتين عالية أو أهداف سوائل أو عجز سعرات لهذه الحالات.',
      fr: 'Nous ne générons pas de plan thérapeutique automatisé pour ces situations cliniques.',
      rw: 'Ntabwo dukora gahunda y’imirire yikora kuri izi ndwara zikomeye.',
    },
    whenToConsultClinicianByLocale: {
      en: 'Please consult your physician or a registered/licensed clinical dietitian for a personalized care plan.',
      ar: 'يرجى مراجعة طبيبك المعالج أو أخصائي التغذية الإكلينيكية المرخص لوضع خطة غذائية آمنة ومخصصة لحالتك.',
      fr: 'Veuillez consulter votre médecin ou un diététicien clinicien agréé.',
      rw: 'Nyamuneka ganira na muganga wawe cyangwa inzobere mu mirire.',
    },
    sourceName: 'NIDDK (NIH) & World Health Organization — Clinical Nutrition Guidance',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/diet-nutrition',
    reviewDate: '2025-01-15',
    contentOwner: 'MGREFOTS Clinical Safety & Nutrition Review',
  },
};

export interface FoodReferenceItem {
  id: string;
  category: 'protein' | 'carb' | 'fat_veg';
  nameByLocale: { en: string; ar: string; fr: string; rw: string };
  stateLabelByLocale: { en: string; ar: string; fr: string; rw: string };
  householdMeasureByLocale: { en: string; ar: string; fr: string; rw: string };
  sourceRef: string;
  budgetTier: 'low' | 'medium' | 'flexible';
  per100g: {
    kcal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    fiberG: number;
  };
  defaultGrams: number;
  tags: {
    vegan: boolean;
    vegetarian: boolean;
    pescatarian: boolean;
    halalCompatible: boolean;
    allergens: string[];
  };
}

export const VERIFIED_FOOD_DATABASE: FoodReferenceItem[] = [
  // PROTEINS
  {
    id: 'chicken_breast_cooked',
    category: 'protein',
    nameByLocale: {
      en: 'Skinless Chicken Breast',
      ar: 'صدور دجاج بدون جلد',
      fr: 'Blanc de poulet sans peau',
      rw: 'Inkoko idafite uruhu (Chicken breast)',
    },
    stateLabelByLocale: {
      en: 'Cooked / grilled weight (raw ~185g -> cooked 140g)',
      ar: 'وزن مطهو / مشوي (يعادل نحو 185 جم وزن نيئ)',
      fr: 'Poids cuit / grillé (~185g cru)',
      rw: 'Ibiro bitetse (~185g mbisi)',
    },
    householdMeasureByLocale: {
      en: '~1 palm-sized cooked breast per 140g',
      ar: '~قطعة بحجم كف اليد لكل 140 جم مطهو',
      fr: '~1 filet cuit de la taille de la paume (140g)',
      rw: '~Igice kimwe kiri mu kiganza (140g)',
    },
    sourceRef: 'USDA FoodData Central #171477',
    budgetTier: 'medium',
    per100g: { kcal: 165, proteinG: 31.0, carbsG: 0, fatG: 3.6, fiberG: 0 },
    defaultGrams: 140,
    tags: { vegan: false, vegetarian: false, pescatarian: false, halalCompatible: true, allergens: [] },
  },
  {
    id: 'lean_beef_cooked',
    category: 'protein',
    nameByLocale: {
      en: 'Lean Beef Sirloin',
      ar: 'لحم بقري صافي قليل الدهن',
      fr: 'Bœuf maigre grillé',
      rw: 'Inyama y’inka idafite ibinure',
    },
    stateLabelByLocale: {
      en: 'Cooked weight (raw ~175g -> cooked 130g)',
      ar: 'وزن مطهو (يعادل نحو 175 جم وزن نيئ)',
      fr: 'Poids cuit (~175g cru)',
      rw: 'Ibiro bitetse (~175g mbisi)',
    },
    householdMeasureByLocale: {
      en: '~1 deck-of-cards steak portion per 130g',
      ar: '~قطعة متوسطة صافية لكل 130 جم مطهو',
      fr: '~1 portion cuite de 130g',
      rw: '~Igice cya 130g gitetse',
    },
    sourceRef: 'USDA FoodData Central #174032',
    budgetTier: 'flexible',
    per100g: { kcal: 206, proteinG: 29.5, carbsG: 0, fatG: 9.1, fiberG: 0 },
    defaultGrams: 130,
    tags: { vegan: false, vegetarian: false, pescatarian: false, halalCompatible: true, allergens: [] },
  },
  {
    id: 'tilapia_white_fish_cooked',
    category: 'protein',
    nameByLocale: {
      en: 'Baked White Fish / Tilapia',
      ar: 'سمك أبيض / بلطي مشوي',
      fr: 'Poisson blanc / Tilapia au four',
      rw: 'Ifi y’umweru / Tilapia itetse',
    },
    stateLabelByLocale: {
      en: 'Cooked weight (raw ~200g -> cooked 160g)',
      ar: 'وزن مطهو (يعادل نحو 200 جم وزن نيئ)',
      fr: 'Poids cuit (~200g cru)',
      rw: 'Ibiro bitetse (~200g mbisi)',
    },
    householdMeasureByLocale: {
      en: '~1 medium cooked fish fillet per 160g',
      ar: '~شريحة فيليه سمك متوسطة لكل 160 جم مطهو',
      fr: '~1 filet moyen cuit (160g)',
      rw: '~Ifi imwe iringaniye (160g)',
    },
    sourceRef: 'USDA FoodData Central #175177',
    budgetTier: 'medium',
    per100g: { kcal: 128, proteinG: 26.2, carbsG: 0, fatG: 2.7, fiberG: 0 },
    defaultGrams: 160,
    tags: { vegan: false, vegetarian: false, pescatarian: true, halalCompatible: true, allergens: ['fish'] },
  },
  {
    id: 'whole_eggs_cooked',
    category: 'protein',
    nameByLocale: {
      en: 'Whole Eggs (Boiled / Poached)',
      ar: 'بيض كامل مسلوق أو مطهو',
      fr: 'Œufs entiers cuits',
      rw: 'Amagi atetse',
    },
    stateLabelByLocale: {
      en: 'Cooked edible weight without shell',
      ar: 'وزن مطهو صافي بدون قشر',
      fr: 'Poids cuit sans coquille',
      rw: 'Ibiro bitetse bidafite igishishwa',
    },
    householdMeasureByLocale: {
      en: '~3 large eggs per 150g (~50g per egg)',
      ar: '~3 بيضات كبيرة لكل 150 جم (البيضة ~50 جم)',
      fr: '~3 grands œufs pour 150g',
      rw: '~Amagi 3 manini kuri 150g',
    },
    sourceRef: 'USDA FoodData Central #173424',
    budgetTier: 'low',
    per100g: { kcal: 155, proteinG: 12.6, carbsG: 1.1, fatG: 10.6, fiberG: 0 },
    defaultGrams: 150,
    tags: { vegan: false, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: ['eggs'] },
  },
  {
    id: 'greek_yogurt_plain',
    category: 'protein',
    nameByLocale: {
      en: 'Plain Low-Fat Greek Yogurt / Laban',
      ar: 'زبادي يوناني أو زبادي سادة قليل الدسم',
      fr: 'Yaourt grec nature léger',
      rw: 'Yahurute (Plain Greek Yogurt)',
    },
    stateLabelByLocale: {
      en: 'Ready-to-eat chilled weight',
      ar: 'وزن جاهز للأكل مباشرة',
      fr: 'Poids prêt à consommer',
      rw: 'Ibiro byiteguye kuribwa',
    },
    householdMeasureByLocale: {
      en: '~1 standard cup / bowl per 200g',
      ar: '~كوب قياسي واحد لكل 200 جم',
      fr: '~1 bol / pot de 200g',
      rw: '~Igikombe 1 (200g)',
    },
    sourceRef: 'USDA FoodData Central #170903',
    budgetTier: 'medium',
    per100g: { kcal: 73, proteinG: 9.9, carbsG: 3.9, fatG: 1.9, fiberG: 0 },
    defaultGrams: 200,
    tags: { vegan: false, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: ['dairy'] },
  },
  {
    id: 'lentils_beans_cooked',
    category: 'protein',
    nameByLocale: {
      en: 'Cooked Lentils & Red Kidney Beans',
      ar: 'عدس وفاصوليا حمراء مطهوة (مسلوقة)',
      fr: 'Lentilles et haricots rouges cuits',
      rw: 'Ibishyimbo n’inkori bitetse',
    },
    stateLabelByLocale: {
      en: 'Boiled / cooked drained weight (dry ~75g -> cooked 200g)',
      ar: 'وزن مطهو مصفى (يعادل نحو 75 جم وزن جاف قبل السلق)',
      fr: 'Poids cuit égoutté (~75g sec)',
      rw: 'Ibiro bitetse (~75g byumye)',
    },
    householdMeasureByLocale: {
      en: '~1 heaping cup cooked per 200g',
      ar: '~كوب ممتلئ مطهو لكل 200 جم',
      fr: '~1 grande tasse cuite (200g)',
      rw: '~Igikombe 1 cyuzuye gitetse (200g)',
    },
    sourceRef: 'USDA FoodData Central #172421',
    budgetTier: 'low',
    per100g: { kcal: 116, proteinG: 9.0, carbsG: 20.1, fatG: 0.4, fiberG: 7.9 },
    defaultGrams: 200,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: [] },
  },
  {
    id: 'firm_tofu_cooked',
    category: 'protein',
    nameByLocale: {
      en: 'Firm Tofu / Soy Bean Curd',
      ar: 'توفو نباتي متماسك مطهو',
      fr: 'Tofu ferme cuit',
      rw: 'Tofu (Ibikomoka kuri soya)',
    },
    stateLabelByLocale: {
      en: 'Pressed prepared weight',
      ar: 'وزن جاهز ومصفى',
      fr: 'Poids préparé',
      rw: 'Ibiro bitetse',
    },
    householdMeasureByLocale: {
      en: '~3/4 cup cubed tofu per 160g',
      ar: '~ثلاثة أرباع كوب مكعبات لكل 160 جم',
      fr: '~3/4 tasse en dés (160g)',
      rw: '~3/4 by’igikombe (160g)',
    },
    sourceRef: 'USDA FoodData Central #172476',
    budgetTier: 'medium',
    per100g: { kcal: 144, proteinG: 17.3, carbsG: 2.8, fatG: 8.7, fiberG: 2.3 },
    defaultGrams: 160,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: ['soy'] },
  },

  // CARBOHYDRATES & GRAINS
  {
    id: 'white_basmati_rice_cooked',
    category: 'carb',
    nameByLocale: {
      en: 'Steamed White / Basmati Rice',
      ar: 'أرز أبيض / بسمتي مطهو بالبخار',
      fr: 'Riz blanc / Basmati cuit',
      rw: 'Umuceri utetse',
    },
    stateLabelByLocale: {
      en: 'Cooked weight (raw dry rice ~60g -> cooked 180g)',
      ar: 'وزن مطهو (يعادل نحو 60 جم أرز جاف قبل الطهي)',
      fr: 'Poids cuit (~60g cru sec)',
      rw: 'Ibiro bitetse (~60g umuceri mubisi)',
    },
    householdMeasureByLocale: {
      en: '~1 standard cup cooked rice per 180g',
      ar: '~كوب واحد مطهو لكل 180 جم',
      fr: '~1 tasse de riz cuit (180g)',
      rw: '~Igikombe 1 cy’umuceri utetse (180g)',
    },
    sourceRef: 'USDA FoodData Central #168878',
    budgetTier: 'low',
    per100g: { kcal: 130, proteinG: 2.7, carbsG: 28.2, fatG: 0.3, fiberG: 0.4 },
    defaultGrams: 180,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: [] },
  },
  {
    id: 'rolled_oats_dry',
    category: 'carb',
    nameByLocale: {
      en: 'Rolled Oats (Oatmeal)',
      ar: 'شوفان كامل الحبة',
      fr: 'Flocons d’avoine',
      rw: 'Oats (Ingano za Oatmeal)',
    },
    stateLabelByLocale: {
      en: 'Dry weight before cooking with water/milk',
      ar: 'وزن جاف قبل الطهي بالماء أو الحليب',
      fr: 'Poids sec avant cuisson',
      rw: 'Ibiro byumye mbere yo guteka',
    },
    householdMeasureByLocale: {
      en: '~2/3 cup dry rolled oats per 60g',
      ar: '~ثلثا كوب شوفان جاف (نحو 6 ملاعق كبيرة) لكل 60 جم',
      fr: '~2/3 tasse de flocons secs (60g)',
      rw: '~2/3 by’igikombe cyumye (60g)',
    },
    sourceRef: 'USDA FoodData Central #173904',
    budgetTier: 'low',
    per100g: { kcal: 379, proteinG: 13.2, carbsG: 67.7, fatG: 6.5, fiberG: 10.1 },
    defaultGrams: 60,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: ['gluten'] },
  },
  {
    id: 'sweet_potato_baked',
    category: 'carb',
    nameByLocale: {
      en: 'Baked or Boiled Sweet Potato',
      ar: 'بطاطا حلوة مشوية أو مسلوقة',
      fr: 'Patate douce cuite',
      rw: 'Ikijumba gitetse',
    },
    stateLabelByLocale: {
      en: 'Cooked flesh weight without skin',
      ar: 'وزن مطهو صافي بدون قشر',
      fr: 'Poids cuit sans peau',
      rw: 'Ibiro bitetse',
    },
    householdMeasureByLocale: {
      en: '~1 medium-large sweet potato per 220g',
      ar: '~ثمرة بطاطا متوسطة إلى كبيرة لكل 220 جم',
      fr: '~1 patate douce moyenne-grande (220g)',
      rw: '~Ikijumba 1 kiringaniye (220g)',
    },
    sourceRef: 'USDA FoodData Central #168483',
    budgetTier: 'low',
    per100g: { kcal: 90, proteinG: 2.0, carbsG: 20.7, fatG: 0.2, fiberG: 3.3 },
    defaultGrams: 220,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: [] },
  },
  {
    id: 'boiled_potatoes',
    category: 'carb',
    nameByLocale: {
      en: 'Boiled or Oven-Roasted White Potatoes',
      ar: 'بطاطس مسلوقة أو مشوية بالفرن بدون قلي',
      fr: 'Pommes de terre bouillies ou rôties',
      rw: 'Ibirayi bitetse mu mazi',
    },
    stateLabelByLocale: {
      en: 'Cooked weight',
      ar: 'وزن مطهو',
      fr: 'Poids cuit',
      rw: 'Ibiro bitetse',
    },
    householdMeasureByLocale: {
      en: '~2 medium boiled potatoes per 240g',
      ar: '~حبتا بطاطس متوسطتان لكل 240 جم مطهو',
      fr: '~2 pommes de terre moyennes (240g)',
      rw: '~Ibirayi 2 biringaniye (240g)',
    },
    sourceRef: 'USDA FoodData Central #170030',
    budgetTier: 'low',
    per100g: { kcal: 87, proteinG: 1.9, carbsG: 20.1, fatG: 0.1, fiberG: 1.8 },
    defaultGrams: 240,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: [] },
  },
  {
    id: 'whole_wheat_bread_flatbread',
    category: 'carb',
    nameByLocale: {
      en: 'Whole-Grain Bread / Baladi Flatbread',
      ar: 'خبز قمح كامل / خبز بلدي أسمر',
      fr: 'Pain complet / Pain plat complet',
      rw: 'Umugati w’ingano zuzuye',
    },
    stateLabelByLocale: {
      en: 'Ready baked weight',
      ar: 'وزن جاهز للأكل',
      fr: 'Poids prêt à consommer',
      rw: 'Ibiro byiteguye',
    },
    householdMeasureByLocale: {
      en: '~1 medium flatbread or 2 thick slices per 80g',
      ar: '~رغيف أسمر متوسط أو شريحتا توست سميكتان لكل 80 جم',
      fr: '~2 tranches épaisses ou 1 pain plat (80g)',
      rw: '~Imigati 2 mito (80g)',
    },
    sourceRef: 'USDA FoodData Central #172688',
    budgetTier: 'low',
    per100g: { kcal: 252, proteinG: 12.5, carbsG: 42.7, fatG: 3.5, fiberG: 6.0 },
    defaultGrams: 80,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: ['gluten'] },
  },

  // HEALTHY FATS, FRUITS & VEGETABLES
  {
    id: 'olive_oil_veggies',
    category: 'fat_veg',
    nameByLocale: {
      en: 'Mixed Greens, Cucumber, Tomato & Olive Oil',
      ar: 'سلطة خضراء مشكلة (خيار، طماطم، ورقيات) مع زيت زيتون',
      fr: 'Salade verte, concombre, tomate & huile d’olive',
      rw: 'Imboga rwatsi, inyanya, concombre n’amavuta ya elayo',
    },
    stateLabelByLocale: {
      en: '180g raw fresh vegetables + 10g extra-virgin olive oil',
      ar: '180 جم خضار طازج نيئ + 10 جم زيت زيتون بكر',
      fr: '180g légumes crus + 10g huile d’olive',
      rw: '180g imboga mbisi + 10g amavuta ya elayo',
    },
    householdMeasureByLocale: {
      en: '~1 large salad bowl + 2 teaspoons olive oil per 190g',
      ar: '~طبق سلطة كبير + ملعقتان صغيرتان زيت زيتون لكل 190 جم',
      fr: '~1 grand bol de salade + 2 c.à.c d’huile (190g)',
      rw: '~Ibakure 1 y’imboga + utuyiko 2 tw’amavuta (190g)',
    },
    sourceRef: 'USDA FoodData Central #171413 + Veg',
    budgetTier: 'low',
    per100g: { kcal: 62, proteinG: 0.9, carbsG: 3.2, fatG: 5.3, fiberG: 1.5 },
    defaultGrams: 190,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: [] },
  },
  {
    id: 'avocado_spinach_bowl',
    category: 'fat_veg',
    nameByLocale: {
      en: 'Fresh Avocado & Steamed Leafy Greens',
      ar: 'شرائح أفوكادو طازجة مع خضروات ورقية مطهوة',
      fr: 'Avocat frais et légumes verts vapeur',
      rw: 'Avoka n’imboga rwatsi zitetse',
    },
    stateLabelByLocale: {
      en: '80g raw avocado + 120g cooked greens',
      ar: '80 جم أفوكادو طازج + 120 جم خضار ورقي مطهو',
      fr: '80g avocat cru + 120g légumes cuits',
      rw: '80g avoka + 120g imboga zitetse',
    },
    householdMeasureByLocale: {
      en: '~1/2 medium avocado + 1 cup cooked greens per 200g',
      ar: '~نصف ثمرة أفوكادو + كوب خضار مطهو لكل 200 جم',
      fr: '~1/2 avocat + 1 tasse de légumes verts (200g)',
      rw: '~1/2 cya avoka + igikombe 1 cy’imboga (200g)',
    },
    sourceRef: 'USDA FoodData Central #171705',
    budgetTier: 'medium',
    per100g: { kcal: 82, proteinG: 1.9, carbsG: 5.4, fatG: 6.1, fiberG: 3.8 },
    defaultGrams: 200,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: [] },
  },
  {
    id: 'banana_almonds',
    category: 'fat_veg',
    nameByLocale: {
      en: 'Medium Banana & Raw Unsalted Almonds',
      ar: 'موزة متوسطة مع حفنة لوز نيئ غير مملح',
      fr: 'Banane moyenne et amandes crues non salées',
      rw: 'Umuneke n’ubunyobwa / Almonds zidatetse',
    },
    stateLabelByLocale: {
      en: '110g peeled raw banana + 20g raw almonds',
      ar: '110 جم موز مقشر + 20 جم لوز نيئ',
      fr: '110g banane épluchée + 20g amandes crues',
      rw: '110g umuneke + 20g almonds',
    },
    householdMeasureByLocale: {
      en: '~1 medium banana + ~15 almonds per 130g',
      ar: '~موزة متوسطة + نحو 15 حبة لوز لكل 130 جم',
      fr: '~1 banane moyenne + ~15 amandes (130g)',
      rw: '~Umuneke 1 + almonds ~15 (130g)',
    },
    sourceRef: 'USDA FoodData Central #173944 + #170567',
    budgetTier: 'medium',
    per100g: { kcal: 165, proteinG: 4.2, carbsG: 22.5, fatG: 7.9, fiberG: 4.1 },
    defaultGrams: 130,
    tags: { vegan: true, vegetarian: true, pescatarian: true, halalCompatible: true, allergens: ['tree_nuts'] },
  },
];

export interface CalculatedItemPortion {
  foodId: string;
  grams: number;
  kcal: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG: number;
}

export interface GeneratedMealCard {
  mealIndex: number;
  titleByLocale: { en: string; ar: string; fr: string; rw: string };
  items: CalculatedItemPortion[];
  alternativeFoodIds: string[];
  totals: {
    kcal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    fiberG: number;
  };
}

export interface NutritionPlanResult {
  createdAt: string;
  pathway: NutritionPathway;
  goal: GoalType;
  requiresSpecialistReferral: boolean;
  isUrgentSymptomStop: boolean;
  isUnder18Stop: boolean;
  activeClinicalGuidanceIds: string[];
  hasNumericTargets: boolean;
  showWaterTarget: boolean;
  estimatedTargets: {
    bmrKcal: number | null;
    tdeeKcal: number | null;
    targetKcal: number | null;
    targetKcalRangeLow: number | null;
    targetKcalRangeHigh: number | null;
    proteinG: number | null;
    carbsG: number | null;
    fatG: number | null;
    fiberG: number | null;
    waterLiters: number | null;
  };
  meals: GeneratedMealCard[];
  dailyTotals: {
    kcal: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    fiberG: number;
  };
  equationDocumentation: string;
  skippedScreeningNotice: boolean;
}

export function convertWeightToKg(val: number | null, unit: 'kg' | 'lb'): number | null {
  if (!val || val <= 0) return null;
  return unit === 'kg' ? val : Math.round(val * 0.45359237 * 10) / 10;
}

export function convertHeightToCm(
  cm: number | null,
  feet: number | null,
  inches: number | null,
  unit: 'cm' | 'ft_in'
): number | null {
  if (unit === 'cm') {
    return cm && cm > 0 ? cm : null;
  }
  if (!feet || feet <= 0) return null;
  const totalInches = feet * 12 + (inches || 0);
  return Math.round(totalInches * 2.54 * 10) / 10;
}

export function calculateItemMacros(food: FoodReferenceItem, grams: number): CalculatedItemPortion {
  const safeGrams = Math.max(20, Math.min(800, Math.round(grams)));
  const ratio = safeGrams / 100;
  const proteinG = Math.round(food.per100g.proteinG * ratio);
  const carbsG = Math.round(food.per100g.carbsG * ratio);
  const fatG = Math.round(food.per100g.fatG * ratio);
  const fiberG = Math.round(food.per100g.fiberG * ratio * 10) / 10;
  const kcal = Math.round(food.per100g.kcal * ratio);
  return {
    foodId: food.id,
    grams: safeGrams,
    kcal,
    proteinG,
    carbsG,
    fatG,
    fiberG,
  };
}

export function recomputeMealAndDailyTotals(meals: GeneratedMealCard[]): {
  meals: GeneratedMealCard[];
  dailyTotals: { kcal: number; proteinG: number; carbsG: number; fatG: number; fiberG: number };
} {
  const updatedMeals = meals.map((m) => {
    const totals = m.items.reduce(
      (acc, item) => ({
        kcal: acc.kcal + item.kcal,
        proteinG: acc.proteinG + item.proteinG,
        carbsG: acc.carbsG + item.carbsG,
        fatG: acc.fatG + item.fatG,
        fiberG: Math.round((acc.fiberG + (item.fiberG || 0)) * 10) / 10,
      }),
      { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0 }
    );
    return { ...m, totals };
  });

  const dailyTotals = updatedMeals.reduce(
    (acc, m) => ({
      kcal: acc.kcal + m.totals.kcal,
      proteinG: acc.proteinG + m.totals.proteinG,
      carbsG: acc.carbsG + m.totals.carbsG,
      fatG: acc.fatG + m.totals.fatG,
      fiberG: Math.round((acc.fiberG + m.totals.fiberG) * 10) / 10,
    }),
    { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0 }
  );

  return { meals: updatedMeals, dailyTotals };
}

/**
 * Deterministic Weekly Check-In Adjustment Calculator
 */
export function computeWeeklyCheckInAdjustment(
  goal: GoalType,
  checkIn: WeeklyCheckInData
): { recommendedDeltaKcal: number; rationaleByLocale: Record<Locale, string> } {
  if (goal === 'build_muscle') {
    if (checkIn.weightChangeTrend === 'maintained' || checkIn.weightChangeTrend === 'lost_steady' || checkIn.weightChangeTrend === 'lost_fast') {
      return {
        recommendedDeltaKcal: 150,
        rationaleByLocale: {
          en: 'Weight has not increased toward your muscle-building goal. Adding a modest +150 kcal/day supports gradual lean mass gain.',
          ar: 'لم يزد الوزن نحو هدف بناء العضلات؛ تمت إضافة +150 سعرة يومياً بشكل متدرج لدعم البناء العضلي.',
          fr: 'Le poids n’a pas augmenté ; un ajout modéré de +150 kcal/jour soutient la prise de muscle.',
          rw: 'Ibiro ntibyiyongereye; kongeraho +150 kcal/umunsi bifasha kubaka imikaya gahoro gahoro.',
        },
      };
    }
    if (checkIn.weightChangeTrend === 'gained_fast') {
      return {
        recommendedDeltaKcal: -120,
        rationaleByLocale: {
          en: 'Weight is rising faster than needed for lean muscle gain. Trimming 120 kcal/day keeps the surplus modest and limits excess fat gain.',
          ar: 'الوزن يزداد بسرعة أكبر من المطلوب للبناء العضلي الصافي؛ تم تقليل الفائض بمقدار 120 سعرة يومياً لتقليل تخزين الدهون.',
          fr: 'La prise de poids est rapide ; réduire de 120 kcal/jour maintient un surplus modéré.',
          rw: 'Ibiro byiyongera vuba cyane; kugabanya 120 kcal/umunsi bifasha kwirinda ibinure.',
        },
      };
    }
  }

  if (goal === 'lose_fat') {
    if (checkIn.hungerLevel === 'high' || checkIn.trainingPerformance === 'fatigued' || checkIn.weightChangeTrend === 'lost_fast') {
      return {
        recommendedDeltaKcal: 150,
        rationaleByLocale: {
          en: 'High hunger, training fatigue, or rapid weight loss indicates the deficit may be too steep. Adding +150 kcal/day helps preserve muscle and recovery.',
          ar: 'الشعور بجوع مرتفع أو إرهاق في التمرين أو نزول سريع جداً يشير إلى أن العجز قد يكون حاداً؛ تمت إضافة +150 سعرة للحفاظ على العضلات والاستشفاء.',
          fr: 'La faim élevée ou la fatigue indique un déficit trop fort ; +150 kcal/jour aide à préserver le muscle.',
          rw: 'Inzara nyinshi cyangwa umunaniro mu myitozo bigaragaza ko wagabanyije cyane; kongeraho +150 kcal birinda imikaya.',
        },
      };
    }
    if (checkIn.weightChangeTrend === 'maintained' || checkIn.weightChangeTrend === 'gained_steady') {
      if (checkIn.adherenceLevel === 'high') {
        return {
          recommendedDeltaKcal: -120,
          rationaleByLocale: {
            en: 'With strong adherence and stable weight, a gentle -120 kcal/day adjustment restarts gradual fat loss while protecting training performance.',
            ar: 'مع التزامك العالي وثبات الوزن، تم تطبيق تعديل لطيف (-120 سعرة يومياً) لتحفيز نزول الدهون تدريجياً مع حماية الأداء التدريبي.',
            fr: 'Avec une bonne adhésion et un poids stable, un ajustement de -120 kcal/jour relance une perte progressive.',
            rw: 'Kubera ko ukurikiza gahunda neza ariko ibiro ntibigabanuke, kugabanya -120 kcal/umunsi birafasha.',
          },
        };
      }
    }
  }

  return {
    recommendedDeltaKcal: 0,
    rationaleByLocale: {
      en: 'Your current pace, hunger, and training recovery are well balanced. Keep your daily targets steady for the next week.',
      ar: 'معدل التقدم الحالي ومستوى الشبع والأداء في التمرين متوازنون بشكل ممتاز. استمر على نفس الأهداف للأسبوع القادم.',
      fr: 'Votre rythme actuel et votre récupération sont équilibrés. Gardez les mêmes cibles cette semaine.',
      rw: 'Intambwe ugezeho n’imbaraga mu myitozo bimeze neza. Komeza kuri iyi gahunda.',
    },
  };
}

export function buildProgrammaticNutritionPlan(data: NutritionAssessmentData): NutritionPlanResult {
  const weightKg = convertWeightToKg(data.weightValue, data.weightUnit);
  const heightCm = convertHeightToCm(
    data.heightCm,
    data.heightFeet,
    data.heightInches,
    data.heightUnit
  );
  const age = data.age;
  const hs = data.healthScreening || DEFAULT_HEALTH_SCREENING;
  const pathway: NutritionPathway = data.pathway || 'general_fitness';

  const isUnder18Stop = age !== null && age < 18;
  const isUrgentSymptomStop = Boolean(
    hs.hasUrgentSymptoms || hs.hasBpDizzinessOrFainting
  );

  // Collect all active clinical condition IDs
  const activeClinicalGuidanceIds: string[] = [];
  if (isUrgentSymptomStop) {
    activeClinicalGuidanceIds.push('urgent_symptoms');
  }
  if (isUnder18Stop) {
    activeClinicalGuidanceIds.push('under_18');
  }

  for (const cond of hs.selectedConditions) {
    if (CLINICAL_HEALTH_GUIDANCE[cond] && !activeClinicalGuidanceIds.includes(cond)) {
      activeClinicalGuidanceIds.push(cond);
    } else if (
      ['kidney_disease', 'heart_failure', 'pregnant_lactating', 'eating_disorder_history'].includes(cond) &&
      !activeClinicalGuidanceIds.includes('other_chronic')
    ) {
      activeClinicalGuidanceIds.push('other_chronic');
    }
  }

  if (
    (data.healthFlag === 'pregnant_lactating' ||
      data.healthFlag === 'medical_condition' ||
      data.healthFlag === 'eating_disorder_history') &&
    activeClinicalGuidanceIds.length === 0
  ) {
    activeClinicalGuidanceIds.push('other_chronic');
  }

  if (
    pathway === 'health_condition' &&
    activeClinicalGuidanceIds.length === 0
  ) {
    activeClinicalGuidanceIds.push('other_chronic');
  }

  const hasAnyClinicalCondition =
    isUrgentSymptomStop ||
    isUnder18Stop ||
    pathway === 'health_condition' ||
    hs.selectedConditions.length > 0 ||
    hs.takesSafetyCriticalMedications === 'yes' ||
    hs.usesInsulinOrHypoglycemiaMeds === 'yes' ||
    data.healthFlag === 'pregnant_lactating' ||
    data.healthFlag === 'medical_condition' ||
    data.healthFlag === 'eating_disorder_history';

  const requiresSpecialistReferral = hasAnyClinicalCondition;

  const skippedScreeningNotice =
    hs.screeningStatus === 'prefer_not' ||
    hs.screeningStatus === 'unsure' ||
    data.healthFlag === 'prefer_not';

  const canCalculateBmr =
    weightKg !== null &&
    heightCm !== null &&
    age !== null &&
    age >= 18 &&
    !requiresSpecialistReferral;

  let bmrKcal: number | null = null;
  let tdeeKcal: number | null = null;
  let targetKcal: number | null = null;
  let targetKcalRangeLow: number | null = null;
  let targetKcalRangeHigh: number | null = null;
  let targetProteinG: number | null = null;
  let targetCarbsG: number | null = null;
  let targetFatG: number | null = null;
  let targetFiberG: number | null = null;
  let waterLiters: number | null = null;

  if (canCalculateBmr && weightKg && heightCm && age) {
    const sexConstant =
      data.sexForEquation === 'male'
        ? 5
        : data.sexForEquation === 'female'
        ? -161
        : -78; // midpoint estimate if user prefers not to specify sex
    bmrKcal = Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + sexConstant);

    const activityMultipliers: Record<DailyActivityLevel, number> = {
      sedentary: 1.2,
      light: 1.32,
      moderate: 1.45,
      active: 1.6,
    };
    const baseDailyExpenditure = bmrKcal * activityMultipliers[data.dailyActivity];

    const metByTraining: Record<TrainingType, number> = {
      none: 0,
      resistance: 4.5,
      cardio: 6.5,
      mixed: 5.5,
    };
    const weeklyTrainingHours =
      (Math.min(7, Math.max(0, data.trainingDaysPerWeek)) *
        Math.min(180, Math.max(0, data.sessionDurationMinutes))) /
      60;
    const dailyTrainingKcal =
      (weeklyTrainingHours * metByTraining[data.trainingType] * weightKg) / 7;

    tdeeKcal = Math.round(baseDailyExpenditure + dailyTrainingKcal);

    const pace = data.pacePreference || 'moderate';
    const checkInDelta = data.weeklyCheckIn?.kcalAdjustmentApplied || 0;

    if (data.goal === 'lose_fat') {
      const deficitRatio = pace === 'conservative' ? 0.88 : 0.84; // modest 12% to 16% deficit
      targetKcal = Math.max(1350, Math.round(tdeeKcal * deficitRatio) + checkInDelta);
    } else if (data.goal === 'build_muscle') {
      const surplus = pace === 'conservative' ? 180 : 260; // modest +180 to +260 kcal surplus
      targetKcal = Math.round(tdeeKcal + surplus + checkInDelta);
    } else {
      targetKcal = Math.round(tdeeKcal + checkInDelta);
    }

    // Express energy target as a practical ±100 kcal range to avoid false precision
    targetKcalRangeLow = Math.max(1250, Math.round((targetKcal - 100) / 10) * 10);
    targetKcalRangeHigh = Math.round((targetKcal + 100) / 10) * 10;

    const proteinPerKg =
      data.goal === 'build_muscle' || data.goal === 'lose_fat' ? 1.8 : 1.5;
    targetProteinG = Math.round(weightKg * proteinPerKg);
    targetFatG = Math.round((targetKcal * 0.27) / 9);
    const remainingKcal = Math.max(
      400,
      targetKcal - targetProteinG * 4 - targetFatG * 9
    );
    targetCarbsG = Math.round(remainingKcal / 4);
    targetFiberG = Math.max(24, Math.min(42, Math.round((targetKcal / 1000) * 14)));
    waterLiters = Math.round((weightKg * 0.033 + (weeklyTrainingHours > 0 ? 0.35 : 0)) * 10) / 10;
  }

  // Filter foods strictly respecting dietary pattern, halal, budget, and allergies
  const allowedFoods = VERIFIED_FOOD_DATABASE.filter((f) => {
    if (data.dietPattern === 'vegan' && !f.tags.vegan) return false;
    if (data.dietPattern === 'vegetarian' && !f.tags.vegetarian) return false;
    if (data.dietPattern === 'pescatarian' && !f.tags.pescatarian) return false;
    if (data.halalPreference && !f.tags.halalCompatible) return false;
    for (const alg of data.allergies) {
      if (f.tags.allergens.includes(alg)) return false;
    }
    return true;
  });

  // Prioritize low-cost staple foods when budget === 'low'
  const sortByBudget = (items: FoodReferenceItem[]) => {
    if (data.budget !== 'low') return items;
    return [...items].sort((a, b) => {
      const rank = { low: 0, medium: 1, flexible: 2 };
      return rank[a.budgetTier] - rank[b.budgetTier];
    });
  };

  const proteins = sortByBudget(allowedFoods.filter((f) => f.category === 'protein'));
  const carbs = sortByBudget(allowedFoods.filter((f) => f.category === 'carb'));
  const fatVegs = sortByBudget(allowedFoods.filter((f) => f.category === 'fat_veg'));

  const safeProteins =
    proteins.length > 0
      ? proteins
      : VERIFIED_FOOD_DATABASE.filter((f) => f.id === 'lentils_beans_cooked');
  const safeCarbs =
    carbs.length > 0
      ? carbs
      : VERIFIED_FOOD_DATABASE.filter((f) => f.id === 'white_basmati_rice_cooked');
  const safeFatVegs =
    fatVegs.length > 0
      ? fatVegs
      : VERIFIED_FOOD_DATABASE.filter((f) => f.id === 'olive_oil_veggies');

  const meals: GeneratedMealCard[] = [];

  // Only auto-generate a structured meal plan when it is safe to do so (no urgent symptoms or unreviewed clinical condition)
  if (!requiresSpecialistReferral) {
    const scaleFactor = targetKcal ? targetKcal / 2000 : 1.0;
    const mealsCount = data.mealsPerDay || 3;
    const perMealScale = (scaleFactor * 3) / mealsCount;

    const mealTitles = [
      {
        en: 'Meal 1 — Morning Foundation',
        ar: 'الوجبة الأولى — الإفطار المتوازن',
        fr: 'Repas 1 — Petit-déjeuner équilibré',
        rw: 'Ifunguro rya 1 — Mu gitondo',
      },
      {
        en: 'Meal 2 — Midday Fuel & Training Support',
        ar: 'الوجبة الثانية — الغداء ودعم النشاط',
        fr: 'Repas 2 — Déjeuner et soutien à l’effort',
        rw: 'Ifunguro rya 2 — Ku manywa',
      },
      {
        en: 'Meal 3 — Evening Recovery & Muscle Maintenance',
        ar: 'الوجبة الثالثة — العشاء والاستشفاء العضلي',
        fr: 'Repas 3 — Dîner et récupération musculaire',
        rw: 'Ifunguro rya 3 — Nimugoroba',
      },
      {
        en: 'Meal 4 — Structured Nourishment',
        ar: 'الوجبة الرابعة — وجبة تكميلية منظمة',
        fr: 'Repas 4 — Collation structurée',
        rw: 'Ifunguro rya 4 — Inyongera',
      },
    ];

    for (let i = 0; i < mealsCount; i++) {
      const pFood = safeProteins[i % safeProteins.length];
      const cFood = safeCarbs[i % safeCarbs.length];
      const fvFood = safeFatVegs[i % safeFatVegs.length];

      const pGrams = Math.max(
        80,
        Math.round((pFood.defaultGrams * perMealScale) / 10) * 10
      );
      const cGrams = Math.max(
        50,
        Math.round((cFood.defaultGrams * perMealScale) / 10) * 10
      );
      const fvGrams = Math.max(
        90,
        Math.round((fvFood.defaultGrams * perMealScale) / 10) * 10
      );

      const items = [
        calculateItemMacros(pFood, pGrams),
        calculateItemMacros(cFood, cGrams),
        calculateItemMacros(fvFood, fvGrams),
      ];

      const totals = items.reduce(
        (acc, item) => ({
          kcal: acc.kcal + item.kcal,
          proteinG: acc.proteinG + item.proteinG,
          carbsG: acc.carbsG + item.carbsG,
          fatG: acc.fatG + item.fatG,
          fiberG: Math.round((acc.fiberG + item.fiberG) * 10) / 10,
        }),
        { kcal: 0, proteinG: 0, carbsG: 0, fatG: 0, fiberG: 0 }
      );

      const altIds = safeProteins
        .filter((x) => x.id !== pFood.id)
        .slice(0, 3)
        .map((x) => x.id);

      meals.push({
        mealIndex: i,
        titleByLocale: mealTitles[i],
        items,
        alternativeFoodIds: altIds,
        totals,
      });
    }
  }

  const { dailyTotals } = recomputeMealAndDailyTotals(meals);

  return {
    createdAt: new Date().toISOString(),
    pathway,
    goal: data.goal,
    requiresSpecialistReferral,
    isUrgentSymptomStop,
    isUnder18Stop,
    activeClinicalGuidanceIds,
    hasNumericTargets: canCalculateBmr && !requiresSpecialistReferral,
    showWaterTarget: canCalculateBmr && !requiresSpecialistReferral,
    estimatedTargets: {
      bmrKcal: requiresSpecialistReferral ? null : bmrKcal,
      tdeeKcal: requiresSpecialistReferral ? null : tdeeKcal,
      targetKcal: requiresSpecialistReferral ? null : targetKcal,
      targetKcalRangeLow: requiresSpecialistReferral ? null : targetKcalRangeLow,
      targetKcalRangeHigh: requiresSpecialistReferral ? null : targetKcalRangeHigh,
      proteinG: requiresSpecialistReferral ? null : targetProteinG,
      carbsG: requiresSpecialistReferral ? null : targetCarbsG,
      fatG: requiresSpecialistReferral ? null : targetFatG,
      fiberG: requiresSpecialistReferral ? null : targetFiberG,
      waterLiters: requiresSpecialistReferral ? null : waterLiters,
    },
    meals,
    dailyTotals,
    equationDocumentation:
      'Mifflin-St Jeor (1990) + Separated Daily Movement (NEAT/PAL) & Training METs + USDA FoodData Central Reference Values',
    skippedScreeningNotice,
  };
}
