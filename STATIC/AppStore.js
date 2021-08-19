import _ from 'lodash';
import {makeAutoObservable, runInAction} from 'mobx';
import { toJS, autorun, set } from 'mobx';
import BrowserX from './BrowserX';

class AppStore {

  browser = "";
  user = {};
  server = {};
  alert = {};
  loading = false;
  initialized = false;
  ask = {};
  mini = true;

  constructor(){
    makeAutoObservable(this);
    
    let firstRun = true;

    autorun(() => {
      // on load check if there's an existing store on 
      // localStorage and extend the store
      if (firstRun) {
        let existingStore = window.localStorage.getItem('store');
  
        if (existingStore) {
          set(this, JSON.parse(existingStore));
        }
      }
  
      // from then on serialize and save to localStorage
      let serializedThis = toJS(this);
      window.localStorage.setItem(
        'store', 
        JSON.stringify(serializedThis)
      );
    });
  
    firstRun = false;

  }

  setBrowser(){
    runInAction(() => {
      let browser = BrowserX.getBrowser();
      this.browser = browser;
    });
  }

  setUser(user){
    runInAction(() => {
      this.user = user;
    });
  }

  clearUser(){
    runInAction(() => {
      this.user = {};
    });
  }

  setServer(server){
    runInAction(() => {
      this.server = server;
    });
  }

  Alert(message, severity = "info"){
    runInAction(() => {
      this.alert = {
        message,
        severity
      };
    });
  }

  Ask(title, message = "", onConfirm = null, onCancel = null, autoClose = true){
    runInAction(() => {
      this.ask = {
        title, 
        message, 
        onConfirm,
        onCancel,
        buttons: ["OK", "Cancel"],
        showCloseIcon: false,
        loading: false,
        autoClose: autoClose
      };
    });
  }

  SetAskLoading(f){
    runInAction(() => {
      this.ask.loading = f;
    });
  }

  Form(title, message = "", inner = null, onConfirm = null, onCancel = null){
    runInAction(() => {
      this.ask = {
        title, 
        message, 
        onConfirm,
        onCancel,
        inner,
        buttons: [],
        showCloseIcon: true
      };
    });
  }

  Pop(title, message = "", onConfirm = null){
    runInAction(() => {
      this.ask = {
        title, 
        message, 
        onConfirm,
        buttons: ["OK"]
      };
    });
  }

  clearAlert(){
    runInAction(() => {
      this.alert = {};
    });
  }

  clearAsk(){
    runInAction(() => {
      this.ask = {};
    });
  }

  isLoggedIn(){
    return !_.isEmpty(this.user);
  }

  isLoading(f){
    runInAction(() => {
      this.loading = f;
    });
  }

  setInitialized(f){
    runInAction(() => {
      this.initialized = f;
    });
  }

  isInitialized(){
    return this.initialized;
  }

  toggleMini(){
    runInAction(() => {
      this.mini = !this.mini;
    });
  }

}

const store = new AppStore();
export default store;