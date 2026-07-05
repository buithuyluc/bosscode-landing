import ceoBeforeAfter from "../assets/ceo-before-after.png";
import { before, after } from "../data/content";
import "./BeforeAfter.css";

export default function BeforeAfter() {
  return (
    <section id="daura" className="ba">
      <div className="ba-inner">
        <div data-reveal className="ba-head">
          <div className="eyebrow eyebrow-red">TRƯỚC & SAU MỘT NGÀY</div>
          <h2 className="section-title section-title-navy ba-title">
            Thay đổi cách bạn điều hành,
            <br />
            chỉ trong một ngày.
          </h2>
        </div>

        <div className="ba-grid">
          <div data-reveal className="ba-col ba-before">
            <div className="ba-col-label">
              <span className="ba-badge ba-badge-x">✕</span>
              HÔM NAY — CHƯA CÓ HỆ THỐNG AI
            </div>
            <ul className="ba-list">
              {before.map((b, i) => (
                <li key={i}>
                  <span className="ba-dash">—</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal data-delay="80" className="ba-photo">
            <div className="ba-photo-glow" />
            <img src={ceoBeforeAfter} alt="CEO chuyển đổi cùng hệ thống AI" />
            <div className="ba-photo-tag">TRƯỚC &nbsp;→&nbsp; SAU</div>
          </div>

          <div data-reveal data-delay="120" className="ba-col ba-after">
            <div className="ba-after-glow" />
            <div className="ba-col-label ba-col-label-after">
              <span className="ba-badge ba-badge-check">✓</span>
              SAU BOSSCODE — CÓ HỆ THỐNG AI RIÊNG
            </div>
            <ul className="ba-list ba-list-after">
              {after.map((a, i) => (
                <li key={i}>
                  <span className="ba-check">✓</span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
