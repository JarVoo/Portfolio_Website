"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";

interface MarkerDef {
  location: [number, number];
  size: number;
  name?: string;
}

interface GlobeProps {
  className?: string;
  size?: number;
  markers?: MarkerDef[];
}

export const TRAVEL_MARKERS: MarkerDef[] = [
  { location: [10.82,  106.63], size: 0.06, name: "Ho Chi Minh City, Vietnam" },
  { location: [39.57,    2.65], size: 0.06, name: "Mallorca, Spain"           },
  { location: [-33.92,  18.42], size: 0.06, name: "Cape Town, South Africa"   },
  { location: [-41.29, 174.78], size: 0.06, name: "Wellington, New Zealand"   },
  { location: [-71.67,  -2.85], size: 0.06, name: "SANAE IV, Antarctica"      },
  { location: [ 36.14,  -5.35], size: 0.06, name: "Gibraltar"                 },
];

export function Globe({ className, size = 500, markers = TRAVEL_MARKERS }: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phiRef = useRef(0);
  const dragging = useRef(false);
  const hovering = useRef(false);
  const lastX = useRef(0);
  const dragDelta = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: size * 2,
      height: size * 2,
      phi: 0,
      theta: -0.2,
      dark: 0,
      diffuse: 2,
      mapSamples: 24000,
      mapBrightness: 4,
      baseColor: [0.72, 0.82, 0.95],
      markerColor: [0.18, 0.52, 0.9],
      glowColor: [0.85, 0.9, 1],
      markers,
      onRender: (state) => {
        if (!dragging.current && !hovering.current) {
          phiRef.current += 0.003;
        }
        state.phi = phiRef.current + dragDelta.current;
      },
    });

    return () => globe.destroy();
  }, [size, markers]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("cursor-grab active:cursor-grabbing", className)}
      style={{ width: size, height: size }}
      onMouseEnter={() => { hovering.current = true; }}
      onMouseLeave={() => {
        hovering.current = false;
        if (dragging.current) {
          dragging.current = false;
          phiRef.current += dragDelta.current;
          dragDelta.current = 0;
        }
      }}
      onMouseDown={(e) => {
        dragging.current = true;
        lastX.current = e.clientX;
        dragDelta.current = 0;
      }}
      onMouseMove={(e) => {
        if (!dragging.current) return;
        dragDelta.current += (e.clientX - lastX.current) * 0.005;
        lastX.current = e.clientX;
      }}
      onMouseUp={() => {
        dragging.current = false;
        phiRef.current += dragDelta.current;
        dragDelta.current = 0;
      }}
    />
  );
}
