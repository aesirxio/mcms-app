import { notify } from "components/Toast";
import ItemsEntity from "entites/items";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import history from "routes/history";

export default class CategoriesStore {
  items = [];
  page = 1;
  limit = 10;
  totalPages = 1;
  filter = {};
  filterSearch = "search";
  formPropsData = [];
  imageData = [];
  files = [];
  sortBy = {};
  loading = false;
  totalItems = 0;
  dataDumyCreate = {};
  constructor() {
    makeAutoObservable(this);
  }

  async getItems(redirect = false) {
    try {
      runInAction(() => {
        this.items = [];
      });
    } catch (error) {
      console.log("API - Get Content: " + error);
      return null;
    }
  }
  async getDetail(selectedMulptiRows) {
    try {
      let arrDetails = new ItemsEntity(selectedMulptiRows[0]);
      if (selectedMulptiRows[0].values.id && arrDetails) {
        runInAction(() => {
          categoriesStore.formPropsData = arrDetails.values;
        });
      }
    } catch (error) {
      console.log("API - Get Content: " + error);
      return null;
    }
  }
  async saveData(data, redirect) {
    if (data) {
      if (data?.id) {
        categoriesStore.formPropsData = data;
        setTimeout(() => {
          notify("Success");
          if (redirect) {
            history.push("/categories");
          }
        }, 2000);
      } else {
        categoriesStore.dataDumyCreate = {
          checkbox: true,
          id: "113",
          name: data.name,
          type: "Services",
          categories: "News",
          author: data.author,
          engagement: "40%",
          visits: "100",
          languages: "English (en), Vietnam...",
          status: true,
          check: true,
        };
        setTimeout(() => {
          notify("Success");
          if (redirect) {
            history.push("/categories");
          }
        }, 2000);
      }
    } else {
      console.log("Error");
    }
  }
  async clearData() {
    runInAction(() => {
      categoriesStore.formPropsData = [];
    });
  }
}
export const categoriesStore = new CategoriesStore();
export const CategoriesStoreContext = createContext(categoriesStore);
