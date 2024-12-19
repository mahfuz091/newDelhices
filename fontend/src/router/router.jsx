import { createBrowserRouter } from "react-router-dom";
import Home from "../Components/Home/Home";
import ContactPage from "../Components/ContactPage/ContactPage";
import AboutPage from "../Components/AboutPage/AboutPage";
import MenuDetailsPage from "../Components/MenuDetailsPage/MenuDetailsPage";
import CartPage from "../Components/CartPage/CartPage";
import MenuPage from "../Components/MenuPage/MenuPage";
import CheckoutPage from "../Components/CheckoutPage/CheckoutPage";
import SignIn from "../Components/SignIn/SignIn";
import SignUp from "../Components/SignUp/SignUp";
import ReservationPage from "../Components/ReservationPage/ReservationPage";
import BlogPage from "../Components/BlogPage/BlogPage";

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
]);
