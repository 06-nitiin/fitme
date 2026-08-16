import type { AvatarProfile } from "../../types/fitme";

type AvatarPreviewProps = {
  avatar: AvatarProfile;
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

const eyeColours: Record<string, string> = {
  Brown: "#5a382d",
  Hazel: "#8d6a36",
  Blue: "#5b9eb6",
  Green: "#5f9474",
};

const faceShapeClasses: Record<string, string> = {
  Oval: "rounded-[48%]",
  Round: "rounded-[45%]",
  Heart: "rounded-[52%_52%_45%_45%]",
  Square: "rounded-[35%]",
};

const hairStyleClasses: Record<string, string> = {
  "Soft waves": "h-24 rounded-[52%_52%_40%_40%]",
  "Curly bob": "h-20 rounded-[48%_48%_38%_38%]",
  "High ponytail": "h-20 rounded-[48%_48%_38%_38%]",
  Buzzed: "h-11 rounded-t-[45%]",
};

export function AvatarPreview({ avatar }: AvatarPreviewProps) {
  const skinTone = skinToneColours[avatar.skinTone] ?? skinToneColours.Peach;
  const hairColour = hairColours[avatar.hairColor] ?? hairColours.Brown;
  const eyeColour = eyeColours[avatar.eyeColor] ?? eyeColours.Brown;
  const faceShape = faceShapeClasses[avatar.faceShape] ?? faceShapeClasses.Oval;
  const hairStyle = hairStyleClasses[avatar.hairStyle] ?? hairStyleClasses["Soft waves"];
  const wearsPonytail = avatar.hairStyle === "High ponytail";
  const hasCurls = avatar.hairStyle === "Curly bob";

  return (
    <div className="relative mx-auto flex min-h-[30rem] max-w-md items-end justify-center overflow-hidden rounded-[2.2rem] border-2 border-fitme-plum/55 bg-gradient-to-b from-pink-100 via-violet-100 to-sky-100 px-6 pt-10 shadow-[0_5px_0_rgb(87_41_88_/_20%)]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(126,80,140,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.14)_1px,transparent_1px)] bg-[size:22px_22px]" />
      <span className="absolute left-8 top-8 font-display text-2xl text-fitme-blush" aria-hidden="true">✦</span>
      <span className="absolute right-9 top-16 font-display text-xl text-amber-400" aria-hidden="true">♥</span>
      <div className="absolute bottom-7 h-12 w-64 rounded-full bg-fitme-plum/20 blur-lg" aria-hidden="true" />

      <div className="relative z-10 flex flex-col items-center">
        {wearsPonytail && (
          <div
            className="absolute -right-9 top-14 h-20 w-16 rounded-[50%_50%_60%_35%] border-2 border-fitme-plum/35"
            style={{ backgroundColor: hairColour }}
            aria-hidden="true"
          />
        )}

        <div className="relative h-56 w-44">
          <div
            className={`absolute inset-x-3 top-0 border-2 border-fitme-plum/35 ${hairStyle}`}
            style={{ backgroundColor: hairColour }}
            aria-hidden="true"
          />

          {hasCurls && (
            <div className="absolute inset-x-0 top-3 flex justify-between" aria-hidden="true">
              {[0, 1, 2, 3].map((curl) => (
                <span key={curl} className="size-8 rounded-full border-2 border-fitme-plum/25" style={{ backgroundColor: hairColour }} />
              ))}
            </div>
          )}

          <div
            className={`absolute inset-x-7 top-8 h-44 border-2 border-fitme-plum/30 ${faceShape}`}
            style={{ backgroundColor: skinTone }}
          >
            <div className="absolute left-[25%] top-[43%] size-3 rounded-full border border-fitme-plum/40" style={{ backgroundColor: eyeColour }} />
            <div className="absolute right-[25%] top-[43%] size-3 rounded-full border border-fitme-plum/40" style={{ backgroundColor: eyeColour }} />
            <div className="absolute left-[34%] right-[34%] top-[62%] h-1.5 rounded-full bg-[#c96f7e]/65" />

            {avatar.glasses && (
              <div className="absolute inset-x-[14%] top-[36%] flex items-center justify-between" aria-label="Wearing glasses">
                <span className="size-9 rounded-full border-[3px] border-fitme-plum/75" />
                <span className="h-[3px] w-3 bg-fitme-plum/75" />
                <span className="size-9 rounded-full border-[3px] border-fitme-plum/75" />
              </div>
            )}
          </div>

          {avatar.hairStyle !== "Buzzed" && (
            <div
              className="absolute left-3 top-3 h-16 w-10 rounded-tl-[90%] rounded-br-[60%]"
              style={{ backgroundColor: hairColour }}
              aria-hidden="true"
            />
          )}
        </div>

        <div className="relative -mt-5 h-44 w-60 overflow-hidden rounded-t-[48%] border-2 border-fitme-plum/35 bg-fitme-cream">
          <div className="absolute inset-x-10 top-0 h-12 rounded-b-[50%] border-x-2 border-b-2 border-fitme-plum/20" style={{ backgroundColor: skinTone }} />
          <div className="absolute inset-x-0 bottom-0 h-32 rounded-t-[48%] bg-pink-300" />
          <span className="absolute left-1/2 top-16 -translate-x-1/2 text-2xl text-fitme-plum/65" aria-hidden="true">♥</span>
        </div>
      </div>

      <div className="absolute bottom-5 left-5 rounded-xl border-2 border-fitme-plum bg-fitme-cream/90 px-3 py-2 shadow-[0_2px_0_rgb(87_41_88_/_18%)]">
        <p className="font-display text-base leading-none text-fitme-plum">your mini-me</p>
        <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/70">changing with you</p>
      </div>
    </div>
  );
}
