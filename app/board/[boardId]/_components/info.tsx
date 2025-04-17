"use client";

import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/use-rename-modal";

interface InfoProps {
  boardId: string;
}

const TabSeparator = () => {
  return (
    <div className="text-neutral-500 text-sm px-1">
      /
    </div>
  )
}

export const Info = ({ boardId }: InfoProps) => {
  const { onOpen } = useRenameModal()
  const { organization } = useOrganization();

  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  })

  if (!data) return null;

  return (
    <div className="absolute top-2 left-2 flex items-center justify-center">
      <Hint label="Back to homepage" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="text-sm font-semibold px-1">
          <Link href="/">
            {organization?.name}
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Click to rename" side="bottom" sideOffset={10}>
        <Button 
          variant="board" 
          className="text-sm font-semibold px-1"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
    </div>
  )
}
