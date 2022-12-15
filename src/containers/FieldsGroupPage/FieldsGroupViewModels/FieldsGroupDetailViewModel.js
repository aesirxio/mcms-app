import { makeAutoObservable } from 'mobx';
import { CMS_CATE_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class FieldsGroupDetailViewModel {
  fieldsGroupStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldsGroupDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
    data: [],
    dataDetail: [],
  };

  constructor(fieldsGroupStore) {
    makeAutoObservable(this);
    this.fieldsGroupStore = fieldsGroupStore;
  }

  setForm = (fieldsGroupDetailViewModel) => {
    this.fieldsGroupDetailViewModel = fieldsGroupDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldsGroupStore.getDetail(
      this.fieldsGroupDetailViewModel.formPropsData[CMS_CATE_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetProductSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  handleCreate = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldsGroupStore.saveData(
      this.fieldsGroupDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnCreateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  getDetail = (data) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.fieldsGroupStore.getDetail(
      data,
      this.callbackOnGetDetailSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleUpdate = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldsGroupStore.getDetail(
      this.fieldsGroupDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDelete = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.fieldsGroupStore.handleDelete(
      id,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDeleteMultiple = (arrId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.fieldsGroupStore.handleDeleteMultiple(
      arrId,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleSearch = (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.fieldsGroupStore.handleSearch(
      value,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handlePagination = (page) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.fieldsGroupStore.handlePagination(
      page,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  setFeatured = async (id, featured = 0) => {
    await this.fieldsGroupStore.updateFeatured(
      { id: id.toString(), featured: featured.toString() },
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.successResponse.state = true;
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

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Successfully', 'success');
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

export default FieldsGroupDetailViewModel;
