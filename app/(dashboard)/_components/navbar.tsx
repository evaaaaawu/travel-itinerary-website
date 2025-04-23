"use client";

import {
  useOrganization,
  OrganizationSwitcher,
  UserButton,
} from "@clerk/nextjs";

import { InviteButton } from "./invite-button";
import { SearchInput } from "./search.input";

export const Navbar = () => {
  const { organization } = useOrganization();

  return (
    <>
      <nav className="flex items-center p-5 gap-x-4">
        <div className="hidden lg:flex lg:flex-1">
          <SearchInput />
        </div>
        <div className="flex-1 block lg:hidden">
          <OrganizationSwitcher
            appearance={{
              elements: {
                rootBox: {
                  width: "100%",
                  maxWidth: "376px",
                },
                organizationSwitcherTrigger: {
                  padding: "6px",
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  justifyContent: "space-between",
                },
              },
            }}
          />
        </div>
        {organization && <InviteButton />}
        <UserButton />
      </nav>
      <div className="block mx-5 lg:hidden">
        <SearchInput />
      </div>
    </>
  )
};
