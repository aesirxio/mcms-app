import React, { lazy, useEffect } from "react";
import { observer } from "mobx-react";
import { withBiViewModel } from "store/BiStore/BiViewModelContextProvider";
import { Route, withRouter } from "react-router-dom";

const ItemsFormPage = lazy(() => import("./ItemsForm/ItemsFormPage"));
const ItemsList = lazy(() => import("./ItemsList/ItemsList"));

const Dashboard = observer(() => {
  useEffect(() => {
    let fetchData = async () => {
      if (
        this.props.history.location.pathname === "/" ||
        !this.props.history.location.pathname
      ) {
        this.props.history.push(`/`);
      }
    };
    fetchData();
  });
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <Route exact path={["/"]}>
        <ItemsList />
      </Route>
      <Route exact path={["/items-create", "/items-edit/:id"]}>
        <ItemsFormPage />
      </Route>
    </div>
  );
});

export default withRouter(withBiViewModel(Dashboard));
