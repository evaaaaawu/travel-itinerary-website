import { OrganizationProfile } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center w-0 h-0 border-none shadow-none">
        <DialogTitle className="sr-only">Invite members</DialogTitle>
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  )
}
