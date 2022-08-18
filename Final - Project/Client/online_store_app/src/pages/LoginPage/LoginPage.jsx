import "./LoginPage.css";
import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Joi from "joi-browser";
import { useHistory, NavLink } from "react-router-dom";
import loginSchema from "../../validation/loginValidation";
import { authActions } from "../../store/auth";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const history = useHistory();
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, [emailRef]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOnSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const validatedValue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });

    const { error } = validatedValue;

    if (error) {
      dispatch(authActions.logout());
      alert("Email and/or password incorrect");
      setEmail("");
      setPassword("");
      emailRef.current.focus();
    } else {
      axios
        .post("users/login", { email, password })
        .then((res) => {
          dispatch(authActions.login());
          localStorage.setItem("token", res.data.token);
          history.push("/home");
          const token = res.data.token;
          const decoded = jwt_decode(token);

          const loginId = decoded._id;
          const loginName = decoded.name;
          const loginPhone = decoded.phone;
          const loginAddress = decoded.address;

          dispatch(authActions.loginId(loginId));
          dispatch(authActions.loginUser(loginName));
          dispatch(authActions.loginPhone(loginPhone));
          dispatch(authActions.loginAddress(loginAddress));
          dispatch(authActions.updatedUser(decoded));
        })
        .catch((err) => {
          if (err.response) {
            alert("Email and/or password incorrect");
            setEmail("");
            setPassword("");
            emailRef.current.focus();
          }
          localStorage.clear();
          dispatch(authActions.logout());
        });
    }
  };

  const memoizedCallback = useCallback(() => {
    if (location.state) {
      if (location.state.email && location.state.password) {
        if (!email || !password) {
          setEmail(location.state.email);
          setPassword(location.state.password);
        } else {
          handleOnSubmit();
        }
      }
    }
  }, [location.state, handleOnSubmit, email, password]);

  useEffect(() => {
    memoizedCallback();
  }, [location.state, memoizedCallback]);

  return (
    <form className="my-login-form" onSubmit={handleOnSubmit}>
      <h1 className="my-title">Login now!</h1>
      <label className="my-label" htmlFor="email">
        Email:
      </label>
      <br />
      <input
        type="email"
        id="email"
        value={email}
        ref={emailRef}
        onChange={handleEmailChange}
      ></input>
      <br /> <br />
      <label className="my-label" htmlFor="password">
        Password:
      </label>
      <br />
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      ></input>
      <br />
      <br />
      <button className="btn btn-primary">Login!</button>
      <br />
      <br />
      <br />
      <div>
        <h6>
          Have no account?
          <NavLink
            className="nav-link active"
            aria-current="page"
            to="/register"
            activeClassName="activeLink"
          >
            <div>Register Now!</div>
          </NavLink>
        </h6>
      </div>
    </form>
  );
};

export default LoginPage;
