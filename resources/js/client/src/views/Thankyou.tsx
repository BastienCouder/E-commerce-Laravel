import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <>
      <div className="h-[20rem] w-full flex justify-center items-center">
        <section className="flex flex-col justify-center space-y-4">
          <h1 className="text-center">Merci de votre achat</h1>
          <div className="flex flex-col justify-center space-y-4">
            <Link to="/profile">
              <Button>Voir mes commandes</Button>
            </Link>
            <Link to="/">
              <Button>Retourner à l'accueil</Button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
