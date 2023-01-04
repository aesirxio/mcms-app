import React, { observer } from 'mobx-react';
import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import history from 'routes/history';
import { notifyHTML } from 'components/Toast';
const ItemsFormActionBar = observer(
  class ItemsFormActionBar extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const { t, path, validator, store, isEdit } = this.props;
      const redirect = true;
      const showError = () => {
        let listError = '';
        Object.entries(validator.errorMessages).forEach((error) => {
          const [, value] = error;
          if (value) {
            listError += `<p class="mb-0">${value}</p>`;
          }
        });
        notifyHTML(listError, 'error');
        validator.showMessages();
      };

      return (
        <div className="d-flex">
          <button
            onClick={() => history.push(path ?? '/')}
            className="btn btn-outline-secondary px-16 py-11 text-capitalize border rounded-1 me-16 text-danger bg-white d-flex align-items-center"
          >
            <Icon className="me-10" icon="iconoir:cancel" width={24} height={24} />
            {t('txt_cancel')}
          </button>
          <button
            className="btn btn-outline-secondary px-16 py-11 text-capitalize border rounded-1 me-16 text-blue-0 bg-white"
            onClick={async (e) => {
              e.preventDefault();
              if (validator.allValid()) {
                if (isEdit) {
                  await store.handleUpdate(redirect);
                } else {
                  await store.handleCreate(redirect);
                }
              } else {
                showError();
              }
              this.forceUpdate();
            }}
          >
            {t('txt_save_close')}
          </button>
          <button
            className="btn btn-success px-16 py-11 text-capitalize fw-semibold rounded-1 d-flex align-items-center"
            onClick={async (e) => {
              e.preventDefault();
              if (validator.allValid()) {
                if (isEdit) {
                  await store.handleUpdate();
                } else {
                  await store.handleCreate();
                }
              } else {
                showError();
              }
              this.forceUpdate();
            }}
          >
            <Icon className="me-10" icon="teenyicons:save-outline" />
            {t('txt_save')}
          </button>
        </div>
      );
    }
  }
);

export default withTranslation('common')(ItemsFormActionBar);
