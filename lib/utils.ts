import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Camera } from "@/types/canvas";

const COLORS = [
  "#ff7466",
  "#ffb132",
  "#5ea393",
  "#2897ff",
  "#7C3AED",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export function connectionIdToColor(connectionId: number): string {
  return COLORS[connectionId % COLORS.length]
};

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
) {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};
