import React, { Component, lazy } from 'react';
import Spinner from '../../components/Spinner';
import SimpleReactValidator from 'simple-react-validator';
import { observer } from 'mobx-react';
import CategoriesStore from 'store/CategoriesStore/Categories';
import CategoriesViewModel from 'ViewModel/Categories/CategoriesViewModel';
import { CMS_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { withRouter } from 'react-router-dom';
import {
  CategoriesViewModelContextProvider,
  withCategoriesViewModel,
} from 'ViewModel/Categories/CategoriesViewModelContextProvider';
import { withTranslation } from 'react-i18next';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
const ItemsFormPage = lazy(() => import('../../components/ItemsForm/ItemsFormPage'));
const categoriesStore = new CategoriesStore();
const categoriesViewModel = new CategoriesViewModel(categoriesStore);

const EditCategories = observer(
  class EditCategories extends Component {
    caregoriesDetailViewModel = null;
    formPropsData = {};
    isEdit = false;
    constructor(props) {
      super(props);
      this.viewModel = categoriesViewModel ? categoriesViewModel : null;
      this.state = { key: 'commonInformation' };
      this.validator = new SimpleReactValidator({ autoForceUpdate: this });
      this.caregoriesDetailViewModel = this.viewModel
        ? this.viewModel.getCategoriesDetailViewModel()
        : null;
      this.caregoriesDetailViewModel.setForm(this);
      this.isEdit = props.match.params?.id ? true : false;
    }

    async componentDidMount() {
      if (this.isEdit) {
        this.formPropsData[CMS_PRODUCT_DETAIL_FIELD_KEY.ID] = this.props.match.params?.id;
        await this.caregoriesDetailViewModel.initializeData();
        this.forceUpdate();
      }
    }

    render() {
      // const { t } = this.props;
      const data = {
        id: 1,
        groups: [
          {
            name: 'SEO',
            fields: [
              {
                label: 'Append To Global Meta Data',
                key: 'meta_data',
                type: FORM_FIELD_TYPE.DROPDOWN,
                option: [
                  { label: 'Use Global', value: 'use_global' },
                  { label: 'Append', value: 'append' },
                  { label: 'Prepend', value: 'prepend' },
                  { label: 'Replace', value: 'replace' },
                  { label: 'None', value: 'none' },
                ],
                value: { label: 'Use Global', value: 'use_global' },
                className: 'col-12',
                changed: (data) => {
                  categoriesStore.formPropsData['meta_data'] = data.value;
                },
              },
              {
                label: 'SEO Page Title',
                key: 'seo_page_title',
                type: FORM_FIELD_TYPE.INPUT,
                value: categoriesStore.formPropsData ? categoriesStore.formPropsData?.name : '',
                className: 'col-12',
                changed: () => {
                  // formPropsData.formPropsData.name = data.value;
                },
              },
              {
                label: 'SEO Page Heading',
                key: 'seo_page_heading',
                type: FORM_FIELD_TYPE.INPUT,
                value: '',
                className: 'col-12',
              },
              {
                label: 'SEO Page Description',
                key: 'seo_page_description',
                type: FORM_FIELD_TYPE.TEXTAREA,
                value: '',
                className: 'col-12',
              },
              {
                label: 'Canonical Url',
                key: 'canonical_url',
                type: FORM_FIELD_TYPE.INPUT,
                value: '',
                className: 'col-12',
              },
              {
                label: 'SEO Page Keywords',
                key: 'seo_page_keywords',
                type: FORM_FIELD_TYPE.TEXTAREA,
                value: '',
                className: 'col-12',
              },
              {
                label: 'Meta Language Setting',
                key: 'meta_language_setting',
                type: FORM_FIELD_TYPE.TEXTAREA,
                value: categoriesStore.formPropsData?.languages ?? '',
                className: 'col-12',
              },
              {
                label: 'Robots',
                key: 'robots',
                type: FORM_FIELD_TYPE.DROPDOWN,
                option: [
                  { label: 'Use Global', value: 'use_global' },
                  { label: 'index, follow', value: 'index_follow' },
                  { label: 'noindex, follow', value: 'noindex_follow' },
                  { label: 'index, nofollow', value: 'index_nofollow' },
                  { label: 'noindex, nofollow', value: 'noindex_nofollow' },
                ],
                value: { label: 'Use Global', value: 'use_global' },
                className: 'col-12',
              },
            ],
          },
        ],
      };
      const generateFormSetting = () => {
        return [
          {
            fields: [
              {
                label: 'Name',
                key: 'name',
                type: FORM_FIELD_TYPE.INPUT,
                value: categoriesStore?.formPropsData ? categoriesStore?.formPropsData.name : '',
                className: 'col-12',
                required: true,
                validation: 'required',
                changed: (data) => {
                  console.log(data, this.categoriesStore.formPropsData);
                  // categoriesStore.formPropsData['name'] = data.target.value;
                },
              },
              {
                label: 'Alias',
                key: 'alias',
                type: FORM_FIELD_TYPE.INPUT,
                value: '',
                className: 'col-12',
              },

              {
                label: 'Organisation',
                key: 'organisation',
                type: FORM_FIELD_TYPE.DROPDOWN,
                value: '',
                className: 'col-12',
                placeholder: 'Select Organisation',
              },
              {
                label: 'Content Type',
                key: 'content_type',
                type: FORM_FIELD_TYPE.DROPDOWN,
                value: '',
                className: 'col-12',
                placeholder: 'Select Content Type',
              },
              {
                label: 'Parent Category',
                key: 'parent_category',
                type: FORM_FIELD_TYPE.DROPDOWN,
                value: '',
                className: 'col-12',
                placeholder: 'Top Level',
              },
              {
                label: 'Default Template',
                key: 'default_template',
                type: FORM_FIELD_TYPE.DROPDOWN,
                value: '',
                className: 'col-12',
                placeholder: 'Inherit',
              },
              {
                label: 'Category',
                key: 'category',
                type: FORM_FIELD_TYPE.DROPDOWN,
                value: '',
                className: 'col-12',
              },
              {
                label: 'Tags',
                key: 'tags',
                type: FORM_FIELD_TYPE.INPUT,
                value: '',
                className: 'col-12',
              },
              {
                label: 'Version Note',
                key: 'version_note',
                type: FORM_FIELD_TYPE.INPUT,
                value: '',
                className: 'col-12 mb-0',
              },
            ],
          },
        ];
      };
      if (status === PAGE_STATUS.LOADING) {
        return <Spinner />;
      }
      return (
        <div className="py-4 px-3 h-100 d-flex flex-column">
          {this.caregoriesDetailViewModel.formStatus === PAGE_STATUS.LOADING && (
            <Spinner className="spinner-overlay" />
          )}
          <CategoriesViewModelContextProvider viewModel={categoriesViewModel}>
            <ItemsFormPage
              store={categoriesStore}
              dataForm={data}
              generateFormSetting={generateFormSetting}
              path="/categories"
              title="txt_add_cate"
              validator={this.validator}
              caregoriesDetailViewModel={this.caregoriesDetailViewModel}
            />
          </CategoriesViewModelContextProvider>
        </div>
      );
    }
  }
);

export default withTranslation('common')(withRouter(withCategoriesViewModel(EditCategories)));
