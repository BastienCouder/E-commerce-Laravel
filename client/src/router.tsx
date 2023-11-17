import { createBrowserRouter, Navigate, RouteProps } from "react-router-dom";
import DashboardLayout from "./Admin/layout/DashboardLayout";
import ProductDetail from "./views/ProductDetail";
import Products from "./views/Products";
import ProductsDashboard from "./Admin/Products";
import Profile from "./views/Profile";
import GuestLayout from "./layout/GuestLayout";
import Auth from "./views/Auth";
import NotFound from "./not-found";
import Cart from "./views/Cart";
import MainLayout from "./layout/MainLayout";
import Delivery from "./views/Delivery";
import Summary from "./views/Summary";
import Orders from "./Admin/Orders";
import Inventory from "./Admin/Inventory";
import Root from "./root";
import ThankYou from "./views/Thankyou";

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
        path: "/",
        element: <Root />,
      },
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
      {
        path: "summary",
        element: <Summary />,
      },
      {
        path: "thankyou",
        element: <ThankYou />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "orders",
        element: <Orders />,
      },
      {
        path: "products",
        element: <ProductsDashboard />,
      },
      {
        path: "inventory",
        element: <Inventory />,
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
