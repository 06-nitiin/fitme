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

const neutralColours = ["black", "white", "grey", "gray", "beige", "cream", "brown", "navy"];

function normaliseColour(colour: string): string {
  return colour.trim().toLowerCase();
}

function scoreColourCoordination(items: ClothingItem[]): number {
  if (items.length < 2) return 18;

  const colours = items.map((item) => normaliseColour(item.color));
  const uniqueColours = new Set(colours);
  const neutralCount = colours.filter((colour) => neutralColours.some((neutral) => colour.includes(neutral))).length;

  if (uniqueColours.size === 1) return 35;
  if (neutralCount >= 1) return 32;
  if (uniqueColours.size <= 2) return 28;
  if (uniqueColours.size === 3) return 22;
  return 16;
}

function scoreStyleFit(items: ClothingItem[], rule: StyleRule | undefined): number {
  if (!rule) return 0;

  const colourMatches = items.filter((item) =>
    Object.values(rule.preferredColours).some((colours) =>
      colours?.some((colour) => normaliseColour(item.color).includes(normaliseColour(colour))),
    ),
  ).length;
  const categoryPreferences = Object.values(rule.preferredCategories ?? {}).flat();
  const categoryMatches = items.filter((item) => categoryPreferences.includes(item.category)).length;
  const colourPoints = items.length ? Math.round((colourMatches / items.length) * 15) : 0;
  const categoryPoints = items.length && categoryPreferences.length
    ? Math.round((categoryMatches / items.length) * 10)
    : 5;

  return Math.min(25, colourPoints + categoryPoints);
}

export function scoreOutfitRecommendation(
  recommendation: OutfitRecommendation,
  wardrobe: ClothingItem[],
): number {
  const selectedItems = Object.values(recommendation.selections)
    .map((itemId) => wardrobe.find((item) => item.id === itemId))
    .filter((item): item is ClothingItem => Boolean(item));
  const completenessPoints = Math.min(40, selectedItems.length * 8);
  const rule = styleRules.find((styleRule) => styleRule.style === recommendation.style);

  return Math.min(100, completenessPoints + scoreColourCoordination(selectedItems) + scoreStyleFit(selectedItems, rule));
}
