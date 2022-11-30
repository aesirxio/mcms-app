import { FORM_FIELD_TYPE } from "constants/FormFieldType";
import React from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import FormComponent from "components/Form";

const FieldsComponent = (props) => {
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
            value: "",
            className: "col-12",
            required: true,
          },
          {
            label: "Intro text",
            key: "intro text",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
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
            value: "",
            className: "col-12",
          },
          {
            label: "SEO Page Title",
            key: "seo_page_title",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
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
            value: "",
            className: "col-12",
          },
          {
            label: "Robots",
            key: "robots",
            type: FORM_FIELD_TYPE.DROPDOWN,
            value: "",
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
                <Tab.Pane eventKey={index}>
                  <div className="rounded-1 bg-white shadow-sm p-24">
                    <h3 className="fs-6 mb-24 fw-bold pb-16 border-bottom text-uppercase">
                      {item.name ? item.name : "Non grouped"}
                    </h3>

                    <FormComponent
                      key={Math.random(40, 200)}
                      formPropsData={{}}
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
