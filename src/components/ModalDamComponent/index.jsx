import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';
import Modal from 'components/Modal';
import { useThemeContext } from 'themes/ThemeContextProvider';
import { useTranslation } from 'react-i18next';

function ModalDAMComponent({ show, onHide, onSelect }) {
  const { i18n } = useTranslation('common');
  const { theme } = useThemeContext();
  return (
    <Modal
      dialogClassName={'modal-fullscreen modal_digital_assets position-fixed start-0'}
      show={show}
      onHide={onHide}
      body={<AesirXDam onSelect={onSelect} lang={i18n?.language} theme={theme.theme} />}
    />
  );
}

export default ModalDAMComponent;
