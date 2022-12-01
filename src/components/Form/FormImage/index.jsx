import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import ComponentImage from "../../ComponentImage";
import styles from "./index.module.scss";
const FormImage = ({ field }) => {
  const [file, setFile] = useState(field.value);

  const { getRootProps, getInputProps, open } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile(URL.createObjectURL(acceptedFiles[0]));
    },
    noClick: true,
  });

  return (
    <div className={`${styles["border"]} position-relative p-sm`}>
      {file && (
        <div
          className={`position-absolute top-0 start-100 text-end cursor-auto`}
        >
          <div className="bg-danger p-sm" onClick={() => setFile(null)}>
            <Icon
              className="text-white"
              width={24}
              height={24}
              icon="ion:trash-outline"
            />
          </div>
        </div>
      )}
      <div
        {...getRootProps()}
        className="d-flex align-items-center justify-content-center cursor-auto"
      >
        <input
          {...getInputProps()}
          className="position-absolute start-0 top-0 bottom-0 end-0 cursor-auto"
        />
        {file ? (
          <div
            key={field.value}
            className={`${styles["limit-image"]} text-center cursor-pointer`}
            onClick={open}
          >
            <ComponentImage src={file} alt={field.value} />
          </div>
        ) : (
          <div className="d-flex flex-column align-items-center p-4">
            <p>Drop files anywhere to upload</p>
            <p className="text-secondary">or</p>
            <p
              className="btn bg-white text-secondary border rounded-1 py-11 px-3 mb-0"
              onClick={open}
            >
              Select File
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormImage;
