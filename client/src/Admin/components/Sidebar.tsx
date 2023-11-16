import Logout from "@/components/Logout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Barcode, Book, LogOut, PackageSearch } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-12 h-full border-r-2", className)}>
      <div className="space-y-2 px-3 py-4">
        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
          Dashboard
        </h2>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard/orders">
              <Button
                variant="secondary"
                className="w-full justify-start gap-x-2"
              >
                <PackageSearch size={20} color="#25354c" />
                Commandes
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/products">
              <Button variant="ghost" className="w-full justify-start gap-x-2">
                <Barcode size={20} color="#25354c" />
                Produits
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/dashboard/inventory">
              <Button variant="ghost" className="w-full justify-start gap-x-2">
                <Book size={20} color="#25354c" />
                Inventaire
              </Button>
            </Link>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start gap-x-2">
              <LogOut size={20} color="#25354c" />
              <Logout />
            </Button>
          </li>
        </ul>
      </div>
    </div>
  );
}
