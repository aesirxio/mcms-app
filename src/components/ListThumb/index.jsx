import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons/faSearch";
import { faColumns } from "@fortawesome/free-solid-svg-icons/faColumns";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import SelectComponent from "../Select";
import { notify } from "components/Toast";
import { Dropdown, Row } from "react-bootstrap";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

const optionAction = [
  // { value: "edit", label: "Edit" },
  { value: "delete", label: "Delete" },
  // { value: "action-3", label: "Action 3" },
];

const optionColumns = [
  { value: "columns-1", label: "Columns 1" },
  { value: "columns-2", label: "Columns 2" },
  { value: "columns-3", label: "Columns 3" },
];
const optionFilterColumns = [
  { value: true, label: "Published" },
  { value: false, label: "UnPublished" },
];

const ListThumb = ({
  setLoading,
  currentRow,
  setDataAction,
  selectedMulptiRows,
  setDataActionAllrows,
  setDataFilter,
  allColumns,
}) => {
  const [action, setAction] = useState("");
  const [columns, setColumns] = useState();
  const [filterColum, setFilterColum] = useState("");
  const [filter, setFilter] = useState("");
  console.log(columns);
  const handleAnAction = async (e) => {
    if (!currentRow.value && selectedMulptiRows?.length === 0) {
      return;
    }
    setLoading(true);
    setAction(e);
    setDataActionAllrows(selectedMulptiRows);
    setDataAction(currentRow);
    setTimeout(() => {
      setLoading(false);
      notify("Success");
    }, 2000);
  };
  let getColumn = [];
  const handleColumns = (e) => {
    // setLoading(true);
    getColumn.push(e.target?.parentElement?.id);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  };

  const handleSearch = (e) => {
    setLoading(true);
    setFilter(e);
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
    <>
      <div className="bg-white rounded-3 mb-24px">
        <div className="row">
          <div className="col-8">
            <div className="row">
              <div className="col-5 border-end-1">
                <div className="input-group mb-0">
                  <input
                    type="text"
                    placeholder="Search"
                    aria-describedby="button-search"
                    className="form-control border-end-0 pe-2 border-0"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(e)}
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
              <div className="col-3 border-end-1">
                <SelectComponent
                  value={action}
                  onChange={(e) => handleAnAction(e)}
                  options={optionAction}
                  isBorder={false}
                  placeholder="Choose an action"
                  className="text-green"
                  plColor="rgba(8, 18, 64, 0.8)"
                />
              </div>
              <div className="col-2 border-end-1">
                <div className="d-flex align-items-center">
                  <div className="w-260">
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="info"
                        id="actions"
                        className={`btn_toggle`}
                      >
                        <i>
                          <FontAwesomeIcon icon={faColumns} />
                        </i>
                        <span className="p-1 text-blue-0 opacity-75">
                          Columns
                        </span>
                        <i className="text-green">
                          <FontAwesomeIcon icon={faChevronDown} />
                        </i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="pt-3 px-2 border-0 shadow">
                        {allColumns?.map(
                          (column) =>
                            column.id !== "selection" &&
                            column.Header &&
                            column.id !== "drag" && (
                              <div
                                key={column.id}
                                id={column.Header}
                                className="mb-2"
                                onClick={(e) => handleColumns(e)}
                              >
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  // {...column.getToggleHiddenProps()}
                                />
                                {column.Header}
                              </div>
                            )
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
              <div className="col-2 border-end-1">
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
                      placeholder="Filter"
                      className="text-green"
                      plColor="rgba(8, 18, 64, 0.8)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-5 justify-content-end d-flex">
          <button
            type="button"
            className={`btn text-blue-0 rounded-0 px-4 ${
              isList ? "bg-blue-3" : ""
            }`}
            onClick={_handleList}
          >
            <i>
              <FontAwesomeIcon icon={faList} />
            </i>
            <span className="ms-2 opacity-75">List</span>
          </button>
          <button
            type="button"
            className={`btn text-blue-0 rounded-0 px-4 ${
              !isList ? "bg-blue-3" : ""
            }`}
            onClick={_handleList}
          >
            <i>
              <FontAwesomeIcon icon={faTh} />
            </i>
            <span className="ms-2 opacity-75">Thumb</span>
          </button>
        </div> */}
        </div>
      </div>
    </>
  );
};

export default withTranslation("common")(ListThumb);
