import { Meh } from "lucide-react";

export const EmptySearch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Meh className="w-15 h-15 text-muted-foreground" />
      <h2 className="mt-3 text-xl font-semibold text-muted-foreground">
        No results found!
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Try searching for something else
      </p>
    </div>
  );
};
