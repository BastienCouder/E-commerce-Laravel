import Header from "./Header";
import Seo from "./Seo";

import { ReactNode } from "react";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Seo
                title="E-commerce - laravel"
                description="Description de la page"
                keywords="Mots-clés, SEO, Balises, Head"
                iconUrl={"/vite.svg"}
            />
            <Header />
            <main>{children}</main>
        </>
    );
}
