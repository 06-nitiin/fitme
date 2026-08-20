import type { AvatarProfile } from "../../types/fitme";

type AvatarPreviewProps = { avatar: AvatarProfile };

const skinToneColours: Record<string, string> = { Porcelain: "#ffe7d6", Peach: "#f6c7aa", Honey: "#d99565", Mocha: "#945c45", Espresso: "#623a31" };
const hairColours: Record<string, string> = { Black: "#2b1e29", Brown: "#704331", Auburn: "#a24b38", Blonde: "#e0b361", Pink: "#e97fac" };
const eyeColours: Record<string, string> = { Brown: "#5a382d", Hazel: "#8d6a36", Blue: "#5b9eb6", Green: "#5f9474" };

function getBodySize(build: string): string {
  if (build === "Slim") return "w-52";
  if (build === "Athletic") return "w-64";
  if (build === "Curvy") return "w-60";
  return "w-56";
}

function getPresentationDetails(presentation: string) {
  if (presentation === "Masculine") return { label: "masculine base", jacket: "bg-sky-300", neck: "rounded-[36%]", shoulder: "rounded-t-[34%]" };
  if (presentation === "Neutral") return { label: "neutral base", jacket: "bg-violet-300", neck: "rounded-[42%]", shoulder: "rounded-t-[42%]" };
  return { label: "feminine base", jacket: "bg-pink-300", neck: "rounded-[52%]", shoulder: "rounded-t-[50%]" };
}

export function AvatarPreview({ avatar }: AvatarPreviewProps) {
  const presentation = getPresentationDetails(avatar.presentation ?? "Feminine");
  const skinTone = skinToneColours[avatar.skinTone] ?? skinToneColours.Peach;
  const hairColour = hairColours[avatar.hairColor] ?? hairColours.Brown;
  const eyeColour = eyeColours[avatar.eyeColor] ?? eyeColours.Brown;
  const wearsPearls = avatar.accessories.includes("Pearl necklace");
  const wearsEarrings = avatar.accessories.includes("Hoop earrings");
  const wearsRibbon = avatar.accessories.includes("Ribbon hair clip");
  const hasPonytail = avatar.hairStyle === "High ponytail";
  const hasCurls = avatar.hairStyle === "Curly bob";
  const bodySize = getBodySize(avatar.build);
  const heightClass = avatar.height === "Tall" ? "scale-[1.05]" : avatar.height === "Petite" ? "scale-[0.93]" : "scale-100";
  const faceShape = avatar.faceShape === "Square" ? "rounded-[30%]" : avatar.faceShape === "Heart" ? "rounded-[48%_48%_42%_42%]" : avatar.faceShape === "Round" ? "rounded-[46%]" : "rounded-[44%_44%_48%_48%]";

  return (
    <section className="relative mx-auto min-h-[36rem] max-w-md overflow-hidden rounded-[2.4rem] border-2 border-fitme-plum/55 bg-[radial-gradient(circle_at_50%_26%,rgba(255,255,255,0.9),transparent_28%),linear-gradient(180deg,#ffddec_0%,#eee4ff_52%,#d8eafe_100%)] p-5 shadow-[0_7px_0_rgb(87_41_88_/_20%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(126,80,140,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.12)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <div className="absolute left-5 top-5 rounded-xl border-2 border-fitme-plum/30 bg-fitme-cream/90 px-3 py-2 text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_16%)]"><p className="font-display text-base leading-none">character mirror</p><p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/65">{presentation.label}</p></div>
      <span className="absolute right-8 top-9 font-display text-2xl text-amber-400" aria-hidden="true">✦</span>
      <span className="absolute left-10 top-28 font-display text-xl text-fitme-blush" aria-hidden="true">♥</span>
      <div className="absolute bottom-8 left-1/2 h-14 w-64 -translate-x-1/2 rounded-full bg-fitme-plum/20 blur-xl" aria-hidden="true" />

      <div className={`relative z-10 mx-auto flex min-h-[32rem] w-72 origin-bottom flex-col items-center justify-end transition-transform ${heightClass}`}>
        <div className="relative h-60 w-48">
          {hasPonytail && <div className="absolute right-0 top-14 h-24 w-20 rounded-[50%_55%_55%_30%] border-2 border-fitme-plum/35" style={{ backgroundColor: hairColour }} aria-hidden="true" />}
          <div className="absolute inset-x-5 top-0 h-28 rounded-[50%_50%_42%_42%] border-2 border-fitme-plum/30" style={{ backgroundColor: hairColour }} />
          {hasCurls && <div className="absolute inset-x-1 top-6 flex justify-between" aria-hidden="true">{[0, 1, 2, 3, 4].map((curl) => <span key={curl} className="size-10 rounded-full border-2 border-fitme-plum/25" style={{ backgroundColor: hairColour }} />)}</div>}
          <div className={`absolute inset-x-9 top-11 h-40 border-2 border-fitme-plum/35 ${faceShape}`} style={{ backgroundColor: skinTone }}>
            <span className="absolute left-[20%] top-[39%] h-1.5 w-7 rotate-[-8deg] rounded-full bg-fitme-plum/70" aria-hidden="true" />
            <span className="absolute right-[20%] top-[39%] h-1.5 w-7 rotate-[8deg] rounded-full bg-fitme-plum/70" aria-hidden="true" />
            <span className="absolute left-[25%] top-[47%] size-4 rounded-full border border-fitme-plum/45" style={{ backgroundColor: eyeColour }} />
            <span className="absolute right-[25%] top-[47%] size-4 rounded-full border border-fitme-plum/45" style={{ backgroundColor: eyeColour }} />
            <span className="absolute left-1/2 top-[59%] h-5 w-3 -translate-x-1/2 rounded-b-full border-b-2 border-fitme-plum/25" aria-hidden="true" />
            <span className="absolute left-[37%] right-[37%] top-[72%] h-2 rounded-full bg-[#c96f7e]/75" aria-hidden="true" />
            {avatar.glasses && <div className="absolute inset-x-[10%] top-[42%] flex items-center justify-between" aria-label="Wearing glasses"><span className="size-10 rounded-full border-[3px] border-fitme-plum/80" /><span className="h-[3px] w-3 bg-fitme-plum/80" /><span className="size-10 rounded-full border-[3px] border-fitme-plum/80" /></div>}
            {avatar.facialHair === "Light stubble" && <span className="absolute inset-x-[31%] top-[76%] border-t-2 border-dotted border-fitme-plum/60" />}
            {avatar.facialHair === "Short beard" && <span className="absolute inset-x-[26%] bottom-4 h-7 rounded-b-[45%] border-b-4 border-fitme-plum/65" />}
            {avatar.facialHair === "Moustache" && <span className="absolute left-[37%] right-[37%] top-[67%] h-2 rounded-full bg-fitme-plum/75" />}
            {wearsEarrings && <><span className="absolute -left-3 top-[62%] size-4 rounded-full border-2 border-amber-400" /><span className="absolute -right-3 top-[62%] size-4 rounded-full border-2 border-amber-400" /></>}
          </div>
          {avatar.hairStyle !== "Buzzed" && <div className="absolute left-4 top-10 h-20 w-12 rounded-tl-[90%] rounded-br-[70%]" style={{ backgroundColor: hairColour }} aria-hidden="true" />}
          {wearsRibbon && <span className="absolute right-8 top-13 text-2xl text-fitme-blush" aria-label="Wearing a ribbon hair clip">♥</span>}
        </div>

        <div className={`relative -mt-8 h-64 overflow-hidden border-2 border-fitme-plum/35 bg-fitme-cream ${bodySize} ${presentation.shoulder}`}>
          <div className={`absolute inset-x-12 top-0 h-16 border-x-2 border-b-2 border-fitme-plum/20 ${presentation.neck}`} style={{ backgroundColor: skinTone }} />
          <div className={`absolute inset-x-0 bottom-0 h-48 ${presentation.jacket}`} />
          <div className="absolute left-1/2 top-20 h-24 w-0.5 -translate-x-1/2 bg-white/75" aria-hidden="true" />
          <span className="absolute left-1/2 top-11 -translate-x-1/2 text-2xl text-fitme-plum/70" aria-hidden="true">✦</span>
          {wearsPearls && <span className="absolute left-1/2 top-9 -translate-x-1/2 text-base tracking-[0.23em] text-white" aria-label="Wearing a pearl necklace">••••</span>}
          {avatar.tattoos && <span className="absolute right-5 top-24 text-xl text-fitme-plum/80" aria-label="Tiny star tattoo">✦</span>}
        </div>
      </div>

      <div className="absolute bottom-5 left-5 rounded-xl border-2 border-fitme-plum bg-fitme-cream/90 px-3 py-2 shadow-[0_2px_0_rgb(87_41_88_/_18%)]"><p className="font-display text-base leading-none text-fitme-plum">your mini-me</p><p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/70">saved in your browser</p></div>
    </section>
  );
}
