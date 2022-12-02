import React, { lazy, useContext, useEffect, useState } from "react";
import { observer } from "mobx-react";
import { withBiViewModel } from "store/BiStore/BiViewModelContextProvider";
import { Route, withRouter } from "react-router-dom";
import TabBarComponent from "components/TabBarComponent";
import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";
import history from "routes/history";
import { ItemsStoreContext } from "store/ItemsStore/Items";

const ItemsFormPage = lazy(() =>
  import("../../components/ItemsForm/ItemsFormPage")
);
const Items = lazy(() => import("./Component/Items"));

const Dashboard = observer(() => {
  const itemsStore = useContext(ItemsStoreContext);
  useEffect(() => {
    let fetchData = async () => {
      if (history.location.pathname === "/" || !history.location.pathname) {
        history.push(`/`);
      }
    };
    fetchData();
  }, []);
  const [filterTab, setFilterTab] = useState("");
  const { t } = useTranslation("common");
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <Route exact path={["/"]}>
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t("txt_items")}</h2>
            <p className="mb-0 text-color fs-14">{t("txt_dashboard_below")}</p>
          </div>
          <Link
            to="/items-create"
            className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1"
            onClick={() => itemsStore.clearData()}
          >
            <Icon
              icon="akar-icons:plus"
              width={24}
              height={24}
              className="me-1"
            />
            {t("txt_add_new_item")}
          </Link>
        </div>
        <TabBarComponent
          view={"all-items"}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
        />
        <Items
          t={t}
          data={null}
          setFilter={setFilterTab}
          filterTab={filterTab}
        />
      </Route>
      <Route exact path={["/items-create", "/items-edit/:id"]}>
        <ItemsFormPage store={itemsStore} />
      </Route>
    </div>
  );
});

export default withRouter(withBiViewModel(Dashboard));
