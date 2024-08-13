import React from "react";
import s from "./Navigation.module.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <header className={s.wrapper}>
      <nav>
        <ul className={s.nav}>
          <li className={s.navItems}>
            <NavLink 
              className={({ isActive }) => 
                `${s.link} ${isActive ? s.active : ""}`
              } 
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li className={s.navItems}>
            <NavLink 
              className={({ isActive }) => 
                `${s.link} ${isActive ? s.active : ""}`
              } 
              to="/movies"
            >
              Movies
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
