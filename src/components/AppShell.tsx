import type { ReactNode } from "react";
import {
  Bookmark,
  House,
  Settings2,
  Shirt,
  Sparkles,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { BrandMark } from "./BrandMark";

export type AppSection = "home" | "wardrobe" | "builder" | "outfits" | "avatar";

type AppShellProps = {
  activeSection: AppSection;
  onNavigate: (section: AppSection) => void;
  children: ReactNode;
};

type NavigationItem = {
  id: "home" | "wardrobe" | "builder" | "outfits" | "avatar" | "settings";
  label: string;
  icon: LucideIcon;
  isReady?: boolean;
};

const navigation: NavigationItem[] = [
  { id: "home", label: "Home", icon: House, isReady: true },
  { id: "wardrobe", label: "My Wardrobe", icon: Shirt, isReady: true },
  { id: "builder", label: "Outfit Builder", icon: Sparkles, isReady: true },
  { id: "outfits", label: "Saved Outfits", icon: Bookmark, isReady: true },
  { id: "avatar", label: "My Avatar", icon: UserRound, isReady: true },
  { id: "settings", label: "Settings", icon: Settings2 },
];

function getSectionTitle(activeSection: AppSection): string {
  return navigation.find((item) => item.id === activeSection)?.label ?? "FitMe";
}

export function AppShell({ activeSection, onNavigate, children }: AppShellProps) {
  const currentTitle = getSectionTitle(activeSection);

  function handleNavigation(item: NavigationItem) {
    if (item.id === "home" || item.id === "wardrobe" || item.id === "builder" || item.id === "outfits" || item.id === "avatar") {
      onNavigate(item.id);
    }
  }

  return (
    <div className="min-h-screen pb-24 lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:pb-0">
      <aside className="hidden min-h-screen border-r-2 border-fitme-plum/25 bg-fitme-lavender/80 px-4 py-6 backdrop-blur lg:flex lg:flex-col">
        <div className="mb-11">
          <BrandMark />
        </div>

        <nav aria-label="Primary navigation" className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeSection;

            return (
              <button
                key={item.id}
                type="button"
                disabled={!item.isReady}
                onClick={() => handleNavigation(item)}
                aria-current={isActive ? "page" : undefined}
                title={item.isReady ? undefined : `${item.label} is coming in a later milestone`}
                className={`flex w-full items-center gap-3 rounded-2xl border-2 px-3 py-3 text-left text-sm font-extrabold transition ${
                  isActive
                    ? "border-fitme-plum bg-pink-200 text-fitme-plum shadow-[0_3px_0_rgb(87_41_88_/_28%)]"
                    : "border-transparent text-fitme-plum/75"
                } ${item.isReady ? "fitme-tap" : "cursor-not-allowed opacity-55"}`}
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
                <span>{item.label}</span>
                {isActive && <span className="ml-auto size-2 rounded-full bg-amber-400" aria-hidden="true" />}
              </button>
            );
          })}
        </nav>

        <div className="mt-auto rounded-3xl border-2 border-dashed border-fitme-plum/35 bg-white/55 p-4 text-fitme-plum">
          <div className="mb-2 flex items-center gap-2 font-display text-base">
            <Sparkles className="size-4 text-fitme-blush" aria-hidden="true" />
            Style tip
          </div>
          <p className="text-sm font-bold leading-5">Save the looks that make getting dressed feel easy.</p>
        </div>
      </aside>

      <main className="min-w-0">
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b-2 border-fitme-plum/20 bg-[#fbf4ff]/90 px-5 backdrop-blur-md sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <div className="lg:hidden">
              <BrandMark compact />
            </div>
            <div>
              <p className="font-display text-lg leading-5 text-fitme-plum">{currentTitle}</p>
              <p className="mt-1 text-[0.66rem] font-black uppercase tracking-[0.17em] text-fitme-plum/70">
                your style space
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border-2 border-fitme-plum/35 bg-fitme-cream py-1.5 pl-2 pr-3 shadow-[0_2px_0_rgb(87_41_88_/_15%)]">
            <span className="grid size-8 place-items-center rounded-full bg-fitme-mint text-xs font-black text-teal-800">A</span>
            <span className="hidden text-xs font-extrabold text-fitme-plum sm:inline">Style star</span>
          </div>
        </header>

        <div className="mx-auto w-full max-w-[92rem] px-4 py-5 sm:px-8 sm:py-8 lg:px-10 lg:py-10">{children}</div>
      </main>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-3 bottom-3 z-30 flex items-center justify-around rounded-[1.6rem] border-2 border-fitme-plum bg-fitme-cream/95 px-2 py-2.5 shadow-[0_5px_0_rgb(87_41_88_/_28%),0_14px_28px_rgb(87_41_88_/_24%)] backdrop-blur lg:hidden"
      >
        {navigation.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeSection;

          return (
            <button
              key={item.id}
              type="button"
              disabled={!item.isReady}
              onClick={() => handleNavigation(item)}
              aria-current={isActive ? "page" : undefined}
              title={item.isReady ? undefined : `${item.label} is coming in a later milestone`}
              className={`grid min-w-12 place-items-center rounded-2xl px-2 py-1.5 text-fitme-plum ${
                isActive ? "bg-pink-200 shadow-[0_2px_0_rgb(87_41_88_/_26%)]" : "opacity-55"
              } ${item.isReady ? "fitme-tap" : "cursor-not-allowed"}`}
            >
              <Icon className="size-5" strokeWidth={isActive ? 2.7 : 2} aria-hidden="true" />
              <span className="mt-0.5 max-w-14 truncate text-[0.56rem] font-black leading-3">
                {item.label.replace("My ", "")}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
