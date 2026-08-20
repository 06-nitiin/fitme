import feminineBase from "../../assets/avatars/fitme-3d-feminine-base.png";
import masculineBase from "../../assets/avatars/fitme-3d-masculine-base.png";
import neutralBase from "../../assets/avatars/fitme-3d-neutral-base.png";
import type { AvatarProfile } from "../../types/fitme";

type AvatarPreviewProps = {
  avatar: AvatarProfile;
};

const characterAssets = {
  Feminine: {
    image: feminineBase,
    label: "feminine character",
  },
  Masculine: {
    image: masculineBase,
    label: "masculine character",
  },
  Neutral: {
    image: neutralBase,
    label: "neutral character",
  },
} as const;

export function AvatarPreview({ avatar }: AvatarPreviewProps) {
  const presentation = avatar.presentation ?? "Feminine";
  const character = characterAssets[presentation];

  const wearsPearls = avatar.accessories.includes("Pearl necklace");
  const wearsEarrings = avatar.accessories.includes("Hoop earrings");
  const wearsRibbon = avatar.accessories.includes("Ribbon hair clip");

  return (
    <section className="relative isolate mx-auto min-h-[38rem] max-w-md overflow-hidden rounded-[2.4rem] border-2 border-fitme-plum/55 bg-[radial-gradient(circle_at_50%_22%,rgba(255,255,255,0.92),transparent_28%),linear-gradient(180deg,#ffdfec_0%,#eee4ff_52%,#d7eaff_100%)] p-5 shadow-[0_7px_0_rgb(87_41_88_/_20%)]">
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(126,80,140,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.12)_1px,transparent_1px)] bg-[size:22px_22px]"
        aria-hidden="true"
      />

      <div className="absolute left-5 top-5 z-30 rounded-xl border-2 border-fitme-plum/45 bg-fitme-cream px-3 py-2 text-fitme-plum shadow-[0_3px_0_rgb(87_41_88_/_20%)]">
        <p className="font-display text-base leading-none">
          character mirror
        </p>

        <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/70">
          {character.label}
        </p>
      </div>

      <span
        className="absolute right-8 top-9 z-30 font-display text-2xl text-amber-400 drop-shadow-sm"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute left-10 top-32 z-30 font-display text-xl text-fitme-blush drop-shadow-sm"
        aria-hidden="true"
      >
        ♥
      </span>

      <div
        className="absolute bottom-7 left-1/2 z-10 h-14 w-64 -translate-x-1/2 rounded-full bg-fitme-plum/20 blur-xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex min-h-[33rem] items-end justify-center pt-24">
        <img
          src={character.image}
          alt={`A ${character.label} for FitMe`}
          className={`relative z-10 h-[30rem] w-full object-contain object-bottom transition-transform ${
            avatar.height === "Tall"
              ? "scale-[1.05]"
              : avatar.height === "Petite"
                ? "scale-[0.94]"
                : "scale-100"
          }`}
        />

        {avatar.glasses && (
          <span
            className="absolute left-1/2 top-[12.6rem] z-20 h-12 w-28 -translate-x-1/2 rounded-[2rem] border-4 border-fitme-plum/75"
            aria-label="Wearing glasses"
          />
        )}

        {avatar.facialHair === "Moustache" && (
          <span
            className="absolute left-1/2 top-[16.3rem] z-20 h-2 w-10 -translate-x-1/2 rounded-full bg-fitme-plum/75"
            aria-label="Wearing a moustache"
          />
        )}

        {avatar.facialHair === "Short beard" && (
          <span
            className="absolute left-1/2 top-[16.3rem] z-20 h-8 w-14 -translate-x-1/2 rounded-b-[45%] border-b-4 border-fitme-plum/70"
            aria-label="Wearing a short beard"
          />
        )}

        {wearsRibbon && (
          <span
            className="absolute left-1/2 top-[8.8rem] z-20 ml-20 text-3xl text-fitme-blush drop-shadow-sm"
            aria-label="Wearing a ribbon hair clip"
          >
            ♥
          </span>
        )}

        {wearsEarrings && (
          <>
            <span
              className="absolute left-1/2 top-[15.4rem] z-20 -ml-20 size-4 rounded-full border-2 border-amber-400"
              aria-label="Wearing hoop earrings"
            />

            <span
              className="absolute left-1/2 top-[15.4rem] z-20 ml-16 size-4 rounded-full border-2 border-amber-400"
              aria-hidden="true"
            />
          </>
        )}

        {wearsPearls && (
          <span
            className="absolute left-1/2 top-[21.8rem] z-20 -translate-x-1/2 text-base tracking-[0.23em] text-white drop-shadow-sm"
            aria-label="Wearing a pearl necklace"
          >
            ••••
          </span>
        )}

        {avatar.tattoos && (
          <span
            className="absolute left-1/2 top-[24.5rem] z-20 ml-24 text-xl text-fitme-plum drop-shadow-sm"
            aria-label="Tiny star tattoo"
          >
            ✦
          </span>
        )}
      </div>

      <div className="absolute bottom-5 left-5 z-30 rounded-xl border-2 border-fitme-plum bg-fitme-cream px-3 py-2 shadow-[0_3px_0_rgb(87_41_88_/_20%)]">
        <p className="font-display text-base leading-none text-fitme-plum">
          your mini-me
        </p>

        <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/70">
          saved in your browser
        </p>
      </div>
    </section>
  );
}