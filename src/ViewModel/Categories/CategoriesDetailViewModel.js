import { makeAutoObservable } from 'mobx';
import { CMS_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class CategoriesDetailViewModel {
  categoriesStore = null;
  formStatus = PAGE_STATUS.READY;
  CategoriesDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
  };

  constructor(categoriesStore) {
    makeAutoObservable(this);
    this.categoriesStore = categoriesStore;
  }

  setForm = (CategoriesDetailViewModel) => {
    this.CategoriesDetailViewModel = CategoriesDetailViewModel;
  };

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getList(
      this.callbackOnGetProductSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  createCategories = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.categoriesStore.saveData(
      this.CategoriesDetailViewModel.formPropsData,
      true
      // this.callbackOnSuccessHandler,
      // this.callbackOnCreateSuccessHandler
    );
  };

  updateCategories = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getDetail(
      this.CategoriesDetailViewModel.formPropsData,
      this.callbackOnSuccessHandler,
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
    if (result) {
      notify('Create successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnGetProductSuccessHandler = (result) => {
    if (result) {
      Object.keys(CMS_PRODUCT_DETAIL_FIELD_KEY).forEach((index) => {
        this.CategoriesDetailViewModel.formPropsData[CMS_PRODUCT_DETAIL_FIELD_KEY[index]] =
          result[CMS_PRODUCT_DETAIL_FIELD_KEY[index]];
      });
    }

    this.formStatus = PAGE_STATUS.READY;
  };
}

export default CategoriesDetailViewModel;
