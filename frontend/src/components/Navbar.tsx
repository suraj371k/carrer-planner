"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
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
  PanelRightInactive,
  AlignVerticalJustifyCenter,
  BookDashed,
} from "lucide-react";

// Navigation items configuration
const navigationItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: BookDashed,
  },
  {
    href: "/career-plan",
    label: "Your Roadmap",
    icon: Map,
  },
  {
    href: "/jobs",
    label: "Jobs",
    icon: Briefcase,
  },
  {
    href: "/practice/topics",
    label: "Practice",
    icon: PanelRightInactive,
  },
  {
    href: "/resume",
    label: "Analyze Resume",
    icon: AlignVerticalJustifyCenter,
  },
];

// Memoized Navigation Link Component
type NavigationLinkProps = {
  item: {
    href: string;
    label: string;
    icon: React.ElementType;
  };
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
};

const NavigationLink: React.FC<NavigationLinkProps> = React.memo(
  ({ item, onClick, className }) => {
    const Icon = item.icon;
    return (
      <Link href={item.href} className={className} onClick={onClick}>
        <Icon className="h-4 w-4" />
        <span>{item.label}</span>
      </Link>
    );
  }
);

NavigationLink.displayName = "NavigationLink";

type User = {
  name?: string;
  email?: string;
  avatar?: string;
};

type UserAvatarProps = {
  user?: User;
  size?: "default" | "small";
  isLoading?: boolean;
};

const UserAvatar: React.FC<UserAvatarProps> = React.memo(
  ({ user, size = "default", isLoading = false }) => {
    const [imageError, setImageError] = useState(false);
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
      // Show fallback after a short delay if still loading
      const timer = setTimeout(() => {
        if (isLoading) {
          setShowFallback(true);
        }
      }, 200);

      return () => clearTimeout(timer);
    }, [isLoading]);

    const sizeClasses = {
      default: "h-9 w-9 text-sm",
      small: "h-8 w-8 text-xs",
    };

    if (isLoading && !showFallback) {
      return (
        <Skeleton
          className={`${
            sizeClasses[size as keyof typeof sizeClasses]
          } rounded-full`}
        />
      );
    }

    if (isLoading || !user) {
      return (
        <div
          className={`${
            sizeClasses[size as keyof typeof sizeClasses]
          } rounded-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center text-white font-semibold animate-pulse`}
        >
          ?
        </div>
      );
    }

    const initials = user.name
      ? user.name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : user.email?.[0]?.toUpperCase() || "?";

    return (
      <div
        className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-sm`}
      >
        {user.avatar && !imageError ? (
          <img
            src={user.avatar}
            alt={user.name || "User"}
            className="w-full h-full rounded-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
    );
  }
);

UserAvatar.displayName = "UserAvatar";

const Navbar = () => {
  const { data: user, isLoading, error } = useProfile();
  const { mutate: logout } = useLogout();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu on route change (you might want to add a route change listener)
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Handle logout with loading state
  const handleLogout = () => {
    logout();
    closeMobileMenu();
  };

  // Determine auth state more efficiently
  const isAuthenticated = !isLoading && !error && user;
  const shouldShowAuthSection = !isLoading || user;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200/60 bg-white/95 backdrop-blur-xl shadow-sm transition-all duration-200 dark:border-gray-800/60 dark:bg-gray-950/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 via-blue-700 to-purple-600 text-white font-bold text-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-200 shadow-sm">
              CP
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-200">
              Career Boost
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <NavigationLink
                key={item.href}
                item={item}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-lg transition-all duration-200 group dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
              />
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {shouldShowAuthSection && (
              <>
                {isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-9 w-9 rounded-full border-gray-300 hover:border-blue-400 hover:shadow-md transition-all duration-200 dark:border-gray-700 dark:hover:border-blue-500 p-0"
                        disabled={isLoading}
                      >
                        <UserAvatar user={user} isLoading={isLoading} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64 mt-2 border-gray-200/50 shadow-xl backdrop-blur-sm dark:border-gray-800/50"
                      align="end"
                      sideOffset={8}
                    >
                      <DropdownMenuLabel className="pb-3">
                        <div className="flex items-center space-x-3">
                          <UserAvatar user={user} size="small" />
                          <div className="flex flex-col space-y-1 min-w-0">
                            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                              {user?.name || "User"}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="py-2.5 focus:bg-blue-50 dark:focus:bg-blue-950/50">
                        <Link
                          className="flex items-center w-full"
                          href="/profile"
                        >
                          <User className="mr-3 h-4 w-4 text-gray-500" />
                          <span className="text-sm">Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="py-2.5 text-red-600 focus:text-red-600 focus:bg-red-50 dark:text-red-400 dark:focus:text-red-400 dark:focus:bg-red-950/50"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        <span className="text-sm">Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="h-9 px-4 text-sm font-medium hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </>
            )}
          </div>

          {/* Mobile Section */}
          <div className="md:hidden flex items-center space-x-3">
            {shouldShowAuthSection && isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full border-gray-300 hover:border-blue-400 transition-all duration-200 dark:border-gray-700 dark:hover:border-blue-500 p-0"
                    disabled={isLoading}
                  >
                    <UserAvatar
                      user={user}
                      size="small"
                      isLoading={isLoading}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 mt-2 backdrop-blur-sm"
                  align="end"
                  sideOffset={8}
                >
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <span className="text-sm font-medium truncate">
                        {user?.name || "User"}
                      </span>
                      <span className="text-xs text-muted-foreground truncate">
                        {user?.email}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link className="flex items-center w-full" href="/profile">
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
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 hover:bg-gray-100 hover:scale-105 transition-all duration-200 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-950/95">
            <div className="px-2 pt-3 pb-4 space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-200 group dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-blue-950/50"
                    onClick={closeMobileMenu}
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}

              {!isAuthenticated && !isLoading && (
                <div className="pt-4 space-y-3 border-t border-gray-200/50 dark:border-gray-800/50 mt-4">
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full h-11 text-sm font-medium hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200"
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
