import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../../Storage/auth-context";
import scss from "./Header.module.scss";
import Nav from "./Nav/Nav";
import Burger from "./Burger/Burger";
import Pizza from "../../../Storage/img/Circles.png";

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  const [burgerIsOpen, setBurgerIsOpen] = useState(false);
  const navigate = useNavigate();

  const burgerMenuHandler = () => {
    setBurgerIsOpen((prevState) => !prevState);
  };

  return (
    <header className={scss.Header}>
      <img src={Pizza} className={scss.PizzaImg}/>
      <div className={scss.LeftBox}>
        <Link to="/" className={scss.Logo} onClick={burgerIsOpen ? burgerMenuHandler : null}>
          <span className={scss.LogoText}>CHRONOS</span>
        </Link>

        <Burger
        onBurgerMenuOpen={burgerMenuHandler}
        burgerIsOpen={burgerIsOpen}
        />
      </div>
      {!authCtx.isLoggedIn && (
        <div className={scss.RightBox}>
          <button
            className={`${scss.Button} ${scss.SignIn}`}
            onClick={() => navigate("/signIn")}
          >
            Sign In
          </button>
          <button
            className={`${scss.Button} ${scss.SignUp}`}
            onClick={() => navigate("/signUp")}
          >
            Sign Up
          </button>
        </div>
      )}
      {authCtx.isLoggedIn && (
        <div className={scss.RightBox}>
          <button
            className={`${scss.Button} ${scss.Profile}`}
            onClick={() => navigate("/profile")}
          >
            {authCtx.userLogin}
          </button>
          <button
            className={`${scss.Button} ${scss.Logout}`}
            onClick={() => {
              authCtx.logout();
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
