import { CheckUserNameAPI, RenewAuthority, SignInAPI, VerifyOTPAPI } from "IZOArc/API/SysAPI";

import { Env, LocaleX, STORE, ReqX } from "IZOArc/STATIC";

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
    let res = await ReqX.SendBE(CheckUserNameAPI, {
      ...formProps
    }, {}, null, null, undefined, true, true);
    let {Success, payload} = res;
    if(Success && payload.hasUser){
      return res;
    }else{
      STORE.Alert(LocaleX.GetIZO("Alert.UserNotFound"), "error");
      return {
        Success: false
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

  /**
   * 
   * @param {authMethod} method 
   * @param {{
   *  username: String,
   *  password: String
   * }} formProps 
   * @returns 
   */
  static SignInAndRequestOTP = async (method, formProps) => {
    let {username, password} = formProps;

    let req = {
      method: method,
      username: username,
      password: password
    };

    return await ReqX.SendBE(SignInAPI, req, {}, null, 
    () => {
      STORE.Alert(LocaleX.GetIZO("Alert.IncorrectPassword"), "error");
    }, undefined, true, true);
    
  }

  /**
   * 
   * @param {authMethod} method 
   * @param {{
   *  username: String,
   *  password: String
   * }} formProps 
   * @returns 
   */
  static SignInByUP = async (method, formProps) => {
    let {username, password} = formProps;

    let req = {
      method: method,
      username: username,
      password: password
    };

    let res = await ReqX.SendBE(SignInAPI, req, {}, null, 
      () => {
        STORE.Alert(LocaleX.GetIZO("Alert.IncorrectPassword"), "error");
      }, undefined, true, true);

    let {Success, payload} = res;
    if(Success){
      STORE.setUser(payload);
      STORE.Alert(LocaleX.GetIZO("Alert.SuccessLogin"), "success");
      await Env.CheckInitialized();

      if(!STORE.isInitialized()){
        return {Success: false};
      }
      return {Success: true};
    }else{
      return {Success: false};
    }
    
  }

  /**
   * 
   * @param {authMethod} method 
   * @param {{
   *  username: String,
   *  key: String,
   *  otp: String
   * }} formProps 
   * @returns 
   */
  static VerifyOTP = async (method, formProps) => {
    let {username, key, otp} = formProps;
    let req = {
      method: method,
      username: username,
      key: key,
      otp: otp
    };

    let res = await ReqX.SendBE(VerifyOTPAPI, req, {}, null, 
      () => {
        STORE.Alert(LocaleX.GetIZO("Alert.InvalidOTP"), "error");
      }, undefined, true, true);

    let {Success, payload} = res;
    if(Success){
      STORE.setUser(payload);
      STORE.Alert(LocaleX.GetIZO("Alert.SuccessLogin"), "success");
      await Env.CheckInitialized();

      if(!STORE.isInitialized()){
        return {Success: false};
      }
      return {Success: true};
    }else{
      return {Success: false};
    }
  }

  /**
   * Renew authority data
   * @returns 
   */
  static RenewAuth = async () => {
    let res = await ReqX.SendBE(RenewAuthority, {}, {}, null, 
      () => {
        STORE.Alert(LocaleX.GetIZO("Alert.FailRenew"), "error");
      });

    let {Success, payload} = res;
    if(Success){
      STORE.setUser(payload);
      STORE.Alert(LocaleX.GetIZO("Alert.SuccessRenew"), "success");
      await Env.CheckInitialized();

      if(!STORE.isInitialized()){
        return {Success: false};
      }
      return {Success: true};
    }
  }

}

export default SLogin;