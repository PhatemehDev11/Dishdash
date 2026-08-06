"use client";

import { motion } from "framer-motion";

type FloatCardProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function FloatCard({
  children,
  className,
  delay = 0,
}: FloatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: .9 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
      }}
      transition={{
        opacity: { duration: .5, delay },
        scale: { duration: .5, delay },
        y: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      className={`absolute rounded-2xl border bg-background/90 backdrop-blur-xl shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
} 