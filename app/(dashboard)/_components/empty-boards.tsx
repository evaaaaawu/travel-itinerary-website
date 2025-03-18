import { Button } from "@/components/ui/button";
import { LayoutDashboard } from "lucide-react";

export const EmptyBoards = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LayoutDashboard className="w-15 h-15 text-muted-foreground" />
      <h2 className="text-xl font-semibold text-muted-foreground mt-3">
        Create your first board!
      </h2>
      <p className="text-sm text-muted-foreground mt-2">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg">
          Create Board
        </Button>
      </div>
    </div>
  );
};
