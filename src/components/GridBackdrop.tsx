import { motion, useScroll, useTransform } from "framer-motion";

export default function GridBackdrop() {
  const { scrollYProgress } = useScroll();
  // Subtle vertical drift of the dot layer for depth.
  const dotY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0.06, 0.11, 0.11, 0.04]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{ opacity: lineOpacity }}
      >
        <defs>
          <pattern id="grid-lines" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#FFFFFF" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-lines)" />
      </motion.svg>
      <motion.svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        style={{ y: dotY }}
      >
        <defs>
          <pattern id="grid-dots" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="0" cy="0" r="1" fill="#B7F1D5" opacity="0.22" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-dots)" />
      </motion.svg>
    </div>
  );
}
