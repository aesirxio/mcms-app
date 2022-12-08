/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import PAGE_STATUS from 'constants/PageStatus';
import { makeAutoObservable } from 'mobx';
import { notify } from 'components/Toast';
// import { CMS_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
class ItemsListViewModel {
  itemsStore = null;
  formStatus = PAGE_STATUS.READY;
  itemsListViewModel = null;

  listItems = null;
  dataFilter = {};
  pageSize = 5;
  page = 1;

  view = 'all';

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
    await this.itemsStore.getList(
      this.callbackOnGetListsSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    notify('Something when wrong !!', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetListsSuccessHandler = (result) => {
    if (result) {
      this.listItems = result.items;
    }

    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ItemsListViewModel;
