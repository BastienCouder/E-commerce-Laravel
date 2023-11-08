import { AiOutlineShopping } from "react-icons/ai";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface ShoppingCartButtonProps {
    ///
}

export default function ShoppingCartButton({}: ShoppingCartButtonProps) {
    return (
        <Link to={`/cart`} onClick={() => {}}>
            <AiOutlineShopping size={25} />
            {/* <Badge className="text-primary absolute top-0 -right-2">
                {cart?.size || 0}
            </Badge> */}
        </Link>
    );
}
