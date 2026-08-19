import type { ClothingItem, OutfitRecommendation, OutfitSelections, OutfitSlot } from "../types/fitme";
import { getItemsForSlot } from "./wardrobe";

type StyleRule = {
  id: string;
  style: OutfitRecommendation["style"];
  reason: string;
  preferredColours: Partial<Record<OutfitSlot, string[]>>;
  preferredCategories?: Partial<Record<OutfitSlot, ClothingItem["category"][]>>;
};

const styleRules: StyleRule[] = [
  {
    id: "casual",
    style: "Casual",
    reason: "Easy layers and everyday comfort from the pieces you already own.",
    preferredColours: { top: ["White", "Pink"], bottom: ["Blue", "Black", "Beige"], shoes: ["White"] },
  },
  {
    id: "smart-casual",
    style: "Smart Casual",
    reason: "A polished mix for plans that need a little extra intention.",
    preferredColours: { top: ["Blue", "White"], bottom: ["Cream", "Beige", "Black"], shoes: ["Black"] },
    preferredCategories: { top: ["Shirts", "Sweaters", "T-Shirts"], bottom: ["Trousers", "Jeans"], shoes: ["Shoes"] },
  },
  {
    id: "streetwear",
    style: "Streetwear",
    reason: "Relaxed proportions with a little more edge and layering.",
    preferredColours: { top: ["Black", "White"], bottom: ["Beige", "Black", "Blue"], shoes: ["White", "Black"] },
    preferredCategories: { top: ["T-Shirts", "Hoodies"], bottom: ["Cargos", "Jeans"], outerwear: ["Jackets"], shoes: ["Shoes"] },
  },
];

function chooseItem(
  items: ClothingItem[],
  preferredColours: string[] = [],
  preferredCategories: ClothingItem["category"][] = [],
): ClothingItem | undefined {
  const categoryMatch = items.find((item) => preferredCategories.includes(item.category));
  const colourMatch = items.find((item) => preferredColours.includes(item.color));
  const combinedMatch = items.find(
    (item) => preferredCategories.includes(item.category) && preferredColours.includes(item.color),
  );

  return combinedMatch ?? categoryMatch ?? colourMatch ?? items[0];
}

function buildSelections(wardrobe: ClothingItem[], rule: StyleRule): OutfitSelections {
  const slots: OutfitSlot[] = ["top", "bottom", "shoes", "outerwear", "accessory"];

  return slots.reduce<OutfitSelections>((selections, slot) => {
    const item = chooseItem(
      getItemsForSlot(wardrobe, slot),
      rule.preferredColours[slot],
      rule.preferredCategories?.[slot],
    );

    return item ? { ...selections, [slot]: item.id } : selections;
  }, {});
}

export function createOutfitRecommendations(wardrobe: ClothingItem[]): OutfitRecommendation[] {
  return styleRules
    .map((rule) => ({
      id: rule.id,
      style: rule.style,
      reason: rule.reason,
      selections: buildSelections(wardrobe, rule),
    }))
    .filter((recommendation) => Object.keys(recommendation.selections).length > 0);
}
