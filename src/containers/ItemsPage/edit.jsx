import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import { CMS_ITEMS_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import PAGE_STATUS from 'constants/PageStatus';
import ItemsStore from './ItemsStore/ItemsStore';
import ItemsViewModel from './ItemsViewModels/ItemsViewModel';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { withItemsViewModel } from './ItemsViewModels/ItemsViewModelContextProvider';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import ItemsFormActionBar from 'components/ItemsForm/ItemsFormActionBar';
const itemsStore = new ItemsStore();
const itemsViewModel = new ItemsViewModel(itemsStore);
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import FieldsComponent from 'components/FieldsComponent';
import DMAComponent from 'components/DmaComponent';
const EditItems = observer(
  class EditItems extends Component {
    itemsDetailViewModel = null;
    formPropsData = {
      [CMS_ITEMS_DETAIL_FIELD_KEY.NAME]: '',
      [CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT]: '',
      [CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT]: '',
      [CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED_IMAGE]: '',
    };
    isEdit = false;

    constructor(props) {
      super(props);
      this.viewModel = itemsViewModel ? itemsViewModel : null;
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.itemsDetailViewModel = this.viewModel ? this.viewModel.getItemsDetailViewModel() : null;
      this.itemsDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
      await this.itemsDetailViewModel.initializeData();
      this.forceUpdate();
    }

    render() {
      const { t } = this.props;
      const data = {
        id: 1,
        groups: [
          {
            name: '',
            fields: [
              {
                label: t('txt_title'),
                key: 'title',
                type: FORM_FIELD_TYPE.INPUT,
                value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.NAME],
                className: 'col-12',
                required: true,
                validation: 'required',
                changed: (data) => {
                  this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.NAME] = data.target.value;
                },
                blurred: () => {
                  this.validator.showMessageFor('Title');
                },
              },
              {
                label: t('txt_description'),
                key: 'description',
                type: FORM_FIELD_TYPE.TEXTAREA,
                value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT],
                className: 'col-12',
                changed: (data) => {
                  this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT] = data.target.value;
                },
              },
              {
                label: t('txt_intro_text'),
                key: 'intro_text',
                type: FORM_FIELD_TYPE.EDITOR,
                value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT],
                className: 'col-12',
                changed: (data) => {
                  this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT] = data;
                },
              },

              {
                label: t('txt_thump'),
                key: 'thumb_image',
                type: FORM_FIELD_TYPE.IMAGE,
                value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED_IMAGE],
                className: 'col-12',
                changed: (data) => {
                  this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED_IMAGE] =
                    data[0].download_url;
                },
              },
            ],
          },
        ],
      };

      return (
        <>
          {this.itemsDetailViewModel?.formStatus === PAGE_STATUS.LOADING ? (
            <Spinner className="spinner-overlay" />
          ) : (
            <div className="py-4 px-3 h-100 d-flex flex-column">
              {/* <ItemsFormPage
                store={this.itemsDetailViewModel}
                dataForm={data}
                generateFormSetting={null}
                path="/"
                title="txt_add_item"
                validator={this.validator}
                isEdit={this.isEdit}
                isDMA={true}
              /> */}
              <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
                <div>
                  <h2 className="fw-bold text-capitalize">{t('txt_add_item')}</h2>
                </div>
                <ItemsFormActionBar
                  path={'/'}
                  validator={this.validator}
                  store={this.itemsDetailViewModel}
                  isEdit={this.isEdit}
                />
              </div>
              <Row>
                <Col lg={9} className="mb-24">
                  <Tabs defaultActiveKey="fields" className="mb-24 custom-tabs">
                    <Tab
                      tabClassName="border-0 bg-transparent p-0 pb-16 me-40"
                      eventKey="fields"
                      title={t('txt_menu_field')}
                    >
                      <FieldsComponent validator={this.validator} dataForm={data} />
                    </Tab>
                    <Tab
                      tabClassName="border-0 bg-transparent p-0 pb-16"
                      eventKey="DMA"
                      title="DMA"
                    >
                      <DMAComponent
                        store={this.itemsDetailViewModel}
                        // lang={i18n?.language}
                        // theme={theme?.theme}
                      />
                    </Tab>
                  </Tabs>
                </Col>
              </Row>
            </div>
          )}
        </>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withItemsViewModel(EditItems)));
