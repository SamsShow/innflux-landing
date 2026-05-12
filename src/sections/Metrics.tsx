import { motion, useInView, useMotionValue, useScroll, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { easeOut, Reveal } from "../lib/motion";

function CountUp({ to, decimals = 0, prefix = "", suffix = "" }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const mv = useMotionValue(0);
  const formatted = useTransform(mv, (v) =>
    `${prefix}${v.toFixed(decimals)}${suffix}`
  );
  useEffect(() => {
    if (inView) {
      const controls = animate(mv, to, { duration: 1.6, ease: easeOut });
      return () => controls.stop();
    }
  }, [inView, mv, to]);
  return <motion.span ref={ref}>{formatted}</motion.span>;
}

const metrics = [
  { label: "Total value locked", value: <><CountUp to={284.6} decimals={1} prefix="$" /><span className="text-gold">M</span></>, note: "+18.4% past 30 days" },
  { label: "USDC yield · 30D", value: <><CountUp to={12.4} decimals={1} /><span className="text-gold">%</span></>, note: "real-world, paid weekly" },
  { label: "Loans originated", value: <CountUp to={412} />, note: "12 jurisdictions" },
  { label: "Default rate", value: <><CountUp to={0.31} decimals={2} /><span className="text-gold">%</span></>, note: "insured to zero for LPs" },
];

function Column({ m, i, progress }: { m: (typeof metrics)[number]; i: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  // Staircase parallax: each column moves at a slightly different rate.
  const range = 40 + i * 20;
  const y = useTransform(progress, [0, 1], [range, -range]);
  return (
    <motion.div
      style={{ y }}
      className={`flex flex-col justify-between gap-8 px-7 py-8 ${
        i !== metrics.length - 1 ? "md:border-r border-hairline" : ""
      }`}
    >
      <span className="kicker">{m.label}</span>
      <div>
        <div className="text-[52px] font-light leading-[52px] tracking-[-0.035em] text-text">
          {m.value}
        </div>
        <div className="mt-2.5 font-mono text-[11px] tracking-[0.06em] text-dim">{m.note}</div>
      </div>
    </motion.div>
  );
}

export default function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  return (
    <Reveal className="relative mx-auto max-w-[1440px] px-14 py-10">
      <div ref={ref} className="grid grid-cols-2 border-y border-hairline md:grid-cols-4">
        {metrics.map((m, i) => (
          <Column key={m.label} m={m} i={i} progress={scrollYProgress} />
        ))}
      </div>
    </Reveal>
  );
}
