import { makeAutoObservable } from 'mobx';
import { CMS_ITEMS_DETAIL_FIELD_KEY } from 'library/Constant/CmsConstant';
import PAGE_STATUS from 'constants/PageStatus';
import { notify } from 'components/Toast';
// import history from 'routes/history';
class ItemsDetailViewModel {
  itemsStore = null;
  formStatus = PAGE_STATUS.LOADING;
  itemsDetailViewModel = null;

  listFields = [];
  editMode = false;
  contentType = null;

  constructor(itemsStore) {
    makeAutoObservable(this);
    this.itemsStore = itemsStore;
  }

  setForm = (itemsDetailViewModel) => {
    this.itemsDetailViewModel = itemsDetailViewModel;
  };

  initializeData = () => {
    this.formStatus = PAGE_STATUS.LOADING;
    if (!this.editMode) {
      this.getFields(this.contentType);
    } else {
      this.itemsStore.getDetail(
        this.itemsDetailViewModel.formPropsData[CMS_ITEMS_DETAIL_FIELD_KEY.ID],
        this.callbackOnGetDetailSuccessHandler,
        this.callbackOnErrorHandler
      );
    }
  };

  handleCreate = (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.saveData(
      this.categoriesDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnCreateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };
  getFields = async (contentTypeId) => {
    this.itemsStore.getFields(
      contentTypeId,
      this.callbackOnGetFieldsSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  handleUpdate = (redirect) => {
    this.formStatus = PAGE_STATUS.LOADING;
    this.itemsStore.getDetail(
      this.categoriesDetailViewModel?.formPropsData,
      redirect ? redirect : null,
      this.callbackOnUpdateSuccessHandler,
      this.callbackOnErrorHandler
    );
  };

  callbackOnGetFieldsSuccessHandler = (result) => {
    if (result) {
      this.listFields = result?.item;
    } else {
      // history.push('/');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnSuccessHandler = (result) => {
    if (result) {
      notify('Successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnDeleteSuccessHandler = (id) => {
    if (id) {
      notify('Delete successfully', 'success');
    }
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

  callbackOnGetDetailSuccessHandler = async (result) => {
    if (result) {
      this.itemsDetailViewModel.formPropsData = result;
    }
    await this.getFields(this.itemsDetailViewModel.formPropsData.content_type_id);
  };

  callbackOnUpdateSuccessHandler = (result) => {
    if (result) {
      console.log('result', result);
      notify('Update successfully', 'success');
    }
    this.formStatus = PAGE_STATUS.READY;
  };

  callbackOnErrorHandler = ({ message }) => {
    notify(message, 'error');

    // history.push('/');
    this.formStatus = PAGE_STATUS.READY;
  };
}

export default ItemsDetailViewModel;
