import { updateQuantity } from "@/@redux/action/product.action";
import { readAllProducts } from "@/@redux/action/products.action";
import { RootState } from "@/@redux/store";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/hook";
import { Separator } from "@radix-ui/react-separator";
import { Minus, Plus } from "lucide-react";
import React, { useEffect } from "react";

export default function Inventory() {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!products.length && !loading && !error) {
      dispatch(readAllProducts());
    }
  }, [dispatch, products]);

  const handleUpdateQuantity = (cartItemId: number, newQuantity: number) => {
    if (cartItemId && newQuantity) {
      console.log(newQuantity);
      console.log(cartItemId);

      dispatch(updateQuantity(cartItemId, newQuantity));
    } else {
      console.error("Une erreur s'est produite");
    }
  };

  return (
    <>
      <div className="w-[70rem] overflow-x  flex justify-between overflow-y-auto h-full">
        <table className="w-full flex flex-col items-center space-y-2">
          <thead className="w-full border-b-2 pb-2 border-secondary">
            <tr className="w-full flex justify-start">
              <th className="w-1/6">ID</th>
              <th className="w-1/6">Nom</th>
              <th className="w-1/6">stock</th>
            </tr>
          </thead>

          <tbody className="w-full flex flex-col items-center justify-center space-y-2">
            {products &&
              products.map((product) => (
                <React.Fragment key={product.id}>
                  <tr className="w-full flex justify-start">
                    <td className="w-1/6 flex justify-center items-center">
                      {product.id}
                    </td>
                    <td className="w-1/6 flex justify-center items-center">
                      {product.name}
                    </td>
                    <td className="w-1/6 flex justify-center items-center space-x-2">
                      <Button
                        className="flex justify-center items-center h-5 w-4"
                        onClick={() =>
                          handleUpdateQuantity(product.id, product.stock - 1)
                        }
                      >
                        <div>
                          <Minus size={12} color="#ffffff" />
                        </div>
                      </Button>
                      <span> {product.stock}</span>
                      <Button
                        className="flex justify-center items-center h-5 w-4"
                        onClick={() =>
                          handleUpdateQuantity(product.id, product.stock + 1)
                        }
                      >
                        <div>
                          <Plus size={12} color="#ffffff" />
                        </div>
                      </Button>
                    </td>
                  </tr>
                  <Separator className="mx-20" />
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
