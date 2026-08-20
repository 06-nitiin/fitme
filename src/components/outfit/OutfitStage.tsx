import type { AvatarProfile, ClothingItem } from "../../types/fitme";

type OutfitStageProps = { avatar: AvatarProfile; top?: ClothingItem; bottom?: ClothingItem; shoes?: ClothingItem; outerwear?: ClothingItem; accessory?: ClothingItem };

const skinToneColours: Record<string, string> = { Porcelain: "#ffe7d6", Peach: "#f6c7aa", Honey: "#d99565", Mocha: "#945c45", Espresso: "#623a31" };
const hairColours: Record<string, string> = { Black: "#2b1e29", Brown: "#704331", Auburn: "#a24b38", Blonde: "#e0b361", Pink: "#e97fac" };
const garmentColours: Record<string, string> = { White: "#fffdf8", Black: "#443448", Pink: "#f3a5c5", Blue: "#9bc7e3", Beige: "#e4d0ab", Cream: "#fff2cf", Pearl: "#f6edf6", Silver: "#cdd3dd" };

function getColour(item?: ClothingItem): string { return garmentColours[item?.color ?? ""] ?? "#d9b8e5"; }
function bodyWidth(build: string): string { if (build === "Slim") return "w-52"; if (build === "Athletic") return "w-64"; if (build === "Curvy") return "w-60"; return "w-56"; }

export function OutfitStage({ avatar, top, bottom, shoes, outerwear, accessory }: OutfitStageProps) {
  const skinTone = skinToneColours[avatar.skinTone] ?? skinToneColours.Peach;
  const hairColour = hairColours[avatar.hairColor] ?? hairColours.Brown;
  const topColour = getColour(top);
  const bottomColour = getColour(bottom);
  const shoeColour = getColour(shoes);
  const outerwearColour = getColour(outerwear);
  const accessoryColour = getColour(accessory);
  const heightClass = avatar.height === "Tall" ? "scale-[1.04]" : avatar.height === "Petite" ? "scale-[0.94]" : "scale-100";
  const hasPonytail = avatar.hairStyle === "High ponytail";
  const wearsRibbon = avatar.accessories.includes("Ribbon hair clip");
  const wearsPearls = avatar.accessories.includes("Pearl necklace");

  return (
    <section className="relative min-h-[40rem] overflow-hidden rounded-[2.4rem] border-2 border-fitme-plum/55 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.85),transparent_25%),linear-gradient(180deg,#ffdfec_0%,#eee4ff_52%,#d7eaff_100%)] p-5 shadow-[0_6px_0_rgb(87_41_88_/_21%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(126,80,140,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.13)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute left-5 top-5 rounded-xl border-2 border-fitme-plum/30 bg-fitme-cream/90 px-3 py-2 text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_16%)]"><p className="font-display text-base leading-none">outfit mirror</p><p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/65">style the character</p></div>
      <span className="absolute right-8 top-10 font-display text-2xl text-amber-400" aria-hidden="true">✦</span>
      <span className="absolute left-10 top-28 font-display text-xl text-fitme-blush" aria-hidden="true">♥</span>
      <div className="absolute bottom-8 left-1/2 h-12 w-72 -translate-x-1/2 rounded-full bg-fitme-plum/20 blur-xl" aria-hidden="true" />

      <div className={`relative z-10 mx-auto flex h-[35rem] w-80 origin-bottom flex-col items-center justify-end ${heightClass}`}>
        <div className="relative h-48 w-48">
          {hasPonytail && <span className="absolute right-2 top-14 h-24 w-20 rounded-[50%_55%_55%_30%] border-2 border-fitme-plum/35" style={{ backgroundColor: hairColour }} />}
          <span className="absolute inset-x-5 top-0 h-28 rounded-[50%_50%_42%_42%] border-2 border-fitme-plum/30" style={{ backgroundColor: hairColour }} />
          <span className="absolute inset-x-9 top-11 h-36 rounded-[44%_44%_48%_48%] border-2 border-fitme-plum/35" style={{ backgroundColor: skinTone }}>
            <i className="absolute left-[24%] top-[48%] size-3 rounded-full bg-fitme-plum/75" /><i className="absolute right-[24%] top-[48%] size-3 rounded-full bg-fitme-plum/75" /><i className="absolute left-[37%] right-[37%] top-[73%] h-2 rounded-full bg-[#c96f7e]/75" />
            {avatar.glasses && <i className="absolute inset-x-[12%] top-[40%] h-9 rounded-full border-[3px] border-fitme-plum/75" />}
            {avatar.facialHair === "Short beard" && <i className="absolute inset-x-[27%] bottom-3 h-6 rounded-b-[45%] border-b-4 border-fitme-plum/65" />}
            {avatar.facialHair === "Moustache" && <i className="absolute left-[37%] right-[37%] top-[67%] h-2 rounded-full bg-fitme-plum/75" />}
          </span>
          {avatar.hairStyle !== "Buzzed" && <span className="absolute left-4 top-11 h-20 w-12 rounded-tl-[90%] rounded-br-[70%]" style={{ backgroundColor: hairColour }} />}
          {wearsRibbon && <span className="absolute right-8 top-14 text-2xl text-fitme-blush">♥</span>}
        </div>

        <div className={`relative -mt-6 h-64 ${bodyWidth(avatar.build)}`}>
          <span className="absolute inset-x-11 top-0 h-14 rounded-b-[45%] border-x-2 border-b-2 border-fitme-plum/20" style={{ backgroundColor: skinTone }} />
          <span className="absolute left-1/2 top-9 h-32 w-[11.5rem] -translate-x-1/2 rounded-t-[45%] border-2 border-fitme-plum/45" style={{ backgroundColor: topColour }}>
            <i className="absolute -left-8 top-5 h-14 w-9 rotate-[18deg] rounded-l-full border-2 border-fitme-plum/45" style={{ backgroundColor: topColour }} /><i className="absolute -right-8 top-5 h-14 w-9 -rotate-[18deg] rounded-r-full border-2 border-fitme-plum/45" style={{ backgroundColor: topColour }} />
          </span>
          {outerwear && <span className="absolute left-1/2 top-5 h-[9.6rem] w-[13.3rem] -translate-x-1/2 rounded-t-[48%] border-[6px]" style={{ borderColor: outerwearColour }} aria-label={`Wearing ${outerwear.name}`} />}
          {accessory && <span className="absolute left-1/2 top-[4.7rem] -translate-x-1/2 rounded-full border-2 border-fitme-plum/50 px-2.5 py-1 text-xs font-black text-fitme-plum" style={{ backgroundColor: accessoryColour }} aria-label={`Wearing ${accessory.name}`}>✦</span>}
          {wearsPearls && <span className="absolute left-1/2 top-[3.5rem] -translate-x-1/2 text-base tracking-[0.22em] text-white">••••</span>}
          {avatar.tattoos && <span className="absolute right-5 top-[7.5rem] text-lg text-fitme-plum/80">✦</span>}
          <div className="absolute left-1/2 top-[8.7rem] flex -translate-x-1/2 gap-1"><i className="h-[7.3rem] w-[4.2rem] rounded-b-[1.35rem] border-2 border-fitme-plum/40" style={{ backgroundColor: bottomColour }} /><i className="h-[7.3rem] w-[4.2rem] rounded-b-[1.35rem] border-2 border-fitme-plum/40" style={{ backgroundColor: bottomColour }} /></div>
          <div className="absolute left-1/2 top-[15.4rem] flex -translate-x-1/2 gap-8"><i className="h-8 w-20 rounded-[0.5rem_1.4rem_0.5rem_0.6rem] border-2 border-fitme-plum/40" style={{ backgroundColor: shoeColour }} /><i className="h-8 w-20 rounded-[0.5rem_1.4rem_0.5rem_0.6rem] border-2 border-fitme-plum/40" style={{ backgroundColor: shoeColour }} /></div>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-2 gap-2 text-[0.62rem] font-black text-fitme-plum sm:grid-cols-3">{[top, bottom, shoes, outerwear, accessory].filter(Boolean).map((item) => <span key={item?.id} className="truncate rounded-full border border-fitme-plum/20 bg-fitme-cream/85 px-2 py-1.5 text-center">{item?.name}</span>)}</div>
    </section>
  );
}
