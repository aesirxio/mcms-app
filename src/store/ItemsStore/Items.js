import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import { createContext } from "react";
import history from "routes/history";

export default class ItemstStore {
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
  constructor() {
    makeAutoObservable(this);
  }

  async getItems(redirect = false) {
    try {
      runInAction(() => {
        this.items = ["addasdasdad"];
      });
    } catch (error) {
      console.log("API - Get Content: " + error);
      return null;
    }
  }
  async getDetail(id, selectedMulptiRows) {
    try {
      let arrDetails = await selectedMulptiRows[0];
      if (id && arrDetails) {
        runInAction(() => {
          itemsStore.formPropsData = arrDetails.values;
        });
      }
    } catch (error) {
      console.log("API - Get Content: " + error);
      return null;
    }
  }
  async editData(data, redirect) {
    if (data) {
      itemsStore.formPropsData = data;
    }
    if (redirect) {
      history.push("/");
    }
    console.log("editData itemsStore.formPropsData", itemsStore.formPropsData);
  }
  async clearData() {
    runInAction(() => {
      itemsStore.formPropsData = [];
    });
  }
}
export const itemsStore = new ItemstStore();
export const ItemsStoreContext = createContext(itemsStore);
