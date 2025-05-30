"use client";

import {
  useOrganization,
  useOrganizationList,
} from "@clerk/nextjs";
import Image from "next/image";

import { Hint } from "@/components/hint";
import { cn } from "@/lib/utils";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();
  const isActive = organization?.id === id;
  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="relative aspect-square">
      <Hint 
        label={name}
        side="right"
        align="center"
        sideOffset={5}
      >
        <Image
          fill
          alt={name}
          src={imageUrl}
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-70 hover:opacity-100 transition-all duration-300",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
};
