import { makeAutoObservable } from 'mobx';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class ContentListViewModel {
  contentStore = null;
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
    'list[direction]': '',
    'list[limitstart]': 0,
    'list[limit]': 10,
  };

  constructor(contentStore) {
    makeAutoObservable(this);
    this.contentStore = contentStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contentStore.getList(this.callbackOnGetSuccessHandler, this.callbackOnErrorHandler);
  };

  getListByFilter = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.contentStore.getListByFilter(
      this.filters,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    setTimeout(() => {
      this.formStatus = PAGE_STATUS.READY;
    }, 1500);
  };

  handlePagination = () => {
    this.contentStore.handlePagination(
      this.filters,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleDelete = (id) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.contentStore.handleDelete(
      id,
      this.callbackOnDeleteSuccessHandler,
      this.callbackOnErrorHandler
    );
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
  callbackOnGetSuccessHandler = async (result) => {
    if (result) {
      this.successResponse.data = result;
      notify('Get List Successfully', 'success');
    }
  };
}

export default ContentListViewModel;
