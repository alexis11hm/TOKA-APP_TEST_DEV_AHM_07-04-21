import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch} from "react-router-dom";

import { startChecking } from "../actions/auth";
import { LoginPage } from "../pages/LoginPage";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const { uid, checking} = useSelector((state) => state.auth);

  useEffect(() => {
    
    dispatch(
      startChecking(
        localStorage.getItem("email") || "",
        localStorage.getItem("key") || ""
      )
    );
  }, [dispatch]);

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              exact
              path="/login"
              component={LoginPage}
              isLogged={!!uid}
            />
            <PrivateRoute
              path="/"
              component={DashboardRoutes}
              isLogged={!!uid}
            />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
