import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
class Categories extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="py-4 px-3 h-100 d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t("txt_menu_cate")}</h2>
            <p className="mb-0 text-color fs-14">20 {t("txt_entries_found")}</p>
          </div>
          <button className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1">
            <Icon icon="akar-icons:plus" className="me-1" />
            {t("txt_add_new_item")}
          </button>
        </div>
      </div>
    );
  }
}

export default withTranslation("common")(Categories);
