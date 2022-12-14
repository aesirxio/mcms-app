import { runInAction } from 'mobx';
import history from 'routes/history';
import AesirxCmsItemstApiService from 'library/Cms/Items/CMSItems';

export default class ItemsStore {
  async getList(callbackOnSuccess, callbackOnError, filters) {
    try {
      const results = true;
      if (results) {
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
  handleDelete(id, callbackOnSuccess, callbackOnError) {
    console.log('id', id);
    try {
      // call api
      // const getListInfoAPIService = new AesirxCmsCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(id);
      if (id) {
        runInAction(() => {
          callbackOnSuccess(id);
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
  handleDeleteMultiple(arrId, callbackOnSuccess, callbackOnError) {
    console.log('arrId', arrId);
    try {
      // call api
      // const getListInfoAPIService = new AesirxCmsCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(id);
      if (arrId) {
        runInAction(() => {
          callbackOnSuccess(arrId);
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
