import { runInAction } from 'mobx';
import AesirxCmsItemstApiService from 'library/Cms/Items/CMSItems';

export default class ItemsStore {
  // List Page
  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const getListItemsAPIService = new AesirxCmsItemstApiService();
      const results = await getListItemsAPIService.getList(filters);
      if (results) {
        runInAction(() => {
          callbackOnSuccess(results);
        });
      } else {
        callbackOnError(results);
      }
    } catch (error) {
      callbackOnError(error);
    }
  }

  async deleteItems(data, callbackOnSuccess, callbackOnError) {
    try {
      const getListInfoAPIService = new AesirxCmsItemstApiService();
      const respondedData = await getListInfoAPIService.deleteItems(data);

      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        runInAction(() => {
          callbackOnError(respondedData);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async toggleFeatured(id, isFeatured, callbackOnSuccess, callbackOnError) {
    try {
      const getListItemsAPIService = new AesirxCmsItemstApiService();
      const results = await getListItemsAPIService.toggleFeatured(id, isFeatured);
      if (results) {
        runInAction(() => {
          callbackOnSuccess(results);
        });
      } else {
        runInAction(() => {
          callbackOnError(results);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  // Create || Edit Page
  async getFields(contentTypeId, callbackOnSuccess, callbackOnError) {
    try {
      const getFieldsAPIService = new AesirxCmsItemstApiService();
      const respondedData = await getFieldsAPIService.getFields(contentTypeId);

      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        runInAction(() => {
          callbackOnError(respondedData);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async getDetail(itemId, callbackOnSuccess, callbackOnError) {
    try {
      const getItemsDetailAPIService = new AesirxCmsItemstApiService();
      const respondedData = await getItemsDetailAPIService.getDetail(itemId);
      if (respondedData) {
        runInAction(() => {
          callbackOnSuccess(respondedData);
        });
      } else {
        runInAction(() => {
          callbackOnError(respondedData);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async createItem(data, redirect, callbackOnSuccess, callbackOnError) {
    try {
      const createItemsAPIService = new AesirxCmsItemstApiService();
      const response = await createItemsAPIService.createItem(data);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, redirect);
        });
      } else {
        runInAction(() => {
          callbackOnError(response);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }

  async updateItem(id, data, redirect, callbackOnSuccess, callbackOnError) {
    try {
      const updateItemsAPIService = new AesirxCmsItemstApiService();
      const response = await updateItemsAPIService.updateItem(id, data);

      if (response) {
        runInAction(() => {
          callbackOnSuccess(response, redirect);
        });
      } else {
        runInAction(() => {
          callbackOnError(response);
        });
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
}
