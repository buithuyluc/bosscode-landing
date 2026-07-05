import { pricingBase } from "../data/content";
import { useTicketCountsContext } from "../context/TicketCountsContext";
import "./Pricing.css";

function TicketBar() {
  const { goldLeft, silverLeft, limits, loading, error } = useTicketCountsContext();

  // Display only — never show 0 or "hết vé": floor at 1 regardless of how
  // many have actually been taken. Registration itself is never blocked by
  // this number; it's purely cosmetic urgency on the pricing section.
  const goldDisplay = goldLeft == null ? goldLeft : Math.max(1, goldLeft);
  const silverDisplay = silverLeft == null ? silverLeft : Math.max(1, silverLeft);

  const goldPct = goldDisplay == null ? 6 : Math.max(6, Math.round((goldDisplay / limits.Gold) * 100));
  const silverPct = silverDisplay == null ? 6 : Math.max(6, Math.round((silverDisplay / limits.Silver) * 100));

  return (
    <div data-reveal className="ticket-bar">
      <div>
        <div className="ticket-row">
          <span className="ticket-label ticket-label-gold">VÉ GOLD CÒN LẠI</span>
          <span className="ticket-count">
            {loading ? "…" : error ? "—" : goldDisplay}
            <span className="ticket-count-total">/{limits.Gold}</span>
          </span>
        </div>
        <div className="ticket-track">
          <div className="ticket-fill ticket-fill-gold" style={{ width: `${goldPct}%` }} />
        </div>
      </div>
      <div>
        <div className="ticket-row">
          <span className="ticket-label ticket-label-silver">VÉ SILVER CÒN LẠI</span>
          <span className="ticket-count">
            {loading ? "…" : error ? "—" : silverDisplay}
            <span className="ticket-count-total">/{limits.Silver}</span>
          </span>
        </div>
        <div className="ticket-track">
          <div className="ticket-fill ticket-fill-silver" style={{ width: `${silverPct}%` }} />
        </div>
      </div>
      {error && (
        <p className="ticket-error">
          Không tải được số vé còn lại — vui lòng tải lại trang.
        </p>
      )}
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="baogia" className="pricing">
      <div className="pricing-dots" />
      <div className="pricing-inner">
        <div data-reveal className="pricing-head">
          <div className="eyebrow eyebrow-pink">BẢNG GIÁ VÉ</div>
          <h2 className="section-title section-title-white">Chọn hạng vé của bạn</h2>
        </div>

        <TicketBar />

        <div className="price-grid">
          {pricingBase.map((p) => (
            <div data-reveal className="price-card" data-tier={p.key} key={p.key}>
              <div className="price-card-overlay">
                <div className="price-card-topbar" />
                <div className="price-card-shine" />
              </div>
              {p.ribbon && <div className="price-card-ribbon">{p.ribbon}</div>}
              <div className="price-card-name">{p.name}</div>
              <div className="price-card-tagline">{p.tagline}</div>
              <div className="price-card-price">{p.price}</div>
              <div className="price-card-seats">{p.seatsLabel}</div>
              {p.highlight && (
                <div className="price-card-highlight">
                  <span className="price-card-highlight-badge">TẶNG</span>
                  <span>{p.highlight}</span>
                </div>
              )}
              <ul className="price-card-features">
                {p.features.map((f, i) => (
                  <li key={i}>
                    <span>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a href="#dangky" className="price-card-cta">
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div id="dacquyen" data-reveal className="vip-offer">
          <div className="vip-offer-top">
            <div className="vip-offer-badge">★ ƯU ĐÃI ĐẶC QUYỀN SUPER VIP</div>
            <div className="vip-offer-deadline">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ffcf6e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              Thời hạn trước <strong>20/07/2026</strong>
            </div>
          </div>

          <p className="vip-offer-intro">
            Miễn phí khoá BossCode khi bạn là thành viên đặc quyền:
          </p>

          <div className="vip-offer-grid">
            <div className="vip-offer-item">
              <div className="vip-offer-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5a0a10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2 15 8.5 22 9.3l-5 4.9 1.2 7L12 17.8 5.8 21.2 7 14.2l-5-4.9 7-.8z" />
                </svg>
              </div>
              <div>
                Đăng ký mới đặc quyền <span>SUPER VIP Vinalink</span>
              </div>
            </div>
            <div className="vip-offer-item">
              <div className="vip-offer-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#5a0a10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </div>
              <div>
                Hoặc <span>VIP nâng cấp lên SUPER VIP</span>
              </div>
            </div>
          </div>

          <div className="vip-offer-footer">
            <div className="vip-offer-footer-line">
              Được <strong>MIỄN PHÍ trọn gói khoá BossCode</strong>
            </div>
            <div className="vip-offer-value">Trị giá 10.800.000đ</div>
          </div>
        </div>
      </div>
    </section>
  );
}
