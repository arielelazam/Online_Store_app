import "./RegisterPage.css";
import registerSchema from "../../validation/registerValidation";
import Joi from "joi-browser";
import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const RegisterPage = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [nameError, setNameError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [phoneError, setPhoneError] = useState([]);
  const [addressError, setAddressError] = useState([]);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const validatedValue = Joi.validate(
      { name, email, phone, address, password },
      registerSchema,
      { abortEarly: false }
    );
    const { error } = validatedValue;

    if (error) {
      let newNameErr = [];
      let newEmailErr = [];
      let newPasswordErr = [];
      let newPhoneErr = [];
      let newAddressErr = [];
      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];

        if (errSrc === "name") {
          newNameErr = [...newNameErr, errMsg];
        }
        if (errSrc === "email") {
          newEmailErr = [...newEmailErr, errMsg];
        }
        if (errSrc === "password") {
          newPasswordErr = [...newPasswordErr, errMsg];
        }
        if (errSrc === "phone") {
          newPhoneErr = [...newPhoneErr, errMsg];
        }
        if (errSrc === "address") {
          newAddressErr = [...newAddressErr, errMsg];
        }
      });

      setNameError(newNameErr);
      setEmailError(newEmailErr);
      setPasswordError(newPasswordErr);
      setPhoneError(newPhoneErr);
      setAddressError(newAddressErr);
    } else {
      axios
        .post("users/register", { name, email, password, phone, address })
        .then((res) => {
          history.push("/login", { email, password });
        })
        .catch((err) => {
          if (err.response) {
            alert("Email already exist");
          }
        });
    }
  };

  return (
    <div className="my-register-form">
      <h1 className="my-title">Register now!</h1>
      <form onSubmit={handleRegister}>
        <div className="form-group row register-row ">
          <label
            htmlFor="inputEmail3"
            className="register-input col-sm-1 col-form-label "
          >
            Name:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control register-form-control"
              id="inputEmail3"
              placeholder="Name"
              value={name}
              onChange={handleName}
            />
            {nameError.map((item, idx) => {
              return (
                <ul key={idx}>
                  <li className="errMsg" key={idx}>
                    *{item}.
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div className="form-group row register-row">
          <label
            htmlFor="inputEmail3"
            className="register-inputs col-sm-1 col-form-label"
          >
            Email:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control register-form-control"
              id="inputEmail4"
              placeholder="Email"
              value={email}
              onChange={handleEmail}
            />
            {emailError.map((item, idx) => {
              return (
                <ul key={idx}>
                  <li className="errMsg" key={idx}>
                    *{item}.
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div className="form-group row register-row">
          <label
            htmlFor="inputEmail3"
            className="register-inputs col-sm-1 col-form-label"
          >
            Phone:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control register-form-control"
              id="inputEmail5"
              placeholder="Phone"
              value={phone}
              onChange={handlePhone}
            />
            {phoneError.map((item, idx) => {
              return (
                <ul key={idx}>
                  <li className="errMsg" key={idx}>
                    *{item}.
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div className="form-group row register-row">
          <label
            htmlFor="inputEmail3"
            className="register-inputs col-sm-1 col-form-label"
          >
            Address:
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control register-form-control"
              id="inputEmail6"
              placeholder="Address"
              value={address}
              onChange={handleAddress}
            />
            {addressError.map((item, idx) => {
              return (
                <ul key={idx}>
                  <li className="errMsg" key={idx}>
                    *{item}.
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div className="form-group row register-row">
          <label
            htmlFor="inputEmail3"
            className="register-input col-sm-1 col-form-label"
          >
            Password:
          </label>
          <div className="col-sm-3">
            <input
              type="password"
              className="form-control register-form-control"
              id="inputEmail7"
              placeholder="Password"
              value={password}
              onChange={handlePassword}
            />
            {passwordError.map((item, idx) => {
              return (
                <ul key={idx}>
                  <li className="errMsg" key={idx}>
                    *{item}.
                  </li>
                </ul>
              );
            })}
          </div>
        </div>

        <div className="form-group row"></div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Register!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
