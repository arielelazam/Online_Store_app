import { React } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuardRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/notfound",
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthGuardRoute;
