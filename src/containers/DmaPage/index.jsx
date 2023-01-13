import React from 'react';
import { AesirXDmaChannels } from 'aesirx-dma-app';
import './index.scss';
import i18n from 'translations/i18n';
import { useThemeContext } from 'themes/ThemeContextProvider';

const DmaPage = () => {
  const { theme } = useThemeContext();
  return (
    <div className="py-4 px-3 h-100 ">
      <AesirXDmaChannels lang={i18n?.language} theme={theme?.theme} />
    </div>
  );
};

export default DmaPage;
