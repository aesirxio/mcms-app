import React from 'react';
import SelectComponent from '../../components/Select';
import './index.scss';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

const PaginationComponent = ({ listViewModel, pagination, setPageSize }) => {
  const { t } = useTranslation('common');

  const handleGoToPage = (i) => {
    listViewModel.handlePagination(
      (listViewModel.filters['list[limitstart]'] = (i - 1) * pagination?.pageLimit)
    );
  };

  const handlePreviousPage = () => {
    listViewModel.handlePagination(
      (listViewModel.filters['list[limitstart]'] = pagination?.page - 1)
    );
  };

  const handleNextPage = () => {
    listViewModel.handlePagination(
      (listViewModel.filters['list[limitstart]'] = pagination?.page + 1)
    );
  };

  const paginationHTML = () => {
    let paginationHTML = [];
    let currentNumber = pagination?.page;
    for (let i = 1; i <= pagination?.totalPages; i++) {
      paginationHTML.push(
        <button
          key={i}
          disabled={currentNumber === i}
          onClick={() => handleGoToPage(i)}
          className={`btn border-0 py-7px px-12 rounded-0 cursor-pointer ${
            i === currentNumber ? 'active bg-gray-pagination text-blue-0' : ' text-gray-pagination'
          } ${
            i === currentNumber - 1 ||
            i === currentNumber - 2 ||
            i === currentNumber - 3 ||
            i === currentNumber + 1 ||
            i === currentNumber + 2 ||
            i === currentNumber + 3
              ? 'visible_number '
              : ''
          }`}
        >
          <span className={`${i !== currentNumber && 'text-gray-pagination'}`}>{i}</span>
        </button>
      );
    }
    return paginationHTML;
  };

  const handleChangeLimit = (object) => {
    setPageSize(object.value);
    listViewModel.handlePagination((listViewModel.filters['list[limit]'] = object.value));
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="select_limit d-flex align-items-center">
          <span style={{ color: '#9A9A9A' }}>{t('txt_showing')}</span>
          <SelectComponent
            defaultValue={{
              value: pagination?.pageLimit,
              label: pagination?.pageLimit + ' ' + t('txt_items'),
            }}
            onChange={handleChangeLimit}
            options={[
              { value: 5, label: `${t('txt_show')} 5` },
              { value: 10, label: `${t('txt_show')} 10` },
              { value: 15, label: `${t('txt_show')} 15` },
              { value: 20, label: `${t('txt_show')} 20` },
            ]}
            menuPlacement="top"
            className={`bg-white ms-10 rounded-1 shadow-pagination`}
          />
        </div>
        {pagination?.totalPages > 1 ? (
          <div
            className={
              'd-flex justify-content-center bg-white pagination_list rounded-1 overflow-hidden border'
            }
          >
            <button
              onClick={() => handlePreviousPage()}
              disabled={pagination && pagination.page <= 1 ? true : false}
              className={`btn border-0 py-7px px-11 text-gray-pagination`}
            >
              <Icon className="d-block" icon="carbon:chevron-left" />
            </button>
            <p
              className={`mb-0 py-7px px-14 text-gray-pagination ${
                pagination.page === 1 ||
                pagination.page === 2 ||
                pagination.page === 3 ||
                pagination.page === 4 ||
                pagination.page === 5
                  ? 'isHidden'
                  : ''
              }`}
            >
              ...
            </p>
            <div className="wr_pagination_number">{paginationHTML()}</div>
            <p
              className={`mb-0 py-7px px-14 text-gray-pagination ${
                pagination.page === pagination.totalPages - 4 ||
                pagination.page === pagination.totalPages - 3 ||
                pagination.page === pagination.totalPages - 2 ||
                pagination.page === pagination.totalPages - 1 ||
                pagination.page === pagination.totalPages
                  ? 'isHidden'
                  : ''
              }`}
            >
              ...
            </p>
            <button
              onClick={() => handleNextPage()}
              disabled={pagination && pagination.page === pagination.totalPages ? true : false}
              className={`btn border-0 py-7px px-11 rounded-0 text-gray-pagination`}
            >
              <Icon className="d-block" icon="carbon:chevron-right" />
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PaginationComponent;
