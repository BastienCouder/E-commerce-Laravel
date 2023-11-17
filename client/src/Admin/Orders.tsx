import { readAllOrderItems } from "@/@redux/action/order.action";
import { RootState } from "@/@redux/store";
import { useAppDispatch, useAppSelector } from "@/hook";
import formatPrice, { formatDate, formatDescription } from "@/lib/format";
import { useEffect, useState } from "react";

export default function Orders() {
  const dispatch = useAppDispatch();
  const { order, loading, error } = useAppSelector(
    (state: RootState) => state.order
  );

  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    if (!loading && !error && !order) {
      dispatch(readAllOrderItems());
    }
  }, [dispatch, loading, error, order]);
  console.log(order);

  return (
    <>
      <div className="w-full flex justify-between overflow-y-auto h-full">
        <table className="w-full flex flex-col items-center justify-around space-y-2">
          <thead className="w-full border-b-2 pb-2 border-secondary">
            <tr className="w-full flex justify-start">
              <th className="w-1/6">Numéro de commande</th>
              <th className="w-1/6">Nom</th>
              <th className="w-1/6">status</th>
            </tr>
          </thead>
        </table>
      </div>

      <ul className="space-y-8">
        {order?.orderItems &&
          order.orderItems.map((orderItem, index) => {
            const dateString = orderItem.created_at;
            const dateValue = new Date(dateString);
            const formattedDate = formatDate(dateValue);
            const isOrderSelected = selectedOrderIndex === index;

            return (
              <li key={index} className="w-[40rem] border-[1px] border-primary">
                {!isOrderSelected ? (
                  <>
                    <div className="flex items-center h-10 px-4 py-2 w-full bg-primary">
                      <p className="font-bold uppercase text-sm text-white">
                        Commande n°{orderItem.order_number}
                      </p>
                    </div>

                    <div className="px-4 pb-4 w-32">
                      <p
                        onClick={() => {
                          if (isOrderSelected) {
                            setSelectedOrderIndex(null);
                          } else {
                            setSelectedOrderIndex(index);
                          }
                        }}
                        className="cursor-pointer"
                      >
                        Voir le détail
                      </p>
                    </div>
                  </>
                ) : null}

                {isOrderSelected && (
                  <div>
                    <div className="flex flex-col justify-center h-20 gap-1 px-4 py-2 w-full bg-primary text-white">
                      <p className="font-bold uppercase text-sm">
                        Commande n°{orderItem.order_number}
                      </p>
                      <p className="text-sm flex gap-2">
                        Date de la commande:
                        <span className="font-bold">{formattedDate}</span>
                      </p>
                    </div>
                    <div className="p-4">
                      <h2 className="text-lg pb-2">Adresse de livraison</h2>
                      {isOrderSelected && orderItem.delivery_item! && (
                        <div className="text-sm border-b-2 pb-8 border-primary">
                          <div className="font-bold capitalize flex space-x-2">
                            <p>{orderItem.delivery_item.name}</p>
                            <p>{orderItem.delivery_item.surname}</p>
                          </div>
                          <p className="uppercase">
                            {orderItem.delivery_item.address_1}
                          </p>
                          <p className="uppercase">
                            {orderItem.delivery_item.address_2}
                          </p>
                          <div className="flex">
                            <p className="flex gap-2">
                              <span className="uppercase">
                                {orderItem.delivery_item.city},
                                {orderItem.delivery_item.zipcode},
                              </span>
                              {orderItem.delivery_item.country}
                            </p>
                          </div>
                          <p>{orderItem.delivery_item.phone}</p>
                        </div>
                      )}

                      <div className=" border-b-2 border-zinc-800">
                        <h2 className="text-lg mt-8 pb-2">Votre commande</h2>
                        {isOrderSelected &&
                          orderItem.cart.cart_items! &&
                          orderItem.cart.cart_items.map(
                            (cartItem, itemIndex) => {
                              const description = `${cartItem.product.shortDescription}`;
                              const formattedDescription =
                                formatDescription(description);
                              return (
                                <>
                                  <div
                                    key={itemIndex}
                                    className="flex flex-row-reverse justify-end gap-4 text-sm pb-8"
                                  >
                                    <figure className="flex w-full">
                                      <img
                                        src={cartItem.product.image}
                                        alt={cartItem.product.name}
                                        width={400}
                                        height={400}
                                        className="rounded-lg w-[90px] h-[90px] object-contain"
                                      />
                                    </figure>
                                    <div className="flex flex-col space-y-1">
                                      <p className="font-bold flex items-center gap-2">
                                        {cartItem.product.name}
                                      </p>
                                      <p className="w-full text-sm">
                                        {formattedDescription}
                                      </p>
                                      <p className="uppercase">
                                        {formatPrice(
                                          cartItem.product.price,
                                          "EUR"
                                        )}
                                      </p>
                                      <p className="capitalize flex gap-2">
                                        {cartItem.quantity > 1
                                          ? `quantités`
                                          : `quantité`}
                                        <span>{cartItem.quantity}</span>
                                      </p>
                                    </div>
                                  </div>
                                </>
                              );
                            }
                          )}
                      </div>
                      <div className="flex flex-col gap-4 text-sm border-b-2 pb-8 border-zinc-800">
                        <h2 className="text-lg mt-8 pb-2">
                          Total de votre commande
                        </h2>
                        <div className="flex justify-between w-40">
                          <p>Prix total:</p>
                          {formatPrice(orderItem.total_price, "EUR")}
                        </div>
                      </div>
                      <div className="mt-8 pb-4">
                        <p
                          onClick={() => {
                            if (isOrderSelected) {
                              setSelectedOrderIndex(null);
                            } else {
                              setSelectedOrderIndex(index);
                            }
                          }}
                          className="cursor-pointer"
                        >
                          Fermer le détail
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
      </ul>
    </>
  );
}
