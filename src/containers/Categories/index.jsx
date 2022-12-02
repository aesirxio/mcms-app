import React, { lazy, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { observer } from "mobx-react";
import TabBarComponent from "components/TabBarComponent";
const CategoriesComponent = lazy(() => import("./Component/Categories"));
const Categories = observer(() => {
  const [filterTab, setFilterTab] = useState("");
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
  const { t } = useTranslation("common");
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <div>
        <h2 className="text-blue-0 fw-bold mb-sm">{t("txt_menu_cate")}</h2>
        <p className="mb-0 text-color fs-14">20 {t("txt_entries_found")}</p>
      </div>
      <div className="py-4 h-100 d-flex flex-column">
        <TabBarComponent
          tabList={tabList}
          view={"all-items"}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
        />
        {/* <ItemsStoreContext.Provider value={itemsStore}> */}
        <CategoriesComponent
          t={t}
          data={null}
          setFilter={setFilterTab}
          filterTab={filterTab}
        />
        {/* </ItemsStoreContext.Provider> */}
      </div>
    </div>
  );
});

export default withTranslation("common")(Categories);
