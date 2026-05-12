import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { easeOut, Reveal } from "../lib/motion";
import { InnfluxRing } from "../components/DotIllustrations";

function GiantMark() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const ringX = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const letterY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const letterOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);
  const luBg = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(135deg, #B7F1D5 0%, #B7F1D5 100%)",
      "linear-gradient(135deg, #B7F1D5 0%, #5FCDA0 100%)",
    ],
  );

  return (
    <div ref={ref} className="relative h-[180px] overflow-hidden sm:h-[240px] md:h-[340px]">
      <div
        className="absolute inset-x-5 top-0 h-px md:inset-x-14"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #1A3327 20%, #B7F1D5 50%, #1A3327 80%, transparent 100%)",
        }}
      />
      <div className="absolute right-5 top-8 flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.14em] text-faint md:right-14 md:top-12 md:text-[10px]">
        v1.4.2 — 0xa9fc3e1b
        <span className="h-px w-3.5 bg-gold" />
      </div>

      <motion.div
        style={{ y: letterY, opacity: letterOpacity }}
        className="absolute inset-x-0 bottom-0 flex items-end justify-center"
      >
        <div className="relative flex items-baseline text-[clamp(70px,22vw,340px)] font-extralight leading-[0.95] tracking-[-0.06em] text-text">
          <span>i</span>
          <span>n</span>
          <span className="relative">
            n
            <motion.div
              style={{ x: ringX }}
              className="absolute -right-6 top-[18%] h-10 w-10 md:-right-12 md:h-20 md:w-20"
            >
              <svg viewBox="-40 -40 80 80" className="h-full w-full">
                <circle cx="0" cy="0" r="30" fill="none" stroke="#B7F1D5" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="#B7F1D5" />
              </svg>
            </motion.div>
          </span>
          <span>f</span>
          <motion.span
            style={{
              backgroundImage: luBg,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
            className="font-serif italic"
          >
            lu
          </motion.span>
          <span>x</span>
          <span className="font-serif italic text-gold">.</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative">
      <Reveal className="border-t border-hairline px-5 pb-8 pt-12 md:px-14 md:pt-16">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-10 lg:flex-row lg:gap-12">
          <div className="flex max-w-[520px] flex-col gap-5 md:gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                All systems operational
              </span>
            </div>
            <h3 className="font-serif text-[26px] italic leading-[32px] tracking-[-0.02em] text-text md:text-[36px] md:leading-[42px]">
              Get the weekly <span className="text-gradient-gold">credit memo</span>.
            </h3>
            <p className="text-[14px] leading-[22px] text-muted">
              Market dispatches, default-rate updates, and the occasional spicy take. No spam — we
              hate it too.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full items-center gap-2 rounded-full border border-hairline bg-surface py-1.5 pl-4 pr-1.5 md:pl-5"
            >
              <input
                type="email"
                placeholder="you@protocol.xyz"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-text placeholder:text-faint outline-none md:text-[14px]"
              />
              <button
                type="submit"
                className="flex shrink-0 items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-[12px] font-semibold text-ground md:px-5 md:text-[13px]"
              >
                Subscribe <span className="font-mono text-[11px]">↗</span>
              </button>
            </form>
            <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.12em] text-faint md:gap-4">
              <span>14.2K subscribers</span>
              <span className="text-border2">/</span>
              <span>Every Friday</span>
              <span className="text-border2">/</span>
              <span>3 min read</span>
            </div>
          </div>

          <div className="grid w-full grid-cols-3 gap-6 sm:gap-12 lg:w-auto lg:gap-16 lg:pt-2">
            <ul className="flex flex-col gap-3.5">
              <li className="kicker text-faint">Product</li>
              <li className="text-[14px] text-soft">Vaults</li>
              <li className="text-[14px] text-soft">FluxScore</li>
              <li className="text-[14px] text-soft">Borrow</li>
              <li className="flex items-center gap-1.5 text-[14px] text-soft">
                API
                <span className="rounded bg-gold px-1.5 py-0.5 font-mono text-[9px] tracking-[0.08em] text-ground">
                  NEW
                </span>
              </li>
            </ul>
            <ul className="flex flex-col gap-3.5">
              <li className="kicker text-faint">Company</li>
              <li className="text-[14px] text-soft">About</li>
              <li className="text-[14px] text-soft">Litepaper</li>
              <li className="flex items-center gap-1.5 text-[14px] text-soft">
                Careers <span className="font-mono text-[10px] text-gold">12</span>
              </li>
              <li className="text-[14px] text-soft">Contact</li>
            </ul>
            <ul className="flex flex-col gap-3.5">
              <li className="kicker text-faint">Connect</li>
              <li className="text-[14px] text-soft">X / Twitter</li>
              <li className="text-[14px] text-soft">LinkedIn</li>
              <li className="text-[14px] text-soft">Mirror</li>
              <li className="text-[14px] text-soft">Discord</li>
            </ul>
          </div>
        </div>
      </Reveal>

      <GiantMark />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-5 border-t border-hairline px-5 py-6 md:flex-row md:items-center md:gap-6 md:px-14 md:py-8"
      >
        <div className="flex flex-col items-start gap-3 md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-2.5">
            <InnfluxRing size={22} />
            <span className="text-[15px] font-medium tracking-[-0.01em] text-text">innflux labs</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint md:text-[11px]">
            © 2026 — Not financial advice. Just credit, finally open.
          </span>
        </div>
        <div className="flex w-full items-center justify-between gap-4 md:w-auto md:justify-end">
          <div className="flex items-center gap-2">
            {["X", "in", "↗"].map((s) => (
              <button
                key={s}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border2 font-mono text-[13px] text-soft"
              >
                {s}
              </button>
            ))}
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold font-mono text-[13px] text-gold"
              style={{ background: "rgba(183,241,213,0.08)" }}
            >
              ★
            </button>
          </div>
          <div className="flex items-center gap-4 text-[12px] text-dim md:gap-6 md:text-[13px]">
            <a>Privacy</a>
            <a>Terms</a>
            <a className="hidden sm:inline">Cookies</a>
            <a className="flex items-center gap-1.5 text-gold">
              Status <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}
