export interface Perfume {
  id: string;
  name: string;
  category: string; // Scent Family (e.g. Woody & Smoky, Electric Floral, Citrus Seduction, Dark Spice)
  price: number; // 50ml price
  price100ml: number; // 100ml price
  description: string;
  story: string; // The artistic description
  topNotes: string[];
  middleNotes: string[];
  baseNotes: string[];
  longevity: number; // 1-5 rating
  projection: number; // 1-5 rating
  intensity: 'Medium' | 'Intense' | 'Extravagant';
  image: string;
  rating: number;
  reviewsCount: number;
  sizes: number[]; // e.g. [50, 100]
  bestFor: string; // Day/Night/Seasons
}

export interface CartItem {
  id: string; // combined perfumeId-size
  perfumeId: string;
  name: string;
  size: number; // 50 or 100ml
  price: number;
  quantity: number;
  image: string;
}

export interface Review {
  id: string;
  perfumeId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
  coverImage: string;
  accentColor: string;
  perfumeIds: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
