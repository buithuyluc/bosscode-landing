import logoVinalink from "../assets/logo-vinalink.png";
import "./Header.css";

const NAV_LINKS = [
  { href: "#daura", label: "Đầu ra" },
  { href: "#noidung", label: "Nội dung" },
  { href: "#baogia", label: "Hạng vé" },
  { href: "#dacquyen", label: "Đặc quyền VIP" },
];

export default function Header() {
  return (
    <header className="hdr">
      <div className="hdr-inner">
        <a href="#top" className="hdr-logo">
          <img src={logoVinalink} alt="Vinalink" />
          <span>ACADEMY</span>
        </a>

        <nav className="hdr-nav">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hdr-actions">
          <a href="#dangky" className="hdr-act">
            <span className="hdr-dot" />
            Đăng nhập
          </a>
          <a href="#dangky" className="hdr-cta">
            Đăng ký
          </a>
        </div>
      </div>
    </header>
  );
}
