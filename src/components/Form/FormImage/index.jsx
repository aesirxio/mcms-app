import { Icon } from '@iconify/react';
import React, { lazy, useState } from 'react';
import ComponentImage from '../../ComponentImage';
import styles from './index.module.scss';
const ModalDAMComponent = lazy(() => import('components/ModalDamComponent'));
const FormImage = ({ field, hiddenDelete = false }) => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState(field.value);
  const onSelect = (data) => {
    setFile(data[0]);
    field.changed(data);
    setShow(false);
  };
  return (
    <>
      <ModalDAMComponent show={show} onHide={() => setShow(false)} onSelect={onSelect} />
      <div className={`position-relative mb-24`}>
        {file && !hiddenDelete && (
          <div className={`position-absolute top-0 start-100 text-end cursor-pointer`}>
            <div
              className="bg-danger p-sm"
              onClick={() => {
                setFile(null);
                field.changed([{ download_url: '' }]);
              }}
            >
              <Icon className="text-white" width={24} height={24} icon="ion:trash-outline" />
            </div>
          </div>
        )}
        <div
          className={`${styles['border']} d-flex align-items-center justify-content-center cursor-auto `}
        >
          {file ? (
            <div
              key={field.value}
              onClick={() => setShow(true)}
              className={`${styles['limit-image']} text-center cursor-pointer zindex-1`}
            >
              <ComponentImage src={file.download_url || file} alt={file?.name ?? 'Image'} />
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center p-40 zindex-1">
              <p className="mb-3">Select file to upload</p>
              <p
                onClick={() => setShow(true)}
                className="bg-white cursor-pointer text-secondary border rounded-1 py-11 px-3 mb-0"
              >
                Select File
              </p>
            </div>
          )}
        </div>
      </div>
      <p className="mb-0">Maximum upload size: 10.00 MB</p>
    </>
  );
};
export default FormImage;
