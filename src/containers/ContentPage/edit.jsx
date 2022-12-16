import React, { Component, lazy } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { Form } from 'react-bootstrap';
import { CMS_CONTENT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import ContentStore from './ContentStore/Content';
import ContentViewModel from './ContentViewModels/ContentViewModel';
import {
  ContentViewModelContextProvider,
  withContentViewModel,
} from './ContentViewModels/ContentViewModelContextProvider';

const ItemsFormPage = lazy(() => import('../../components/ItemsForm/ItemsFormPage'));

const contentStore = new ContentStore();
const contentViewModel = new ContentViewModel(contentStore);

const EditContentGroup = observer(
  class EditContentGroup extends Component {
    contentViewModel = null;
    formPropsData = {};
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = contentViewModel ? contentViewModel : null;
      this.state = { dataStatus: {}, field_type: 0 };
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
      });
      this.contentViewModel = this.viewModel ? this.viewModel.getContentDetailViewModel() : null;
      this.contentViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
      await this.contentViewModel.initializeData();
      this.forceUpdate();
    }

    render() {
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'Name',
              key: 'name',
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.NAME]
                ? this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.NAME]
                : '',
              className: 'col-12',
              required: true,
              validation: 'required',
              changed: (data) => {
                this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.NAME] = data.target.value;
              },
              blurred: () => {
                this.validator.showMessageFor('Eorror !!!');
              },
            },
            {
              label: 'Alias',
              key: 'alias',
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.ALIAS]
                ? this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.ALIAS]
                : '',
              className: 'col-12',
              changed: (data) => {
                this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.ALIAS] = data.target.value;
              },
            },
            {
              label: 'Parent Type',
              key: 'parent_type',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: [
                { label: 'Top Level', value: 0 },
                { label: 'Orther', value: 1 },
              ].filter((v) => v.value === this.state.field_type)?.[0],
              className: 'col-12',
              placeholder: 'Select Organisation',
              option: [
                { label: 'Top Level', value: 0 },
                { label: 'Orther', value: 1 },
              ],
              changed: (data) => {
                this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.PARENT_TYPE] = data.label;
              },
            },
            {
              label: 'Allow in frontend?',
              key: 'allow_frontend',
              type: FORM_FIELD_TYPE.CHECKBOX,
              value: this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.ALLOW_FRONTEND]
                ? this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.ALLOW_FRONTEND]
                : '',
              className: 'col-12 ',
              labelClassName: 'd-flex',
              option: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
              changed: (data) => {
                this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.ALLOW_FRONTEND] = data.value;
              },
            },
            {
              label: 'upload new media',
              key: 'upload_new_media',
              type: FORM_FIELD_TYPE.IMAGE,
              value: this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.UPLOAD_NEW_MEDIA]
                ? this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.UPLOAD_NEW_MEDIA]
                : '',
              className: 'col-12',
              changed: (data) => {
                this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.UPLOAD_NEW_MEDIA] = data;
              },
            },
            {
              label: 'Description',
              key: 'description',
              type: FORM_FIELD_TYPE.EDITOR,
              value: this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.DESCRIPTION]
                ? this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.DESCRIPTION]
                : '',
              className: 'col-12',
              changed: (data) => {
                this.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.DESCRIPTION] = data;
              },
            },
          ],
        },
      ];
      const formPublish = [
        {
          name: '',
          fields: [
            {
              label: 'Status',
              key: 'status',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: { label: 'Publish', value: 1 },
              className: 'col-12 mb-16 d-flex justify-content-between align-items-center',
              required: true,
              validation: 'required',
              labelClassName: 'fw-normal me-24 ws-nowrap',
              classNameInput: 'w-65',
              option: [
                { label: 'Publish', value: 1 },
                { label: 'UnPublish', value: 2 },
              ],
              changed: (data) => {
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.dataStatus = data.value;
              },
            },
            {
              label: 'Parent Type',
              key: 'Parent_Type',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: [
                { label: 'Top Level', value: 0 },
                { label: 'Orther', value: 1 },
              ].filter((v) => v.value === this.state.field_type)?.[0],
              className: 'col-12 mb-16 d-flex justify-content-between align-items-center',
              placeholder: 'Select Organisation',
              classNameInput: 'w-65',
              option: [
                { label: 'Top Level', value: 0 },
                { label: 'Orther', value: 1 },
              ],
              changed: (data) => this.setState({ field_type: data.value }),
            },
          ],
        },
        {
          name: 'Full Category Path for SEF',
          fields: [
            {
              label: 'Full Category Path for SEF',
              key: 'featured',
              type: FORM_FIELD_TYPE.CHECKBOX,
              value: '',
              labelClassName: 'd-flex',
              className: 'col-12 mb-16',
              option: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
          ],
        },
      ];

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.contentViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <ContentViewModelContextProvider viewModel={contentViewModel}>
            <Form>
              <ItemsFormPage
                formPublish={formPublish}
                generateFormSetting={generateFormSetting}
                path="/content"
                title="txt_add_content"
                validator={this.validator}
                store={this.contentViewModel}
                isEdit={this.isEdit}
              />
            </Form>
          </ContentViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withContentViewModel(EditContentGroup)));
