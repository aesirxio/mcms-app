import { AesirXDam } from '@kakahuy113/aesirx-dam-app';
import React from 'react';
import '@kakahuy113/aesirx-dam-app/dist/index.css';
import '@kakahuy113/aesirx-dam-app/dist/index.css.map';
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
