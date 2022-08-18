import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faMagnifyingGlass,
  faRectangleList,
  faCirclePlus,
  faCartShopping,
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);

  const [phones, setPhones] = useState("Phones");
  const [computers, setComputers] = useState("Computers");
  const [accessories, setAccessories] = useState("Accessories");

  const handleLogOut = () => {
    dispatch(authActions.logout());
    dispatch(authActions.loginUser("Guest"));
    localStorage.clear();
  };

  const handlePhones = () => {
    history.push("/productsbycategory", phones);
  };
  const handleComputers = () => {
    history.push("/productsbycategory", computers);
  };
  const handleAccessories = () => {
    history.push("/productsbycategory", accessories);
  };

  return (
    <nav className="my-navbar navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        <h5 className="hello-title">
          Hello {userData.name ? userData.name : "Guest"}!
        </h5>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse"
          id="navbarSupportedContent"
          activeclassname="activeLink"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {loggedIn === true && (
              <li className="nav-item">
                <NavLink
                  className="nav-link active my-nav-link"
                  aria-current="page"
                  to="/home"
                  activeClassName="activeLink"
                >
                  <div>
                    <FontAwesomeIcon icon={faHome} />
                    <span className="nav-bar-title">Home</span>
                  </div>
                </NavLink>
              </li>
            )}

            {loggedIn === false && (
              <li className="nav-item">
                <NavLink
                  className="nav-link disabled"
                  aria-current="page"
                  to="/home"
                  activeClassName="activeLink"
                >
                  <div>
                    <FontAwesomeIcon icon={faHome} />
                    <span className="nav-bar-title">Home</span>
                  </div>
                </NavLink>
              </li>
            )}

            {loggedIn === true && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle active  my-nav-link"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <span className="nav-bar-title">Find Products</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="my-active-nav-link">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                      activeClassName="activeLink"
                    >
                      <div className="all-title">- All</div>
                    </NavLink>
                  </li>

                  <li className="my-active-nav-link" onClick={handlePhones}>
                    <div>- Phones</div>
                  </li>
                  <li className="my-active-nav-link">
                    <div onClick={handleComputers}>- Computers</div>
                  </li>
                  <li
                    className="my-active-nav-link"
                    onClick={handleAccessories}
                  >
                    <div>- Accessories</div>
                  </li>
                </ul>
              </li>
            )}

            {loggedIn === false && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle disabled"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                  <span className="nav-bar-title">Find Products</span>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li className="my-nav-link">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/home"
                      activeClassName="activeLink"
                    >
                      <div>- All</div>
                    </NavLink>
                  </li>

                  <li className="my-nav-link" onClick={handlePhones}>
                    <div>- Phones</div>
                  </li>
                  <li className="my-nav-link">
                    <div onClick={handleComputers}>- Computers</div>
                  </li>
                  <li className="my-nav-link" onClick={handleAccessories}>
                    <div>- Accessories</div>
                  </li>
                </ul>
              </li>
            )}

            {loggedIn === true && (
              <li className="nav-item">
                <NavLink
                  className="nav-link active  my-nav-link"
                  aria-current="page"
                  to="/myproducts"
                  activeClassName="activeLink"
                >
                  <div>
                    <FontAwesomeIcon icon={faRectangleList} />
                    <span className="nav-bar-title">My Products</span>
                  </div>
                </NavLink>
              </li>
            )}
            {loggedIn === false && (
              <li className="nav-item">
                <NavLink
                  className="nav-link disabled"
                  aria-current="page"
                  to="/myproducts"
                  activeClassName="activeLink"
                >
                  <div>
                    <FontAwesomeIcon icon={faRectangleList} />
                    <span className="nav-bar-title">My Products</span>
                  </div>
                </NavLink>
              </li>
            )}

            {loggedIn === true && (
              <li className="nav-item">
                <NavLink
                  className="nav-link active  my-nav-link"
                  aria-current="page"
                  to="/createproduct"
                  activeClassName="activeLink"
                >
                  <div>
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <span className="nav-bar-title">Create Product</span>
                  </div>
                </NavLink>
              </li>
            )}

            {loggedIn === false && (
              <li className="nav-item">
                <NavLink
                  className="nav-link disabled"
                  aria-current="page"
                  to="/createproduct"
                  activeClassName="activeLink"
                >
                  <div>
                    <FontAwesomeIcon icon={faCirclePlus} />
                    <span className="nav-bar-title">Create Product</span>
                  </div>
                </NavLink>
              </li>
            )}

            {loggedIn === true && (
              <li className="nav-item">
                <NavLink
                  className="nav-link active my-nav-link"
                  aria-current="page"
                  to="/wishlist"
                  activeClassName="activeLink"
                >
                  <div>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="nav-bar-title">My Wish List</span>
                  </div>
                </NavLink>
              </li>
            )}

            {loggedIn === false && (
              <li className="nav-item">
                <NavLink
                  className="nav-link disabled"
                  aria-current="page"
                  to="/wishlist"
                  activeClassName="activeLink"
                >
                  <div>
                    <FontAwesomeIcon icon={faCartShopping} />
                    <span className="nav-bar-title">My Wish List</span>
                  </div>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>

      {loggedIn === false && (
        <NavLink className="nav-link active" aria-current="page" to="/login">
          <button type="button" className="nav-item btn btn-primary sign-btn">
            <FontAwesomeIcon icon={faArrowRightToBracket} />
            <span className="btn-container">Login</span>
          </button>
        </NavLink>
      )}
      {loggedIn === true && (
        <NavLink className="nav-link active" aria-current="page" to="/login">
          <button
            type="button"
            className="nav-item btn btn-danger sign-btn"
            onClick={handleLogOut}
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <span className="btn-container">Logout</span>
          </button>
        </NavLink>
      )}
    </nav>
  );
};

export default NavBar;
