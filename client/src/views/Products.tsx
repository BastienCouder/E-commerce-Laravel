import { RootState } from "@/@redux/reducer";
import CardProduct from "@/components/CardProduct";
import MetaData from "@/layout/MetaData";
import { readAllProducts } from "../@redux/action/products.action";
import { useAppDispatch, useAppSelector } from "@/hook";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "@/types/Product";
import { removeAccents } from "@/lib/format";

export default function Products() {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const dispatch = useAppDispatch();
  const productsState = useAppSelector((state: RootState) => state.products);
  const { products } = productsState;

  useEffect(() => {
    dispatch(readAllProducts());
  }, [dispatch]);

  const categoryProducts = products.filter(
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
          {categoryProducts.map((product: Product) => (
            <CardProduct
              key={product.id}
              product={product}
              categorySlug={categorySlug}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
