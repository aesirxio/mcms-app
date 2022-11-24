import React from "react";
// import { withTranslation } from "react-i18next";

const Categories = () => {
  // const { t } = withTranslation("common");
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
        <div className="position-relative">
          <h2 className="text-blue-0 fw-bold mb-8px">Field Groups</h2>
          <p className="mb-0 text-color">
            Create, edit, and manage the field group on your site
          </p>
        </div>
        <div className="position-relative"></div>
      </div>
    </div>
  );
};

export default Categories;
