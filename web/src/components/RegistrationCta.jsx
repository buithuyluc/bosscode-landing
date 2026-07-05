import { useState } from "react";
import { positions } from "../data/content";
import { submitRegistration, sendRegistrationEmail } from "../lib/registrations";
import { useTicketCountsContext } from "../context/TicketCountsContext";
import AiNetworkCanvas from "./AiNetworkCanvas";
import "./RegistrationCta.css";

const PACKAGE_OPTIONS = [
  { value: "Gold", label: "Gói Gold — 10.800.000đ" },
  { value: "Silver", label: "Gói Silver — 5.400.000đ" },
  { value: "Super VIP", label: "Gói Super VIP — 21.600.000đ" },
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  position: "CEO",
  positionOther: "",
  packageName: "Gold",
};

export default function RegistrationCta() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const { refresh } = useTicketCountsContext();

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");
    try {
      const registration = await submitRegistration({
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        position: form.position === "Khác" ? form.positionOther : form.position,
        packageName: form.packageName,
      });
      setStatus("success");
      refresh();
      sendRegistrationEmail(registration.id);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err?.message ||
          "Đăng ký không thành công. Vui lòng thử lại hoặc liên hệ hotline."
      );
    }
  };

  return (
    <section id="dangky" className="reg">
      <AiNetworkCanvas />
      <div className="reg-glow" />
      <div className="reg-grid">
        <div data-reveal>
          <div className="eyebrow eyebrow-pink">GIỮ CHỖ NGAY HÔM NAY</div>
          <h2 className="reg-title">Mang về một hệ thống AI của riêng bạn.</h2>
          <p className="reg-desc">
            Số lượng vé giới hạn cho mỗi khoá. Điền form để đội ngũ Vinalink
            liên hệ xác nhận &amp; tư vấn hạng vé phù hợp.
          </p>
          <div className="reg-links">
            <a
              href="https://zalo.me/0353262236"
              target="_blank"
              rel="noopener"
              className="reg-link-zalo"
            >
              Zalo tư vấn
            </a>
            <a
              href="https://zalo.me/g/i628ekksahnd7uck3es5"
              target="_blank"
              rel="noopener"
              className="reg-link-group"
            >
              Nhóm Zalo khai giảng
            </a>
          </div>
        </div>

        <div data-reveal data-delay="120" className="reg-card">
          {status === "success" ? (
            <div className="reg-success">
              <div className="reg-success-icon">✓</div>
              <h3>Đã nhận đăng ký!</h3>
              <p>
                Đội ngũ Vinalink sẽ liên hệ với bạn trong thời gian sớm nhất để
                xác nhận vé.
              </p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="reg-form">
              <div className="reg-form-title">Đăng ký giữ chỗ</div>

              <div className="reg-field">
                <label>Họ và tên</label>
                <input
                  required
                  placeholder="Nguyễn Văn A"
                  value={form.fullName}
                  onChange={update("fullName")}
                />
              </div>

              <div className="reg-row">
                <div className="reg-field">
                  <label>Email</label>
                  <input
                    required
                    type="email"
                    placeholder="ceo@congty.vn"
                    value={form.email}
                    onChange={update("email")}
                  />
                </div>
                <div className="reg-field">
                  <label>Số điện thoại</label>
                  <input
                    required
                    type="tel"
                    placeholder="09xx xxx xxx"
                    value={form.phone}
                    onChange={update("phone")}
                  />
                </div>
              </div>

              <div className="reg-field">
                <label>Chức vụ</label>
                <select value={form.position} onChange={update("position")}>
                  {positions.map((p) => (
                    <option key={p} value={p}>
                      {p === "Khác" ? "Khác (vui lòng nêu rõ)" : p}
                    </option>
                  ))}
                </select>
              </div>

              {form.position === "Khác" && (
                <div className="reg-field">
                  <input
                    required
                    placeholder="Nêu rõ chức vụ của bạn"
                    value={form.positionOther}
                    onChange={update("positionOther")}
                  />
                </div>
              )}

              <div className="reg-field">
                <label>Gói đăng ký</label>
                <select value={form.packageName} onChange={update("packageName")}>
                  {PACKAGE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>

              {status === "error" && (
                <p className="reg-error" role="alert">
                  {errorMessage}
                </p>
              )}

              <button type="submit" className="reg-submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Đang gửi…" : "Xác nhận giữ chỗ →"}
              </button>
              <p className="reg-privacy">
                Thông tin của bạn được bảo mật theo chính sách của Vinalink.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
