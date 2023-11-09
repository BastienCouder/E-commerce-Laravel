import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

interface ShoppingCartButtonProps {
    ///
}

export default function ShoppingCartButton({}: ShoppingCartButtonProps) {
    return (
        <Link to={`/cart`} onClick={() => {}}>
            <ShoppingCart color="#25354c" />
            {/* <Badge className="text-primary absolute top-0 -right-2">
                {cart?.size || 0}
            </Badge> */}
        </Link>
    );
}
