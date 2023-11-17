import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { readAllProducts } from "@/@redux/action/products.action";
import { RootState } from "@/@redux/store";
import PriceTag from "@/components/PriceTag";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useAppDispatch, useAppSelector } from "@/hook";
import { formatLongueDescription } from "@/lib/format";
import { Category } from "@/types/Product";

import React, { useEffect, useState } from "react";
import { deleteProduct, updateProduct } from "@/@redux/action/product.action";
import axiosClient from "@/lib/axios-client";

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

  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [showFullDescriptions, setShowFullDescriptions] = useState<{
    [key: number]: boolean;
  }>({});
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editedFields, setEditedFields] = useState<{
    [key: number]: Partial<any>;
  }>({});
  const toggleDescription = (productId: number) => {
    setShowFullDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedValueOption, setSelectedValueOption] = useState<
    boolean | null
  >(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosClient.get("/category");
        setCategories(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteCanceled = () => {
    setSelectedProducts([]);
  };

  const handleDeleteConfirmed = () => {
    selectedProducts.forEach((productId) => {
      dispatch(deleteProduct(productId));
    });
    setSelectedProducts([]);
    setEditMode(null);
    setEditedFields({});
  };

  const handleEditSelected = () => {
    if (selectedProducts.length > 0) {
      setSelectedProducts([selectedProducts[0]]);
      setEditMode(selectedProducts[0]);
      setEditedFields({});
    }
  };

  const handleSaveChanges = () => {
    if (editMode !== null) {
      const productId = selectedProducts[0];
      const productData = { ...editedFields[productId] };

      if (productId !== undefined && productData !== undefined) {
        dispatch(updateProduct(productId, productData));
        setEditMode(null);
        setSelectedProducts([]);
        setEditedFields({});
      } else {
        console.error("Erreur: productId ou productData est undefined");
      }
    }
  };
  const handleCheckboxChange = (productId: number) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    } else {
      setSelectedProducts((prev) => [...prev, productId]);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    productId: number,
    field: string
  ) => {
    let value: any = e.target.value;

    setEditedFields((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleCategorySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = parseInt(e.target.value, 10);
    setEditedFields((prev) => ({
      ...prev,
      [selectedProducts[0]]: {
        ...prev[selectedProducts[0]],
        category_id: categoryId,
      },
    }));

    setSelectedCategory(categoryId);
  };

  const handleValueSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const parsedValue = e.target.value === "true";
    setEditedFields((prev) => ({
      ...prev,
      [selectedProducts[0]]: {
        ...prev[selectedProducts[0]],
        value: parsedValue,
      },
    }));
    setSelectedValueOption(parsedValue);
  };

  return (
    <>
      <div className="w-[70rem] overflow-x space-y-4">
        <div className="space-x-4">
          <Button variant="secondary" onClick={() => handleEditSelected()}>
            Modifier
          </Button>
          {!editMode && (
            <AlertDialog>
              <AlertDialogTrigger>
                <Button variant="secondary" disabled={editMode !== null}>
                  Supprimer
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Cette action ne peut pas être annulée.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={handleDeleteCanceled}>
                    Annuler
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteConfirmed}>
                    Continuer
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
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
                <th className="w-1/6">Mise en avant</th>
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
                            className={`${editMode !== null ? "disabled" : ""}`}
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
                          <select
                            value={selectedCategory ?? ""}
                            onChange={handleCategorySelect}
                            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                            {categories.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          product.category?.name
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
                          <select
                            value={
                              selectedValueOption === true ? "true" : "false"
                            }
                            onChange={handleValueSelect}
                            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                          >
                            <option value="true">Oui</option>
                            <option value="false">Non</option>
                          </select>
                        ) : product.value ? (
                          "Oui"
                        ) : (
                          "Non"
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
}
