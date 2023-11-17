// Utilisez CustomBrowserRouter dans votre application
import { Helmet } from "react-helmet";

export default function root() {
  const iconUrl = "/vite.svg";

  return (
    <>
      <Helmet>
        {/* Metadonnées générales pour l'application */}
        <title>Titre par défaut</title>
        <meta name="description" content="Description par défaut" />
        <meta name="keywords" content="Mots-clés par défaut" />
        {iconUrl && <link rel="icon" href={iconUrl} type="image/svg+xml" />}
      </Helmet>
      hello
    </>
  );
}
