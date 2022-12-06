import React, { lazy, useContext, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import TabBarComponent from 'components/TabBarComponent';
import { Link, Route } from 'react-router-dom';
import { CategoriesStoreContext } from 'store/CategoriesStore/Categories';
import { FORM_FIELD_TYPE } from 'constants/FormFieldType';
import { Icon } from '@iconify/react';

const CategoriesComponent = lazy(() => import('./Component/Categories'));
const ItemsFormPage = lazy(() => import('../../components/ItemsForm/ItemsFormPage'));

const Categories = observer(() => {
  const categoriesStore = useContext(CategoriesStoreContext);
  const [filterTab, setFilterTab] = useState('');
  const [entriesFound, setEntriesFound] = useState(0);
  const { t } = useTranslation('common');

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
              categoriesStore.formPropsData['name'] = data.target.value;
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
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <Route exact path={['/categories']}>
        <div className="d-flex align-items-start justify-content-between flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t('txt_menu_cate')}</h2>
            <p className="mb-0 text-color fs-14">
              {entriesFound} {t('txt_entries_found')}
            </p>
          </div>
          <Link
            to="/categories-create"
            className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1"
            onClick={() => categoriesStore.clearData()}
          >
            <Icon icon="akar-icons:plus" width={24} height={24} className="me-1" />
            {t('txt_add_new_cate')}
          </Link>
        </div>
        <div className="py-3 h-100 d-flex flex-column">
          <TabBarComponent view={'all-items'} filterTab={filterTab} setFilterTab={setFilterTab} />
          <CategoriesComponent
            t={t}
            data={null}
            setFilter={setFilterTab}
            filterTab={filterTab}
            setEntriesFound={setEntriesFound}
          />
        </div>
      </Route>
      <Route exact path={['/categories-create', '/categories-edit/:id']}>
        <ItemsFormPage
          store={categoriesStore}
          dataForm={data}
          generateFormSetting={generateFormSetting}
          path="/categories"
          title="txt_add_cate"
        />
      </Route>
    </div>
  );
});

export default withTranslation('common')(Categories);
