import { makeAutoObservable } from 'mobx';
// import { CMS_PRODUCT_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
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
      // await this.itemsStore.getList(
      //   this.callbackOnSuccessHandler,
      //   this.callbackOnErrorHandler,
      //   this.filters
      // );
      this.formStatus = PAGE_STATUS.READY;
    }, 2000);
  };

  deleteItems = () => {};

  callbackOnErrorHandler = () => {
    notify('Update unsuccessfully', 'error');
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result?.items) {
      this.tableData = result.items;
      this.formStatus = PAGE_STATUS.READY;
    }
  };
}

export default ItemsListViewModel;
