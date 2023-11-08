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
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const components: { title: string; slug: string; description: string }[] = [
        {
            title: "SKI ALPIN",
            slug: "ski-alpin",
            description: "Description de la catégorie Ski Alpin",
        },
        {
            title: "SKI DE RANDONNÉE",
            slug: "ski-randonnees",
            description: "Description de la catégorie Ski de Randonnée",
        },
        {
            title: "SKI DE FOND",
            slug: "ski-fond",
            description: "Description de la catégorie Ski de Fond",
        },
        {
            title: "SNOWBOARD",
            slug: "snowboard",
            description: "Description de la catégorie Snowboard",
        },
        {
            title: "VÉLOS",
            slug: "velos",
            description: "Description de la catégorie Vélos",
        },
        {
            title: "RANDONNÉE",
            slug: "randonnee",
            description: "Description de la catégorie Randonnée",
        },
    ];

    const location = useLocation();
    const allowedPathnames = ["/", "/products/:categorySlug"];
    const shouldDisplaySearch = allowedPathnames.includes(location.pathname);

    return (
        <>
            <header className="w-full flex flex-col justify-center gap-y-2 mt-3">
                {shouldDisplaySearch && (
                    <div className="w-full flex justify-center">
                        <Search />
                    </div>
                )}
                <div className="flex justify-between items-center px-20">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="/" className="font-semibold mx-6">
                                    <NavigationMenuLink>
                                        Accueil
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Getting started
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                        <li className="row-span-3">
                                            <NavigationMenuLink asChild>
                                                <a
                                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                    href="/"
                                                >
                                                    <div className="mb-2 mt-4 text-lg font-medium">
                                                        shadcn/ui
                                                    </div>
                                                    <p className="text-sm leading-tight text-muted-foreground">
                                                        Beautifully designed
                                                        components built with
                                                        Radix UI and Tailwind
                                                        CSS.
                                                    </p>
                                                </a>
                                            </NavigationMenuLink>
                                        </li>
                                        <ListItem
                                            href="/docs"
                                            title="Introduction"
                                        >
                                            Re-usable components built using
                                            Radix UI and Tailwind CSS.
                                        </ListItem>
                                        <ListItem
                                            href="/docs/installation"
                                            title="Installation"
                                        >
                                            How to install dependencies and
                                            structure your app.
                                        </ListItem>
                                        <ListItem
                                            href="/docs/primitives/typography"
                                            title="Typography"
                                        >
                                            Styles for headings, paragraphs,
                                            lists...etc
                                        </ListItem>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuTrigger>
                                    Équipement
                                </NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                                        {components.map((component) => (
                                            <ListItem
                                                key={component.slug}
                                                title={component.title}
                                                href={`/products/${component.slug}`}
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
                                <AiOutlineUser size={25} />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>
                                    Mon compte
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link
                                        to="/auth"
                                        className="font-semibold mx-6"
                                    >
                                        Profil
                                    </Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Deconnexion</span>
                                </DropdownMenuItem>
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
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">
                        {title}
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";
