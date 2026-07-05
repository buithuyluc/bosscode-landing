import { useState } from "react";
import { agenda } from "../data/content";
import "./AgendaAppendix.css";

export default function AgendaAppendix() {
  const [open, setOpen] = useState(false);

  return (
    <section className="agenda">
      <div className="agenda-inner">
        <button
          type="button"
          className="agenda-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
        >
          <div className="agenda-toggle-text">
            <div className="eyebrow eyebrow-red">PHỤ LỤC</div>
            <div className="agenda-toggle-title">Agenda chi tiết · 28/07/2026</div>
          </div>
          <span
            className="agenda-toggle-icon"
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            +
          </span>
        </button>
        <div
          className="agenda-body-wrap"
          style={{ maxHeight: open ? "1400px" : "0px" }}
        >
          <div className="agenda-body">
            {agenda.map((row, i) => (
              <div
                className="agenda-row"
                key={i}
                style={{ background: row.zebra ? "#ffffff" : "#f5f6fb" }}
              >
                <div
                  className="agenda-time"
                  style={{ background: row.brk ? "#aeb4c2" : "var(--navy)" }}
                >
                  {row.time}
                </div>
                <div
                  className="agenda-content"
                  style={{
                    color: row.brk ? "#8288a0" : "#2a2f3a",
                    fontWeight: row.brk ? 400 : 500,
                  }}
                >
                  {row.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
