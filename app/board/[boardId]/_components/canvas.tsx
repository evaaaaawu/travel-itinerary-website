"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main 
      className="relative w-full h-full bg-neutral-200 touch-none"
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar />
    </main>
  )
}
