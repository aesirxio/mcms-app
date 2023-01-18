import React from 'react';

import { withTranslation } from 'react-i18next';

import './index.scss';
import { Modal } from 'react-bootstrap';

class ModalComponent extends React.Component {
  render() {
    let {
      header,
      footer,
      body,
      show,
      onHide,
      dialogClassName,
      onShow,
      centered = true,
    } = this.props;

    return (
      <Modal
        show={show}
        onShow={onShow}
        onHide={onHide}
        centered={centered}
        dialogClassName={dialogClassName}
      >
        <Modal.Header closeButton className="px-4 border-bottom-0 text-blue-0">
          {header && <Modal.Title>{header}</Modal.Title>}
        </Modal.Header>
        <Modal.Body className="px-4 pt-0 pb-0">{body}</Modal.Body>
        {footer && <Modal.Footer className="px-4">{footer}</Modal.Footer>}
      </Modal>
    );
  }
}

export default withTranslation('common')(ModalComponent);
