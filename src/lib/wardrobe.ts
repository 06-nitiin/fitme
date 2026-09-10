import { CLOTHING_CATEGORIES, type ClothingCategory, type ClothingItem, type OutfitSlot } from "../types/fitme";

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
  color?: string,
): ClothingItem[] {
  const normalisedSearch = searchTerm.trim().toLowerCase();
  const normalisedColor = color?.trim().toLowerCase();

  return wardrobe.filter((item) => {
    const matchesCategory = !category || item.category === category;
    const matchesColor = !normalisedColor || item.color.toLowerCase().includes(normalisedColor);

    if (!normalisedSearch) {
      return matchesCategory && matchesColor;
    }

    const searchableDetails = [item.name, item.category, item.color, item.brand, item.notes]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return matchesCategory && matchesColor && searchableDetails.includes(normalisedSearch);
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

export function exportWardrobeData(wardrobe: ClothingItem[]): string {
  return JSON.stringify(
    {
      app: "FitMe",
      version: 1,
      exportedAt: new Date().toISOString(),
      wardrobe,
    },
    null,
    2,
  );
}

export function importWardrobeData(serializedData: string): ClothingItem[] {
  const parsed: unknown = JSON.parse(serializedData);
  const importedItems =
    typeof parsed === "object" && parsed !== null && "wardrobe" in parsed
      ? (parsed as { wardrobe: unknown }).wardrobe
      : parsed;

  if (!Array.isArray(importedItems)) {
    throw new Error("The selected file does not contain a wardrobe list.");
  }

  const isClothingCategory = (value: unknown): value is ClothingCategory =>
    typeof value === "string" && CLOTHING_CATEGORIES.includes(value as ClothingCategory);

  if (
    importedItems.some(
      (item) =>
        typeof item !== "object" ||
        item === null ||
        typeof (item as ClothingItem).name !== "string" ||
        !isClothingCategory((item as ClothingItem).category) ||
        typeof (item as ClothingItem).color !== "string" ||
        typeof (item as ClothingItem).brand !== "string",
    )
  ) {
    throw new Error("Every imported item needs a valid name, category, colour, and brand.");
  }

  return importedItems.map((item) => {
    const clothingItem = item as ClothingItem;
    return {
      ...clothingItem,
      id: createFitMeId("clothing"),
      createdAt: typeof clothingItem.createdAt === "string" ? clothingItem.createdAt : new Date().toISOString(),
    };
  });
}
