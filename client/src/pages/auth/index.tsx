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
import ShowPassword from "../../components/ShowPassword";

//Link
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

//Utils
import { env } from "@/lib/env";

export default function Auth() {
    const navigate = useNavigate();
    const [checkboxChecked, setCheckboxChecked] = useState(false);
    const [variant, setVariant] = useState("login");
    const [error, setError] = useState("");

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

    const login = useCallback(async () => {
        try {
            if (!checkboxChecked) {
                setError("Vous devez accepter les termes et conditions.");
                return;
            } else {
                setError("");
            }

            const email = form.getValues("email");
            const password = form.getValues("password");

            // const response = await axios.post(
            //     `${env.API_URL}`,
            //     {
            //         email,
            //         password,
            //     },
            //     { withCredentials: true }
            // );
            // console.log(response);
            // navigate("/");
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la connexion : ",
                error
            );
            throw error;
        }
    }, [form, checkboxChecked]);

    const register = useCallback(async () => {
        if (!checkboxChecked) {
            setError("Vous devez accepter les termes et conditions.");
            return;
        } else {
            setError("");
        }

        const formData = new FormData();
        formData.append("username", form.getValues("username"));
        formData.append("email", form.getValues("email"));
        formData.append("password", form.getValues("password"));

        try {
            setCheckboxChecked(!checkboxChecked);
            login();
        } catch (error) {
            console.error("An error occurred during registration:", error);
            if (error instanceof Error) {
                return;
            }
        }
    }, [form, login, checkboxChecked]);

    const handleClickCheckbox = useCallback(() => {
        setCheckboxChecked(!checkboxChecked);
    }, [checkboxChecked]);

    return (
        <>
            <div className="w-full h-full flex flex-col justify-center items-center space-y-2">
                <h2 className="text-2xl">
                    {variant === "login" ? "Se connecter" : "S'inscrire"}
                </h2>
                <div className="w-full md:w-1/2 xl:w-1/3 p-4 flex flex-col items-center">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(() =>
                                variant === "login" ? login() : register()
                            )}
                            className="w-full flex flex-col justify-center items-center space-y-2"
                        >
                            {error ? (
                                <small className="text-red-500">{error}</small>
                            ) : null}
                            <div className="w-full flex items-center">
                                <div className="w-1/2 h-px bg-primary"></div>
                                <p className="px-8 flex justify-center items-center">
                                    Ou
                                </p>
                                <div className="w-1/2 h-px bg-primary"></div>
                            </div>
                            <div className="flex space-x-8 items-center cursor-pointer "></div>
                            {variant === "register" && (
                                <>
                                    {/* name */}
                                    <FormField
                                        control={form.control}
                                        name="username"
                                        render={({ field }) => (
                                            <FormItem className="w-full">
                                                <FormLabel>Nom</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nom"
                                                        {...field}
                                                    />
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
                                            <Input
                                                placeholder="email"
                                                {...field}
                                            />
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
                                                <small>
                                                    Mot de passe oublié ?
                                                </small>
                                            </Link>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className="w-full items-top flex space-x-2">
                                <Checkbox
                                    id="terms1"
                                    onClick={handleClickCheckbox}
                                />
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                        htmlFor="terms1"
                                        className="text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        <Link
                                            to={"/politique-de-confidentialite"}
                                        >
                                            Accepter les termes et conditions
                                        </Link>
                                    </label>
                                </div>
                            </div>
                            <div className="py-4">
                                <Button
                                    aria-label="connexion ou insription"
                                    onClick={
                                        variant === "login" ? login : register
                                    }
                                    size="lg"
                                >
                                    {variant === "login"
                                        ? "Se connecter"
                                        : "S'inscrire"}
                                </Button>
                            </div>

                            <p>
                                {variant === "login"
                                    ? "Première fois ? "
                                    : "Déjà un compte ? "}
                                <span
                                    onClick={toggleVariant}
                                    className="cursor-pointer hover:border-b-2 "
                                >
                                    {variant === "login"
                                        ? "Créer un compte"
                                        : "Se connecter"}
                                </span>
                            </p>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}
