import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { MotionProps, Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Fade + slight Y-rise as the section enters the viewport. No scale. */
export function Reveal({
  children,
  delay = 0,
  y = 48,
  className,
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
} & MotionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.9, ease: easeOut, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Stagger children inside a wrapper. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08): Variants => ({
  hidden: {},
  visible: {
    transition: { delayChildren, staggerChildren },
  },
});

export const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

/** Parallax-on-scroll hook. Returns translateY value driven by element's progress. */
export function useParallax(range = 80) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const prefersReduced = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [range, -range]);
  return { ref, y, scrollYProgress };
}

export { motion, useScroll, useTransform };
