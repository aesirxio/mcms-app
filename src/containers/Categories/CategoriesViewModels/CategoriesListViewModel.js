import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class CategoriesListViewModel {
  categoriesStore = null;
  formStatus = PAGE_STATUS.READY;
  categoriesDetailViewModel = null;
  successResponse = {
    state: true,
    content_id: '',
    data: [],
    dataDetail: [],
  };
  filters = {
    views: 'all',
    search: '',
    filterColum: '',
    'list[limitstart]': 0,
    'list[limit]': 10,
  };

  constructor(categoriesStore) {
    makeAutoObservable(this);
    this.categoriesStore = categoriesStore;
  }

  initializeData = async () => {
    await this.categoriesStore.getList(this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
  };
  handleGetListByFilter = async (tab, isFilterTab) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.formStatus = 1;
    isFilterTab ? (this.filters.views = tab ?? 'all') : null;
    await this.categoriesStore.getListByFilter(
      this.filters,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    setTimeout(() => {
      this.formStatus = PAGE_STATUS.READY;
    }, 1500);
  };

  handlePagination = (page, isSetPageSize) => {
    this.categoriesStore.handlePagination(
      isSetPageSize
        ? (this.filters['list[limit]'] = page)
        : (this.filters['list[limitstart]'] = page),
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    console.log(this.filters);
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
}

export default CategoriesListViewModel;