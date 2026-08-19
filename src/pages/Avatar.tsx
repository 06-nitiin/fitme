import { useEffect, useState } from "react";
import { RefreshCcw, Sparkles } from "lucide-react";
import { AvatarControls, type AppearanceField } from "../components/avatar/AvatarControls";
import { AvatarPreview } from "../components/avatar/AvatarPreview";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../lib/storage";
import type { AvatarProfile } from "../types/fitme";

const defaultAvatar: AvatarProfile = {
  skinTone: "Peach",
  hairStyle: "Soft waves",
  hairColor: "Brown",
  faceShape: "Oval",
  eyeColor: "Brown",
  facialHair: "None",
  glasses: false,
  height: "Average",
  build: "Balanced",
  proportions: "Balanced",
  tattoos: false,
  accessories: [],
};

export function Avatar() {
  const [avatar, setAvatar] = useState<AvatarProfile>(() =>
    loadFromStorage(STORAGE_KEYS.avatar, defaultAvatar),
  );

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.avatar, avatar);
  }, [avatar]);

  function handleAppearanceChange(field: AppearanceField, value: string | boolean) {
    setAvatar((currentAvatar) => {
      if (field === "glasses" || field === "tattoos") {
        return { ...currentAvatar, [field]: Boolean(value) };
      }

      return { ...currentAvatar, [field]: String(value) };
    });
  }

  function toggleAccessory(accessory: string) {
    setAvatar((currentAvatar) => {
      const isSelected = currentAvatar.accessories.includes(accessory);
      const accessories = isSelected
        ? currentAvatar.accessories.filter((item) => item !== accessory)
        : [...currentAvatar.accessories, accessory];

      return { ...currentAvatar, accessories };
    });
  }

  function resetAvatar() {
    setAvatar(defaultAvatar);
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="fitme-panel overflow-hidden p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-fitme-plum/35 bg-fitme-cream/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-fitme-plum">
              <Sparkles className="size-3.5 text-fitme-blush" aria-hidden="true" />
              Avatar station
            </div>
            <h1 className="mt-4 font-display text-4xl leading-none text-fitme-plum sm:text-5xl">Make your mini-me.</h1>
            <p className="mt-4 text-base font-bold leading-7 text-fitme-plum/75 sm:text-lg">
              Tap an option and watch your little mirror moment change right away.
            </p>
          </div>

          <button
            type="button"
            onClick={resetAvatar}
            className="fitme-tap inline-flex items-center gap-2 rounded-xl border-2 border-fitme-plum/40 bg-white/70 px-3 py-2 text-xs font-black text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_14%)] focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            <RefreshCcw className="size-3.5" aria-hidden="true" />
            Reset choices
          </button>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,0.85fr)_minmax(22rem,1fr)] xl:items-start">
          <AvatarPreview avatar={avatar} />
          <div className="fitme-inset max-h-[50rem] overflow-y-auto rounded-[1.8rem] p-5 sm:p-7">
            <div className="mb-6 border-b-2 border-dashed border-fitme-plum/30 pb-4">
              <p className="font-display text-xl text-fitme-plum">Pick your details</p>
              <p className="mt-1 text-sm font-bold leading-5 text-fitme-plum/65">Your choices save automatically in this browser.</p>
            </div>
            <AvatarControls avatar={avatar} onChange={handleAppearanceChange} onToggleAccessory={toggleAccessory} />
          </div>
        </div>
      </section>

      <aside className="rounded-3xl border-2 border-dashed border-fitme-plum/35 bg-white/50 p-5 text-fitme-plum">
        <p className="font-display text-lg">Saved in your style space</p>
        <p className="mt-1 text-sm font-bold leading-6 text-fitme-plum/70">
          Try a few combinations, then refresh the browser. Your mini-me should look exactly the same when you return.
        </p>
      </aside>
    </div>
  );
}
