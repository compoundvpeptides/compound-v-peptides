export function SyringeIcon04({ selected }: { selected: boolean }) {
  const color = selected ? "#00D4AA" : "#64748B";
  return (
    <svg viewBox="0 0 80 120" width="60" height="90" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* barrel */}
      <rect x="24" y="18" width="32" height="70" rx="5" stroke={color} strokeWidth="2.5" fill={selected ? "rgba(0,212,170,0.07)" : "rgba(100,116,139,0.05)"} />
      {/* ml marks */}
      {[30, 43, 56, 69, 82].map((y, i) => (
        <line key={i} x1="24" y1={y} x2="32" y2={y} stroke={color} strokeWidth="1.5" opacity="0.6" />
      ))}
      {/* plunger */}
      <rect x="37" y="8" width="6" height="22" rx="2" fill={color} opacity="0.5" />
      <rect x="30" y="26" width="20" height="5" rx="2" fill={color} opacity="0.7" />
      {/* needle hub */}
      <rect x="31" y="88" width="18" height="7" rx="2" fill={color} opacity="0.8" />
      {/* needle */}
      <line x1="40" y1="95" x2="40" y2="115" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function SyringeIcon1ml({ selected }: { selected: boolean }) {
  const color = selected ? "#00D4AA" : "#64748B";
  return (
    <svg viewBox="0 0 80 150" width="60" height="120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* barrel */}
      <rect x="24" y="14" width="32" height="100" rx="5" stroke={color} strokeWidth="2.5" fill={selected ? "rgba(0,212,170,0.07)" : "rgba(100,116,139,0.05)"} />
      {/* ml marks */}
      {[24, 34, 44, 54, 64, 74, 84, 94, 104, 114].map((y, i) => (
        <line key={i} x1="24" y1={y} x2={i % 2 === 0 ? "34" : "30"} y2={y} stroke={color} strokeWidth="1.5" opacity="0.6" />
      ))}
      {/* plunger */}
      <rect x="37" y="4" width="6" height="22" rx="2" fill={color} opacity="0.5" />
      <rect x="30" y="22" width="20" height="5" rx="2" fill={color} opacity="0.7" />
      {/* needle hub */}
      <rect x="31" y="114" width="18" height="7" rx="2" fill={color} opacity="0.8" />
      {/* needle */}
      <line x1="40" y1="121" x2="40" y2="143" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
