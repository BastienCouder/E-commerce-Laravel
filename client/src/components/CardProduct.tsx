import formatPrice, { formatDescription } from "@/lib/format";
import { Product } from "@/types/Product";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import AddToCartButton from "./AddToCartButton";

interface CardProductProps {
  categorySlug: string | undefined;
  product: Product;
  isLoading: Boolean;
}

export default function CardProduct({
  product,
  categorySlug,
  isLoading,
}: CardProductProps) {
  return (
    <div className="min-w-[300px] w-[300px] max-h-[600px] p-2">
      {isLoading ? (
        <Skeleton className="h-[350px] w-full" />
      ) : (
        <Link to={`/products/${categorySlug}/${product.id}`}>
          <figure className="h-[350px] p-4 border-2 w-full flex justify-center items-center">
            <img
              src={`${product.image}`}
              alt={product.name}
              className="object-contain w-full h-[300px]"
            />
          </figure>
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
              <p className="h-16">
                Description courte :
                {formatDescription(product.shortDescription)}
              </p>
            </div>
            <AddToCartButton productId={String(product.id)} />
          </>
        )}
      </div>
    </div>
  );
}
