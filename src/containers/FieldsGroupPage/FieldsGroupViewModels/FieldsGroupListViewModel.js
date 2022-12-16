import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class FieldsGroupListViewModel {
  fieldsGroupStore = null;
  formStatus = PAGE_STATUS.READY;
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

  constructor(fieldsGroupStore) {
    makeAutoObservable(this);
    this.fieldsGroupStore = fieldsGroupStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.fieldsGroupStore.getList(this.callbackOnSuccessHandler, this.callbackOnErrorHandler);
  };

  handleGetListByFilter = async (tab, isFilterTab) => {
    this.formStatus = PAGE_STATUS.LOADING;
    isFilterTab ? (this.filters.views = tab ?? 'all') : null;
    await this.fieldsGroupStore.getListByFilter(
      this.filters,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    setTimeout(() => {
      this.formStatus = PAGE_STATUS.READY;
    }, 1500);
  };

  handlePagination = (page, isSetPageSize) => {
    this.fieldsGroupStore.handlePagination(
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
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default FieldsGroupListViewModel;
