import React from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useTranslation, withTranslation } from "react-i18next";
import ItemsFormActionBar from "./ItemsFormActionBar";
import PublishOptionComponent from "components/PublishOptionComponent";
import FieldsComponent from "components/FieldsComponent";
import GeneralInformation from "components/GeneralInfomationComponent";
const ItemsFormPage = ({
  store,
  dataForm,
  generateFormSetting,
  path,
  title,
}) => {
  const { t } = useTranslation("common");

  return (
    <>
      <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
        <div>
          <h2 className="fw-bold text-capitalize">{t(title)}</h2>
        </div>
        <ItemsFormActionBar store={store} path={path} />
      </div>
      <Row>
        <Col lg={9} className="mb-24">
          <Tabs defaultActiveKey="fields" className="mb-24 custom-tabs">
            <Tab
              tabClassName="border-0 bg-transparent p-0 pb-16 me-4"
              eventKey="fields"
              title={t("txt_menu_field")}
            >
              <FieldsComponent dataForm={dataForm} />
            </Tab>
            <Tab
              tabClassName="border-0 bg-transparent p-0 pb-16"
              eventKey="general-information"
              title={t("txt_general_information")}
            >
              <GeneralInformation
                store={store}
                viewModel={null}
                generateFormSetting={generateFormSetting}
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
};

export default withTranslation("common")(ItemsFormPage);
