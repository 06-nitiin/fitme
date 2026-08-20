import { useEffect, useState } from "react";
import { Bookmark, Sparkles } from "lucide-react";
import { SavedOutfitCard } from "../components/outfit/SavedOutfitCard";
import { starterWardrobe } from "../data/starterWardrobe";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../lib/storage";
import { createFitMeId } from "../lib/wardrobe";
import type { ClothingItem, SavedOutfit } from "../types/fitme";

type SavedOutfitsProps = {
  onEdit: (outfit: SavedOutfit) => void;
};

export function SavedOutfits({ onEdit }: SavedOutfitsProps) {
  const [wardrobe] = useState<ClothingItem[]>(() => loadFromStorage(STORAGE_KEYS.wardrobe, starterWardrobe));
  const [savedOutfits, setSavedOutfits] = useState<SavedOutfit[]>(() => loadFromStorage(STORAGE_KEYS.savedOutfits, []));

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.savedOutfits, savedOutfits);
  }, [savedOutfits]);

  function renameOutfit(outfit: SavedOutfit) {
    const nextName = window.prompt("Rename this look", outfit.name);

    if (nextName === null) {
      return;
    }

    const name = nextName.trim();

    if (!name) {
      return;
    }

    setSavedOutfits((currentOutfits) =>
      currentOutfits.map((currentOutfit) =>
        currentOutfit.id === outfit.id
          ? { ...currentOutfit, name, updatedAt: new Date().toISOString() }
          : currentOutfit,
      ),
    );
  }

  function duplicateOutfit(outfit: SavedOutfit) {
    const now = new Date().toISOString();
    const duplicate: SavedOutfit = {
      ...outfit,
      id: createFitMeId("outfit"),
      name: `${outfit.name} copy`,
      createdAt: now,
      updatedAt: now,
    };

    setSavedOutfits((currentOutfits) => [duplicate, ...currentOutfits]);
  }

  function deleteOutfit(outfit: SavedOutfit) {
    if (!window.confirm(`Delete “${outfit.name}” from your saved looks?`)) {
      return;
    }

    setSavedOutfits((currentOutfits) => currentOutfits.filter((currentOutfit) => currentOutfit.id !== outfit.id));
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="fitme-panel overflow-hidden p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-fitme-plum/35 bg-fitme-cream/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-fitme-plum">
              <Bookmark className="size-3.5 text-fitme-blush" aria-hidden="true" />
              Saved looks
            </div>
            <h1 className="mt-4 font-display text-4xl leading-none text-fitme-plum sm:text-5xl">A little lookbook, just for you.</h1>
            <p className="mt-4 text-base font-bold leading-7 text-fitme-plum/75 sm:text-lg">The combinations you want to remember live here. Open one whenever you want to change a single layer.</p>
          </div>
          <div className="rounded-2xl border-2 border-dashed border-fitme-plum/35 bg-white/55 px-4 py-3 text-fitme-plum">
            <p className="font-display text-xl leading-none">{savedOutfits.length}</p>
            <p className="mt-1 text-[0.6rem] font-black uppercase tracking-[0.13em] text-fitme-plum/65">saved looks</p>
          </div>
        </div>
      </section>

      {savedOutfits.length > 0 ? (
        <section aria-label="Saved outfit collection" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {savedOutfits.map((outfit) => <SavedOutfitCard key={outfit.id} outfit={outfit} wardrobe={wardrobe} onEdit={onEdit} onRename={renameOutfit} onDuplicate={duplicateOutfit} onDelete={deleteOutfit} />)}
        </section>
      ) : (
        <section className="fitme-panel mx-auto max-w-2xl p-8 text-center sm:p-12">
          <div className="mx-auto grid size-16 place-items-center rounded-[1.4rem] border-2 border-fitme-plum bg-pink-200 text-fitme-plum shadow-[0_3px_0_rgb(87_41_88_/_25%)]"><Sparkles className="size-7" aria-hidden="true" /></div>
          <h2 className="mt-6 font-display text-3xl text-fitme-plum">Your lookbook is waiting.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-6 text-fitme-plum/70">Build a look you love in the Outfit Builder, then save it here for future you.</p>
        </section>
      )}
    </div>
  );
}
