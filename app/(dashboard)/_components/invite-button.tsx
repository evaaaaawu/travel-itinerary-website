import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus className="w-4 h-4 mr-2" />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center shadow-none border-none h-[80%]">
        <DialogTitle className="sr-only">Invite members</DialogTitle>
        <OrganizationProfile routing="hash" />
      </DialogContent>
    </Dialog>
  )
}
