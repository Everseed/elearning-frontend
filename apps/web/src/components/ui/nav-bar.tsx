"use client";

import { clearAuthCookies } from "@/lib/actions";
import { useAppDispatch } from "@ng-youth/global-store";
import { setUser } from "@ng-youth/global-store/slices";
import { User } from "@ng-youth/lib/models";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ProfileAvatar,
  ProfilePlaceholder,
  ThemeToggleButton,
} from "@ng-youth/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "../i18n/I18nProvider";
import { Globe, Menu, User } from "lucide-react";




export default function Navbar({ user }: { user?: User | null }) {
  const { t, language, setLanguage } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(user));
  }, [user]);


  const accountView = () => {

    if (user) {
      const isAdminOrOwner = user.role === "owner" || user.role === "admin";
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none flex-shrink-0">
            <ProfileAvatar
              src={user.image}
              className="h-7 w-7"
              prefix={user.nickname.substring(0, 2)}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-xl">
            <DropdownMenuLabel className="gap-3">
              <p className="font-normal">Signed in as</p>
              <p className="font-semibold">{user.nickname}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {user.role !== "user" && (
              <>
                <DropdownMenuItem asChild>
                  <a
                    href={isAdminOrOwner ? "/admin" : "/admin/courses"}
                    target="_blank"
                  >
                    Dashboard
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem asChild>
              <Link href="/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/learnings">My Learnings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/profile/bookmarks">My Bookmarks</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                await clearAuthCookies();
              }}
              className="text-destructive focus:text-destructive"
            >
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return (
      <>
        <Button onClick={() => (window.location.href = '/login')}>
          {t('nav.getStarted')}
        </Button>
      </>
    );
  };


  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 
              to-violet-600 bg-clip-text text-transparent">
              {t('nav.home')}
            </span>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-8"></nav>

          {/* Auth and Language */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="#category"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              {t('nav.category')}
            </Link>
            <Link
              href="#blog"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              {t('nav.blog')}
            </Link>

            {accountView()}

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium p-2 hover:bg-slate-100 rounded-md">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{language}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onSelect={() => setLanguage('en')}
                  className={language === 'en' ? 'bg-slate-100' : ''}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onSelect={() => setLanguage('fr')}
                  className={language === 'fr' ? 'bg-slate-100' : ''}>
                  Français
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

