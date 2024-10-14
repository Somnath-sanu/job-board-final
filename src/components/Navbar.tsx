"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Check,
  Settings,
  SquareLibrary,
  LogIn,
  ShieldCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import SearchField from "./SearchField";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";
import { isAdmin } from "@/lib/utils";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-background dark:shadow-xl dark:border-b border-slate-900 shadow-md overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <motion.div
                className="w-10 h-10 mr-2"
                animate={{
                  rotate: [0, 10, -10, 0],
                  transition: { repeat: Infinity, duration: 2 },
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                  <polyline points="17 2 12 7 7 2" />
                  <circle cx="12" cy="15" r="2" />
                  <line x1="10" y1="11" x2="14" y2="11" />
                </svg>
              </motion.div>
              <span className="font-bold text-xl text-primary hidden sm:inline-block">
                JobHunt
              </span>
            </Link>
          </div>
          <div className="flex gap-3 justify-between flex-row-reverse">
            <div className="flex items-center gap-1">
              {mounted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="select-none border-none outline-none"
                    >
                      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                      <span className="sr-only">Toggle theme</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                      {theme === "light" && <Check className="ps-2" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                      {theme === "dark" && <Check className="ps-2" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                      {theme === "system" && <Check className="ps-2" />}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              {mounted && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="select-none border-none outline-none"
                    >
                      <Settings className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 " />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="cursor-pointer" asChild>
                      <Link
                        href={"/jobs/new"}
                        className="flex gap-1 items-center"
                      >
                        <SquareLibrary className="h-[1.2rem] w-[1.2rem] mr-1" />
                        <span>Post a job</span>
                      </Link>
                    </DropdownMenuItem>
                    {!isSignedIn && (
                      <DropdownMenuItem asChild>
                        <div className="flex items-center gap-1">
                          {!isSignedIn && (
                            <SignInButton>
                              <div className="flex gap-1 items-center cursor-pointer">
                                <LogIn className="h-[1.2rem] w-[1.2rem]" />
                                <span>Log In</span>
                              </div>
                            </SignInButton>
                          )}
                        </div>
                      </DropdownMenuItem>
                    )}
                    {user && isAdmin(user) && (
                      <DropdownMenuItem asChild>
                        <Link
                          href={`/admin`}
                          className="flex items-center gap-1"
                        >
                          <ShieldCheck className="h-[1.2rem] w-[1.2rem]" />
                          <span>Admin </span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <UserButton />

            <SearchField />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
