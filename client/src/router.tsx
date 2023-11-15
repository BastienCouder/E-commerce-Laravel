import { createBrowserRouter, RouteProps } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Dashboard from "./views/Dashboard";
import ProductDetail from "./views/ProductDetail";
import Products from "./views/Products";
import Profile from "./views/Profile";
import GuestLayout from "./layout/GuestLayout";
import Auth from "./views/Auth";
import NotFound from "./not-found";
import Cart from "./views/Cart";
import MainLayout from "./layout/MainLayout";
import Delivery from "./views/delivery";

interface Route {
  path: string;
  element: React.ReactNode | React.ReactElement<RouteProps>;
  children?: Route[];
}

const router: Route[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "products/:categorySlug",
        element: <Products key="ProductCategories" />,
      },
      {
        path: "products/:categorySlug/:productId",
        element: <ProductDetail key="ProductID" />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "delivery",
        element: <Delivery />,
      },
    ],
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/auth",
        element: <Auth />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const createdRouter = createBrowserRouter(router);

export default createdRouter;
