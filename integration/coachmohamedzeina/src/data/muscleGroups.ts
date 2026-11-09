export type Locale = 'en' | 'ar' | 'fr' | 'rw';

export type MuscleGroupId =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'forearms'
  | 'quadriceps'
  | 'hamstrings'
  | 'glutes'
  | 'calves'
  | 'trapezius'
  | 'abs-core'
  | 'hip-adductors'
  | 'hip-abductors';

export type ContentType =
  | 'full_tutorial'
  | 'video_segment'
  | 'short_demo'
  | 'technique_discussion';

export type EmbedStatus =
  | 'untested'
  | 'working'
  | 'blocked'
  | 'unavailable'
  | 'unknown';

export type TechniqueReviewStatus = 'reviewed' | 'unreviewed';

export interface SupportingReference {
  title: string;
  url: string;
}

export interface TechniqueGuide {
  setup?: string[];
  execution?: string[];
  commonMistakes?: string[];
  breathing?: string;
  source: string;
  reviewedAt: string;
}

export interface ExerciseItem {
  id: string;
  muscleGroupId: MuscleGroupId;
  displayOrder: number;
  nameOriginal: string;
  nameByLocale: Record<Locale, string>;
  originalUrl: string;
  videoId: string;
  startSeconds: number;
  endSeconds: number | null;
  creator: string | null;
  equipment: string | null;
  contentType: ContentType;
  sourceFile: string;
  sourcePage: number;
  sourceRow: number;
  sourceNotes?: string;
  supportingReferences: SupportingReference[];
  techniqueGuide: TechniqueGuide | null;
  techniqueReviewStatus: TechniqueReviewStatus;
  embedStatus: EmbedStatus;
  lastCheckedAt: string | null;
  active: boolean;
}

export interface MuscleGroupInfo {
  id: MuscleGroupId;
  displayOrder: number;
  expectedCount: number;
  nameByLocale: Record<Locale, string>;
  subtitleByLocale: Record<Locale, string>;
}

export const MUSCLE_GROUPS: MuscleGroupInfo[] = [
  {
    id: 'chest',
    displayOrder: 1,
    expectedCount: 13,
    nameByLocale: { en: 'Chest', ar: 'الصدر (Chest)', fr: 'Poitrine (Chest)', rw: 'Igatuza (Chest)' },
    subtitleByLocale: { en: 'Pectorals & pressing movements', ar: 'عضلات الصدر وحركات الدفع', fr: 'Pectoraux et mouvements de développé', rw: 'Imikaya y’igituza' }
  },
  {
    id: 'back',
    displayOrder: 2,
    expectedCount: 20,
    nameByLocale: { en: 'Back', ar: 'الظهر (Back)', fr: 'Dos (Back)', rw: 'Umugongo (Back)' },
    subtitleByLocale: { en: 'Lats, upper back & pulling movements', ar: 'المجنص وأعلى الظهر وحركات السحب', fr: 'Dorsaux, haut du dos et tirages', rw: 'Imikaya y’umugongo' }
  },
  {
    id: 'shoulders',
    displayOrder: 3,
    expectedCount: 20,
    nameByLocale: { en: 'Shoulders', ar: 'الأكتاف (Shoulders)', fr: 'Épaules (Shoulders)', rw: 'Intugu (Shoulders)' },
    subtitleByLocale: { en: 'Front, side & rear deltoids', ar: 'الدالية الأمامية والجانبية والخلفية', fr: 'Deltoïdes antérieurs, latéraux et postérieurs', rw: 'Imikaya y’intugu' }
  },
  {
    id: 'biceps',
    displayOrder: 4,
    expectedCount: 10,
    nameByLocale: { en: 'Biceps', ar: 'البايسبس (Biceps)', fr: 'Biceps', rw: 'Biceps (Ukuboko kw’imbere)' },
    subtitleByLocale: { en: 'Elbow flexion & upper arm curls', ar: 'ثني المرفق وتمارين الذراع الأمامية', fr: 'Flexion du coude et curls', rw: 'Imikaya y’imbere ku kuboko' }
  },
  {
    id: 'triceps',
    displayOrder: 5,
    expectedCount: 10,
    nameByLocale: { en: 'Triceps', ar: 'الترايسبس (Triceps)', fr: 'Triceps', rw: 'Triceps (Ukuboko kw’inyuma)' },
    subtitleByLocale: { en: 'Elbow extension & pressdowns', ar: 'مد المرفق وتمارين الذراع الخلفية', fr: 'Extension du coude et pressdowns', rw: 'Imikaya y’inyuma ku kuboko' }
  },
  {
    id: 'forearms',
    displayOrder: 6,
    expectedCount: 5,
    nameByLocale: { en: 'Forearms', ar: 'الساعد (Forearms)', fr: 'Avant-bras (Forearms)', rw: 'Ikiganza n’ukuboko (Forearms)' },
    subtitleByLocale: { en: 'Forearm & grip training', ar: 'تدريب الساعد وقوة القبضة', fr: 'Avant-bras et force de préhension', rw: 'Imikaya yo hasi ku kuboko' }
  },
  {
    id: 'quadriceps',
    displayOrder: 7,
    expectedCount: 5,
    nameByLocale: { en: 'Quadriceps', ar: 'الفخذ الأمامي (Quadriceps)', fr: 'Quadriceps', rw: 'Itako ry’imbere (Quadriceps)' },
    subtitleByLocale: { en: 'Anterior thigh & knee extension', ar: 'رباعية الرؤوس ومد الركبة', fr: 'Avant de la cuisse et extension du genou', rw: 'Imikaya y’imbere ku itako' }
  },
  {
    id: 'hamstrings',
    displayOrder: 8,
    expectedCount: 5,
    nameByLocale: { en: 'Hamstrings', ar: 'الفخذ الخلفي (Hamstrings)', fr: 'Ischio-jambiers (Hamstrings)', rw: 'Itako ry’inyuma (Hamstrings)' },
    subtitleByLocale: { en: 'Leg curls & hip hinge movements', ar: 'ثني الركبة وحركات مفصل الورك', fr: 'Leg curls et flexion de hanche', rw: 'Imikaya y’inyuma ku itako' }
  },
  {
    id: 'glutes',
    displayOrder: 9,
    expectedCount: 5,
    nameByLocale: { en: 'Glutes', ar: 'الأرداف (Glutes)', fr: 'Fessiers (Glutes)', rw: 'Ikibuno (Glutes)' },
    subtitleByLocale: { en: 'Hip extension & glute development', ar: 'مد الورك وتقوية عضلات الأرداف', fr: 'Extension de hanche et fessiers', rw: 'Imikaya y’ikibuno' }
  },
  {
    id: 'calves',
    displayOrder: 10,
    expectedCount: 5,
    nameByLocale: { en: 'Calves', ar: 'السمانة (Calves)', fr: 'Mollets (Calves)', rw: 'intege (Calves)' },
    subtitleByLocale: { en: 'Standing & bent-knee calf raises', ar: 'رفع السمانة واقفًا وجالسًا', fr: 'Élévations des mollets debout et assis', rw: 'Imikaya yo hasi ku kuguru' }
  },
  {
    id: 'trapezius',
    displayOrder: 11,
    expectedCount: 4,
    nameByLocale: { en: 'Trapezius', ar: 'الترابيس (Trapezius)', fr: 'Trapèzes (Trapezius)', rw: 'Trapezius (Mu bitugu)' },
    subtitleByLocale: { en: 'Upper & lower trapezius control', ar: 'تمارين الترابيس والتحكم في لوح الكتف', fr: 'Trapèzes supérieurs et inférieurs', rw: 'Imikaya ihuza ijosi n’intugu' }
  },
  {
    id: 'abs-core',
    displayOrder: 12,
    expectedCount: 4,
    nameByLocale: { en: 'Abs & Core', ar: 'البطن والجذع (Abs & Core)', fr: 'Abdos & Core', rw: 'Inda n’umubyimba (Abs & Core)' },
    subtitleByLocale: { en: 'Abdominals & trunk stability', ar: 'عضلات البطن وثبات الجذع', fr: 'Abdominaux et stabilité du tronc', rw: 'Imikaya yo ku nda' }
  },
  {
    id: 'hip-adductors',
    displayOrder: 13,
    expectedCount: 4,
    nameByLocale: { en: 'Hip Adductors', ar: 'العضلات الضامة (Hip Adductors)', fr: 'Adducteurs (Hip Adductors)', rw: 'Adductors (Imbere mu matako)' },
    subtitleByLocale: { en: 'Inner-thigh muscles', ar: 'عضلات الفخذ الداخلية', fr: 'Muscles intérieurs de la cuisse', rw: 'Imikaya y’imbere mu matako' }
  },
  {
    id: 'hip-abductors',
    displayOrder: 14,
    expectedCount: 4,
    nameByLocale: { en: 'Hip Abductors', ar: 'العضلات المبعدة (Hip Abductors)', fr: 'Abducteurs (Hip Abductors)', rw: 'Abductors (Inyuma ku matako)' },
    subtitleByLocale: { en: 'Outer-hip muscles', ar: 'عضلات الورك الخارجية', fr: 'Muscles extérieurs de la hanche', rw: 'Imikaya yo ku mpande z’amatako' }
  }
];
