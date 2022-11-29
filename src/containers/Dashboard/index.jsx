import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { withBiViewModel } from "store/BiStore/BiViewModelContextProvider";
import { Link, withRouter } from "react-router-dom";
import Items from "./Component/Items";
import ComponentImage from "components/ComponentImage";
import TabBarComponent from "components/TabBarComponent";

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
      const tabList = [
        {
          title: "All items",
          slug: "all-items",
          link: "/all-items",
        },
        {
          title: "Published",
          slug: "published",
          link: "/published",
        },
        {
          title: "Unpublished",
          slug: "unpublished",
          link: "/unpublished",
        },
        {
          title: "Archived",
          slug: "archived",
          link: "/archived",
        },
        {
          title: "Draft",
          slug: "draft",
          link: "/draft",
        },
        {
          title: "Trashed",
          slug: "trashed",
          link: "/trashed",
        },
      ];
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-center justify-content-between mb-32 flex-wrap">
            <div>
              <h2 className="text-blue-0 fw-bold mb-sm">{t("txt_items")}</h2>
              <p className="mb-0 text-color fs-14">
                {t("txt_dashboard_below")}
              </p>
            </div>
            <Link
              to="/create"
              className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1"
            >
              <ComponentImage
                className="me-1 object-fit-contain"
                src="/assets/images/plus.svg"
              />
              {t("txt_add_new_item")}
            </Link>
          </div>
          <TabBarComponent tabList={tabList} view={"all-items"} />

          <Items t={t} data={null} />
        </div>
      );
    }
  }
);

export default withTranslation("common")(
  withRouter(withBiViewModel(Dashboard))
);
