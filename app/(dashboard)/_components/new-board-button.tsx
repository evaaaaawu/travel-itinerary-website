"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

export const NewBoardButton = ({
  orgId,
  disabled,
}: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create)

  const onClick = () => {
    mutate({
      title: "New Board",
      orgId,
    })
      .then(() => {
        toast.success("Board created");
      })
      .catch(() => {
        toast.error("Failed to create board");
      });
  };

  return (
    <button
      disabled={pending || disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-100 rounded-lg hover:bg-blue-950 hover:opacity-50 transition-all flex flex-col items-center justify-center py-6",
        (pending || disabled) && "opacity-75 hover:bg-blue-100 cursor-not-allowed"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-sm text-white font-light">
        New Board
      </p>
    </button>
  )
}
