import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import formatPrice from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch, useAppSelector } from "@/hook";
import ErrorPage from "@/error-page";
import { RootState } from "@/@redux/store";
import { baseUrl } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { readProduct } from "@/@redux/action/product.action";

export default function ProductDetail() {
  const { productId } = useParams<{ productId: any }>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  let { product, loading, error } = useAppSelector(
    (state: RootState) => state.product
  );

  if (error) {
    return <ErrorPage />;
  }

  useEffect(() => {
    if (productId && !loading && !error) {
      dispatch(readProduct(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product && !loading) {
      setIsLoading(false);
    }
  }, [product]);

  const isNew = useMemo(() => {
    if (product) {
      return (
        Date.now() - new Date(product.created_at).getTime() <
        1000 * 60 * 60 * 24 * 7
      );
    }
  }, [product?.created_at]);

  return (
    <>
      {product && (
        <section className="w-full flex flex-col md:flex-row p-4">
          <div className="md:w-1/2 p-4">
            {isLoading ? (
              <div className="flex space-x-4">
                <Skeleton className="min-w-[200px] w-full xl:w-1/2 min-h-[400px]" />
                <Skeleton className="min-w-[200px] w-full xl:w-1/2 min-h-[400px]" />
              </div>
            ) : (
              <div className="w-full flex flex-wrap xl:flex-nowrap gap-4">
                <div className="hidden xl:flex min-w-[200px] w-full xl:w-1/2 min-h-[400px]"></div>
                <div className="relative flex justify-center items-center min-w-[200px] w-full xl:w-1/2 min-h-[400px]">
                  <figure className="h-[400px] p-4 border-2 w-full flex justify-center items-center">
                    <img
                      src={`${baseUrl}/storage/${product.image}`}
                      alt={product.name}
                      className="object-contain w-full h-[300px]"
                    />
                  </figure>
                  {isNew && (
                    <Badge className="absolute top-5 left-0 md:left-5">
                      Nouveau
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="md:w-1/2 p-4 space-y-4">
            {isLoading ? (
              <Skeleton className="w-1/2 h-8" />
            ) : (
              <h1>{product.name}</h1>
            )}
            <div className="space-y-2 w-3/4">
              {isLoading ? (
                <>
                  <Skeleton className="w-1/3 h-4" />
                  <Skeleton className="w-1/2 h-4" />
                </>
              ) : (
                <>
                  {product.stock && product.stock > 0 ? (
                    <>
                      <div>
                        <p className="font-bold text-sm">Stock :</p>
                        <p>{product.stock} restants</p>
                      </div>
                    </>
                  ) : (
                    <small className="text-destructive">Rupture de stock</small>
                  )}
                </>
              )}
              {isLoading ? (
                <Skeleton className="w-1/3 h-6" />
              ) : (
                <>
                  {product && (
                    <p className="font-bold">
                      {formatPrice(product.price, "EUR")}
                    </p>
                  )}
                </>
              )}
              {isLoading ? (
                <Skeleton className="w-full h-8" />
              ) : (
                <p>{product?.shortDescription}</p>
              )}
            </div>
            <div className="pt-2">
              {product.stock && product.stock > 0 && (
                <>
                  {isLoading ? (
                    <Skeleton className="w-1/3 h-10" />
                  ) : (
                    <AddToCartButton productId={productId} />
                  )}
                </>
              )}
            </div>
            {isLoading ? (
              <Skeleton className="w-3/4 h-10" />
            ) : (
              <div className="w-3/4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Description</AccordionTrigger>
                    <AccordionContent>
                      {product.longDescription}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
