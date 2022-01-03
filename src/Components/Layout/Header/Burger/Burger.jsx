import React, { useContext, useState } from "react";
import scss from "./Burger.module.scss";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../../../../Storage/auth-context";
import { CSSTransition } from "react-transition-group";
import { Sling as Hamburger } from "hamburger-react";

const Burger = (props) => {
  const navigate = useNavigate();
  const loc = useLocation();
  const authCtx = useContext(AuthContext);

  return (
    <>
      <div className={scss.Burger}>
        <Hamburger
          toggled={props.burgerIsOpen}
          toggle={props.onBurgerMenuOpen}
          rounded={true}
          size={36}
          color="#000000"
        />
      </div>
      <CSSTransition
        in={props.burgerIsOpen}
        timeout={200}
        classNames={{
          enterActive: scss.BurgerMenuEnterActive,
          enterDone: scss.BurgerMenuEnterDone,
          exitActive: scss.BurgerMenuExit,
          exitDone: scss.BurgerMenuExitActive,
        }}
        mountOnEnter
        unmountOnExit
      >
        <div className={scss.BurgerMenu}>
          <ul className={scss.Nav}>
            <li className={loc.pathname === "/calendars" ? scss.Active : null}>
              <Link to="/calendars" onClick={() => props.onBurgerMenuOpen()}>
                Calendars
              </Link>
            </li>
            <li className={loc.pathname === "/events" ? scss.Active : null}>
              <Link to="/events" onClick={() => props.onBurgerMenuOpen()}>
                Events
              </Link>
            </li>
          </ul>
        </div>
      </CSSTransition>
    </>
  );
};

export default Burger;
