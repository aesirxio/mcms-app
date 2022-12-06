import { notify } from 'components/Toast';
import FieldsGroupEntity from 'entites/FieldsGroup';
import { makeAutoObservable, runInAction } from 'mobx';
import { createContext } from 'react';
import history from 'routes/history';

export default class FieldsGroupStore {
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
      let arrDetails = new FieldsGroupEntity(selectedMulptiRows[0]);
      if (selectedMulptiRows[0].values.id && arrDetails) {
        runInAction(() => {
          fieldsGroupStore.formPropsData = arrDetails.values;
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
        fieldsGroupStore.formPropsData = data;
        setTimeout(() => {
          notify('Success');
          if (redirect) {
            history.push('/');
          }
        }, 2000);
      } else {
        fieldsGroupStore.dataDumyCreate = {
          checkbox: true,
          id: '113',
          name: data.name,
          type: 'Services',
          categories: 'News',
          author: data.author,
          engagement: '40%',
          visits: '100',
          languages: 'English (en), Vietnam...',
          status: true,
          check: true,
        };
        setTimeout(() => {
          notify('Success');
          if (redirect) {
            history.push('/');
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
      fieldsGroupStore.idDummyDelete = data;
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
      fieldsGroupStore.formPropsData = [];
    });
  }
}
export const fieldsGroupStore = new FieldsGroupStore();
export const FieldsGroupStoreContext = createContext(fieldsGroupStore);
