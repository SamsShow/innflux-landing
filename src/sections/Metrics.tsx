import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
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

export default function Metrics() {
  return (
    <Reveal className="relative mx-auto max-w-[1440px] px-5 py-6 md:px-14 md:py-10">
      <div className="grid grid-cols-2 border-y border-hairline md:grid-cols-4">
        {metrics.map((m, i) => (
          <div
            key={m.label}
            className={`flex flex-col justify-between gap-6 px-5 py-6 md:gap-8 md:px-7 md:py-8 ${
              i < 2 ? "border-b border-hairline md:border-b-0" : ""
            } ${i % 2 === 0 ? "border-r border-hairline" : ""} ${
              i === metrics.length - 1 ? "md:border-r-0" : "md:border-r"
            }`}
          >
            <span className="kicker">{m.label}</span>
            <div>
              <div className="text-[34px] font-light leading-[1] tracking-[-0.035em] text-text sm:text-[42px] md:text-[52px] md:leading-[52px]">
                {m.value}
              </div>
              <div className="mt-2.5 font-mono text-[11px] tracking-[0.06em] text-dim">{m.note}</div>
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
