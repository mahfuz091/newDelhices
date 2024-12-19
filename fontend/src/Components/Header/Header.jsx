import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import shopping from "../../assets/images/shopping-bag.svg";
import { TbLogin2 } from "react-icons/tb";
import Cookies from "js-cookie";
import { useRootContext } from "../../Provider/Context";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/UseAxiosPublic";

const Header = () => {
  const {
    toggleCart,
    toggleSignIn,
    setShowSignUp,
    cartItems,
    handleToggle,
    control,
    setControl,
  } = useRootContext();
  const axiosPublic = useAxiosPublic();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get the JWT token from cookies
    const jwtToken = Cookies.get("jwt");

    console.log("JWT Token:", jwtToken);
    if (jwtToken) {
      setIsAuthenticated(!!jwtToken);
    }
  }, [control]);

  // Logout function to remove JWT and reset authentication state
  const handleLogout = async () => {
    try {
      const res = await axiosPublic.post(
        "api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setIsAuthenticated(false);
        setControl(!control);
      }
    } catch (error) {
      console.log(error);
    }
    setIsAuthenticated(false); // Update state to reflect logged out status
  };
  return (
    <header className='main-header sticky-header sticky-header--normal'>
      <Container>
        <div className='main-header__inner'>
          <div className='main-header__logo'>
            <Link to='/'>
              <img src={logo} alt='' />
            </Link>
          </div>
          <nav className='main-header__nav main-menu'>
            <ul className='main-menu__list'>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to='/'
                >
                  Welcome
                </NavLink>
              </li>
              <li>
                <NavLink to='/about'>About us</NavLink>
              </li>
              <li>
                <NavLink to='/menu'>The Map</NavLink>
              </li>

              <li>
                <NavLink to='/contact'>Contact</NavLink>
              </li>
              <li>
                <NavLink to='/blog'>Blog</NavLink>
              </li>
            </ul>
          </nav>
          <div className='main-header__right'>
            <div className='main-header__right'>
              <div
                className='mobile-nav__btn mobile-nav__toggler'
                onClick={handleToggle}
              >
                <span></span>
                <span></span>
                <span></span>
              </div>
              <a className='search-toggler main-header__search' href='#'>
                <i className='icon-magnifying-glass' aria-hidden='true'></i>
                <span className='sr-only'>Search</span>
              </a>
              <span className='main-header__cart' onClick={toggleCart}>
                <img src={shopping} alt='' />
                <p className='cart-length'>{cartItems?.length}</p>
              </span>
              {/* Conditionally render Login or Logout button */}
              {!isAuthenticated ? (
                <button
                  className='thm-btn main-header__btn'
                  onClick={() => {
                    toggleSignIn();
                    setShowSignUp(false);
                  }}
                >
                  <b>
                    <TbLogin2 />
                    Login
                  </b>
                  <span></span>
                </button>
              ) : (
                <button
                  className='thm-btn main-header__btn'
                  onClick={handleLogout}
                >
                  <b>Logout</b>
                  <span></span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
