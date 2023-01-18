import React from 'react';
import { Col, ListGroup, Row, Tab } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
import { renderingGroupFieldHandler } from 'utils/form';

const FieldsComponent = (props) => {
  const { t, dataForm, validator } = props;
  return (
    <Tab.Container defaultActiveKey="0">
      <Row>
        <Col lg={4}>
          <div className="bg-white shadow-sm rounded-1 overflow-hidden">
            <h3 className="mb-0 fw-bold fs-6 pt-24 px-24 pb-16 border-bottom text-uppercase">
              {t('txt_menu_field_gr')}
            </h3>
            <ListGroup variant="flush">
              {dataForm?.groups?.map((item, index) => {
                return (
                  <ListGroup.Item className="fs-14 cursor-pointer" eventKey={index} key={index}>
                    {item.name ? item.name : t('txt_non_group')}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </div>
        </Col>
        <Col lg={8}>
          <Tab.Content>
            {dataForm?.groups?.map((item, index) => {
              return (
                <Tab.Pane eventKey={index} key={index}>
                  <div className="rounded-1 bg-white shadow-sm p-24">
                    <h3 className="fs-6 mb-24 fw-bold pb-16 border-bottom text-uppercase">
                      {item.name ? item.name : t('txt_non_group')}
                    </h3>
                    <div>{renderingGroupFieldHandler(item, validator)}</div>
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

export default withTranslation('common')(FieldsComponent);
