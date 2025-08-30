"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { useLogout, useProfile } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";
import {
  LogOut,
  User,
  CreditCard,
  Users,
  Menu,
  X,
  Briefcase,
  Map,
  PanelRightInactiveIcon,
} from "lucide-react";

const Navbar = () => {
  const { data: user, isLoading } = useProfile();
  const { mutate: logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/50 bg-white/90 backdrop-blur-xl shadow-sm dark:border-gray-800/50 dark:bg-gray-950/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-sm group-hover:shadow-lg transition-all duration-200">
              CP
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Career Boost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
            >
              <Map className="h-4 w-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/career-plan"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
            >
              <Map className="h-4 w-4" />
              <span>Your Roadmap</span>
            </Link>
            <Link
              href="/jobs"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
            >
              <Briefcase className="h-4 w-4" />
              <span>Jobs</span>
            </Link>
            <Link
              href="/practice/topics"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
            >
              <PanelRightInactiveIcon className="h-4 w-4" />
              <span>Practice</span>
            </Link>
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoading ? (
              <Skeleton className="h-9 w-9 rounded-full" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9 rounded-full border-gray-300 hover:border-blue-400 hover:shadow-md transition-all duration-200 dark:border-gray-700 dark:hover:border-blue-500"
                  >
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-64 mt-2 border-gray-200/50 shadow-xl dark:border-gray-800/50"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuLabel className="pb-3">
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-2.5">
                    <Link className="flex items-center w-full" href="/profile">
                      <User className="mr-3 h-4 w-4 text-gray-500" />
                      <span className="text-sm">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="py-2.5 text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                  >
                    <LogOut className="mr-3 h-4 w-4" />
                    <span className="text-sm">Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button
                  variant="ghost"
                  className="h-9 px-4 text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button + Profile */}
          <div className="md:hidden flex items-center space-x-2">
            {isLoading ? (
              <Skeleton className="h-8 w-8 rounded-full" />
            ) : user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-gray-300 dark:border-gray-700"
                  >
                    <span className="text-xs font-semibold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-2"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{user.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link className="flex gap-2" href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    Team
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="text-red-600 dark:text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 dark:border-gray-800/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                href="/dashboard"
                className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Map className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/career-plan"
                className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Map className="h-5 w-5" />
                <span>Your Roadmap</span>
              </Link>
              <Link
                href="/jobs"
                className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Briefcase className="h-5 w-5" />
                <span>Jobs</span>
              </Link>
              <Link
                href="/practice/topics"
                className="flex items-center space-x-3 px-3 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <PanelRightInactiveIcon className="h-5 w-5" />
                <span>Practice</span>
              </Link>

              {!user && (
                <div className="pt-4 space-y-2">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full h-11 text-sm font-medium"
                    >
                      Login
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
