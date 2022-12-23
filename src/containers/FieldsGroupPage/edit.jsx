import React, { Component, lazy } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { Form } from 'react-bootstrap';
import { CMS_FIELD_GR_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import FieldsGroupStore from './FieldsGroupStore/FieldsGroup';
import FieldsGroupViewModel from './FieldsGroupViewModels/FieldsGroupViewModel';
import {
  FieldsGroupViewModelContextProvider,
  withFieldsGroupViewModel,
} from './FieldsGroupViewModels/FieldsGroupViewModelContextProvider';

const ItemsFormPage = lazy(() => import('../../components/ItemsForm/ItemsFormPage'));

const fieldsGroupStore = new FieldsGroupStore();
const fieldsGroupViewModel = new FieldsGroupViewModel(fieldsGroupStore);

const EditFieldsGroup = observer(
  class EditFieldsGroup extends Component {
    fieldsGroupViewModel = null;
    formPropsData = {};
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = fieldsGroupViewModel ? fieldsGroupViewModel : null;
      this.state = { dataStatus: {}, field_type: 0 };
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
      });
      this.fieldsGroupViewModel = this.viewModel
        ? this.viewModel.getFieldsGroupDetailViewModel()
        : null;
      this.fieldsGroupViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
      await this.fieldsGroupViewModel.initializeData();
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
              value: this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.NAME]
                ? this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.NAME]
                : '',
              className: 'col-12',
              required: true,
              validation: 'required',
              changed: (data) => {
                this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.NAME] = data.target.value;
              },
              blurred: () => {
                this.validator.showMessageFor('Eorror !!!');
              },
            },
            {
              label: 'Alias',
              key: 'alias',
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.ALIAS]
                ? this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.ALIAS]
                : '',
              className: 'col-12',
              changed: (data) => {
                this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.ALIAS] = data.target.value;
              },
            },
            {
              label: 'Parent field group',
              key: 'parent_field_group',
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
              changed: (data) =>
                (this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.ALIAS] = data.label),
            },
            {
              label: 'Description',
              key: 'description',
              type: FORM_FIELD_TYPE.EDITOR,
              value: '',
              className: 'col-12',
              changed: (data) => {
                this.formPropsData[CMS_FIELD_GR_DETAIL_FIELD_KEY.DESCRIPTION] = data;
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
          {this.fieldsGroupViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <FieldsGroupViewModelContextProvider viewModel={fieldsGroupViewModel}>
            <Form>
              <ItemsFormPage
                formPublish={formPublish}
                generateFormSetting={generateFormSetting}
                path="/fields-group"
                title="txt_add_fields"
                validator={this.validator}
                store={this.fieldsGroupViewModel}
                isEdit={this.isEdit}
              />
            </Form>
          </FieldsGroupViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withFieldsGroupViewModel(EditFieldsGroup)));
