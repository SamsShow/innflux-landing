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
    <section className="relative mx-auto max-w-[1440px] px-14 py-32">
      <Reveal className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <span className="h-px w-[18px] bg-gold" />
            <span className="kicker">Solutions</span>
          </div>
          <h2 className="max-w-[680px] text-[64px] font-light leading-[68px] tracking-[-0.03em]">
            How our credit can help you.
          </h2>
        </div>
        <div className="flex items-center gap-8 text-[15px] text-dim">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`relative pb-1.5 transition-colors ${
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
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <article
            key={c.title}
            className="flex flex-col justify-between gap-10 rounded-[18px] border border-hairline bg-surface p-8"
          >
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center justify-between">
                <span className={`kicker ${c.active ? "text-gold" : ""}`}>{c.idx}</span>
                <span
                  className={`h-2 w-2 rounded-full bg-gold ${c.active ? "" : "opacity-40"}`}
                />
              </div>
              <h3 className="text-[22px] font-medium tracking-[-0.015em] text-text">{c.title}</h3>
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
