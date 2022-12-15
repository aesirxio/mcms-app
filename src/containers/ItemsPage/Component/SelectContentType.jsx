import Modal from 'components/Modal';
import Select from 'components/Select';
import React from 'react';
import history from 'routes/history';

function SelectContentType({ showModal, setShowModal }) {
  const handleClick = () => {
    setShowModal(false);
    history.push('/items-create');
  };
  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
      body={
        <Select
          className="border border-1 bg-white rounded-1"
          placeholder={'--Select Content Type--'}
          options={[
            { label: 'Landing page', value: 'lading_page' },
            { label: 'Packages', value: 'packages' },
          ]}
        />
      }
      header={'Select a type'}
      footer={
        <div className="d-flex justify-content-between w-100 mt-2">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-outline-success btn btn-success px-16 py-7px lh-lg text-capitalize fw-semibold rounded-1 text-capitalize fw-semibold rounded-1"
          >
            Cancel
          </button>
          <button
            onClick={handleClick}
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
