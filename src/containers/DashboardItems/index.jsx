import React, { lazy, useState } from 'react';
import { observer } from 'mobx-react';
import TabBarComponent from 'components/TabBarComponent';

import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
// import history from 'routes/history';
import { Button } from 'react-bootstrap';
import SelectContentType from './Component/SelectContentType';
import ItemsStore from './ItemsStore/ItemsStore';
import { ItemsViewModelContextProvider } from './ItemsViewModels/ItemsViewModelContextProvider';
import ItemsListViewModel from './ItemsViewModels/ItemsListViewModel';

const ListItemsComponent = lazy(() => import('./Component/Items'));
const itemsStore = new ItemsStore();
const itemsListViewModel = new ItemsListViewModel(itemsStore);

const Dashboard = observer(() => {
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation('common');
  return (
    <>
      <ItemsViewModelContextProvider viewModel={itemsListViewModel}>
        <SelectContentType showModal={showModal} setShowModal={setShowModal} />
        <div className="py-4 px-3 h-100 d-flex flex-column">
          <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
            <div>
              <h2 className="text-blue-0 fw-bold mb-sm">{t('txt_items')}</h2>
              <p className="mb-0 text-color fs-14">{t('txt_dashboard_below')}</p>
            </div>
            <Button
              variant={'success'}
              className="btn btn-success btn btn-success px-16 py-7px lh-lg text-capitalize fw-semibold rounded-1 text-capitalize fw-semibold rounded-1"
              onClick={() => setShowModal(true)}
            >
              <Icon icon="akar-icons:plus" width={24} height={24} className="me-1" />
              {t('txt_add_new_item')}
            </Button>
          </div>
          <TabBarComponent viewModel={itemsListViewModel} />
          <ListItemsComponent />
        </div>
      </ItemsViewModelContextProvider>
    </>
  );
});

export default Dashboard;
