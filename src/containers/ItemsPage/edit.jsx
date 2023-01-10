import React, { Component, lazy } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import { CMS_ITEMS_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import PAGE_STATUS from 'constants/PageStatus';

import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { withItemsViewModel } from './ItemsViewModels/ItemsViewModelContextProvider';
import { withRouter } from 'react-router-dom';

// import ItemsFormPage from '../../components/ItemsForm/ItemsFormPage';
const ItemsFormPage = lazy(() => import('../../components/ItemsForm/ItemsFormPage'));

const EditItems = observer(
  class EditItems extends Component {
    itemsDetailViewModel = null;
    formPropsData = {
      [CMS_ITEMS_DETAIL_FIELD_KEY.NAME]: '',
      [CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT]: '',
    };
    isEdit = false;

    constructor(props) {
      super(props);
      this.viewModel = props.viewModel ? props.viewModel : null;
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.itemsDetailViewModel = this.viewModel ? this.viewModel.getItemsDetailViewModel() : null;
      this.itemsDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    componentDidMount() {
      this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
      this.itemsDetailViewModel.initializeData();
    }

    render() {
      const data = {
        id: 1,
        groups: [
          {
            name: '',
            fields: [
              {
                label: 'Title',
                key: 'title',
                type: FORM_FIELD_TYPE.INPUT,
                value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.NAME],
                className: 'col-12',
                required: true,
                validation: 'required',
                changed: (data) => {
                  this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.NAME] = data.target.value;
                },
                blurred: this.validator,
              },
              {
                label: 'Description',
                key: 'description',
                type: FORM_FIELD_TYPE.TEXTAREA,
                value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT],
                className: 'col-12',
                changed: (data) => {
                  this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.INTRO_TEXT] = data.target.value;
                },
              },
              {
                label: 'Intro text',
                key: 'intro_text',
                type: FORM_FIELD_TYPE.EDITOR,
                value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT],
                className: 'col-12',
                changed: (data) => {
                  this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.CONTENT] = data;
                },
              },
              {
                label: 'Thumb Image',
                key: 'thumb_image',
                type: FORM_FIELD_TYPE.IMAGE,
                value: this.formPropsData['featured_image']?.url,
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

      // const generateFormSetting = [
      // {
      //   fields: [
      //     {
      //       label: 'Alias',
      //       key: 'alias',
      //       type: FORM_FIELD_TYPE.INPUT,
      //       value: this.formPropsData[GENERAL_INFORMATION.ALIAS],
      //       className: 'col-12',
      //       changed: (data) => {
      //         this.formPropsData[GENERAL_INFORMATION.ALIAS] = data.target.value;
      //       },
      //     },
      //     {
      //       label: 'Organisation',
      //       key: 'organisation',
      //       type: FORM_FIELD_TYPE.DROPDOWN,
      //       value: this.formPropsData[GENERAL_INFORMATION.ORGANISATION],
      //       className: 'col-12',
      //       placeholder: 'Select Organisation',
      //       changed: (data) => {
      //         this.formPropsData[GENERAL_INFORMATION.ORGANISATION] = data.target.value;
      //       },
      //     },
      //     {
      //       label: 'Content Type',
      //       key: 'content_type',
      //       type: FORM_FIELD_TYPE.DROPDOWN,
      //       value: this.formPropsData[GENERAL_INFORMATION.CONTENT_TYPE],
      //       className: 'col-12',
      //       placeholder: 'Select Content Type',
      //       changed: (data) => {
      //         this.formPropsData[GENERAL_INFORMATION.CONTENT_TYPE] = data.target.value;
      //       },
      //     },
      //     {
      //       label: 'Parent Category',
      //       key: 'parent_category',
      //       type: FORM_FIELD_TYPE.DROPDOWN,
      //       value: this.formPropsData[GENERAL_INFORMATION.PARENT_CATEGORY],
      //       className: 'col-12',
      //       placeholder: 'Top Level',
      //       changed: (data) => {
      //         this.formPropsData[GENERAL_INFORMATION.PARENT_CATEGORY] = data.target.value;
      //       },
      //     },
      //     {
      //       label: 'Default Template',
      //       key: 'default_template',
      //       type: FORM_FIELD_TYPE.DROPDOWN,
      //       value: this.formPropsData[GENERAL_INFORMATION.DEFAULT_TEMPLATE],
      //       className: 'col-12',
      //       placeholder: 'Inherit',
      //       changed: (data) => {
      //         this.formPropsData[GENERAL_INFORMATION.DEFAULT_TEMPLATE] = data.target.value;
      //       },
      //     },
      //     {
      //       label: 'Category',
      //       key: 'category',
      //       type: FORM_FIELD_TYPE.DROPDOWN,
      //       value: this.formPropsData[GENERAL_INFORMATION.CATEGORY],
      //       className: 'col-12',
      //       changed: (data) => {
      //         this.formPropsData[GENERAL_INFORMATION.CATEGORY] = data.target.value;
      //       },
      //     },
      //     {
      //       label: 'Tags',
      //       key: 'tags',
      //       type: FORM_FIELD_TYPE.INPUT,
      //       value: this.formPropsData[GENERAL_INFORMATION.TAGS],
      //       className: 'col-12',
      //       changed: (data) => {
      //         this.formPropsData[GENERAL_INFORMATION.TAGS] = data.target.value;
      //       },
      //     },
      //     {
      //       label: 'Version Note',
      //       key: 'version_note',
      //       type: FORM_FIELD_TYPE.INPUT,
      //       value: this.formPropsData[GENERAL_INFORMATION.VERSION_NOTE],
      //       className: 'col-12 mb-0',
      //       changed: (data) => {
      //         this.formPropsData[GENERAL_INFORMATION.VERSION_NOTE] = data.target.value;
      //       },
      //     },
      //   ],
      // },
      // ];

      const formPublish = [
        {
          name: '',
          fields: [
            {
              label: 'Status',
              key: 'status',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.STATUS] ?? {
                label: 'Publish',
                value: 1,
              },
              className: 'col-12 mb-16',
              isInline: true,
              labelClassName: 'fw-normal me-24 ws-nowrap',
              classNameInput: 'w-65',
              option: [
                { label: 'Publish', value: 1 },
                { label: 'UnPublish', value: 2 },
              ],
              changed: (data) => {
                this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.STATUS] = data;
              },
            },
            {
              label: 'Access',
              key: 'access',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.ACCESS],
              isInline: true,
              labelClassName: 'fw-normal me-24 ws-nowrap',
              classNameInput: 'w-65',
              className: 'col-12 mb-16',
              changed: (data) => {
                this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.ACCESS] = data.value;
              },
            },
          ],
        },
        {
          name: 'Featured',
          fields: [
            {
              label: 'Featured',
              key: 'featured',
              type: FORM_FIELD_TYPE.CHECKBOX,
              value: this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED],
              labelClassName:
                'fw-normal me-24 ws-nowrap fw-semibold d-block border-top pt-16 me-0 mt-24',
              className: 'col-12 mb-16',
              classNameInput: 'w-65',
              option: [
                { label: 'Yes', value: '0' },
                { label: 'No', value: '1' },
              ],
              changed: (data) => {
                this.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.FEATURED] = data.target.value;
              },
            },
            {
              label: 'Start publish',
              key: 'start_publish',
              type: FORM_FIELD_TYPE.DATE,
              value: '',
              isInline: true,
              labelClassName: 'fw-normal me-24 ws-nowrap',
              className: 'col-12 mb-16',
              defaultValue: new Date(),
              changed: (date) => {
                console.log('', date);
              },
            },
            {
              label: 'Author',
              key: 'author',
              type: FORM_FIELD_TYPE.DROPDOWN,
              value: '',
              isInline: true,
              labelClassName: 'fw-normal me-24 ws-nowrap',
              classNameInput: 'w-65',
              className: 'col-12 mb-16',
            },
          ],
        },
      ];

      return (
        <>
          {this.itemsDetailViewModel?.formStatus === PAGE_STATUS.LOADING ? (
            <Spinner className="spinner-overlay" />
          ) : (
            <div className="py-4 px-3 h-100 d-flex flex-column">
              <ItemsFormPage
                store={this.itemsDetailViewModel}
                dataForm={data}
                generateFormSetting={null}
                path="/"
                title="txt_add_item"
                validator={this.validator}
                formPublish={formPublish}
                isEdit={this.isEdit}
                isDMA={true}
              />
            </div>
          )}
        </>
      );
    }
  }
);

export default withItemsViewModel(withRouter(EditItems));
