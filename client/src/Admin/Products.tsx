import { readAllProducts } from "@/@redux/action/products.action";
import { RootState } from "@/@redux/store";
import PriceTag from "@/components/PriceTag";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hook";
import { formatDescription, formatLongueDescription } from "@/lib/format";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useEffect, useState } from "react";

export default function Products() {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!products.length && !loading && !error) {
      dispatch(readAllProducts());
    }
  }, [dispatch, products]);

  const productsByLetter: any = {};
  products.forEach((product) => {
    const firstLetter = product.name[0].toUpperCase();
    if (!productsByLetter[firstLetter]) {
      productsByLetter[firstLetter] = [];
    }
    productsByLetter[firstLetter].push(product);
  });

  const [showFullDescriptions, setShowFullDescriptions] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleDescription = (productId: number) => {
    setShowFullDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full flex justify-between overflow-y-auto h-full">
          <table className="w-full flex flex-col items-center justify-around space-y-2">
            <thead className="w-full">
              <tr className="w-full flex justify-between">
                <th className="w-5">Select</th>
                <th className="w-1/6">Nom</th>
                <th className="w-1/6">Categorie</th>
                <th className="w-2/6">Courte description</th>
                <th className="w-2/6">Longue description</th>
                <th className="w-1/6">stock</th>
                <th className="w-1/6">Prix</th>
              </tr>
            </thead>
            <Separator className="mx-20" />

            <tbody className="w-full flex flex-col items-center justify-center space-y-2">
              {products &&
                products.map((product) => (
                  <>
                    <tr
                      key={product.id}
                      className="w-full flex justify-between justify-center"
                    >
                      <td className="w-5 flex justify-center items-center">
                        <input type="checkbox" />
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        {product.name}
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        {product.category.name}
                      </td>
                      <td className="w-2/6 flex justify-center items-center px-2">
                        {product.shortDescription}
                      </td>
                      <td className="w-2/6 px-2">
                        {showFullDescriptions[product.id] ? (
                          <>
                            {product.longDescription}
                            <div
                              onClick={() => toggleDescription(product.id)}
                              className="cursor-pointer text-sm"
                            >
                              (Reduire)
                            </div>
                          </>
                        ) : (
                          <>
                            {formatLongueDescription(product.longDescription)}
                            <span
                              onClick={() => toggleDescription(product.id)}
                              className="cursor-pointer text-sm"
                            >
                              ... (Voir plus)
                            </span>
                          </>
                        )}
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        {product.stock}
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        <PriceTag price={product.price} />
                      </td>
                    </tr>
                    <Separator className="mx-20" />
                  </>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
