import type { ClothingCategory, ClothingItem, OutfitSlot } from "../types/fitme";

export function getOutfitSlot(category: ClothingCategory): OutfitSlot {
  switch (category) {
    case "T-Shirts":
    case "Shirts":
    case "Hoodies":
    case "Sweaters":
      return "top";
    case "Jackets":
      return "outerwear";
    case "Trousers":
    case "Jeans":
    case "Cargos":
    case "Shorts":
      return "bottom";
    case "Shoes":
      return "shoes";
    case "Accessories":
      return "accessory";
  }
}

export function filterWardrobe(
  wardrobe: ClothingItem[],
  searchTerm: string,
  category?: ClothingCategory,
): ClothingItem[] {
  const normalisedSearch = searchTerm.trim().toLowerCase();

  return wardrobe.filter((item) => {
    const matchesCategory = !category || item.category === category;

    if (!normalisedSearch) {
      return matchesCategory;
    }

    const searchableDetails = [item.name, item.category, item.color, item.brand, item.notes]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesCategory && searchableDetails.includes(normalisedSearch);
  });
}

export function getItemsForSlot(wardrobe: ClothingItem[], slot: OutfitSlot): ClothingItem[] {
  return wardrobe.filter((item) => getOutfitSlot(item.category) === slot);
}

export function createFitMeId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

