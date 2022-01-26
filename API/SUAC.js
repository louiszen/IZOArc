import { LocaleX, STORE, ReqX } from "IZOArc/STATIC";

class SUAC {

  static Alert = {
    Success: () => {
      STORE.Alert(LocaleX.Parse({
        EN: "Config Project Settings Updated.",
        TC: "項目設定已變更"
      }), "success");
    },
    Fail: (error) => {
      STORE.Alert(LocaleX.Parse({
        EN: "Cannot Config Project Settings: " + error?.message,
        TC: "更變項目設定失敗: " + error?.message
      }), "error");
    },
    Error: () => {
      STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
    }
  };

  static Send = async (path, data, addOns = {}, success = this.Alert.Success, fail = this.Alert.Fail, error = this.Alert.Error, loading = true) => {
    return await ReqX.SendBE(path, data, addOns, success, fail, error, loading);
  }

  static SendWithoutLoading = async (path, data, addOns = {}, success = this.Alert.Success, fail = this.Alert.Fail, error = this.Alert.Error, loading = true) => {
    return await ReqX.SendBE(path, data, addOns, success, fail, error, false);
  }

  static GetProject = async () => {
    return await this.Send("/GAuth/Env/GetProjectDetails", {}, {}, null, () => STORE.Alert(LocaleX.Parse({
      EN: "Cannot Get Project Details.",
      TC: "下載專案資料失敗"
    }), "error"));
  }

  static SetProjectActive = async (active) => {
    return await this.Send("/GAuth/PCtrl/Project", {
      value: active
    });
  }

  static SetProjectRoleActive = async (role, active) => {
    return await this.Send("/GAuth/PCtrl/Role", {
      role: role,
      value: active
    });
  }

  static SetProjectCompanyActive = async (company, active) => {
    return await this.Send("/GAuth/PCtrl/Company", {
      company: company,
      value: active
    });
  }

  static SetProjectGroupActive = async (group, active) => {
    return await this.Send("/GAuth/PCtrl/Group", {
      group: group,
      value: active
    });
  }

  static SetProjectAPIActive = async (api, active) => {
    return await this.Send("/GAuth/PCtrl/API", {
      api: api,
      value: active
    });
  }

  static SetTreeNodeActive = async (accessor, active) => {
    return await this.Send("/GAuth/PCtrl/TreeNode", {
      accessor: accessor,
      value: active
    });
  }

  static SetRoleTreeNodeActive = async (role, accessor, active) => {
    return await this.Send("/GAuth/PCtrl/RoleTreeNode", {
      accessor: accessor,
      value: active,
      role: role
    });
  }

  static SetProjectUserActive = async (user, active) => {
    return await this.Send("/GAuth/PCtrl/User", {
      user: user,
      value: active
    });
  }

  static SetProjectUserPassword = async (user) => {
    console.log(user);
    return {Success: false};
  }

  static SetUserGroupTreeNodeActive = async (user, group, accessor, active) => {
    return await this.Send("/GAuth/PCtrl/UserGroupTreeNode", {
      user: user,
      group: group,
      accessor: accessor,
      value: active
    });
  }

  static SetGroupUserActive = async (group, user, active) => {
    return await this.Send("/GAuth/PCtrl/GroupUser", {
      user: user,
      value: active,
      group: group
    });
  }

  static SetUserTreeNodeActive = async (user, accessor, active) => {
    return await this.Send("/GAuth/PCtrl/UserTreeNode", {
      accessor: accessor,
      value: active,
      user: user
    });
  }

}

export default SUAC;