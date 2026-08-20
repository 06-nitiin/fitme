import type { AvatarProfile } from "../../types/fitme";
import { CharacterScene } from "../character/CharacterScene";

type AvatarPreviewProps = {
  avatar: AvatarProfile;
};

export function AvatarPreview({ avatar }: AvatarPreviewProps) {
  const presentation = avatar.presentation ?? "Neutral";

  return (
    <section className="relative isolate mx-auto min-h-[38rem] max-w-md overflow-hidden rounded-[2.4rem] border-2 border-fitme-plum/55 bg-[linear-gradient(180deg,#ffdfec_0%,#eee4ff_52%,#d7eaff_100%)] p-5 shadow-[0_7px_0_rgb(87_41_88_/_20%)]">
      <div
        className="absolute inset-0 z-0 bg-[linear-gradient(rgba(126,80,140,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.12)_1px,transparent_1px)] bg-[size:22px_22px]"
        aria-hidden="true"
      />

      <div className="absolute left-5 top-5 z-30 rounded-xl border-2 border-fitme-plum/45 bg-fitme-cream px-3 py-2 text-fitme-plum shadow-[0_3px_0_rgb(87_41_88_/_20%)]">
        <p className="font-display text-base leading-none">
          character mirror
        </p>
        <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/70">
          {presentation} 3D base
        </p>
      </div>

      <span
        className="absolute right-8 top-9 z-30 font-display text-2xl text-amber-400"
        aria-hidden="true"
      >
        ✦
      </span>

      <span
        className="absolute left-10 top-32 z-30 font-display text-xl text-fitme-blush"
        aria-hidden="true"
      >
        ♥
      </span>

      <div className="relative z-10 mx-auto mt-20 h-[30rem] max-w-[20rem] overflow-hidden rounded-[2rem] bg-white/10">
        <CharacterScene avatar={avatar} />
      </div>

      <div className="absolute bottom-5 left-5 z-30 rounded-xl border-2 border-fitme-plum bg-fitme-cream px-3 py-2 shadow-[0_3px_0_rgb(87_41_88_/_20%)]">
        <p className="font-display text-base leading-none text-fitme-plum">
          your mini-me
        </p>
        <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/70">
          changes save here
        </p>
      </div>
    </section>
  );
}