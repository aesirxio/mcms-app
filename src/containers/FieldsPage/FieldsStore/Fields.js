// import AesirxCmsCategoryApiService from 'library/Cms/CMSCategories';
import { runInAction } from 'mobx';
import history from 'routes/history';

export default class FieldsStore {
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
      console.log('getDetail', id);
      if (id) {
        runInAction(() => {
          callbackOnSuccess({
            id: id,
            name: 'Name response',
            types: 'types response',
            organisation: { label: 'test', value: 1 },
            content_type: { label: 'test', value: 1 },
            parent_category: { label: 'test', value: 1 },
            default_template: { label: 'test', value: 1 },
            related_category: { label: 'test', value: 1 },
            category_image: 'test img',
            intro_text: 'intro_text response',
            full_text: 'full_text response',
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
            history.push('/fields');
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
          history.push('/fields');
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

  async updateFeatured(id, featured, callbackOnSuccess, callbackOnError) {
    console.log('id + featured', id);
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
            message: 'Something went wrong !',
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

  async clearData() {
    runInAction(() => {
      // categoriesStore.formPropsData = [];
    });
  }
}
