//hooks
import { useCallback, useState } from "react";

//zod
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LoginSchema,
  LoginValues,
  RegisterSchema,
  RegisterValues,
  defaultLoginValues,
  defaultRegisterValues,
} from "@/lib/zod";

//components UI
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
import { Checkbox } from "@/components/ui/checkbox";

//components
import ShowPassword from "../components/ShowPassword";

//Link
import { Link, Navigate } from "react-router-dom";

//Utils
import { AiOutlineGoogle } from "react-icons/ai";
import axiosClient from "@/lib/axios-client";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/hook";
import { RootState } from "@/@redux/store";
import { login, register } from "@/@redux/action/auth.action";
import Cookies from "js-cookie";
import { mergeCart } from "@/@redux/action/cart.action";
import { useAuth } from "@/context/authContext";

export default function Auth() {
  const { state } = useAuth();

  if (state.user) {
    return <Navigate to="/profile" />;
  }

  const dispatch = useDispatch();
  const { loading: loadingLog, error: errorLog } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { loading: loadingMerge, error: errorMerge } = useAppSelector(
    (state: RootState) => state.cart
  );
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [variant, setVariant] = useState("login");
  const [errorCheckbox, setIsErrorCheckbox] = useState("");
  const [isError, setIsError] = useState("");
  const [authToken, setAuthToken] = useState<any>(null);

  const formResolver =
    variant === "login"
      ? zodResolver(LoginSchema)
      : zodResolver(RegisterSchema);
  const form = useForm<RegisterValues | LoginValues>({
    resolver: formResolver,
    defaultValues:
      variant === "login" ? defaultLoginValues : defaultRegisterValues,
  });

  const toggleVariant: () => void = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const mergeCartAfterLogin = async (cartId: string, authToken: string) => {
    if (authToken) {
      try {
        const response = await dispatch(mergeCart(cartId, authToken));
        console.log(response);

        if (!loadingMerge && !errorMerge) {
          Cookies.remove("cart_id");
          setIsErrorCheckbox("");
          setCheckboxChecked(false);
          console.log("merge");
        }
      } catch (error) {
        console.error("Erreur lors de la fusion du panier :", error);
      }
    }
  };

  const onLogin = useCallback(async () => {
    try {
      const payload = {
        email: form.getValues("email")?.toString(),
        password: form.getValues("password")?.toString(),
      };

      await dispatch(login(payload));
      const cartId = Cookies.get("cart_id");
      const tokenFromCookies = Cookies.get("authToken");
      setAuthToken(tokenFromCookies);
      if (cartId) {
        mergeCartAfterLogin(cartId, authToken);
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors de la connexion :", error);
      throw error;
    }
  }, [dispatch, form, loadingLog, errorLog]);

  const onRegister = useCallback(async () => {
    const payload = {
      name: form.getValues("name")?.toString(),
      email: form.getValues("email")?.toString(),
      password: form.getValues("password")?.toString(),
    };

    try {
      if (!checkboxChecked) {
        setIsErrorCheckbox("Veuillez accepter les termes et conditions");
        return;
      }

      dispatch(register(payload));
      setIsErrorCheckbox("");
      setCheckboxChecked(!checkboxChecked);
      onLogin();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const response = error.response;
        if (response && response.status === 422) {
          setIsError(response.data.errors);
        }
      } else if (error instanceof Error) {
        setIsError(
          "Une erreur s'est produite lors de l'enregistrement : " +
            error.message
        );
      }
    }
  }, [form, dispatch, checkboxChecked, setIsError, onLogin]);

  const handleClickCheckbox = useCallback(() => {
    setCheckboxChecked(!checkboxChecked);
  }, [checkboxChecked]);

  const handleGoogleLogin = async () => {
    try {
      const response = await axiosClient.get("/login/google");
      window.location.href = response.data;
    } catch (error) {
      console.error("Erreur lors de la connexion avec Google :", error);
    }
  };

  return (
    <>
      <div className="w-full h-full my-12 flex flex-col justify-center items-center space-y-2">
        <h2 className="text-2xl text-primary mb-2">
          {variant === "login" ? "Se connecter" : "S'inscrire"}
        </h2>
        <div className="px-4 w-full md:w-1/2 xl:w-1/3 py-2">
          <Button
            onClick={handleGoogleLogin}
            aria-label="connexion ou insription"
            className="w-full h-12 flex gap-x-4 items-center"
          >
            <AiOutlineGoogle size={20} />
            Google
          </Button>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4 flex flex-col items-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() =>
                variant === "login" ? onLogin() : onRegister()
              )}
              className="w-full flex flex-col justify-center items-center space-y-2"
            >
              {isError ? (
                <small className="text-red-500">{isError}</small>
              ) : null}
              <div className="w-full flex items-center">
                <div className="w-1/2 h-px bg-primary"></div>
                <p className="px-8 flex justify-center items-center">Ou</p>
                <div className="w-1/2 h-px bg-primary"></div>
              </div>
              <div className="flex space-x-8 items-center cursor-pointer "></div>
              {variant === "register" && (
                <>
                  {/* name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom" {...field} />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {/* email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <ShowPassword
                        password={field.value}
                        setPassword={field.onChange}
                      />
                    </FormControl>

                    <div className="flex flex-col">
                      <Link
                        to="/auth/forgotPassword"
                        className="cursor-pointer"
                      >
                        <small>Mot de passe oublié ?</small>
                      </Link>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <div className="w-full items-top flexflex-col">
                <div className="flex gap-x-2">
                  <Checkbox id="terms1" onClick={handleClickCheckbox} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      <Link to={"/politique-de-confidentialite"}>
                        Accepter les termes et conditions
                      </Link>
                    </label>
                  </div>
                </div>
                {errorCheckbox ? (
                  <small className="font-semibold text-red-500">
                    {errorCheckbox}
                  </small>
                ) : null}
              </div>
              <div className="w-full py-4">
                <Button
                  aria-label="connexion ou insription"
                  onClick={variant === "login" ? onLogin : onRegister}
                  className="w-full"
                >
                  {variant === "login"
                    ? "Se connecter avec l'email"
                    : "S'inscrire avec l'email"}
                </Button>
              </div>

              <p>
                {variant === "login" ? "Première fois ? " : "Déjà un compte ? "}
                <span
                  onClick={toggleVariant}
                  className="cursor-pointer hover:border-b-2 "
                >
                  {variant === "login" ? "Créer un compte" : "Se connecter"}
                </span>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
