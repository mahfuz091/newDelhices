import { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Aos from "aos";
import "aos/dist/aos.css";
import "react-datepicker/dist/react-datepicker.css";
import CartModal from "../CartModal/CartModal";
import SignIn from "../SignIn/SignIn";
import SignUp from "../SignUp/SignUp";
import MobileNav from "../MobileNav/MobileNav";

const Layout = ({ children }) => {
  useEffect(() => {
    const tolakBtns = document.querySelectorAll(".thm-btn");

    const handleMouseEnter = (e) => {
      const btn = e.currentTarget;
      const parentOffset = btn.getBoundingClientRect();
      const relX = e.pageX - window.scrollX - parentOffset.left;
      const relY = e.pageY - window.scrollY - parentOffset.top;
      const span = btn.querySelector("span");

      if (span) {
        span.style.top = relY + "px";
        span.style.left = relX + "px";
      }
    };

    const handleMouseOut = (e) => {
      const btn = e.currentTarget;
      const parentOffset = btn.getBoundingClientRect();
      const relX = e.pageX - window.scrollX - parentOffset.left;
      const relY = e.pageY - window.scrollY - parentOffset.top;
      const span = btn.querySelector("span");

      if (span) {
        span.style.top = relY + "px";
        span.style.left = relX + "px";
      }
    };

    tolakBtns.forEach((btn) => {
      btn.addEventListener("mouseenter", handleMouseEnter);
      btn.addEventListener("mouseout", handleMouseOut);
    });

    // Clean up event listeners on component unmount
    return () => {
      tolakBtns.forEach((btn) => {
        btn.removeEventListener("mouseenter", handleMouseEnter);
        btn.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <>
      <div className='page-wrapper'>
        <Header />
        {children}
        <Footer />
      </div>
      <CartModal />
      <SignIn />
      <MobileNav />
    </>
  );
};

export default Layout;
