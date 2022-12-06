import Table from 'components/Table';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { observer } from 'mobx-react-lite';

const Fields = observer(({ filterTab, setFilterTab, store, setEntriesFound }) => {
  const [loading, setLoading] = useState(false);

  const columnsTable = React.useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id',
        width: 'auto',
        className: 'px-24 py-2 fs-16 border-bottom-1 opacity-80 text-blue-200',
        Cell: ({ value }) => {
          return <div className="px-24 ps-2">{value}</div>;
        },
      },
      {
        Header: 'Content Name',
        accessor: 'content_name',
        className:
          'px-24 py-2 fs-16 opacity-80 text-blue-200 border-bottom-1 text-start text-truncate',
        Cell: ({ value }) => {
          return <div className="px-24 text-start text-truncate">{value}</div>;
        },
        width: 'auto',
        sortParams: 'field_name',
      },
      {
        Header: 'Description',
        accessor: 'description',
        className: 'px-24 py-2 fs-16 opacity-80 text-blue-200 border-bottom-1 text-start',
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
        width: 'auto',
      },
    ],
    []
  );
  // const dataTable = React.useMemo(() => [...data], [data]);
  const dataTable = React.useMemo(
    () => [
      {
        checkbox: true,
        id: '501',
        content_name: 'Customer',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'Brancher slider',
        description:
          'In mattis auctor nunc, et egestas sapien hendrerit eu. Nunc non ante odio. Cras lacinia facilisis elit',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'Category type',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'News',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'B2B Solutions',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'About Us',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: '	Contact Us',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'Career',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'Package',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'Team',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'Services price',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
      {
        checkbox: true,
        id: '501',
        content_name: 'Services Lv4',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi et ultrices ante. Nulla sagittis sollicitud',
      },
    ],
    []
  );
  if (store.dataDumyCreate?.id) {
    dataTable.unshift(store.dataDumyCreate);
  }

  useEffect(() => {
    let fetchData = async () => {
      setLoading(true);
      await store.getItems();
      setLoading(false);
    };
    fetchData();
    setEntriesFound(dataTable?.length);
  }, [store]);

  return (
    <>
      <div className="fs-14 fw-semibold h-100">
        <Table
          columns={columnsTable}
          data={dataTable}
          canSort={true}
          store={store}
          pagination={true}
          selection={false}
          dragDrop={true}
          setLoading={setLoading}
          loading={loading}
          filterTab={filterTab}
          setFilterTab={setFilterTab}
          linkTo="/items-create"
        ></Table>
      </div>
    </>
  );
});
export default withTranslation('common')(Fields);
