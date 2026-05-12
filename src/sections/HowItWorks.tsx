import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { DotDisc, DotOrbit, DotSunburst } from "../components/DotIllustrations";
import { Reveal } from "../lib/motion";

const cards = [
  {
    layer: "Layer 01",
    title: "Accept liquidity",
    body: "Lenders deposit USDT or staked AMM LP tokens. ERC-4626 vaults issue composable yield-bearing shares — usable across DeFi.",
    art: <DotDisc />,
    drift: 90, // outer card, larger parallax
  },
  {
    layer: "Layer 02",
    title: "Score risk",
    body: "FluxScore blends on-chain repayment with ZK-attested invoice flow, ERP banking data, and KYB. One score, updated every block.",
    art: <DotSunburst />,
    drift: 30, // middle card, gentler
  },
  {
    layer: "Layer 03",
    title: "Deploy capital",
    body: "Borrowers draw down in USDC, settle in local fiat through licensed partners. Lines from $250K to $10M, available globally.",
    art: <DotOrbit />,
    drift: 90,
  },
];

function Card({
  c,
  progress,
  index,
}: {
  c: (typeof cards)[number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  index: number;
}) {
  // Alternating direction: outer cards drift opposite to middle.
  const sign = index === 1 ? -1 : 1;
  const y = useTransform(progress, [0, 1], [c.drift * sign, -c.drift * sign]);
  return (
    <motion.article
      style={{ y }}
      className="relative flex min-h-[560px] flex-col gap-6 overflow-hidden rounded-[18px] border border-hairline bg-surface p-9"
    >
      <header className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <span className="kicker">{c.layer}</span>
          <h3 className="text-2xl font-medium tracking-[-0.015em] text-text">{c.title}</h3>
        </div>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-[1.5px] border-gold">
          <div className="h-2 w-2 rounded-full bg-gold" />
        </div>
      </header>
      <p className="max-w-[300px] text-[14px] leading-[22px] text-muted">{c.body}</p>
      <div className="mt-auto flex flex-1 items-end justify-center pt-6">{c.art}</div>
    </motion.article>
  );
}

export default function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headlineX = useTransform(scrollYProgress, [0, 1], [-140, 140]);
  const dimColor = useTransform(scrollYProgress, [0.2, 0.6], ["#8A8F98", "#FAFAF7"]);

  return (
    <section ref={ref} className="relative mx-auto max-w-[1440px] px-14 py-32">
      <Reveal className="mb-12 flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <span className="h-px w-[18px] bg-gold" />
          <span className="kicker">How innflux works</span>
        </div>
        <motion.h2
          style={{ x: headlineX }}
          className="max-w-[820px] text-[64px] font-light leading-[68px] tracking-[-0.03em]"
        >
          Three coordinated layers.{" "}
          <motion.span style={{ color: dimColor }}>One open credit network.</motion.span>
        </motion.h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {cards.map((c, i) => (
          <Card key={c.title} c={c} progress={scrollYProgress} index={i} />
        ))}
      </div>
    </section>
  );
}
