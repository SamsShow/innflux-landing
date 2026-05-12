import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../lib/motion";

const logos = [
  { mark: <span className="italic">atlas<span className="font-light">.</span></span>, name: "Atlas Commodities" },
  { mark: <span className="font-light tracking-[0.22em]">SOLARA</span>, name: "Solara Energy" },
  {
    mark: (
      <span className="flex items-center gap-2">
        <span className="h-4 w-4 rounded-full bg-gold" />
        <span className="font-semibold tracking-[-0.02em]">paynseconds</span>
      </span>
    ),
    name: "Pay N Seconds",
  },
  { mark: <span className="font-serif tracking-[-0.02em]">Vinh<span className="italic">·</span>Trade</span>, name: "Vinh Trade · Vietnam" },
  {
    mark: (
      <span className="flex items-center gap-2.5">
        <span className="h-0 w-0 border-x-[12px] border-x-transparent border-b-[18px] border-b-text" />
        <span className="font-bold tracking-[-0.02em]">WESTBEND</span>
      </span>
    ),
    name: "West Bend Co-op",
  },
  {
    mark: (
      <span className="flex items-center gap-2">
        <span className="h-5 w-5 rotate-45 border-2 border-text rounded" />
        <span className="font-medium tracking-[-0.01em]">snaptravel</span>
      </span>
    ),
    name: "Snaptravel",
  },
];

function LogoTile({
  l,
  i,
  progress,
}: {
  l: (typeof logos)[number];
  i: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const dir = (i % 3) - 1; // -1, 0, 1
  const range = 40 + Math.abs(dir) * 30;
  const y = useTransform(progress, [0, 1], [range * (dir || 1), -range * (dir || 1)]);
  return (
    <motion.div
      style={{ y }}
      className={`flex flex-col items-center justify-center gap-3.5 p-10 ${
        i < 3 ? "border-b border-hairline" : ""
      } ${i % 3 !== 2 ? "border-r border-hairline" : ""}`}
    >
      <div className="text-[28px] text-text">{l.mark}</div>
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-dim">{l.name}</span>
    </motion.div>
  );
}

export default function CaseStudies() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleX = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <section ref={ref} className="relative mx-auto max-w-[1440px] px-14 py-32">
      <Reveal className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-[18px] bg-gold" />
            <span className="kicker">In production</span>
          </div>
          <motion.h2 style={{ x: titleX }} className="text-[56px] font-light leading-[60px] tracking-[-0.03em]">
            Trusted by operators across{" "}
            <span className="font-serif italic text-gold">12 markets</span>.
          </motion.h2>
        </div>
        <div className="flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
          <span>1 / 6</span>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border2 text-text">
            ←
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-gold text-gold">
            →
          </button>
        </div>
      </Reveal>
      <div className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-hairline bg-surface md:grid-cols-3">
        {logos.map((l, i) => (
          <LogoTile key={l.name} l={l} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
