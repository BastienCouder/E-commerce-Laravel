import Logout from "@/components/Logout";
import Search from "@/components/Search";
import ShoppingCartButton from "@/components/ShoppingCartButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/authContext";
import { cn } from "@/lib/utils";
import { LogOut, User, UserCircle2 } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { state } = useAuth();

  const components: { title: string; slug: string; description: string }[] = [
    {
      title: "SKI ALPIN",
      slug: "ski-alpin",
      description: "Description de la catégorie Ski Alpin",
    },
    {
      title: "SNOWBOARD",
      slug: "snowboard",
      description: "Description de la catégorie Snowboard",
    },
    {
      title: "BÂTON",
      slug: "Baton",
      description: "Description de la catégorie Ski de Randonnée",
    },
    {
      title: "CHAUSSURES",
      slug: "chaussure",
      description: "Description de la catégorie Ski de Fond",
    },
    {
      title: "VÉLOS",
      slug: "velos",
      description: "Description de la catégorie Vélos",
    },
    {
      title: "SAC À DOS",
      slug: "sac-a-dos",
      description: "Description de la catégorie Randonnée",
    },
  ];

  const location = useLocation();
  const allowedPathnames = [
    "/",
    "/cart",
    "/profile",
    "/auth",
    "/delivery",
    "/summary",
  ];
  const shouldDisplaySearch = allowedPathnames.includes(location.pathname);

  return (
    <>
      <header className="w-full flex flex-col justify-center gap-y-2 mt-3">
        {!shouldDisplaySearch && (
          <div className="w-full flex justify-center">
            <Search />
          </div>
        )}
        <div className="flex justify-between items-center px-20">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link className="font-semibold mx-6" to="/">
                    Accueil
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Boutique</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.slug}
                        title={component.title}
                        to={`/products/${component.slug}`}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <UserCircle2 color="#25354c" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link to="/profile" className="font-semibold flex">
                    <User color="#25354c" className="mr-2 h-4 w-4" />
                    <span>Profil</span>
                  </Link>
                </DropdownMenuItem>
                {state.user && (
                  <DropdownMenuItem>
                    <div className="font-semibold flex cursor-pointer">
                      <LogOut color="#25354c" className="mr-2 h-4 w-4" />
                    </div>
                    <Logout />
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <ShoppingCartButton />
          </div>
        </div>
        <Separator />
      </header>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { to: string }
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
