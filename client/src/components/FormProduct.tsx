// Importez les composants nécessaires du module de formulaire
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductSchema, ProductValues, defaultProductValues } from "@/lib/zod";
import { useAuth } from "@/context/authContext";
import { createProduct } from "@/@redux/action/product.action";
import { useAppDispatch } from "@/hook";
import { useCallback, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { $CombinedState } from "redux";
import axiosClient from "@/lib/axios-client";
import { Category } from "@/types/Product";

export default function FormProduct() {
  const { state } = useAuth();
  const dispatch = useAppDispatch();

  const form = useForm<ProductValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultProductValues,
  });

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

  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!state.user) {
      setError("Veuillez vous connecter");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.getValues("name")?.toString());
    formData.append("category_id", form.getValues("category_id")?.toString());
    formData.append(
      "shortDescription",
      form.getValues("shortDescription")?.toString()
    );
    formData.append(
      "longDescription",
      form.getValues("longDescription")?.toString()
    );
    formData.append("price", form.getValues("price")?.toString());
    formData.append("stock", form.getValues("stock")?.toString());

    const imageFile = form.getValues("image");
    formData.append("image", imageFile[0]);

    try {
      await dispatch(createProduct(formData));
      toggleFormVisibility();
      toast.success("Produit ajouté avec succès");
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const toggleFormVisibility = useCallback(async () => {
    setFormVisible(!formVisible);
  }, [formVisible]);

  return (
    <>
      <Button
        aria-label="Fermer ou Ajouter un produit"
        onClick={toggleFormVisibility}
        className="border-zinc-800 border-2"
      >
        {formVisible ? "Fermer" : "Ajouter un produit"}
      </Button>
      {formVisible && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full mt-4 space-y-2"
            encType="multipart/form-data"
          >
            {error ? <small className="text-red-500">{error}</small> : null}
            <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-24">
              {/* name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nom du produit*</FormLabel>
                    <FormControl>
                      <Input placeholder="Nom du produit" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* image */}
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Image*</FormLabel>
                    <FormControl>
                      <Input type="file" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* category_id */}
              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Catégorie*</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={String(category.id)}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12">
              {/* shortDescription */}
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description courte*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description courte" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* longDescription */}
              <FormField
                control={form.control}
                name="longDescription"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description longue*</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description longue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* price */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Prix*</FormLabel>
                    <FormControl>
                      <Input placeholder="Prix" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* stock */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Stock*</FormLabel>
                    <FormControl>
                      <Input placeholder="Stock" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-4">
              <Button aria-label="ajouter" type="submit">
                Ajouter un produit
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
