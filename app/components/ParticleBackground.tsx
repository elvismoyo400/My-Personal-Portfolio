"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const ParticleField = dynamic(() => import("./ParticleField"), {
  ssr: false,
  loading: () => null,
});

export default function ParticleBackground() {
  useEffect(() => {
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      return;
    }

    const targets = document.querySelectorAll<HTMLElement>(
      ".hero h1, main h2, main p, .timeline-item, .experience-card, .skill-card, .contact-form-panel, .contact-info-panel",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    targets.forEach((target) => {
      target.classList.add("motion-reveal");
      if (target.matches("h2, .section-kicker")) {
        target.classList.add("reveal-heading");
      } else if (target.matches("p")) {
        target.classList.add("reveal-paragraph");
      }
      observer.observe(target);
    });
    document.documentElement.classList.add("motion-ready");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("motion-ready");
    };
  }, []);

  return (
    <div className="particle-background" aria-hidden="true">
      <ParticleField />
    </div>
  );
}
