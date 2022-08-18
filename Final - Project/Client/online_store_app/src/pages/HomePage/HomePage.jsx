import "./HomePage.css";
import PresentCard from "../../components/PresentCard/PresentCard";
import { useEffect, useState } from "react";
import axios from "axios";

const HomePage = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [changed, setChanged] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [searchLine, setSearchLIne] = useState("");

  useEffect(() => {
    axios.get("/products/allproducts").then((dataFromServer) => {
      setProductsArr(dataFromServer.data);
    });
  }, [changed]);

  useEffect(() => {
    if (productsArr.length > 0) {
      setLoaded(true);
      setNotFound(false);
    } else {
      setNotFound(true);
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

  const handleSearchChange = (event) => {
    setSearchLIne(event.target.value);
  };

  return (
    <div>
      <form className="form-inline my-2 my-lg-0 search-form">
        <input
          className="mr-sm-2 my-search-area "
          type="text"
          placeholder="Search Product..."
          aria-label="Search"
          value={searchLine}
          onChange={handleSearchChange}
        />
        {notFound === true && <h3>Not Founded Products</h3>}
      </form>

      <div className="row row-cols-1 row-cols-md-3 g-4 home-main-div">
        {!loaded && <h1>loading...</h1>}

        {productsArr
          .filter((val) => {
            if (searchLine === "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchLine.toLocaleLowerCase())
            ) {
              return val;
            }
          })
          .map((item) => {
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

export default HomePage;
