import MainLayout from "@/layout";
import MetaData from "@/layout/MetaData";

export default function Home() {
    return (
        <MainLayout>
            <MetaData
                title="Page d'Accueil"
                description="Bienvenue sur notre page d'accueil"
                keywords="Accueil, Site Web"
            />
            Home
        </MainLayout>
    );
}
