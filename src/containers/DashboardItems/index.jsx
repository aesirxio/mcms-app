import React, { lazy, useState } from 'react';
import { observer } from 'mobx-react';
import { withBiViewModel } from 'store/BiStore/BiViewModelContextProvider';
import { withRouter } from 'react-router-dom';
import TabBarComponent from 'components/TabBarComponent';

import { useTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
// import history from 'routes/history';
import { Button } from 'react-bootstrap';
import SelectContentType from './Component/SelectContentType';

const ListItemsComponent = lazy(() => import('./Component/Items'));

const Dashboard = observer(() => {
  const [filterTab, setFilterTab] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { t } = useTranslation('common');
  return (
    <>
      <SelectContentType showModal={showModal} setShowModal={setShowModal} />
      <div className="py-4 px-3 h-100 d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t('txt_items')}</h2>
            <p className="mb-0 text-color fs-14">{t('txt_dashboard_below')}</p>
          </div>
          <Button
            variant={'success'}
            className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1"
            onClick={() => setShowModal(true)}
          >
            <Icon icon="akar-icons:plus" width={24} height={24} className="me-1" />
            {t('txt_add_new_item')}
          </Button>
        </div>
        <TabBarComponent view={'all-items'} filterTab={filterTab} setFilterTab={setFilterTab} />
        <ListItemsComponent t={t} data={null} setFilter={setFilterTab} filterTab={filterTab} />
      </div>
    </>
  );
});

export default withRouter(withBiViewModel(Dashboard));
