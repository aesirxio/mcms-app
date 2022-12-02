import { FORM_FIELD_TYPE } from "constants/FormFieldType";
import React, { useContext } from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import FormComponent from "components/Form";
import { ItemsStoreContext } from "store/ItemsStore/Items";

const FieldsComponent = (props) => {
  const itemsStore = useContext(ItemsStoreContext);
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
  const { t } = props;
  return (
    <Tab.Container defaultActiveKey="0">
      <Row>
        <Col lg={4}>
          <div className="bg-white shadow-sm rounded-1 overflow-hidden">
            <h3 className="mb-0 fw-bold fs-6 pt-24 px-24 pb-16 border-bottom text-uppercase">
              {t("txt_menu_field_gr")}
            </h3>
            <ListGroup variant="flush">
              {data?.groups?.map((item, index) => {
                return (
                  <ListGroup.Item
                    className="fs-14 cursor-pointer"
                    eventKey={index}
                    key={index}
                  >
                    {item.name ? item.name : "Non grouped"}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </Col>
        <Col lg={8}>
          <Tab.Content>
            {data?.groups?.map((item, index) => {
              return (
                <Tab.Pane eventKey={index} key={index}>
                  <div className="rounded-1 bg-white shadow-sm p-24">
                    <h3 className="fs-6 mb-24 fw-bold pb-16 border-bottom text-uppercase">
                      {item.name ? item.name : "Non grouped"}
                    </h3>

                    <FormComponent
                      key={Math.random(40, 200)}
                      viewModel={null}
                      generateFormSetting={() => [{ fields: item.fields }]}
                    />
                  </div>
                </Tab.Pane>
              );
            })}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default withTranslation("common")(FieldsComponent);
