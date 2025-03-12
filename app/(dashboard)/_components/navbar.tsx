"use client";

import { UserButton } from "@clerk/nextjs";

export const Navbar = () => {
  return (
    <nav className="flex items-center gap-x-4 p-5 bg-slate-200">
      <div className="hidden lg:flex lg:flex-1 bg-yellow-500">
        Search
      </div>
      <UserButton />
    </nav>
  )
};
