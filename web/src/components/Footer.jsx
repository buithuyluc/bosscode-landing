import logoVinalink from "../assets/logo-vinalink.png";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <img src={logoVinalink} alt="Vinalink" className="footer-logo" />
            <p className="footer-about">
              Đào tạo &amp; tư vấn chuyển đổi số, AI và Digital Marketing cho
              doanh nghiệp Việt Nam.
            </p>
          </div>
          <div>
            <div className="eyebrow footer-label">LIÊN HỆ</div>
            <div className="footer-links">
              <a href="tel:02438212345">Hotline: 024-382.12345</a>
              <a href="mailto:info@vinalink.vn">info@vinalink.vn</a>
              <a href="tel:0353262236">Tư vấn khoá học: 0353 262 236</a>
            </div>
          </div>
          <div>
            <div className="eyebrow footer-label">ĐỊA ĐIỂM</div>
            <p className="footer-address">
              TheVuon Luxury, Tầng 3,
              <br />
              D2 Giảng Võ, Ba Đình, Hà Nội
            </p>
          </div>
        </div>
        <div className="footer-copy">
          © 2026 Vinalink Academy. Khoá học BossCode — CEO tự tay dựng App /
          AI Agent.
        </div>
      </div>
    </footer>
  );
}
