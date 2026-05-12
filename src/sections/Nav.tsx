import { motion, useScroll, useTransform } from "framer-motion";
import { InnfluxRing } from "../components/DotIllustrations";

export default function Nav() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 80], ["rgba(10,11,13,0)", "rgba(10,11,13,0.72)"]);
  const blur = useTransform(scrollY, [0, 80], ["blur(0px)", "blur(14px)"]);
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  return (
    <motion.nav
      style={{ backgroundColor: bg, backdropFilter: blur as never }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.div
        style={{ opacity: borderOpacity }}
        className="absolute inset-x-0 bottom-0 h-px bg-hairline"
      />
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-14">
        <div className="flex items-center gap-12">
          <div className="flex items-center gap-2.5">
            <InnfluxRing size={24} />
            <span className="text-lg font-medium tracking-[-0.01em] text-text">innflux</span>
          </div>
          <ul className="hidden items-center gap-9 text-sm text-soft md:flex">
            {["Platform", "Solutions", "FluxScore", "Resources", "About"].map((l) => (
              <li key={l} className="cursor-pointer transition-colors hover:text-text">
                {l}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden items-center gap-1.5 text-sm text-soft md:inline-flex">
            For developers <span className="text-[11px]">↗</span>
          </span>
          <button className="rounded-lg border border-border2 bg-surface px-4 py-2.5 text-sm font-medium text-text">
            Sign in
          </button>
          <button className="rounded-lg bg-gold px-[18px] py-2.5 text-sm font-semibold text-ground">
            Enter Beta
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
