import { motion, useReducedMotion } from "framer-motion";

const linearInf = { repeat: Infinity, ease: "linear" as const };
const pulse = { duration: 2.8, repeat: Infinity, ease: "easeInOut" as const };

function Spin({
  duration,
  reverse = false,
  children,
  className = "",
}: {
  duration: number;
  reverse?: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`flex items-center justify-center ${className}`}
      animate={reduce ? undefined : { rotate: reverse ? -360 : 360 }}
      transition={reduce ? undefined : { ...linearInf, duration }}
      style={{ transformOrigin: "center" }}
    >
      {children}
    </motion.div>
  );
}

export function DotSphere({ size = 540 }: { size?: number }) {
  return (
    <div className="relative flex items-center justify-center">
      <Spin duration={140}>
        <svg width={size} height={size} viewBox="0 0 540 540" className="block">
          <defs>
            <pattern id="dgmain" x="0" y="0" width="11" height="11" patternUnits="userSpaceOnUse">
              <circle cx="5.5" cy="5.5" r="1.2" fill="#D4D7DD" />
            </pattern>
            <radialGradient id="fadeMain" cx="270" cy="270" r="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.78" />
              <stop offset="78%" stopColor="#FFFFFF" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <mask id="sphereMaskMain">
              <circle cx="270" cy="270" r="240" fill="url(#fadeMain)" />
            </mask>
          </defs>
          <rect width="540" height="540" fill="url(#dgmain)" mask="url(#sphereMaskMain)" />
        </svg>
      </Spin>
      {/* Counter-rotating outer ring as proof of motion */}
      <Spin duration={60} reverse className="absolute inset-0">
        <svg width={size} height={size} viewBox="0 0 540 540" className="block">
          <circle
            cx="270"
            cy="270"
            r="248"
            fill="none"
            stroke="#B7F1D5"
            strokeOpacity="0.22"
            strokeWidth="0.8"
            strokeDasharray="2 8"
          />
        </svg>
      </Spin>
      {/* Pulsing gold core */}
      <motion.div
        className="absolute h-12 w-12 rounded-full bg-gold"
        animate={{ opacity: [0.55, 0.95, 0.55], scale: [0.9, 1.1, 0.9] }}
        transition={pulse}
        style={{ filter: "blur(2px)" }}
      />
      <div className="absolute h-5 w-5 rounded-full bg-gold" />
    </div>
  );
}

export function DotDisc() {
  return (
    <div className="relative flex items-center justify-center">
      <Spin duration={90} reverse>
        <svg width={260} height={260} viewBox="0 0 260 260" className="block">
          <defs>
            <pattern id="dg1" x="0" y="0" width="9" height="9" patternUnits="userSpaceOnUse">
              <circle cx="4.5" cy="4.5" r="1" fill="#C9CCD2" />
            </pattern>
            <radialGradient id="f1" cx="130" cy="130" r="130" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </radialGradient>
            <mask id="m1">
              <circle cx="130" cy="130" r="125" fill="url(#f1)" />
            </mask>
          </defs>
          <rect width="260" height="260" fill="url(#dg1)" mask="url(#m1)" />
        </svg>
      </Spin>
      <motion.div
        className="absolute h-5 w-5 rounded-full bg-gold"
        animate={{ opacity: [0.6, 1, 0.6], scale: [0.85, 1.15, 0.85] }}
        transition={pulse}
      />
    </div>
  );
}

export function DotSunburst() {
  const rays = Array.from({ length: 24 }, (_, i) => ({ angle: i * 15, long: i % 2 === 0 }));
  return (
    <div className="relative flex items-center justify-center">
      <Spin duration={70}>
        <svg width={260} height={260} viewBox="-130 -130 260 260" className="block">
          <g fill="#C9CCD2">
            {rays.map(({ angle, long }, i) => (
              <motion.g
                key={angle}
                transform={`rotate(${angle})`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.05 + (i % 12) * 0.04 }}
              >
                {[-30, -44, -58, -72, -86, -100, ...(long ? [-114] : [])].map((y, di) => (
                  <motion.circle
                    key={y}
                    cx="0"
                    cy={y}
                    r="1.1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.15 + di * 0.04 + (i % 12) * 0.04,
                    }}
                  />
                ))}
              </motion.g>
            ))}
          </g>
        </svg>
      </Spin>
      <motion.div
        className="absolute h-7 w-7 rounded-full bg-gold"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={pulse}
      />
      <motion.div
        className="absolute rounded-full border border-gold/40"
        animate={{ width: [44, 76, 44], height: [44, 76, 44], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
      />
    </div>
  );
}

export function DotOrbit() {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: 260, height: 260 }}
    >
      <svg width={260} height={260} viewBox="-130 -130 260 260" className="absolute inset-0">
        <circle cx="0" cy="0" r="40" fill="none" stroke="#2A2D33" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="70" fill="none" stroke="#2A2D33" strokeWidth="0.6" />
        <circle cx="0" cy="0" r="100" fill="none" stroke="#2A2D33" strokeWidth="0.6" />
      </svg>
      {/* inner ring satellites */}
      <Spin duration={14} className="absolute inset-0">
        <svg width={260} height={260} viewBox="-130 -130 260 260" className="block">
          <g fill="#C9CCD2">
            <circle cx="40" cy="0" r="2.4" />
            <circle cx="-28" cy="28" r="1.6" />
            <circle cx="0" cy="-40" r="1.6" />
          </g>
        </svg>
      </Spin>
      {/* mid ring */}
      <Spin duration={28} reverse className="absolute inset-0">
        <svg width={260} height={260} viewBox="-130 -130 260 260" className="block">
          <g fill="#C9CCD2">
            <circle cx="70" cy="0" r="1.8" />
            <circle cx="-50" cy="49" r="2" />
            <circle cx="35" cy="-60" r="1.6" />
            <circle cx="-70" cy="-15" r="1.8" />
          </g>
        </svg>
      </Spin>
      {/* outer ring */}
      <Spin duration={50} className="absolute inset-0">
        <svg width={260} height={260} viewBox="-130 -130 260 260" className="block">
          <g fill="#C9CCD2">
            <circle cx="100" cy="0" r="2" />
            <circle cx="-86" cy="50" r="1.6" />
            <circle cx="50" cy="86" r="1.8" />
            <circle cx="-50" cy="-86" r="2" />
            <circle cx="0" cy="-100" r="1.6" />
            <circle cx="86" cy="50" r="1.8" />
          </g>
        </svg>
      </Spin>
      <motion.div
        className="absolute h-5 w-5 rounded-full bg-gold"
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={pulse}
      />
      <motion.div
        className="absolute rounded-full border border-gold/45"
        animate={{ width: [36, 50, 36], height: [36, 50, 36], opacity: [0.5, 0.15, 0.5] }}
        transition={pulse}
      />
    </div>
  );
}

export function InnfluxRing({ size = 22 }: { size?: number }) {
  return (
    <div
      className="relative shrink-0"
      style={{
        width: size,
        height: size,
        border: "1.5px solid #B7F1D5",
        borderRadius: "50%",
      }}
    >
      <div
        className="absolute"
        style={{
          inset: size * 0.27,
          border: "1.5px solid #B7F1D5",
          borderRadius: "50%",
        }}
      />
    </div>
  );
}
