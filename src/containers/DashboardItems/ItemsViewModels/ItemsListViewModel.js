import { makeAutoObservable } from 'mobx';
// import { CMS_CATE_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
class ItemsListViewModel {
  itemsStore = null;
  formStatus = PAGE_STATUS.LOADING;

  tableData = [];

  filters = {
    views: 'all',
    'list[limitstart]': 0,
    'list[limit]': 10,
  };

  constructor(itemsStore) {
    makeAutoObservable(this);
    this.itemsStore = itemsStore;
  }

  initializeData = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.getListItems();
  };

  resetFilter = () => {
    this.filters = {
      views: 'all',
      'list[limitstart]': 0,
      'list[limit]': 10,
    };
  };

  resetObservable = () => {
    this.resetFilter();
    this.tableData = [];
    this.formStatus = PAGE_STATUS.LOADING;
  };

  getListItems = async () => {
    await this.itemsStore.getList(
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler,
      this.filters
    );
  };

  getListByFilter = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    setTimeout(() => {
      this.tableData = this.tableData.filter((items) => items.status == this.filters.views);
      // await getListItems();
      this.formStatus = PAGE_STATUS.READY;
    }, 2000);
  };

  handleDelete = async (data) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.deleteItems(
      data,
      this.callbackOnSuccessDeleteHandler,
      this.callbackOnErrorHandler
    );
  };

  handlePagination = (page) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.handlePagination(
      page,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
    this.formStatus = PAGE_STATUS.READY;
  };

  toggleFeatured = async (id, isFeatured) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.toggleFeatured(
      id,
      isFeatured,
      this.callbackOnSuccessToggleFeatured,
      this.callbackOnErrorHandler
    );
  };

  callbackOnSuccessToggleFeatured = async () => {
    await this.getListItems();
    notify('Set featured successfully !');
  };

  callbackOnSuccessDeleteHandler = async () => {
    this.resetFilter();
    await this.getListItems();
    notify('Delete successfully !');
  };

  callbackOnErrorHandler = ({ message }) => {
    notify(message, 'error');
    setTimeout(() => {
      this.formStatus = PAGE_STATUS.READY;
    }, 1000);
  };

  callbackOnSuccessHandler = (result) => {
    if (result?.items) {
      this.tableData = result.items;
      setTimeout(() => {
        this.formStatus = PAGE_STATUS.READY;
      }, 1500);
    }
  };
}

export default ItemsListViewModel;
