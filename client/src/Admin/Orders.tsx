import React, { useEffect, useState } from "react";
import {
  readAllOrderItems,
  updateOrderItemStatus,
} from "@/@redux/action/orderItems.action";
import { RootState } from "@/@redux/store";
import { useAppDispatch, useAppSelector } from "@/hook";
import { Separator } from "@radix-ui/react-separator";
import formatPrice, { formatDate, formatDescription } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { baseUrl } from "@/lib/utils";

export default function Orders() {
  const dispatch = useAppDispatch();
  const { orderItems, loading, error } = useAppSelector(
    (state: RootState) => state.orderItem
  );

  useEffect(() => {
    if (!loading && !error && orderItems.length === 0) {
      dispatch(readAllOrderItems());
    }
  }, [dispatch, loading, error, orderItems]);

  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number | null>(
    null
  );

  const [editableStatus, setEditableStatus] = useState<string | number | null>(
    null
  );
  const handleEditSelected = (newStatus: string | number | null) => {
    setEditableStatus(newStatus);
  };
  return (
    <>
      <div className="w-[70rem] overflow-x  flex justify-between overflow-y-auto h-full">
        <table className="w-full flex flex-col items-center space-y-2">
          <thead className="w-full border-b-2 pb-2 border-secondary">
            <tr className="w-full flex justify-start">
              <th className="w-1/6">Numéro de commande</th>
              <th className="w-1/6">Nom</th>
              <th className="w-1/6">Status</th>
              <th className="w-1/6">Détails</th>
              <th className="w-1/6">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full flex flex-col items-center justify-center">
            {orderItems &&
              orderItems.map((orderItem, index) => {
                const dateString = orderItem.created_at;
                const dateValue = new Date(dateString);
                const formattedDate = formatDate(dateValue);
                const isOrderSelected = selectedOrderIndex === index;
                return (
                  <React.Fragment key={orderItem.id}>
                    <tr
                      className={`w-full py-2 flex justify-start ${
                        orderItem.status === "Livré" ? "bg-green-500/20" : ""
                      }`}
                    >
                      <td className="w-1/6 flex justify-center items-center">
                        {orderItem.order_number}
                      </td>
                      <td className="w-1/6 flex justify-center items-center capitalize">
                        {orderItem.delivery_item.name}{" "}
                        {orderItem.delivery_item.surname}
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        {editableStatus === String(index) ? (
                          <select
                            value={
                              editableStatus === String(index)
                                ? orderItem.status.toString()
                                : ""
                            }
                            onChange={(e) => {
                              const newStatus = e.target.value;
                              dispatch(
                                updateOrderItemStatus(orderItem.id, newStatus)
                              );
                              handleEditSelected(null);
                            }}
                            className="border-2 relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                            <option value="En attente">En attente</option>
                            <option value="Livré">Livré</option>
                          </select>
                        ) : (
                          <span>{orderItem.status}</span>
                        )}
                      </td>

                      <td className="w-1/6 flex justify-center items-center">
                        <Button
                          onClick={() => {
                            setSelectedOrderIndex(
                              selectedOrderIndex === index ? null : index
                            );
                          }}
                          className="cursor-pointer"
                        >
                          Voir le détail
                        </Button>
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        <Button
                          variant="secondary"
                          onClick={() => handleEditSelected(String(index))}
                        >
                          Modifier
                        </Button>
                      </td>
                    </tr>
                    <Separator className="mx-20" />

                    {isOrderSelected && (
                      <section className="w-1/2 my-4 border-2">
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
                            <h2 className="text-lg mt-8 pb-2">
                              Votre commande
                            </h2>
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
                                            src={`${baseUrl}/storage/${cartItem.product.image}`}
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
                      </section>
                    )}
                  </React.Fragment>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
