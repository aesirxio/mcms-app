import { notify } from 'components/Toast';
import Categories from 'entites/Categories';
import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';
import history from 'routes/history';

export default class CategoriesStore {
  items = [];
  page = 1;
  limit = 10;
  totalPages = 1;
  filter = {};
  filterSearch = 'search';
  formPropsData = [];
  imageData = [];
  files = [];
  sortBy = {};
  loading = false;
  totalItems = 0;
  dataDumyCreate = {};
  idDummyDelete = [];
  constructor() {
    makeAutoObservable(this);
  }

  async getItems() {
    try {
      runInAction(() => {
        this.items = [];
      });
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }
  async getDetail(selectedMulptiRows) {
    try {
      let arrDetails = new Categories(selectedMulptiRows[0]);
      if (selectedMulptiRows[0].values.id && arrDetails) {
        runInAction(() => {
          categoriesStore.formPropsData = arrDetails.values;
        });
      }
    } catch (error) {
      console.log('API - Get Content: ' + error);
      return null;
    }
  }
  async saveData(data, redirect) {
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
export const CategoriesStoreContext = createContext(categoriesStore);
