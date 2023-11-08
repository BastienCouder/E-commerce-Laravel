import formatPrice from "@/lib/format";
import { Product } from "@/types/Product";
import { Link } from "react-router-dom";

interface CardProductProps {
    categorySlug: string | undefined;
    product: Product;
}

export default function CardProduct({
    product,
    categorySlug,
}: CardProductProps) {
    return (
        <Link
            to={`/products/${categorySlug}/${product.id}`}
            className="w-[300px] max-h-[500px] p-2"
        >
            <div className="h-[350px] w-full bg-primary"></div>
            <div className="p-2 space-y-2">
                <h2>{product.name}</h2>
                <p>{formatPrice(product.price, "EUR")}</p>
                <p>Description courte : {product.shortDescription}</p>
            </div>
        </Link>
    );
}
