import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import ItemsFormActionBar from "./ItemsFormActionBar";

class ItemsFormPage extends Component {
  render() {
    const { t } = this.props;
    return (
      <>
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="fw-bold text-capitalize">{t("txt_add_item")}</h2>
          </div>
          <ItemsFormActionBar />
        </div>
      </>
    );
  }
}

export default withTranslation("common")(ItemsFormPage);
