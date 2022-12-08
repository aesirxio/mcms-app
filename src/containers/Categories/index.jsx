import React, { lazy, useState } from 'react';
import { useTranslation, withTranslation } from 'react-i18next';
import { observer } from 'mobx-react';
import TabBarComponent from 'components/TabBarComponent';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import {
  CategoriesViewModelContextProvider,
  withCategoriesViewModel,
} from 'ViewModel/Categories/CategoriesViewModelContextProvider';
import CategoriesStore from 'store/CategoriesStore/Categories';
import CategoriesViewModel from 'ViewModel/Categories/CategoriesViewModel';

const CategoriesComponent = lazy(() => import('./Component/Categories'));
const categoriesStore = new CategoriesStore();
const categoriesViewModel = new CategoriesViewModel(categoriesStore);

const Categories = observer(() => {
  const [filterTab, setFilterTab] = useState('');
  const [entriesFound, setEntriesFound] = useState(0);
  const { t } = useTranslation('common');

  return (
    <CategoriesViewModelContextProvider viewModel={categoriesViewModel}>
      <div className="py-4 px-3 h-100 d-flex flex-column">
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
            onClick={() => {}}
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
            categoriesViewModel={categoriesViewModel}
          />
        </div>
      </div>
    </CategoriesViewModelContextProvider>
  );
});

export default withTranslation('common')(withCategoriesViewModel(Categories));
