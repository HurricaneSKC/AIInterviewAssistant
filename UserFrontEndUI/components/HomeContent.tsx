// components/HomeContent.tsx
"use client";
import { motion } from "framer-motion";
import LinkButton from "@/components/CTAs/LinkButton";
import { useGradient } from "@/hooks/useGradient";

export default function HomeContent() {
  useGradient();

  return (
    <main className="flex flex-col justify-center h-[90%] static md:fixed w-screen overflow-hidden grid-rows-[1fr_repeat(3,auto)_1fr] z-[100] pt-[30px] pb-[320px] px-4 md:px-20 md:py-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="relative md:ml-[-10px] mb-4 text-[#07bcc2] text-[16vw] md:text-[130px] leading-[0.9] tracking-[-2px] z-[100] [text-shadow:_1px_1px_2px_rgb(255_255_255_/_60%)]"
      >
        <em className="not-italic text-black">AI</em>IA
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="relative md:ml-[-10px] md:mb-[37px] text-white text-[16vw] md:text-[80px] font-inter leading-[0.9] tracking-[-2px] z-[100] [text-shadow:_1px_1px_2px_rgb(0_0_0_/_75%)]"
      >
        AI Interview Assistant
        <span className="font-inter text-[#00f6ff]"></span>
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.95,
          ease: [0.165, 0.84, 0.44, 1],
        }}
        className="flex flex-row justify-center z-20 mx-0 mb-0 mt-8 md:mt-0 md:mb-[35px] max-w-2xl md:space-x-8"
      >
        <div className="w-1/2">
          <h2 className="flex items-center font-semibold text-[1em] text-[#fff]">
            Platform
          </h2>
          <p className="text-[14px] leading-[20px] text-[#fff] font-normal">
            Sign up for full access to our platform, including all questions and
            solutions.
          </p>
        </div>
        <div className="w-1/2">
          <h2 className="flex items-center font-semibold text-[1em] text-[#fff]">
            Community
          </h2>
          <p className="text-[14px] leading-[20px] text-[#fff] font-normal">
            Join a community of like-minded individuals, and learn from each
            other.
          </p>
        </div>
      </motion.div>

      <div className="flex gap-[15px] mt-8 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.65,
            duration: 0.55,
            ease: [0.075, 0.82, 0.965, 1],
          }}
        >
          <LinkButton
            pageLink="user/signin"
            buttonText="Get started"
            rightArrow
            primary
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.65,
            duration: 0.55,
            ease: [0.075, 0.82, 0.965, 1],
          }}
        ></motion.div>
      </div>
    </main>
  );
}
