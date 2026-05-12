import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { InnfluxRing } from "../components/DotIllustrations";

export default function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(10,11,13,0)", "rgba(10,11,13,0.72)"]);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      style={{ backgroundColor: bg, backdropFilter: blur as never }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-hairline"
      />
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-14">
        <div className="flex items-center gap-6 md:gap-12">
          <div className="flex items-center gap-2.5">
            <InnfluxRing size={22} />
            <span className="text-base font-medium tracking-[-0.01em] text-text md:text-lg">
              innflux
            </span>
          </div>
          <ul className="hidden items-center gap-9 text-sm text-soft md:flex">
            {["Platform", "Solutions", "FluxScore", "Resources", "About"].map((l) => (
              <li key={l} className="cursor-pointer transition-colors hover:text-text">
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <span className="hidden items-center gap-1.5 text-sm text-soft lg:inline-flex">
            For developers <span className="text-[11px]">↗</span>
          </span>
          <button className="hidden rounded-lg border border-border2 bg-surface px-4 py-2.5 text-sm font-medium text-text sm:inline-block">
            Sign in
          </button>
          <button className="rounded-lg bg-gold px-4 py-2 text-[13px] font-semibold text-ground md:px-[18px] md:py-2.5 md:text-sm">
            Enter Beta
          </button>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border2 md:hidden"
          >
            <div className="flex flex-col gap-1">
              <span className="h-px w-4 bg-text" />
              <span className="h-px w-4 bg-text" />
              <span className="h-px w-4 bg-text" />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-hairline bg-ground/95 px-5 py-4 backdrop-blur md:hidden">
          <ul className="flex flex-col gap-3 text-sm text-soft">
            {["Platform", "Solutions", "FluxScore", "Resources", "About", "Sign in"].map((l) => (
              <li key={l} className="py-1">
                {l}
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.nav>
  );
}
