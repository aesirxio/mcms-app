// import AesirxCmsCategoryApiService from 'library/Cms/CMSCategories';
import { runInAction } from 'mobx';
import history from 'routes/history';

export default class ContentStore {
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
  async getDetail(id, callbackOnSuccess, callbackOnError) {
    try {
      // call api
      // const getListInfoAPIService = new AesirxCmsCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(data.id);
      console.log('Store getDetail', id);
      if (id) {
        runInAction(() => {
          callbackOnSuccess({
            id: id,
            name: 'Name response',
            alias: 'alias response',
            organisation: { label: 'test', value: 1 },
            description: 'description',
            allow_frontend: 'true',
            upload_new_media: 'data response',
          });
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

  async getListByFilter(filter, callbackOnSuccess, callbackOnError) {
    console.log('filter', filter);
    // call api
    // const getListInfoAPIService = new AesirxCmsCategoryApiService();
    // const respondedData = await getListInfoAPIService.getDetail(data.id);
    if (filter) {
      runInAction(() => {
        callbackOnSuccess(filter);
      });
    } else {
      runInAction(() => {
        callbackOnError({
          message: 'Something went wrong from Server response',
        });
      });
    }
  }
  catch(error) {
    console.log('API - Get Content: ' + error);
    return null;
  }

  async handlePagination(page, callbackOnSuccess, callbackOnError) {
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

  async updateDetail(data, redirect, callbackOnSuccess, callbackOnError) {
    console.log('data UpdateDetail', data);
    // call api
    // const getListInfoAPIService = new AesirxCmsCategoryApiService();
    // const respondedData = await getListInfoAPIService.getDetail(data.id);
    if (data) {
      runInAction(() => {
        callbackOnSuccess(data);
      });
      setTimeout(() => {
        if (redirect) {
          history.push('/content');
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

  async handleCreate(data, redirect, callbackOnSuccess, callbackOnError) {
    try {
      // call api
      // const getListInfoAPIService = new AesirxCmsCategoryApiService();
      // const respondedData = await getListInfoAPIService.getDetail(data.id);
      console.log('Store handleCreate', data);
      if (data) {
        runInAction(() => {
          callbackOnSuccess(data);
        });
        setTimeout(() => {
          if (redirect) {
            history.push('/content');
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

  async clearData() {
    runInAction(() => {
      // categoriesStore.formPropsData = [];
    });
  }
}
