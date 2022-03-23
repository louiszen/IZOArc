import axios from "axios";
import { ReqXSettings } from "__SYSDefault/Debug";
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
   * @param {*} addOns 
   * @param {Function} success 
   * @param {Function} fail 
   * @param {Function} error 
   * @param {Boolean} loading
   * @param {Boolean} noJWT 
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
      data: data,
      addOns: addOns
    };

    let config = {};
    if(!noJWT){
      config = {
        headers: { Authorization: `Bearer ${STORE.user.JWT}` }
      };
    }

    try {
      if(ReqXSettings.OutLog.show) {
        if(ReqXSettings.OutLog.object){
          console.log("[OUT]", path, payloadOut);
        }else{
          console.log("[OUT]", path);
        }
        
      }
      if(loading) STORE.isLoading(true);
      let res = await axios.post(url, payloadOut, config);
      if(loading) STORE.isLoading(false);
      if(ReqXSettings.InLog.show) {
        if(ReqXSettings.InLog.object){
          console.log("[IN]", path, res.data);
        }else{
          console.log("[IN]", path);
        }
      }

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