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
    <section ref={ref} className="relative min-h-screen pb-16 pt-28 md:pb-32 md:pt-44">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-5 md:px-14 lg:grid-cols-2">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="flex flex-col gap-6 md:gap-9">
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
            className="text-[44px] font-light leading-[1.05] tracking-[-0.035em] sm:text-[60px] md:text-[76px] lg:text-[88px] lg:leading-[92px]"
          >
            The future of{" "}
            <span className="font-serif italic text-gold">credit</span> is open.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: easeOut, delay: 0.4 }}
            className="max-w-[520px] text-[15px] leading-[24px] text-muted md:text-[17px] md:leading-7"
          >
            Innflux is the first composable credit layer connecting DeFi liquidity with real-world
            businesses. Lenders earn double-digit USDC yield. Operators access uncollateralized
            credit lines from $250K to $10M.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: easeOut, delay: 0.55 }}
            className="mt-1 flex flex-wrap items-center gap-3"
          >
            <button className="rounded-lg bg-gold px-5 py-3 text-[14px] font-semibold text-ground md:px-[22px] md:py-3.5 md:text-[15px]">
              Enter Beta
            </button>
            <button className="rounded-lg border border-border2 px-5 py-3 text-[14px] font-medium text-text md:px-[22px] md:py-3.5 md:text-[15px]">
              Download litepaper
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: sphereY, scale: sphereScale, opacity: sphereOpacity }}
          className="relative flex h-[360px] items-center justify-center sm:h-[480px] lg:h-[680px]"
        >
          {/* outer dashed ring */}
          <div className="pointer-events-none absolute h-[320px] w-[320px] rounded-full border border-dashed border-gold/20 sm:h-[440px] sm:w-[440px] lg:h-[620px] lg:w-[620px]" />
          {/* mid ring */}
          <div className="pointer-events-none absolute h-[260px] w-[260px] rounded-full border border-white/[0.04] sm:h-[360px] sm:w-[360px] lg:h-[520px] lg:w-[520px]" />
          {/* glow */}
          <div
            className="pointer-events-none absolute h-[80px] w-[80px] rounded-full sm:h-[100px] sm:w-[100px] lg:h-[120px] lg:w-[120px]"
            style={{
              background:
                "radial-gradient(circle, rgba(183,241,213,0.55) 0%, rgba(183,241,213,0.1) 60%, transparent 80%)",
              filter: "blur(8px)",
            }}
          />
          <div className="block sm:hidden">
            <DotSphere size={280} />
          </div>
          <div className="hidden sm:block lg:hidden">
            <DotSphere size={380} />
          </div>
          <div className="hidden lg:block">
            <DotSphere size={540} />
          </div>
          {/* node mark — hide on mobile */}
          <div className="absolute right-4 top-6 hidden flex-col items-end gap-3 sm:flex md:right-10 md:top-14">
            <div className="h-10 w-10 rounded-full border-[1.5px] border-gold md:h-12 md:w-12" />
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
        className="absolute inset-x-0 bottom-6 hidden justify-center md:bottom-10 md:flex"
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
