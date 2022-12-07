import { notify } from 'components/Toast';
import AesirxCmsCategoryApiService from 'library/Cms/CMSCategories';
import { runInAction } from 'mobx';
import history from 'routes/history';

export default class CategoriesStore {
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
  async getDetail(selectedMulptiRows, callbackOnSuccess, callbackOnError) {
    try {
      let arrDetails = new selectedMulptiRows[0]();
      if (selectedMulptiRows[0].values.id && arrDetails) {
        runInAction(() => {
          callbackOnSuccess(arrDetails);
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
        categoriesStore.formPropsData = data;
        setTimeout(() => {
          notify('Success');
          if (redirect) {
            history.push('/categories');
          }
        }, 2000);
      } else {
        categoriesStore.dataDumyCreate = {
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
  async handleDelete(data) {
    console.log('data', data);
    if (data) {
      categoriesStore.idDummyDelete = data;
      setTimeout(() => {
        notify('Success');
      }, 2000);
    }
    // runInAction(() => {
    //   itemsStore.items = data;
    // });
  }
  async clearData() {
    runInAction(() => {
      categoriesStore.formPropsData = [];
    });
  }
}
export const categoriesStore = new CategoriesStore();
