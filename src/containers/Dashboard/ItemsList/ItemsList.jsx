import ComponentImage from "components/ComponentImage";
import TabBarComponent from "components/TabBarComponent";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Items from "../Component/Items";
import { withTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
class ItemsList extends Component {
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
      <>
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t("txt_items")}</h2>
            <p className="mb-0 text-color fs-14">{t("txt_dashboard_below")}</p>
          </div>
          <Link
            to="/items-create"
            className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1"
          >
            <Icon icon="akar-icons:plus" width={24} height={24} className="me-1" />
            {t("txt_add_new_item")}
          </Link>
        </div>
        <TabBarComponent tabList={tabList} view={"all-items"} />
        <Items t={t} data={null} />
      </>
    );
  }
}

export default withTranslation("common")(ItemsList);
