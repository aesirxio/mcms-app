import ComponentImage from "components/ComponentImage";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";

class ItemsFormActionBar extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="d-flex">
        <button className="btn btn-outline-secondary px-16 py-1 text-capitalize rounded-1 me-16 text-danger bg-white border-gray-200">
          <ComponentImage
            className="me-1 object-fit-contain"
            src="/assets/images/save.svg"
          />
          {t("text_cancel")}
        </button>
        <button className="btn btn-outline-secondary px-16 py-1 text-capitalize rounded-1 me-16 text-blue-0 bg-white border-gray-200">
          {t("text_save_close")}
        </button>
        <button className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1">
          <ComponentImage
            className="me-1 object-fit-contain"
            src="/assets/images/save.svg"
          />
          {t("text_save")}
        </button>
      </div>
    );
  }
}

export default withTranslation("common")(ItemsFormActionBar);
