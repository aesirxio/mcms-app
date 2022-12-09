import React, { Component, lazy } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { Form } from 'react-bootstrap';
import FieldsStore from './FieldsStore/Fields';
import FieldsViewModel from './FieldsViewModels/FieldsViewModel';
import {
  FieldsViewModelContextProvider,
  withFieldsViewModel,
} from './FieldsViewModels/FieldsViewModelContextProvider';
import { CMS_LIST_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';

const ItemsFormPage = lazy(() => import('../../components/ItemsForm/ItemsFormPage'));

const fieldssStore = new FieldsStore();
const fieldsViewModel = new FieldsViewModel(fieldssStore);

const EditFields = observer(
  class EditFields extends Component {
    fieldsViewModel = null;
    formPropsData = {};
    idDelete = '';
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = fieldsViewModel ? fieldsViewModel : null;
      this.state = { dataStatus: {}, field_type: 0 };
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
      });
      this.fieldsViewModel = this.viewModel ? this.viewModel.getFieldsDetailViewModel() : null;
      this.fieldsViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      this.formPropsData[CMS_LIST_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
      await this.fieldsViewModel.initializeData();
      this.forceUpdate();
    }

    render() {
      const generateFormSetting = [
        {
          fields: [
            {
              label: 'Types',
              key: 'types',
              type: FORM_FIELD_TYPE.INPUT,
              value: '',
              className: 'col-12',
            },
            {
              label: 'Name',
              key: 'name',
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[CMS_LIST_DETAIL_FIELD_KEY.NAME]
                ? this.formPropsData[CMS_LIST_DETAIL_FIELD_KEY.NAME]
                : '',
              className: 'col-12',
              required: true,
              validation: 'required',
              changed: (data) => {
                this.formPropsData[CMS_LIST_DETAIL_FIELD_KEY.NAME] = data.target.value;
              },
              blurred: () => {
                this.validator.showMessageFor('Eorror !!!');
              },
            },
            {
              label: 'Field Type',
              key: 'field_type',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: [
                { label: 'Category Related', value: 0 },
                { label: 'Image', value: 1 },
              ].filter((v) => v.value === this.state.field_type)?.[0],
              className: 'col-12',
              placeholder: 'Select Organisation',
              option: [
                { label: 'Category Related', value: 0 },
                { label: 'Image', value: 1 },
              ],
              changed: (data) => this.setState({ field_type: data.value }),
            },
            ...(this.state.field_type === 1
              ? [
                  {
                    label: 'Allow chose from media',
                    key: 'Allow_chose_from_media',
                    type: FORM_FIELD_TYPE.CHECKBOX,
                    value: '',
                    className: 'col-12 bg-blue-9 rounded-1 p-1',
                    labelClassName: 'd-flex',
                    option: [
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ],
                  },
                  {
                    label: 'Upload max filesize',
                    key: 'Upload_max_filesize',
                    type: FORM_FIELD_TYPE.INPUT,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                  },
                  {
                    label: 'Allowed mimes',
                    key: 'Allowed_mimes',
                    type: FORM_FIELD_TYPE.INPUT,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                  },
                  {
                    label: 'Allowed file extensions',
                    key: 'Allowed_file_extensions',
                    type: FORM_FIELD_TYPE.INPUT,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                  },
                  {
                    label: 'Preview width (px)',
                    key: 'Preview_width',
                    type: FORM_FIELD_TYPE.INPUT,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                  },
                  {
                    label: 'Preview height (px)',
                    key: 'Preview_height',
                    type: FORM_FIELD_TYPE.INPUT,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                  },
                  {
                    label: 'Enable Cropping',
                    key: 'Enable_Cropping',
                    type: FORM_FIELD_TYPE.CHECKBOX,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                    labelClassName: 'd-flex',
                    option: [
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ],
                  },
                  {
                    label: 'Preview height (px)',
                    key: 'Preview_height_2',
                    type: FORM_FIELD_TYPE.INPUT,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                  },
                  {
                    label: 'Crop on upload',
                    key: 'Crop_on_upload',
                    type: FORM_FIELD_TYPE.CHECKBOX,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                    labelClassName: 'd-flex',
                    option: [
                      { label: 'Yes', value: 'yes' },
                      { label: 'No', value: 'no' },
                    ],
                  },
                ]
              : [
                  {
                    label: 'Default Value',
                    key: 'default_value',
                    type: FORM_FIELD_TYPE.DROPDOWN,
                    value: '',
                    className: 'col-12 p-1 bg-blue-9 rounded-1',
                    placeholder: 'Select Content Type',
                  },
                ]),
            {
              label: 'Field Group',
              key: 'default_value',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: '',
              className: 'col-12',
              placeholder: 'Select Content Type',
              option: [
                { label: 'New services', value: 0 },
                { label: 'Old services', value: 1 },
              ],
            },
            {
              label: 'Unique',
              key: 'unique',
              type: FORM_FIELD_TYPE.CHECKBOX,
              value: '',
              className: 'col-12 mb-16',
              labelClassName: 'd-flex',
              option: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              label: 'Is filterable?',
              key: 'filterable',
              type: FORM_FIELD_TYPE.CHECKBOX,
              value: '',
              className: 'col-12 mb-16',
              labelClassName: 'd-flex',
              option: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              label: 'Search on Backend',
              key: 'search_on_backend',
              type: FORM_FIELD_TYPE.CHECKBOX,
              value: '',
              className: 'col-12 mb-16',
              labelClassName: 'd-flex',
              option: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              label: 'Search on Frontend',
              key: 'search_on_frontendd',
              type: FORM_FIELD_TYPE.CHECKBOX,
              labelClassName: 'd-flex',
              value: '',
              className: 'col-12 mb-16',
              option: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
            },
            {
              label: 'Version Note',
              key: 'version_note',
              type: FORM_FIELD_TYPE.TEXTAREA,
              value: '',
              className: 'col-12',
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
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }

      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.fieldsViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <FieldsViewModelContextProvider viewModel={fieldsViewModel}>
            <Form>
              <ItemsFormPage
                formPublish={formPublish}
                generateFormSetting={generateFormSetting}
                path="/fields"
                title="txt_add_fields"
                validator={this.validator}
                store={this.fieldsViewModel}
                isEdit={this.isEdit}
              />
            </Form>
          </FieldsViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withFieldsViewModel(EditFields)));
