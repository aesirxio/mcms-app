import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import { withRouter } from "react-router-dom";
class ItemsFormActionBar extends Component {
  render() {
    const { t, history, path, itemsStore } = this.props;
    const redirect = true;
    return (
      <div className="d-flex">
        <button
          onClick={() => history.push(path ?? "/")}
          className="btn btn-outline-secondary px-16 py-11 text-capitalize rounded-1 me-16 text-danger bg-white border-gray-200 d-flex align-items-center"
        >
          <Icon className="me-1" icon="iconoir:cancel" width={24} height={24} />
          {t("txt_cancel")}
        </button>
        <button
          className="btn btn-outline-secondary px-16 py-11 text-capitalize rounded-1 me-16 text-blue-0 bg-white border-gray-200"
          onClick={() =>
            itemsStore.editData(itemsStore.formPropsData, redirect)
          }
        >
          {t("txt_save_close")}
        </button>
        <button
          className="btn btn-success px-16 py-11 text-capitalize fw-semibold rounded-1 d-flex align-items-center"
          onClick={() => itemsStore.editData(itemsStore.formPropsData)}
        >
          <Icon className="me-1" icon="teenyicons:save-outline" />
          {t("txt_save")}
        </button>
      </div>
    );
  }
}

export default withRouter(withTranslation("common")(ItemsFormActionBar));
