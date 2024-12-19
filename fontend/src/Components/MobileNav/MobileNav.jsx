import React, { useEffect, useState } from "react";
import { useRootContext } from "../../Provider/Context";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import useAxiosPublic from "../../hooks/UseAxiosPublic";
import { TbLogin2 } from "react-icons/tb";

const MobileNav = () => {
  const {
    isExpanded,
    handleToggle,
    control,
    setControl,
    user,
    setUser,
    toggleSignIn,
    setShowSignUp,
  } = useRootContext();
  const axiosPublic = useAxiosPublic();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Get the JWT token from cookies
    const user = localStorage.getItem("user");

    if (user) {
      setIsAuthenticated(true);
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
        localStorage.removeItem("user");
      }
    } catch (error) {
      console.log(error);
    }
    setIsAuthenticated(false); // Update state to reflect logged out status
  };

  return (
    <div className={`mobile-nav__wrapper ${isExpanded ? "expanded" : ""}`}>
      <div
        onClick={handleToggle}
        className='mobile-nav__overlay mobile-nav__toggler'
      ></div>

      <div className='mobile-nav__content'>
        <span
          onClick={handleToggle}
          className='mobile-nav__close mobile-nav__toggler'
        >
          <i className='fa fa-times'></i>
        </span>

        <div className='logo-box'>
          <Link href='/'>
            <img src={logo} alt='tolak' />
          </Link>
        </div>

        <ul className='main-menu__list'>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "")}
              to='/'
              onClick={handleToggle}
            >
              Welcome
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' onClick={handleToggle}>
              About us
            </NavLink>
          </li>
          <li>
            <NavLink to='/menu' onClick={handleToggle}>
              The Map
            </NavLink>
          </li>

          <li>
            <NavLink to='/contact' onClick={handleToggle}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to='/blog' onClick={handleToggle}>
              Blog
            </NavLink>
          </li>
        </ul>
        {!user ? (
          <button
            className='thm-btn main-header__btn'
            onClick={() => {
              toggleSignIn();
              setShowSignUp(false);
              handleToggle();
            }}
          >
            <b>
              <TbLogin2 />
              Login
            </b>
            <span></span>
          </button>
        ) : (
          <button className='thm-btn main-header__btn' onClick={handleLogout}>
            <b>Logout</b>
            <span></span>
          </button>
        )}
      </div>
    </div>
  );
};

export default MobileNav;
