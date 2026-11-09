// Shared class strings so every Studio screen looks the same.
export const glass =
  "rounded-[28px] border border-white/90 bg-white/60 shadow-[0_8px_32px_rgba(10,10,10,0.06)] backdrop-blur-xl";
export const input =
  "w-full min-h-[44px] rounded-full border border-black/15 bg-white/80 px-4 text-[15px] outline-none transition-colors placeholder:text-[#9a9aa0] hover:border-black/30 focus:border-black";
export const area =
  "w-full rounded-[22px] border border-black/15 bg-white/80 px-4 py-3 text-[15px] outline-none transition-colors placeholder:text-[#9a9aa0] hover:border-black/30 focus:border-black";
export const btn =
  "inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-[#0A0A0A] px-6 text-[14px] font-medium text-white transition-colors hover:bg-[#2a2a2e] disabled:opacity-35 disabled:hover:bg-[#0A0A0A]";
export const btnGhost =
  "inline-flex min-h-[44px] items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-black/15 bg-white/70 px-5 text-[14px] font-medium transition-colors hover:border-black/30 hover:bg-white disabled:opacity-35 disabled:hover:bg-white/70";
export const label = "mb-1.5 block px-1 text-[12px] font-medium text-[#55555A]";
export const badge = (live) =>
  `inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${live ? "bg-[#0A0A0A] text-white" : "bg-black/[.07] text-[#3C3C41]"}`;
