"use client";

import { LiveObject } from "@liveblocks/client";
import { useHistory, useCanUndo, useCanRedo, useMutation, useStorage } from "@liveblocks/react";
import { nanoid } from "nanoid";
import React, { useCallback, useState } from "react";

import { pointerEventToCanvasPoint } from "@/lib/utils";
import { Camera, CanvasMode, CanvasState, Color, LayerType, Point } from "@/types/canvas";

import { CursorsPresence } from "./cursors-presence";
import { Info } from "./info";
import { LayerPreview } from "./layer-preview";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";


const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

export const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const insertLayer = useMutation((
    { storage, setMyPresence },
    layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Text | LayerType.Note,
    position: Point,
  ) => {
    const liveLayers = storage.get("layers");
    if (liveLayers.size >= MAX_LAYERS) {
      return;
    }

    const liveLayerIds = storage.get("layerIds");
    const layerId = nanoid();
    const layer = new LiveObject({
      type: layerType,
      x: position.x,
      y: position.y,
      width: 100,
      height: 100,
      fill: lastUsedColor,
    })
    
    liveLayerIds.push(layerId);
    liveLayers.set(layerId, layer);
    
    setMyPresence({ selection: [layerId] }, { addToHistory: true});
    setCanvasState({ mode: CanvasMode.None });
  }, [lastUsedColor]);

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

  const onPointerUp = useMutation((
    {},
    e
  ) => {
    const point = pointerEventToCanvasPoint(e, camera);

    if (canvasState.mode === CanvasMode.Inserting) {
      insertLayer(canvasState.layerType, point);
    } else {
      setCanvasState({ 
        mode: CanvasMode.None,
      });
    }
    
    history.resume();
  }, [
    camera,
    canvasState,
    history,
    insertLayer,
  ]);

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
        onPointerUp={onPointerUp}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor="#000"
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
