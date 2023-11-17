import {
  deleteDeliveryItem,
  readDelivery,
  updateDefaultDeliveryItem,
} from "@/@redux/action/delivery.action";
import FormDelivery from "@/components/FormDelivery";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import ErrorPage from "@/error-page";
import { useAppDispatch, useAppSelector } from "@/hook";
import Loading from "@/loading";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Delivery() {
  const { state } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { delivery, loading, error } = useAppSelector(
    (state) => state.delivery
  );

  if (error) {
    return <ErrorPage />;
  }

  const defaultDeliveryItem = delivery?.deliveryItems?.find(
    (item) => item.Default
  );

  const [selectedDeliveryItem, setSelectedDeliveryItem] = useState<
    string | undefined
  >(defaultDeliveryItem ? String(defaultDeliveryItem.id) : undefined);

  useEffect(() => {
    if (!loading && !error && !delivery) {
      dispatch(readDelivery());
    }
  }, [dispatch]);

  const handleDeliveryChange = (id: number | undefined) => {
    setSelectedDeliveryItem(id !== undefined ? String(id) : undefined);
    if (id !== undefined) {
      dispatch(updateDefaultDeliveryItem(id));
      toast.success("Adresse de livraison par défaut modifiée avec succès");
    }
  };

  const handleDeleteDeliveryItem = (id: number) => {
    dispatch(deleteDeliveryItem(id));
    toast.success("Adresse de livraison supprimé avec succès");
  };

  useEffect(() => {
    setSelectedDeliveryItem(
      defaultDeliveryItem ? String(defaultDeliveryItem.id) : undefined
    );
  }, [delivery]);

  const handleSubmit = () => {
    console.log("click");

    if (!state.user) {
      toast.error("Veuillez vous connecter");
      return;
    } else if (selectedDeliveryItem) {
      navigate("/summary");
    } else {
      toast.error("Ajouter une adresse de livraison");
    }
  };

  return (
    <div className="p-4 md:px-20 space-y-2">
      <h1>Livraison</h1>
      <section className="flex w-full">
        <div className="md:w-1/2 space-y-4">
          <FormDelivery />
          <div className="w-[20rem]">
            <ul className="space-y-4 w-full md:w-[35rem]">
              {delivery?.deliveryItems ? (
                delivery.deliveryItems.map((deliveryItem) => (
                  <li
                    key={deliveryItem.id}
                    className="overflow-x-auto flex text-sm border-2 px-8 py-6 border-primary"
                  >
                    <div className="w-60">
                      <div className="flex flex-col font-bold">
                        <div className="capitalize flex space-x-2">
                          <p>{deliveryItem.name}</p>
                          <p>{deliveryItem.surname}</p>
                        </div>
                        <p>{deliveryItem.email}</p>
                      </div>
                      <p className="uppercase">{deliveryItem.address_1}</p>
                      <p className="uppercase">{deliveryItem.address_2}</p>
                      <div className="flex">
                        <p className="flex gap-2">
                          <span className="uppercase">
                            {deliveryItem.city}, {deliveryItem.zipcode},
                          </span>
                          {deliveryItem.country}
                        </p>
                      </div>
                      <p>{deliveryItem.phone}</p>
                    </div>
                    <div className="pl-12 space-y-4">
                      <div className="flex gap-x-4">
                        <div
                          onClick={() => handleDeliveryChange(deliveryItem.id)}
                          className={`mb-2 h-4 w-4 border-2 border-primary cursor-pointer ${
                            selectedDeliveryItem === String(deliveryItem.id)
                              ? "bg-primary"
                              : ""
                          }`}
                        ></div>
                        {selectedDeliveryItem === String(deliveryItem.id)
                          ? "Adresse par défaut"
                          : ""}
                      </div>
                      <p
                        onClick={() =>
                          handleDeleteDeliveryItem(deliveryItem.id)
                        }
                        className="text-red-600 cursor-pointer w-28 px-3 py-2 border-[1px] border-red-600"
                      >
                        Supprimer
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <div className="h-[12rem]"></div>
              )}
            </ul>
          </div>
          {delivery?.deliveryItems && delivery.deliveryItems.length > 0 ? (
            <Button aria-label="Valider" onClick={handleSubmit}>
              Valider
            </Button>
          ) : null}
        </div>
      </section>
    </div>
  );
}
