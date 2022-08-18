import "./ProductCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faSackDollar,
  faUser,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const ProductCard = (props) => {
  const handleDeleteClick = () => {
    props.onDeleteProduct(props.id);
  };

  const handleEditClick = () => {
    props.onEditProduct(props.id);
  };

  return (
    <div className="col">
      <div className="card h-100">
        <div className="img-div">
          <img src={props.image} className="card-img-top" alt="Product Image" />
        </div>
        <div className="card-body">
          <div className="present-like-container">
            <div className="present-like-icon">
              <FontAwesomeIcon icon={faHeart} size="xl" color="#d20f31" />
              <br />
              <b className="present-likes-counter">
                {props.likes.length === 1
                  ? props.likes.length + " like"
                  : props.likes.length + " likes"}
              </b>
            </div>
            <h5 className="card-title">{props.name}</h5>
          </div>

          <h6 className="card-subtitle mb-2 font-bolder">{props.category}</h6>
          <p className="card-text font-bolder detail-line">
            <FontAwesomeIcon icon={faComment} color="#0072b9" />
            <span> {props.description}</span>
          </p>
          <p className="card-subtitle font-bolder detail-line">
            <FontAwesomeIcon icon={faSackDollar} color="#255e00" />
            <span> {props.price}$</span>
          </p>

          <p className="card-subtitle font-bolder detail-line">
            <FontAwesomeIcon icon={faUser} color="#231f20" />
            <span> {props.creatorName}</span>
          </p>

          <p className="card-subtitle font-bolder detail-line">
            <FontAwesomeIcon icon={faLocationDot} color="#cf2428" />
            <span> {props.creatorAddress}</span>
          </p>

          <p className="card-subtitle font-bolder">
            <FontAwesomeIcon icon={faPhone} color="#13ab00" />
            <span className="product-info"></span> {props.phone}
          </p>
        </div>
        <div className="card-footer">
          <button
            type="button"
            className="btn btn-danger btns"
            onClick={handleDeleteClick}
          >
            Delete
          </button>

          <button
            type="button"
            className="btn btn-info btns"
            onClick={handleEditClick}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
