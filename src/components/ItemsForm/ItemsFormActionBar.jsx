import React, { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { withRouter } from 'react-router-dom';
class ItemsFormActionBar extends Component {
  render() {
    const { t, history, path, validator, caregoriesDetailViewModel } = this.props;
    return (
      <div className="d-flex">
        <button
          onClick={() => history.push(path ?? '/')}
          className="btn btn-outline-secondary px-16 py-11 text-capitalize rounded-1 me-16 text-danger bg-white border-gray-200 d-flex align-items-center"
        >
          <Icon className="me-1" icon="iconoir:cancel" width={24} height={24} />
          {t('txt_cancel')}
        </button>
        <button
          className="btn btn-outline-secondary px-16 py-11 text-capitalize rounded-1 me-16 text-blue-0 bg-white border-gray-200"
          onClick={async (e) => {
            e.preventDefault();
            if (validator.allValid()) {
              if (this.isEdit) {
                await caregoriesDetailViewModel.updateCategories();
              } else {
                await caregoriesDetailViewModel.createCategories();
              }
            } else {
              validator.showMessages();
            }
            this.forceUpdate();
          }}
        >
          {t('txt_save_close')}
        </button>
        <button
          className="btn btn-success px-16 py-11 text-capitalize fw-semibold rounded-1 d-flex align-items-center"
          onClick={() => {}}
        >
          <Icon className="me-1" icon="teenyicons:save-outline" />
          {t('txt_save')}
        </button>
      </div>
    );
  }
}

export default withRouter(withTranslation('common')(ItemsFormActionBar));
