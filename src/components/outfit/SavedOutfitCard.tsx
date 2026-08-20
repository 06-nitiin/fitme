import { CalendarDays, Copy, Pencil, Trash2 } from "lucide-react";
import type { ClothingItem, SavedOutfit } from "../../types/fitme";

type SavedOutfitCardProps = {
  outfit: SavedOutfit;
  wardrobe: ClothingItem[];
  onEdit: (outfit: SavedOutfit) => void;
  onRename: (outfit: SavedOutfit) => void;
  onDuplicate: (outfit: SavedOutfit) => void;
  onDelete: (outfit: SavedOutfit) => void;
};

const garmentColours: Record<string, string> = {
  White: "#fffdf8",
  Black: "#443448",
  Pink: "#f3a5c5",
  Blue: "#9bc7e3",
  Beige: "#e4d0ab",
  Cream: "#fff2cf",
  Pearl: "#f6edf6",
  Silver: "#cdd3dd",
};

function getOutfitItems(outfit: SavedOutfit, wardrobe: ClothingItem[]): ClothingItem[] {
  return Object.values(outfit.selections)
    .map((itemId) => wardrobe.find((item) => item.id === itemId))
    .filter((item): item is ClothingItem => Boolean(item));
}

function formatDate(dateValue: string): string {
  return new Intl.DateTimeFormat("en", { day: "numeric", month: "short", year: "numeric" }).format(new Date(dateValue));
}

export function SavedOutfitCard({ outfit, wardrobe, onEdit, onRename, onDuplicate, onDelete }: SavedOutfitCardProps) {
  const outfitItems = getOutfitItems(outfit, wardrobe);

  return (
    <article className="overflow-hidden rounded-3xl border-2 border-fitme-plum/35 bg-fitme-cream/85 p-3 shadow-[0_3px_0_rgb(87_41_88_/_13%)]">
      <div className="relative flex h-48 items-end justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-pink-100 via-violet-100 to-sky-100">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(126,80,140,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.12)_1px,transparent_1px)] bg-[size:18px_18px]" />
        <div className="absolute bottom-5 h-6 w-36 rounded-full bg-fitme-plum/15 blur-sm" />
        <div className="relative z-10 flex flex-col items-center">
          <span className="h-11 w-11 rounded-[48%] border-2 border-fitme-plum/35 bg-[#f6c7aa]" />
          <span className="-mt-4 h-12 w-24 rounded-t-[45%] border-2 border-fitme-plum/35 bg-pink-300" />
          <span className="-mt-1 flex gap-1">
            <i className="h-14 w-7 rounded-b-xl border-2 border-fitme-plum/35" style={{ backgroundColor: garmentColours[outfitItems.find((item) => ["Trousers", "Jeans", "Cargos", "Shorts"].includes(item.category))?.color ?? ""] ?? "#d9b8e5" }} />
            <i className="h-14 w-7 rounded-b-xl border-2 border-fitme-plum/35" style={{ backgroundColor: garmentColours[outfitItems.find((item) => ["Trousers", "Jeans", "Cargos", "Shorts"].includes(item.category))?.color ?? ""] ?? "#d9b8e5" }} />
          </span>
        </div>
        <div className="absolute inset-x-3 bottom-3 flex justify-center gap-1.5">
          {outfitItems.slice(0, 5).map((item) => <span key={item.id} className="size-4 rounded-full border border-fitme-plum/25" style={{ backgroundColor: garmentColours[item.color] ?? "#d9b8e5" }} title={item.name} />)}
        </div>
      </div>

      <div className="px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-xl leading-5 text-fitme-plum">{outfit.name}</h2>
            <p className="mt-1 flex items-center gap-1.5 text-[0.65rem] font-black uppercase tracking-[0.1em] text-fitme-plum/60"><CalendarDays className="size-3" aria-hidden="true" /> {formatDate(outfit.createdAt)}</p>
          </div>
          <span className="rounded-full border border-fitme-plum/20 bg-pink-100 px-2 py-1 text-[0.6rem] font-black text-fitme-plum/75">{outfitItems.length} pieces</span>
        </div>

        <ul className="mt-4 space-y-1 border-y-2 border-dashed border-fitme-plum/20 py-3 text-xs font-bold text-fitme-plum/75">
          {outfitItems.map((item) => <li key={item.id} className="truncate">• {item.name}</li>)}
          {outfitItems.length === 0 && <li>• Some original pieces are no longer in the wardrobe.</li>}
        </ul>

        <div className="mt-3 grid grid-cols-2 gap-2">
          <button type="button" onClick={() => onEdit(outfit)} className="fitme-tap rounded-xl border-2 border-fitme-plum bg-fitme-blush px-2 py-2.5 text-xs font-black text-white shadow-[0_2px_0_rgb(87_41_88_/_25%)]">Open in builder</button>
          <button type="button" onClick={() => onRename(outfit)} className="fitme-tap inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-fitme-plum/30 bg-white/70 px-2 py-2.5 text-xs font-black text-fitme-plum"><Pencil className="size-3.5" aria-hidden="true" /> Rename</button>
          <button type="button" onClick={() => onDuplicate(outfit)} className="fitme-tap inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-fitme-plum/30 bg-white/70 px-2 py-2.5 text-xs font-black text-fitme-plum"><Copy className="size-3.5" aria-hidden="true" /> Duplicate</button>
          <button type="button" onClick={() => onDelete(outfit)} className="fitme-tap inline-flex items-center justify-center gap-1.5 rounded-xl border-2 border-rose-300 bg-rose-50 px-2 py-2.5 text-xs font-black text-rose-700"><Trash2 className="size-3.5" aria-hidden="true" /> Delete</button>
        </div>
      </div>
    </article>
  );
}
