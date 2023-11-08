import { ReactNode } from "react";
import Header from "./Header";
import { Toaster } from "sonner";

interface MainLayoutProps {
    children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Toaster expand={false} position="bottom-left" />
        </>
    );
}
