import type { AvatarProfile, ClothingItem } from "../../types/fitme";

type OutfitStageProps = {
  avatar: AvatarProfile;
  top?: ClothingItem;
  bottom?: ClothingItem;
  shoes?: ClothingItem;
  outerwear?: ClothingItem;
  accessory?: ClothingItem;
};

const skinToneColours: Record<string, string> = {
  Porcelain: "#ffe7d6",
  Peach: "#f6c7aa",
  Honey: "#d99565",
  Mocha: "#945c45",
  Espresso: "#623a31",
};

const hairColours: Record<string, string> = {
  Black: "#2b1e29",
  Brown: "#704331",
  Auburn: "#a24b38",
  Blonde: "#e0b361",
  Pink: "#e97fac",
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

function getGarmentColour(item?: ClothingItem): string {
  return garmentColours[item?.color ?? ""] ?? "#d9b8e5";
}

export function OutfitStage({ avatar, top, bottom, shoes, outerwear, accessory }: OutfitStageProps) {
  const skinTone = skinToneColours[avatar.skinTone] ?? skinToneColours.Peach;
  const hairColour = hairColours[avatar.hairColor] ?? hairColours.Brown;
  const topColour = getGarmentColour(top);
  const bottomColour = getGarmentColour(bottom);
  const shoeColour = getGarmentColour(shoes);
  const outerwearColour = getGarmentColour(outerwear);
  const accessoryColour = getGarmentColour(accessory);

  return (
    <section className="relative min-h-[38rem] overflow-hidden rounded-[2.3rem] border-2 border-fitme-plum/55 bg-gradient-to-b from-pink-100 via-violet-100 to-sky-100 p-5 shadow-[0_5px_0_rgb(87_41_88_/_20%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(126,80,140,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.14)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <span className="absolute left-7 top-7 font-display text-2xl text-fitme-blush" aria-hidden="true">✦</span>
      <span className="absolute right-8 top-12 font-display text-xl text-amber-400" aria-hidden="true">♥</span>
      <div className="absolute inset-x-11 bottom-8 h-12 rounded-full bg-fitme-plum/20 blur-lg" aria-hidden="true" />

      <div className="absolute left-5 top-5 rounded-xl border-2 border-fitme-plum/30 bg-fitme-cream/85 px-3 py-2 text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_16%)]">
        <p className="font-display text-base leading-none">outfit mirror</p>
        <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/65">try it your way</p>
      </div>

      <div className="relative z-10 mx-auto flex h-[33rem] w-72 flex-col items-center justify-end pt-16">
        <div className="relative h-44 w-36">
          <div className="absolute inset-x-1 top-0 h-20 rounded-[52%_52%_40%_40%] border-2 border-fitme-plum/35" style={{ backgroundColor: hairColour }} />
          <div className="absolute inset-x-5 top-8 h-32 rounded-[48%] border-2 border-fitme-plum/30" style={{ backgroundColor: skinTone }}>
            <span className="absolute left-[26%] top-[43%] size-2.5 rounded-full bg-fitme-plum/70" />
            <span className="absolute right-[26%] top-[43%] size-2.5 rounded-full bg-fitme-plum/70" />
            <span className="absolute left-[38%] right-[38%] top-[64%] h-1 rounded-full bg-[#c96f7e]/65" />
            {avatar.glasses && <span className="absolute inset-x-[13%] top-[36%] h-7 rounded-full border-[3px] border-fitme-plum/75" aria-label="Wearing glasses" />}
          </div>
          <div className="absolute left-0 top-5 h-16 w-9 rounded-tl-[90%] rounded-br-[60%]" style={{ backgroundColor: hairColour }} />
          {avatar.accessories.includes("Ribbon hair clip") && <span className="absolute right-2 top-8 text-xl text-fitme-blush" aria-label="Wearing a ribbon hair clip">♥</span>}
        </div>

        <div className="relative -mt-4 h-56 w-56">
          <div className="absolute inset-x-12 top-0 h-12 rounded-b-[50%] border-x-2 border-b-2 border-fitme-plum/20" style={{ backgroundColor: skinTone }} />

          <div className="absolute left-1/2 top-5 h-28 w-44 -translate-x-1/2 rounded-t-[45%] border-2 border-fitme-plum/40" style={{ backgroundColor: topColour }}>
            <span className="absolute -left-7 top-3 h-12 w-8 rotate-[18deg] rounded-l-full border-2 border-fitme-plum/40" style={{ backgroundColor: topColour }} />
            <span className="absolute -right-7 top-3 h-12 w-8 -rotate-[18deg] rounded-r-full border-2 border-fitme-plum/40" style={{ backgroundColor: topColour }} />
          </div>

          {outerwear && (
            <div className="absolute left-1/2 top-2 h-[8.5rem] w-52 -translate-x-1/2 rounded-t-[48%] border-[5px] border-fitme-plum/65" style={{ borderColor: outerwearColour }} aria-label={`Wearing ${outerwear.name}`} />
          )}

          {accessory && (
            <span className="absolute left-1/2 top-12 -translate-x-1/2 rounded-full border-2 border-fitme-plum/45 px-2 py-0.5 text-[0.6rem] font-black text-fitme-plum" style={{ backgroundColor: accessoryColour }} aria-label={`Wearing ${accessory.name}`}>✦</span>
          )}

          <div className="absolute left-1/2 top-[7.2rem] flex -translate-x-1/2 gap-1">
            <span className="h-28 w-16 rounded-b-[1.3rem] border-2 border-fitme-plum/40" style={{ backgroundColor: bottomColour }} />
            <span className="h-28 w-16 rounded-b-[1.3rem] border-2 border-fitme-plum/40" style={{ backgroundColor: bottomColour }} />
          </div>

          <div className="absolute left-1/2 top-[13.3rem] flex -translate-x-1/2 gap-7">
            <span className="h-7 w-20 rounded-[0.5rem_1.3rem_0.5rem_0.6rem] border-2 border-fitme-plum/40" style={{ backgroundColor: shoeColour }} />
            <span className="h-7 w-20 rounded-[0.5rem_1.3rem_0.5rem_0.6rem] border-2 border-fitme-plum/40" style={{ backgroundColor: shoeColour }} />
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 text-[0.62rem] font-black text-fitme-plum sm:grid-cols-3">
        {[top, bottom, shoes, outerwear, accessory].filter(Boolean).map((item) => (
          <span key={item?.id} className="truncate rounded-full border border-fitme-plum/20 bg-fitme-cream/80 px-2 py-1.5 text-center">{item?.name}</span>
        ))}
      </div>
    </section>
  );
}
