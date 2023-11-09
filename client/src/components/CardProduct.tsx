import formatPrice from "@/lib/format";
import { Product } from "@/types/Product";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

interface CardProductProps {
    categorySlug: string | undefined;
    product: Product;
}

export default function CardProduct({
    product,
    categorySlug,
}: CardProductProps) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-[300px] max-h-[600px] p-2">
            {isLoading ? (
                <Skeleton className="h-[350px] w-full" />
            ) : (
                <Link to={`/products/${categorySlug}/${product.id}`}>
                    <div className="h-[350px] w-full bg-primary"></div>
                </Link>
            )}
            <div className="p-2 space-y-2">
                {isLoading ? (
                    <>
                        <Skeleton className="w-1/2 h-2" />
                        <Skeleton className="w-1/3 h-2" />
                        <Skeleton className="w-full h-6" />
                        <Skeleton className="w-full h-10" />
                    </>
                ) : (
                    <>
                        <div className="p-2 space-y-2">
                            <h2>{product.name}</h2>
                            <p>{formatPrice(product.price, "EUR")}</p>
                            <p>
                                Description courte : {product.shortDescription}
                            </p>
                        </div>
                        <Button className="w-full">Ajouter au panier</Button>
                    </>
                )}
            </div>
        </div>
    );
}
