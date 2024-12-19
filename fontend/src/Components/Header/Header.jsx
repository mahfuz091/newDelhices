import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import shopping from "../../assets/images/shopping-bag.svg";
import { TbLogin2 } from "react-icons/tb";

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
    user,
    setUser,
    getUser,
    setGuest,
  } = useRootContext();
  const axiosPublic = useAxiosPublic();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getUser();
  }, [control]);

  console.log(user, "usr");

  useEffect(() => {
    if (user) {
      setIsAuthenticated(true);
    }
  }, [control, user]);

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
      console.log(res, "reeee");

      if (res.status === 200) {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        setControl(!control);
      }
    } catch (error) {
      console.log(error);
    }
    setIsAuthenticated(false); // Update state to reflect logged out status
  };

  useEffect(() => {
    getUser();
  }, [control]);

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
                  Bienvenue
                </NavLink>
              </li>
              <li>
                <NavLink to='/about'>A propos de nou</NavLink>
              </li>
              <li>
                <NavLink to='/menu'>La Carte</NavLink>
              </li>

              <li>
                <NavLink to='/contact'>Contact</NavLink>
              </li>
              <li className=''>
                <NavLink to='/blog'>Blog</NavLink>
              </li>
              {user?.isAdmin === true ? (
                <li>
                  <NavLink to='/dashboard/home'>Tableau de bord</NavLink>
                </li>
              ) : (
                ""
              )}
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
              {/* <a className='search-toggler main-header__search' href='#'>
                <i className='icon-magnifying-glass' aria-hidden='true'></i>
                <span className='sr-only'>Search</span>
              </a> */}
              <span className='main-header__cart' onClick={toggleCart}>
                <img src={shopping} alt='' />
                <p className='cart-length'>{cartItems?.length}</p>
              </span>
              {/* Conditionally render Login or Logout button */}
              {user ? (
                <button
                  className='thm-btn main-header__btn'
                  onClick={handleLogout}
                >
                  <b>Logout</b>
                  <span></span>
                </button>
              ) : (
                <button
                  className='thm-btn main-header__btn'
                  onClick={() => {
                    toggleSignIn();
                    setShowSignUp(false);
                    setGuest(false);
                  }}
                >
                  <b>
                    <TbLogin2 />
                    Connexion
                  </b>
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
