import { Heart } from "lucide-react";

export const EmptyFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Heart className="w-15 h-15 text-muted-foreground" />
      <h2 className="mt-3 text-xl font-semibold text-muted-foreground">
        No favorites yet!
      </h2>
    </div>
  );
};
