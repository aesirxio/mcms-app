import { AesirXDam } from '@kakahuy113/test-dam-app';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeContext } from 'themes/ThemeContextProvider';
import './index.scss';

const Categories = () => {
  const { theme } = useThemeContext();
  const { i18n } = useTranslation('common');
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
