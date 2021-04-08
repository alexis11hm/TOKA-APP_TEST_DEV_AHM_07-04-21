import React from "react";
import { Redirect, Route, Switch } from "react-router";

import { Navbar } from "../components/Navbar";
import { PeoplePage } from "../pages/PeoplePage";
import { ReportPage } from "../pages/ReportPage";

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div>
        <Switch>
          <Route exact path="/" component={PeoplePage} />
          <Route exact path="/reports" component={ReportPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};
