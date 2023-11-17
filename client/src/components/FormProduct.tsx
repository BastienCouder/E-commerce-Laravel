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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ProductSchema, ProductValues, defaultProductValues } from "@/lib/zod";
import { useAuth } from "@/context/authContext";
import { createProduct } from "@/@redux/action/product.action";
import { useAppDispatch } from "@/hook";
import { useCallback, useState } from "react";

export default function FormProduct() {
  const { state } = useAuth();
  const dispatch = useAppDispatch();

  const form = useForm<ProductValues>({
    resolver: zodResolver(ProductSchema),
    defaultValues: defaultProductValues,
  });

  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    if (!state.user) {
      setError("Veuillez vous connecter");
      return;
    }

    const payload = {
      name: form.getValues("name")?.toString(),
      image: form.getValues("image")?.toString(),
      category_id: form.getValues("category_id")?.toString(),
      shortDescription: form.getValues("shortDescription")?.toString(),
      longDescription: form.getValues("longDescription")?.toString(),
      price: form.getValues("price")?.toString(),
      stock: form.getValues("stock")?.toString(),
    };

    try {
      dispatch(createProduct(payload));
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
            className="w-full space-y-4"
          >
            {error ? <small className="text-red-500">{error}</small> : null}
            <div className="w-full flex flex-col sm:flex-row gap-6 sm:gap-12">
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
                      <Input placeholder="URL de l'image" {...field} />
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
                    <FormControl>
                      <Input placeholder="ID de la catégorie" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* size_id */}
              <FormField
                control={form.control}
                name="size_id"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Taille*</FormLabel>
                    <FormControl>
                      <Input placeholder="ID de la taille" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* value */}
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Valeur*</FormLabel>
                    <FormControl>
                      <Input placeholder="Valeur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* image_mime */}
              <FormField
                control={form.control}
                name="image_mime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Type MIME de l'image*</FormLabel>
                    <FormControl>
                      <Input placeholder="Type MIME" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* image_size */}
              <FormField
                control={form.control}
                name="image_size"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Taille de l'image*</FormLabel>
                    <FormControl>
                      <Input placeholder="Taille de l'image" {...field} />
                    </FormControl>
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
                      <Input placeholder="Description courte" {...field} />
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
                      <Input placeholder="Description longue" {...field} />
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
                Ajouter
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  );
}
