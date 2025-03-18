import { Meh } from "lucide-react";

export const EmptySearch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Meh className="w-15 h-15 text-muted-foreground" />
      <h2 className="text-xl font-semibold text-muted-foreground mt-3">
        No results found!
      </h2>
      <p className="text-sm text-muted-foreground mt-2">
        Try searching for something else
      </p>
    </div>
  );
};
