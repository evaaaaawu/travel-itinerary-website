"use client";

import { CreateOrganization } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

import { Hint } from "./hint";

export const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <Hint
            label="create organization"
            side="right"
            align="start"
            sideOffset={5}
          >
            <button className="flex items-center justify-center w-full h-full transition-all rounded-md bg-white/25 opacity-60 hover:opacity-100">
              <Plus className="text-white" />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center border-none">
        <DialogTitle className="sr-only">Create Organization</DialogTitle>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};
