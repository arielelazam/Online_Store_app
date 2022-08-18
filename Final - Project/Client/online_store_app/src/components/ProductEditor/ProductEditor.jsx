import "./ProductEditor.css";
import { useState } from "react";
import Joi from "joi-browser";
import createProductSchema from "../../validation/createProductSchema";

const ProductEditor = (props) => {
  const [name, setName] = useState(props.name);
  const [description, setDescription] = useState(props.description);
  const [category, setCategory] = useState(props.category);
  const [price, setPrice] = useState(props.price);
  const [image, setImage] = useState(props.image);

  const [nameError, setNameError] = useState([]);
  const [descriptionError, setDescriptionError] = useState([]);
  const [priceError, setPriceError] = useState([]);
  const [imageError, setImageError] = useState([]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };
  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const handleSubmit = (event) => {
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
      props.onUpdateCard(name, description, category, price, image, props.id);
    }
  };

  const handleCancel = () => {
    props.onCancelProduct();
  };

  return (
    <form className="popup-wrapper" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Name:</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={name}
          onChange={handleNameChange}
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
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Description:</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={description}
          onChange={handleDescriptionChange}
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
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">price($):</label>
        <input
          type="Number"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={price}
          onChange={handlePriceChange}
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
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Image URL:</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={image}
          onChange={handleImageChange}
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

      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Category:</label> <br />
        <select
          id="categories"
          name="categories"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="Phones">Phones</option>
          <option value="Computers">Computers</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>

      <br />
      <div className="my-btns-div">
        <button type="submit" className="btn btn-success">
          Update!
        </button>
        <button type="button" className="btn btn-danger" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProductEditor;
