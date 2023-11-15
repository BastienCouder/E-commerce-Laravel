import FormDelivery from "@/components/FormDelivery";

export default function Delivery() {
  return (
    <div className="p-4 md:px-20 space-y-2">
      <h1>Livraison</h1>
      <section className="flex w-full"></section>
      <div className="w-1/2 space-y-2">
        <FormDelivery />
        <div className="w-1/2"></div>
      </div>
    </div>
  );
}
