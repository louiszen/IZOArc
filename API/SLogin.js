import axios from 'axios';
import { Env, LocaleX, STORE } from 'IZOArc/STATIC';
import { DOMAIN } from '__SYSDefault/Domain';
import { CheckUserNameAPI, SignInAPI } from '__SYSDefault/SysAPI';

class SLogin {

  /**
   * 
   * @param {*} formProps 
   */
  static CheckUser = async (formProps) => {
    let url = DOMAIN + CheckUserNameAPI;
    let req = {
      ...formProps
    };
    try {
      let res = await axios.post(url, req);
      console.log(res);

      let {Success, payload} = res.data;
      if(Success){
        if(payload.hasUser){
          return {
            Success: true,
            payload: payload
          };
        }else{
          STORE.Alert(LocaleX.Get("__IZO.Alert.UserNotFound"), "error");
          return {
            Success: false,
          };
        }
      }
    }catch(e){
      STORE.Alert(LocaleX.Get("__IZO.Alert.CannotConnect"), "error");
      return {
        Success: false,
      };
    }
  }

  /**
   * @typedef {("Username-Password" | "MSAL")} authMethod
   * @param {authMethod} method 
   * @param {*} formProps 
   * @returns 
   */
  static SignIn = async (method, formProps) => {
    switch(method){
      default: case "Username-Password":
      return await SLogin.SignInByUP(method, formProps);
    }
  }

  static SignInByUP = async (method, formProps) => {
    
    let url = DOMAIN + SignInAPI;

    let req = {
      method: method,
      ...formProps
    };
  
    try {
      let res = await axios.post(url, req);

      let {Success, payload} = res.data;
      if(Success === true){
        console.log(payload);
        STORE.setUser(payload);
        STORE.Alert(LocaleX.Get("__IZO.Alert.SuccessLogin"), "success");
        await Env.CheckInitialized();

        if(!STORE.isInitialized()){
          return {Success: false};
        }

        return {Success: true};
        
      }else{
        STORE.Alert(LocaleX.Get("__IZO.Alert.IncorrectPassword"), "error");
        return {Success: false};
      }
    }catch(e){
      STORE.Alert(LocaleX.Get("__IZO.Alert.CannotConnect"), "error");
      return {Success: false};
    }
  }

}

export default SLogin;