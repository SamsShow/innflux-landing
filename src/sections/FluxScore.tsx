import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../lib/motion";

const breakdown = [
  { idx: "01", label: "On-chain repayment", value: 92, color: "#FAFAF7" },
  { idx: "02", label: "Invoice flow (ZKTLS)", value: 86, color: "#FFD24A" },
  { idx: "03", label: "ERP / banking signals", value: 74, color: "#FAFAF7" },
  { idx: "04", label: "Country & sector risk", value: 58, color: "#FF7A4D" },
];

function Bar({
  row,
  i,
  progress,
}: {
  row: (typeof breakdown)[number];
  i: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Animate each bar across the card's visibility window with a stagger.
  const start = 0.2 + i * 0.07;
  const end = 0.5 + i * 0.07;
  const width = useTransform(progress, [start, end], ["0%", `${row.value}%`]);
  return (
    <div className="grid grid-cols-[32px_220px_1fr_80px] items-center gap-[18px] border-t border-hairline py-[18px] last:border-b">
      <span className="font-mono text-[11px] text-dim">{row.idx}</span>
      <span className="text-[15px] text-text">{row.label}</span>
      <div className="relative h-1 rounded-full bg-hairline">
        <motion.div
          style={{ width, background: row.color }}
          className="absolute left-0 top-0 h-1 rounded-full"
        />
      </div>
      <span className="text-right font-mono text-[12px] text-text">{row.value}</span>
    </div>
  );
}

export default function FluxScore() {
  const ref = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  // Tighter window for the card content: kicks in once the card is mostly visible.
  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const needleX = useTransform(cardProgress, [0.1, 0.6], ["0%", "78%"]);
  const rangeFill = useTransform(cardProgress, [0.1, 0.6], ["0%", "78%"]);
  const scoreScale = useTransform(cardProgress, [0, 0.4], [0.88, 1]);
  const scoreOpacity = useTransform(cardProgress, [0, 0.35], [0.25, 1]);
  const cardY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="relative mx-auto max-w-[1440px] px-14 py-32">
      <Reveal className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <motion.div style={{ y: titleY }} className="flex max-w-[900px] flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-[18px] bg-gold" />
            <span className="kicker">FluxScore</span>
          </div>
          <h2 className="text-[64px] font-light leading-[68px] tracking-[-0.03em]">
            A machine that reads{" "}
            <span className="font-serif italic text-gold">the real world</span>.
          </h2>
        </motion.div>
        <p className="max-w-[320px] text-[15px] leading-6 text-muted">
          Four dimensions, weighted by sector and jurisdiction. Updated every block, auditable on-chain.
        </p>
      </Reveal>

      <motion.div
        ref={cardRef}
        style={{ y: cardY }}
        className="grid grid-cols-1 overflow-hidden rounded-[18px] border border-hairline bg-surface md:grid-cols-[460px_1fr]"
      >
        {/* score side */}
        <div className="flex flex-col justify-between gap-10 border-b border-hairline p-10 md:border-b-0 md:border-r">
          <div>
            <span className="kicker">Sample borrower</span>
            <div className="mt-2 text-lg font-medium text-text">Atlas Commodities SA</div>
            <div className="mt-1 font-mono text-[11px] tracking-[0.06em] text-dim">
              Lagos, NG · FMCG distribution
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">FluxScore</span>
            <motion.div
              style={{ scale: scoreScale, opacity: scoreOpacity }}
              className="origin-left text-[200px] font-extralight leading-[180px] tracking-[-0.05em]"
            >
              A2<span className="font-serif italic text-gold">+</span>
            </motion.div>
            <div className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
              <span>D</span>
              <div className="relative h-1 flex-1 rounded-full bg-hairline">
                <motion.div
                  style={{ width: rangeFill, background: "linear-gradient(90deg, #FF7A4D 0%, #FFD24A 100%)" }}
                  className="absolute left-0 top-0 h-1 rounded-full"
                />
                <motion.div style={{ left: needleX }} className="absolute -top-1 h-3 w-0.5 bg-gold" />
              </div>
              <span>A3+</span>
            </div>
          </div>
        </div>

        {/* breakdown side */}
        <div className="flex flex-col justify-between gap-8 p-10">
          <div className="flex items-start justify-between">
            <div className="text-xl font-medium text-text">Score composition</div>
            <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-dim">
              updated 14s ago
            </div>
          </div>
          <div className="flex flex-col">
            {breakdown.map((r, i) => (
              <Bar key={r.idx} row={r} i={i} progress={cardProgress} />
            ))}
          </div>
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 bg-text" /> on-chain
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 bg-gold" /> zk-attested
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 bg-peach" /> off-chain
              </span>
            </div>
            <a className="flex items-center gap-1.5 text-[13px] font-medium text-gold">
              View full report <span className="text-[11px]">↗</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
