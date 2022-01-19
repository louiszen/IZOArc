import STORE from "./AppStore";

import { CheckInitAPI } from "IZOArc/API/SysAPI";
import ReqX from "./ReqX";

class Env {

  static async CheckInitialized(){
    let res = await ReqX.SendBE(CheckInitAPI, {}, {}, null, null, (e) => {
      STORE.Alert("Cannot connect to server", "error");
      STORE.setInitialized(false);
      STORE.isLoading(false);
    });

    let {Success, payload} = res;
    if(Success){
      if(!payload){
        STORE.Alert("The project is not initialized. \n Please follow the steps to initialize it.", "info");
        STORE.isLoading(false);
        STORE.setInitialized(false);
      }else{
        STORE.isLoading(false);
        STORE.setInitialized(true);
      }
    }else{
      STORE.setInitialized(false);
      STORE.isLoading(false);
    }
  };

}

export default Env;