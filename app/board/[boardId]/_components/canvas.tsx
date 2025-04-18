"use client";

import { useHistory, useCanUndo, useCanRedo, useMutation } from "@liveblocks/react";
import React, { useCallback, useState } from "react";

import { pointerEventToCanvasPoint } from "@/lib/utils";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";

import { CursorsPresence } from "./cursors-presence";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    });
  }, [camera, setCamera]);

  const onPointerMove = useMutation((
    { setMyPresence },
    e: React.PointerEvent
  ) => {
    e.preventDefault();
    
    const current = pointerEventToCanvasPoint(e, camera);
    
    setMyPresence({ cursor: current });
  }, []);

  const onPointerLeave = useMutation((
    { setMyPresence }
  ) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <main
      className="relative w-full h-full bg-neutral-200 touch-none"
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        undo={history.undo}
        redo={history.redo}
        canUndo={canUndo}
        canRedo={canRedo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
