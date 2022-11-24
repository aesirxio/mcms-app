import React from "react";
// import { withTranslation } from "react-i18next";

const Categories = () => {
  // const { t } = withTranslation("common");
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <div className="d-flex align-items-center justify-content-between mb-24 flex-wrap">
        <div className="position-relative">
          <h2 className="text-blue-0 fw-bold mb-8px">Content Type</h2>
          <p className="mb-0 text-color">20 entries found</p>
        </div>
        <div className="position-relative"></div>
      </div>
    </div>
  );
};

export default Categories;
