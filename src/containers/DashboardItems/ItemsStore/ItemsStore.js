import { notify } from 'components/Toast';
import AesirxCmsCategoryApiService from 'library/Cms/Items/CMSItems';
import { runInAction } from 'mobx';
import history from 'routes/history';

export default class ItemsStore {
  async getList(callbackOnSuccess, callbackOnError) {
    try {
      const results = true;

      if (results) {
        const getListInfoAPIService = new AesirxCmsCategoryApiService();

        const respondedData = await getListInfoAPIService.getList();

        if (respondedData) {
          runInAction(() => {
            callbackOnSuccess(respondedData);
          });
        } else {
          callbackOnError({
            message: 'Something went wrong from Server response',
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        callbackOnError(error);
      });
    }
  }
  async getDetail(data, callbackOnSuccess, callbackOnError) {
    try {
      // call api
      console.log('getDetail', data);
      const getListInfoAPIService = new AesirxCmsCategoryApiService();
      const respondedData = await getListInfoAPIService.getDetail(data.id);
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
  async saveData(data, redirect) {
    console.log('redirect', data, redirect);
    if (data) {
      if (data?.id) {
        itemsStore.formPropsData = data;
        setTimeout(() => {
          notify('Success');
          if (redirect) {
            history.push('/categories');
          }
        }, 2000);
      } else {
        itemsStore.dataDumyCreate = {
          checkbox: true,
          id: '114',
          name: data.name,
          type: 'Test add',
          engagement: '100%',
          visits: '100',
          languages: data.languages,
          status: true,
          check: true,
        };

        setTimeout(() => {
          notify('Success');
          if (redirect) {
            history.push('/categories');
          }
        }, 2000);
      }
    } else {
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
  async clearData() {
    runInAction(() => {
      // itemsStore.formPropsData = [];
    });
  }
}
export const itemsStore = new ItemsStore();
