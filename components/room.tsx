"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { ReactNode } from "react";

interface RoomProps {
  children: ReactNode,
  roomId: string,
  fallback: NonNullable<ReactNode> | null,
}

export const Room = ({
  children,
  roomId,
  fallback,
}: RoomProps) => {
  return (
    <LiveblocksProvider throttle={16} authEndpoint="/api/liveblocks-auth">
      <RoomProvider 
        id={roomId} 
        initialPresence={{
          cursor: null,
        }}
      >
         <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
