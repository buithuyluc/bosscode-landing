import { useEffect, useRef } from "react";

/**
 * Subtle animated node network (navy + a few red nodes) used behind the hero
 * and final CTA sections. Pure decoration — pointer-events disabled.
 */
export default function AiNetworkCanvas({ className, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return undefined;
    const ctx = c.getContext("2d");
    let w = 0,
      h = 0,
      dpr = 1,
      nodes = [],
      raf;

    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      const r = c.getBoundingClientRect();
      w = r.width;
      h = r.height;
      c.width = Math.max(1, w * dpr);
      c.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const N = Math.max(20, Math.min(46, Math.round((w * h) / 24000)));
    nodes = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.5 + 0.9,
      red: Math.random() < 0.28,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const a of nodes) {
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < 135) {
            const o = (1 - d / 135) * 0.2;
            ctx.strokeStyle =
              a.red || b.red
                ? "rgba(211,46,54," + o * 1.1 + ")"
                : "rgba(150,162,255," + o + ")";
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const a of nodes) {
        if (a.red) {
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r * 3.5, 0, 7);
          ctx.fillStyle = "rgba(211,46,54,0.12)";
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(a.x, a.y, a.r, 0, 7);
        ctx.fillStyle = a.red ? "rgba(211,46,54,0.95)" : "rgba(205,212,255,0.85)";
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    window.addEventListener("resize", resize);
    const resizeTimer = setTimeout(resize, 500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        ...style,
      }}
    />
  );
}
