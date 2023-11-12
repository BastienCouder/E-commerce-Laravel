import CardProduct from "@/components/CardProduct";
import MetaData from "@/layout/MetaData";
import { readAllProducts } from "../@redux/action/products.action";
import { useAppDispatch, useAppSelector } from "@/hook";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/types/Product";
import { removeAccents } from "@/lib/format";
import ErrorPage from "@/error-page";
import { RootState } from "@/@redux/store";

export default function Products() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  if (error) {
    <ErrorPage />;
  }

  useEffect(() => {
    if (!products.length && !loading && !error) {
      dispatch(readAllProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (products.length && !loading) {
      setIsLoading(false);
    }
  }, [products]);

  const categoryProducts = isLoading
    ? Array.from({ length: 10 }).fill({})
    : products.filter(
        (product: Product) =>
          product.category &&
          removeAccents(
            product.category.name.toLowerCase().replace(/\s+/g, "-")
          ) === categorySlug?.toLowerCase()
      );

  return (
    <>
      <MetaData
        title="Page Products"
        description="Bienvenue sur notre page d'accueil"
        keywords="Accueil, Site Web"
      />
      <section className="p-2">
        <h1 className="text-base">Catégorie : {categorySlug}</h1>
        <ul className="w-full flex flex-wrap">
          {categoryProducts.map((product: any, index: number) => (
            <CardProduct
              key={product.id || index}
              isLoading={isLoading}
              product={product}
              categorySlug={categorySlug}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
