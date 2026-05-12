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
  const ringX = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const letterY = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const letterOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [0, 0.6, 1]);
  // "lu" hue: shifts from gold to peach as you scroll.
  const luBg = useTransform(
    scrollYProgress,
    [0, 1],
    ["linear-gradient(135deg, #FFD24A 0%, #FFD24A 100%)", "linear-gradient(135deg, #FFD24A 0%, #FF7A4D 100%)"],
  );

  return (
    <div ref={ref} className="relative h-[340px] overflow-hidden">
      {/* gold-fade top divider */}
      <div
        className="absolute inset-x-14 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #1F2227 20%, #FFD24A 50%, #1F2227 80%, transparent 100%)",
        }}
      />
      {/* mono tags */}
      <div className="absolute left-14 top-12 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        <span className="h-px w-3.5 bg-gold" />
        Made with care · Lagos · Singapore · NYC
      </div>
      <div className="absolute right-14 top-12 flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
        v1.4.2 — 0xa9fc3e1b
        <span className="h-px w-3.5 bg-gold" />
      </div>

      <motion.div
        style={{ y: letterY, opacity: letterOpacity }}
        className="absolute inset-x-0 bottom-0 flex items-end justify-center"
      >
        <div className="relative flex items-baseline text-[clamp(120px,22vw,340px)] font-extralight leading-[0.95] tracking-[-0.06em] text-text">
          <span>i</span>
          <span>n</span>
          <span className="relative">
            n
            <motion.div
              style={{ x: ringX }}
              className="absolute -right-12 top-[18%] h-20 w-20"
            >
              <svg viewBox="-40 -40 80 80" className="h-full w-full">
                <circle cx="0" cy="0" r="30" fill="none" stroke="#FFD24A" strokeWidth="2" />
                <circle cx="0" cy="0" r="6" fill="#FFD24A" />
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
      {/* row 1 — newsletter + columns */}
      <Reveal className="border-t border-hairline px-14 pb-8 pt-16">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-12 lg:flex-row">
          <div className="flex max-w-[520px] flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-gold">
                All systems operational
              </span>
            </div>
            <h3 className="font-serif text-[36px] italic leading-[42px] tracking-[-0.02em] text-text">
              Get the weekly{" "}
              <span className="text-gradient-gold">credit memo</span>.
            </h3>
            <p className="text-[14px] leading-[22px] text-muted">
              Market dispatches, default-rate updates, and the occasional spicy take. No spam — we
              hate it too.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full items-center gap-2 rounded-full border border-hairline bg-surface py-1.5 pl-5 pr-1.5"
            >
              <input
                type="email"
                placeholder="you@protocol.xyz"
                className="flex-1 bg-transparent text-[14px] text-text placeholder:text-faint outline-none"
              />
              <button
                type="submit"
                className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-[13px] font-semibold text-ground"
              >
                Subscribe <span className="font-mono text-[11px]">↗</span>
              </button>
            </form>
            <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.12em] text-faint">
              <span>14.2K subscribers</span>
              <span className="text-border2">/</span>
              <span>Every Friday</span>
              <span className="text-border2">/</span>
              <span>3 min read</span>
            </div>
          </div>

          <div className="flex gap-16 pt-2">
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

      {/* row 2 — giant wordmark */}
      <GiantMark />

      {/* row 3 — bottom strip */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 border-t border-hairline px-14 py-8"
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <InnfluxRing size={22} />
            <span className="text-[15px] font-medium tracking-[-0.01em] text-text">innflux labs</span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">
            © 2026 — Not financial advice. Just credit, finally open.
          </span>
        </div>
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
            style={{ background: "rgba(255,210,74,0.08)" }}
          >
            ★
          </button>
        </div>
        <div className="flex items-center gap-6 text-[13px] text-dim">
          <a>Privacy</a>
          <a>Terms</a>
          <a>Cookies</a>
          <a className="flex items-center gap-1.5 text-gold">
            Status <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </a>
        </div>
      </motion.div>
    </footer>
  );
}
