import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { withBiViewModel } from "store/BiStore/BiViewModelContextProvider";
import { withRouter } from "react-router-dom";
import Revenue from "./Component/Revenue";
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
      const { t } = this.props;
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
            <div className="position-relative">
              <h2 className="text-blue-0 fw-bold mb-8px">{t("txt_items")}</h2>
              <p className="mb-0 text-color">{t("txt_dashboard_below")}</p>
            </div>
          </div>
          <Revenue t={t} data={null} />
        </div>
      );
    }
  }
);

export default withTranslation("common")(
  withRouter(withBiViewModel(Dashboard))
);
