export function HorizontalSyringeRuler({
  units,
  syringeMax,
  active,
}: {
  units: number | null;
  syringeMax: number;
  active: boolean;
}) {
  const W = 800;
  const H = 180;
  const NEEDLE_L = 48;
  const NEEDLE_HUB_W = 26;
  const BARREL_X = NEEDLE_HUB_W + NEEDLE_L + 2;
  const BARREL_W = 660;
  const BARREL_Y = 52;
  const BARREL_H = 60;
  const PLUNGER_ROD_W = 28;

  const majorStep = syringeMax <= 40 ? 5 : 10;
  const minorStep = 1;

  const unitToX = (u: number) => BARREL_X + (u / syringeMax) * BARREL_W;

  const clampedUnits = units !== null ? Math.min(Math.max(units, 0), syringeMax) : 0;
  const overCapacity = units !== null && units > syringeMax;
  const fillW = active ? (clampedUnits / syringeMax) * BARREL_W : 0;
  const indicatorX = unitToX(clampedUnits);

  const unitLabel =
    units !== null
      ? Number.isInteger(units) ? `${units}` : units.toFixed(1)
      : "";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: "block", overflow: "visible" }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fillGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00D4AA" />
          <stop offset="100%" stopColor="#00A882" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Needle hub */}
      <rect
        x={NEEDLE_L} y={BARREL_Y + 8}
        width={NEEDLE_HUB_W} height={BARREL_H - 16} rx="3"
        fill={active ? "rgba(0,212,170,0.6)" : "rgba(148,163,184,0.2)"}
      />
      {/* Needle */}
      <line
        x1={NEEDLE_L} y1={BARREL_Y + BARREL_H / 2}
        x2={0} y2={BARREL_Y + BARREL_H / 2}
        stroke={active ? "rgba(0,212,170,0.7)" : "rgba(148,163,184,0.3)"}
        strokeWidth="3.5" strokeLinecap="round"
      />

      {/* Barrel background */}
      <rect
        x={BARREL_X} y={BARREL_Y}
        width={BARREL_W} height={BARREL_H} rx="6"
        fill="#1a2535"
        stroke={active ? "rgba(0,212,170,0.4)" : "rgba(148,163,184,0.2)"}
        strokeWidth="1.5"
      />

      {/* Teal fill */}
      {active && fillW > 0 && (
        <rect
          x={BARREL_X + 1} y={BARREL_Y + 1}
          width={Math.max(fillW - 2, 0)} height={BARREL_H - 2} rx="5"
          fill={overCapacity ? "rgba(239,68,68,0.55)" : "url(#fillGrad)"}
          opacity="0.85"
          style={{ transition: "width 0.6s ease-out, fill 0.3s" }}
        />
      )}

      {/* Tick marks */}
      {Array.from({ length: syringeMax + 1 }, (_, i) => {
        if (i % minorStep !== 0) return null;
        const isMajor = i % majorStep === 0;
        const x = unitToX(i);
        const tickH = isMajor ? 22 : 11;
        const tickY = BARREL_Y + BARREL_H;
        return (
          <g key={i}>
            <line
              x1={x} y1={tickY} x2={x} y2={tickY + tickH}
              stroke={isMajor ? "#94A3B8" : "rgba(148,163,184,0.4)"}
              strokeWidth={isMajor ? 2 : 1}
            />
            {isMajor && (
              <text
                x={x} y={tickY + tickH + 16}
                textAnchor="middle" fontSize="15"
                fontFamily="'Inter', monospace" fill="#94A3B8" fontWeight="600"
              >
                {i}
              </text>
            )}
          </g>
        );
      })}

      {/* Indicator */}
      {active && units !== null && (
        <g style={{ transition: "transform 0.6s ease-out" }}>
          <line
            x1={indicatorX} y1={BARREL_Y - 16}
            x2={indicatorX} y2={BARREL_Y + BARREL_H + 8}
            stroke={overCapacity ? "#EF4444" : "#00D4AA"}
            strokeWidth="2" filter="url(#glow)"
            strokeDasharray={overCapacity ? "4 3" : "none"}
            style={{ transition: "x1 0.6s ease-out, x2 0.6s ease-out" }}
          />
          <polygon
            points={`${indicatorX},${BARREL_Y - 24} ${indicatorX - 7},${BARREL_Y - 13} ${indicatorX},${BARREL_Y - 4} ${indicatorX + 7},${BARREL_Y - 13}`}
            fill={overCapacity ? "#EF4444" : "#00D4AA"}
            filter="url(#glow)"
          />
          <rect
            x={indicatorX - 28} y={BARREL_Y - 52}
            width="56" height="26" rx="8"
            fill={overCapacity ? "rgba(239,68,68,0.9)" : "rgba(0,212,170,0.9)"}
          />
          <text
            x={indicatorX} y={BARREL_Y - 33}
            textAnchor="middle" fontSize="16"
            fontFamily="'Rajdhani', sans-serif" fontWeight="700"
            fill={overCapacity ? "#fff" : "#080C10"}
          >
            {unitLabel}u
          </text>
        </g>
      )}

      {/* Plunger rod */}
      <rect x={BARREL_X + BARREL_W} y={BARREL_Y + BARREL_H / 2 - 3} width={PLUNGER_ROD_W} height="6" rx="2"
        fill={active ? "rgba(0,212,170,0.35)" : "rgba(148,163,184,0.2)"} />
      {/* Plunger flange */}
      <rect x={BARREL_X + BARREL_W + PLUNGER_ROD_W - 14} y={BARREL_Y + 6} width="14" height={BARREL_H - 12} rx="3"
        fill={active ? "rgba(0,212,170,0.5)" : "rgba(148,163,184,0.25)"} />
    </svg>
  );
}
