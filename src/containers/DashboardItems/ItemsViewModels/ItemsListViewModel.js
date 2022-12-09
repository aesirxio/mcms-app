import { makeAutoObservable } from 'mobx';
// import { CMS_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class ItemsListViewModel {
  itemsStore = null;
  formStatus = PAGE_STATUS.READY;
  itemsDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
    data: [],
    dataDetail: [],
  };

  constructor(itemsStore) {
    makeAutoObservable(this);
    this.itemsStore = itemsStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.getList(this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetDetailSuccessHandler = (result) => {
    if (result) {
      console.log('result', result);
      this.successResponse.dataDetail = result;
      notify('GetDetail successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };
  callbackOnUpdateSuccessHandler = (result) => {
    if (result) {
      console.log('result', result);
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ItemsListViewModel;
