import React, { Component } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import { CMS_ITEMS_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import PAGE_STATUS from 'constants/PageStatus';
import ItemsStore from './ItemsStore/ItemsStore';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { withItemsViewModel } from './ItemsViewModels/ItemsViewModelContextProvider';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import FieldsComponent from 'components/FieldsComponent';
import ItemsDetailViewModel from './ItemsViewModels/ItemsDetailViewModel';
import ActionsBar from 'components/ActionsBar';
// import DMAComponent from 'components/DmaComponent';

const itemsStore = new ItemsStore();
const itemsDetailViewModel = new ItemsDetailViewModel(itemsStore);

const EditItems = observer(
  class EditItems extends Component {
    viewModel = null;
    isEdit = false;

    constructor(props) {
      super(props);
      this.viewModel = itemsDetailViewModel ? itemsDetailViewModel : null;
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        await this.viewModel.initializeData(this.props.match.params?.id);
      }
    }

    handleValidateForm() {
      if (this.validator.fields[CMS_ITEMS_DETAIL_FIELD_KEY.NAME] === true) {
        this.setState((prevState) => {
          return {
            ...prevState,
            key: 'fields',
            requiredField: Math.random(1, 200),
          };
        });
      }
      this.validator.showMessages();
    }

    render() {
      const { t, history } = this.props;
      let data = {
        id: 1,
        groups: [
          {
            name: '',
            fields: [
              {
                label: t('txt_title'),
                key: 'title',
                type: FORM_FIELD_TYPE.INPUT,
                value: this.viewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.NAME],
                className: 'col-12',
                required: true,
                validation: 'required',
                changed: (e) => {
                  this.viewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.NAME] = e.target.value;
                },
                blurred: () => {
                  this.validator.showMessageFor(t('txt_title'));
                },
              },
              // {
              //   label: t('txt_description'),
              //   key: 'description',
              //   type: FORM_FIELD_TYPE.TEXTAREA,
              //   value: this.viewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT],
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.viewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT] =
              //       data.target.value;
              //   },
              // },
              // {
              //   label: t('txt_intro_text'),
              //   key: 'intro_text',
              //   type: FORM_FIELD_TYPE.EDITOR,
              //   value: this.viewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT],
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.viewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT] = data;
              //   },
              // },

              // {
              //   label: t('txt_thump'),
              //   key: 'thumb_image',
              //   type: FORM_FIELD_TYPE.IMAGE,
              //   value: this.viewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED_IMAGE],
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.viewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED_IMAGE] =
              //       data[0].download_url;
              //   },
              // },
            ],
          },
        ],
      };

      if (this.viewModel.formStatus === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <>
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

              <div className="position-relative">
                <ActionsBar
                  buttons={[
                    {
                      title: t('txt_cancel'),
                      handle: async () => {
                        history.push(`/items/all`);
                      },
                      icon: '/assets/images/cancel.svg',
                    },
                    {
                      title: t('txt_save_close'),
                      handle: async () => {
                        if (this.validator.allValid()) {
                          const result = this.isEdit
                            ? await this.viewModel.updateItem()
                            : await this.viewModel.createItem();
                          if (result !== 0) {
                            history.push(`/items/all`);
                          }
                        } else {
                          this.handleValidateForm();
                        }
                      },
                    },
                    {
                      title: t('txt_save'),
                      handle: async () => {
                        if (this.validator.allValid()) {
                          if (this.isEdit) {
                            await this.viewModel.updateItem();
                          } else {
                            await this.viewModel.createItem();
                            this.viewModel.formPropsData.result &&
                              history.push(`/items/edit/${this.viewModel.formPropsData.id}`);
                          }
                        } else {
                          this.handleValidateForm();
                        }
                      },
                      icon: '/assets/images/save.svg',
                      variant: 'success',
                    },
                  ]}
                />
              </div>
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
                  <Tab tabClassName="border-0 bg-transparent p-0 pb-16" eventKey="DMA" title="DMA">
                    {/* <DMAComponent
                        store={this.itemsDetailViewModel}
                        // lang={i18n?.language}
                        // theme={theme?.theme}
                      /> */}
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </div>
        </>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withItemsViewModel(EditItems)));
