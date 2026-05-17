export function HexagonIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="#00c8ff"
      strokeWidth="1.5"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12,2 21,7 21,17 12,22 3,17 3,7" />
    </svg>
  );
}
