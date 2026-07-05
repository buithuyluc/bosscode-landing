import { useEffect } from "react";

/**
 * Scroll-reveal: fades/slides in every [data-reveal] element already in the
 * DOM the first time it enters the viewport. Mirrors the original prototype's
 * IntersectionObserver behavior, including its data-delay stagger and the
 * fallback that force-reveals everything after 3.5s (in case the observer
 * never fires, e.g. very short pages).
 */
export function useReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    const reveal = (el) => {
      const delay = parseFloat(el.getAttribute("data-delay") || "0");
      setTimeout(() => el.classList.add("is-visible"), delay);
    };
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const fallback = setTimeout(() => {
      els.forEach((el) => el.classList.add("is-visible"));
    }, 3500);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
