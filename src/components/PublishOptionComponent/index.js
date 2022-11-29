import React from "react";
import { withTranslation } from "react-i18next";
function PushlishOptionComponent(props) {
  const { t } = props;
  return (
    <div className="bg-white rounded-1 p-24">
      <h3 className="fs-6 fw-bold text-uppercase pb-16 border-bottom">
        {t("txt_publish_options")}
      </h3>
    </div>
  );
}

export default withTranslation("common")(PushlishOptionComponent);
