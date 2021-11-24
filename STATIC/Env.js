import STORE from './AppStore';
import axios from 'axios';

import { DOMAIN } from '__SYSDefault/Domain';
import { CheckInitAPI } from '__SYSDefault/SysAPI';

class Env {

  static async CheckInitialized(){

    let url = DOMAIN + CheckInitAPI;

    let payloadOut = {
      JWT: STORE.user.JWT
    };

    try{
      STORE.isLoading(true);
      let res = await axios.post(url, payloadOut);
      let {Success, payload} = res.data;

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
      
    }catch(e){
      console.log(e);
      STORE.Alert("Cannot connect to server", "error");
      STORE.setInitialized(false);
      STORE.isLoading(false);
    }
  }

}

export default Env;