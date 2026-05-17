export function DisclaimerBanner() {
  return (
    <div
      className="w-full py-3 px-4 text-center text-xs tracking-widest"
      style={{
        background: "rgba(180,20,20,0.08)",
        borderTop: "1px solid rgba(220,50,50,0.25)",
        borderBottom: "1px solid rgba(220,50,50,0.25)",
        color: "rgba(255,180,180,0.75)",
        fontFamily: "'Inter', sans-serif",
        letterSpacing: "0.12em",
      }}
    >
      ⚠ ALL PRODUCTS ARE FOR RESEARCH PURPOSES ONLY · NOT INTENDED FOR HUMAN USE · MUST BE 18+ TO PURCHASE
    </div>
  );
}
