import ListThumb from "components/ListThumb";
import Table from "components/Table";
import React, { useContext, useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import { observer } from "mobx-react-lite";
import { CategoriesStoreContext } from "store/CategoriesStore/Categories";

const Categories = observer(
  ({ t, data = [], filterTab, setFilterTab, setEntriesFound }) => {
    const categoriesStore = useContext(CategoriesStoreContext);
    const [newStatus, setNewStatus] = useState();
    const [selectedMulptiRows, setSelectedMulptiRows] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataAction, setDataAction] = useState([]);
    const [dataActionAllrows, setDataActionAllrows] = useState();
    const [dataFilter, setDataFilter] = useState();
    const [filterSearch, setFilterSearch] = useState("");

    const columnsTable = React.useMemo(
      () => [
        {
          Header: "ID",
          accessor: "id",
          width: "auto",
          className: "px-24 py-2 fs-12 opacity-50 border-bottom-1",
          Cell: ({ value }) => {
            return <div className="px-24">{value}</div>;
          },
        },
        {
          Header: "Category",
          accessor: "category",
          className:
            "px-24 py-2 fs-12 opacity-50 border-bottom-1 text-start text-truncate",
          Cell: ({ value }) => {
            return (
              <div className="px-24 text-start text-truncate">{value}</div>
            );
          },
          width: "25%",
          sortParams: "category",
        },
        {
          Header: "Type",
          accessor: "type",
          className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 text-center",
          Cell: ({ value }) => {
            return <div className="px-24">{value}</div>;
          },
          width: "auto",
        },

        {
          Header: "Engagement",
          accessor: "engagement",
          className:
            "px-24 py-2 fs-12 opacity-50 border-bottom-1 text-truncate",
          Cell: ({ value }) => {
            return <div className="px-24 text-truncate">{value}</div>;
          },
          width: "auto",
        },
        {
          Header: "Visits",
          accessor: "visits",
          className:
            "px-24 py-2 fs-12 opacity-50 border-bottom-1 text-center text-truncate",
          Cell: ({ value }) => {
            return <div className="px-24">{value}</div>;
          },
          width: "auto",
        },
        {
          Header: "Languages",
          accessor: "languages",
          className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 text-center ",
          Cell: ({ value }) => {
            return <div className="px-24 text-truncate">{value}</div>;
          },
          width: "15%",
        },
        {
          Header: "Status",
          accessor: "status",
          className: "px-24 py-2 fs-12 opacity-50 border-bottom-1 text-center",
          Cell: ({ value }) => {
            return (
              <div className="px-24">{value ? "Published" : "UnPublished"}</div>
            );
          },
          width: "auto",
        },
        {
          Header: "",
          accessor: "check",
          className: "px-24 py-2 fs-12  border-bottom-1 text-center",
          Cell: ({ row }) => {
            return (
              <div
                className="px-24 cursor-pointer"
                onClick={(e) => {
                  setNewStatus(row);
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
                    fill={`${row?.values?.check ? "#1AB394" : "transparent"}`}
                    stroke={`${row?.values?.check ? "transparent" : "#C0C0C0"}`}
                  />
                </svg>
              </div>
            );
          },
          width: "auto",
        },
      ],
      []
    );
    // const dataTable = React.useMemo(() => [...data], [data]);
    const dataTable = React.useMemo(
      () => [
        {
          checkbox: true,
          id: "260",
          category: "|-E-Commerce",
          type: "Services",

          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: false,
          id: "261",
          category: "|-|-E-commerce B2C",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: false,
          check: false,
        },
        {
          checkbox: true,
          id: "262",
          category: "|-|-E-commerce B2B",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: true,
          id: "263",
          category: "|-|-E-commerce Omnichannel",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: true,
          id: "264",
          category: "|-Digital Experience Platform",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: false,
          id: "265",
          category: "|-|-AesirX",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: false,
          check: false,
        },
        {
          checkbox: true,
          id: "266",
          category: "|-|-PIM (Product Information Management)",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: true,
          id: "267",
          category: "|-|-DAM (Digital Asset Management)",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: true,
          id: "267",
          category: "|-|-DAM (Digital Asset Management)",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: true,
          id: "267",
          category: "|-|-DAM (Digital Asset Management)",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: true,
          id: "267",
          category: "|-|-DAM (Digital Asset Management)",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
        {
          checkbox: true,
          id: "267",
          category: "|-|-DAM (Digital Asset Management)",
          type: "Services",
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        },
      ],
      []
    );
    // if (itemsStore.dataDumyCreate?.id) {
    //   dataTable.unshift(itemsStore.dataDumyCreate);
    // }

    useEffect(() => {
      let fetchData = async () => {
        setLoading(true);
        await categoriesStore.getItems();
        setLoading(false);
      };
      fetchData();
      setEntriesFound(dataTable?.length);
    }, [categoriesStore, dataTable?.length, setEntriesFound]);

    return (
      <>
        <ListThumb
          setLoading={setLoading}
          loading={loading}
          setDataAction={setDataAction}
          dataAction={dataAction}
          selectedMulptiRows={selectedMulptiRows}
          setDataActionAllrows={setDataActionAllrows}
          setDataFilter={setDataFilter}
          setFilterSearch={setFilterSearch}
          store={categoriesStore}
        />
        <div className="py-3 bg-white rounded-3 shadow-sm h-100 overflow-scroll">
          <div className="fs-14 fw-semibold h-100">
            <Table
              columns={columnsTable}
              data={dataTable}
              canSort={true}
              // store={itemsStore}
              pagination={true}
              selection={false}
              dragDrop={true}
              setLoading={setLoading}
              loading={loading}
              setDataAction={setDataAction}
              dataAction={dataAction}
              filterTab={filterTab}
              setFilterTab={setFilterTab}
              setSelectedMulptiRows={setSelectedMulptiRows}
              dataActionAllrows={dataActionAllrows}
              dataFilter={dataFilter}
              filterSearch={filterSearch}
            ></Table>
          </div>
        </div>
      </>
    );
  }
);
export default withTranslation("common")(Categories);
