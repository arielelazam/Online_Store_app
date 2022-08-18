import "./PresentCard.css";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faSackDollar,
  faUser,
  faPhone,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const PresentCard = (props) => {
  const loginId = useSelector((state) => state.auth.loggedInId);
  const userData = useSelector((state) => state.auth.userData);

  const handleLikeClick = () => {
    props.onLikeProduct(props.id);
  };

  const handleRemoveLikeClick = () => {
    props.onRemoveLike(props.id);
  };
  return (
    <div className="col present-card-div">
      <div className="card h-100">
        <div className="img-div">
          <img src={props.image} className="card-img-top" alt="Product Image" />
        </div>

        <div className="card-body">
          <div className="like-container">
            {props.likes.includes(loginId || userData._id) ? (
              <div className="like-icon">
                <FontAwesomeIcon
                  icon={faHeart}
                  size="xl"
                  onClick={handleRemoveLikeClick}
                  color="#d20f31"
                />
                <br />
                <b className="likes-counter">
                  {props.likes.length === 1
                    ? props.likes.length + " like"
                    : props.likes.length + " likes"}
                </b>
              </div>
            ) : (
              <div className="like-icon">
                <FontAwesomeIcon
                  icon={faHeart}
                  size="xl"
                  onClick={handleLikeClick}
                />
                <br />
                <b className="likes-counter">
                  {props.likes.length === 1
                    ? props.likes.length + " like"
                    : props.likes.length + " likes"}
                </b>
              </div>
            )}

            <h5 className="card-title">{props.name}</h5>
            <h6 className="card-subtitle mb-2 font-bolder">{props.category}</h6>
          </div>
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
      </div>
    </div>
  );
};

export default PresentCard;
