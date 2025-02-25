// components/GradientCanvas.tsx
"use client";
import { motion } from "framer-motion";

export default function GradientCanvas() {
  return (
    <motion.canvas
      initial={{ filter: "blur(20px)" }}
      animate={{ filter: "blur(0px)" }}
      transition={{ duration: 1, ease: [0.075, 0.82, 0.965, 1] }}
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
      id="gradient-canvas"
      data-transition-in
      className="hidden md:block z-50 fixed top-0 right-[-2px] w-full h-screen bg-[#c3e4ff]"
    />
  );
}
