import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ThankYou() {
  return (
    <>
      <div className="h-[20rem] w-full flex justify-center items-center">
        <section className="space-y-4">
          <h1>Merci de votre achat</h1>
          <Button>
            <Link to="/profile">Voir mes commandes</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
