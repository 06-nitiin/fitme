import { ArrowRight, Heart, Shirt, Sparkles, UserRound } from "lucide-react";

const firstSteps = [
  {
    number: "01",
    title: "Make your mini-me",
    description: "Choose the little details that feel like you.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "Add your favourites",
    description: "Pop in the clothes already hanging in your room.",
    icon: Shirt,
  },
  {
    number: "03",
    title: "Play with a look",
    description: "Try combinations before the real mirror moment.",
    icon: Sparkles,
  },
];

function MiniWardrobeScene() {
  const garments = ["bg-pink-300", "bg-violet-300", "bg-amber-200", "bg-teal-200", "bg-rose-200"];

  return (
    <div className="relative aspect-[3/2] overflow-hidden rounded-[1.45rem] bg-gradient-to-br from-pink-100 via-violet-100 to-sky-100">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(126,80,140,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(126,80,140,0.16)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <span className="absolute left-[11%] top-[12%] text-xl text-fitme-blush" aria-hidden="true">✦</span>
      <span className="absolute right-[13%] top-[13%] text-lg text-amber-400" aria-hidden="true">♥</span>

      <div className="absolute left-[13%] top-[18%] h-[63%] w-[59%] rounded-t-[7rem] border-[5px] border-fitme-plum/75 bg-white/45" />
      <div className="absolute left-[22%] top-[33%] h-1.5 w-[41%] rounded-full bg-fitme-plum/80" />
      <div className="absolute left-[23%] top-[33%] flex h-[35%] w-[39%] items-start justify-around pt-2">
        {garments.map((colour, index) => (
          <div key={index} className="flex flex-col items-center">
            <span className="size-1.5 rounded-full bg-fitme-plum/70" />
            <span className={`mt-0.5 block h-14 w-7 rounded-b-xl rounded-t-md border-2 border-fitme-plum/50 ${colour}`} />
          </div>
        ))}
      </div>

      <div className="absolute bottom-[12%] right-[13%] h-[41%] w-[25%] rounded-full border-[5px] border-fitme-plum/75 bg-white/60">
        <div className="absolute inset-3 rounded-full bg-gradient-to-br from-pink-100 via-violet-100 to-sky-100 opacity-90" />
        <div className="absolute -bottom-6 left-1/2 h-7 w-3 -translate-x-1/2 rounded-b-full bg-fitme-plum/75" />
      </div>

      <div className="absolute bottom-[10%] left-[12%] h-5 w-[48%] rounded-full bg-fitme-plum/25 blur-sm" />
      <div className="absolute bottom-[13%] left-[17%] h-7 w-16 rounded-full border-2 border-fitme-plum/50 bg-pink-200" />
      <div className="absolute bottom-[15%] left-[18%] h-2 w-12 rounded-full bg-white/80" />

      <div className="absolute bottom-4 left-4 rounded-xl border-2 border-fitme-plum bg-fitme-cream/90 px-3 py-2 shadow-[0_2px_0_rgb(87_41_88_/_20%)]">
        <p className="font-display text-base leading-none text-fitme-plum">fit check</p>
        <p className="mt-1 text-[0.55rem] font-black uppercase tracking-[0.12em] text-fitme-plum/70">one look at a time</p>
      </div>
    </div>
  );
}

export function Home() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <section className="fitme-panel relative isolate overflow-hidden px-6 py-8 sm:px-10 sm:py-11 lg:grid lg:min-h-[27rem] lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.85fr)] lg:items-center lg:gap-10">
        <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_11%_15%,rgba(255,255,255,0.9)_0_1px,transparent_1.5px),linear-gradient(135deg,rgba(255,255,255,0.55),rgba(250,219,237,0.35))] bg-[size:22px_22px,100%_100%]" />
        <div className="absolute -left-8 bottom-2 -z-10 size-32 rounded-full bg-pink-200/65 blur-2xl" />
        <div className="absolute right-[32%] top-4 -z-10 font-display text-3xl text-fitme-blush/70" aria-hidden="true">✦</div>

        <div className="relative z-10 max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-fitme-plum/45 bg-fitme-cream/85 px-3 py-1.5 text-xs font-black uppercase tracking-[0.13em] text-fitme-plum">
            <Heart className="size-3.5 fill-fitme-blush text-fitme-blush" aria-hidden="true" />
            Your dressing room is ready
          </div>
          <p className="font-display text-sm uppercase tracking-[0.14em] text-fitme-plum/70">Good morning, style star</p>
          <h1 className="mt-3 max-w-lg font-display text-4xl leading-[0.95] text-fitme-plum sm:text-5xl lg:text-6xl">
            Dress the version of you heading out.
          </h1>
          <p className="mt-5 max-w-md text-base font-bold leading-7 text-fitme-plum/75 sm:text-lg">
            Build a tiny digital closet, then make every outfit feel a little more you.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <button
              type="button"
              disabled
              title="Avatar creation arrives in a later milestone"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-2xl border-2 border-fitme-plum bg-fitme-blush px-5 py-3 text-sm font-black text-white opacity-70 shadow-[0_4px_0_rgb(87_41_88_/_34%)]"
            >
              Create my avatar
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              disabled
              title="The outfit builder arrives in a later milestone"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-2xl border-2 border-fitme-plum/55 bg-fitme-cream/85 px-5 py-3 text-sm font-black text-fitme-plum opacity-70 shadow-[0_3px_0_rgb(87_41_88_/_18%)]"
            >
              Peek at outfit builder
              <Sparkles className="size-4 text-amber-500" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="relative mx-auto mt-8 w-full max-w-md lg:mt-0 lg:max-w-none">
          <div className="absolute inset-x-5 bottom-0 h-10 rounded-full bg-fitme-plum/20 blur-xl" />
          <div className="fitme-inset relative rounded-[2rem] bg-sky-100 p-2 shadow-[0_5px_0_rgb(87_41_88_/_24%)]">
            <MiniWardrobeScene />
          </div>
        </div>
      </section>

      <section className="fitme-panel p-5 sm:p-7">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-display text-xl text-fitme-plum">Your first little style loop</p>
            <p className="mt-1 text-sm font-bold text-fitme-plum/70">Start simple. The wardrobe grows when you do.</p>
          </div>
          <span className="rounded-full border-2 border-dashed border-fitme-plum/35 px-3 py-1 text-xs font-black text-fitme-plum/75">3 easy steps</span>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {firstSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article key={step.number} className="rounded-3xl border-2 border-fitme-plum/35 bg-fitme-cream/80 p-4 shadow-[0_3px_0_rgb(87_41_88_/_13%)]">
                <div className="flex items-center justify-between">
                  <span className="font-display text-lg text-fitme-blush">{step.number}</span>
                  <span className="grid size-9 place-items-center rounded-xl border-2 border-fitme-plum/45 bg-fitme-lavender text-fitme-plum">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <h2 className="mt-5 text-base font-black text-fitme-plum">{step.title}</h2>
                <p className="mt-1.5 text-sm font-bold leading-5 text-fitme-plum/70">{step.description}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-black text-fitme-plum/70">
                  Waiting for you <ArrowRight className="size-3.5" aria-hidden="true" />
                </span>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}

