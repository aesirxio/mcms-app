import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { faFilter } from '@fortawesome/free-solid-svg-icons/faFilter';
import SelectComponent from '../Select';
import { notify } from 'components/Toast';
import { Dropdown } from 'react-bootstrap';
import { faChevronDown, faColumns } from '@fortawesome/free-solid-svg-icons';
import './index.scss';

const optionAction = [
  { value: 'delete', label: 'Delete' },
  // { value: "action-3", label: "Action 3" },
];

const optionFilterColumns = [
  { value: true, label: 'Published' },
  { value: false, label: 'UnPublished' },
];

const ListThumb = ({
  setLoading,
  selectedMulptiRows,
  setDataFilter,
  setFilterSearch,
  store,
  allColumns,
}) => {
  const [action, setAction] = useState('');
  const [filterColum, setFilterColum] = useState('');
  const handleAnAction = async (e) => {
    if (selectedMulptiRows?.length < 1) {
      return;
    }
    setLoading(true);
    setAction(e);
    if (selectedMulptiRows?.length === 1) {
      store.handleDelete(selectedMulptiRows[0].values.id);
    } else if (selectedMulptiRows?.length > 1) {
      store.handleDeleteMultiple(selectedMulptiRows);
    }

    setTimeout(() => {
      setLoading(false);
      notify('Success');
    }, 2000);
  };

  const handleSearch = (e) => {
    setLoading(true);
    setFilterSearch(e.target.value);
    store.handleSearch(e.target.value);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  const handleFilterColum = (e) => {
    setLoading(true);
    setFilterColum(e);
    setDataFilter(e);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="rounded-3 mb-24 bg-white shadow-sm">
      <div className="row">
        <div className="col-auto border-end-1">
          <div className="input-group mb-0">
            <input
              type="text"
              placeholder="Search your content"
              aria-describedby="button-search"
              className="form-control border-end-0 pe-2 border-0 fw-semibold fs-14 bg"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            <button
              type="button"
              id="button-search"
              className="btn btn_search border-0 border-start-0 border-gray text-green"
              onClick={(e) => handleSearch(e)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="col-auto border-end-1">
          <SelectComponent
            value={action}
            onChange={(e) => handleAnAction(e)}
            options={optionAction}
            isBorder={false}
            isShadow={false}
            placeholder="Choose an action"
            className="text-green fw-semibold text-blue-0"
          />
        </div>
        <div className="col-auto border-end-1">
          <Dropdown>
            <Dropdown.Toggle id="actions" variant="white" className={`btn_toggle `}>
              <i>
                <FontAwesomeIcon icon={faColumns} />
              </i>
              <span className="p-1 text-blue-0 fs-14 fw-semibold">Columns</span>
              <i className="text-green">
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </Dropdown.Toggle>
            <Dropdown.Menu className="pt-3 px-2 border-0 shadow select-option">
              {allColumns?.map(
                (column) =>
                  column.id !== 'selection' &&
                  column.Header &&
                  column.id !== 'drag' && (
                    <div key={column.id} id={column.Header} className="mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input me-1"
                        {...column.getToggleHiddenProps()}
                      />
                      {column.Header}
                    </div>
                  )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="col-auto border-end-1">
          <div className="d-flex align-items-center">
            <i className="text-blue-0">
              <FontAwesomeIcon icon={faFilter} />
            </i>
            <div className="w-260">
              <SelectComponent
                value={filterColum}
                onChange={(e) => handleFilterColum(e)}
                options={optionFilterColumns}
                isBorder={false}
                isShadow={false}
                placeholder="Filter"
                className="fw-semibold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation('common')(ListThumb);
