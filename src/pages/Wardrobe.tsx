import { useEffect, useMemo, useState } from "react";
import { Plus, Search, Shirt, Sparkles } from "lucide-react";
import { ClothingCard } from "../components/wardrobe/ClothingCard";
import { ClothingForm, type ClothingFormValues } from "../components/wardrobe/ClothingForm";
import { starterWardrobe } from "../data/starterWardrobe";
import { loadFromStorage, saveToStorage, STORAGE_KEYS } from "../lib/storage";
import { createFitMeId, filterWardrobe } from "../lib/wardrobe";
import { CLOTHING_CATEGORIES, type ClothingCategory, type ClothingItem } from "../types/fitme";

type CategoryFilter = "All" | ClothingCategory;

export function Wardrobe() {
  const [wardrobe, setWardrobe] = useState<ClothingItem[]>(() =>
    loadFromStorage(STORAGE_KEYS.wardrobe, starterWardrobe),
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClothingItem | null>(null);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.wardrobe, wardrobe);
  }, [wardrobe]);

  const visibleWardrobe = useMemo(
    () => filterWardrobe(wardrobe, searchTerm, selectedCategory === "All" ? undefined : selectedCategory),
    [wardrobe, searchTerm, selectedCategory],
  );

  function openAddForm() {
    setEditingItem(null);
    setIsFormOpen(true);
  }

  function openEditForm(item: ClothingItem) {
    setEditingItem(item);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingItem(null);
  }

  function handleSave(values: ClothingFormValues) {
    setWardrobe((currentWardrobe) => {
      if (editingItem) {
        return currentWardrobe.map((item) =>
          item.id === editingItem.id ? { ...item, ...values } : item,
        );
      }

      return [
        {
          ...values,
          id: createFitMeId("clothing"),
          createdAt: new Date().toISOString(),
        },
        ...currentWardrobe,
      ];
    });

    closeForm();
  }

  function handleDelete(item: ClothingItem) {
    const shouldDelete = window.confirm(`Remove “${item.name}” from your wardrobe?`);

    if (!shouldDelete) {
      return;
    }

    setWardrobe((currentWardrobe) => currentWardrobe.filter((currentItem) => currentItem.id !== item.id));
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="fitme-panel overflow-hidden p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-fitme-plum/35 bg-fitme-cream/80 px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-fitme-plum">
              <Shirt className="size-3.5 text-fitme-blush" aria-hidden="true" />
              Wardrobe station
            </div>
            <h1 className="mt-4 font-display text-4xl leading-none text-fitme-plum sm:text-5xl">Your little clothing rail.</h1>
            <p className="mt-4 text-base font-bold leading-7 text-fitme-plum/75 sm:text-lg">
              Keep the pieces you actually reach for, then let FitMe help you play with them.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddForm}
            className="fitme-tap inline-flex items-center gap-2 rounded-2xl border-2 border-fitme-plum bg-fitme-blush px-4 py-3 text-sm font-black text-white shadow-[0_4px_0_rgb(87_41_88_/_34%)] focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            <Plus className="size-4" aria-hidden="true" />
            Add clothing
          </button>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-[minmax(0,1fr)_15rem]">
          <label className="relative block">
            <span className="sr-only">Search your wardrobe</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-fitme-plum/55" aria-hidden="true" />
            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, colour, category, or brand"
              className="w-full rounded-2xl border-2 border-fitme-plum/35 bg-white/75 py-3 pl-11 pr-4 text-sm font-bold text-fitme-plum outline-none transition placeholder:text-fitme-plum/45 focus:border-fitme-plum focus:ring-2 focus:ring-pink-200"
            />
          </label>

          <label>
            <span className="sr-only">Filter by category</span>
            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value as CategoryFilter)}
              className="w-full rounded-2xl border-2 border-fitme-plum/35 bg-white/75 px-4 py-3 text-sm font-bold text-fitme-plum outline-none transition focus:border-fitme-plum focus:ring-2 focus:ring-pink-200"
            >
              <option value="All">All categories</option>
              {CLOTHING_CATEGORIES.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-sm font-bold text-fitme-plum/65">
          <p>{visibleWardrobe.length} {visibleWardrobe.length === 1 ? "piece" : "pieces"} on this rail</p>
          {(searchTerm || selectedCategory !== "All") && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="fitme-tap text-xs font-black text-fitme-plum underline decoration-dashed underline-offset-4"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {isFormOpen && (
        <ClothingForm initialItem={editingItem} onCancel={closeForm} onSave={handleSave} />
      )}

      {visibleWardrobe.length > 0 ? (
        <section aria-label="Wardrobe items" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {visibleWardrobe.map((item) => (
            <ClothingCard key={item.id} item={item} onEdit={openEditForm} onDelete={handleDelete} />
          ))}
        </section>
      ) : (
        <section className="fitme-panel mx-auto max-w-2xl p-8 text-center sm:p-12">
          <div className="mx-auto grid size-16 place-items-center rounded-[1.4rem] border-2 border-fitme-plum bg-pink-200 text-fitme-plum shadow-[0_3px_0_rgb(87_41_88_/_25%)]">
            <Sparkles className="size-7" aria-hidden="true" />
          </div>
          <h2 className="mt-6 font-display text-3xl text-fitme-plum">Nothing on this rail yet.</h2>
          <p className="mx-auto mt-3 max-w-md text-sm font-bold leading-6 text-fitme-plum/70">Try a different search word or category, or add the first piece from your own wardrobe.</p>
          <button type="button" onClick={openAddForm} className="fitme-tap mt-6 rounded-xl border-2 border-fitme-plum bg-fitme-blush px-4 py-2.5 text-sm font-black text-white shadow-[0_3px_0_rgb(87_41_88_/_28%)]">
            Add your first piece
          </button>
        </section>
      )}
    </div>
  );
}
