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
    <LiveblocksProvider publicApiKey={"pk_dev_EwWNwAGTp_lc7C8DdR1RfOGtdipu2jErfky_z4xl2MXNr_mJP96b8MjTtGjnCln3"}>
      <RoomProvider id={roomId} initialPresence={{}}>
         <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
