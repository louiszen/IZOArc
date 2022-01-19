import React, { Component } from "react";
import PropsType from "prop-types";
import { observer } from "mobx-react";

import _ from "lodash";
import { Box, Typography } from "@mui/material";

import schema from "./schema";
import datalink from "./datalink";

import Datumizo from "IZOArc/LabIZO/Datumizo/Datumizo";
import { HStack, VStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, ColorX, Authority, STORE, LocaleX } from "IZOArc/STATIC";
import { IZOTheme } from "__SYSDefault/Theme";
import { Denied } from "IZOArc/Fallback";
import { AccountTree } from "@mui/icons-material";
import { AuthTreeNode } from "IZOArc/BLOCKS/AuthTree";
import SUAC from "IZOArc/API/SUAC";

/**
 * add ~react-datalink.js as datalink.js in the same scope
 * add ~react-schema.js as schema.js in the same scope
 * @augments {Component<Props, State>}
 */
class UserGroups extends Component {

  static propTypes = {
    addOns: PropsType.object,
    onDataChange: PropsType.func,
    data: PropsType.array,
    onMounted: PropsType.func
  }

  static defaultProps = {
    addOns: {},
    onDataChange: undefined,
    data: [],
    onMounted: undefined
  }

  constructor(){
    super();
    this.state = {
      title: (addOns) => "[" + addOns.selectedUserDoc.UserDisplayName + "] " + LocaleX.Parse({
        EN: "Resources Group",
        TC: "資源組"
      }),
      serverSidePagination: false, 
      base: {
        title: () => LocaleX.Parse({
          EN: "Resources Group",
          TC: "資源組"
        }),
        exportDoc: "user_groups",
        rowIdAccessor: "ID",
        schema: schema,
        reqAuth: "System.UAC.Users",

        noDefaultTable: false,
        noDefaultButtons: false,
        refreshButton: "right",
        usePropsData: true,

        tablizo: {
          columnsToolbar: false,
          filterToolbar: false,
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
              EN: "Add Resources Group",
              TC: "新增資源組"
            }),
            url: datalink.Request.Add,
            success:  () => LocaleX.Parse({
              EN: "Resources Group Added Successfully",
              TC: "成功新增資源組"
            }),
            fail:  () => LocaleX.Parse({
              EN: "Resources Group Add Failed: ",
              TC: "新增資源組失敗: "
            }),
            schema: schema.Add,
            buttons: ["Clear", "Submit"],
            onSubmit: "Add",
            onSuccess: this.ReloadTable
          },
          Delete: {
            title: () => LocaleX.Parse({
              EN: "Delete this Resources Group?",
              TC: "刪除資源組"
            }),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.Delete,
            success: () => LocaleX.Parse({
              EN: "Resources Group Deleted Successfully.",
              TC: "成功刪除資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Resources Group Delete Failed: ",
              TC: "刪除資源組失敗: "
            }),
            onSubmit: "Delete",
            onSuccess: this.ReloadTable
          },
          Edit: {
            title: () => LocaleX.Parse({
              EN: "Edit Resources Group",
              TC: "編輯資源組"
            }),
            url: datalink.Request.Edit,
            success: () => LocaleX.Parse({
              EN: "Resources Group Edited Successfully",
              TC: "成功編輯資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Resources Group Edit Failed: ",
              TC: "編輯資源組失敗: "
            }),
            schema: schema.Edit,
            buttons: ["Revert", "Submit"],
            onSubmit: "Edit",
            onSuccess: this.ReloadTable
          },
          Info: {
            title: () => LocaleX.Parse({
              EN: "Resources Group",
              TC: "資源組"
            }),
            url: datalink.Request.Info,
            success: () => LocaleX.Parse({
              EN: "Resources Group Load Successfully",
              TC: "成功載入資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Resources Group Load Failed: ",
              TC: "載入資源組失敗: "
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
              EN: "Resources Group Duplicated Successfully.",
              TC: "成功複製資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Resources Group Duplicate Failed: ",
              TC: "複製資源組失敗: "
            }),
            onSubmit: "Duplicate"
          },
          Import: {
            title: () => LocaleX.Parse({
              EN: "Import Resources Groups",
              TC: "導入資源組"
            }),
            content: "",
            url: datalink.Request.Import,
            success: () => LocaleX.Parse({
              EN: "Resources Groups Imported Successfully.",
              TC: "成功導入資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Resources Groups Import Failed: ",
              TC: "導入資源組失敗: "
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
              EN: "Delete these @n Resources Group?",
              TC: "刪除這@n個資源組?"
            }, {n:n}),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.DeleteBulk,
            success: () => LocaleX.Parse({
              EN: "Resources Group Deleted Successfully.",
              TC: "成功刪除資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Resources Group Delete Failed: ",
              TC: "刪除資源組失敗: "
            }),
            onSubmit: "DeleteBulk",
          },
        },

        buttons: {
          inline: [
            // { icon: "edit", func: "Edit", 
            //   caption: () => LocaleX.Parse({
            //     EN: "Edit",
            //     TC: "編輯"
            //   }), 
            //   reqFunc: "Edit" },
            { icon: <AccountTree/> , func: this.EditUserGroupAT,  
              caption: () => LocaleX.Parse({
                EN: "Edit Authority Tree",
                TC: "編輯權限樹"
              }), 
              reqFunc: "Edit" },
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
              EN: "Add Resources Group",
              TC: "新增資源組"
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(UserGroups.defaultProps))){
      this._setAllStates();
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
    }), 
    () => {
      if (this.props.onMounted) {
        this.props.onMounted({
          Reload: this.UserUpdate,
        });
      }
      if (callback) callback();
    });
  }

  ReloadTable = (payload, success) => {
    let {addOns} = this.props;
    addOns.Refresh();
    this.Refresh();
    success();
  }

  UserUpdate = () => {
    this.MountDatumizo.Reload();
  }

  onMountDatumizo = (callbacks) => {
    this.MountDatumizo = callbacks;
  }

  Refresh = async () => {
    let {selectedUserGroup} = this.state;
    let {addOns} = this.props;
    if(addOns.onUpdate) await addOns.onUpdate();

    if(selectedUserGroup){
      let doc = this.MountDatumizo.GetDoc(selectedUserGroup);
      this.EditUserGroupAT(selectedUserGroup, doc);
    }
  }

  ToggleCtrl = async (_, field, ctrl) => {
    let {onUpdate, addOns} = this.props;
    let {selectedUserDoc} = addOns;
    let {selectedUserGroup} = this.state;
    let res = await SUAC.SetUserGroupTreeNodeActive(selectedUserDoc, selectedUserGroup, field, ctrl);
    if(res.Success){
      await onUpdate();
    }
  }

  EditUserGroupAT = (id, doc) => {
    let {addOns} = this.props;
    let {projDoc, grouplist, rolelist, selectedUserDoc} = addOns;
    let groupDoc = grouplist.find(o => o._id === doc.ID);
    if(!groupDoc) return;
    let groupuser = groupDoc.users.find(o => o.username === selectedUserDoc._id);
    if(!groupuser) return;
    let roleDoc = rolelist.find(o => o._id === groupuser.role);
    if(!roleDoc) return;

    let overrideCtrl = {
      ...projDoc.SYSAuthCtrl.AuthTree,
      ...roleDoc.override,
      ...doc.override
    };

    let overrideCtrlRef = {
      ...projDoc.SYSAuthCtrl.AuthTree,
      ...roleDoc.override
    };

    this.setState({
      selectedUserGroup: id,
      selectedUserGroupDoc: doc,
      selectedUserGroupAT: overrideCtrl,
      selectedUserGroupATRef: overrideCtrlRef
    }, () => {
      this.MountDatumizo.SetSelectedRows([id]);
    });
  }

  onUserGroupTreeCtrlSet = async (_, user, group, field, ctrl) => {
    let {addOns} = this.props;
    let res = await SUAC.SetUserGroupTreeNodeActive(user, group, field, ctrl);
    if(res.Success && addOns.Refresh){
      addOns.Refresh();
    }
  }

  renderUserGroupTree(){
    //non-Edit yet
    let {addOns} = this.props;
    let {projDoc, grouplist, selectedUserDoc} = addOns;
    let {selectedUserGroup, selectedUserGroupDoc, selectedUserGroupAT, selectedUserGroupATRef} = this.state;
    if(!selectedUserGroupDoc || !selectedUserGroupAT) return <VStack width="60%"/>;
    let groupDoc = _.find(grouplist, o => o._id === selectedUserGroup);
    if(!groupDoc) return;
    return (
      <VStack width="60%" alignItems="flex-start" paddingY={1}>
        <Typography style={{
          textAlign: "left", 
          width: "100%",
          fontSize: 25,
          color: ColorX.GetColorCSS(IZOTheme.foreground)
          }}>
          {"[" + LocaleX.Parse(groupDoc.name) + "] " + LocaleX.Parse({
            EN: "Authority Tree",
            TC: "權限樹"
          })}
        </Typography>
        <Box width={700}>
          <AuthTreeNode
            projID={projDoc._id}
            tree={projDoc.SYSAuth.AuthTree}
            ctrl={selectedUserGroupAT}
            refCtrl={selectedUserGroupATRef}
            onCtrlSet={(projID, field, ctrl) => {
              this.onUserGroupTreeCtrlSet(projID, selectedUserDoc._id, selectedUserGroup, field, ctrl);
            }}
            />
        </Box>
      </VStack>
    );
  }

  render(){
    let {addOns, data} = this.props;
    let {base, serverSidePagination, title} = this.state;
    if(!Authority.IsAccessibleQ("System.UAC.Users")) return <Denied/>;
    
    let {projDoc, Refresh} = addOns;

    let pageTitle = title;
    if(_.isFunction(title)){
      pageTitle = title(addOns);
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
            width={"40%"}
            height={"100%"}
            lang={STORE.lang}
            base={base}
            addOns={{...addOns, projID: projDoc._id, projDoc: projDoc, Refresh: Refresh, onCtrlSet: this.ToggleCtrl}} 
            serverSidePagination={serverSidePagination} 
            onMounted={this.onMountDatumizo} 
            onDataChange={this.Refresh}
            data={data}
            />
          {this.renderUserGroupTree()}
        </HStack>
      </VStack>
    );
  }

}

export default observer(UserGroups);
