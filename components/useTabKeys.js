"use client";
import { useRef } from "react";

// Keyboard behaviour the ARIA tabs pattern promises: arrows move between tabs
// (and select them), Home/End jump to the ends. Only the selected tab is in the
// Tab order. Usage: const keys = useTabKeys(count, index, select);
//   <button ref={keys.ref(i)} tabIndex={i === index ? 0 : -1} onKeyDown={keys.onKeyDown} ...>
export function useTabKeys(count, index, select) {
  const refs = useRef([]);
  const go = (i) => {
    const next = (i + count) % count;
    select(next);
    refs.current[next]?.focus();
  };
  return {
    ref: (i) => (el) => {
      refs.current[i] = el;
    },
    onKeyDown: (e) => {
      const keys = { ArrowRight: index + 1, ArrowDown: index + 1, ArrowLeft: index - 1, ArrowUp: index - 1, Home: 0, End: count - 1 };
      if (!(e.key in keys)) return;
      e.preventDefault();
      go(keys[e.key]);
    },
  };
}
