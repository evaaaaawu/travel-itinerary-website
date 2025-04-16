"use client";

import { useOrganization } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { Poppins } from "next/font/google";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/ui/hint";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";

interface InfoProps {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return (
    <div className="text-neutral-300 px-1.5">
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

  if (!data) return <InfoSkeleton />

  return (
    <div className="absolute bg-white rounded-md top-2 left-2 px-1.5 h-12 flex items-center justify-center shadow-md">
      <Hint label="Back to homepage" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <span className={cn(
              "text-sm text-black",
              font.className,
            )}>
              {organization?.name}
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Click to rename" side="bottom" sideOffset={10}>
        <Button 
          variant="board" 
          className="text-base font-normal px-2"
          onClick={() => onOpen(data._id, data.title)}
        >
          {data.title}
        </Button>
      </Hint>
    </div>
  )
}

export const InfoSkeleton = () => {
  return (
    <div className="absolute bg-white rounded-md top-2 left-2 px-1.5 h-12 flex items-center shadow-md w-[150px]" />
  )
}
