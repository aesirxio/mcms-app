import React from 'react';
import SelectComponent from '../../components/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import './index.scss';

const PaginationComponent = ({ listViewModel, pagination, setPageSize }) => {
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
          className={`btn border-0 py-7px px-14 rounded-0 cursor-pointer text-blue-0 ${
            i === currentNumber ? 'active bg-gray-pagination' : ''
          } ${
            i === currentNumber - 1 ||
            i === currentNumber - 2 ||
            i === currentNumber - 3 ||
            i === currentNumber + 1 ||
            i === currentNumber + 2 ||
            i === currentNumber + 3
              ? 'visible_number'
              : ''
          }`}
        >
          <span>{i}</span>
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
          <span style={{ color: '#9A9A9A' }}>Showing</span>
          <SelectComponent
            defaultValue={{ value: pagination?.pageLimit, label: pagination?.pageLimit + ' Items' }}
            onChange={handleChangeLimit}
            options={[
              { value: 5, label: 'Show 5' },
              { value: 10, label: 'Show 10' },
              { value: 15, label: 'Show 15' },
              { value: 20, label: 'Show 20' },
            ]}
            className={`bg-white ms-10 rounded-1 shadow-lg`}
            isBorder
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
              className={`btn border-0 py-7px px-14`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <p
              className={`mb-0 py-7px px-14 ${
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
              className={`mb-0 py-7px px-14 ${
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
              className={`btn border-0 py-7px px-14 text-blue-0`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default PaginationComponent;
