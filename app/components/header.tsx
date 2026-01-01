"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { UserButton } from "@clerk/react";

const Header = () => {
  const { user } = useUser();

  return (
    <header className="flex justify-end items-center p-4 gap-4 h-16">
      {user && (
        <>
          {user.publicMetadata.role === "admin" && (
            <Link href="/admin" className="text-blue-500 hover:underline">
              Admin
            </Link>
          )}
          <UserButton afterSignOutUrl="/" />
        </>
      )}
    </header>
  );
};

export default Header;
