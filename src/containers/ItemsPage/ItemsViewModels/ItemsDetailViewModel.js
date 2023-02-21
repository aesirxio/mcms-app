import { makeAutoObservable } from 'mobx';
// import { CMS_ITEMS_DETAIL_FIELD_KEY } from 'aesirx-dma-lib';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
// import history from 'routes/history';
// import history from 'routes/history';
class ItemsDetailViewModel {
  itemsStore = null;
  formStatus = PAGE_STATUS.LOADING;
  formPropsData = {};

  constructor(itemsStore) {
    makeAutoObservable(this);
    this.itemsStore = itemsStore;
  }

  // setForm = (itemsDetailViewModel) => {
  //   this.itemsDetailViewModel = itemsDetailViewModel;
  // };

  initializeData = async (itemId) => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.getDetail(
      itemId,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  // getFields = async (contentTypeId) => {
  //   await this.itemsStore.getFields(
  //     contentTypeId,
  //     this.callbackOnGetFieldsSuccessHandler,
  //     this.callbackOnErrorHandler
  //   );
  // };

  createItem = async () => {
    this.formStatus = PAGE_STATUS.LOADING;
    await this.itemsStore.createItem(
      this.formPropsData,
      this.callbackOnSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  // handleUpdate = async (redirect) => {
  //   this.formStatus = PAGE_STATUS.LOADING;
  //   await this.itemsStore.updateItem(
  //     this.itemsDetailViewModel?.formPropsData,
  //     redirect ? redirect : false,
  //     this.callbackOnUpdateSuccessHandler,
  //     this.callbackOnErrorHandler
  //   );
  // };

  // callbackOnGetFieldsSuccessHandler = (result) => {
  //   if (result) {
  //     this.listFields = result?.item;
  //   } else {
  //     // history.push('/');
  //   }
  //   this.formStatus = PAGE_STATUS.READY;
  // };

  callbackOnSuccessHandler = (result, message) => {
    if (result) {
      this.formPropsData = result;
      if (message) {
        notify(message, 'success');
      }
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  // callbackOnCreateSuccessHandler = (result, redirect) => {
  //   if (result?.result) {
  //     notify('txt_successfuly', 'success');
  //     if (redirect) {
  //       history.push('/');
  //     } else {
  //       history.push(`/items-edit/${result.id}`);
  //     }
  //   }
  //   this.formStatus = PAGE_STATUS.READY;
  // };

  // callbackOnGetDetailSuccessHandler = (result) => {
  //   if (result) {
  //     this.itemsDetailViewModel.formPropsData = result;
  //   }
  //   this.formStatus = PAGE_STATUS.READY;
  // };

  // callbackOnUpdateSuccessHandler = async (result, redirect) => {
  //   if (result) {
  //     notify('txt_successfuly', 'success');
  //   }
  //   if (redirect) {
  //     history.push('/');
  //     this.formStatus = PAGE_STATUS.READY;
  //   } else {
  //     await this.itemsStore.getDetail(
  //       this.itemsDetailViewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.ID],
  //       this.callbackOnGetDetailSuccessHandler,
  //       this.callbackOnErrorHandler
  //     );
  //   }
  // };

  callbackOnErrorHandler = () => {
    notify('txt_unsuccess', 'error');
    // history.push('/');
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ItemsDetailViewModel;
