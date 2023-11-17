import { readAllProducts } from "@/@redux/action/products.action";
import { RootState } from "@/@redux/store";
import PriceTag from "@/components/PriceTag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hook";
import { formatDescription, formatLongueDescription } from "@/lib/format";
import { Category, Product } from "@/types/Product";

import React, { useEffect, useState } from "react";

const Products = () => {
  const dispatch = useAppDispatch();

  const { products, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    if (!products.length && !loading && !error) {
      dispatch(readAllProducts());
    }
  }, [dispatch, products]);

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showFullDescriptions, setShowFullDescriptions] = useState<{
    [key: number]: boolean;
  }>({});
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedFields, setEditedFields] = useState<{
    [key: number]: Partial<Product>;
  }>({});
  const toggleDescription = (productId: number) => {
    setShowFullDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleDeleteSelected = () => {
    if (
      window.confirm(
        "Êtes-vous sûr de vouloir supprimer les produits sélectionnés?"
      )
    ) {
      console.log(
        `Supprimer les produits avec les ID ${selectedProducts.join(", ")}`
      );
      setSelectedProducts([]);
    }
  };

  const handleEditSelected = () => {
    setEditMode(selectedProducts.length > 0 ? selectedProducts[0] : null);
    setEditedFields({});
  };

  const handleSaveChanges = () => {
    console.log("Sauvegarder les modifications :", editedFields);
    // Ajoutez la logique pour sauvegarder les modifications dans votre backend
    // Réinitialisez le mode d'édition et les champs modifiés
    setEditMode(null);
    setSelectedProducts([]);
    setEditedFields({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    productId: number,
    field: string
  ) => {
    setEditedFields((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: e.target.value,
      },
    }));
  };

  const handleCheckboxChange = (productId: number) => {
    setSelectedProducts((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  return (
    <>
      <div className="w-full space-y-4">
        <div className="space-x-4">
          <Button variant="secondary" onClick={() => handleEditSelected()}>
            Modifier
          </Button>
          <Button variant="secondary" onClick={() => handleDeleteSelected()}>
            Supprimer
          </Button>
          {editMode && (
            <Button variant="secondary" onClick={() => handleSaveChanges()}>
              Enregistrer
            </Button>
          )}
        </div>
        <div className="w-full flex justify-between overflow-y-auto h-full">
          <table className="w-full flex flex-col items-center justify-around space-y-2">
            <thead className="w-full">
              <tr className="w-full flex justify-between">
                <th className="w-15">Select</th>
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
                  <React.Fragment key={product.id}>
                    <tr className="w-full flex justify-between justify-center">
                      <td className="w-10 mr-5 flex justify-center items-center">
                        <div>
                          <input
                            type="checkbox"
                            className="w-4 h-4 border-2 border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                            id={`select-${product.id}`}
                            checked={selectedProducts.includes(product.id)}
                            onChange={() => handleCheckboxChange(product.id)}
                          />
                        </div>
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        {editMode === product.id ? (
                          <Input
                            className="w-32"
                            value={
                              editedFields[product.id]?.name ?? product.name
                            }
                            onChange={(e) =>
                              handleInputChange(e, product.id, "name")
                            }
                          />
                        ) : (
                          product.name
                        )}
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        {editMode === product.id ? (
                          <Input
                            className="w-32"
                            value={
                              (editedFields[product.id]?.category as
                                | string
                                | undefined) ?? product.category.name
                            }
                            onChange={(e) =>
                              handleInputChange(e, product.id, "category")
                            }
                          />
                        ) : (
                          product.category.name
                        )}
                      </td>
                      <td className="w-2/6 flex justify-center items-center px-2">
                        {editMode === product.id ? (
                          <Textarea
                            value={
                              editedFields[product.id]?.shortDescription ??
                              product.shortDescription
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                product.id,
                                "shortDescription"
                              )
                            }
                          />
                        ) : (
                          product.shortDescription
                        )}
                      </td>
                      <td className="w-2/6 px-2">
                        {editMode === product.id ? (
                          <Textarea
                            value={
                              editedFields[product.id]?.longDescription ??
                              product.longDescription
                            }
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                product.id,
                                "longDescription"
                              )
                            }
                          />
                        ) : showFullDescriptions[product.id] ? (
                          <>
                            {product.longDescription}
                            <div
                              onClick={() => toggleDescription(product.id)}
                              className="cursor-pointer text-sm"
                            >
                              (Réduire)
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
                        {editMode === product.id ? (
                          <Input
                            className="w-24"
                            value={
                              editedFields[product.id]?.stock ?? product.stock
                            }
                            onChange={(e) =>
                              handleInputChange(e, product.id, "stock")
                            }
                          />
                        ) : (
                          product.stock
                        )}
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        {editMode === product.id ? (
                          <Input
                            className="w-24"
                            value={
                              editedFields[product.id]?.price ?? product.price
                            }
                            onChange={(e) =>
                              handleInputChange(e, product.id, "price")
                            }
                          />
                        ) : (
                          <PriceTag price={product.price} />
                        )}
                      </td>
                    </tr>
                    <Separator className="mx-20" />
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Products;
