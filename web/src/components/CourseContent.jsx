import { buois } from "../data/content";
import "./CourseContent.css";

export default function CourseContent() {
  return (
    <section id="noidung" className="course">
      <div className="course-dots" />
      <div className="course-inner">
        <div data-reveal className="course-head">
          <div className="eyebrow eyebrow-pink">NỘI DUNG KHÓA HỌC</div>
          <h2 className="section-title section-title-white course-title">
            Hai buổi - Một hệ thống chạy thật.
          </h2>
          <p className="course-sub">
            Chỉ cần có ý tưởng — <strong>AI làm thay bạn 100%</strong>.
          </p>
        </div>

        <div className="buoi-grid">
          {buois.map((b) => (
            <div data-reveal className="buoi-card" key={b.no}>
              <div className="buoi-header">
                <div className="buoi-no">{b.no}</div>
                <div className="buoi-title-text">{b.title}</div>
              </div>
              <div className="buoi-goal">
                <div className="eyebrow buoi-goal-label">MỤC TIÊU</div>
                <p>{b.muctieu}</p>
              </div>
              <ul className="buoi-highlights">
                {b.highlights.map((h, i) => (
                  <li key={i}>
                    <span>▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="buoi-output">
                <div className="buoi-output-label">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  <span>ĐẦU RA</span>
                </div>
                <p>{b.dauRa}</p>
              </div>
            </div>
          ))}
        </div>

        <div data-reveal className="sau1ngay">
          <div className="sau1ngay-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 2 3 14h7l-1 8 10-12h-7z" />
            </svg>
          </div>
          <div>
            <div className="sau1ngay-label">SAU 1 NGÀY</div>
            <p className="sau1ngay-text">
              CEO / Chủ tịch có ngay{" "}
              <strong>1 hệ thống AI chạy được</strong>: CRM Sales, CRM
              Marketing, Trang bán hàng tự động hoặc Agent quản lý, CSKH,…
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
