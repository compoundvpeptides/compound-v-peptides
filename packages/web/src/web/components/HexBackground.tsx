export function HexBackgroundSVG() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="hex-pattern" x="0" y="0" width="80" height="92" patternUnits="userSpaceOnUse">
          <polygon points="40,4 76,24 76,68 40,88 4,68 4,24" fill="none" stroke="#00D4AA" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hex-pattern)" />
    </svg>
  );
}
