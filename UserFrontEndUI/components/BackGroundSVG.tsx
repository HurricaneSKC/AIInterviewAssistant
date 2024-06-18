import React from "react";

const BackGroundSVG = () => {
  return (
    <svg
      id="texture"
      style={{ filter: "contrast(120%) brightness(120%)" }}
      className="fixed z-[1] w-full h-full opacity-[35%]"
    >
      <filter id="noise" data-v-1d260e0e="">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".8"
          numOctaves="4"
          stitchTiles="stitch"
          data-v-1d260e0e=""
        ></feTurbulence>
        <feColorMatrix
          type="saturate"
          values="0"
          data-v-1d260e0e=""
        ></feColorMatrix>
      </filter>
      <rect
        width="100%"
        height="100%"
        filter="url(#noise)"
        data-v-1d260e0e=""
      ></rect>
    </svg>
  );
};

export default BackGroundSVG;
