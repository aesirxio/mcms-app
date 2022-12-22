import { makeAutoObservable } from 'mobx';
import { CMS_FIELD_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
import history from 'routes/history';
class FieldsDetailViewModel {
  fieldsStore = null;
  formStatus = PAGE_STATUS.READY;
  fieldsDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
    data: [],
    dataDetail: [],
  };

  constructor(fieldsStore) {
    makeAutoObservable(this);
    this.fieldsStore = fieldsStore;
  }

  setForm = (fieldsDetailViewModel) => {
    this.fieldsDetailViewModel = fieldsDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldsStore.getDetail(
      this.fieldsDetailViewModel.formPropsData[CMS_FIELD_DETAIL_FIELD_KEY.ID],
      this.callbackOnGetDetailSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  handleCreate = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldsStore.handleCreate(
      this.fieldsDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnCreateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleUpdate = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldsStore.updateDetail(
      this.fieldsDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
    setTimeout(() => {
      this.formStatus = PAGE_STATUS.READY;
    }, 1500);
  };

  handleSearch = (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.fieldsStore.handleSearch(
      value,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  setFeatured = async (id, featured = 0) => {
    await this.fieldsStore.updateFeatured(
      { id: id.toString(), featured: featured.toString() },
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.fieldsStore.state = true;
  };

  handleEdit = async (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    history.push(`/fields-edit/${value?.id}`);
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnCreateSuccessHandler = (result) => {
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
      this.fieldsDetailViewModel.formPropsData = result;
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

export default FieldsDetailViewModel;
