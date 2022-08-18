import "./App.css";
import { Route, Switch, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/auth";
import jwt_decode from "jwt-decode";
import NavBar from "./components/NavBar/NavBar";
import ProductsByCategoryPage from "./pages/ProductsByCategoryPage/ProductsByCategoryPage";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import AuthGuardRoute from "./components/AuthGuardRoute";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage";
import MyProductsPage from "./pages/MyProductsPage/MyProductsPage";
import CreateProductPage from "./pages/CreateProductPage/CreateProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import WishListPage from "./pages/WishListPage/WishListPage";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authActions.logout());
      return;
    }

    const decoded = jwt_decode(token);
    const date = new Date();
    if (decoded.exp < date.getTime() / 1000) {
      dispatch(authActions.logout());
      history.push("/login");
    } else {
      dispatch(authActions.login());
      dispatch(authActions.updatedUser(decoded));
    }
  }, [dispatch, history]);

  return (
    <div className="container-fluid main-site-div">
      <NavBar></NavBar>

      <div className="pagesContainer container">
        <Switch>
          <Route path="/login" exact>
            <LoginPage />
          </Route>
          <AuthGuardRoute path="/home" exact component={HomePage} />

          <AuthGuardRoute path="/myproducts" exact component={MyProductsPage} />
          <AuthGuardRoute
            path="/createproduct"
            exact
            component={CreateProductPage}
          />
          <AuthGuardRoute
            path="/productsbycategory"
            exact
            component={ProductsByCategoryPage}
          />
          <AuthGuardRoute path="/wishlist" exact component={WishListPage} />
          <Route path="/register" exact>
            <RegisterPage />
          </Route>
          <Route path="/aboutus" exact>
            <AboutUsPage />
          </Route>
          <Route path="/notfound" exact>
            <NotFoundPage />
          </Route>
          <Route path="/" exact>
            <LoginPage />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>

      <div className="my-footer-div">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
