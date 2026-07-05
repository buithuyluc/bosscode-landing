import instructorPhoto from "../assets/instructor.png";
import { instructor } from "../data/content";
import "./Instructor.css";

export default function Instructor() {
  return (
    <section className="inst">
      <div className="inst-grid">
        <div data-reveal className="inst-photo">
          <img src={instructorPhoto} alt="Mr. Tuấn Hà — Chủ tịch Vinalink" />
          <div className="inst-photo-bar" />
        </div>
        <div data-reveal data-delay="120">
          <div className="eyebrow eyebrow-red">GIẢNG VIÊN</div>
          <h2 className="inst-name">Mr. Tuấn Hà</h2>
          <p className="inst-role">
            Chủ tịch Vinalink · TheVuon · Cố vấn Shark Tank Việt Nam
          </p>
          <div className="inst-callout">
            <div className="inst-callout-title">
              Chủ tịch đồng hành cùng Chủ tịch
            </div>
            <p>
              Người hiểu bài toán kinh doanh và nỗi đau quản lý hơn hết mọi
              IT, lập trình viên.
            </p>
          </div>
          <p className="inst-desc">
            Gần <strong>3 thập kỷ</strong> đi đầu trong Digital Marketing, AI
            và chuyển đổi số doanh nghiệp.
          </p>
          <ul className="inst-list">
            {instructor.map((it, i) => (
              <li key={i}>
                <span>▹</span>
                <span>{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
