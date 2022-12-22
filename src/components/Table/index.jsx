import React, { useEffect, useState } from 'react';
import { useExpanded, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import { withTranslation } from 'react-i18next';
import ComponentNoData from '../ComponentNoData';
import './index.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp, faArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import BTable from 'react-bootstrap/Table';
import ListThumb from 'components/ListThumb';

const Table = ({
  columns,
  data,
  pagination,
  store,
  onSelect,
  dataList,
  selection = true,
  classNameTable,
  canSort,
  sortAPI,
  dragDrop,
  listViewModel,
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
  const paginate = [];

  useEffect(() => {
    setRecords(data);
  }, [data]);
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
    // state :{pageIndex},
    state: { pageIndex, pageSize },
    setPageSize,
    allColumns,
    // pageCount,
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
      if (dragDrop) {
        !selection &&
          hooks.visibleColumns.push((columns) => [
            {
              id: 'drag',
              className: 'border-bottom-1',
            },
            ...columns,
          ]);
      }
      !selection &&
        hooks.visibleColumns.push((columns) => [
          {
            id: 'selection',
            className: 'border-bottom-1 text-uppercase text-center px-11',
            Header: ({ getToggleAllPageRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div
                className="wrapper_checkbox text-center "
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(row.values.id);
                }}
              >
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
    }
  );
  //handle rows drag and drop
  const moveRow = (dragIndex, hoverIndex) => {
    const dragRecord = records[dragIndex];
    setRecords(
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
        key={Math.random(40, 200)}
        ref={dropRef}
        style={{ opacity }}
        //  moveRow={() => moveRow()}
        {...row.getRowProps()}
      >
        {newRowCells.map((cell) => {
          return cell.column.id !== 'drag' ? (
            <td key={Math.random(40, 200)} {...cell.getCellProps({ className: 'py-14' })}>
              {cell.render('Cell')}
            </td>
          ) : (
            <td ref={dragRef} key={Math.random(40, 200)}>
              <FontAwesomeIcon icon={faArrowsAlt} width={16} height={16} />
            </td>
          );
        })}
      </tr>
    );
  };
  {
    pageOptions?.forEach((v, i) => {
      if (i === 4 && pageOptions?.length > 7) {
        paginate?.push(<a key={Math.random(40, 200)}>...</a>);
        i = pageOptions?.length - 3;
      }
      paginate?.push(
        <button
          className={`${pageIndex == i && 'bg-black-50'}`}
          onClick={() => {
            gotoPage(i),
              listViewModel.handlePagination((listViewModel.filters['list[limitstart]'] = i));
          }}
          key={Math.random(40, 200)}
        >
          <a>{i + 1}</a>
        </button>
      );
    });
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <ListThumb
          selectedMulptiRows={selectedFlatRows}
          allColumns={allColumns}
          listViewModel={listViewModel}
        />
        {page.length ? (
          <div className="rounded-3 shadow-sm overflow-hidden mb-24 text-color">
            <BTable
              hover
              {...getTableProps()}
              className={`w-100 align-middle table-borderless table-striped mb-0 ${classNameTable}`}
            >
              <thead className="bg-white">
                {headerGroups.map((headerGroup) => {
                  let newHeaderGroup = '';

                  dataList
                    ? (newHeaderGroup = headerGroup.headers.filter(
                        (item) => !dataList.some((other) => item.id === other)
                      ))
                    : (newHeaderGroup = headerGroup.headers);

                  return (
                    <tr key={Math.random(40, 200)} {...headerGroup.getHeaderGroupProps()}>
                      {newHeaderGroup.map((column) => {
                        let sortParams = column.sortParams ?? column.id;
                        let columnInside = '';
                        if (column.rowSpan && canSort && !sortAPI) {
                          columnInside = column.columns[0];
                        }
                        return (
                          <th
                            key={Math.random(40, 200)}
                            {...(!sortAPI && {
                              ...column.getHeaderProps(
                                canSort && !column.rowSpan
                                  ? column.getSortByToggleProps()
                                  : columnInside && columnInside.getSortByToggleProps()
                              ),
                            })}
                            className={`py-16 ${column.className} ${
                              sortAPI && sortParams !== 'number' && sortParams !== 'selection'
                                ? 'cursor-pointer'
                                : ''
                            } `}
                            {...(sortAPI &&
                              sortParams !== 'number' &&
                              sortParams !== 'selection' && {
                                onClick: async () => {
                                  // setLoading(true);
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
                                  // setLoading(false);
                                },
                              })}
                            rowSpan={`${column.rowSpan ?? 1}`}
                          >
                            {column?.id === 'featured' && (
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
                        key={Math.random(40, 200)}
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
          </div>
        ) : (
          <div className="position-absolute top-50 start-50 translate-middle">
            <ComponentNoData icons="/assets/images/ic_project.svg" title="No Data" width="w-50" />
          </div>
        )}
        {pagination && pageOptions?.length ? (
          <div className="pagination position-absolute d-flex col-12 pb-2">
            <div className="col-4">
              <span className="pe-1 text-gray-800">Showing</span>
              <select
                className="border-select"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  listViewModel.handlePagination(
                    (listViewModel.filters['list[limit]'] = Number(e.target.value))
                  );
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={Math.random(40, 200)} value={pageSize}>
                    {pageSize} Items
                  </option>
                ))}
              </select>
            </div>
            <div className="col-8 text-end button_pagination">
              {/* <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
              </button>{' '} */}
              <div className="border_pagination">
                <button
                  onClick={() => {
                    previousPage(),
                      listViewModel.handlePagination(
                        (listViewModel.filters['list[limitstart]'] = pageIndex - 1)
                      );
                  }}
                  disabled={!canPreviousPage}
                >
                  {'<'}
                </button>
                <span className="">{paginate}</span>
                <button
                  onClick={() => {
                    nextPage(),
                      listViewModel.handlePagination(
                        (listViewModel.filters['list[limitstart]'] = pageIndex + 1)
                      );
                  }}
                  disabled={!canNextPage}
                >
                  {'>'}
                </button>
              </div>
              {/* <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
              </button>{' '} */}
              {/* <span>
                Page{' '}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{' '}
              </span> */}
              {/* <span>
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
              </span> */}
            </div>
          </div>
        ) : null}
      </>
    </DndProvider>
  );
};

export default withTranslation('common')(Table);
