import "./FloatingActions.css";

export default function FloatingActions() {
  return (
    <div className="fab-stack">
      <a href="tel:0353262236" className="fab fab-call">
        <span className="fab-call-dot" />
        Gọi điện
      </a>
      <a
        href="https://zalo.me/0353262236"
        target="_blank"
        rel="noopener"
        className="fab fab-zalo"
      >
        Nhắn Zalo
      </a>
      <a
        href="https://zalo.me/g/i628ekksahnd7uck3es5"
        target="_blank"
        rel="noopener"
        className="fab fab-group"
      >
        Nhóm Zalo lớp
      </a>
      <a href="#dangky" className="fab fab-register">
        Đăng ký ngay
      </a>
    </div>
  );
}
