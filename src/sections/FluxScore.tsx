import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../lib/motion";

const breakdown = [
  { idx: "01", label: "On-chain repayment", value: 92, color: "#FAFAF7" },
  { idx: "02", label: "Invoice flow (ZKTLS)", value: 86, color: "#B7F1D5" },
  { idx: "03", label: "ERP / banking signals", value: 74, color: "#FAFAF7" },
  { idx: "04", label: "Country & sector risk", value: 58, color: "#5FCDA0" },
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
  const start = 0.2 + i * 0.07;
  const end = 0.5 + i * 0.07;
  const width = useTransform(progress, [start, end], ["0%", `${row.value}%`]);
  return (
    <div className="grid grid-cols-[28px_1fr_44px] items-center gap-3 border-t border-hairline py-[14px] last:border-b sm:grid-cols-[32px_200px_1fr_60px] sm:gap-4 md:grid-cols-[32px_220px_1fr_80px] md:gap-[18px] md:py-[18px]">
      <span className="font-mono text-[11px] text-dim">{row.idx}</span>
      <span className="text-[13px] text-text md:text-[15px]">{row.label}</span>
      <div className="relative h-1 rounded-full bg-hairline sm:col-auto col-span-3 sm:col-span-1">
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
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const { scrollYProgress: cardProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.8", "end 0.2"],
  });
  const needleX = useTransform(cardProgress, [0.1, 0.6], ["0%", "78%"]);
  const rangeFill = useTransform(cardProgress, [0.1, 0.6], ["0%", "78%"]);
  const scoreScale = useTransform(cardProgress, [0, 0.4], [0.88, 1]);
  const scoreOpacity = useTransform(cardProgress, [0, 0.35], [0.25, 1]);
  const cardY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={ref} className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-14 md:py-32">
      <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end md:gap-8">
        <motion.div style={{ y: titleY }} className="flex max-w-[900px] flex-col gap-5 md:gap-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-[18px] bg-gold" />
            <span className="kicker">FluxScore</span>
          </div>
          <h2 className="text-[34px] font-light leading-[1.1] tracking-[-0.03em] sm:text-[46px] md:text-[58px] lg:text-[64px] lg:leading-[68px]">
            A machine that reads{" "}
            <span className="font-serif italic text-gold">the real world</span>.
          </h2>
        </motion.div>
        <p className="max-w-[320px] text-[14px] leading-6 text-muted md:text-[15px]">
          Four dimensions, weighted by sector and jurisdiction. Updated every block, auditable on-chain.
        </p>
      </Reveal>

      <motion.div
        ref={cardRef}
        style={{ y: cardY }}
        className="grid grid-cols-1 overflow-hidden rounded-[18px] border border-hairline bg-surface md:grid-cols-[420px_1fr] lg:grid-cols-[460px_1fr]"
      >
        {/* score side */}
        <div className="flex flex-col justify-between gap-8 border-b border-hairline p-6 md:gap-10 md:border-b-0 md:border-r md:p-10">
          <div>
            <span className="kicker">Sample borrower</span>
            <div className="mt-2 text-base font-medium text-text md:text-lg">Atlas Commodities SA</div>
            <div className="mt-1 font-mono text-[11px] tracking-[0.06em] text-dim">
              Lagos, NG · FMCG distribution
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-gold">FluxScore</span>
            <motion.div
              style={{ scale: scoreScale, opacity: scoreOpacity }}
              className="origin-left text-[110px] font-extralight leading-[100px] tracking-[-0.05em] sm:text-[150px] sm:leading-[140px] md:text-[200px] md:leading-[180px]"
            >
              A2<span className="font-serif italic text-gold">+</span>
            </motion.div>
            <div className="mt-3 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.1em] text-dim">
              <span>D</span>
              <div className="relative h-1 flex-1 rounded-full bg-hairline">
                <motion.div
                  style={{ width: rangeFill, background: "linear-gradient(90deg, #5FCDA0 0%, #B7F1D5 100%)" }}
                  className="absolute left-0 top-0 h-1 rounded-full"
                />
                <motion.div style={{ left: needleX }} className="absolute -top-1 h-3 w-0.5 bg-gold" />
              </div>
              <span>A3+</span>
            </div>
          </div>
        </div>

        {/* breakdown side */}
        <div className="flex flex-col justify-between gap-6 p-6 md:gap-8 md:p-10">
          <div className="flex items-start justify-between gap-3">
            <div className="text-lg font-medium text-text md:text-xl">Score composition</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.08em] text-dim md:text-[11px]">
              updated 14s ago
            </div>
          </div>
          <div className="flex flex-col">
            {breakdown.map((r, i) => (
              <Bar key={r.idx} row={r} i={i} progress={cardProgress} />
            ))}
          </div>
          <div className="flex flex-col items-start justify-between gap-4 pt-4 sm:flex-row sm:items-center sm:pt-6">
            <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.1em] text-dim md:gap-5">
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
