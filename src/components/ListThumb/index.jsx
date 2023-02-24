import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import SelectComponent from '../Select';
import { notify } from 'components/Toast';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { faChevronDown, faColumns } from '@fortawesome/free-solid-svg-icons';
import './index.scss';
import PAGE_STATUS from 'constants/PageStatus';
// import { Icon } from '@iconify/react';

// const optionFilterColumns = [
//   { value: 'published', label: 'Published' },
//   { value: 'unPublished', label: 'UnPublished' },
// ];

const ListThumb = ({ selectedMulptiRows, allColumns, listViewModel, setFormStatus }) => {
  const { t } = useTranslation('common');
  const optionAction = [{ value: 'delete', label: t('delete') }];
  const [action, setAction] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [valueSearch, setValueSearch] = useState('');
  // const [filterColum, setFilterColum] = useState('');

  useEffect(() => {
    if (listViewModel.filters['filter[search]']) {
      setValueSearch(listViewModel.filters['filter[search]']);
    }
  }, []);
  const handleAnAction = async (e) => {
    if (selectedMulptiRows?.length < 1) {
      notify('Please choose items to delete', 'error');
      return;
    } else {
      // const listSelectedItems = selectedMulptiRows.map((item) => Number(item.values.id));
      setAction(e);
      setShowPopup(true);
      // await listViewModel.handleDelete(listSelectedItems);
    }
  };

  const handleSearch = async () => {
    setFormStatus(PAGE_STATUS.LOADING);
    await listViewModel.getListByFilter((listViewModel.filters['filter[search]'] = valueSearch));
  };

  // const handleFilterColum = (e) => {
  //   setFilterColum(e);
  //   listViewModel.getListByFilter((listViewModel.filters['list[direction]'] = e.value));
  // };

  const handleClose = () => {
    setShowPopup(false);
  };

  const handleDelete = async () => {
    const listSelectedItems = selectedMulptiRows.map((item) => Number(item.values.id));
    await listViewModel.handleDelete(listSelectedItems, t('txt_cannot_delete'));
    await handleClose();
  };

  return (
    <div className="rounded-3 mb-24 bg-white shadow-sm">
      <div className="d-flex align-items-center">
        <div className="border-end-1 px-3">
          <div className="input-group mb-0">
            <input
              type="text"
              placeholder={t('txt_search')}
              aria-describedby="button-search"
              className="form-control border-end-0 pe-2 border-0 fw-semibold fs-14 bg-transparent form-control_placeholder"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              defaultValue={listViewModel.filters['filter[search]'] ?? ''}
              onChange={(e) => setValueSearch(e?.target?.value)}
            />
            <button
              type="button"
              id="button-search"
              className="btn btn_search border-0 border-start-0 border-gray text-green"
              onClick={() => handleSearch()}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="border-end-1">
          <SelectComponent
            value={action}
            onChange={(e) => handleAnAction(e)}
            options={optionAction}
            isBorder={false}
            isShadow={false}
            isSemibold={true}
            placeholder={t('choose_an_action')}
            className="text-green text-blue-0"
          />
        </div>
        <Modal
          show={showPopup}
          // onShow={onShow}
          onHide={handleClose}
          centered={true}
          dialogClassName={'minw-lg-520px'}
        >
          {/* <Modal.Header closeButton className="px-4 border-bottom-0 text-blue-0">
            Confirm Delete
          </Modal.Header> */}
          <div className="py-3rem px-4rem mx-auto">
            <div className="d-flex justify-content-center">
              <img
                alt="circle-close.png"
                src="/assets/images/circle-close.png"
                width={77}
                height={77}
              />
            </div>
            <Modal.Body className="p-0 pt-29px text-center">
              <h4 className="fw-bold">{t('txt_you_sure')}</h4>
              <p className="fs-sm">{t('txt_complete_delete')}</p>
            </Modal.Body>
            <div className="d-flex justify-content-center">
              <Modal.Footer className="px-4">
                <Button
                  className="btn btn-light minw-118px h-48px border-gray-200"
                  onClick={() => handleClose()}
                >
                  {t('txt_cancel')}
                </Button>
                <Button
                  className="btn btn-danger ms-3 minw-118px h-48px"
                  onClick={() => handleDelete()}
                >
                  {t('txt_yes_delete')}
                </Button>
              </Modal.Footer>
            </div>
          </div>
        </Modal>
        <div className="border-end-1">
          <Dropdown>
            <Dropdown.Toggle
              id="actions"
              variant="white"
              className={`btn_toggle bg-transparent border-0 d-flex align-items-center px-4`}
            >
              <i className="text-blue-0">
                <FontAwesomeIcon icon={faColumns} />
              </i>
              <span className="px-7px text-blue-0 fs-14 fw-semibold">{t('txt_colums')}</span>
              <i className="text-green">
                <FontAwesomeIcon icon={faChevronDown} />
              </i>
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ minWidth: '100%' }}
              className="pt-3 px-4 border-0 shadow select-option"
            >
              {allColumns?.map(
                (column) =>
                  column.id !== 'selection' &&
                  column.Header &&
                  column.id !== 'drag' && (
                    <div key={column.id} id={column.Header} className="mb-2">
                      <input
                        type="checkbox"
                        className="form-check-input me-2"
                        {...column.getToggleHiddenProps()}
                      />
                      {column.Header}
                    </div>
                  )
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* <div className="col-auto border-end-1">
          <div className="d-flex align-items-center ps-11">
            <Icon className="text-blue-0" icon="ci:filter-outline" width={16} height={16} />
            <div className="w-130px">
              <SelectComponent
                value={filterColum}
                onChange={(e) => handleFilterColum(e)}
                options={optionFilterColumns}
                isBorder={false}
                isShadow={false}
                isSemibold={true}
                placeholder="Filter"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ListThumb;
