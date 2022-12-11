import { Icon } from '@iconify/react';
// import TabBarComponent from 'components/TabBarComponent';
import { observer } from 'mobx-react';
import React, { lazy, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ContentStore from './ContentStore/Content';
import ContentViewModel from './ContentViewModels/ContentViewModel';
import { ContentViewModelContextProvider } from './ContentViewModels/ContentViewModelContextProvider';

const ContentPage = lazy(() => import('./Component/ContentPage'));
const contentStore = new ContentStore();
const contentViewModel = new ContentViewModel(contentStore);
const Categories = observer(() => {
  const { t } = useTranslation('common');
  const [filterTab, setFilterTab] = useState('');
  const [entriesFound, setEntriesFound] = useState(0);
  return (
    <ContentViewModelContextProvider viewModel={contentViewModel}>
      <div className="py-4 px-3 h-100 d-flex flex-column">
        <div className="d-flex align-items-start justify-content-between mb-32 flex-wrap">
          <div>
            <h2 className="text-blue-0 fw-bold mb-sm">{t('txt_content_page')}</h2>
            <p className="mb-0 text-color fs-14">
              {entriesFound} {t('txt_entries_found')}
            </p>
          </div>
          <Link
            to="/content-create"
            className="btn btn-success px-16 py-1 text-capitalize fw-semibold rounded-1"
            onClick={() => {}}
          >
            <Icon icon="akar-icons:plus" width={24} height={24} className="me-1" />
            {t('txt_add_new_item')}
          </Link>
        </div>
        {/* <TabBarComponent
            view={'all-items'}
            filterTab={filterTab}
            setFilterTab={setFilterTab}
            // store={contentStore}
          /> */}
        <ContentPage
          t={t}
          data={null}
          setFilter={setFilterTab}
          filterTab={filterTab}
          setEntriesFound={setEntriesFound}
        />
      </div>
    </ContentViewModelContextProvider>
  );
});
export default Categories;
