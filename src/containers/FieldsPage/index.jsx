import { Icon } from '@iconify/react';
import TabBarComponent from 'components/TabBarComponent';
import { observer } from 'mobx-react';
import React, { lazy, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { FieldsStoreContext } from 'store/FieldsStore/Fields';

const Fields = lazy(() => import('./Component/Fields'));

const FieldsPage = observer(() => {
  const fieldsStore = useContext(FieldsStoreContext);
  const { t } = useTranslation('common');
  const [filterTab, setFilterTab] = useState('');
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <Route exact path={['/fields']}>
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t('txt_fields')}</h2>
            <p className="mb-0 text-color fs-14">{t('txt_dashboard_below')}</p>
          </div>
          <Link
            to="/fields-create"
            className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1"
            onClick={() => fieldsStore.clearData()}
          >
            <Icon icon="akar-icons:plus" width={24} height={24} className="me-1" />
            {t('txt_add_new_item')}
          </Link>
        </div>
        <TabBarComponent
          view={'all-items'}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          store={fieldsStore}
        />
        <Fields
          t={t}
          data={null}
          setFilter={setFilterTab}
          filterTab={filterTab}
          store={fieldsStore}
        />
      </Route>
    </div>
  );
});

export default FieldsPage;
