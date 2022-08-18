import "./CreateProductPage.css";
import Joi from "joi-browser";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import createProductSchema from "../../validation/createProductSchema";
import { useHistory } from "react-router-dom";

const CreateProductPage = () => {
  const history = useHistory();
  const userData = useSelector((state) => state.auth.userData);

  const loginPhone = userData.phone;
  const loginName = userData.name;
  const loginAddress = userData.address;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Phones");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const [nameError, setNameError] = useState([]);
  const [descriptionError, setDescriptionError] = useState([]);
  const [priceError, setPriceError] = useState([]);
  const [imageError, setImageError] = useState([]);

  const sended = true;

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handlePrice = (event) => {
    setPrice(event.target.value);
  };
  const handleCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleImage = (event) => {
    setImage(event.target.value);
  };

  const handleCreateProduct = (event) => {
    event.preventDefault();

    const validatedValue = Joi.validate(
      { name, description, price, category, image },
      createProductSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validatedValue;
    if (error) {
      let newNameErr = [];
      let newDescriptionErr = [];
      let newPriceErr = [];
      let newImageErr = [];

      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];

        if (errSrc === "name") {
          newNameErr = [...newNameErr, errMsg];
        }
        if (errSrc === "description") {
          newDescriptionErr = [...newDescriptionErr, errMsg];
        }
        if (errSrc === "price") {
          newPriceErr = [...newPriceErr, errMsg];
        }
        if (errSrc === "image") {
          newImageErr = [...newImageErr, errMsg];
        }

        setNameError(newNameErr);
        setDescriptionError(newDescriptionErr);
        setPriceError(newPriceErr);
        setImageError(newImageErr);
      });
    } else {
      axios
        .post("/products/createnewproduct", {
          name,
          description,
          price,
          category,
          phone: loginPhone,
          creatorName: loginName,
          creatorAddress: loginAddress,
          image,
        })
        .then(history.push("/home", { sended }))
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <form onSubmit={handleCreateProduct}>
      <h1 className="my-title">
        Publish a new product you would like to sell!
      </h1>
      <div className="form-row">
        <div className="form-group col-md-6 create-row">
          <label htmlFor="inputEmail4">Name:</label>
          <input
            type="tel"
            className="form-control"
            id="inputEmail4"
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

        <div className="form-group col-md-6 create-row">
          <label htmlFor="inputPassword4">Description:</label>
          <input
            type="text"
            className="form-control"
            id="inputPassword4"
            placeholder="Description"
            value={description}
            onChange={handleDescription}
          />
          {descriptionError.map((item, idx) => {
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
      <div className="form-group col-md-6 create-row">
        <label htmlFor="inputEmail4">Price($):</label>
        <input
          type="Number"
          className="form-control"
          id="inputEmail4"
          placeholder="Price"
          value={price}
          onChange={handlePrice}
        />
        {priceError.map((item, idx) => {
          return (
            <ul key={idx}>
              <li className="errMsg" key={idx}>
                *{item}.
              </li>
            </ul>
          );
        })}
      </div>

      <div className="form-group col-md-6 create-row">
        <label htmlFor="inputEmail4">Image URL:</label>
        <input
          type="text"
          className="form-control"
          id="inputEmail4"
          placeholder="URL"
          value={image}
          onChange={handleImage}
        />
        {imageError.map((item, idx) => {
          return (
            <ul key={idx}>
              <li className="errMsg" key={idx}>
                *{item}.
              </li>
            </ul>
          );
        })}
      </div>
      <div className="form-group col-md-6 create-row">
        <label htmlFor="inputEmail4">Category:</label>
        <br />
        <select id="categories" name="categories" onChange={handleCategory}>
          <option value="Phones">Phones</option>
          <option value="Computers">Computers</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      <br />
      <button type="submit" className="btn btn-primary">
        Create Product!
      </button>
    </form>
  );
};

export default CreateProductPage;
