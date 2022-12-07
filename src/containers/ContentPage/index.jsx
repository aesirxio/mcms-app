import { Icon } from '@iconify/react';
import TabBarComponent from 'components/TabBarComponent';
import { observer } from 'mobx-react';
import React, { lazy, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, Route } from 'react-router-dom';
import { ContentStoreContext } from 'store/ContentStore/Content';
// import { withTranslation } from "react-i18next";

const ContentPage = lazy(() => import('./Component/ContentPage'));

const Categories = observer(() => {
  const contentStore = useContext(ContentStoreContext);
  const { t } = useTranslation('common');
  const [filterTab, setFilterTab] = useState('');
  const [entriesFound, setEntriesFound] = useState(0);
  return (
    <div className="py-4 px-3 h-100 d-flex flex-column">
      <Route exact path={['/content']}>
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t('txt_content_page')}</h2>
            <p className="mb-0 text-color fs-14">
              {entriesFound} {t('txt_entries_found')}
            </p>
          </div>
          <Link
            to="/fields-create"
            className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1"
            onClick={() => contentStore.clearData()}
          >
            <Icon icon="akar-icons:plus" width={24} height={24} className="me-1" />
            {t('txt_add_new_item')}
          </Link>
        </div>
        <TabBarComponent
          view={'all-items'}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          store={contentStore}
        />
        <ContentPage
          t={t}
          data={null}
          setFilter={setFilterTab}
          filterTab={filterTab}
          store={contentStore}
          setEntriesFound={setEntriesFound}
        />
      </Route>
    </div>
  );
});
export default Categories;
