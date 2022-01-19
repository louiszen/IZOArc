import { LocaleX, STORE, ReqX } from "IZOArc/STATIC";

class SReport {

  static Alert = {
    Success: () => {
      STORE.Alert(LocaleX.Parse({
        EN: "Report Submitted.",
        TC: "報告已上傳"
      }), "success");
    },
    Fail: (error) => {
      STORE.Alert(LocaleX.Parse({
        EN: "Report submission error: " + error?.message,
        TC: "報告上傳失敗: " + error?.message
      }), "error");
    },
    Error: () => {
      STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
    }
  }

  static Send = async (path, data, addOns = {}, success = this.Alert.Success, fail = this.Alert.Fail, error = this.Alert.Error, loading = true) => {
    return await ReqX.SendBE(path, data, addOns, success, fail, error, loading);
  }

  static SendWithoutLoading = async (path, data, addOns = {}, success = this.Alert.Success, fail = this.Alert.Fail, error = this.Alert.Error, loading = true) => {
    return await ReqX.SendBE(path, data, addOns, success, fail, error, false);
  }

  /**
   * 
   * @param {*} form 
   * @returns 
   */
  static SendBugReport = async (form) => {
    return await this.Send("/CommonAPI/Report/Bug", form);
  }

}

export default SReport;