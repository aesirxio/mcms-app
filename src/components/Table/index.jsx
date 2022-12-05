import React, { useEffect, useState } from 'react';
import { useExpanded, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { withTranslation } from 'react-i18next';
import ComponentNoData from '../ComponentNoData';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import ComponentImage from 'components/ComponentImage';
import BTable from 'react-bootstrap/Table';
import Spinner from 'components/Spinner';
import ListThumb from 'components/ListThumb';

const Table = ({
  columns,
  data,
  pagination,
  store,
  setLoading,
  loading,
  onSelect,
  dataList,
  selection = true,
  classNameTable,
  canSort,
  sortAPI,
  dragDrop,
  filterTab,
  linkTo,
}) => {
  const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input className="form-check-input p-0" type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  });
  const [records, setRecords] = useState(data);
  const [dataFilter, setDataFilter] = useState();
  const [filterSearch, setFilterSearch] = useState('');
  const [idDummyDelete, setIdDummyDelete] = useState(null);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageOptions,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    selectedFlatRows,
    state: { pageIndex, pageSize },
    setPageSize,
    allColumns,
    pageCount,
  } = useTable(
    {
      columns,
      data: records,
      onSelect,
      initialState: {
        //  pageIndex: 1
      },
    },
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
    (hooks) => {
      !selection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            className: 'px-24 py-2 border-bottom-1 text-uppercase ps-3',
            width: '50px',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div className="wrapper_checkbox px-24">
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      if (dragDrop) {
        hooks.visibleColumns.push((columns) => [
          {
            id: 'drag',
            width: 'auto',
            className: 'px-24 py-2 ',
          },
          ...columns,
        ]);
      }
    }
  );

  useEffect(() => {
    if (idDummyDelete && idDummyDelete?.length === 1) {
      setRecords(data.filter((v) => v.id !== idDummyDelete?.[0]?.values?.id));
      // setDataAction({});
    } else if (idDummyDelete?.length > 1) {
      setRecords(data.filter((v) => v.status === 'DeleteAll'));
    } else if (filterTab) {
      setRecords(
        filterTab.target.innerText && filterTab.target.innerText !== 'All items'
          ? data.filter(
              (v) =>
                v.status ===
                (filterTab.target.innerText === 'Published'
                  ? true
                  : filterTab.target.innerText === 'Unpublished'
                  ? false
                  : null)
            )
          : data
      );
    } else if (dataFilter) {
      setRecords(data.filter((v) => v.status === dataFilter?.value));
    } else if (filterSearch) {
      setRecords(data.filter((v) => v.name?.toLowerCase().includes(filterSearch?.toLowerCase())));
    } else {
      setRecords(data);
    }
  }, [data, filterTab, dataFilter, filterSearch, idDummyDelete]);

  // const handlePagination = async (pageIndex) => {
  //   setLoading(true);
  //   await store.goToPage(pageIndex);
  //   setLoading(false);
  // };
  //handle rows drag and drop
  const moveRow = async (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    await setRecords(
      update(records, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragRecord],
        ],
      })
    );
  };
  const DND_ITEM_TYPE = 'row';

  const Row = ({ row, index, moveRow, newRowCells }) => {
    const dropRef = React.useRef(null);
    const dragRef = React.useRef(null);
    const [, drop] = useDrop({
      accept: DND_ITEM_TYPE,
      hover(item, monitor) {
        if (!dropRef.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;
        if (dragIndex === hoverIndex) {
          return;
        }
        const hoverBoundingRect = dropRef.current.getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }
        moveRow(dragIndex, hoverIndex);
        item.index = hoverIndex;
      },
    });

    const [{ isDragging }, drag, preview] = useDrag({
      item: { index },
      type: DND_ITEM_TYPE,
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const opacity = isDragging ? 0 : 1;

    preview(drop(dropRef));
    drag(dragRef);

    return (
      <tr
        ref={dropRef}
        style={{ opacity }}
        key={row.getRowProps().key}
        // eslint-disable-next-line react/no-unknown-property
        moveRow={() => moveRow()}
        {...row.getRowProps()}
        // onContextMenu={(e) => {
        //   onRightClickItem(e, row.original);
        // }}
      >
        <td ref={dragRef}>
          <ComponentImage
            src={'/assets/images/moveIcon.png'}
            alt={'/assets/images/moveIcon.png'}
            className="py-2 ps-2"
          />
        </td>

        {newRowCells.map((cell, index) => {
          return (
            cell.column.id !== 'drag' && (
              <td
                key={index}
                {...cell.getCellProps({
                  style: { width: cell.column.width },
                })}
                className={`py-2 ${
                  cell.column.id === 'status'
                    ? cell?.value
                      ? 'bg-status_publish'
                      : 'bg-status_unPublish'
                    : ''
                }`}
              >
                {cell.render('Cell')}
              </td>
            )
          );
        })}
      </tr>
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ListThumb
            setLoading={setLoading}
            loading={loading}
            selectedMulptiRows={selectedFlatRows}
            setDataFilter={setDataFilter}
            setFilterSearch={setFilterSearch}
            store={store}
            linkTo={linkTo}
            allColumns={allColumns}
            setIdDummyDelete={setIdDummyDelete}
          />
          <div className="py-2 bg-white rounded-3 shadow-sm h-100 overflow-scroll">
            <div className="bg-white fs-14 text-color position-relative h-100">
              <div className="px-2 border-end-1"></div>
              {page.length ? (
                <BTable
                  striped
                  // bordered
                  hover
                  {...getTableProps()}
                  className={`w-100 ${classNameTable}`}
                >
                  <thead>
                    {headerGroups.map((headerGroup, index) => {
                      let newHeaderGroup = '';

                      dataList
                        ? (newHeaderGroup = headerGroup.headers.filter(
                            (item) => !dataList.some((other) => item.id === other)
                          ))
                        : (newHeaderGroup = headerGroup.headers);

                      return (
                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                          {newHeaderGroup.map((column, index) => {
                            let sortParams = column.sortParams ?? column.id;
                            let columnInside = '';
                            if (column.rowSpan && canSort && !sortAPI) {
                              columnInside = column.columns[0];
                            }
                            return (
                              <th
                                key={index}
                                {...(!sortAPI && {
                                  ...column.getHeaderProps(
                                    canSort && !column.rowSpan
                                      ? column.getSortByToggleProps()
                                      : columnInside && columnInside.getSortByToggleProps()
                                  ),
                                })}
                                className={`${column.className} ${
                                  sortAPI && sortParams !== 'number' && sortParams !== 'selection'
                                    ? 'cursor-pointer'
                                    : ''
                                } `}
                                {...(sortAPI &&
                                  sortParams !== 'number' &&
                                  sortParams !== 'selection' && {
                                    onClick: async () => {
                                      setLoading(true);
                                      if (store.sortBy.id === sortParams && store.sortBy.desc) {
                                        store.sortBy = { desc: true };
                                      } else if (store.sortBy.id !== sortParams) {
                                        store.sortBy = {
                                          id: sortParams,
                                          desc: false,
                                        };
                                      } else {
                                        store.sortBy = {
                                          id: sortParams,
                                          desc: !store.sortBy.desc,
                                        };
                                      }
                                      await store.getItems();
                                      setLoading(false);
                                    },
                                  })}
                                rowSpan={`${column.rowSpan ?? 1}`}
                              >
                                {column?.id === 'check' && (
                                  <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M19.2831 7.27584L13.3323 6.411L10.6722 1.01803C10.5995 0.87037 10.48 0.750839 10.3323 0.678183C9.96199 0.49537 9.51199 0.647714 9.32684 1.01803L6.66668 6.411L0.715901 7.27584C0.551838 7.29928 0.401838 7.37662 0.286995 7.49381C0.148155 7.63651 0.0716479 7.8285 0.0742847 8.02758C0.0769216 8.22666 0.158487 8.41655 0.301057 8.55553L4.60653 12.7532L3.58934 18.6805C3.56549 18.8184 3.58074 18.9602 3.63338 19.0899C3.68602 19.2195 3.77394 19.3318 3.88716 19.4141C4.00038 19.4963 4.13437 19.5452 4.27395 19.5551C4.41352 19.5651 4.5531 19.5357 4.67684 19.4704L9.99949 16.6719L15.3222 19.4704C15.4675 19.5477 15.6362 19.5735 15.7979 19.5454C16.2057 19.4751 16.48 19.0883 16.4097 18.6805L15.3925 12.7532L19.6979 8.55553C19.8151 8.44068 19.8925 8.29068 19.9159 8.12662C19.9792 7.71646 19.6932 7.33678 19.2831 7.27584Z"
                                      fill={'#1AB394'}
                                      stroke={'#C0C0C0'}
                                    />
                                  </svg>
                                )}
                                {column.render('Header')}
                                {canSort && (
                                  <span className="position-relative">
                                    {sortAPI ? (
                                      store?.sortBy?.id === sortParams &&
                                      sortParams !== 'number' &&
                                      sortParams !== 'selection' ? (
                                        store?.sortBy?.desc ? (
                                          <FontAwesomeIcon
                                            className="sort-icon sort-icon-down ms-sm"
                                            icon={faSortDown}
                                          />
                                        ) : (
                                          <FontAwesomeIcon
                                            className="sort-icon sort-icon-up ms-sm mb-nsm"
                                            icon={faSortUp}
                                          />
                                        )
                                      ) : (
                                        ''
                                      )
                                    ) : !column.rowSpan ? (
                                      column.isSorted &&
                                      sortParams !== 'number' &&
                                      sortParams !== 'selection' ? (
                                        column.isSortedDesc ? (
                                          <FontAwesomeIcon
                                            className="sort-icon sort-icon-down ms-sm"
                                            icon={faSortDown}
                                          />
                                        ) : (
                                          <FontAwesomeIcon
                                            className="sort-icon sort-icon-up ms-sm mb-nsm"
                                            icon={faSortUp}
                                          />
                                        )
                                      ) : (
                                        ''
                                      )
                                    ) : columnInside.isSorted &&
                                      // Column have rowSpan
                                      sortParams !== 'number' &&
                                      sortParams !== 'selection' ? (
                                      columnInside.isSortedDesc ? (
                                        <FontAwesomeIcon
                                          className="sort-icon sort-icon-down ms-sm"
                                          icon={faSortDown}
                                        />
                                      ) : (
                                        <FontAwesomeIcon
                                          className="sort-icon sort-icon-up ms-sm mb-nsm"
                                          icon={faSortUp}
                                        />
                                      )
                                    ) : (
                                      ''
                                    )}
                                  </span>
                                )}
                              </th>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                    {page.length > 0 &&
                      page.map((row, index) => {
                        prepareRow(row);
                        let newRowCells = '';

                        dataList
                          ? (newRowCells = row.cells.filter(
                              (item) => !dataList.some((other) => item.column.id === other)
                            ))
                          : (newRowCells = row.cells);

                        return (
                          <Row
                            key={index}
                            index={index}
                            row={row}
                            moveRow={moveRow}
                            newRowCells={newRowCells}
                            {...row.getRowProps()}
                          />
                        );
                      })}
                  </tbody>
                </BTable>
              ) : null}

              {page.length === 0 ? (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <ComponentNoData
                    icons="/assets/images/ic_project.svg"
                    title="No Data"
                    width="w-50"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </>
      )}
      {pagination && pageOptions.length ? (
        loading ? (
          <Spinner />
        ) : (
          <div className="pagination position-absolute mt-1 d-flex col-12">
            <div className="col-4">
              <span className="pe-1 text-gray-800">Showing</span>
              <select
                className="border-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize} Items
                  </option>
                ))}
              </select>
            </div>
            <div className="col-8 text-end pe-5 button_pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>{' '}
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
              </button>{' '}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
              </button>{' '}
              <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
              </button>{' '}
              <span>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span>
              <span>
                | Go to page:{' '}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(page);
                  }}
                  style={{ width: '100px' }}
                />
              </span>
            </div>
          </div>
        )
      ) : null}
    </DndProvider>
  );
};

export default withTranslation('common')(Table);
