import React, { Component } from "react";
import PropsType from "prop-types";
import { observer } from "mobx-react";

import _ from "lodash";
import crypto from "crypto";
import { Box, Typography } from "@mui/material";
import { ManageAccountsRounded, AccountTreeRounded } from "@mui/icons-material";

import schema from "./schema";
import datalink from "./datalink";

import { IZOTheme } from "__SYSDefault/Theme";

import Datumizo from "IZOArc/LabIZO/Datumizo/Datumizo";
import { VStack, HStack, Spacer } from "IZOArc/LabIZO/Stackizo";
import { Accessor, ColorX, AuthX, STORE, LocaleX } from "IZOArc/STATIC";
import { Denied } from "IZOArc/Fallback";
import { AuthTreeNode } from "IZOArc/BLOCKS/AuthTree";
import SUAC from "IZOArc/API/SUAC";

import UserGroups from "./_parts/UserGroups";

/**
 * add ~react-datalink.js as datalink.js in the same scope
 * add ~react-schema.js as schema.js in the same scope
 * @augments {Component<Props, State>}
 */
class UserAccess extends Component {

  static propTypes = {
    addOns: PropsType.object,
    onDataChange: PropsType.func,
    projDoc: PropsType.object,
    onUpdate: PropsType.func,
    userlist: PropsType.array,
    grouplist: PropsType.array,
    rolelist: PropsType.array
  }

  static defaultProps = {
    addOns: {},
    onDataChange: undefined,
    projDoc: {},
    onUpdate: () => {},
    userlist: [],
    grouplist: [],
    rolelist: []
  }

  constructor(){
    super();
    this.state = {
      title: () => LocaleX.Parse({
        EN: "Project Users",
        TC: "使用者"
      }),
      serverSidePagination: false, 
      base: {
        title: () => LocaleX.Parse({
          EN: "Users",
          TC: "使用者"
        }),
        exportDoc: "users",
        schema: schema,
        reqAuth: "System.UAC.Users",

        noDefaultTable: false,
        noDefaultButtons: false,
        refreshButton: "right",

        tablizo: {
          columnsToolbar: false,
          filterToolbar: true,
          densityToolbar: false,
          exportToolbar: false,
          density: "compact", //compact, standard, comfortable
          defaultPageSize: 100,
          showSelector: false,
        },

        formizo: {
          width: 700
        },

        Connect: {
          DBInfo: datalink.Request.DBInfo,
          List: datalink.Request.List,
          schema: schema.Table
        },

        operations: {
          Add: {
            title: () => LocaleX.Parse({
              EN: "Add Project User",
              TC: "新增使用者"
            }),
            url: datalink.Request.Add,
            success:  () => LocaleX.Parse({
              EN: "Project User Added Successfully",
              TC: "成功新增使用者"
            }),
            fail:  () => LocaleX.Parse({
              EN: "Project User Add Failed: ",
              TC: "新增使用者失敗: "
            }),
            schema: schema.Add,
            buttons: ["Clear", "Submit"],
            onSubmit: "Add",
            propsMod: this.addPropsMod,
            onSuccess: (payload, success) => {
              this.Refresh();
              success();
            }
          },
          Delete: {
            title: () => LocaleX.Parse({
              EN: "Delete this Project User?",
              TC: "刪除使用者"
            }),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.Delete,
            success: () => LocaleX.Parse({
              EN: "Project User Deleted Successfully.",
              TC: "成功刪除使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Project User Delete Failed: ",
              TC: "刪除使用者失敗: "
            }),
            onSubmit: "Delete",
            onSuccess: (payload, success) => {
              this.Refresh();
              success();
            }
          },
          Edit: {
            title: () => LocaleX.Parse({
              EN: "Edit Project User",
              TC: "編輯使用者"
            }),
            url: datalink.Request.Edit,
            success: () => LocaleX.Parse({
              EN: "Project User Edited Successfully",
              TC: "成功編輯使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Project User Edit Failed: ",
              TC: "編輯使用者失敗: "
            }),
            schema: schema.Edit,
            buttons: ["Revert", "Submit"],
            onSubmit: "Edit",
            onSuccess: (payload, success) => {
              this.Refresh();
              success();
            }
          },
          Info: {
            title: () => LocaleX.Parse({
              EN: "Project User",
              TC: "使用者"
            }),
            url: datalink.Request.Info,
            success: () => LocaleX.Parse({
              EN: "Project User Load Successfully",
              TC: "成功載入使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Project User Load Failed: ",
              TC: "載入使用者失敗: "
            }),
            schema: schema.Info,
            readOnly: true
          },
          Duplicate: { //direct duplicate, for to Add, plz use func: "DuplicateAdd"
            title: () => LocaleX.Parse({
              EN: "Duplicate",
              TC: "複製"
            }),
            url: datalink.Request.Duplicate,
            success: () => LocaleX.Parse({
              EN: "Project User Duplicated Successfully.",
              TC: "成功複製使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Project User Duplicate Failed: ",
              TC: "複製使用者失敗: "
            }),
            onSubmit: "Duplicate"
          },
          Import: {
            title: () => LocaleX.Parse({
              EN: "Import Project Users",
              TC: "導入使用者"
            }),
            content: "",
            url: datalink.Request.Import,
            success: () => LocaleX.Parse({
              EN: "Project Users Imported Successfully.",
              TC: "成功導入使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Project Users Import Failed: ",
              TC: "導入使用者失敗: "
            }),
            schema: schema.ImportFormat,
            replace: false
          },
          Export: {
            url: datalink.Request.Export,
            schema: schema.Export,
          },
          DeleteBulk: {
            title: (n) => LocaleX.Parse({
              EN: "Delete these @n Project Users?",
              TC: "刪除這@n個使用者?"
            }, {n:n}),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.DeleteBulk,
            success: () => LocaleX.Parse({
              EN: "Project Users Deleted Successfully.",
              TC: "成功刪除使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Project Users Delete Failed: ",
              TC: "刪除使用者失敗: "
            }),
            onSubmit: "DeleteBulk",
          },
        },

        buttons: {
          inline: [
            { icon: "edit", func: "Edit", 
              caption: () => LocaleX.Parse({
                EN: "Edit",
                TC: "編輯"
              }), 
              reqFunc: "Edit" },
            { icon: <AccountTreeRounded/> , func: this.EditUserAT,  
              caption: () => LocaleX.Parse({
                EN: "Authority Tree",
                TC: "權限樹"
              }), 
              reqFunc: "TreeView" },
            { icon: <ManageAccountsRounded/> , func: this.EditUserD,  
              caption: () => LocaleX.Parse({
                EN: "Edit User Group Authority",
                TC: "編輯使用者項目群組權限"
              }), 
              reqFunc: "GroupView" },
            // { icon: "info", func: "Info", 
            //   caption: () => LocaleX.Parse({
            //     EN: "Details",
            //     TC: "詳細資料"
            //   })},
            { icon: "delete", func: "Delete", 
              caption: () => LocaleX.Parse({
                EN: "Delete",
                TC: "刪除"
              }), reqFunc: "Delete" },
            //{ icon: "duplicate", func: "Duplicate", 
            //  caption: () => LocaleX.Parse({
            //    EN: "Duplicate",
            //    TC: "複製"
            //  }), reqFunc: "Duplicate" },
            //{ icon: "duplicate", func: "DuplicateAdd", 
            //  caption: () => LocaleX.Parse({
            //  EN: "Duplicate",
            //  TC: "複製"
            //}), reqFunc: "Duplicate" },
          ],
          left: [
            { icon: "add", func: "Add", 
            caption: () => LocaleX.Parse({
              EN: "Add Project User",
              TC: "新增使用者"
            }), reqFunc: "Add" }
          ],
          right: [
            // { icon: "deletebulk", func: "DeleteBulk", 
            //   caption: (n) => LocaleX.Parse({
            //     EN: "Delete(@n)",
            //     TC: "刪除(@n)"
            //   }, {n:n}), reqFunc: "Delete", theme: "caution" },
            //{ icon: "export", func: "Export", 
            //  caption: (n) => LocaleX.Parse({
            //  EN: "Export(@n)",
            //  TC: "導出(@n)"
            //}, {n: n === 0? LocaleX.GetIZO("Datumizo.All") : n}), reqFunc: "Export" },
            //{ icon: "import", func: "Import", 
            //  caption: () => LocaleX.Parse({
            //  EN: "Import",
            //  TC: "導入"
            // }), reqFunc: "Import" },
          ],
        },
      }
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(UserAccess.defaultProps))){
      this._setAllStates(() => {
        if(this.MountDatumizo){
          this.MountDatumizo.Reload();
        }
        this.ClearSelected();
      });
    }
  }

  componentWillUnmount(){
    this.setState = (state, callback) => {
      return;
    };
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  onMountDatumizo = (callbacks) => {
    this.MountDatumizo = callbacks;
  }

  onMountUserGroup = (callbacks) => {
    this.MountUserGroup = callbacks;
  }

  ClearSelected = () => {
    this.setState({
      selectedUser: null,
      selectedUserDoc: null,
      selectedMode: "",
      selectedUserGroupData: null
    }, () => {
      if(this.MountDatumizo){
        this.MountDatumizo.SetSelectedRows([]);
      }
    });
  }

  Refresh = async () => {
    let {selectedUser} = this.state;
    let {onUpdate} = this.props;
    if(onUpdate) await onUpdate();

    if(selectedUser){
      this.MountDatumizo.Reload(() => {
        let doc = this.MountDatumizo.GetDoc(selectedUser);
        this.EditUserD(selectedUser, doc);
      });
    }
  }

  RefreshAT = async () => {
    let {selectedUser} = this.state;
    let {onUpdate} = this.props;
    if(onUpdate) await onUpdate();

    if(selectedUser){
      this.MountDatumizo.Reload(() => {
        let doc = this.MountDatumizo.GetDoc(selectedUser);
        this.EditUserAT(selectedUser, doc);
      });
    }
  }

  addPropsMod = async (formProps) => {
    let hash = crypto.createHash("sha256");
    formProps = {
      ...formProps,
      password: hash.update(formProps.password).digest("hex")
    };
    return formProps;
  }

  ToggleCtrl = async (_, user, ctrl) => {
    if(!AuthX.PassF("System.UAC.Users", "Terminate")){
      STORE.Alert(LocaleX.GetIZO("Alert.NoAuthority"), "error");
      return;
    }
    let {onUpdate} = this.props;
    let res = await SUAC.SetProjectUserActive(user, ctrl);
    if(res.Success){
      await onUpdate();
    }
  }

  ResetPassword = {
    onClick: async (projID, user, onQuit) => {
      STORE.Ask(LocaleX.Parse({
        EN: "Reset Password",
        TC: "重設密碼"
      }), LocaleX.Parse({
        EN: "Reset password for " + user + " ?",
        TC: "為" + user + "重設密碼"
      }), () => this.ResetPassword.onConfirm(projID, user));
    },
    onConfirm: async (_, user) => {
      let res = await SUAC.SetProjectUserPassword(user);
      if(res.Success){
        STORE.Alert(LocaleX.Parse({
          EN: "Password Reset Link has been sent.",
          TC: "密碼已被重設"
        }), "success");
      }else{
        STORE.Alert(LocaleX.Parse({
          EN: "Password Reset Fails.",
          TC: "密碼重設失敗"
        }), "warn");
      }
    }
  }

  EditUserD = (id, doc) => {
    let dataMod = _.map(doc.Groups, (o, i) => {
      return {
        ...o,
        _id: o.ID
      };
    });
    this.setState({
      selectedUser: id,
      selectedUserDoc: doc,
      selectedMode: "group",
      selectedUserGroupData: dataMod
    }, () => {
      if(this.MountDatumizo) this.MountDatumizo.SetSelectedRows([id]);
      if(this.MountUserGroup) this.MountUserGroup.Reload();
    });
  }

  EditUserAT = (id, doc) => {
    this.setState({
      selectedUser: id,
      selectedUserDoc: doc,
      selectedMode: "authtree"
    }, () => {
      if(this.MountDatumizo){
        this.MountDatumizo.SetSelectedRows([id]);
      }
    });
  }

  renderUserDetail(){
    let {selectedUserDoc, selectedMode} = this.state;
    
    if(!selectedUserDoc) return <VStack width="67%"/>;
  
    if(selectedMode === "group"){
      return this.renderUserGroup();
    }else if(selectedMode === "authtree"){
      return this.renderUserAT();
    }
  }

  onUserTreeCtrlSet = async (_, user, field, ctrl) => {
    if(!AuthX.PassF("System.UAC.Users", "TreeEdit")){
      STORE.Alert(LocaleX.GetIZO("Alert.NoAuthority"), "error");
      return;
    }
    let res = await SUAC.SetUserTreeNodeActive(user, field, ctrl);
    if(res.Success){
      this.MountDatumizo.Reload(() => {
        this.RefreshAT();
      });
    }
  }

  renderUserAT(){
    if(!AuthX.PassF("System.UAC.Users", "TreeView")){
      return (
        <VStack width="100%" alignItems="flex-start">
          <Spacer/>
          <HStack>
            <Denied/>
          </HStack>
          <Spacer/>
        </VStack>
      );
    }
    let {projDoc} = this.props;
    let {selectedUser, selectedUserDoc, rolelist} = this.state;
    if(!selectedUserDoc) return <VStack width="67%"/>;
    let roleDoc = rolelist.find(o => o._id === selectedUserDoc.Role);
    if(!roleDoc) return;

    let overrideCtrl = {
      ...projDoc.SYSAuthCtrl.AuthTree,
      ...roleDoc.override,
      ...selectedUserDoc.override
    };
    return (
      <VStack width="67%" alignItems="flex-start" paddingY={1}>
        <Typography style={{
          textAlign: "left", 
          width: "33%",
          fontSize: 25,
          color: ColorX.GetColorCSS(IZOTheme.foreground)
          }}>
          {"[" + selectedUserDoc._id + "] " + LocaleX.Parse({
            EN: "Authority Tree",
            TC: "權限樹"
          })}
        </Typography>
        <Box width="67%">
          <AuthTreeNode
            projID={projDoc._id}
            tree={projDoc.SYSAuth.AuthTree}
            ctrl={overrideCtrl}
            refCtrl={projDoc.SYSAuthCtrl.AuthTree}
            onCtrlSet={(projID, field, ctrl) => {
              this.onUserTreeCtrlSet(projID, selectedUser, field, ctrl);
            }}
            />
        </Box>
      </VStack>
    );
  }

  renderUserGroup(){
    if(!AuthX.PassF("System.UAC.Users", "GroupView")){
      return (
        <VStack width="67%" alignItems="flex-start">
          <Spacer/>
          <HStack>
            <Denied/>
          </HStack>
          <Spacer/>
        </VStack>
      );
    }
    let {selectedUserDoc, selectedUserGroupData} = this.state;
    let {addOns, projDoc, grouplist, rolelist} = this.props;
    return (
      <VStack width="67%" alignItems="flex-start">
        <UserGroups
            addOns={{...addOns, projID: projDoc._id, projDoc: projDoc,
            grouplist: grouplist, rolelist: rolelist, 
            Refresh: this.Refresh, selectedUserDoc: selectedUserDoc
          }} 
          data={selectedUserGroupData}
          onMounted={this.onMountUserGroup}
          />
      </VStack>
    );
  }

  render(){
    let {addOns, projDoc, rolelist} = this.props;
    let {base, serverSidePagination, title} = this.state;
    if(!AuthX.Pass("System.UAC.Users")) return <Denied/>;
    
    let pageTitle = title;
    if(_.isFunction(title)){
      pageTitle = title();
    }

    return (
      <VStack width="100%">
        <Box padding={1} width="100%">
          <Typography style={{
            textAlign: "left", 
            width: "100%",
            fontSize: 25,
            color: ColorX.GetColorCSS(IZOTheme.foreground)
            }}>
            {pageTitle}
          </Typography>
        </Box>
        <HStack height="100%" width="100%">
          <Datumizo 
            width={"33%"}
            height={"100%"}
            lang={STORE.lang}
            base={base}
            addOns={{...addOns, projID: projDoc._id, projDoc: projDoc, 
              rolelist: rolelist, Refresh: this.Refresh, 
              onCtrlSet: this.ToggleCtrl, ResetPassword: this.ResetPassword}} 
            serverSidePagination={serverSidePagination} 
            onMounted={this.onMountDatumizo}
            />
          {this.renderUserDetail()}
        </HStack>
      </VStack>
    );
  }

}

export default observer(UserAccess);
