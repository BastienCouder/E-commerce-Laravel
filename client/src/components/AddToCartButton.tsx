"use client";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  selectedSize: string | null;
  handleAddToCartClick(): any;
}

export default function AddToCartButton({
  selectedSize,
  handleAddToCartClick,
}: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <Button
        aria-label="Ajouter au panier"
        onClick={() => {
          startTransition(() => {
            handleAddToCartClick();
            toast.success("Produit ajouté avec succès");
          });
        }}
      >
        Ajouter au panier
      </Button>
    </>
  );
}
