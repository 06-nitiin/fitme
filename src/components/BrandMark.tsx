type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-[1rem] border-2 border-fitme-plum bg-fitme-blush shadow-[0_3px_0_rgb(87_41_88_/_32%)]">
        <span className="relative block size-6" aria-hidden="true">
          <span className="absolute left-0 top-0 h-full w-2 rounded-sm bg-fitme-plum" />
          <span className="absolute left-0 top-0 h-2 w-6 rounded-sm bg-fitme-plum" />
          <span className="absolute left-0 top-2.5 h-2 w-4 rounded-sm bg-fitme-plum" />
          <span className="absolute left-1 top-1 h-1.5 w-4 rounded-sm bg-white/70" />
        </span>
      </span>

      {!compact && (
        <span className="leading-none text-fitme-plum">
          <span className="block font-display text-2xl tracking-tight">fit</span>
          <span className="-mt-0.5 block pl-5 text-[0.62rem] font-black uppercase tracking-[0.25em]">
            me
          </span>
        </span>
      )}
    </div>
  );
}
