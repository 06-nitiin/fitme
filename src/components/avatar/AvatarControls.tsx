import type { AvatarProfile } from "../../types/fitme";

export type AppearanceField =
  | "skinTone"
  | "hairStyle"
  | "hairColor"
  | "faceShape"
  | "eyeColor"
  | "glasses"
  | "facialHair"
  | "height"
  | "build"
  | "proportions"
  | "tattoos";

type AvatarControlsProps = {
  avatar: AvatarProfile;
  onChange: (field: AppearanceField, value: string | boolean) => void;
  onToggleAccessory: (accessory: string) => void;
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

type ToggleButtonProps = {
  label: string;
  isSelected: boolean;
  onClick: () => void;
};

function ToggleButton({ label, isSelected, onClick }: ToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isSelected}
      className={`fitme-tap rounded-xl border-2 px-4 py-2 text-xs font-extrabold transition focus-visible:outline-2 focus-visible:outline-offset-2 ${
        isSelected
          ? "border-fitme-plum bg-pink-200 text-fitme-plum shadow-[0_2px_0_rgb(87_41_88_/_22%)]"
          : "border-fitme-plum/30 bg-white/65 text-fitme-plum/75 hover:bg-pink-50"
      }`}
    >
      {label}
    </button>
  );
}

export function AvatarControls({ avatar, onChange, onToggleAccessory }: AvatarControlsProps) {
  const accessoryOptions = ["Pearl necklace", "Hoop earrings", "Ribbon hair clip"];

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
        <div className="mt-2">
          <ToggleButton label={avatar.glasses ? "Glasses on" : "Glasses off"} isSelected={avatar.glasses} onClick={() => onChange("glasses", !avatar.glasses)} />
        </div>
      </fieldset>

      <div className="border-t-2 border-dashed border-fitme-plum/25 pt-7">
        <p className="font-display text-lg text-fitme-plum">A few more you-details</p>
      </div>

      <OptionGroup
        label="Facial hair"
        options={["None", "Light stubble", "Short beard", "Moustache"]}
        selectedValue={avatar.facialHair}
        onSelect={(value) => onChange("facialHair", value)}
      />
      <OptionGroup
        label="Height"
        options={["Petite", "Average", "Tall"]}
        selectedValue={avatar.height}
        onSelect={(value) => onChange("height", value)}
      />
      <OptionGroup
        label="Build"
        options={["Slim", "Balanced", "Athletic", "Curvy"]}
        selectedValue={avatar.build}
        onSelect={(value) => onChange("build", value)}
      />
      <OptionGroup
        label="General proportions"
        options={["Balanced", "Broad shoulders", "Soft curves"]}
        selectedValue={avatar.proportions}
        onSelect={(value) => onChange("proportions", value)}
      />

      <fieldset>
        <legend className="text-xs font-black uppercase tracking-[0.14em] text-fitme-plum/70">Tattoo</legend>
        <div className="mt-2">
          <ToggleButton label={avatar.tattoos ? "Tiny tattoo on" : "No tattoo"} isSelected={avatar.tattoos} onClick={() => onChange("tattoos", !avatar.tattoos)} />
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-xs font-black uppercase tracking-[0.14em] text-fitme-plum/70">Accessories</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {accessoryOptions.map((accessory) => (
            <ToggleButton
              key={accessory}
              label={accessory}
              isSelected={avatar.accessories.includes(accessory)}
              onClick={() => onToggleAccessory(accessory)}
            />
          ))}
        </div>
      </fieldset>
    </div>
  );
}
