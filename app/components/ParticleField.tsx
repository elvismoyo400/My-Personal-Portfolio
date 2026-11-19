"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { BufferAttribute, Color, Group, MathUtils } from "three";

type Formations = [Float32Array, Float32Array, Float32Array, Float32Array];

function createFormations(count: number): Formations {
  const sphere = new Float32Array(count * 3);
  const helix = new Float32Array(count * 3);
  const grid = new Float32Array(count * 3);
  const torus = new Float32Array(count * 3);
  const side = Math.ceil(Math.cbrt(count));
  const step = 6 / side;

  for (let i = 0; i < count; i += 1) {
    const offset = i * 3;
    const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    sphere[offset] = 3.2 * Math.cos(theta) * Math.sin(phi);
    sphere[offset + 1] = 3.2 * Math.sin(theta) * Math.sin(phi);
    sphere[offset + 2] = 3.2 * Math.cos(phi);

    const progress = i / count;
    const angle = progress * Math.PI * 16;
    helix[offset] = 2.5 * Math.cos(angle);
    helix[offset + 1] = (progress - 0.5) * 8;
    helix[offset + 2] = 2.5 * Math.sin(angle);

    grid[offset] = (i % side) * step - 3;
    grid[offset + 1] = (Math.floor(i / side) % side) * step - 3;
    grid[offset + 2] = Math.floor(i / (side * side)) * step - 3;

    const u = i * 2.399963229728653;
    const v = phi;
    const majorRadius = 2.8;
    const minorRadius = 1.1;
    torus[offset] =
      (majorRadius + minorRadius * Math.cos(v)) * Math.cos(u);
    torus[offset + 1] =
      (majorRadius + minorRadius * Math.cos(v)) * Math.sin(u);
    torus[offset + 2] = minorRadius * Math.sin(v);
  }

  return [sphere, helix, grid, torus];
}

function createParticleColors(count: number): Float32Array {
  const colors = new Float32Array(count * 3);
  const accent = new Color("#d4ff4f");
  const foreground = new Color("#f5f5f2");
  const color = new Color();

  for (let i = 0; i < count; i += 1) {
    color.copy(accent).lerp(foreground, (i / count) * 0.2);
    color.toArray(colors, i * 3);
  }

  return colors;
}

function smoothstep(value: number): number {
  return value * value * (3 - 2 * value);
}

function updatePositions(
  positions: Float32Array,
  start: Float32Array,
  end: Float32Array,
  blend: number,
): void {
  for (let i = 0; i < positions.length; i += 1) {
    positions[i] = start[i] + (end[i] - start[i]) * blend;
  }
}

function ParticleScene() {
  const { size } = useThree();
  const count = size.width < 768 ? 320 : 680;

  return <ParticleSystem key={count} count={count} />;
}

function ParticleSystem({ count }: { count: number }) {
  const groupRef = useRef<Group>(null);
  const positionAttribute = useRef<BufferAttribute>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const scrollProgress = useRef(0);
  const reducedMotion = useRef(false);
  const elapsed = useRef(0);
  const { invalidate, viewport } = useThree();

  const formations = useMemo(() => createFormations(count), [count]);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const particleColors = useMemo(() => createParticleColors(count), [count]);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    reducedMotion.current = motionPreference.matches;

    const updatePointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = 1 - (event.clientY / window.innerHeight) * 2;
      invalidate();
    };
    const resetPointer = () => {
      pointer.current.x = 0;
      pointer.current.y = 0;
      invalidate();
    };
    const updateScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current =
        maxScroll > 0
          ? MathUtils.clamp(window.scrollY / maxScroll, 0, 1)
          : 0;
      invalidate();
    };
    const updateMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion.current = event.matches;
      invalidate();
    };
    const updateVisibility = () => {
      if (!document.hidden) invalidate();
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("blur", resetPointer);
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    motionPreference.addEventListener("change", updateMotionPreference);
    updateScroll();

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("blur", resetPointer);
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("visibilitychange", updateVisibility);
      motionPreference.removeEventListener("change", updateMotionPreference);
    };
  }, [invalidate]);

  useFrame((state, delta) => {
    if (document.hidden) return;

    const isReducedMotion = reducedMotion.current;
    if (!isReducedMotion) {
      elapsed.current += delta;
    }

    const stageProgress = scrollProgress.current * 3;
    const stage = Math.min(Math.floor(stageProgress), 2);
    const blend = smoothstep(stageProgress - stage);
    const start = formations[stage];
    const end = formations[stage + 1];
    const positionBuffer = positionAttribute.current;

    if (
      !positionBuffer ||
      !(positionBuffer.array instanceof Float32Array)
    ) return;
    const particlePositions = positionBuffer.array;
    updatePositions(particlePositions, start, end, blend);
    positionBuffer.needsUpdate = true;

    if (groupRef.current) {
      const cursorX = isReducedMotion ? 0 : pointer.current.x;
      const cursorY = isReducedMotion ? 0 : pointer.current.y;
      const time = isReducedMotion ? 0 : elapsed.current;
      groupRef.current.position.x = Math.min(viewport.width * 0.15, 2.1);
      groupRef.current.rotation.y = MathUtils.damp(
        groupRef.current.rotation.y,
        time * 0.045 + cursorX * 0.12,
        2.5,
        delta,
      );
      groupRef.current.rotation.x = MathUtils.damp(
        groupRef.current.rotation.x,
        cursorY * 0.08 +
          scrollProgress.current * 0.32 +
          Math.sin(time * 0.24) * 0.025,
        2.5,
        delta,
      );
    }

    if (!isReducedMotion) state.invalidate();
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            ref={positionAttribute}
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          sizeAttenuation
          transparent
          opacity={0.82}
          depthWrite={false}
          vertexColors
        />
      </points>
    </group>
  );
}

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 12], fov: 40 }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
    >
      <ParticleScene />
    </Canvas>
  );
}
