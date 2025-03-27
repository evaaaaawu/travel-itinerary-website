"use client";

import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Heart, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Actions } from "@/components/actions";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";


interface BoardCardProps {
  id: string;
  title: string;
  authorId: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  authorId,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();

  const authorLabel = authorId === userId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const {
    mutate: onFavorite, 
    pending: pendingFavorite, 
  } = useApiMutation(api.board.favorite);
  
  const {
    mutate: onUnfavorite, 
    pending: pendingUnfavorite, 
  } = useApiMutation(api.board.unfavorite);

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id })
        .catch(() => toast.error("Failed to unfavorite"))
    } else {
      onFavorite({ id, orgId })
        .catch(() => toast.error("Failed to favorite"))
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite();
  };

  return (
    <Link href={`/board/${id}`}>
      <div className="relative flex flex-col overflow-hidden border rounded-lg group aspect-square">
        <div className="relative flex items-center justify-center flex-1 transition-colors bg-blue-100 group-hover:bg-blue-950 group-hover:opacity-50">
          <button
            className={cn(
              "opacity-0 group-hover:opacity-100 transition absolute top-3 left-3 text-muted-foreground hover:text-red-500",
            )}
            onClick={handleClick}
            disabled={pendingFavorite || pendingUnfavorite}
          >
            <Heart
              className={cn(
                "w-4 h-4",
                isFavorite && "fill-red-500 text-red-500"
              )}
            />
          </button>
          <Actions
            id={id}
            title={title}
            side="right"
          >
            <button
              className="absolute transition-opacity outline-none opacity-0 top-3 right-3 group-hover:opacity-100"
            >
              <MoreHorizontal
                className="text-white transition-opacity opacity-75 hover:opacity-100"
              />
            </button>
          </Actions>
          <div className="text-center">
            <p className="font-semibold text-blue-300">{title}</p>
            <p className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground">
              {authorLabel}, {createdAtLabel}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg aspect-square">
      <Skeleton className="w-full h-full" />
    </div>
  );
};
