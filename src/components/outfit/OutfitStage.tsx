import feminineBase from "../../assets/avatars/fitme-3d-feminine-base.png";
import masculineBase from "../../assets/avatars/fitme-3d-masculine-base.png";
import neutralBase from "../../assets/avatars/fitme-3d-neutral-base.png";
import topOverlay from "../../assets/outfits/fitme-3d-top-overlay.png";
import bottomOverlay from "../../assets/outfits/fitme-3d-bottom-overlay.png";
import shoesOverlay from "../../assets/outfits/fitme-3d-shoes-overlay.png";
import outerwearOverlay from "../../assets/outfits/fitme-3d-outerwear-overlay.png";
import accessoryOverlay from "../../assets/outfits/fitme-3d-accessory-overlay.png";
import type { AvatarProfile, ClothingItem } from "../../types/fitme";

type OutfitStageProps = {
  avatar: AvatarProfile;
  top?: ClothingItem;
  bottom?: ClothingItem;
  shoes?: ClothingItem;
  outerwear?: ClothingItem;
  accessory?: ClothingItem;
};

const characterAssets = {
  Feminine: feminineBase,
  Masculine: masculineBase,
  Neutral: neutralBase,
} as const;

const colourFilter: Record<string, string> = {
  Black: "brightness(0.42) saturate(0.55)",
  Blue: "hue-rotate(165deg) saturate(1.08)",
  Pink: "hue-rotate(315deg) saturate(1.25)",
  Beige: "sepia(0.36) saturate(0.8)",
  Cream: "sepia(0.18) saturate(0.72) brightness(1.08)",
  White: "brightness(1.1) saturate(0.45)",
  Silver: "grayscale(0.55) brightness(1.12)",
  Pearl: "hue-rotate(290deg) saturate(0.4) brightness(1.12)",
};

function garmentStyle(item?: ClothingItem) {
  return {
    filter: colourFilter[item?.color ?? ""] ?? "none",
  };
}

function LayerBadge({
  item,
  position,
}: {
  item?: ClothingItem;
  position: string;
}) {
  if (!item) return null;

  return (
    <span
      className={`absolute z-30 max-w-36 truncate rounded-full border-2 border-fitme-plum/35 bg-fitme-cream px-3 py-1.5 text-center text-[0.62rem] font-black text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_16%)] ${position}`}
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
  const presentation = avatar.presentation ?? "Feminine";
  const characterAsset = characterAssets[presentation];

  const heightClass =
    avatar.height === "Tall"
      ? "scale-[1.04]"
      : avatar.height === "Petite"
        ? "scale-[0.94]"
        : "scale-100";

  return (
    <section className="relative isolate min-h-[42rem] overflow-hidden rounded-[2.4rem] border-2 border-fitme-plum/55 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.92),transparent_25%),linear-gradient(180deg,#ffdfec_0%,#eee4ff_52%,#d7eaff_100%)] p-5 shadow-[0_6px_0_rgb(87_41_88_/_21%)]">
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(126,80,140,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.13)_1px,transparent_1px)] bg-[size:22px_22px]"
        aria-hidden="true"
      />

      <div className="absolute left-5 top-5 z-40 rounded-xl border-2 border-fitme-plum/45 bg-fitme-cream px-3 py-2 text-fitme-plum shadow-[0_3px_0_rgb(87_41_88_/_20%)]">
        <p className="font-display text-base leading-none">outfit mirror</p>
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
        className="absolute bottom-9 left-1/2 z-10 h-12 w-72 -translate-x-1/2 rounded-full bg-fitme-plum/20 blur-xl"
        aria-hidden="true"
      />

      <div
        className={`relative z-10 mx-auto h-[35rem] max-w-sm origin-bottom ${heightClass}`}
      >
        <img
          src={characterAsset}
          alt="Your FitMe cartoon character"
          className="absolute inset-x-0 bottom-0 z-10 h-full w-full object-contain object-bottom"
        />

        {top && (
          <img
            src={topOverlay}
            alt={`A fitted visual layer for ${top.name}`}
            style={garmentStyle(top)}
            className="pointer-events-none absolute left-1/2 top-[13.2rem] z-20 h-52 w-52 -translate-x-1/2 object-contain drop-shadow-md"
          />
        )}

        {bottom && (
          <img
            src={bottomOverlay}
            alt={`A fitted visual layer for ${bottom.name}`}
            style={garmentStyle(bottom)}
            className="pointer-events-none absolute left-1/2 top-[23.2rem] z-20 h-48 w-44 -translate-x-1/2 object-contain drop-shadow-md"
          />
        )}

        {shoes && (
          <img
            src={shoesOverlay}
            alt={`A fitted visual layer for ${shoes.name}`}
            style={garmentStyle(shoes)}
            className="pointer-events-none absolute left-1/2 top-[33.7rem] z-20 h-20 w-48 -translate-x-1/2 object-contain drop-shadow-md"
          />
        )}

        {outerwear && (
          <img
            src={outerwearOverlay}
            alt={`A fitted visual layer for ${outerwear.name}`}
            style={garmentStyle(outerwear)}
            className="pointer-events-none absolute left-1/2 top-[12.5rem] z-20 h-56 w-60 -translate-x-1/2 object-contain drop-shadow-md"
          />
        )}

        {accessory && (
          <img
            src={accessoryOverlay}
            alt={`A fitted visual layer for ${accessory.name}`}
            style={garmentStyle(accessory)}
            className="pointer-events-none absolute left-1/2 top-[14.1rem] z-30 h-24 w-36 -translate-x-1/2 object-contain drop-shadow-sm"
          />
        )}
      </div>

      <LayerBadge
        item={top}
        position="bottom-24 left-5"
      />

      <LayerBadge
        item={outerwear}
        position="bottom-14 left-5"
      />

      <LayerBadge
        item={bottom}
        position="bottom-14 left-1/2 -translate-x-1/2"
      />

      <LayerBadge
        item={accessory}
        position="bottom-7 left-1/2 -translate-x-1/2"
      />

      <LayerBadge
        item={shoes}
        position="bottom-24 right-5"
      />
    </section>
  );
}