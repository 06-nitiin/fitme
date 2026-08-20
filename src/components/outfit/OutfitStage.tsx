import type { AvatarProfile, ClothingItem } from "../../types/fitme";
import { CartoonCharacter } from "../character/CartoonCharacter";

type OutfitStageProps = {
  avatar: AvatarProfile;
  top?: ClothingItem;
  bottom?: ClothingItem;
  shoes?: ClothingItem;
  outerwear?: ClothingItem;
  accessory?: ClothingItem;
};

function LayerBadge({
  item,
  className,
}: {
  item?: ClothingItem;
  className: string;
}) {
  if (!item) return null;

  return (
    <span
      className={`absolute z-30 max-w-36 truncate rounded-full border-2 border-fitme-plum/35 bg-fitme-cream px-3 py-1.5 text-center text-[0.62rem] font-black text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_16%)] ${className}`}
    >
      {item.name}
    </span>
  );
}

export function OutfitStage({
  avatar,
  top,
  bottom,
  shoes,
  outerwear,
  accessory,
}: OutfitStageProps) {
  return (
    <section className="relative isolate min-h-[42rem] overflow-hidden rounded-[2.4rem] border-2 border-fitme-plum/55 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.9),transparent_30%),linear-gradient(180deg,#ffdfec_0%,#eee4ff_52%,#d7eaff_100%)] p-5 shadow-[0_6px_0_rgb(87_41_88_/_21%)]">
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(126,80,140,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.13)_1px,transparent_1px)] bg-[size:22px_22px]"
        aria-hidden="true"
      />

      <div className="absolute left-5 top-5 z-40 rounded-xl border-2 border-fitme-plum/45 bg-fitme-cream px-3 py-2 text-fitme-plum shadow-[0_3px_0_rgb(87_41_88_/_20%)]">
        <p className="font-display text-base leading-none">
          outfit mirror
        </p>

        <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/70">
          style the character
        </p>
      </div>

      <span
        className="absolute right-8 top-10 z-40 font-display text-2xl text-amber-400 drop-shadow-sm"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute left-10 top-32 z-40 font-display text-xl text-fitme-blush drop-shadow-sm"
        aria-hidden="true"
      >
        ♥
      </span>

      <div
        className="absolute bottom-9 left-1/2 z-0 h-12 w-72 -translate-x-1/2 rounded-full bg-fitme-plum/20 blur-xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto mt-20 h-[34rem] max-w-[21rem]">
        <CartoonCharacter
          avatar={avatar}
          outfit={{
            top,
            bottom,
            shoes,
            outerwear,
            accessory,
          }}
        />
      </div>

      <LayerBadge
        item={top}
        className="bottom-24 left-5"
      />

      <LayerBadge
        item={outerwear}
        className="bottom-14 left-5"
      />

      <LayerBadge
        item={bottom}
        className="bottom-14 left-1/2 -translate-x-1/2"
      />

      <LayerBadge
        item={accessory}
        className="bottom-7 left-1/2 -translate-x-1/2"
      />

      <LayerBadge
        item={shoes}
        className="bottom-24 right-5"
      />
    </section>
  );
}