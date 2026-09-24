import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function MotionReveal({
  children,
  className,
  delay = 0,
}: Props) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, y: 48, scale: 0.96, filter: "blur(4px)" }
      }
      whileInView={
        shouldReduceMotion
          ? undefined
          : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.14 }}
      transition={{ duration: 0.82, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
