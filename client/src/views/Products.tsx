import CardProduct from "@/components/CardProduct";
import products from "@/data";
import MetaData from "@/layout/MetaData";
import { useParams } from "react-router-dom";

export default function Products() {
    const { categorySlug } = useParams();
    const categoryProducts = products.filter(
        (product) => product.category === categorySlug
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
                    {categoryProducts.map((product) => (
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
