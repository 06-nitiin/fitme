import { ChevronLeft, ChevronRight, Shirt } from "lucide-react";
import type { ClothingItem } from "../../types/fitme";

type CategoryCyclerProps = {
  label: string;
  selectedItem: ClothingItem | undefined;
  itemCount: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function CategoryCycler({ label, selectedItem, itemCount, onPrevious, onNext }: CategoryCyclerProps) {
  const hasItems = itemCount > 0;

  return (
    <section className="rounded-3xl border-2 border-fitme-plum/35 bg-fitme-cream/80 p-4 shadow-[0_3px_0_rgb(87_41_88_/_13%)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[0.65rem] font-black uppercase tracking-[0.16em] text-fitme-plum/65">{label}</p>
        <span className="rounded-full border border-fitme-plum/20 bg-white/65 px-2 py-1 text-[0.6rem] font-black text-fitme-plum/60">{itemCount} {itemCount === 1 ? "option" : "options"}</span>
      </div>

      {hasItems && selectedItem ? (
        <div className="mt-3 flex items-center gap-2">
          <button type="button" onClick={onPrevious} className="fitme-tap grid size-10 shrink-0 place-items-center rounded-xl border-2 border-fitme-plum/30 bg-white/70 text-fitme-plum focus-visible:outline-2 focus-visible:outline-offset-2" aria-label={`Previous ${label.toLowerCase()}`}>
            <ChevronLeft className="size-4" aria-hidden="true" />
          </button>

          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-sm font-black text-fitme-plum">{selectedItem.name}</p>
            <p className="mt-0.5 truncate text-xs font-bold text-fitme-plum/65">{selectedItem.color} · {selectedItem.brand}</p>
          </div>

          <button type="button" onClick={onNext} className="fitme-tap grid size-10 shrink-0 place-items-center rounded-xl border-2 border-fitme-plum/30 bg-white/70 text-fitme-plum focus-visible:outline-2 focus-visible:outline-offset-2" aria-label={`Next ${label.toLowerCase()}`}>
            <ChevronRight className="size-4" aria-hidden="true" />
          </button>
        </div>
      ) : (
        <div className="mt-3 flex items-center gap-3 rounded-2xl border-2 border-dashed border-fitme-plum/25 bg-white/45 px-3 py-3 text-fitme-plum/65">
          <Shirt className="size-4 shrink-0" aria-hidden="true" />
          <p className="text-xs font-bold leading-5">No {label.toLowerCase()} pieces yet. Add one in My Wardrobe when you are ready.</p>
        </div>
      )}
    </section>
  );
}
