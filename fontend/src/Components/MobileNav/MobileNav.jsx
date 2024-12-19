import React from "react";
import { useRootContext } from "../../Provider/Context";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const MobileNav = () => {
  const { isExpanded, handleToggle } = useRootContext();
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
      </div>
    </div>
  );
};

export default MobileNav;
