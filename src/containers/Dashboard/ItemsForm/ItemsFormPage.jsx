import React, { useContext, useEffect } from "react";
import { Col, Row, Tab, Tabs } from "react-bootstrap";
import { useTranslation, withTranslation } from "react-i18next";
import ItemsFormActionBar from "./ItemsFormActionBar";
import PublishOptionComponent from "components/PublishOptionComponent";
import FieldsComponent from "components/FieldsComponent";
import GeneralInformation from "components/GeneralInfomationComponent";
import { ItemsStoreContext } from "store/ItemsStore/Items";
const ItemsFormPage = () => {
  const itemsStore = useContext(ItemsStoreContext);
  const { t } = useTranslation("common");

  return (
    <>
      <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
        <div>
          <h2 className="fw-bold text-capitalize">{t("txt_add_item")}</h2>
        </div>
        <ItemsFormActionBar itemsStore={itemsStore} />
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
                formPropsData={itemsStore.formPropsData}
                viewModel={null}
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
