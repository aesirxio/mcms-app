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
  // const dataTable = React.useMemo(
  //   () => [
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'Customer',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'Brancher slider',
  //       description:
  //         'In mattis auctor nunc, et egestas sapien hendrerit eu. Nunc non ante odio. Cras lacinia facilisis elit',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'Category type',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'News',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'B2B Solutions',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'About Us',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: '	Contact Us',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'Career',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'Package',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'Team',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'Services price',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //     {
  //       checkbox: true,
  //       id: '501',
  //       name: 'Services Lv4',
  //       description:
  //         'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
  //     },
  //   ],
  //   []
  // );

  useEffect(() => {
    const fetchData = async () => {
      await contentViewModel.contentListViewModel.initializeData();
    };
    fetchData();
    setEntriesFound(contentViewModel?.contentListViewModel?.successResponse?.data?.length);
  }, []);
  return (
    <>
      <div className="fs-14 h-100">
        <Table
          columns={columnsTable}
          data={contentViewModel?.contentListViewModel?.successResponse?.data}
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
