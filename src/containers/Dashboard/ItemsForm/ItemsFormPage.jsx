import React, { Component } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import ItemsFormActionBar from "./ItemsFormActionBar";
import PublishOptionComponent from "components/PublishOptionComponent";
import FieldsComponent from "components/FieldsComponent";
import GeneralInformation from "components/GeneralInfomationComponent";
class ItemsFormPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  formPropsData = {};
  updateGeneralViewModel = null;
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
          <Col lg={9} className="mb-24">
            <Tabs defaultActiveKey="fields" className="mb-24 custom-tabs">
              <Tab
                tabClassName="border-0 bg-transparent p-0 pb-16 me-4"
                eventKey="fields"
                title={t("txt_menu_field")}
              >
                <FieldsComponent />
              </Tab>
              <Tab
                tabClassName="border-0 bg-transparent p-0 pb-16"
                eventKey="general-information"
                title={t("txt_general_information")}
              >
                <GeneralInformation
                  formPropsData={this.formPropsData}
                  viewModel={this.updateGeneralViewModel}
                />
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
