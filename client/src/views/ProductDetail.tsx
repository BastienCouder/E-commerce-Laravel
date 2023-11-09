import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "@/data";

import formatPrice from "@/lib/format";
import AddToCartButton from "@/components/AddToCartButton";
import { Skeleton } from "@/components/ui/skeleton";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MainLayout from "@/layout/MainLayout";

export default function ProductDetail() {
    const { categorySlug, productId } = useParams();
    const [isLoading, setIsLoading] = useState(true);

    let product = null;
    if (productId) {
        product = products.find(
            (p) =>
                p.category === categorySlug && p.id === parseInt(productId, 10)
        );
    }

    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleSizeClick = (size: any) => {
        setSelectedSize(size);
    };

    const handleAddToCartClick = () => {
        if (!selectedSize) {
            // Aucune taille n'est sélectionnée, affiche une erreur
            alert("Veuillez sélectionner une taille avant d'ajouter au panier");
            return;
        }
    };

    if (!product) {
        setIsLoading(true);
        return;
    }

    return (
        <>
            <section className="w-full flex p-4">
                <div className="w-3/5 p-4">
                    {isLoading ? (
                        <div className="flex space-x-4">
                            <Skeleton className="min-w-[200px] w-full xl:w-1/2 min-h-[400px]" />
                            <Skeleton className="min-w-[200px] w-full xl:w-1/2 min-h-[400px]" />
                        </div>
                    ) : (
                        <div className="w-full flex flex-wrap xl:flex-nowrap gap-4">
                            <div className="min-w-[200px] w-full xl:w-1/2 bg-primary min-h-[400px]"></div>
                            <div className="min-w-[200px] w-full xl:w-1/2 bg-primary min-h-[400px]"></div>
                        </div>
                    )}
                </div>
                <div className="w-2/5 p-4 space-y-4">
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
                                            <p className="font-bold text-sm">
                                                Stock :
                                            </p>
                                            <p>{product.stock} restants</p>
                                        </div>
                                    </>
                                ) : (
                                    <small className="text-destructive">
                                        Rupture de stock
                                    </small>
                                )}
                            </>
                        )}
                        {isLoading ? (
                            <Skeleton className="w-1/3 h-6" />
                        ) : (
                            <p className="font-bold">
                                {formatPrice(product.price, "EUR")}
                            </p>
                        )}
                        {isLoading ? (
                            <Skeleton className="w-full h-8" />
                        ) : (
                            <p>{product.shortDescription}</p>
                        )}
                        {isLoading ? (
                            <Skeleton className="w-full h-12" />
                        ) : (
                            <>
                                {product.sizes && product.sizes.length > 0 && (
                                    <div className="space-y-1">
                                        <p className="font-bold text-sm">
                                            Tailles :
                                        </p>
                                        <ul className="flex gap-2">
                                            {product.sizes.map(
                                                (size, index) => (
                                                    <li
                                                        key={index}
                                                        className={`cursor-pointer flex justify-center items-center w-8 p-1 border ${
                                                            selectedSize ===
                                                            size
                                                                ? "bg-primary text-white"
                                                                : ""
                                                        }`}
                                                        onClick={() =>
                                                            handleSizeClick(
                                                                size
                                                            )
                                                        }
                                                    >
                                                        {size}
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="pt-2">
                        {isLoading ? (
                            <Skeleton className="w-1/3 h-10" />
                        ) : (
                            <AddToCartButton
                                handleAddToCartClick={handleAddToCartClick}
                                selectedSize={selectedSize}
                            />
                        )}
                    </div>
                    {isLoading ? (
                        <Skeleton className="w-3/4 h-10" />
                    ) : (
                        <div className="w-3/4">
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        Description
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {product.longDescription}
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
