import { notify } from 'components/Toast';
import { runInAction } from 'mobx';
import { createContext } from 'react';
import history from 'routes/history';

export default class ContentStore {
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
      let arrDetails = selectedMulptiRows[0];
      if (selectedMulptiRows[0].values.id && arrDetails) {
        runInAction(() => {
          contentStore.formPropsData = arrDetails.values;
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
        contentStore.formPropsData = data;
        setTimeout(() => {
          notify('Success');
          if (redirect) {
            history.push('/');
          }
        }, 2000);
      } else {
        contentStore.dataDumyCreate = {
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
      contentStore.idDummyDelete = data;
      setTimeout(() => {
        notify('Success');
      }, 2000);
    }
    // runInAction(() => {
    //   contentStore.items = data;
    // });
  }
  async clearData() {
    runInAction(() => {
      contentStore.formPropsData = [];
    });
  }
}
export const contentStore = new ContentStore();
export const ContentStoreContext = createContext(contentStore);
