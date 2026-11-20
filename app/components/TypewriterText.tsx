"use client";

import { useEffect, useRef, useState } from "react";
import { useLoadingState } from "../contexts/LoadingState";
import styles from "./TypewriterText.module.css";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export interface TypewriterSegment {
  text: string;
  className: string;
}

interface TypewriterTextProps {
  text?: string;
  segments?: TypewriterSegment[];
  separator?: string;
  speed?: number;
  delay?: number;
  as?: HeadingTag;
  className?: string;
  id?: string;
  accentText?: string;
}

function renderSegments(
  segments: TypewriterSegment[],
  separator: string,
  visibleCount: number,
) {
  let offset = 0;
  const children = segments.map((segment, index) => {
    const parts = [];

    if (index > 0) {
      const separatorCharacters = Array.from(separator);
      parts.push(
        separatorCharacters.slice(0, Math.max(0, visibleCount - offset)).join(""),
      );
      offset += separatorCharacters.length;
    }

    const segmentCharacters = Array.from(segment.text);
    const visibleText = segmentCharacters
      .slice(0, Math.max(0, visibleCount - offset))
      .join("");
    offset += segmentCharacters.length;
    parts.push(
      <span aria-hidden="true" className={segment.className} key={segment.text}>
        {visibleText}
      </span>,
    );
    return parts;
  });

  return children.flat();
}

function renderAccentedText(
  visibleText: string,
  text: string,
  accentText: string | undefined,
) {
  const accentStart = accentText ? text.indexOf(accentText) : -1;
  if (accentStart < 0 || !accentText) return visibleText;

  const accentEnd = accentStart + accentText.length;
  return (
    <>
      {visibleText.slice(0, accentStart)}
      <span className="typewriter-accent">
        {visibleText.slice(accentStart, accentEnd)}
      </span>
      {visibleText.slice(accentEnd)}
    </>
  );
}

function renderText(
  text: string,
  visibleCount: number,
  accentText: string | undefined,
  isHero: boolean,
) {
  const visibleText = Array.from(text).slice(0, visibleCount).join("");

  if (!isHero) {
    return renderAccentedText(visibleText, text, accentText);
  }

  return visibleText.split(/(\s+)/).map((word, index) =>
    /^\s+$/.test(word) ? (
      word
    ) : (
      <span
        aria-hidden="true"
        className={`hero-word${accentText?.startsWith(word) ? " accent" : ""}`}
        key={`${word}-${index}`}
      >
        {word}
      </span>
    ),
  );
}

export default function TypewriterText({
  text,
  speed = 45,
  delay = 0,
  as: Tag = "h2",
  className,
  id,
  accentText,
  segments,
  separator = " ",
}: TypewriterTextProps) {
  const textContent =
    segments?.map((segment) => segment.text).join(separator) ?? text ?? "";
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasStartedRef = useRef(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const { hasCompleted } = useLoadingState();

  useEffect(() => {
    const heading = headingRef.current;
    if (
      !heading ||
      !hasCompleted ||
      textContent.length === 0 ||
      window.matchMedia(reducedMotionQuery).matches ||
      hasStartedRef.current
    ) {
      return;
    }

    let delayTimer: number | undefined;
    let intervalTimer: number | undefined;
    let cursorTimer: number | undefined;

    const startTyping = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      delayTimer = window.setTimeout(() => {
        setIsTyping(true);
        let typedCount = 0;
        intervalTimer = window.setInterval(() => {
          typedCount = Math.min(typedCount + 1, textContent.length);
          setVisibleCount(typedCount);

          if (typedCount === textContent.length) {
            if (intervalTimer !== undefined) {
              window.clearInterval(intervalTimer);
            }
            cursorTimer = window.setTimeout(() => setIsTyping(false), 450);
          }
        }, Math.max(1, speed));
      }, Math.max(0, delay));
    };

    if (!("IntersectionObserver" in window)) {
      startTyping();
      return () => {
        if (delayTimer !== undefined) window.clearTimeout(delayTimer);
        if (intervalTimer !== undefined) window.clearInterval(intervalTimer);
        if (cursorTimer !== undefined) window.clearTimeout(cursorTimer);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          observer.disconnect();
          startTyping();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(heading);

    return () => {
      observer.disconnect();
      if (delayTimer !== undefined) window.clearTimeout(delayTimer);
      if (intervalTimer !== undefined) window.clearInterval(intervalTimer);
      if (cursorTimer !== undefined) window.clearTimeout(cursorTimer);
    };
  }, [delay, hasCompleted, speed, textContent]);

  const renderHeading = (count: number) =>
    segments
      ? renderSegments(segments, separator, count)
      : renderText(textContent, count, accentText, Tag === "h1");
  const renderedText = renderHeading(visibleCount);
  const headingClassName = [
    styles.heading,
    Tag === "h1" ? styles.heroHeading : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag
      aria-label={textContent}
      className={headingClassName}
      id={id}
      ref={headingRef}
    >
      <span aria-hidden="true" className={styles.reserve}>
        {renderHeading(textContent.length)}
      </span>
      <span aria-hidden="true" className={`${styles.visual} ${isTyping ? styles.cursor : ""}`}>
        {renderedText}
      </span>
    </Tag>
  );
}
