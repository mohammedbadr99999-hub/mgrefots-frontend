export type Language = 'en' | 'rw' | 'ar';

export type NavigationTab = 'home' | 'analysis' | 'supps' | 'knowledge' | 'chat';

export interface SupplementFact {
  ingredient: string;
  amount: string;
  dv: string;
}

export interface KnowledgeSection {
  id: string;
  title: Record<Language, string>;
  content: Record<Language, string>;
  callout?: {
    type: 'tip' | 'warning' | 'key-takeaway' | 'science';
    title: Record<Language, string>;
    text: Record<Language, string>;
  };
  table?: {
    headers: Record<Language, string[]>;
    rows: Record<Language, string[][]>;
  };
}

export interface ScientificReference {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doiOrUrl?: string;
}

export interface KnowledgeFAQ {
  category?: string;
  question: Record<Language, string>;
  answer: Record<Language, string>;
}

export interface KnowledgeGuide {
  id: string;
  slug: string;
  title: Record<Language, string>;
  subtitle: Record<Language, string>;
  category: string; // e.g. 'Creatine', 'Protein', 'Vitamins', 'Fat Loss'
  targetGoal?: string; // e.g. 'Muscle Building', 'Recovery'
  supplementId?: string; // Links to product ID if applicable (e.g. 'mgrefots-creatine')
  badge: Record<Language, string>;
  readingTime: string; // e.g. "8 min read"
  lastUpdated: string; // e.g. "August 2026"
  author: {
    name: string;
    role: Record<Language, string>;
    credentials: string;
    avatar?: string;
  };
  medicalReviewer: {
    name: string;
    role: Record<Language, string>;
  };
  summary: Record<Language, string>;
  heroImage?: string;
  sections: KnowledgeSection[];
  faqs: KnowledgeFAQ[];
  references: ScientificReference[];
  relatedGuideIds: string[];
  relatedProductId?: string;
  isFeatured?: boolean;
}

export interface KnowledgeArticle {
  id: string;
  slug: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  category: string;
  tags: string[];
  readingTime: string;
  publishedDate: string;
  lastUpdated: string;
  author: {
    name: string;
    role: Record<Language, string>;
  };
  medicalReviewer: {
    name: string;
    role: Record<Language, string>;
  };
  sections: KnowledgeSection[];
  faqs: KnowledgeFAQ[];
  references: ScientificReference[];
  relatedGuideId?: string;
  relatedProductId?: string;
  isFeatured?: boolean;
  isPopular?: boolean;
}

export interface Product {
  id: string;
  name: Record<Language, string>;
  subtitle: Record<Language, string>;
  category: 'power' | 'pump' | 'energy' | 'protein' | 'immunity';
  badge: Record<Language, string>;
  badgeColor: string;
  gradient: string;
  accentColor: string;
  iconName: string;
  price: string;
  isSoldOut?: boolean;
  image?: string;
  servings: string;
  size: string;
  rating: number; // e.g. 5.0, 4.8
  reviewsCount: number; // e.g. 340
  buyersCount: number; // e.g. 2840
  description: Record<Language, string>;
  highlights: Record<Language, string[]>;
  usage: Record<Language, string>;
  ingredients: Record<Language, string>;
  otherIngredients?: Record<Language, string>;
  claims?: string[];
  supplementFacts?: SupplementFact[];
  scienceNote: Record<Language, string>;
  whatsappText: Record<Language, string>;
}

export interface UserState {
  id: string;
  phone: string;
  isGuest: boolean;
}

export interface InBodyHistoryItem {
  date: string;
  body_fat_percent: number;
  skeletal_muscle_mass: number;
}
