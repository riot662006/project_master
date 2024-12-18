"use client";

import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { stringHashedColor } from "@/utils/functions";
import { Logout, Settings } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRef } from "react";

const UserButton = () => {
  const { data: session, status } = useSession();
  const menuRef = useRef<HTMLDivElement>(null);
  const { isActive: isMenuActive, toggleMenu } = useDetectOutsideClick(
    menuRef,
    false,
  );

  if (status === "loading")
    return <CircularProgress size="40px" sx={{ color: "sky-blue" }} />;
  if (!session || !session.user) return <a href="/auth/login">Sign In</a>;

  return (
    <div className="relative flex" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className="flex cursor-pointer items-center justify-center rounded-sm"
      >
        <UserAvatar name={session.user.name} imageUrl={session.user.image} />
      </button>
      <nav
        className={`absolute bottom-12 left-0 z-30 flex items-center justify-center max-md:fixed max-md:bottom-20 max-md:right-0 `}
      >
        <div
          className={`flex h-32 gap-4 rounded-xl bg-white bg-opacity-90 p-4 shadow-md max-md:bg-opacity-100 border border-slate-200 ${
            isMenuActive ? "opacity-100" : "h-0 opacity-0"
          } transition-[height,opacity] overflow-hidden`}
        >
          <div
            className={`flex flex-col gap-4 ${isMenuActive ? "block" : "hidden"}`}
          >
            <div className="flex gap-4">
              <div>
                <UserAvatar
                  name={session.user.name}
                  imageUrl={session.user.image}
                />
              </div>
              <div>
                <p className="font-medium">{session.user.name}</p>
                <p className="text-sm">{session.user.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-lg">
              {/* TODO: Add and link profile page / modal */}
              <button className="flex items-center gap-0.5 rounded-lg border border-slate-200 p-2 px-6 text-sm text-slate-500 transition-colors hover:bg-slate-200">
                <Settings className="text-lg" />
                <span className="text-nowrap">Manage account</span>
              </button>
              <button
                className="flex items-center gap-0.5 rounded-lg border border-slate-200 p-2 px-6 text-sm text-slate-500 transition-colors hover:bg-slate-200"
                onClick={() => signOut()}
              >
                <Logout className="text-lg" />
                <span className="text-nowrap">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

interface UserAvatarProps {
  name?: string | null;
  imageUrl?: string | null | undefined;
}

const UserAvatar = ({ name, imageUrl }: UserAvatarProps) => {
  if (!name && !imageUrl) return <Avatar></Avatar>;

  return (
    <Avatar
      sx={{ bgcolor: name ? stringHashedColor(name) : undefined }}
      alt={name ?? ""}
      src={imageUrl ?? "/"}
    />
  );
};

export default UserButton;
