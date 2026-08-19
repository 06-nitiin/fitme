import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { CLOTHING_CATEGORIES, type ClothingCategory, type ClothingItem } from "../../types/fitme";

export type ClothingFormValues = Omit<ClothingItem, "id" | "createdAt">;

type ClothingFormProps = {
  initialItem: ClothingItem | null;
  onCancel: () => void;
  onSave: (values: ClothingFormValues) => void;
};

type Draft = {
  name: string;
  category: ClothingCategory;
  color: string;
  brand: string;
  size: string;
  notes: string;
  imageUrl: string;
};

const emptyDraft: Draft = {
  name: "",
  category: "T-Shirts",
  color: "",
  brand: "",
  size: "",
  notes: "",
  imageUrl: "",
};

function makeDraft(item: ClothingItem | null): Draft {
  if (!item) {
    return emptyDraft;
  }

  return {
    name: item.name,
    category: item.category,
    color: item.color,
    brand: item.brand,
    size: item.size ?? "",
    notes: item.notes ?? "",
    imageUrl: item.imageUrl ?? "",
  };
}

export function ClothingForm({ initialItem, onCancel, onSave }: ClothingFormProps) {
  const [draft, setDraft] = useState<Draft>(() => makeDraft(initialItem));
  const [formError, setFormError] = useState("");
  const [imageMessage, setImageMessage] = useState("");
  const isEditing = Boolean(initialItem);

  useEffect(() => {
    setDraft(makeDraft(initialItem));
    setFormError("");
    setImageMessage("");
  }, [initialItem]);

  function updateDraft<Key extends keyof Draft>(key: Key, value: Draft[Key]) {
    setDraft((currentDraft) => ({ ...currentDraft, [key]: value }));
  }

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImageMessage("Choose an image file, such as PNG, JPG, or WebP.");
      return;
    }

    if (file.size > 1_500_000) {
      setImageMessage("Please choose an image smaller than 1.5 MB for browser storage.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      updateDraft("imageUrl", String(reader.result));
      setImageMessage("Image ready to save with this clothing item.");
    };
    reader.onerror = () => setImageMessage("That image could not be read. Please try another file.");
    reader.readAsDataURL(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!draft.name.trim() || !draft.color.trim() || !draft.brand.trim()) {
      setFormError("Name, colour, and brand are the little details FitMe needs.");
      return;
    }

    onSave({
      name: draft.name.trim(),
      category: draft.category,
      color: draft.color.trim(),
      brand: draft.brand.trim(),
      size: draft.size.trim() || undefined,
      notes: draft.notes.trim() || undefined,
      imageUrl: draft.imageUrl || undefined,
    });
  }

  return (
    <section className="fitme-panel p-5 sm:p-7" aria-label={isEditing ? "Edit clothing" : "Add clothing"}>
      <div className="flex items-start justify-between gap-4 border-b-2 border-dashed border-fitme-plum/25 pb-5">
        <div>
          <p className="font-display text-2xl text-fitme-plum">{isEditing ? "Tweak this piece" : "Add a little style treasure"}</p>
          <p className="mt-1 text-sm font-bold leading-5 text-fitme-plum/65">Keep the details simple now; you can always edit them later.</p>
        </div>
        <button type="button" onClick={onCancel} className="fitme-tap grid size-9 place-items-center rounded-xl border-2 border-fitme-plum/30 bg-white/70 text-fitme-plum" aria-label="Close clothing form">
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-5 lg:grid-cols-[12rem_minmax(0,1fr)]">
        <div>
          <label className="flex min-h-48 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed border-fitme-plum/35 bg-pink-50/70 p-4 text-center">
            <input type="file" accept="image/png,image/jpeg,image/webp" className="sr-only" onChange={handleImageChange} />
            {draft.imageUrl ? (
              <img src={draft.imageUrl} alt="Selected clothing preview" className="h-40 w-full rounded-2xl object-cover" />
            ) : (
              <>
                <span className="grid size-12 place-items-center rounded-2xl border-2 border-fitme-plum/35 bg-fitme-cream text-fitme-plum">
                  <ImagePlus className="size-5" aria-hidden="true" />
                </span>
                <span className="mt-3 text-sm font-black text-fitme-plum">Choose a clothing image</span>
                <span className="mt-1 text-xs font-bold leading-5 text-fitme-plum/65">PNG, JPG, or WebP · up to 1.5 MB</span>
              </>
            )}
          </label>
          {draft.imageUrl && <button type="button" onClick={() => { updateDraft("imageUrl", ""); setImageMessage("Image removed from this item."); }} className="fitme-tap mt-2 text-xs font-black text-fitme-plum underline decoration-dashed underline-offset-4">Remove selected image</button>}
          {imageMessage && <p className="mt-2 text-xs font-bold leading-5 text-fitme-plum/70">{imageMessage}</p>}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.13em] text-fitme-plum/70">Clothing name</span>
            <input value={draft.name} onChange={(event) => updateDraft("name", event.target.value)} placeholder="e.g. Sunday Stripe Shirt" className="mt-2 w-full rounded-xl border-2 border-fitme-plum/30 bg-white/75 px-3 py-2.5 text-sm font-bold text-fitme-plum outline-none focus:border-fitme-plum focus:ring-2 focus:ring-pink-200" />
          </label>

          <label>
            <span className="text-xs font-black uppercase tracking-[0.13em] text-fitme-plum/70">Category</span>
            <select value={draft.category} onChange={(event) => updateDraft("category", event.target.value as ClothingCategory)} className="mt-2 w-full rounded-xl border-2 border-fitme-plum/30 bg-white/75 px-3 py-2.5 text-sm font-bold text-fitme-plum outline-none focus:border-fitme-plum focus:ring-2 focus:ring-pink-200">
              {CLOTHING_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>

          <label>
            <span className="text-xs font-black uppercase tracking-[0.13em] text-fitme-plum/70">Colour</span>
            <input value={draft.color} onChange={(event) => updateDraft("color", event.target.value)} placeholder="e.g. Cherry red" className="mt-2 w-full rounded-xl border-2 border-fitme-plum/30 bg-white/75 px-3 py-2.5 text-sm font-bold text-fitme-plum outline-none focus:border-fitme-plum focus:ring-2 focus:ring-pink-200" />
          </label>

          <label>
            <span className="text-xs font-black uppercase tracking-[0.13em] text-fitme-plum/70">Brand</span>
            <input value={draft.brand} onChange={(event) => updateDraft("brand", event.target.value)} placeholder="e.g. Your favourite brand" className="mt-2 w-full rounded-xl border-2 border-fitme-plum/30 bg-white/75 px-3 py-2.5 text-sm font-bold text-fitme-plum outline-none focus:border-fitme-plum focus:ring-2 focus:ring-pink-200" />
          </label>

          <label>
            <span className="text-xs font-black uppercase tracking-[0.13em] text-fitme-plum/70">Size <span className="normal-case tracking-normal">(optional)</span></span>
            <input value={draft.size} onChange={(event) => updateDraft("size", event.target.value)} placeholder="e.g. M or EU 40" className="mt-2 w-full rounded-xl border-2 border-fitme-plum/30 bg-white/75 px-3 py-2.5 text-sm font-bold text-fitme-plum outline-none focus:border-fitme-plum focus:ring-2 focus:ring-pink-200" />
          </label>

          <label className="sm:col-span-2">
            <span className="text-xs font-black uppercase tracking-[0.13em] text-fitme-plum/70">Notes <span className="normal-case tracking-normal">(optional)</span></span>
            <textarea value={draft.notes} onChange={(event) => updateDraft("notes", event.target.value)} placeholder="Fit, fabric, or a little reminder about when you love wearing it." rows={3} className="mt-2 w-full resize-y rounded-xl border-2 border-fitme-plum/30 bg-white/75 px-3 py-2.5 text-sm font-bold text-fitme-plum outline-none focus:border-fitme-plum focus:ring-2 focus:ring-pink-200" />
          </label>
        </div>

        {formError && <p className="lg:col-span-2 rounded-xl border-2 border-rose-300 bg-rose-50 px-3 py-2 text-sm font-bold text-rose-700">{formError}</p>}

        <div className="flex flex-wrap justify-end gap-3 lg:col-span-2">
          <button type="button" onClick={onCancel} className="fitme-tap rounded-xl border-2 border-fitme-plum/30 bg-white/70 px-4 py-2.5 text-sm font-black text-fitme-plum">Cancel</button>
          <button type="submit" className="fitme-tap rounded-xl border-2 border-fitme-plum bg-fitme-blush px-4 py-2.5 text-sm font-black text-white shadow-[0_3px_0_rgb(87_41_88_/_28%)]">{isEditing ? "Save changes" : "Add to wardrobe"}</button>
        </div>
      </form>
    </section>
  );
}
