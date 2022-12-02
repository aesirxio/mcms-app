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
import { FORM_FIELD_TYPE } from "constants/FormFieldType";

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
  const data = {
    id: 1,
    groups: [
      {
        name: "",
        fields: [
          {
            label: "Hero Text",
            key: "hero_text",
            type: FORM_FIELD_TYPE.INPUT,
            value: itemsStore.formPropsData?.author ?? "",
            className: "col-12",
            required: true,
            changed: (data) => {
              itemsStore.formPropsData["author"] = data.target.value;
            },
            validation: "required",
          },
          {
            label: "Intro text",
            key: "intro_text",
            type: FORM_FIELD_TYPE.INPUT,
            value: itemsStore.formPropsData
              ? itemsStore.formPropsData["name"]
              : "",
            className: "col-12",
            changed: (data) => {
              itemsStore.formPropsData["name"] = data.target.value;
            },
          },
          {
            label: "Thumb Image",
            key: "thumb_image",
            type: FORM_FIELD_TYPE.IMAGE,
            value: "",
            className: "col-12",
          },
          {
            label: "Image",
            key: "image",
            type: FORM_FIELD_TYPE.IMAGE,
            value: "",
            className: "col-12",
          },
        ],
      },
      {
        name: "SEO",
        fields: [
          {
            label: "Append To Global Meta Data",
            key: "meta_data",
            type: FORM_FIELD_TYPE.DROPDOWN,
            option: [
              { label: "Use Global", value: "use_global" },
              { label: "Append", value: "append" },
              { label: "Prepend", value: "prepend" },
              { label: "Replace", value: "replace" },
              { label: "None", value: "none" },
            ],
            value: { label: "Use Global", value: "use_global" },
            className: "col-12",
            changed: (data) => {
              itemsStore.formPropsData["meta_data"] = data.value;
            },
          },
          {
            label: "SEO Page Title",
            key: "seo_page_title",
            type: FORM_FIELD_TYPE.INPUT,
            value: itemsStore.formPropsData
              ? itemsStore.formPropsData?.name
              : "",
            className: "col-12",
            changed: (data) => {
              // formPropsData.formPropsData.name = data.value;
            },
          },
          {
            label: "SEO Page Heading",
            key: "seo_page_heading",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
          },
          {
            label: "SEO Page Description",
            key: "seo_page_description",
            type: FORM_FIELD_TYPE.TEXTAREA,
            value: "",
            className: "col-12",
          },
          {
            label: "Canonical Url",
            key: "canonical_url",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
          },
          {
            label: "SEO Page Keywords",
            key: "seo_page_keywords",
            type: FORM_FIELD_TYPE.TEXTAREA,
            value: "",
            className: "col-12",
          },
          {
            label: "Meta Language Setting",
            key: "meta_language_setting",
            type: FORM_FIELD_TYPE.TEXTAREA,
            value: itemsStore.formPropsData?.languages ?? "",
            className: "col-12",
          },
          {
            label: "Robots",
            key: "robots",
            type: FORM_FIELD_TYPE.DROPDOWN,
            option: [
              { label: "Use Global", value: "use_global" },
              { label: "index, follow", value: "index_follow" },
              { label: "noindex, follow", value: "noindex_follow" },
              { label: "index, nofollow", value: "index_nofollow" },
              { label: "noindex, nofollow", value: "noindex_nofollow" },
            ],
            value: { label: "Use Global", value: "use_global" },
            className: "col-12",
          },
        ],
      },
    ],
  };
  const generateFormSetting = () => {
    return [
      {
        fields: [
          {
            label: "Name",
            key: "name",
            type: FORM_FIELD_TYPE.INPUT,
            value: itemsStore?.formPropsData
              ? itemsStore?.formPropsData.name
              : "",
            className: "col-12",
            required: true,
            validation: "required",
            changed: (data) => {
              itemsStore.formPropsData["name"] = data.target.value;
            },
          },
          {
            label: "Alias",
            key: "alias",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
          },

          {
            label: "Organisation",
            key: "organisation",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
            placeholder: "Select Organisation",
          },
          {
            label: "Content Type",
            key: "content_type",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
            placeholder: "Select Content Type",
          },
          {
            label: "Parent Category",
            key: "parent_category",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
            placeholder: "Top Level",
          },
          {
            label: "Default Template",
            key: "default_template",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
            placeholder: "Inherit",
          },
          {
            label: "Category",
            key: "category",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
            className: "col-12",
          },
          {
            label: "Tags",
            key: "tags",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
          },
          {
            label: "Version Note",
            key: "version_note",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12 mb-0",
          },
        ],
      },
    ];
  };
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
        <ItemsFormPage
          store={itemsStore}
          dataForm={data}
          generateFormSetting={generateFormSetting}
          path="/"
          title="txt_add_item"
        />
      </Route>
    </div>
  );
});

export default withRouter(withBiViewModel(Dashboard));
