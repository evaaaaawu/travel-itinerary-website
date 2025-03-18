import { CreateOrganization } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

export const EmptyOrg = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-semibold">
        Welcome to Travel World
      </h1>
      <p className="text-muted-foreground text-sm">
        Create a new organization to get started
      </p>
      <div className="mt-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg">Create Organization</Button>
          </DialogTrigger>
          <DialogContent className="border-none flex items-center justify-center">
            <DialogTitle className="sr-only">Create Organization</DialogTitle>
            <CreateOrganization />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
