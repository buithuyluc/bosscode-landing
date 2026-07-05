import { useEffect, useState } from "react";

const TARGET = new Date("2026-07-28T09:00:00+07:00").getTime();

function computeCd() {
  let diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / 86400000);
  diff -= d * 86400000;
  const h = Math.floor(diff / 3600000);
  diff -= h * 3600000;
  const m = Math.floor(diff / 60000);
  diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  const pad = (n) => String(n).padStart(2, "0");
  return { days: String(d), hours: pad(h), mins: pad(m), secs: pad(s) };
}

export function useCountdown() {
  const [cd, setCd] = useState(computeCd);

  useEffect(() => {
    const t = setInterval(() => setCd(computeCd()), 1000);
    return () => clearInterval(t);
  }, []);

  return cd;
}
