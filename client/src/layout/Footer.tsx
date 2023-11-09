import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <Separator />
            <footer className="p-4 bg-white sm:p-6">
                <div className="mx-auto max-w-screen-xl">
                    <div className="md:flex md:justify-between">
                        <div className="mb-6 md:mb-0">
                            <Link
                                to="https://flowbite.com"
                                className="flex items-center"
                            >
                                <span className="self-center text-2xl font-semibold whitespace-nowrap">
                                    E-commerce
                                </span>
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-8 sm:gap-x-16 sm:grid-cols-3">
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                    Mon compte
                                </h2>
                                <ul className="text-gray-600">
                                    <li className="mb-4">
                                        <Link
                                            to="#"
                                            className="hover:underline"
                                        >
                                            Mes commandes
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            to="#"
                                            className="hover:underline"
                                        >
                                            Mon profil
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            to="#"
                                            className="hover:underline"
                                        >
                                            Mon panier
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                    Juridique
                                </h2>
                                <ul className="text-gray-600">
                                    <li className="mb-4">
                                        <Link
                                            to="#"
                                            className="hover:underline"
                                        >
                                            Politique de confidentialité
                                        </Link>
                                    </li>
                                    <li className="mb-4">
                                        <Link
                                            to="#"
                                            className="hover:underline"
                                        >
                                            Politique de cookies
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="#"
                                            className="hover:underline"
                                        >
                                            Conditions générales
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                                    Nous contacter
                                </h2>
                                <ul className="text-gray-600">
                                    <li className="mb-4">
                                        <Link
                                            to="https://github.com/themesberg/flowbite"
                                            className="hover:underline "
                                        >
                                            example@gmail.com
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="https://discord.gg/4eeurUVvTy"
                                            className="hover:underline"
                                        >
                                            0000000000
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                    <div className="sm:flex sm:items-center sm:justify-between">
                        <span className="text-sm text-gray-500 sm:text-center">
                            © 2022{" "}
                            <Link
                                to="https://flowbite.com"
                                className="hover:underline"
                            >
                                Bastien Couder
                            </Link>
                            . Tous droits réservés.
                        </span>
                        <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
                            <Link to="#">
                                <Facebook strokeWidth={1.5} />
                            </Link>
                            <Link to="#">
                                <Instagram strokeWidth={1.5} />
                            </Link>
                            <Link to="#">
                                <Twitter strokeWidth={1.5} />
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
