import type { ClothingItem } from "../../types/fitme";

type GarmentIllustrationProps = {
  item: ClothingItem;
};

const garmentColours: Record<string, string> = {
  White: "#fffdf8",
  Black: "#443448",
  Pink: "#f3a5c5",
  Blue: "#9bc7e3",
  Beige: "#e4d0ab",
  Cream: "#fff2cf",
  Pearl: "#f6edf6",
  Silver: "#cdd3dd",
};

function getGarmentColour(colour: string): string {
  return garmentColours[colour] ?? "#d9b8e5";
}

export function GarmentIllustration({ item }: GarmentIllustrationProps) {
  const colour = getGarmentColour(item.color);
  const lineColour = item.color === "Black" ? "#f8edf9" : "#63386a";

  if (item.category === "Shoes") {
    return (
      <div className="relative flex h-40 items-end justify-center overflow-hidden rounded-2xl bg-violet-100/65">
        <div className="absolute bottom-7 h-4 w-28 rounded-full bg-fitme-plum/15 blur-sm" />
        <div className="relative h-12 w-28 rounded-[0.7rem_1.5rem_0.7rem_0.8rem] border-2" style={{ backgroundColor: colour, borderColor: lineColour }}>
          <span className="absolute -left-1 -top-5 h-7 w-14 rounded-t-xl border-2" style={{ backgroundColor: colour, borderColor: lineColour }} />
          <span className="absolute right-3 top-2 h-1 w-8 rounded-full" style={{ backgroundColor: lineColour }} />
          <span className="absolute right-3 top-5 h-1 w-8 rounded-full" style={{ backgroundColor: lineColour }} />
        </div>
      </div>
    );
  }

  if (item.category === "Accessories") {
    return (
      <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-amber-100/70">
        <div className="absolute size-28 rounded-full border-2 border-dashed border-fitme-plum/25" />
        <div className="relative grid size-16 place-items-center rounded-full border-2" style={{ backgroundColor: colour, borderColor: lineColour }}>
          <span className="font-display text-2xl" style={{ color: lineColour }}>✦</span>
        </div>
      </div>
    );
  }

  if (["Trousers", "Jeans", "Cargos", "Shorts"].includes(item.category)) {
    const isShorts = item.category === "Shorts";

    return (
      <div className="relative flex h-40 items-end justify-center overflow-hidden rounded-2xl bg-sky-100/65">
        <div className="absolute bottom-6 h-4 w-28 rounded-full bg-fitme-plum/15 blur-sm" />
        <div className="relative flex gap-1" style={{ height: isShorts ? "4.8rem" : "7.3rem" }}>
          <span className="w-11 rounded-b-[1.1rem] border-2" style={{ backgroundColor: colour, borderColor: lineColour }} />
          <span className="w-11 rounded-b-[1.1rem] border-2" style={{ backgroundColor: colour, borderColor: lineColour }} />
          <span className="absolute left-0 top-0 h-3 w-full rounded-t-md border-2" style={{ backgroundColor: colour, borderColor: lineColour }} />
        </div>
      </div>
    );
  }

  const isJacket = item.category === "Jackets";
  const isHoodie = item.category === "Hoodies";

  return (
    <div className="relative flex h-40 items-end justify-center overflow-hidden rounded-2xl bg-pink-100/70">
      <div className="absolute bottom-6 h-4 w-28 rounded-full bg-fitme-plum/15 blur-sm" />
      {isHoodie && <span className="absolute bottom-[5.7rem] left-1/2 size-12 -translate-x-1/2 rounded-t-full border-2" style={{ backgroundColor: colour, borderColor: lineColour }} />}
      <div className="relative h-24 w-24 rounded-[1rem_1rem_1.4rem_1.4rem] border-2" style={{ backgroundColor: colour, borderColor: lineColour }}>
        <span className="absolute -left-7 top-2 h-12 w-8 rotate-[18deg] rounded-l-full border-2" style={{ backgroundColor: colour, borderColor: lineColour }} />
        <span className="absolute -right-7 top-2 h-12 w-8 -rotate-[18deg] rounded-r-full border-2" style={{ backgroundColor: colour, borderColor: lineColour }} />
        {isJacket && <span className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2" style={{ backgroundColor: lineColour }} />}
        {!isJacket && <span className="absolute left-1/2 top-2 h-5 w-9 -translate-x-1/2 rounded-b-full border-x-2 border-b-2" style={{ borderColor: lineColour }} />}
      </div>
    </div>
  );
}
