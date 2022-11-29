import React, { Component } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import ItemsFormActionBar from "./ItemsFormActionBar";
import PublishOptionComponent from "components/PublishOptionComponent";
import { FORM_FIELD_TYPE } from "constants/FormFieldType";
import FormComponent from "components/Form";
class ItemsFormPage extends Component {
  formPropsData = {};
  updateGeneralViewModel = null;
  generateFormSetting = () => {
    return [
      {
        fields: [
          {
            label: "Name",
            key: "name",
            type: FORM_FIELD_TYPE.INPUT,
            value: "",
            className: "col-12",
            required: true,
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
  render() {
    const { t } = this.props;
    return (
      <>
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="fw-bold text-capitalize">{t("txt_add_item")}</h2>
          </div>
          <ItemsFormActionBar />
        </div>
        <Row>
          <Col lg={9}>
            <Tabs defaultActiveKey="fields" className="mb-24">
              <Tab
                tabClassName="border-0 bg-transparent p-0 pb-16 me-4"
                eventKey="fields"
                title={t("txt_menu_field")}
              ></Tab>
              <Tab
                tabClassName="border-0 bg-transparent p-0 pb-16"
                eventKey="general-information"
                title={t("txt_general_information")}
              >
                <div className="rounded-1 bg-white p-24">
                  <FormComponent
                    key={Math.random(40, 200)}
                    formPropsData={this.formPropsData}
                    viewModel={this.updateGeneralViewModel}
                    generateFormSetting={() => this.generateFormSetting()}
                  />
                </div>
              </Tab>
            </Tabs>
          </Col>
          <Col lg={3}>
            <PublishOptionComponent />
          </Col>
        </Row>
      </>
    );
  }
}

export default withTranslation("common")(ItemsFormPage);
