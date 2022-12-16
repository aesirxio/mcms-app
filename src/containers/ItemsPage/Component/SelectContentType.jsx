import Modal from 'components/Modal';
import Select from 'components/Select';
import React, { useState } from 'react';
import history from 'routes/history';
import { notify } from 'components/Toast';
function SelectContentType({ showModal, setShowModal }) {
  const [contentType, setContentType] = useState(null);
  const handleClick = () => {
    if (contentType?.value) {
      setShowModal(false);
      history.push(`/items-create/${contentType.value}`);
    } else {
      notify('Please choose content type of items.', 'error');
    }
  };
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      centered={false}
      dialogClassName={'mt-7rem'}
      body={
        <Select
          className="border border-1 bg-white rounded-1"
          placeholder={'--Select Content Type--'}
          options={[
            { label: 'Landing page', value: 1 },
            { label: 'Packages', value: 2 },
          ]}
          value={contentType}
          onChange={(data) => {
            setContentType(data);
          }}
        />
      }
      header={'Select a type'}
      footer={
        <div className="d-flex justify-content-between w-100 mt-2">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-outline-secondary px-16 py-7px lh-lg text-capitalize fw-semibold rounded-1 text-capitalize fw-semibold rounded-1"
          >
            Cancel
          </button>
          <button
            onClick={handleClick}
            disabled={!contentType}
            className="btn btn-success btn btn-success px-16 py-7px lh-lg text-capitalize fw-semibold rounded-1 text-capitalize fw-semibold rounded-1"
          >
            Proceed
          </button>
        </div>
      }
    />
  );
}

export default SelectContentType;
