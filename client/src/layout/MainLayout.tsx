import Header from "./Header";
import { Toaster } from "sonner";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <div id="mainLayout">
        <Header />
        <Outlet />
        <Footer />
        <Toaster expand={false} position="bottom-left" />
      </div>
    </>
  );
}
