"use client";
import { useCallback, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  DeliverySchema,
  DeliveryValues,
  defaultDeliveryValues,
} from "@/lib/zod";
import { useAuth } from "@/context/authContext";
import { createDeliveryItem } from "@/@redux/action/delivery.action";
import { useAppDispatch } from "@/hook";

export default function FormDelivery() {
  const { state } = useAuth();
  const dispatch = useAppDispatch();

  const form = useForm<DeliveryValues>({
    resolver: zodResolver(DeliverySchema),
    defaultValues: defaultDeliveryValues,
  });

  const [formVisible, setFormVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const countries = [
    "Allemagne",
    "Belgique",
    "Espagne",
    "France",
    "Irlande",
    "Italie",
    "Luxembourg",
    "Malte",
    "Portugal",
    "Roumanie",
    "Royaume-uni",
  ];

  const onSubmit = async () => {
    if (!state.user) {
      setError("Veuillez vous connecter");
      return;
    }

    const payload = {
      name: form.getValues("name")?.toString(),
      surname: form.getValues("surname")?.toString(),
      email: form.getValues("email")?.toString(),
      address_1: form.getValues("address_1")?.toString(),
      address_2: form.getValues("address_2")?.toString(),
      country: form.getValues("country")?.toString(),
      zipcode: form.getValues("zipcode")?.toString(),
      city: form.getValues("city")?.toString(),
      phone: form.getValues("phone")?.toString(),
    };

    try {
      dispatch(createDeliveryItem(payload));
      toggleFormVisibility();
      toast.success("Addresse de livraison ajoutée avec succès");
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
        aria-label="Fermer ou Ajouter une adresse de livraison"
        onClick={toggleFormVisibility}
        className="border-zinc-800 border-2"
      >
        {formVisible ? "Fermer" : "Ajouter une adresse de livraison"}
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
                    <FormLabel>Prenom*</FormLabel>
                    <FormControl>
                      <Input placeholder="prenom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* surname */}
              <FormField
                control={form.control}
                name="surname"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Nom*</FormLabel>
                    <FormControl>
                      <Input placeholder="nom" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* email*/}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email*</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/*tel*/}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone*</FormLabel>
                  <FormControl>
                    <Input placeholder="téléphone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* address 1*/}
            <FormField
              control={form.control}
              name="address_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse 1*</FormLabel>
                  <FormControl>
                    <Input placeholder="adresse 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* address 2*/}
            <FormField
              control={form.control}
              name="address_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse 2</FormLabel>
                  <FormControl>
                    <Input placeholder="adresse 2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* country*/}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays*</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pays" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country, index) => (
                        <SelectItem key={index} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* postcode*/}
            <FormField
              control={form.control}
              name="zipcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code Postal*</FormLabel>
                  <FormControl>
                    <Input placeholder="code postal" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* city*/}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ville*</FormLabel>
                  <FormControl>
                    <Input placeholder="ville" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
