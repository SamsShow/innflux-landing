import { motion, useScroll, useTransform } from "framer-motion";

export function PeachHalo() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 0.4], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.6, 0]);
  return (
    <motion.div
      aria-hidden
      style={{ x, opacity }}
      className="pointer-events-none fixed -top-72 -right-72 h-[900px] w-[900px] rounded-full"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(95,205,160,0.32) 0%, rgba(95,205,160,0.12) 35%, rgba(95,205,160,0) 70%)",
          filter: "blur(40px)",
        }}
      />
    </motion.div>
  );
}

export function MagentaHalo() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0.4, 1], [200, -100]);
  const opacity = useTransform(scrollYProgress, [0.3, 0.6, 1], [0, 1, 0.4]);
  return (
    <motion.div
      aria-hidden
      style={{ y, opacity }}
      className="pointer-events-none fixed bottom-[20%] -left-80 h-[1000px] w-[1000px] rounded-full"
    >
      <div
        className="h-full w-full rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(45,180,200,0.22) 0%, rgba(45,180,200,0.08) 40%, rgba(45,180,200,0) 70%)",
          filter: "blur(50px)",
        }}
      />
    </motion.div>
  );
}
