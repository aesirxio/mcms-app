import React from 'react';
import { AesirXDam } from 'aesirx-dam-app';
import Modal from 'components/Modal';
import i18n from 'translations/i18n';
import { useThemeContext } from 'themes/ThemeContextProvider';

function ModalDAMComponent({ show, onHide, onSelect }) {
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
