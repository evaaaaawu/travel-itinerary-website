"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import { Hint } from "@/components/hint";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="create organization"
            side="right"
            align="center"
            sideOffset={5}
          >
            <button className="flex items-center justify-center w-full h-full transition-all rounded-md bg-white/25 opacity-60 hover:opacity-100">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center w-0 h-0 border-none">
        <DialogTitle className="sr-only">Create Organization</DialogTitle>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
