"use client";
import { createCartItem } from "@/@redux/action/cart.action";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hook";
import { useTransition } from "react";
import { toast } from "sonner";

interface AddToCartButtonProps {
  productId: string;
}

export default function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();

  const handleAddToCartClick = async () => {
    // if (selectedSize === null) {
    //   // Aucune taille n'est sélectionnée, affiche une erreur
    //   alert("Veuillez sélectionner une taille avant d'ajouter au panier");
    //   return;
    // }
    dispatch(createCartItem(productId));
  };

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
