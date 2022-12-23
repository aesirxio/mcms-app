import { AesirXDam } from 'aesirx-dam-app';
import React from 'react';
import './index.scss';

const Categories = () => {
  const onSelect = (data) => {
    console.log('onSelectonSelect', data);
  };
  return (
    <div className="py-4 px-3 h-100 ">
      <AesirXDam onSelect={onSelect} />
    </div>
  );
};

export default Categories;
