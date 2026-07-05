import { useState } from "react";
import { faqs } from "../data/content";
import "./Faq.css";

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq">
      <div className="faq-inner">
        <div data-reveal className="faq-head">
          <div className="eyebrow eyebrow-red">CÂU HỎI THƯỜNG GẶP</div>
          <h2 className="section-title section-title-navy">
            Giải đáp trước khi đăng ký
          </h2>
        </div>
        <div className="faq-list">
          {faqs.map((fq, i) => {
            const open = openIndex === i;
            return (
              <div data-reveal className="faq-item" key={fq.q}>
                <button
                  type="button"
                  className="faq-question"
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  aria-expanded={open}
                >
                  <span>{fq.q}</span>
                  <span
                    className="faq-icon"
                    style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="faq-answer-wrap"
                  style={{ maxHeight: open ? "400px" : "0px" }}
                >
                  <p className="faq-answer">{fq.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
