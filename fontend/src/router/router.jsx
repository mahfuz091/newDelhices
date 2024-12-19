import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import ContactPage from "../Components/ContactPage/ContactPage";
import AboutPage from "../Components/AboutPage/AboutPage";
import MenuDetailsPage from "../Components/MenuDetailsPage/MenuDetailsPage";
import CartPage from "../Components/CartPage/CartPage";
import MenuPage from "../Components/MenuPage/MenuPage";
import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
import ReservationPage from "../Components/ReservationPage/ReservationPage";
import BlogPage from "../Components/BlogPage/BlogPage";
import DashLayout from "../Components/DashboardLayout/DashLayout";
import Innovation from "../Components/Innovation/Innovation";
import DashCategory from "../Components/DashCategory/DashCategory";
import DashItems from "../Components/DashItems/DashItems";
import DashReserVation from "../Components/DashReservation/DashReservation";
import DashOrders from "../Components/DashOrders/DashOrders";
import DashOrderDetails from "../Components/DashOrders/DashOrderDetails";
import DashHome from "../Components/DashHome/DashHome";
import DashBlog from "../Components/DashBlog/DashBlog";
import AddBlog from "../Components/DashBlog/AddBlog";
import UpdateBlog from "../Components/DashBlog/UpdateBlog";
import BlogDetailsPage from "../Components/BlogDetailsPage/BlogDetailsPage";
import DashSauce from "../Components/DashSauce/DashSauce";
import AddSauce from "../Components/DashSauce/AddSauce";
import UpdateSauce from "../Components/DashSauce/UpdateSauce";
import OptionsEntree from "../Components/OptionsEntree/OptionsEntree";
import DashNanSauce from "../Components/DashNanSauce/DashNanSauce";
import AddNanSauce from "../Components/DashNanSauce/AddNanSauce";
import UpdateNanSauce from "../Components/DashNanSauce/UpdateNanSauce";
import DashDrinks from "../Components/DashDrinks/DashDrinks";
import AddDrinks from "../Components/DashDrinks/AddDrinks";
import UpdateDrinks from "../Components/DashDrinks/UpdateDrinks";
import OptionsMenu from "../Components/OptionsMenu/OptionsMenu";
import OptionsMenuSauce from "../Components/OptionsMenu/OptionsMenuSauce";
import OptionsMenuSauceStep2 from "../Components/OptionsMenu/OptionsMenuStep2";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "contact",
    element: <ContactPage />,
  },
  {
    path: "about",
    element: <AboutPage />,
  },
  {
    path: "menu",
    element: <MenuPage />,
  },
  {
    path: "menu/options/:cat/:id",
    element: <OptionsEntree />,
  },

  {
    path: "menu/menuoptions/:id",
    element: <OptionsMenu />,
  },
  {
    path: "menu/menuoptions/:id/sauce",
    element: <OptionsMenuSauce />,
  },
  {
    path: "menu/menuoptions/:id/step2",
    element: <OptionsMenuSauceStep2 />,
  },
  {
    path: "menu-details/:id",
    element: <MenuDetailsPage />,
  },
  {
    path: "cart",
    element: <CartPage />,
  },
  {
    path: "checkout",
    element: <CheckoutPage />,
  },
  {
    path: "reserve",
    element: <ReservationPage />,
  },
  {
    path: "blog",
    element: <BlogPage />,
  },
  {
    path: "/blog/:id",
    element: <BlogDetailsPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/home",
        element: (
          <PrivateRoute>
            <DashHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/category",
        element: <DashCategory />,
      },
      {
        path: "/dashboard/items",
        element: <DashItems />,
      },

      {
        path: "/dashboard/reservation",
        element: <DashReserVation />,
      },

      {
        path: "/dashboard/orders",
        element: <DashOrders />,
      },
      {
        path: "/dashboard/orders/:id",
        element: <DashOrderDetails />,
      },
      {
        path: "/dashboard/blog",
        element: <DashBlog />,
      },

      {
        path: "/dashboard/blog/add-blog",
        element: <AddBlog />,
      },
      {
        path: "/dashboard/blog/update/:id",
        element: <UpdateBlog />,
      },
      {
        path: "/dashboard/sauce",
        element: <DashSauce />,
      },

      {
        path: "/dashboard/sauce/add-sauce",
        element: <AddSauce />,
      },
      {
        path: "/dashboard/sauce/update/:id",
        element: <UpdateSauce />,
      },

      {
        path: "/dashboard/nan-sauce",
        element: <DashNanSauce />,
      },

      {
        path: "/dashboard/nan-sauce/add",
        element: <AddNanSauce />,
      },
      {
        path: "/dashboard/nan-sauce/update/:id",
        element: <UpdateNanSauce />,
      },
      {
        path: "/dashboard/drinks",
        element: <DashDrinks />,
      },

      {
        path: "/dashboard/drinks/add",
        element: <AddDrinks />,
      },
      {
        path: "/dashboard/drinks/update/:id",
        element: <UpdateDrinks />,
      },
    ],
  },
]);
