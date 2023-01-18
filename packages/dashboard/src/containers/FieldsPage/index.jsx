import { Icon } from '@iconify/react';
import Spinner from 'components/Spinner';
import TabBarComponent from 'components/TabBarComponent';
import PAGE_STATUS from 'constants/PageStatus';
import { observer } from 'mobx-react';
import React, { lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import FieldsStore from './FieldsStore/Fields';
import FieldsViewModel from './FieldsViewModels/FieldsViewModel';
import { FieldsViewModelContextProvider } from './FieldsViewModels/FieldsViewModelContextProvider';

const Fields = lazy(() => import('./Component/Fields'));
const fieldssStore = new FieldsStore();
const fieldsViewModel = new FieldsViewModel(fieldssStore);

const FieldsPage = observer(() => {
  const { t } = useTranslation('common');
  const [filterTab, setFilterTab] = useState('');
  return (
    <FieldsViewModelContextProvider viewModel={fieldsViewModel}>
      <div className="py-4 px-3 h-100 d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t('txt_fields')}</h2>
            <p className="mb-0 text-color fs-14">{t('txt_dashboard_below')}</p>
          </div>
          <Link
            to="/fields-create"
            className="btn btn-success px-16 py-7px text-capitalize fw-semibold rounded-1"
            onClick={() => {}}
          >
            <Icon icon="akar-icons:plus" width={24} height={24} className="me-1" />
            {t('txt_add_new_item')}
          </Link>
        </div>
        <TabBarComponent viewModel={fieldsViewModel.fieldsListViewModel} />
        {fieldsViewModel.fieldsListViewModel?.formStatus == PAGE_STATUS.LOADING ? (
          <Spinner />
        ) : (
          <Fields t={t} data={null} setFilter={setFilterTab} filterTab={filterTab} />
        )}
      </div>
    </FieldsViewModelContextProvider>
  );
});

export default FieldsPage;
