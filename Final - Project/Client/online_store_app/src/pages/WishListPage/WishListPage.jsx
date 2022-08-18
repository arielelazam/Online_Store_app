import "./WishListPage.css";
import { useState, useEffect } from "react";
import PresentCard from "../../components/PresentCard/PresentCard";
import axios from "axios";
import { useSelector } from "react-redux";

const WishListPage = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [changed, setChanged] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const loginId = useSelector((state) => state.auth.loggedInId);

  useEffect(() => {
    axios
      .get("/products/allproducts")
      .then((dataFromServer) => {
        setProductsArr(dataFromServer.data);
      })
      .catch((err) => {
        alert("Error:", err);
      });
  }, [changed]);

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
          if (item.likes.includes(loginId || userData._id)) {
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
                onRemoveLike={handleRemoveLike}
              ></PresentCard>
            );
          }
        })}
      </div>
    </div>
  );
};

export default WishListPage;
