import { motion } from "framer-motion";
import { useState } from "react";
import { easeOut, Reveal } from "../lib/motion";

const tabs = ["Trade finance", "Working capital", "Payroll", "Energy"];

const cards = [
  {
    idx: "01 — Accept",
    title: "Pre-shipment finance",
    body: "Fund purchase orders before goods leave the warehouse. 30–90 day terms.",
    active: true,
  },
  {
    idx: "02 — Reduce",
    title: "Invoice factoring",
    body: "Sell verified receivables instantly. Average advance rate, 87% of face value.",
  },
  {
    idx: "03 — Transact",
    title: "FX & settlement",
    body: "Draw down in USDC. Settle in NGN, KES, VND, BRL through licensed partners.",
  },
  {
    idx: "04 — Tokenize",
    title: "Tokenized credit lines",
    body: "ERC-4626 share tokens. Compose your yield position anywhere across DeFi.",
  },
];

export default function Solutions() {
  const [active, setActive] = useState(0);
  return (
    <section className="relative mx-auto max-w-[1440px] px-5 py-20 md:px-14 md:py-32">
      <Reveal className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end md:gap-8">
        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-[18px] bg-gold" />
            <span className="kicker">Solutions</span>
          </div>
          <h2 className="max-w-[680px] text-[34px] font-light leading-[1.1] tracking-[-0.03em] sm:text-[46px] md:text-[58px] lg:text-[64px] lg:leading-[68px]">
            How our credit can help you.
          </h2>
        </div>
        <div className="-mx-5 flex max-w-full items-center gap-6 overflow-x-auto px-5 text-[14px] text-dim md:gap-8 md:overflow-visible md:text-[15px]">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`relative shrink-0 pb-1.5 transition-colors ${
                i === active ? "text-text" : "hover:text-soft"
              }`}
            >
              {t}
              {i === active && (
                <motion.span
                  layoutId="tab-underline"
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="absolute inset-x-0 -bottom-px h-px bg-gold"
                />
              )}
            </button>
          ))}
        </div>
      </Reveal>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {cards.map((c) => (
          <article
            key={c.title}
            className="flex flex-col justify-between gap-8 rounded-[18px] border border-hairline bg-surface p-6 md:gap-10 md:p-8"
          >
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className={`kicker ${c.active ? "text-gold" : ""}`}>{c.idx}</span>
                <span
                  className={`h-2 w-2 rounded-full bg-gold ${c.active ? "" : "opacity-40"}`}
                />
              </div>
              <h3 className="text-[20px] font-medium tracking-[-0.015em] text-text md:text-[22px]">
                {c.title}
              </h3>
              <p className="text-[13px] leading-5 text-muted">{c.body}</p>
            </div>
            <a className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-text">
              Read more <span>→</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
