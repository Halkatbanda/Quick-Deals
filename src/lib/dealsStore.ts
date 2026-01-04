// Simple in-memory store for deals (will be replaced with backend later)

export interface Deal {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  currentPrice: number;
  originalPrice: number;
  store: 'amazon' | 'flipkart' | 'other';
  category: string;
  productUrl: string;
  slug: string;
  createdAt: Date;
  isActive: boolean;
}

// Generate slug from title
export const generateSlug = (title: string, id: string): string => {
  const slugified = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .slice(0, 50);
  return `${slugified}-${id.slice(0, 6)}`;
};

// Generate unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
};

// Sample deals for demo
const sampleDeals: Deal[] = [
  {
    id: generateId(),
    title: 'pTron Orbis Era Smart Glasses with Bluetooth V5.4',
    description: 'Open Ear Music, Handsfree Calls, Protects Eye from harmful Blue Light',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    currentPrice: 1499,
    originalPrice: 3799,
    store: 'amazon',
    category: 'Electronics',
    productUrl: 'https://www.amazon.in',
    slug: 'ptron-orbis-era-smart-glasses-abc123',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    title: 'boAt Airdopes 141 Bluetooth Earbuds',
    description: '42H Playtime, Beast Mode, ENx Tech, IWP, Smooth Touch Controls',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
    currentPrice: 999,
    originalPrice: 4490,
    store: 'amazon',
    category: 'Electronics',
    productUrl: 'https://www.amazon.in',
    slug: 'boat-airdopes-141-bluetooth-def456',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    title: 'Noise ColorFit Pro 4 Smartwatch',
    description: '1.72" AMOLED Display, Bluetooth Calling, 100+ Sports Modes',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    currentPrice: 2499,
    originalPrice: 5999,
    store: 'flipkart',
    category: 'Electronics',
    productUrl: 'https://www.flipkart.com',
    slug: 'noise-colorfit-pro-4-smartwatch-ghi789',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    title: 'Campus Men Running Shoes',
    description: 'Lightweight, Comfortable, Breathable Sports Shoes',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    currentPrice: 699,
    originalPrice: 1499,
    store: 'amazon',
    category: 'Fashion',
    productUrl: 'https://www.amazon.in',
    slug: 'campus-men-running-shoes-jkl012',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    title: 'Prestige Electric Kettle 1.5L',
    description: '1500W, Auto Shut-off, Stainless Steel Body',
    imageUrl: 'https://images.unsplash.com/photo-1594213114665-8a3eaa07b0ba?w=400&h=400&fit=crop',
    currentPrice: 599,
    originalPrice: 1295,
    store: 'flipkart',
    category: 'Home & Kitchen',
    productUrl: 'https://www.flipkart.com',
    slug: 'prestige-electric-kettle-mno345',
    createdAt: new Date(),
    isActive: true,
  },
  {
    id: generateId(),
    title: 'Himalaya Face Wash Combo Pack',
    description: 'Neem Face Wash + Purifying Scrub + Moisturizer',
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    currentPrice: 299,
    originalPrice: 599,
    store: 'amazon',
    category: 'Beauty',
    productUrl: 'https://www.amazon.in',
    slug: 'himalaya-face-wash-combo-pqr678',
    createdAt: new Date(),
    isActive: true,
  },
];

// Store in localStorage to persist across page reloads
const STORAGE_KEY = 'deals_store';

export const getDeals = (): Deal[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const parsed = JSON.parse(stored);
    return parsed.map((d: any) => ({ ...d, createdAt: new Date(d.createdAt) }));
  }
  // Initialize with sample deals
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleDeals));
  return sampleDeals;
};

export const getDealBySlug = (slug: string): Deal | undefined => {
  const deals = getDeals();
  return deals.find(d => d.slug === slug);
};

export const getDealById = (id: string): Deal | undefined => {
  const deals = getDeals();
  return deals.find(d => d.id === id);
};

export const addDeal = (deal: Omit<Deal, 'id' | 'slug' | 'createdAt'>): Deal => {
  const deals = getDeals();
  const id = generateId();
  const newDeal: Deal = {
    ...deal,
    id,
    slug: generateSlug(deal.title, id),
    createdAt: new Date(),
  };
  deals.unshift(newDeal);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  return newDeal;
};

export const updateDeal = (id: string, updates: Partial<Deal>): Deal | undefined => {
  const deals = getDeals();
  const index = deals.findIndex(d => d.id === id);
  if (index === -1) return undefined;
  deals[index] = { ...deals[index], ...updates };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
  return deals[index];
};

export const deleteDeal = (id: string): boolean => {
  const deals = getDeals();
  const filtered = deals.filter(d => d.id !== id);
  if (filtered.length === deals.length) return false;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return true;
};

export const getCategories = (): string[] => {
  return ['Electronics', 'Fashion', 'Home & Kitchen', 'Beauty', 'Sports', 'Books', 'Toys', 'Other'];
};

export const getDealsByCategory = (category: string): Deal[] => {
  const deals = getDeals();
  return deals.filter(d => d.category === category && d.isActive);
};

export const searchDeals = (query: string): Deal[] => {
  const deals = getDeals();
  const lowerQuery = query.toLowerCase();
  return deals.filter(d => 
    d.isActive && (
      d.title.toLowerCase().includes(lowerQuery) ||
      d.description.toLowerCase().includes(lowerQuery) ||
      d.category.toLowerCase().includes(lowerQuery)
    )
  );
};
