import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easeOut } from "../lib/motion";

export default function BigCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.1, 0.8]);
  const haloOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0.5]);

  return (
    <section ref={ref} className="relative mx-auto max-w-[1440px] px-14 py-24">
      <div className="relative flex flex-col items-center justify-center gap-9 overflow-hidden rounded-3xl border border-hairline bg-[#0E0F12] px-16 py-20 text-center">
        <motion.div
          aria-hidden
          style={{ scale: haloScale, opacity: haloOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        >
          <div
            className="h-full w-full rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,210,74,0.22) 0%, rgba(255,210,74,0.06) 35%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="relative flex items-center gap-3"
        >
          <span className="h-px w-[18px] bg-gold" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
            Beta cohort #3 — closing 2026-06-30
          </span>
          <span className="h-px w-[18px] bg-gold" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
          className="relative max-w-[1100px] text-[104px] font-extralight leading-[104px] tracking-[-0.04em]"
        >
          Open finance, <span className="font-serif italic font-normal text-gold">finally open</span>.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.9, ease: easeOut, delay: 0.25 }}
          className="relative max-w-[520px] text-[17px] leading-7 text-muted"
        >
          Request access to the closed beta. We onboard 20 LPs and 8 borrowers per cohort. Average
          response time, 36 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.4 }}
          className="relative flex items-center gap-3.5"
        >
          <button className="rounded-lg border border-border2 px-6 py-4 text-[15px] font-medium text-text">
            Talk to a human
          </button>
          <button className="flex items-center gap-2.5 rounded-lg bg-gold px-6 py-4 text-[15px] font-semibold text-ground">
            Request access <span className="font-mono text-[13px]">→</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
