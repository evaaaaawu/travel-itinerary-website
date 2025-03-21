"use client";

import Link from "next/link";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Heart } from "lucide-react";
import { useSearchParams } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const OrgSidebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5">
      <Link href="/">
        <div className="flex items-center gap-x-2">
          <Image
            src="/logo.webp"
            alt="logo"
            width={40}
            height={40}
          />
          <span className={cn(
            "font-semibold text-xl",
            font.className
          )}>
            Travel World
          </span>
        </div>
      </Link>
      <OrganizationSwitcher
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            },
          },
        }}
      />
      <div className="space-y-1 w-full">
        <Button
          variant={favorites ? "ghost" : "secondary"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href="/">
            <LayoutDashboard className="w-4 h-4 mr-2" />
            Boards
          </Link>
        </Button>
        <Button
          variant={favorites ? "secondary" : "ghost"}
          asChild
          size="lg"
          className="font-normal justify-start px-2 w-full"
        >
          <Link href={{
            pathname: "/",
            query: { favorites: "true" }
          }}>
            <Heart className="w-4 h-4 mr-2" />
            Favorite Boards
          </Link>
        </Button>
      </div>
    </div>
  );
};
