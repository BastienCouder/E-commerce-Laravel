import { Helmet } from "react-helmet";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Products from "./pages/products";
import ProductDetail from "./pages/products/ProductDetail";
import Auth from "./pages/auth";

export default function App() {
    const iconUrl = "/vite.svg";

    return (
        <>
            <Helmet>
                {/* Metadonnées générales pour l'application */}
                <title>Titre par défaut</title>
                <meta name="description" content="Description par défaut" />
                <meta name="keywords" content="Mots-clés par défaut" />
                {iconUrl && (
                    <link rel="icon" href={iconUrl} type="image/svg+xml" />
                )}
            </Helmet>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route
                        path="/products/:categorySlug"
                        element={<Products />}
                    />
                    <Route
                        path="/products/:categorySlug/:productId"
                        element={<ProductDetail />}
                    />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Router>
        </>
    );
}
