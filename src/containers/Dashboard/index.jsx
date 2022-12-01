import React, { lazy, Component } from "react";
import { observer } from "mobx-react";
import { withBiViewModel } from "store/BiStore/BiViewModelContextProvider";
import { Route, withRouter } from "react-router-dom";

const ItemsFormPage = lazy(() => import("./ItemsForm/ItemsFormPage"));
const ItemsList = lazy(() => import("./ItemsList/ItemsList"));

const Dashboard = observer(
  class Dashboard extends Component {
    constructor(props) {
      super(props);
      const { viewModel } = props;
      this.viewModel = viewModel ? viewModel : null;
      this.biListViewModel = this.viewModel
        ? this.viewModel.biListViewModel
        : null;
    }

    componentDidMount() {
      let fetchData = async () => {
        if (
          this.props.history.location.pathname === "/" ||
          !this.props.history.location.pathname
        ) {
          this.props.history.push(`/`);
        }
      };
      fetchData();
    }

    render() {
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
    }
  }
);

export default withRouter(withBiViewModel(Dashboard));
