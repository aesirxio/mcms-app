import React, { Component, lazy } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';

import { CMS_CATE_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { Form } from 'react-bootstrap';
import CategoriesStore from './CategoriesStore/Categories';
import {
  CategoriesViewModelContextProvider,
  withCategoriesViewModel,
} from './CategoriesViewModels/CategoriesViewModelContextProvider';
import CategoriesViewModel from './CategoriesViewModels/CategoriesViewModel';
import { withTranslation } from 'react-i18next';

const ItemsFormPage = lazy(() => import('../../components/ItemsForm/ItemsFormPage'));

const categoriesStore = new CategoriesStore();
const categoriesViewModel = new CategoriesViewModel(categoriesStore);

const EditCategories = observer(
  class EditCategories extends Component {
    categoriesDetailViewModel = null;
    formPropsData = {};
    idDelete = '';
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = categoriesViewModel ? categoriesViewModel : null;
      this.validator = new SimpleReactValidator({
        autoForceUpdate: this,
      });
      this.categoriesDetailViewModel = this.viewModel
        ? this.viewModel.getCategoriesDetailViewModel()
        : null;
      this.categoriesDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
      await this.categoriesDetailViewModel.initializeData();
      this.forceUpdate();
    }

    render() {
      const { t } = this.props;
      const data = {
        id: 1,
        groups: [
          {
            name: t('txt_seo'),
            fields: [
              // {
              //   label: 'Append To Global Meta Data',
              //   key: 'meta_data',
              //   type: FORM_FIELD_TYPE.DROPDOWN,
              //   option: [
              //     { label: 'Use Global', value: 'use_global' },
              //     { label: 'Append', value: 'append' },
              //     { label: 'Prepend', value: 'prepend' },
              //     { label: 'Replace', value: 'replace' },
              //     { label: 'None', value: 'none' },
              //   ],
              //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.META_DATA] ?? {
              //     label: 'Use Global',
              //     value: 'use_global',
              //   },
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.META_DATA] = data;
              //   },
              // },
              // {
              //   label: 'SEO Page Title',
              //   key: 'seo_page_title',
              //   type: FORM_FIELD_TYPE.INPUT,
              //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.SEO_PAGE_TITLE] ?? '',
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.SEO_PAGE_TITLE] = data.target.value;
              //   },
              //   blurred: () => {
              //     this.validator.showMessageFor('SEO Page Title');
              //   },
              // },
              // {
              //   label: 'SEO Page Heading',
              //   key: 'seo_page_heading',
              //   type: FORM_FIELD_TYPE.INPUT,
              //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.SEO_PAGE_HEADING] ?? '',
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.SEO_PAGE_HEADING] =
              //       data.target.value;
              //   },
              // },
              // {
              //   label: 'Canonical Url',
              //   key: 'canonical_url',
              //   type: FORM_FIELD_TYPE.INPUT,
              //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.CANONICAL_URL] ?? '',
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.CANONICAL_URL] = data.target.value;
              //   },
              // },
              {
                label: t('txt_meta'),
                key: 'description',
                type: FORM_FIELD_TYPE.TEXTAREA,
                value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.DESCRIPTION] ?? '',
                className: 'col-12',
                changed: (data) => {
                  this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.DESCRIPTION] = data.target.value;
                },
              },
              // {
              //   label: 'Meta Keywords',
              //   key: 'meta_keywords',
              //   type: FORM_FIELD_TYPE.TEXTAREA,
              //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.META_KEYWORDS] ?? '',
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.META_KEYWORDS] = data.target.value;
              //   },
              // },
              // {
              //   label: 'Meta Language Setting',
              //   key: 'meta_language_setting',
              //   type: FORM_FIELD_TYPE.TEXTAREA,
              //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.META_LANGUAGE_SETTING] ?? '',
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.META_LANGUAGE_SETTING] =
              //       data.target.value;
              //   },
              // },
              // {
              //   label: 'Robots',
              //   key: 'robots',
              //   type: FORM_FIELD_TYPE.DROPDOWN,
              //   option: [
              //     { label: 'Use Global', value: 'use_global' },
              //     { label: 'index, follow', value: 'index_follow' },
              //     { label: 'noindex, follow', value: 'noindex_follow' },
              //     { label: 'index, nofollow', value: 'index_nofollow' },
              //     { label: 'noindex, nofollow', value: 'noindex_nofollow' },
              //   ],
              //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ROBOTS] ?? {
              //     label: 'Use Global',
              //     value: 'use_global',
              //   },
              //   className: 'col-12',
              //   changed: (data) => {
              //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ROBOTS] = data;
              //   },
              // },
            ],
          },
        ],
      };
      const generateFormSetting = [
        {
          fields: [
            {
              label: t('txt_name'),
              key: 'title',
              type: FORM_FIELD_TYPE.INPUT,
              value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.TITLE]
                ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.TITLE]
                : '',
              className: 'col-12',
              required: true,
              validation: 'required',
              changed: (data) => {
                this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.TITLE] = data.target.value;
              },
              blurred: () => {
                this.validator.showMessageFor(t('txt_name'));
              },
            },
            // {
            //   label: 'Alias',
            //   key: 'alias',
            //   type: FORM_FIELD_TYPE.INPUT,
            //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ALIAS]
            //     ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ALIAS]
            //     : '',
            //   className: 'col-12',
            //   changed: (data) => {
            //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ALIAS] = data.target.value;
            //   },
            // },

            // {
            //   label: 'Organisation',
            //   key: 'organisation',
            //   type: FORM_FIELD_TYPE.DROPDOWN,
            //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ORGANISATION]
            //     ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ORGANISATION]
            //     : {},
            //   className: 'col-12',
            //   placeholder: 'Select Organisation',
            //   changed: (data) => {
            //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ORGANISATION] = data;
            //   },
            // },
            // {
            //   label: 'Content Type',
            //   key: 'content_type',
            //   type: FORM_FIELD_TYPE.DROPDOWN,
            //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.CONTENT_TYPE]
            //     ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.CONTENT_TYPE]
            //     : '',
            //   className: 'col-12',
            //   placeholder: 'Select Content Type',
            // },
            // {
            //   label: 'Parent Category',
            //   key: 'parent_category',
            //   type: FORM_FIELD_TYPE.DROPDOWN,
            //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.PARENT_CATEGORY]
            //     ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.PARENT_CATEGORY]
            //     : '',
            //   className: 'col-12',
            //   placeholder: 'Top Level',
            // },
            // {
            //   label: 'Default Template',
            //   key: 'default_template',
            //   type: FORM_FIELD_TYPE.DROPDOWN,
            //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.DEFAULT_TEMPLATE]
            //     ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.DEFAULT_TEMPLATE]
            //     : '',
            //   className: 'col-12',
            //   placeholder: 'Inherit',
            // },
            // {
            //   label: 'Related category',
            //   key: 'related_category',
            //   type: FORM_FIELD_TYPE.DROPDOWN,
            //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.RELATED_CATEGORY]
            //     ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.RELATED_CATEGORY]
            //     : '',
            //   className: 'col-12',
            // },
            {
              label: t('txt_cate_img'),
              key: 'featured_image',
              type: FORM_FIELD_TYPE.IMAGE,
              value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.FEATURED_IMAGE],
              className: 'col-12',
              changed: (data) => {
                this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.FEATURED_IMAGE] = data[0];
              },
            },
            // {
            //   label: 'Intro text',
            //   key: 'intro_text',
            //   type: FORM_FIELD_TYPE.EDITOR,
            //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.INTRO_TEXT]
            //     ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.INTRO_TEXT]
            //     : '<p></p>',
            //   className: 'col-12',
            //   changed: (data) => {
            //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.INTRO_TEXT] = data;
            //   },
            // },
            // {
            //   label: 'Full text',
            //   key: 'full_text',
            //   type: FORM_FIELD_TYPE.EDITOR,
            //   value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.FULL_TEXT]
            //     ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.FULL_TEXT]
            //     : '<p></p>',
            //   className: 'col-12',
            //   changed: (data) => {
            //     this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.FULL_TEXT] = data;
            //   },
            // },
          ],
        },
      ];
      const formPublish = [
        // {
        //   name: '',
        //   fields: [
        //     {
        //       label: 'Status',
        //       key: 'status',
        //       type: FORM_FIELD_TYPE.DROPDOWN,
        //       value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.STATUS] ?? {
        //         label: 'Publish',
        //         value: 1,
        //       },
        //       className: 'col-12 mb-16',
        //       isInline: true,
        //       // required: true,
        //       // validation: 'required',
        //       labelClassName: 'fw-normal me-24 ws-nowrap',
        //       classNameInput: 'w-65',
        //       option: [
        //         { label: 'Publish', value: 1 },
        //         { label: 'UnPublish', value: 2 },
        //       ],
        //       changed: (data) => {
        //         this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.STATUS] = data;
        //       },
        //     },
        //   ],
        // },
        // {
        //   name: 'Full Category Path for SEF',
        //   fields: [
        //     {
        //       label: 'Full Category Path for SEF',
        //       key: 'category_path',
        //       type: FORM_FIELD_TYPE.CHECKBOX,
        //       value: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.CATEGORY_PATH]
        //         ? this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.CATEGORY_PATH]
        //         : 'No',
        //       labelClassName: 'fw-semibold',
        //       className: 'col-12 mb-16',
        //       option: [
        //         { label: 'Yes', value: 'Yes' },
        //         { label: 'No', value: 'No' },
        //       ],
        //       changed: (data) => {
        //         this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.CATEGORY_PATH] = data?.target?.id;
        //       },
        //       getValueSelected: this.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.CATEGORY_PATH] ?? 'No',
        //     },
        //   ],
        // },
      ];
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.categoriesDetailViewModel.formStatus === PAGE_STATUS.LOADING ? (
            <Spinner className="spinner-overlay" />
          ) : (
            <CategoriesViewModelContextProvider viewModel={categoriesViewModel}>
              <Form>
                <ItemsFormPage
                  dataForm={data}
                  formPublish={formPublish}
                  generateFormSetting={generateFormSetting}
                  path="/categories"
                  title="txt_add_cate"
                  validator={this.validator}
                  store={this.categoriesDetailViewModel}
                  isEdit={this.isEdit}
                />
              </Form>
            </CategoriesViewModelContextProvider>
          )}
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withCategoriesViewModel(EditCategories)));
