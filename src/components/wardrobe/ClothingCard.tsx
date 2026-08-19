import { Tag } from "lucide-react";
import type { ClothingItem } from "../../types/fitme";
import { GarmentIllustration } from "./GarmentIllustration";

type ClothingCardProps = {
  item: ClothingItem;
};

export function ClothingCard({ item }: ClothingCardProps) {
  return (
    <article className="fitme-tap overflow-hidden rounded-3xl border-2 border-fitme-plum/35 bg-fitme-cream/85 p-3 shadow-[0_3px_0_rgb(87_41_88_/_13%)]">
      <GarmentIllustration item={item} />
      <div className="px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[0.65rem] font-black uppercase tracking-[0.14em] text-fitme-blush">{item.category}</p>
            <h2 className="mt-1 text-base font-black leading-5 text-fitme-plum">{item.name}</h2>
          </div>
          <span className="grid size-8 shrink-0 place-items-center rounded-xl border-2 border-fitme-plum/25 bg-white/70 text-fitme-plum/65" title={item.color}>
            <Tag className="size-3.5" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5 text-[0.66rem] font-extrabold">
          <span className="rounded-full border border-fitme-plum/20 bg-pink-100 px-2 py-1 text-fitme-plum/75">{item.color}</span>
          <span className="rounded-full border border-fitme-plum/20 bg-violet-100 px-2 py-1 text-fitme-plum/75">{item.brand}</span>
          {item.size && <span className="rounded-full border border-fitme-plum/20 bg-sky-100 px-2 py-1 text-fitme-plum/75">{item.size}</span>}
        </div>
      </div>
    </article>
  );
}
