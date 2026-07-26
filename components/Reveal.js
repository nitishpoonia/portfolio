"use client";
import { motion, useReducedMotion } from "framer-motion";

/**
 * The single scroll-reveal primitive used across the site.
 * Fires once when it enters view. Honours prefers-reduced-motion
 * (collapses to an instant, transform-free fade).
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 22,
  className,
  style,
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  const initial = reduce ? { opacity: 0 } : { opacity: 0, y };
  const inView = reduce ? { opacity: 1 } : { opacity: 1, y: 0 };

  return (
    <MotionTag
      className={className}
      style={style}
      initial={initial}
      whileInView={inView}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{
        duration: reduce ? 0.2 : 0.62,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
