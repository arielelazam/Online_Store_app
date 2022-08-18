import "./ProductsByCategoryPage.css";
import PresentCard from "../../components/PresentCard/PresentCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const ProductsByCategoryPage = () => {
  const location = useLocation();
  const category = location.state;

  const [productsArr, setProductsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    axios.get(`/products/allproducts/${category}`).then((dataFromServer) => {
      setProductsArr(dataFromServer.data);
    });
  }, [location.state, changed]);

  useEffect(() => {
    if (productsArr.length > 0) {
      setLoaded(true);
    }
  }, [productsArr]);

  const handleLike = (id) => {
    axios
      .post(`/products/addtowishlist/${id}`)
      .then(() => {
        if (changed === true) {
          setChanged(false);
        } else {
          setChanged(true);
        }
      })
      .catch((err) => {
        alert("Error:", err);
      });
  };

  const handleRemoveLike = (id) => {
    axios
      .post(`products/removefromwishlist/${id}`)
      .then(() => {
        if (changed === true) {
          setChanged(false);
        } else {
          setChanged(true);
        }
      })
      .catch((err) => {
        alert("Error:", err);
      });
  };

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4 home-main-div">
        {!loaded && <h1>loading...</h1>}
        {productsArr.map((item) => {
          return (
            <PresentCard
              key={item._id}
              id={item._id}
              name={item.name}
              likes={item.likes}
              description={item.description}
              category={item.category}
              price={item.price}
              image={item.image}
              phone={item.phone}
              creatorName={item.creatorName}
              creatorAddress={item.creatorAddress}
              onLikeProduct={handleLike}
              onRemoveLike={handleRemoveLike}
            ></PresentCard>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsByCategoryPage;
