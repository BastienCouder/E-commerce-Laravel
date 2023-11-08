import { useState } from "react";
import { useParams } from "react-router-dom";
import products from "@/data";
import MainLayout from "@/layout";
import formatPrice from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductDetail() {
    const { categorySlug, productId } = useParams();

    let product = null;
    if (productId) {
        product = products.find(
            (p) =>
                p.category === categorySlug && p.id === parseInt(productId, 10)
        );
    }

    const [selectedSize, setSelectedSize] = useState(null);

    if (!product) {
        return <div>Produit non trouvé.</div>;
    }

    const handleSizeClick = (size: any) => {
        setSelectedSize(size);
    };

    return (
        <MainLayout>
            <section className="w-full flex p-4">
                <div className="w-3/5 p-4"></div>
                <div className="w-2/5 p-4 space-y-4">
                    <h1>{product.name}</h1>
                    <div className="space-y-2 w-3/4">
                        {product.stock && product.stock > 0 ? (
                            <p>Stock : {product.stock} restants</p>
                        ) : (
                            <small className="text-destructive">
                                Rupture de stock
                            </small>
                        )}
                        <p className="font-bold">
                            {formatPrice(product.price, "EUR")}
                        </p>
                        <p>{product.shortDescription}</p>
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="space-y-1">
                                <p className="font-bold text-sm">Tailles :</p>
                                <ul className="flex gap-2">
                                    {product.sizes.map((size, index) => (
                                        <li
                                            key={index}
                                            className={`cursor-pointer flex justify-center items-center w-8 p-1 border ${
                                                selectedSize === size
                                                    ? "bg-primary text-white"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                handleSizeClick(size)
                                            }
                                        >
                                            {size}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="pt-2">
                        <AddToCartButton />
                    </div>
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
                </div>
            </section>
        </MainLayout>
    );
}
