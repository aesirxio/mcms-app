import { AesirXDam } from 'aesirx-dam-app';
import React from 'react';
import { useThemeContext } from 'themes/ThemeContextProvider';
import './index.scss';
import i18n from 'translations/i18n';

const Categories = () => {
  const { theme } = useThemeContext();
  const onSelect = (data) => {
    console.log('onSelectonSelect', data);
  };

  return (
    <div className="py-4 px-3 h-100 ">
      <AesirXDam onSelect={onSelect} lang={i18n?.language} theme={theme?.theme} />
    </div>
  );
};

export default Categories;
