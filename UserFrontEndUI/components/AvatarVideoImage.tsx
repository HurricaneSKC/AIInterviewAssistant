import { motion } from "framer-motion";
import React from "react";

interface Props {
  src: string;
  alt: string;
}

const AvatarVideoImage = ({ src, alt }: Props) => {
  return (
    <motion.img
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      src={src}
      alt={alt}
      className="absolute w-full aspect-video bg-gray-100 rounded ring-1 ring-gray-900/5 shadow-md object-cover p-2 mt-6"
    />
  );
};

export default AvatarVideoImage;
