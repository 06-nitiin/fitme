import type { AvatarProfile } from "../../types/fitme";

export type AppearanceField =
  | "skinTone"
  | "hairStyle"
  | "hairColor"
  | "faceShape"
  | "eyeColor"
  | "glasses";

type AvatarControlsProps = {
  avatar: AvatarProfile;
  onChange: (field: AppearanceField, value: string | boolean) => void;
};

type OptionGroupProps = {
  label: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  colourOptions?: Record<string, string>;
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

function OptionGroup({ label, options, selectedValue, onSelect, colourOptions }: OptionGroupProps) {
  return (
    <fieldset>
      <legend className="text-xs font-black uppercase tracking-[0.14em] text-fitme-plum/70">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = option === selectedValue;
          const colour = colourOptions?.[option];

          return (
            <button
              key={option}
              type="button"
              onClick={() => onSelect(option)}
              aria-pressed={isSelected}
              className={`fitme-tap inline-flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-xs font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 ${
                isSelected
                  ? "border-fitme-plum bg-pink-200 text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_22%)]"
                  : "border-fitme-plum/30 bg-white/65 text-fitme-plum/75 hover:bg-pink-50"
              }`}
            >
              {colour && <span className="size-3.5 rounded-full border border-fitme-plum/35" style={{ backgroundColor: colour }} aria-hidden="true" />}
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function AvatarControls({ avatar, onChange }: AvatarControlsProps) {
  return (
    <div className="space-y-7">
      <OptionGroup
        label="Skin tone"
        options={Object.keys(skinToneColours)}
        selectedValue={avatar.skinTone}
        onSelect={(value) => onChange("skinTone", value)}
        colourOptions={skinToneColours}
      />
      <OptionGroup
        label="Hair style"
        options={["Soft waves", "Curly bob", "High ponytail", "Buzzed"]}
        selectedValue={avatar.hairStyle}
        onSelect={(value) => onChange("hairStyle", value)}
      />
      <OptionGroup
        label="Hair colour"
        options={Object.keys(hairColours)}
        selectedValue={avatar.hairColor}
        onSelect={(value) => onChange("hairColor", value)}
        colourOptions={hairColours}
      />
      <OptionGroup
        label="Face shape"
        options={["Oval", "Round", "Heart", "Square"]}
        selectedValue={avatar.faceShape}
        onSelect={(value) => onChange("faceShape", value)}
      />
      <OptionGroup
        label="Eye colour"
        options={Object.keys(eyeColours)}
        selectedValue={avatar.eyeColor}
        onSelect={(value) => onChange("eyeColor", value)}
        colourOptions={eyeColours}
      />

      <fieldset>
        <legend className="text-xs font-black uppercase tracking-[0.14em] text-fitme-plum/70">Glasses</legend>
        <button
          type="button"
          onClick={() => onChange("glasses", !avatar.glasses)}
          aria-pressed={avatar.glasses}
          className={`fitme-tap mt-2 rounded-xl border-2 px-4 py-2 text-xs font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 ${
            avatar.glasses
              ? "border-fitme-plum bg-pink-200 text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_22%)]"
              : "border-fitme-plum/30 bg-white/65 text-fitme-plum/75 hover:bg-pink-50"
          }`}
        >
          {avatar.glasses ? "Glasses on" : "Glasses off"}
        </button>
      </fieldset>
    </div>
  );
}
