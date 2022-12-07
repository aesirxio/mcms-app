/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from 'components/Toast';
import { CMS_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
class ItemsListViewModel {
  itemsStore = null;
  formStatus = PAGE_STATUS.READY;
  itemsListViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(itemsStore) {
    makeAutoObservable(this);
    this.itemsStore = itemsStore;
  }

  setForm = (itemsDetailViewModel) => {
    this.itemsDetailViewModel = itemsDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.getItemsDetail(
      this.itemsDetailViewModel.formPropsData[CMS_PRODUCT_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetProductSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetItemsSuccessHandler = (result) => {
    if (result) {
      Object.keys(CMS_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
        this.itemsDetailViewModel.formPropsData[CMS_PRODUCT_DETAIL_FIELD_KEY[index]] =
          result[CMS_PRODUCT_DETAIL_FIELD_KEY[index]];
      });
    }

    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ItemsListViewModel;
