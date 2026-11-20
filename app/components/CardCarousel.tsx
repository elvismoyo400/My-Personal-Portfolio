"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type TouchEvent,
} from "react";
import { SiGithub } from "react-icons/si";
import { projects } from "../data/projects";
import type { Project } from "../data/projects";
import styles from "./CardCarousel.module.css";

const AUTOPLAY_DELAY = 3800;
const MANUAL_PAUSE_DELAY = 3800;
const SWIPE_THRESHOLD = 48;

function getRelativeOffset(index: number, activeIndex: number, count: number) {
  const forwardOffset = (index - activeIndex + count) % count;
  return forwardOffset > count / 2 ? forwardOffset - count : forwardOffset;
}

function getCardPosition(offset: number, spread: number) {
  const distance = Math.abs(offset);

  return {
    x: offset * spread,
    y: distance === 0 ? 0 : distance * 10,
    scale: distance === 0 ? 1 : distance === 1 ? 0.84 : 0.7,
    rotateY: offset === 0 ? 0 : offset < 0 ? 18 : -18,
    opacity: distance === 0 ? 1 : distance === 1 ? 0.68 : 0.28,
    filter:
      distance === 0
        ? "brightness(1) saturate(1)"
        : `brightness(${distance === 1 ? 0.68 : 0.4}) saturate(0.75)`,
  };
}

function ProjectCard({
  project,
  index,
  count,
  activeIndex,
  spread,
  reduceMotion,
}: {
  project: Project;
  index: number;
  count: number;
  activeIndex: number;
  spread: number;
  reduceMotion: boolean;
}) {
  const offset = getRelativeOffset(index, activeIndex, count);
  const isActive = offset === 0;
  const position = getCardPosition(offset, spread);

  return (
    <motion.article
      aria-hidden={!isActive}
      aria-label={`${project.name}${isActive ? ", current project" : ""}`}
      className={`${styles.card} ${isActive ? styles.activeCard : styles.inactiveCard}`}
      inert={!isActive}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.84, y: 28 }}
      animate={position}
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 260,
              damping: 28,
              mass: 0.85,
              delay: Math.abs(offset) * 0.035,
            }
      }
      whileHover={
        isActive && !reduceMotion
          ? {
              scale: 1.025,
              y: -7,
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }
          : undefined
      }
      style={{
        pointerEvents: isActive ? "auto" : "none",
        zIndex: count - Math.abs(offset),
      }}
    >
      <div className={styles.media}>
        {project.previewImage?.startsWith("[ADD:") ? (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span className={styles.screenshotPlaceholder}>{project.previewImage}</span>
          </div>
        ) : project.previewImage ? (
          project.liveDemo ? (
            <a
              aria-label={`Open ${project.name} project`}
              className={styles.mediaLink}
              href={project.liveDemo}
              rel="noopener noreferrer"
              tabIndex={isActive ? undefined : -1}
              target="_blank"
            >
              <Image
                alt={`Preview of ${project.name}`}
                className={styles.image}
                fill
                priority={index === activeIndex}
                sizes="(max-width: 760px) 86vw, 430px"
                src={project.previewImage}
              />
            </a>
          ) : (
            <Image
              alt={`Preview of ${project.name}`}
              className={styles.image}
              fill
              priority={index === activeIndex}
              sizes="(max-width: 760px) 86vw, 430px"
              src={project.previewImage}
            />
          )
        ) : (
          <div className={styles.imagePlaceholder} aria-hidden="true">
            <span>{project.number}</span>
          </div>
        )}
        <div className={styles.mediaShade} aria-hidden="true" />
        <span className={styles.projectNumber}>PROJECT {project.number}</span>
      </div>

      <div className={styles.content}>
        <p className={styles.category}>{project.kind}</p>
        <h3 className={styles.title}>{project.name}</h3>
        <dl className={styles.details}>
          <div>
            <dt>Problem</dt>
            <dd>{project.problem}</dd>
          </div>
          <div>
            <dt>My role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.join(", ")}</dd>
          </div>
          <div>
            <dt>Highlights</dt>
            <dd>
              <ul>
                {project.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div>
            <dt>Result</dt>
            <dd>{project.result}</dd>
          </div>
        </dl>
        <div className={styles.actions}>
          {project.liveDemo?.startsWith("[ADD:") ? (
            <span className={styles.placeholderAction}>View project — {project.liveDemo}</span>
          ) : project.liveDemo ? (
            <a
              className={styles.primaryAction}
              href={project.liveDemo}
              rel="noopener noreferrer"
              tabIndex={isActive ? undefined : -1}
              target="_blank"
            >
              View project
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4 12 12 4M5 4h7v7" />
              </svg>
            </a>
          ) : null}
          {project.github?.startsWith("[ADD:") ? (
            <span className={styles.placeholderAction}>GitHub — {project.github}</span>
          ) : project.github ? (
            <a
              aria-label={`View ${project.name} source code on GitHub`}
              className={styles.secondaryAction}
              href={project.github}
              rel="noopener noreferrer"
              tabIndex={isActive ? undefined : -1}
              target="_blank"
            >
              <SiGithub aria-hidden="true" focusable="false" />
              <span>GitHub</span>
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}

export default function CardCarousel() {
  const reduceMotionPreference = useReducedMotion();
  const reduceMotion = reduceMotionPreference ?? false;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteractionPaused, setIsInteractionPaused] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const interactionPauseTimer = useRef<number | null>(null);
  const projectCount = projects.length;

  const pauseAfterInteraction = useCallback(() => {
    setIsInteractionPaused(true);

    if (interactionPauseTimer.current !== null) {
      window.clearTimeout(interactionPauseTimer.current);
    }

    interactionPauseTimer.current = window.setTimeout(() => {
      interactionPauseTimer.current = null;
      setIsInteractionPaused(false);
    }, MANUAL_PAUSE_DELAY);
  }, []);

  const moveBy = useCallback(
    (direction: -1 | 1) => {
      setActiveIndex((current) => (current + direction + projectCount) % projectCount);
      pauseAfterInteraction();
    },
    [pauseAfterInteraction, projectCount],
  );

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + projectCount) % projectCount);
      pauseAfterInteraction();
    },
    [pauseAfterInteraction, projectCount],
  );

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const observer = new ResizeObserver(() => {
      setStageWidth(stage.clientWidth);
    });

    setStageWidth(stage.clientWidth);
    observer.observe(stage);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (
      reduceMotion ||
      isHovered ||
      isInteractionPaused ||
      projectCount < 2
    ) {
      return;
    }

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % projectCount);
    }, AUTOPLAY_DELAY);

    return () => window.clearInterval(interval);
  }, [isHovered, isInteractionPaused, projectCount, reduceMotion]);

  useEffect(
    () => () => {
      if (interactionPauseTimer.current !== null) {
        window.clearTimeout(interactionPauseTimer.current);
      }
    },
    [],
  );

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveBy(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveBy(1);
    }
  }

  function handleTouchStart(event: TouchEvent<HTMLDivElement>) {
    touchStartX.current = event.touches[0]?.clientX ?? null;
    pauseAfterInteraction();
  }

  function handleTouchEnd(event: TouchEvent<HTMLDivElement>) {
    const startX = touchStartX.current;
    const endX = event.changedTouches[0]?.clientX;
    touchStartX.current = null;

    if (startX === null || endX === undefined) return;

    const distance = endX - startX;

    if (Math.abs(distance) < SWIPE_THRESHOLD) return;

    event.preventDefault();
    moveBy(distance < 0 ? 1 : -1);
  }

  if (projectCount === 0) return null;

  const spread = Math.max(120, Math.min(230, stageWidth * 0.21));

  return (
    <motion.div
      aria-label="Featured projects"
      aria-roledescription="carousel"
      className={styles.carousel}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      onKeyDown={handleKeyDown}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setIsHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setIsHovered(false);
      }}
      role="region"
      tabIndex={0}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
      }
      viewport={{ once: true, amount: 0.16 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      <div
        className={styles.stage}
        onTouchEnd={handleTouchEnd}
        onTouchStart={handleTouchStart}
        ref={stageRef}
      >
        {projects.map((project, index) => (
          <ProjectCard
            activeIndex={activeIndex}
            count={projectCount}
            index={index}
            key={project.number}
            project={project}
            reduceMotion={reduceMotion}
            spread={spread}
          />
        ))}
      </div>

      <div className={styles.controls} role="group" aria-label="Carousel controls">
        <button
          aria-label="Previous project"
          className={styles.arrow}
          onClick={() => moveBy(-1)}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <div className={styles.pagination} role="group" aria-label="Choose a project">
          {projects.map((project, index) => (
            <button
              aria-label={`Show ${project.name}`}
              aria-pressed={index === activeIndex}
              className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
              key={project.number}
              onClick={() => goTo(index)}
              type="button"
            />
          ))}
        </div>

        <button
          aria-label="Next project"
          className={styles.arrow}
          onClick={() => moveBy(1)}
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      <p className={styles.status} aria-live="polite" aria-atomic="true">
        {`Project ${activeIndex + 1} of ${projectCount}: ${projects[activeIndex]?.name}`}
      </p>
    </motion.div>
  );
}
