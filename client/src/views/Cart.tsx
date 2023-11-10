import { useState, useEffect } from "react";
import axiosClient from "@/lib/axios-client";
import { Cart } from "@/types/Cart";
export default function Cart() {
  const [cartData, setCartData] = useState<Cart | null>(null);

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        // Remplacez '/votre-endpoint-de-recuperation-du-panier' par le chemin correct de votre API
        const response = await axiosClient.get<Cart>("/cart");
        console.log(cartData);

        // Utilisez les données de la réponse si nécessaire
        setCartData(response.data);
      } catch (error: any) {
        console.error("Erreur lors de la requête GET :", error.message);
        // Gestion des erreurs
      }
    };

    fetchCartData();
  }, []); // Le tableau vide [] signifie que useEffect s'exécutera une seule fois après le montage initial du composant

  // Rendre votre composant en utilisant les données du panier
  return (
    <div>
      {cartData ? (
        <div>
          {/* Utilisez les données du panier pour afficher son contenu */}
          <h2>Contenu du panier</h2>
          <p>Cart ID: {cartData.id}</p>
          {/* Ajoutez d'autres éléments du panier selon vos besoins */}
        </div>
      ) : (
        <p>Chargement du panier...</p>
      )}
    </div>
  );
}
