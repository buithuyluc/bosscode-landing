import heroGroup from "../assets/hero-group.png";
import AiNetworkCanvas from "./AiNetworkCanvas";
import { useCountdown } from "../hooks/useCountdown";
import "./Hero.css";

const CHIPS = [
  {
    label: "THỜI GIAN",
    value: "9h–17h · 28/07/2026",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ff5a62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
  },
  {
    label: "ĐỊA ĐIỂM",
    value: "TheVuon Luxury, Hà Nội",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ff5a62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    ),
  },
  {
    label: "HÌNH THỨC",
    value: "Offline + Online Zoom",
    icon: (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#ff5a62" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="13" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
];

export default function Hero() {
  const cd = useCountdown();
  const cdParts = [
    { value: cd.days, label: "NGÀY" },
    { value: cd.hours, label: "GIỜ" },
    { value: cd.mins, label: "PHÚT" },
    { value: cd.secs, label: "GIÂY" },
  ];

  return (
    <section id="top" className="hero">
      <div className="hero-dots" />
      <div className="hero-photo">
        <img src={heroGroup} alt="Học viên Vinalink" />
        <div className="hero-photo-tint" />
        <div className="hero-photo-dim" />
        <div className="hero-photo-fade-x" />
        <div className="hero-photo-fade-y" />
      </div>
      <AiNetworkCanvas />
      <div className="hero-glow hero-glow-red" />
      <div className="hero-glow hero-glow-navy" />

      <div className="hero-content">
        <div className="hero-badge" style={{ animation: "heroUp .7s .05s both" }}>
          <span className="hero-badge-dot" />
          KHÓA HỌC 1 NGÀY DÀNH CHO LÃNH ĐẠO
        </div>

        <h1 className="hero-title" style={{ animation: "heroUp .8s .12s both" }}>
          BOSS<span>CODE</span>
        </h1>

        <div className="hero-rule" style={{ animation: "lineGrow .7s .5s both" }} />

        <p className="hero-sub" style={{ animation: "heroUp .8s .28s both" }}>
          CEO / Chủ tịch{" "}
          <strong>tự tay xây dựng App / AI Agent riêng</strong> cho công ty —
          không cần biết một dòng code.
        </p>

        <div className="hero-chips" style={{ animation: "heroUp .8s .4s both" }}>
          {CHIPS.map((c) => (
            <div className="hero-chip" key={c.label}>
              <span className="hero-chip-icon">{c.icon}</span>
              <div>
                <div className="hero-chip-label">{c.label}</div>
                <div className="hero-chip-value">{c.value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hero-ctas" style={{ animation: "heroUp .8s .52s both" }}>
          <a href="#dangky" className="hero-cta-gold">
            Giữ chỗ vé Gold →
          </a>
          <a href="tel:0353262236" className="hero-cta-call">
            <span className="hero-call-dot" />
            Gọi ngay · 0353 262 236
          </a>
        </div>

        <div className="hero-countdown" style={{ animation: "heroUp .8s .64s both" }}>
          <div className="hero-countdown-label">KHAI GIẢNG SAU</div>
          <div className="hero-countdown-parts">
            {cdParts.map((cp) => (
              <div className="hero-countdown-part" key={cp.label}>
                <div className="hero-countdown-value">{cp.value}</div>
                <div className="hero-countdown-unit">{cp.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
