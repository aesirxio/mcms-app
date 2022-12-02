import React, { lazy, useContext, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { observer } from "mobx-react";
import TabBarComponent from "components/TabBarComponent";
import { Route } from "react-router-dom";
import { CategoriesStoreContext } from "store/CategoriesStore/Categories";

const CategoriesComponent = lazy(() => import("./Component/Categories"));
const ItemsFormPage = lazy(() =>
  import("../../components/ItemsForm/ItemsFormPage")
);

const Categories = observer(() => {
  const categoriesStore = useContext(CategoriesStoreContext);
  const [filterTab, setFilterTab] = useState("");
  const [entriesFound, setEntriesFound] = useState(0);
  const { t } = useTranslation("common");
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column overflow-hidden">
      <div>
        <h2 className="text-blue-0 fw-bold mb-sm">{t("txt_menu_cate")}</h2>
        <p className="mb-0 text-color fs-14">
          {entriesFound} {t("txt_entries_found")}
        </p>
      </div>
      <div className="py-3 h-100 d-flex flex-column">
        <TabBarComponent
          view={"all-items"}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
        />
        <CategoriesComponent
          t={t}
          data={null}
          setFilter={setFilterTab}
          filterTab={filterTab}
          setEntriesFound={setEntriesFound}
        />
        <Route exact path={["/items-create", "/items-edit/:id"]}>
          <ItemsFormPage store={categoriesStore} />
        </Route>
      </div>
    </div>
  );
});

export default withTranslation("common")(Categories);
