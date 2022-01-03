import React, {
  useRef,
  useState,
  useContext,
} from "react";
import AuthContext from "../../Storage/auth-context";
import scss from "./SignUp.module.scss";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";
import { message } from "antd";
import api from "../../Services/api";


const SignUp = (props) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const full_nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const password_confirmationRef = useRef("");
  const loginRef = useRef("");

  const submitHandler = async (event) => {
    event.preventDefault();
    if (passwordRef.current.value.length < 4) {
      message.error("Password have to be more than 4 symbols!");
      return;
    }
    if (passwordRef.current.value !== password_confirmationRef.current.value) {
      message.error("Password are not equel!");
      return;
    }
    setIsLoading(true);
    const user = {
      login: loginRef.current.value,
      full_name: full_nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: password_confirmationRef.current.value,
    };
    try {
      const response = await api().post("api/auth/register", {
        ...user,
      });

      if (response.status !== 200) {
        throw new Error(response.data.message);
      } else {
        message.success("Registration succeed😊 Now login!");
        navigate("/signIn");
      }
    } catch (error) {
      message.error(error.toString());
    }
    setIsLoading(false);
  };

  return (
    <div className={scss.SignUpDiv}>
      <div className={scss.SignUp}>
        <span className={scss.IntroText}>
          Sign Up
        </span>
        {isLoading && (
          <Loader
            type="TailSpin"
            color="#D2E1FF"
            height={100}
            width={100}
            timeout={3000}
            className={scss.Loader}
          />
        )}
        {!isLoading && (
          <form onSubmit={submitHandler}>
            <input type="text" placeholder="Login" ref={loginRef} required />
            <input type="text" placeholder="Full Name" ref={full_nameRef} required />
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
            />
            <input
              type="password"
              placeholder="Password Again"
              ref={password_confirmationRef}
              required
            />
            <button type="submit" className={scss.button}>
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
