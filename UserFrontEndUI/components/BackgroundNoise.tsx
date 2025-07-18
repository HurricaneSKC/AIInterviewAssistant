// components/BackgroundNoise.tsx
export default function BackgroundNoise() {
  return (
    <svg
      style={{ filter: "contrast(125%) brightness(110%)" }}
      className="fixed z-[1] w-full h-full opacity-[35%]"
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".7"
          numOctaves="3"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
