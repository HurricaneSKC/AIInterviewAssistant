"use client";

import { motion } from "framer-motion";
import React from "react";

const AnimateDiv = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.15,
        duration: 0.95,
        ease: [0.165, 0.84, 0.44, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateDiv;
