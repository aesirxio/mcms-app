import Table from 'components/Table';
import React, { useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';
import { useContentViewModel } from '../ContentViewModels/ContentViewModelContextProvider';

const Fields = observer(({ filterTab, setFilterTab, setEntriesFound }) => {
  const contentViewModel = useContentViewModel();

  const columnsTable = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        className: 'fs-6 fw-semibold border-bottom-1 opacity-80',
        Cell: ({ value }) => {
          return <div>{value}</div>;
        },
      },
      {
        Header: 'Content Name',
        accessor: 'title',
        className: 'fs-6 fw-semibold opacity-80 border-bottom-1',
        Cell: ({ value, row }) => {
          return (
            <div
              onClick={() => contentViewModel.contentDetailViewModel.handleEdit(row.values)}
              className="fw-semibold text-start text-truncate cursor-pointer"
            >
              {value}
            </div>
          );
        },
        sortParams: 'title',
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'fs-6 fw-semibold opacity-80 border-bottom-1',
        Cell: ({ value }) => {
          return <div>{value}</div>;
        },
      },
    ],
    []
  );
  useEffect(() => {
    const fetchData = async () => {
      await contentViewModel.contentListViewModel.initializeData();
    };
    setEntriesFound(contentViewModel?.contentListViewModel?.successResponse?.data?.length);
    fetchData();
  }, []);
  const dataTable = React.useMemo(
    () => [...contentViewModel?.contentListViewModel?.successResponse?.data],
    [contentViewModel?.contentListViewModel?.successResponse?.data]
  );

  return (
    <>
      <div className="fs-14 h-100">
        <Table
          columns={columnsTable}
          data={dataTable}
          canSort={true}
          store={contentViewModel.contentDetailViewModel}
          listViewModel={contentViewModel.contentListViewModel}
          pagination={true}
          selection={false}
          dragDrop={true}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          linkTo="/content-edit/"
        ></Table>
      </div>
    </>
  );
});
export default withTranslation('common')(Fields);
