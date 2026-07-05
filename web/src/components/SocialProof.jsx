import caseBaocao from "../assets/case-baocao.png";
import caseBanhang from "../assets/case-banhang.png";
import caseCrm from "../assets/case-crm.png";
import { caseStudies, clients } from "../data/content";
import "./SocialProof.css";

const IMAGES = {
  "case-baocao": caseBaocao,
  "case-banhang": caseBanhang,
  "case-crm": caseCrm,
};

export default function SocialProof() {
  return (
    <section className="social">
      <div className="social-inner">
        <div data-reveal className="social-head">
          <div className="eyebrow eyebrow-red">BẰNG CHỨNG THỰC TẾ</div>
          <h2 className="section-title section-title-navy">
            Những hệ thống đang chạy do AI xây dựng
          </h2>
          <p className="social-sub">
            CEO / Chủ tịch tự tạo, không cần biết Code — các hệ thống thật đã
            đưa vào vận hành.
          </p>
        </div>

        <div className="social-grid">
          {caseStudies.map((cs) => (
            <div data-reveal className="case-card" key={cs.label}>
              <div className="case-card-img">
                <img src={IMAGES[cs.img]} alt={cs.label} />
              </div>
              <div className="case-card-body">
                <div>{cs.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="clients">
          <div className="eyebrow eyebrow-grey">
            ĐÃ ĐÀO TẠO CHUYỂN ĐỔI SỐ CHO ĐỘI NGŨ TẠI
          </div>
          <div className="clients-row">
            {clients.map((cl) => (
              <div className="client-name" key={cl}>
                {cl}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
