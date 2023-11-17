import { Button } from "@/components/ui/button";

export default function ThankYou() {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center bg-primary text-white">
        <section>
          <h1>Merci de votre achat</h1>
          <Button>Voir mes commandes</Button>
        </section>
      </div>
    </>
  );
}
