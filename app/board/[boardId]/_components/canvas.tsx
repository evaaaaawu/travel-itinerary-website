"use client";

import { useSelf } from "@liveblocks/react";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const info = useSelf((me) => me.info);

  console.log(info);

  return (
    <main 
      className="relative w-full h-full bg-neutral-200 touch-none"
    >
      <Info />
      <Participants />
      <Toolbar />
    </main>
  )
}
