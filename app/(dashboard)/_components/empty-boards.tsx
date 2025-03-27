"use client";

import { useOrganization } from "@clerk/nextjs";
import { LayoutDashboard } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";

export const EmptyBoards = () => {
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onclick = () => {
    if (!organization) return;
    mutate({
      title: "New Board",
      orgId: organization.id,
    })
      .then((id) => {
        toast.success("Board created");
        // TODO: Redirect to board/{id}
      })
      .catch(() => toast.error("Failed to create board"));
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <LayoutDashboard className="w-15 h-15 text-muted-foreground" />
      <h2 className="mt-3 text-xl font-semibold text-muted-foreground">
        Create your first board!
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Start by creating a board for your organization
      </p>
      <div className="mt-6">
        <Button size="lg" onClick={onclick} disabled={pending}>
          Create Board
        </Button>
      </div>
    </div>
  );
};
