import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DotSphere } from "../components/DotIllustrations";
import { easeOut } from "../lib/motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const sphereY = useTransform(scrollYProgress, [0, 1], [0, -340]);
  const sphereScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.55, 0.05]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 0.4, 0]);

  return (
    <section ref={ref} className="relative min-h-screen pb-32 pt-44">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-14 lg:grid-cols-2">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col gap-9">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-[18px] bg-gold" />
            <span className="kicker">What is composable credit?</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.2 }}
            className="text-[88px] font-light leading-[92px] tracking-[-0.035em]"
          >
            The future of{" "}
            <span className="font-serif italic text-gold">credit</span> is open.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
            className="max-w-[520px] text-[17px] leading-7 text-muted"
          >
            Innflux is the first composable credit layer connecting DeFi liquidity with real-world
            businesses. Lenders earn double-digit USDC yield. Operators access uncollateralized
            credit lines from $250K to $10M.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.55 }}
            className="mt-2 flex items-center gap-3.5"
          >
            <button className="rounded-lg bg-gold px-[22px] py-3.5 text-[15px] font-semibold text-ground">
              Enter Beta
            </button>
            <button className="rounded-lg border border-border2 px-[22px] py-3.5 text-[15px] font-medium text-text">
              Download litepaper
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: sphereY, scale: sphereScale, opacity: sphereOpacity }}
          className="relative flex h-[680px] items-center justify-center"
        >
          {/* outer dashed ring */}
          <div className="pointer-events-none absolute h-[620px] w-[620px] rounded-full border border-dashed border-gold/20" />
          {/* mid ring */}
          <div className="pointer-events-none absolute h-[520px] w-[520px] rounded-full border border-white/[0.04]" />
          {/* glow */}
          <div
            className="pointer-events-none absolute h-[120px] w-[120px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(255,210,74,0.55) 0%, rgba(255,210,74,0.1) 60%, transparent 80%)",
              filter: "blur(8px)",
            }}
          />
          <DotSphere />
          {/* node mark */}
          <div className="absolute right-10 top-14 flex flex-col items-end gap-3">
            <div className="h-12 w-12 rounded-full border-[1.5px] border-gold" />
            <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-dim">
              node · 0x4a…f2
            </span>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute inset-x-0 bottom-10 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-faint">
          <span>scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-6 w-px bg-gold/60"
          />
        </div>
      </motion.div>
    </section>
  );
}
