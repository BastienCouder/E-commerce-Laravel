import { useEffect } from "react";
import { Cart } from "@/types/Cart";
import formatPrice from "@/lib/format";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hook";
import { RootState } from "@/@redux/store";
import {
  deleteCartItem,
  readCart,
  updateQuantity,
} from "@/@redux/action/cart.action";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector(
    (state: RootState) => state.cart
  );

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity(cartItemId, newQuantity));
    } else {
      dispatch(deleteCartItem(cartItemId));
    }
  };

  const handleDeleteCartItem = (cartItemId: number) => {
    dispatch(deleteCartItem(cartItemId));
  };

  useEffect(() => {
    if (!loading && !error && !cart) {
      dispatch(readCart());
    }
  }, [dispatch, loading, error, cart]);

  return (
    <div className="p-4 md:px-20 space-y-4">
      <h1>Panier</h1>

      <section className="flex gap-8">
        {cart && cart.cartItems ? (
          <>
            <ul className="flex flex-col gap-2 w-2/3">
              {cart.cartItems.map((cartItem) => (
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
                    <div className="flex flex-col gap-y-2">
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
                            handleUpdateQuantity(cartItem.id, newQuantity);
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
                      <Button
                        className="w-32"
                        onClick={() => handleDeleteCartItem(cartItem.id)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="w-1/3 h-36 p-4 space-y-4 border-2">
              {cart && cart.cart && (
                <>
                  <div className="flex flex-col">
                    <h2> Total :</h2>
                    <p className="font-semibold">
                      {formatPrice(cart.cart.total_price, "EUR")}
                    </p>
                  </div>
                </>
              )}
              <Button>Proceder au paiment</Button>
            </div>
          </>
        ) : (
          <div className="space-y-2">
            <p>Aucun produit dans le panier</p>
            <Button>
              <Link to="/"> Continuez mes achats</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
