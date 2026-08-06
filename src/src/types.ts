export type Language = 'en' | 'rw' | 'ar';

export type NavigationTab = 'home' | 'analysis' | 'supps' | 'chat';

export interface SupplementFact {
  ingredient: string;
  amount: string;
  dv: string;
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
