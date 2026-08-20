import { useMemo, useState } from "react";
import { BookmarkPlus, Sparkles } from "lucide-react";
import { CategoryCycler } from "../components/outfit/CategoryCycler";
import { OutfitStage } from "../components/outfit/OutfitStage";
import { RecommendationPanel } from "../components/outfit/RecommendationPanel";
import { starterWardrobe } from "../data/starterWardrobe";
import { createOutfitRecommendations } from "../lib/recommendations";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../lib/storage";
import { createFitMeId, getItemsForSlot } from "../lib/wardrobe";
import type { AvatarProfile, ClothingItem, OutfitRecommendation, OutfitSelections, OutfitSlot, SavedOutfit } from "../types/fitme";

const defaultAvatar: AvatarProfile = {
  presentation: "Feminine",
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

type OutfitBuilderProps = {
  editingOutfit: SavedOutfit | null;
  onStartFresh: () => void;
};

function makeInitialSelections(wardrobe: ClothingItem[]): OutfitSelections {
  return outfitSlots.reduce<OutfitSelections>((selections, { slot }) => {
    const firstItem = getItemsForSlot(wardrobe, slot)[0];
    return firstItem ? { ...selections, [slot]: firstItem.id } : selections;
  }, {});
}

export function OutfitBuilder({ editingOutfit, onStartFresh }: OutfitBuilderProps) {
  const [wardrobe] = useState<ClothingItem[]>(() => loadFromStorage(STORAGE_KEYS.wardrobe, starterWardrobe));
  const [avatar] = useState<AvatarProfile>(() => {
    const storedAvatar = loadFromStorage(STORAGE_KEYS.avatar, defaultAvatar);
    return { ...defaultAvatar, ...storedAvatar };
  });
  const [selections, setSelections] = useState<OutfitSelections>(() => editingOutfit?.selections ?? makeInitialSelections(wardrobe));
  const [saveMessage, setSaveMessage] = useState("");

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
  const recommendations = useMemo(() => createOutfitRecommendations(wardrobe), [wardrobe]);

  function applyRecommendation(recommendation: OutfitRecommendation) {
    setSelections(recommendation.selections);
    setSaveMessage(`${recommendation.style} is on the outfit mirror. Tweak any layer you like.`);
  }

  function saveCurrentOutfit() {
    if (Object.keys(selections).length === 0) {
      setSaveMessage("Pick at least one piece before saving a look.");
      return;
    }

    const savedOutfits = loadFromStorage<SavedOutfit[]>(STORAGE_KEYS.savedOutfits, []);
    const suggestedName = editingOutfit?.name ?? `Look ${savedOutfits.length + 1}`;
    const enteredName = window.prompt("Give this look a name", suggestedName);

    if (enteredName === null) {
      return;
    }

    const now = new Date().toISOString();
    const savedOutfit: SavedOutfit = {
      id: editingOutfit?.id ?? createFitMeId("outfit"),
      name: enteredName.trim() || suggestedName,
      selections,
      createdAt: editingOutfit?.createdAt ?? now,
      updatedAt: now,
    };

    const nextSavedOutfits = editingOutfit
      ? savedOutfits.map((outfit) => (outfit.id === savedOutfit.id ? savedOutfit : outfit))
      : [savedOutfit, ...savedOutfits];

    saveToStorage(STORAGE_KEYS.savedOutfits, nextSavedOutfits);
    setSaveMessage(editingOutfit ? `“${savedOutfit.name}” has been updated.` : `“${savedOutfit.name}” is tucked into your saved looks.`);
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="fitme-panel overflow-hidden p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-fitme-plum/35 bg-fitme-cream/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-fitme-plum">
            <Sparkles className="size-3.5 text-fitme-blush" aria-hidden="true" />
            Outfit builder
          </div>
          <h1 className="mt-4 font-display text-4xl leading-none text-fitme-plum sm:text-5xl">Play with a whole look.</h1>
          <p className="mt-4 text-base font-bold leading-7 text-fitme-plum/75 sm:text-lg">Use the little arrows to change one piece at a time. Your other layers will stay exactly where you left them.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {editingOutfit && <button type="button" onClick={onStartFresh} className="fitme-tap rounded-2xl border-2 border-fitme-plum/30 bg-white/70 px-4 py-3 text-sm font-black text-fitme-plum">Start fresh</button>}
            <button type="button" onClick={saveCurrentOutfit} className="fitme-tap inline-flex items-center gap-2 rounded-2xl border-2 border-fitme-plum bg-fitme-blush px-4 py-3 text-sm font-black text-white shadow-[0_4px_0_rgb(87_41_88_/_34%)] focus-visible:outline-2 focus-visible:outline-offset-4">
              <BookmarkPlus className="size-4" aria-hidden="true" />
              {editingOutfit ? "Update this look" : "Save this look"}
            </button>
          </div>
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

      {saveMessage && <p className="rounded-2xl border-2 border-fitme-plum/30 bg-pink-100/75 px-4 py-3 text-sm font-bold text-fitme-plum">{saveMessage}</p>}

      <RecommendationPanel recommendations={recommendations} wardrobe={wardrobe} onApply={applyRecommendation} />

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
