import { Sparkles } from "lucide-react";
import type { ClothingItem, OutfitRecommendation } from "../../types/fitme";

type RecommendationPanelProps = {
  recommendations: OutfitRecommendation[];
  wardrobe: ClothingItem[];
  onApply: (recommendation: OutfitRecommendation) => void;
};

export function RecommendationPanel({ recommendations, wardrobe, onApply }: RecommendationPanelProps) {
  function getPieceNames(recommendation: OutfitRecommendation): string[] {
    return Object.values(recommendation.selections)
      .map((itemId) => wardrobe.find((item) => item.id === itemId)?.name)
      .filter((name): name is string => Boolean(name));
  }

  return (
    <section className="fitme-panel p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="grid size-11 shrink-0 place-items-center rounded-2xl border-2 border-fitme-plum bg-pink-200 text-fitme-plum shadow-[0_3px_0_rgb(87_41_88_/_22%)]">
          <Sparkles className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-2xl leading-none text-fitme-plum">Create an outfit for me</p>
          <p className="mt-2 text-sm font-bold leading-6 text-fitme-plum/70">These are simple style rules using only the pieces on your own clothing rail.</p>
        </div>
      </div>

      {recommendations.length > 0 ? (
        <div className="mt-6 grid gap-3 lg:grid-cols-3">
          {recommendations.map((recommendation) => {
            const pieceNames = getPieceNames(recommendation);

            return (
              <article key={recommendation.id} className="rounded-3xl border-2 border-fitme-plum/30 bg-white/60 p-4">
                <p className="font-display text-xl text-fitme-plum">{recommendation.style}</p>
                <p className="mt-2 min-h-12 text-xs font-bold leading-5 text-fitme-plum/65">{recommendation.reason}</p>
                <ul className="mt-4 space-y-1.5 border-y-2 border-dashed border-fitme-plum/20 py-3 text-xs font-black text-fitme-plum/80">
                  {pieceNames.map((name) => <li key={name} className="truncate">• {name}</li>)}
                </ul>
                <button type="button" onClick={() => onApply(recommendation)} className="fitme-tap mt-4 w-full rounded-xl border-2 border-fitme-plum bg-fitme-blush px-3 py-2.5 text-xs font-black text-white shadow-[0_3px_0_rgb(87_41_88_/_26%)]">
                  Try this look
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border-2 border-dashed border-fitme-plum/25 bg-white/45 p-4 text-sm font-bold leading-6 text-fitme-plum/70">Add a few pieces in My Wardrobe to unlock your first outfit ideas.</p>
      )}
    </section>
  );
}
