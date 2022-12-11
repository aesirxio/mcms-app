import { runInAction } from 'mobx';
import history from 'routes/history';

export default class ItemsStore {
  async getList(callbackOnSuccess, callbackOnError) {
    try {
      const results = true;
      if (results) {
        // const getListInfoAPIService = new AesirxCmsCategoryApiService();

        // const respondedData = await getListInfoAPIService.getList();
        if (results) {
          runInAction(() => {
            callbackOnSuccess({
              id: '261',
              name: '|-|-E-commerce B2C',
              type: 'Services',
              engagement: '40%',
              visits: '100',
            });
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
  async getDetail(data, redirect, callbackOnSuccess, callbackOnError) {
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
  async saveData(data, redirect, callbackOnSuccess, callbackOnError) {
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
  async handleDelete(id, callbackOnSuccess, callbackOnError) {
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
  async handleDeleteMultiple(arrId, callbackOnSuccess, callbackOnError) {
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

  async handleSearch(value, callbackOnSuccess, callbackOnError) {
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
  async clearData() {
    runInAction(() => {
      // categoriesStore.formPropsData = [];
    });
  }
}
