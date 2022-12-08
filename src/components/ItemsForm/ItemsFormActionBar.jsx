import React, { observer } from 'mobx-react';
import { Component } from 'react';
import { withTranslation } from 'react-i18next';
import { Icon } from '@iconify/react';
import { withRouter } from 'react-router-dom';
import { withCategoriesViewModel } from 'ViewModel/Categories/CategoriesViewModelContextProvider';

const ItemsFormActionBar = observer(
  class ItemsFormActionBar extends Component {
    constructor(props) {
      super(props);
    }
    render() {
      const { t, history, path, validator, categoriesDetailViewModel, isEdit } = this.props;
      const redirect = true;
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
                if (isEdit) {
                  await categoriesDetailViewModel.getDetail(redirect);
                } else {
                  await categoriesDetailViewModel.createCategories(redirect);
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
            onClick={async (e) => {
              e.preventDefault();
              if (validator.allValid()) {
                if (this.isEdit) {
                  await categoriesDetailViewModel.getDetail();
                } else {
                  await categoriesDetailViewModel.createCategories();
                }
              } else {
                validator.showMessages();
              }
              this.forceUpdate();
            }}
          >
            <Icon className="me-1" icon="teenyicons:save-outline" />
            {t('txt_save')}
          </button>
        </div>
      );
    }
  }
);

export default withRouter(withTranslation('common')(withCategoriesViewModel(ItemsFormActionBar)));
