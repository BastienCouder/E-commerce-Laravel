import { readCart } from "@/@redux/action/cart.action";
import { readDelivery } from "@/@redux/action/delivery.action";
import { RootState } from "@/@redux/store";
import AddToOrder from "@/components/AddToOrderButton";
import { useAppDispatch, useAppSelector } from "@/hook";
import formatPrice, { formatDescription } from "@/lib/format";
import { useEffect, useState } from "react";

export default function Summary() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const {
    cart,
    loading: loadingCart,
    error: errorCart,
  } = useAppSelector((state: RootState) => state.cart);

  const {
    delivery,
    loading: loadingDelivery,
    error: errorDelivery,
  } = useAppSelector((state: RootState) => state.delivery);

  let deliveryItem = null;
  if (delivery) {
    deliveryItem = delivery.deliveryItems.find((item) => item.Default);
  }

  useEffect(() => {
    if (
      !loadingCart &&
      !errorCart &&
      !loadingDelivery &&
      !errorDelivery &&
      !cart &&
      !delivery
    ) {
      dispatch(readCart());
      dispatch(readDelivery());
    } else {
      setIsLoading(true);
    }
  }, [
    dispatch,
    loadingCart,
    errorCart,
    loadingDelivery,
    errorDelivery,
    cart,
    delivery,
  ]);

  return (
    <>
      <div className="p-4 md:px-20 space-y-2">
        <h1>Récapitulatif</h1>
        <section className="space-y-8 border-2 border-primary p-4">
          <article className="border-b-2 pb-8 border-primary">
            <h2 className="text-xl">
              {cart && cart.cartItems.length > 1 ? "Produits" : "Produit"}
            </h2>
            <ul className="mt-4 flex flex flex-col justify-center md:justify-start md:flex-row flex-wrap gap-8 md:gap-4 w-full">
              {cart &&
                cart.cartItems.map((cartItem) => (
                  <li key={cartItem.id} className="md:w-1/4 space-y-2">
                    <div className="flex w-full">
                      <img
                        src={cartItem.product.image}
                        alt={cartItem.product.name}
                        className="rounded-lg w-[70px] h-[70px] object-contain"
                      />
                    </div>
                    <div className="flex flex-col space-y-1 text-sm">
                      <p className="font-bold flex Item-center gap-2">
                        {cartItem.product.name}
                      </p>
                      <p className="w-full">
                        {formatDescription(cartItem.product.shortDescription)}
                      </p>
                      <p>{formatPrice(cartItem.product.price, "EUR")}</p>
                      <p className="capitalize flex gap-2">
                        {cartItem.quantity > 1 ? `quantités` : `quantité`}
                        <span>{cartItem.quantity}</span>
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </article>
          <article className="space-y-2">
            <h2 className="text-xl">Adresse de livraison</h2>
            <div className="text-sm border-b-2 pb-8 border-primary">
              {deliveryItem && (
                <>
                  <div className="font-bold capitalize flex space-x-2">
                    <p>{deliveryItem.name}</p>
                    <p>{deliveryItem.surname}</p>
                  </div>
                  <p className="uppercase">{deliveryItem.address_1}</p>
                  <p className="uppercase">{deliveryItem.address_2}</p>
                  <div className="flex">
                    <p className="flex gap-2">
                      <span className="uppercase">
                        {deliveryItem.city},{deliveryItem.zipcode},
                      </span>
                      {deliveryItem.country}
                    </p>
                  </div>
                  <p>{deliveryItem.phone}</p>
                </>
              )}
            </div>
          </article>
          <div>
            {cart && deliveryItem && (
              <AddToOrder
                cartId={cart.cart.id}
                deliveryItemId={deliveryItem.id}
              />
            )}
          </div>
        </section>
      </div>
    </>
  );
}
