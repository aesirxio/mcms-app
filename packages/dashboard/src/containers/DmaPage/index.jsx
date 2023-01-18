import React from 'react';
import { AesirXDmaChannels } from 'aesirx-dma-app';
import './index.scss';
import { useThemeContext } from 'themes/ThemeContextProvider';
import { useTranslation } from 'react-i18next';

const DmaPage = () => {
  const { theme } = useThemeContext();
  const { i18n } = useTranslation('common');
  return (
    <div className="py-4 px-3 h-100 ">
      <AesirXDmaChannels lang={i18n?.language} theme={theme?.theme} />
    </div>
  );
};

export default DmaPage;
