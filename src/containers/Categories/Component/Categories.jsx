import Table from 'components/Table';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useCategoriesViewModel } from '../CategoriesViewModels/CategoriesViewModelContextProvider';

const Categories = observer(({ filterTab, setFilterTab, setEntriesFound }) => {
  const [loading, setLoading] = useState(false);
  const [dataAction, setDataAction] = useState([]);
  const categoriesViewModel = useCategoriesViewModel();

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
        Header: 'Category',
        accessor: 'name',
        className: 'fs-6 fw-semibold opacity-80 border-bottom-1 ',
        Cell: ({ value, row }) => {
          return (
            <div
              onClick={() => categoriesViewModel.categoriesDetailViewModel.handleEdit(row.values)}
              className="fw-semibold text-start text-truncate cursor-pointer"
            >
              {value}
            </div>
          );
        },

        sortParams: 'name',
      },
      {
        Header: 'Type',
        accessor: 'type',
        className: 'fs-6 fw-semibold opacity-80 border-bottom-1',
        Cell: ({ value }) => {
          return <div>{value}</div>;
        },
      },

      {
        Header: 'Engagement',
        accessor: 'engagement',
        className: 'fs-6 fw-semibold opacity-80 border-bottom-1 text-end text-truncate',
        Cell: ({ value }) => {
          return <div className=" text-end">{value}</div>;
        },
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        className: 'fs-6 fw-semibold opacity-80 border-bottom-1 text-end text-truncate',
        Cell: ({ value }) => {
          return <div className="text-end">{value}</div>;
        },
      },
      {
        Header: 'Languages',
        accessor: 'languages',
        className: 'fs-6 fw-semibold opacity-80 border-bottom-1 text-end ',
        Cell: ({ value }) => {
          return <div className="text-end text-truncate">{value}</div>;
        },
      },
      {
        Header: 'Status',
        accessor: 'status',
        className: 'fs-6 fw-semibold opacity-80 border-bottom-1 text-end',
        Cell: ({ value }) => {
          return (
            <div className="text-end">
              <span
                className={` bg-status_${value}${
                  value ? 'bg-status_publish' : 'bg-status_unPublish'
                } m-0 py-8px px-12 d-inline-block rounded-1 fw-semibold`}
              >
                {value ? 'Published' : 'UnPublished'}
              </span>
            </div>
          );
        },
      },
      {
        Header: '',
        accessor: 'check',
        className: 'fs-6 fw-semibold border-bottom-1 text-center',
        Cell: ({ row }) => {
          const isFeatured = row.values.featured ? 0 : 1;
          return (
            <div
              className=" cursor-pointer px-16 text-center"
              onClick={(e) => {
                e.stopPropagation(),
                  categoriesViewModel.categoriesDetailViewModel.setFeatured(
                    row.values.id,
                    isFeatured
                  );
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.2831 7.27584L13.3323 6.411L10.6722 1.01803C10.5995 0.87037 10.48 0.750839 10.3323 0.678183C9.96199 0.49537 9.51199 0.647714 9.32684 1.01803L6.66668 6.411L0.715901 7.27584C0.551838 7.29928 0.401838 7.37662 0.286995 7.49381C0.148155 7.63651 0.0716479 7.8285 0.0742847 8.02758C0.0769216 8.22666 0.158487 8.41655 0.301057 8.55553L4.60653 12.7532L3.58934 18.6805C3.56549 18.8184 3.58074 18.9602 3.63338 19.0899C3.68602 19.2195 3.77394 19.3318 3.88716 19.4141C4.00038 19.4963 4.13437 19.5452 4.27395 19.5551C4.41352 19.5651 4.5531 19.5357 4.67684 19.4704L9.99949 16.6719L15.3222 19.4704C15.4675 19.5477 15.6362 19.5735 15.7979 19.5454C16.2057 19.4751 16.48 19.0883 16.4097 18.6805L15.3925 12.7532L19.6979 8.55553C19.8151 8.44068 19.8925 8.29068 19.9159 8.12662C19.9792 7.71646 19.6932 7.33678 19.2831 7.27584Z"
                  fill={`${row?.values?.check ? '#1AB394' : 'transparent'}`}
                  stroke={`${row?.values?.check ? 'transparent' : '#C0C0C0'}`}
                />
              </svg>
            </div>
          );
        },
      },
    ],
    []
  );

  const dataTable = React.useMemo(
    () => [
      {
        checkbox: true,
        id: '260',
        name: '|-E-Commerce',
        type: 'Services',

        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: false,
        id: '261',
        name: '|-|-E-commerce B2C',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: false,
        check: false,
      },
      {
        checkbox: true,
        id: '262',
        name: '|-|-E-commerce B2B',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: true,
        id: '263',
        name: '|-|-E-commerce Omnichannel',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: true,
        id: '264',
        name: '|-Digital Experience Platform',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: false,
        id: '265',
        name: '|-|-AesirX',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: false,
        check: false,
      },
      {
        checkbox: true,
        id: '266',
        name: '|-|-PIM (Product Information Management)',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: true,
        id: '267',
        name: '|-|-DAM (Digital Asset Management)',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: true,
        id: '267',
        name: '|-|-DAM (Digital Asset Management)',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: true,
        id: '267',
        name: '|-|-DAM (Digital Asset Management)',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: true,
        id: '267',
        name: '|-|-DAM (Digital Asset Management)',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
      {
        checkbox: true,
        id: '267',
        name: '|-|-DAM (Digital Asset Management)',
        type: 'Services',
        engagement: '40%',
        visits: '100',
        languages: 'English (en), Vietnam...',
        status: true,
        check: true,
      },
    ],
    []
  );
  // if (categoriesStore.dataDumyCreate?.id) {
  //   dataTable.unshift(categoriesStore.dataDumyCreate);
  // }
  useEffect(() => {
    let fetchData = async () => {
      setLoading(true);
      await categoriesViewModel.categoriesListViewModel.initializeData();
      setLoading(false);
    };
    fetchData();
    setEntriesFound(dataTable?.length);
  }, []);
  return (
    <>
      <div className="fs-14 h-100">
        <Table
          columns={columnsTable}
          data={dataTable}
          canSort={true}
          store={categoriesViewModel.categoriesDetailViewModel}
          pagination={true}
          selection={false}
          dragDrop={true}
          setLoading={setLoading}
          loading={loading}
          setDataAction={setDataAction}
          dataAction={dataAction}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          linkTo="/categories-edit/"
        ></Table>
      </div>
    </>
  );
});
export default Categories;
