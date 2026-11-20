"use client";

import { useEffect, useState } from "react";
import { useLoadingState } from "./contexts/LoadingState";
import styles from "./loading-screen.module.css";

export default function LoadingScreen() {
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  const { completeLoading } = useLoadingState();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const hideTimer = window.setTimeout(() => {
        setVisible(false);
        completeLoading();
      }, 0);
      return () => window.clearTimeout(hideTimer);
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setLeaving(true), 3600);
    const completeTimer = window.setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = previousOverflow;
      completeLoading();
    }, 4200);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(completeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, [completeLoading]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.screen} ${leaving ? styles.leaving : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />
      <div className={styles.scan} aria-hidden="true">
        <span />
      </div>

      <span className={styles.footerRule} aria-hidden="true" />

      <div className={styles.construct}>
        <span className={styles.pulse} aria-hidden="true" />
        <span className={`${styles.side} ${styles.sideLeft}`} aria-hidden="true" />
        <span className={`${styles.side} ${styles.sideRight}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerTopLeft}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerTopRight}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBottomLeft}`} aria-hidden="true" />
        <span className={`${styles.corner} ${styles.cornerBottomRight}`} aria-hidden="true" />

        <div className={styles.nameBlock}>
          <h1 className={styles.name}>Elvis Moyo</h1>
          <p className={styles.caption}>
            <span className={styles.tick} aria-hidden="true" />
            Initializing Portfolio
            <span className={styles.tick} aria-hidden="true" />
          </p>
        </div>
      </div>
    </div>
  );
}
