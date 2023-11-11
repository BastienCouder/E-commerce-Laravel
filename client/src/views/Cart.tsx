import { useState, useEffect } from "react";
import axiosClient from "@/lib/axios-client";
import { Cart } from "@/types/Cart";
import { authToken } from "@/lib/token";
import formatPrice from "@/lib/format";
import { Button } from "@/components/ui/button";
export default function Cart() {
  const [cartData, setCartData] = useState<Cart | null>(null);

  const updateQuantity = async (cartItemId: number, newQuantity: number) => {
    try {
      const response = await axiosClient.put(
        `/cart/update-quantity/${cartItemId}`,
        {
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log(response.data);
    } catch (error: any) {
      console.error(
        "Erreur lors de la mise à jour de la quantité :",
        error.message
      );
    }
  };

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axiosClient.get<Cart>("/cart", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setCartData(response.data);
      } catch (error: any) {
        console.error("Erreur lors de la requête GET :", error.message);
      }
    };

    fetchCartData();
  }, []);

  return (
    <div className="p-4 md:px-20 space-y-4">
      <h1>Panier</h1>
      <section className="flex gap-8">
        {cartData ? (
          <ul className="flex flex-col gap-2 w-2/3">
            {cartData.cartItems.map((cartItem) => (
              <li key={cartItem.id} className="p-4 border-2">
                <div>
                  <h2>{cartItem.product.name}</h2>
                </div>
                <div className="flex gap-x-8">
                  <figure className="flex justify-center items-center h-[180px] w-[180px] object-contain">
                    <img
                      src={cartItem.product.image}
                      alt={cartItem.product.name}
                    />
                  </figure>
                  <div className="space-y-2">
                    <p>{cartItem.product.shortDescription}</p>
                    <div className="flex gap-x-2">
                      <p>Prix:</p>
                      <p className="font-semibold">
                        {formatPrice(cartItem.product.price, "EUR")}
                      </p>
                    </div>
                    <div className="flex gap-x-2">
                      <p>Quantité:</p>
                      <input
                        type="number"
                        value={cartItem.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value, 10);
                          updateQuantity(cartItem.id, newQuantity);
                        }}
                      />
                    </div>

                    <div className="flex gap-x-2">
                      <p>Prix total:</p>
                      <p className="font-semibold">
                        {formatPrice(
                          cartItem.product.price * cartItem.quantity,
                          "EUR"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Chargement du panier...</p>
        )}
        <div className="w-1/3 h-36 p-4 space-y-4 border-2">
          {cartData && (
            <>
              <div className="flex flex-col">
                <h2> Total :</h2>
                <p className="font-semibold">
                  {formatPrice(cartData.cart.total_price, "EUR")}
                </p>
              </div>
            </>
          )}
          <Button>Proceder au paiment</Button>
        </div>
      </section>
    </div>
  );
}
