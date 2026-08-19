import { useMemo, useState } from "react";
import { Sparkles } from "lucide-react";
import { CategoryCycler } from "../components/outfit/CategoryCycler";
import { OutfitStage } from "../components/outfit/OutfitStage";
import { starterWardrobe } from "../data/starterWardrobe";
import { loadFromStorage, STORAGE_KEYS } from "../lib/storage";
import { getItemsForSlot } from "../lib/wardrobe";
import type { AvatarProfile, ClothingItem, OutfitSelections, OutfitSlot } from "../types/fitme";

const defaultAvatar: AvatarProfile = {
  skinTone: "Peach",
  hairStyle: "Soft waves",
  hairColor: "Brown",
  faceShape: "Oval",
  eyeColor: "Brown",
  facialHair: "None",
  glasses: false,
  height: "Average",
  build: "Balanced",
  proportions: "Balanced",
  tattoos: false,
  accessories: [],
};

const outfitSlots: Array<{ slot: OutfitSlot; label: string }> = [
  { slot: "top", label: "Top" },
  { slot: "bottom", label: "Bottom" },
  { slot: "shoes", label: "Shoes" },
  { slot: "outerwear", label: "Outerwear" },
  { slot: "accessory", label: "Accessories" },
];

function makeInitialSelections(wardrobe: ClothingItem[]): OutfitSelections {
  return outfitSlots.reduce<OutfitSelections>((selections, { slot }) => {
    const firstItem = getItemsForSlot(wardrobe, slot)[0];
    return firstItem ? { ...selections, [slot]: firstItem.id } : selections;
  }, {});
}

export function OutfitBuilder() {
  const [wardrobe] = useState<ClothingItem[]>(() => loadFromStorage(STORAGE_KEYS.wardrobe, starterWardrobe));
  const [avatar] = useState<AvatarProfile>(() => loadFromStorage(STORAGE_KEYS.avatar, defaultAvatar));
  const [selections, setSelections] = useState<OutfitSelections>(() => makeInitialSelections(wardrobe));

  const itemsBySlot = useMemo(
    () =>
      outfitSlots.reduce<Record<OutfitSlot, ClothingItem[]>>(
        (currentItems, { slot }) => ({ ...currentItems, [slot]: getItemsForSlot(wardrobe, slot) }),
        { top: [], bottom: [], shoes: [], outerwear: [], accessory: [] },
      ),
    [wardrobe],
  );

  function getSelectedItem(slot: OutfitSlot): ClothingItem | undefined {
    return itemsBySlot[slot].find((item) => item.id === selections[slot]);
  }

  function cycleSelection(slot: OutfitSlot, direction: 1 | -1) {
    const slotItems = itemsBySlot[slot];

    if (slotItems.length === 0) {
      return;
    }

    const currentIndex = slotItems.findIndex((item) => item.id === selections[slot]);
    const nextIndex = currentIndex === -1
      ? 0
      : (currentIndex + direction + slotItems.length) % slotItems.length;

    setSelections((currentSelections) => ({ ...currentSelections, [slot]: slotItems[nextIndex].id }));
  }

  const completedSlots = outfitSlots.filter(({ slot }) => getSelectedItem(slot)).length;

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="fitme-panel overflow-hidden p-5 sm:p-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-fitme-plum/35 bg-fitme-cream/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-fitme-plum">
            <Sparkles className="size-3.5 text-fitme-blush" aria-hidden="true" />
            Outfit builder
          </div>
          <h1 className="mt-4 font-display text-4xl leading-none text-fitme-plum sm:text-5xl">Play with a whole look.</h1>
          <p className="mt-4 text-base font-bold leading-7 text-fitme-plum/75 sm:text-lg">Use the little arrows to change one piece at a time. Your other layers will stay exactly where you left them.</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(18rem,0.75fr)_minmax(23rem,1fr)_minmax(18rem,0.75fr)] xl:items-center">
        <div className="space-y-3">
          {outfitSlots.slice(0, 2).map(({ slot, label }) => (
            <CategoryCycler key={slot} label={label} selectedItem={getSelectedItem(slot)} itemCount={itemsBySlot[slot].length} onPrevious={() => cycleSelection(slot, -1)} onNext={() => cycleSelection(slot, 1)} />
          ))}
        </div>

        <OutfitStage
          avatar={avatar}
          top={getSelectedItem("top")}
          bottom={getSelectedItem("bottom")}
          shoes={getSelectedItem("shoes")}
          outerwear={getSelectedItem("outerwear")}
          accessory={getSelectedItem("accessory")}
        />

        <div className="space-y-3">
          {outfitSlots.slice(2).map(({ slot, label }) => (
            <CategoryCycler key={slot} label={label} selectedItem={getSelectedItem(slot)} itemCount={itemsBySlot[slot].length} onPrevious={() => cycleSelection(slot, -1)} onNext={() => cycleSelection(slot, 1)} />
          ))}
        </div>
      </section>

      <aside className="rounded-3xl border-2 border-dashed border-fitme-plum/35 bg-white/50 p-5 text-fitme-plum sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div>
          <p className="font-display text-lg">Your little look is taking shape</p>
          <p className="mt-1 text-sm font-bold leading-6 text-fitme-plum/70">{completedSlots} of {outfitSlots.length} styling layers are ready. Add more clothes any time from My Wardrobe.</p>
        </div>
        <span className="mt-3 inline-flex rounded-full border-2 border-fitme-plum/25 bg-fitme-cream px-3 py-1.5 text-xs font-black text-fitme-plum sm:mt-0">Mix · Match · Repeat</span>
      </aside>
    </div>
  );
}

