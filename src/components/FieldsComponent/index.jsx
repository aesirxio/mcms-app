import React, { Component } from "react";
import { Col, ListGroup, Row, Tab } from "react-bootstrap";
import { withTranslation } from "react-i18next";

class FieldsComponent extends Component {
  render() {
    const { t } = this.props;
    return (
      <Tab.Container defaultActiveKey="1">
        <Row>
          <Col lg={4}>
            <div className="bg-white shadow-sm rounded-1 overflow-hidden">
              <h3 className="mb-0 fw-bold fs-6 pt-24 px-24 pb-16 border-bottom text-uppercase">
                {t("txt_menu_field_gr")}
              </h3>
              <ListGroup variant="flush">
                <ListGroup.Item className="fs-14 cursor-pointer" eventKey="1">
                  General
                </ListGroup.Item>
                <ListGroup.Item className="fs-14 cursor-pointer" eventKey="2">
                  Recommended fields
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col lg={8}>
            <Tab.Content>
              <Tab.Pane eventKey="1">
                <div className="rounded-1 bg-white shadow-sm p-24">awdawd</div>
              </Tab.Pane>
              <Tab.Pane eventKey="2">second</Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    );
  }
}

export default withTranslation("common")(FieldsComponent);
