import React from "react";
import { withTranslation, useTranslation } from "react-i18next";

const AvatarDAM = ({ children }) => {
  const { t } = useTranslation("common");

  return (
    <div className="col-3">
      <label className="form-label mb-3" htmlFor="name">
        <span className="text-blue-0">{t("txt_your_avatar")}</span>
      </label>
      <div className="mb-3">{children}</div>
    </div>
  );
};

export default withTranslation("common")(AvatarDAM);
