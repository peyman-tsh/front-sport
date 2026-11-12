export type SocketType = 'H1' | 'H3' | 'H4' | 'H7' | 'H11' | 'H16' | '9005' | '9006' | '880' | 'D2S';

export type SportCategory = string;

export interface Category {
  _id?: string;
  id?: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  accentColor?: string;
  isActive?: boolean;
  sortOrder?: number;
  productsCount?: number;
}

export interface CarCompatibility {
  carMake: string;
  carModel: string;
  position?: string;
}

export interface SoundClip {
  title: string;
  mode: string;
  carModel?: string;
  audioUrl?: string;
  durationSeconds?: number;
  engineRpm?: number;
  soundType?: 'exhaust' | 'intake' | 'blowoff' | 'engine' | string;
}

export interface ProductSeo {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
}

export interface Product {
  id?: string;
  _id?: string;
  title: string;
  slug: string;
  brand: string;
  category: SportCategory;
  material?: string;
  socketType?: SocketType;
  price: number;
  originalPrice?: number;
  stock: number;
  isAvailable: boolean;
  wattage?: number;
  lumens?: number;
  colorTemperature?: number;
  chipType?: string;
  coolingType?: string;
  hasCanbus?: boolean;
  warrantyMonths: number;
  images: string[];
  rating: number;
  reviewsCount: number;
  shortDescription: string;
  description: string;
  compatibility: CarCompatibility[];
  seo?: ProductSeo;
  soundClips?: SoundClip[];
  videoDemoUrl?: string;
  salesCount?: number;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CarBulbSpec {
  carMake: string;
  carModel: string;
  lowBeam: SocketType;
  highBeam: SocketType;
  fogLight?: SocketType;
  notes?: string;
}

export interface User {
  id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  role: 'ADMIN' | 'CUSTOMER';
  savedAddresses?: any[];
  favoriteProductIds?: string[];
  createdAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResult {
  user: User;
  tokens: AuthTokens;
}
