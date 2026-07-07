"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";

type UserMenuProps = {
  userLabel: string | null | undefined;
  profilePicture: string;
};

export default function UserMenu({ profilePicture, userLabel }: UserMenuProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [pathName, isDropdownOpen]);

  const handleLogout = async () => {
    try {
      await signOut({ callbackUrl: "/login" });
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  return (
    <div className="relative">
      <button
        className="cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <Image
          src={profilePicture}
          width={30}
          height={30}
          alt="profile-picture"
          className="rounded-full w-full object-cover"
        />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-1 w-40 rounded-lg bg-white p-3 shadow-xl">
          <div className="flex items-center justify-between">
            <p>Hi, {userLabel}</p>
          </div>
          <div className="h-[0.25px] bg-gray-300 my-3"></div>
          <div className="mb-2 hover:text-blue-600 cursor-pointer">
            <Link href="/profile">Profile settings</Link>
          </div>
          <div className="mb-2 hover:text-blue-600 cursor-pointer">
            <Link href="/dashboard">Dashboard</Link>
          </div>
          <div className="mb-2 hover:text-blue-600 cursor-pointer">
            <button className="cursor-pointer" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
