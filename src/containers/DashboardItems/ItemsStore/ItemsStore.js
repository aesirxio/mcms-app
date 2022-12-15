import { runInAction } from 'mobx';
import history from 'routes/history';
import AesirxCmsItemstApiService from 'library/Cms/Items/CMSItems';

export default class ItemsStore {
  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const getListItemsAPIService = new AesirxCmsItemstApiService();
      const results = await getListItemsAPIService.getList(filters);
      if (results) {
        runInAction(() => {
          callbackOnSuccess(results);
        });
      } else {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      callbackOnError({
        message: 'Something went wrong from Server response',
      });
    }
  }

  getDetail(data, redirect, callbackOnSuccess, callbackOnError) {
    try {
      // call api
      // const getListInfoAPIService = new AesirxCmsCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(data.id);
      console.log('getDetail', data);
      if (data) {
        runInAction(() => {
          callbackOnSuccess(data);
        });
        setTimeout(() => {
          if (redirect) {
            history.push('/');
          }
        }, 2000);
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }

  saveData(data, redirect, callbackOnSuccess, callbackOnError) {
    if (data) {
      runInAction(() => {
        callbackOnSuccess({
          id: '261',
          name: data.name,
          type: 'Services',
          engagement: '40%',
          visits: '100',
        });
      });
      setTimeout(() => {
        if (redirect) {
          history.push('/');
        }
      }, 2000);
    } else {
      runInAction(() => {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
      console.log('Error');
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
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
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
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      }
    } catch (error) {
      callbackOnError({
        message: 'Something went wrong from Server response',
      });
    }
  }
  handleSearch(value, callbackOnSuccess, callbackOnError) {
    console.log('valueSearch', value);
    try {
      // call api
      // const getListInfoAPIService = new AesirxCmsCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(id);
      if (value) {
        runInAction(() => {
          callbackOnSuccess(value);
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong !',
          });
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }
  handlePagination(page, callbackOnSuccess, callbackOnError) {
    console.log('handlePagination', page);
    try {
      // call api
      // const getListInfoAPIService = new AesirxCmsCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(id);
      if (page) {
        runInAction(() => {
          callbackOnSuccess(page);
        });
      } else {
        runInAction(() => {
          callbackOnError({
            message: 'Something went wrong !',
          });
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }

  clearData() {
    runInAction(() => {
      // categoriesStore.formPropsData = [];
    });
  }
}
