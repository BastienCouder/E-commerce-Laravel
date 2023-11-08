"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {}

export default function AddToCartButton({}: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();

    return (
        <>
            <Button
                aria-label="Ajouter au panier"
                onClick={() => {
                    startTransition(() => {
                        toast.success("Produit ajouté avec succès");
                    });
                }}
            >
                Ajouter au panier
            </Button>
        </>
    );
}
