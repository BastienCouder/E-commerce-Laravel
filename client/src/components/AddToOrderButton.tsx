import { createOrderItem } from "@/@redux/action/order.action";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hook";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";

interface AddToOrderProps {
  cartId: number;
  deliveryItemId: number;
}
export default function AddToOrder({
  cartId,
  deliveryItemId,
}: AddToOrderProps) {
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddToOrderClick = async () => {
    dispatch(createOrderItem(cartId, deliveryItemId));
    return isPending;
  };

  return (
    <>
      <Button
        aria-label="Proceder au paiment"
        onClick={() => {
          startTransition(() => {
            handleAddToOrderClick();
            navigate("/thankYou");
          });
        }}
      >
        Paiement
      </Button>
    </>
  );
}
