import React from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ItemsFormActionBar from './ItemsFormActionBar';
// import PublishOptionComponent from 'components/PublishOptionComponent';
import FieldsComponent from 'components/FieldsComponent';
import GeneralInformation from 'components/GeneralInfomationComponent';
import DMAComponent from 'components/DmaComponent';
import { useThemeContext } from 'themes/ThemeContextProvider';
const ItemsFormPage = ({
  dataForm,
  generateFormSetting,
  path,
  title,
  validator,
  store,
  isEdit,
  isDMA,
}) => {
  const { t } = useTranslation('common');
  const { i18n } = useTranslation('common');
  const { theme } = useThemeContext();
  return (
    <>
      <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
        <div>
          <h2 className="fw-bold text-capitalize">{t(title)}</h2>
        </div>
        <ItemsFormActionBar path={path} validator={validator} store={store} isEdit={isEdit} />
      </div>
      <Row>
        <Col lg={9} className="mb-24">
          {dataForm ? (
            <Tabs defaultActiveKey="fields" className="mb-24 custom-tabs">
              <Tab
                tabClassName="border-0 bg-transparent p-0 pb-16 me-40"
                eventKey="fields"
                title={t('txt_menu_field')}
              >
                <FieldsComponent validator={validator} dataForm={dataForm} />
              </Tab>
              {generateFormSetting && (
                <Tab
                  tabClassName="border-0 bg-transparent p-0 pb-16 me-40"
                  eventKey="general-information"
                  title={t('txt_general_information')}
                >
                  <GeneralInformation
                    validator={validator}
                    generateFormSetting={generateFormSetting}
                  />
                </Tab>
              )}

              {isDMA && (
                <Tab tabClassName="border-0 bg-transparent p-0 pb-16" eventKey="DMA" title="DMA">
                  <DMAComponent
                    store={store.itemsDetailViewModel}
                    lang={i18n?.language}
                    theme={theme?.theme}
                  />
                </Tab>
              )}
            </Tabs>
          ) : (
            <GeneralInformation validator={validator} generateFormSetting={generateFormSetting} />
          )}
        </Col>
      </Row>
    </>
  );
};

export default ItemsFormPage;
