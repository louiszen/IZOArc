import axios from "axios";
import { DOMAIN } from "__SYSDefault/Domain";
import { LocaleX, STORE } from ".";

class ReqX {

  static Alert = {
    Success: () => {
      STORE.Alert(LocaleX.Parse({
        EN: "Success",
        TC: "成功"
      }), "success");
    },
    Fail: () => {
      STORE.Alert(LocaleX.Parse({
        EN: "Fail",
        TC: "失敗"
      }), "error");
    },
    CannotConnect: () => {
      STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
    }
  }

  /**
   * Standard Request Sending Box
   * @param {String} path 
   * @param {*} data 
   * @param {Function} success 
   * @param {Function} fail 
   * @param {Function} error 
   * @param {*} addOns 
   * @returns {{
   *  Success: Boolean,
   *  payload: *
   * }}
   */
  static SendBE = async (path, data = {}, addOns = {}, 
    success = this.Alert.Success, 
    fail = this.Alert.Fail, 
    error = this.Alert.CannotConnect, loading = true, noJWT = false) => {

    let url = DOMAIN + path;
    let payloadOut = {
      JWT: noJWT? undefined : STORE.user.JWT,
      data: data,
      addOns: addOns
    };

    try {
      console.log(path, payloadOut);
      if(loading) STORE.isLoading(true);
      let res = await axios.post(url, payloadOut);
      if(loading) STORE.isLoading(false);
      console.log(path, res.data);

      let {Success, payload} = res.data;
      if (Success === true) {
        if(success) success(payload);
        return {
          Success: true,
          payload: payload
        };
      } else {
        if(fail) fail(payload);
        return {
          Success: false, 
          payload: payload
        };
      }
    }catch(e){
      if(loading) STORE.isLoading(false);
      if(error) error(e);
      return {Success: false};
    }
  }

}

export default ReqX;