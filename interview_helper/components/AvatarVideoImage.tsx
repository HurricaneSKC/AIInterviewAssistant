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
      className="absolute top-6 left-6 w-[30%] aspect-video bg-gray-700 rounded ring-1 ring-gray-900/5 shadow-md object-cover"
    />
  );
};

export default AvatarVideoImage;
