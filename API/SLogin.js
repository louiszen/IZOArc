import axios from "axios";
import { Env, LocaleX, STORE } from "IZOArc/STATIC";
import { DOMAIN } from "__SYSDefault/Domain";
import { CheckUserNameAPI, RenewAuthority, SignInAPI, VerifyOTPAPI } from "__SYSDefault/SysAPI";
import crypto from "crypto";

class SLogin {

  /**
   * @typedef {("Username-Password" 
   *  | "MSAL" | "SMSOTP" | "EmailOTP"
   *  | "GitHub" | "Facebook" | "Instagram"
   *  | "Twitter" | "Google" | "LinkedIn")} authMethod
   */

  /**
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
          STORE.Alert(LocaleX.GetIZO("Alert.UserNotFound"), "error");
          return {
            Success: false,
          };
        }
      }
    }catch(e){
      STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
      return {
        Success: false,
      };
    }
  }

  /**
   * @param {authMethod} method 
   * @param {*} formProps 
   * @returns 
   */
  static SignIn = async (method, formProps) => {
    switch(method){
      default: return {Success: false, payload: "Invalid Authentication Method."};
      case "Username-Password":
      return await SLogin.SignInByUP(method, formProps);
      case "SMSOTP": case "EmailOTP":
      return await SLogin.SignInAndRequestOTP(method, formProps);
    }
  }

  static SignInAndRequestOTP = async (method, formProps) => {
    
    let url = DOMAIN + SignInAPI;

    let {username, password} = formProps;

    let hash = crypto.createHash("sha256");
    let req = {
      method: method,
      username: username,
      password: hash.update(password).digest("hex")
    };

    try {
      let res = await axios.post(url, req);

      let {Success, payload} = res.data;
      if(Success === true){
        console.log(payload);
        return {
          Success: true,
          payload: payload
        };
        
      }else{
        STORE.Alert(LocaleX.GetIZO("Alert.IncorrectPassword"), "error");
        return {Success: false};
      }
    }catch(e){
      STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
      return {Success: false};
    }

  }

  static SignInByUP = async (method, formProps) => {
    
    let url = DOMAIN + SignInAPI;

    let {username, password} = formProps;

    let hash = crypto.createHash("sha256");
    let req = {
      method: method,
      username: username,
      password: hash.update(password || "").digest("hex")
    };
  
    try {
      let res = await axios.post(url, req);

      let {Success, payload} = res.data;
      if(Success === true){
        console.log(payload);
        STORE.setUser(payload);
        STORE.Alert(LocaleX.GetIZO("Alert.SuccessLogin"), "success");
        await Env.CheckInitialized();

        if(!STORE.isInitialized()){
          return {Success: false};
        }

        return {Success: true};
        
      }else{
        STORE.Alert(LocaleX.GetIZO("Alert.IncorrectPassword"), "error");
        return {Success: false};
      }
    }catch(e){
      STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
      return {Success: false};
    }
  }

  static VerifyOTP = async (method, formProps) => {

    let url = DOMAIN + VerifyOTPAPI;

    let {username, key, otp} = formProps;

    let req = {
      method: method,
      username: username,
      key: key,
      otp: otp
    };
  
    try {
      let res = await axios.post(url, req);

      let {Success, payload} = res.data;
      if(Success === true){
        console.log(payload);
        STORE.setUser(payload);
        STORE.Alert(LocaleX.GetIZO("Alert.SuccessLogin"), "success");
        await Env.CheckInitialized();

        if(!STORE.isInitialized()){
          return {Success: false};
        }

        return {Success: true};
        
      }else{
        STORE.Alert(LocaleX.GetIZO("Alert.InvalidOTP"), "error");
        return {Success: false};
      }
    }catch(e){
      STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
      return {Success: false};
    }
  }

  static RenewAuth = async () => {
    let url = DOMAIN + RenewAuthority;
    let req = {
      JWT: STORE.user.JWT
    };
  
    try {
      let res = await axios.post(url, req);

      let {Success, payload} = res.data;
      if(Success === true){
        console.log(payload);
        STORE.setUser(payload);
        STORE.Alert(LocaleX.GetIZO("Alert.SuccessRenew"), "success");
        await Env.CheckInitialized();

        if(!STORE.isInitialized()){
          return {Success: false};
        }

        return {Success: true};
        
      }else{
        STORE.Alert(LocaleX.GetIZO("Alert.FailRenew"), "error");
        return {Success: false};
      }
    }catch(e){
      STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
      return {Success: false};
    }
  }

}

export default SLogin;