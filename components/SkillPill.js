// Reusable: skill tag pill. Pass `proficient` bool for filled vs outlined style.
export default function SkillPill({ label, proficient = false }) {
  return (
    <span
      className={`inline-block px-3 py-1 text-xs font-semibold tracking-wide rounded-full border transition-all duration-200 hover:scale-105 ${
        proficient
          ? 'bg-[#f5f5f0] text-[#0a0a0a] border-[#f5f5f0]'
          : 'bg-transparent text-[#f5f5f0]/60 border-[#f5f5f0]/25 hover:border-[#f5f5f0]/60'
      }`}
    >
      {label}
    </span>
  )
}
