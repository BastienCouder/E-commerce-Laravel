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
import { Category, Product } from "@/types/Product";

import React, { useEffect, useState } from "react";
import { deleteProduct, updateProduct } from "@/@redux/action/product.action";
import axiosClient from "@/lib/axios-client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";

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
    [key: number]: Partial<Product>;
  }>({});
  const toggleDescription = (productId: number) => {
    setShowFullDescriptions((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

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
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

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
      setSelectedProducts([]);
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
    setEditedFields((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: e.target.value,
      },
    }));
  };

  return (
    <>
      <div className="w-full space-y-4">
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
                          <Select>
                            <SelectTrigger className="w-[160px]">
                              <SelectValue
                                placeholder={product.category.name}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={String(category.id)}
                                    onSelect={() =>
                                      handleCategorySelect(String(category.id))
                                    }
                                  >
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
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
}
