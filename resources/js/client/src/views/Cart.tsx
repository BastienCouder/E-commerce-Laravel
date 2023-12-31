import { useEffect, useState } from "react";
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
import { Minus, Plus } from "lucide-react";
import ErrorPage from "@/error-page";
import { Skeleton } from "@/components/ui/skeleton";
import Loading from "@/loading";
import { useAuth } from "@/context/authContext";
import { baseUrl } from "@/lib/utils";

export default function Cart() {
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useAuth();
  const dispatch = useAppDispatch();
  const { cart, loading, error } = useAppSelector(
    (state: RootState) => state.cart
  );

  if (error) {
    <ErrorPage />;
  }

  if (loading) {
    <Loading />;
  }

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity(cartItemId, newQuantity));
    } else {
      dispatch(deleteCartItem(cartItemId, state.user));
    }
  };

  const handleDeleteCartItem = (cartItemId: number) => {
    dispatch(deleteCartItem(cartItemId, state.user));
  };

  useEffect(() => {
    if (!loading && !error && !cart) {
      dispatch(readCart());
    } else {
      setIsLoading(true);
    }
  }, [dispatch, loading, error, cart]);

  return (
    <div className="p-4 md:px-20 space-y-4">
      <h1>Panier</h1>

      <section className="flex flex-col md:flex-row gap-4 md:gap-8">
        {cart && cart.cartItems && cart.cartItems.length > 0 ? (
          <>
            <ul className="flex flex-col gap-2 md:w-2/3">
              {cart.cartItems.map((cartItem) => (
                <li key={cartItem.id} className="p-4 border-2">
                  <>
                    <div>
                      <h2>{cartItem.product?.name}</h2>
                    </div>
                    <div className="flex gap-x-8">
                      <figure className="flex justify-center items-center h-[180px] w-[180px] object-contain">
                        <img
                          src={`${baseUrl}/storage/${cartItem.product.image}`}
                          alt={cartItem.product?.name}
                          className="rounded-lg w-[140px] h-[140px] object-contain"
                        />
                      </figure>
                      <div className="flex flex-col gap-y-2">
                        <p>{cartItem.product?.shortDescription}</p>
                        <div className="flex gap-x-2">
                          <p>Prix:</p>
                          <p className="font-semibold">
                            {formatPrice(cartItem.product?.price, "EUR")}
                          </p>
                        </div>
                        <div className="flex gap-x-2">
                          <p>
                            {cartItem.quantity > 1 ? "Quantités" : "Quantité"}:
                          </p>
                          <div className="flex gap-2 items-center">
                            <Button
                              className="flex justify-center items-center h-5 w-4"
                              onClick={() =>
                                handleUpdateQuantity(
                                  cartItem.id,
                                  cartItem.quantity - 1
                                )
                              }
                            >
                              <div>
                                <Minus size={12} color="#ffffff" />
                              </div>
                            </Button>
                            <span>{cartItem.quantity}</span>
                            <Button
                              className="flex justify-center items-center h-5 w-4"
                              onClick={() =>
                                handleUpdateQuantity(
                                  cartItem.id,
                                  cartItem.quantity + 1
                                )
                              }
                            >
                              <div>
                                <Plus size={12} color="#ffffff" />
                              </div>
                            </Button>
                          </div>
                        </div>

                        <div className="flex gap-x-2">
                          <p>Prix total:</p>
                          <p className="font-semibold">
                            {formatPrice(
                              cartItem.product?.price * cartItem.quantity,
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
                  </>
                </li>
              ))}
            </ul>

            <div className="w-1/3 h-36 p-4 space-y-4 border-2">
              {isLoading ? (
                <>
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
                  <Button>
                    <Link to="/delivery">Suivant</Link>
                  </Button>
                </>
              ) : (
                <div className="flex flex-col space-y-4">
                  <Skeleton className="w-full xl:w-1/2 h-6" />
                  <Skeleton className="w-full xl:w-1/2 h-12" />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="h-[16rem] space-y-2">
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
