import { makeAutoObservable } from 'mobx';
// import { CMS_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class CategoriesDetailViewModel {
  categoriesStore = null;
  formStatus = PAGE_STATUS.READY;
  categoriesDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
    data: [],
    dataDetail: [],
  };

  constructor(categoriesStore) {
    makeAutoObservable(this);
    this.categoriesStore = categoriesStore;
  }

  setForm = (categoriesDetailViewModel) => {
    this.categoriesDetailViewModel = categoriesDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getList(this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
  };

  createCategories = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.saveData(
      this.categoriesDetailViewModel.formPropsData,
      redirect ? redirect : null,
      this.callbackOnCreateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };
  getDetail = (data) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoriesStore.getDetail(
      data,
      this.callbackOnGetDetailSuccessHandler,
      this.callbackOnErrorHandler
    );
  };
  handleDelete = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoriesStore.handleDelete(
      id,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };
  handleSearch = (value) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoriesStore.handleSearch(
      value,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDeleteMultiple = (arrId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoriesStore.handleDeleteMultiple(
      arrId,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  updateCategories = async (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getDetail(
      this.categoriesDetailViewModel.formPropsData,
      redirect ? redirect : null,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
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

  // callbackOnGetProductSuccessHandler = (result) => {
  //   if (result) {
  //     Object.keys(CMS_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
  //       this.categoriesDetailViewModel.formPropsData[CMS_PRODUCT_DETAIL_FIELD_KEY[index]] =
  //         result[CMS_PRODUCT_DETAIL_FIELD_KEY[index]];
  //     });
  //   }
  //   this.formStatus = PAGE_STATUS.READY;
  // };

  callbackOnDeleteSuccessHandler = (id) => {
    if (id) {
      notify('Delete successfully', 'success');
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

export default CategoriesDetailViewModel;
