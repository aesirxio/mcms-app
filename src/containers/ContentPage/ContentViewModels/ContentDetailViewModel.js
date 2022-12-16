import { makeAutoObservable } from 'mobx';
import { CMS_CONTENT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
import history from 'routes/history';
class ContentDetailViewModel {
  contentStore = null;
  formStatus = PAGE_STATUS.READY;
  contentDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
    data: [],
    dataDetail: [],
  };

  constructor(contentStore) {
    makeAutoObservable(this);
    this.contentStore = contentStore;
  }

  setForm = (contentDetailViewModel) => {
    this.contentDetailViewModel = contentDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contentStore.getDetail(
      this.contentDetailViewModel.formPropsData[CMS_CONTENT_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetDetailSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  handleCreate = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contentStore.handleCreate(
      this.contentDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnCreateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };
  handleUpdate = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contentStore.updateDetail(
      this.contentDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
    setTimeout(() => {
      this.formStatus = PAGE_STATUS.READY;
    }, 1500);
  };

  handleDelete = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.handleDelete(
      id,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDeleteMultiple = (arrId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.handleDeleteMultiple(
      arrId,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleSearch = (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.handleSearch(
      value,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handlePagination = (page) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.handlePagination(
      page,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  handleEdit = async (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    history.push(`/content-edit/${value?.id}`);
    setTimeout(() => {
      this.formStatus = PAGE_STATUS.READY;
    }, 1500);
  };

  callbackOnGetDetailSuccessHandler = (result) => {
    if (result) {
      console.log('result api', result);
      this.contentDetailViewModel.formPropsData = result;
      notify('GetDetail successfully', 'success');
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

  callbackOnUpdateSuccessHandler = (result) => {
    if (result) {
      console.log('result', result);
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ContentDetailViewModel;
