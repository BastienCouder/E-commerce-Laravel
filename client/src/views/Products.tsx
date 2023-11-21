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
import { useSearch } from "@/context/searchContext";

export default function Products() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );
  const { searchTerm } = useSearch();

  if (error) {
    return <ErrorPage />;
  }

  useEffect(() => {
    if (products && !loading && !error) {
      dispatch(readAllProducts());
      setIsLoading(false);
    }
  }, [dispatch, products]);

  const categoryProducts = isLoading
    ? Array.from({ length: 10 }).fill({})
    : products.filter(
        (product: Product) =>
          product.category &&
          removeAccents(
            product.category.name.toLowerCase().replace(/\s+/g, "-")
          ) === categorySlug?.toLowerCase()
      );

  const filteredProducts: Product[] = categoryProducts.filter(
    (product: any): product is Product =>
      product.name &&
      removeAccents(product.name.toLowerCase()).includes(
        removeAccents(searchTerm.toLowerCase())
      )
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
        <ul className="w-full flex flex-wrap justify-center sm:justify-start">
          {filteredProducts.map((product: any, index: number) => (
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
