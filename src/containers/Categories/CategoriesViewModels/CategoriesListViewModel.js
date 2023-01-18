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
    this.formStatus = PAGE_STATUS.LOADING;
    await this.categoriesStore.getList(
      this.filters,
      this.callbackOnGetSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  handleDelete = async (id, msg) => {
    if (id?.length > 1) {
      notify(msg ?? 'Error', 'error');
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
      notify('txt_delete_success', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnErrorHandler = (error) => {
    notify('txt_unsuccess', 'error');
    this.successResponse.state = false;
    this.successResponse.content_id = error.result;
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
