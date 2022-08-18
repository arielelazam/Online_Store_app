import "./MyProductsPage.css";
import { useLocation } from "react-router-dom";
import { useState, Fragment, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import ProductEditor from "../../components/ProductEditor/ProductEditor";
import axios from "axios";

const MyProductsPage = () => {
  const location = useLocation();

  const [productsArr, setProductsArr] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);

  const handleDeleteProduct = (id) => {
    const confirm = window.confirm(
      "Are you sure you want delete this product?"
    );
    if (confirm === true) {
      axios
        .delete(`/products/${id}`)
        .then((res) => {
          if (hasChanged === true) {
            setHasChanged(false);
          } else {
            setHasChanged(true);
          }
        })
        .catch((err) => {
          alert("Error:", err);
        });
    }
  };

  const handleEditProduct = (id) => {
    let newProduct = productsArr.find((product) => {
      return product._id === id;
    });
    if (newProduct) {
      setSelectedProduct({ ...newProduct });
    }
  };

  const handleUpdateProduct = (
    name,
    description,
    category,
    price,
    image,
    id
  ) => {
    const editedProduct = productsArr.find((product) => {
      return product._id === id;
    });

    if (editedProduct) {
      axios
        .put(`/products/${id}`, { name, description, category, price, image })
        .then((res) => {
          setSelectedProduct(null);
          if (hasChanged === true) {
            setHasChanged(false);
          } else {
            setHasChanged(true);
          }
        })
        .catch((err) => {
          alert("Error:", err);
        });
    }
  };

  const handleCancelClick = () => {
    setSelectedProduct(null);
  };

  useEffect(() => {
    axios.get("products/myproducts").then((dataFromServer) => {
      setProductsArr(dataFromServer.data);
    });
  }, [hasChanged]);

  useEffect(() => {
    axios.get("products/myproducts").then((dataFromServer) => {
      setProductsArr(dataFromServer.data);
    });
  }, [location.state]);

  return (
    <Fragment>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {productsArr.map((item) => {
          return (
            <ProductCard
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              category={item.category}
              price={item.price}
              likes={item.likes}
              image={item.image}
              phone={item.phone}
              creatorName={item.creatorName}
              creatorAddress={item.creatorAddress}
              onDeleteProduct={handleDeleteProduct}
              onEditProduct={handleEditProduct}
            ></ProductCard>
          );
        })}
      </div>
      {selectedProduct !== null && (
        <ProductEditor
          id={selectedProduct._id}
          name={selectedProduct.name}
          description={selectedProduct.description}
          price={selectedProduct.price}
          category={selectedProduct.category}
          image={selectedProduct.image}
          onUpdateCard={handleUpdateProduct}
          onCancelProduct={handleCancelClick}
        ></ProductEditor>
      )}
    </Fragment>
  );
};

export default MyProductsPage;
