import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class CategoriesListViewModel {
  categoriesStore = null;
  formStatus = PAGE_STATUS.READY;
  categoriesDetailViewModel = null;
  successResponse = {
    state: false,
    content_id: '',
    data: [],
    pagination: {},
  };
  filters = {
    'list[limitstart]': 0,
    'list[limit]': 20,
    'filter[search]': '',
    views: 'all',
  };

  constructor(categoriesStore) {
    makeAutoObservable(this);
    this.categoriesStore = categoriesStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getList(
      this.filters,
      this.callbackOnGetSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  getListByFilter = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getList(
      this.filters,
      this.callbackOnGetSuccessHandler,
      this.callbackOnErrorHandler
    );

    this.formStatus = PAGE_STATUS.READY;
  };

  handlePagination = async () => {
    await this.categoriesStore.getList(
      this.filters,
      this.callbackOnGetSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDelete = async (id) => {
    if (id?.length > 1) {
      notify(
        'Cannot delete multiple items now. We will update in next version. Please check Road map for future releases.',
        'error'
      );
      return;
    }
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.handleDelete(
      id[0],
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
    await this.initializeData();
  };

  callbackOnDeleteSuccessHandler = (id) => {
    if (id) {
      notify('Delete successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnErrorHandler = (error) => {
    notify('Update unsuccessfully', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Successfully', 'success');
    }
  };

  callbackOnGetDetailSuccessHandler = (result) => {
    if (result) {
      console.log('result', result);
      this.successResponse.dataDetail = result;
      notify('GetDetail successfully', 'success');
    }
  };
  callbackOnUpdateSuccessHandler = (result) => {
    if (result) {
      console.log('result', result);
      notify('Update successfully', 'success');
    }
  };
  callbackOnGetSuccessHandler = async (result) => {
    if (result) {
      this.successResponse.data = result?.results;
      this.successResponse.pagination = result?.pagination;
      // notify('Get List Successfully', 'success');
    }
  };
}

export default CategoriesListViewModel;
