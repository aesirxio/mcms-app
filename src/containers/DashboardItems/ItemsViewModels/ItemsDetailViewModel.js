import { makeAutoObservable } from 'mobx';
import { CMS_CATE_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class ItemsDetailViewModel {
  itemsStore = null;
  formStatus = PAGE_STATUS.LOADING;
  categoriesDetailViewModel = null;
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

  setForm = (categoriesDetailViewModel) => {
    this.categoriesDetailViewModel = categoriesDetailViewModel;
  };

  initializeData = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.getDetail(
      this.categoriesDetailViewModel.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetProductSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  handleCreate = (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.saveData(
      this.categoriesDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnCreateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  getDetail = (data) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.getDetail(
      data,
      this.callbackOnGetDetailSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleUpdate = (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.getDetail(
      this.categoriesDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDelete = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.handleDelete(
      id,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDeleteMultiple = (arrId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.handleDeleteMultiple(
      arrId,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleSearch = (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.handleSearch(value, this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnDeleteSuccessHandler = (id) => {
    if (id) {
      notify('Delete successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnCreateSuccessHandler = (result) => {
    console.log('datadatadatadata', result);
    if (result) {
      notify('Create successfully', 'success');
      this.successResponse.data = result;
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
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

export default ItemsDetailViewModel;
