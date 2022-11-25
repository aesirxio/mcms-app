import Table from "components/Table";
import React from "react";
import { ProgressBar } from "react-bootstrap";
import { withTranslation } from "react-i18next";
import numberWithCommas from "utils/formatNumber";
const Items = ({ t, data = [] }) => {
  const columnsTable = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "drop",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "ID",
        accessor: "id",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "NAME",
        accessor: "name",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 text-end",
        Cell: ({ value }) => {
          return (
            <div className="text-end px-24">${numberWithCommas(value)}</div>
          );
        },
      },
      {
        Header: "TYPE",
        accessor: "type",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "Categories",
        accessor: "categories",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "Author",
        accessor: "author",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "Engagement",
        accessor: "engagement",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "Visits",
        accessor: "visits",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "Languages",
        accessor: "languages",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "Status",
        accessor: "status",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value}</div>;
        },
      },
      {
        Header: "NS",
        accessor: "check",
        className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 ",
        Cell: ({ value }) => {
          return <div className="px-24">{value ? "T" : "F"}</div>;
        },
      },
    ],
    []
  );
  // const dataTable = React.useMemo(() => [...data], [data]);
  const dataTable = React.useMemo(
    () => [
      {
        drop: "Starter",
        id: "66",
        name: "5240.85",
        type: "Starter",
        author: "Starter",
        engagement: "Starter",
        visits: "100",
        languages: "English (en), Vietnam...",
        status: "Published",
        check: true,
      },
      {
        drop: "Starter",
        id: "66",
        name: "5240.85",
        type: "Starter",
        author: "Starter",
        engagement: "Starter",
        visits: "100",
        languages: "English (en), Vietnam...",
        status: "Published",
        check: true,
      },
      {
        drop: "Starter",
        id: "66",
        name: "5240.85",
        type: "Starter",
        author: "Starter",
        engagement: "Starter",
        visits: "100",
        languages: "English (en), Vietnam...",
        status: "Published",
        check: false,
      },
      {
        drop: "Starter",
        id: "66",
        name: "5240.85",
        type: "Starter",
        author: "Starter",
        engagement: "Starter",
        visits: "100",
        languages: "English (en), Vietnam...",
        status: "Published",
        check: true,
      },
    ],
    []
  );

  return (
    <div className="py-2 bg-white rounded-3 shadow-sm h-100 overflow-hidden">
      {/* <h2 className="py-16 px-24 mb-0 fs-4 fw-semibold text-blue-0">
        {t('txt_revenue_by_subscribers')}
      </h2> */}
      <div className="fs-14 fw-semibold h-100">
        <Table columns={columnsTable} data={dataTable}></Table>
      </div>
    </div>
  );
};
export default withTranslation("common")(Items);
