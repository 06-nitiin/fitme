export const CLOTHING_CATEGORIES = [
  "T-Shirts",
  "Shirts",
  "Hoodies",
  "Sweaters",
  "Jackets",
  "Trousers",
  "Jeans",
  "Cargos",
  "Shorts",
  "Shoes",
  "Accessories",
] as const;

export type ClothingCategory = (typeof CLOTHING_CATEGORIES)[number];

export type OutfitSlot = "top" | "bottom" | "shoes" | "outerwear" | "accessory";

export type ClothingItem = {
  id: string;
  name: string;
  category: ClothingCategory;
  color: string;
  brand: string;
  size?: string;
  notes?: string;
  imageUrl?: string;
  createdAt: string;
};

export type AvatarProfile = {
  skinTone: string;
  hairStyle: string;
  hairColor: string;
  faceShape: string;
  eyeColor: string;
  facialHair: string;
  glasses: boolean;
  height: string;
  build: string;
  proportions: string;
  tattoos: boolean;
  accessories: string[];
};

export type OutfitSelections = Partial<Record<OutfitSlot, string>>;

export type SavedOutfit = {
  id: string;
  name: string;
  selections: OutfitSelections;
  createdAt: string;
  updatedAt: string;
};

export type RecommendationStyle = "Casual" | "Smart Casual" | "Streetwear";

export type OutfitRecommendation = {
  id: string;
  style: RecommendationStyle;
  selections: OutfitSelections;
  reason: string;
};
