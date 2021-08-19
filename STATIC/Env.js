import store from './AppStore';
import axios from 'axios';

import { DOMAIN } from '__Base/config';

class Env {

  static async CheckInitialized(){

    let url = DOMAIN + "/Base/Env/IsInitialized";

    let payloadOut = {
      JWT: store.user.JWT
    };

    try{
      store.isLoading(true);
      let res = await axios.post(url, payloadOut);
      let {Success, payload} = res.data;

      if(Success){
        if(!payload){
          store.Alert("The project is not initialized. \n Please follow the steps to initialize it.", "info");
          store.isLoading(false);
          store.setInitialized(false);
        }else{
          store.isLoading(false);
          store.setInitialized(true);
        }
      }else{
        store.setInitialized(false);
        store.isLoading(false);
      }
      
    }catch(e){
      console.log(e);
      store.Alert("Cannot connect to server", "error");
      store.setInitialized(false);
      store.isLoading(false);
    }
  }

}

export default Env;