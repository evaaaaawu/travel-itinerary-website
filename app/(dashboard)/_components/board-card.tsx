"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@clerk/nextjs";
import { Heart, MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/actions";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
      <div className="group aspect-square border rounded-lg overflow-hidden relative flex flex-col">
        <div className="relative flex-1 bg-blue-100 group-hover:bg-blue-950 group-hover:opacity-50 transition-colors flex items-center justify-center">
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
              className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity outline-none"
            >
              <MoreHorizontal
                className="text-white opacity-75 hover:opacity-100 transition-opacity"
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
    <div className="aspect-square rounded-lg overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
