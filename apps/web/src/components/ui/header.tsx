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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  ThemeToggleButton,
} from "@ng-youth/ui";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useState } from "react";
import HeaderSearchField from "./header-search-field";
import { ChevronDown, Globe, Search } from "lucide-react";
import { Input } from "@ng-youth/ui/forms";

export default function Header({ user }: { user?: User | null }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
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
              prefix={user.nickname.substring(0, 2)}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-xl">
            <DropdownMenuLabel className="gap-2">
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
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none lg:hidden">
            <ProfilePlaceholder
              className="size-[40px] border"
              iconClass="size-6"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="shadow-xl">
            <DropdownMenuLabel className="font-semibold">
              Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/sign-up">Sign Up</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <NavbarItem className="hidden lg:flex">
          <Link
            href="/login"
            color="foreground"
            className="font-medium hover:text-primary"
          >
            Log In
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </NavbarItem>
      </>
    );
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold">EduPro</div>

          {/* Language Selector */}
          <Select defaultValue="fr">
            <SelectTrigger className="w-[120px]">
              <Globe className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Langue" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="es">Español</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search and Navigation Bar */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Bar */}
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Rechercher un cours..."
              className="w-full pl-8"
            />
          </div>

          {/* Categories Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full md:w-auto">
                Catégories
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>Développement Web</DropdownMenuItem>
              <DropdownMenuItem>Business</DropdownMenuItem>
              <DropdownMenuItem>Design</DropdownMenuItem>
              <DropdownMenuItem>Marketing</DropdownMenuItem>
              <DropdownMenuItem>Data Science</DropdownMenuItem>
              <DropdownMenuItem>Langues</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Main Navigation */}
          <nav className="flex items-center gap-2 ml-auto">
            <Button variant="ghost">Cours</Button>
            <Button variant="ghost">Formateurs</Button>
            <Button variant="ghost">Blog</Button>
            <Button variant="ghost">Entreprise</Button>
            <Button variant="ghost">Aide</Button>
            <Button variant="outline">Se connecter</Button>
            <Button>S'inscrire</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
