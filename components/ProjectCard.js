"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

// Reusable: project card with expandable features list.
// To wire up a detail page later, pass a `slug` prop and add a Link around the title.
export default function ProjectCard({
  number,
  title,
  summary,
  features,
  slug,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-[#f5f5f0]/10 hover:border-[#f5f5f0]/30 transition-colors duration-300 group">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4"
        aria-expanded={open}
      >
        <div className="flex items-start gap-5">
          <span className="text-sm font-bold tracking-widest text-[#f5f5f0]/20 pt-1 min-w-[2rem]">
            {String(number).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#f5f5f0] group-hover:text-white transition-colors leading-tight">
              {title}
            </h3>
            <p className="text-lg text-[#f5f5f0]/50 mt-1 font-medium">
              {summary}
            </p>
          </div>
        </div>
        <ChevronDown
          size={18}
          className={`text-[#f5f5f0]/40 mt-1 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="px-6 md:px-8 pb-6 md:pb-8 pl-[4.25rem] md:pl-[4.75rem]">
          <ul className="space-y-2">
            {features.map((f, i) => (
              <li
                key={i}
                className="flex items-start gap-3 text-sm text-[#f5f5f0]/60 font-medium"
              >
                <span className="mt-[6px] w-1 h-1 rounded-full bg-[#f5f5f0]/40 flex-shrink-0" />
                {f}
              </li>
            ))}
          </ul>
          Future: <Link href={`/projects/${slug}`}>View details →</Link>
        </div>
      )}
    </div>
  );
}
