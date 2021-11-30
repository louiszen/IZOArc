import _ from "lodash";
import {makeAutoObservable, runInAction} from "mobx";
import { toJS, autorun, set } from "mobx";
import BrowserX from "./BrowserX";

class AppStore {

  browser = "";
  lang = "EN";
  user = {};
  server = {};
  alert = {};
  loading = false;
  initialized = false;
  ask = {};
  mini = true;
  config = {};
  save = {};
  backdrop = null;

  constructor(){
    makeAutoObservable(this);
    
    let firstRun = true;

    autorun(() => {
      // on load check if there"s an existing STORE on 
      // localStorage and extend the STORE
      if (firstRun) {
        let existingStore = window.localStorage.getItem("STORE");
  
        if (existingStore) {
          set(this, JSON.parse(existingStore));
        }
      }
  
      // from then on serialize and save to localStorage
      let serializedThis = toJS(this);
      window.localStorage.setItem(
        "STORE", 
        JSON.stringify(serializedThis)
      );
    });
  
    firstRun = false;

  }

  RESET(){
    runInAction(() => {
      this.browser = "";
      this.lang = "EN";
      this.user = {};
      this.server = {};
      this.alert = {};
      this.loading = false;
      this.initialized = false;
      this.ask = {};
      this.mini = true;
      this.config = {};
      this.save = {};
      this.backdrop = null;
    });
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

  setConfig(config){
    runInAction(() => {
      this.config = config;
    });
  }

  clearConfig(){
    runInAction(() => {
      this.config = {};
    });
  }

  setLang(lang){
    runInAction(() => {
      this.lang = lang;
    });
  }

  setServer(server){
    runInAction(() => {
      this.server = server;
    });
  }

  onlyUsernamePassword(){
    return  (!_.isArray(this.server.Authentication) && this.server.Authentication === "Username-Password") 
      || (_.isArray(this.server.Authentication) 
        && this.server.Authentication.length === 1 
        && this.server.Authentication[0] === "Username-Password");
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

  Backdrop(backdrop, addOns){
    runInAction(() => {
      this.backdrop = {
        render: backdrop, 
        addOns: addOns
      };
    });
  }

  clearBackdrop(){
    runInAction(() => {
      this.backdrop = null;
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

  clearPop(){
    this.clearAsk();
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

  clearSave(){
    runInAction(() => {
      this.save = {};
    });
  }

  setSave(save){
    runInAction(() => {
      this.save = save;
    });
  }

  Save(save){
    let newSave = {
      ...this.save,
      ...save
    };
    runInAction(() => {
      this.save = newSave;
    });
  }

}

const STORE = new AppStore();
export default STORE;