import React, { Component } from "react";
import PropsType from "prop-types";
import { observer } from "mobx-react";

import _ from "lodash";
import { Box, Typography } from "@mui/material";
import { AccountTree } from "@mui/icons-material";

import schema from "./schema";
import datalink from "./datalink";

import Datumizo from "IZOArc/LabIZO/Datumizo/Datumizo";
import { VStack, HStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, ColorX, Authority, STORE, LocaleX } from "IZOArc/STATIC";
import { IZOTheme } from "__SYSDefault/Theme";
import { Denied } from "IZOArc/Fallback";
import { AuthTreeNode } from "IZOArc/BLOCKS/AuthTree";
import SUAC from "IZOArc/API/SUAC";

/**
 * add ~react-datalink.js as datalink.js in the same scope
 * add ~react-schema.js as schema.js in the same scope
 * @augments {Component<Props, State>}
 */
class RoleConfig extends Component {

  static propTypes = {
    addOns: PropsType.object,
    onDataChange: PropsType.func,
    projDoc: PropsType.object,
    onUpdate: PropsType.func
  }

  static defaultProps = {
    addOns: {},
    onDataChange: undefined,
    projDoc: {},
    onUpdate: () => {}
  }

  constructor(){
    super();
    this.state = {
      selectedRole: null,
      selectedRoleDoc: null,
      title: () => LocaleX.Parse({
        EN: "Roles",
        TC: "身份"
      }),
      serverSidePagination: false, 
      base: {
        title: () => LocaleX.Parse({
          EN: "Roles",
          TC: "身份"
        }),
        exportDoc: "roles",
        schema: schema,
        reqAuth: "ProjConfig.Role",

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
              EN: "Add Roles",
              TC: "新增身份"
            }),
            url: datalink.Request.Add,
            success:  () => LocaleX.Parse({
              EN: "Roles Added Successfully",
              TC: "成功新增身份"
            }),
            fail:  () => LocaleX.Parse({
              EN: "Roles Add Failed: ",
              TC: "新增身份失敗: "
            }),
            schema: schema.Add,
            buttons: ["Clear", "Submit"],
            onSubmit: "Add",
            onSuccess: (payload, success) => {
              this.Refresh();
              success();
            },
            addOnsMod: (addOns) => {
              delete addOns.projDoc;
              return addOns;
            }
          },
          Delete: {
            title: () => LocaleX.Parse({
              EN: "Delete this Roles?",
              TC: "刪除身份"
            }),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.Delete,
            success: () => LocaleX.Parse({
              EN: "Roles Deleted Successfully.",
              TC: "成功刪除身份"
            }),
            fail: () => LocaleX.Parse({
              EN: "Roles Delete Failed: ",
              TC: "刪除身份失敗: "
            }),
            onSubmit: "Delete",
            onSuccess: (payload, success) => {
              this.Refresh();
              success();
            },
            addOnsMod: (addOns) => {
              delete addOns.projDoc;
              return addOns;
            }
          },
          Edit: {
            title: () => LocaleX.Parse({
              EN: "Edit Roles",
              TC: "編輯身份"
            }),
            url: datalink.Request.Edit,
            success: () => LocaleX.Parse({
              EN: "Roles Edited Successfully",
              TC: "成功編輯身份"
            }),
            fail: () => LocaleX.Parse({
              EN: "Roles Edit Failed: ",
              TC: "編輯身份失敗: "
            }),
            schema: schema.Edit,
            buttons: ["Revert", "Submit"],
            onSubmit: "Edit",
            onSuccess: (payload, success) => {
              this.Refresh();
              success();
            },
            addOnsMod: (addOns) => {
              delete addOns.projDoc;
              return addOns;
            }
          },
          Info: {
            title: () => LocaleX.Parse({
              EN: "Roles",
              TC: "身份"
            }),
            url: datalink.Request.Info,
            success: () => LocaleX.Parse({
              EN: "Roles Load Successfully",
              TC: "成功載入身份"
            }),
            fail: () => LocaleX.Parse({
              EN: "Roles Load Failed: ",
              TC: "載入身份失敗: "
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
              EN: "Roles Duplicated Successfully.",
              TC: "成功複製身份"
            }),
            fail: () => LocaleX.Parse({
              EN: "Roles Duplicate Failed: ",
              TC: "複製身份失敗: "
            }),
            onSubmit: "Duplicate"
          },
          Import: {
            title: () => LocaleX.Parse({
              EN: "Import Roless",
              TC: "導入身份"
            }),
            content: "",
            url: datalink.Request.Import,
            success: () => LocaleX.Parse({
              EN: "Roless Imported Successfully.",
              TC: "成功導入身份"
            }),
            fail: () => LocaleX.Parse({
              EN: "Roless Import Failed: ",
              TC: "導入身份失敗: "
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
              EN: "Delete these @n Roles?",
              TC: "刪除這@n個身份?"
            }, {n:n}),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.DeleteBulk,
            success: () => LocaleX.Parse({
              EN: "Roles Deleted Successfully.",
              TC: "成功刪除身份"
            }),
            fail: () => LocaleX.Parse({
              EN: "Roles Delete Failed: ",
              TC: "刪除身份失敗: "
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
            { icon: <AccountTree/> , func: this.EditRoleAT,  
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
              EN: "Add Roles",
              TC: "新增身份"
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(RoleConfig.defaultProps))){
      this._setAllStates(() => {
        if(this.MountDatumizo) 
          this.MountDatumizo.Reload();
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

  ToggleCtrl = async (_, role, ctrl) => {
    let {onUpdate} = this.props;
    let res = await SUAC.SetProjectRoleActive(role, ctrl);
    if(res.Success){
      await onUpdate();
    }
  }

  ClearSelected = () => {
    this.setState({
      selectedRole: null,
      selectedRoleDoc: null
    }, () => {
      if(this.MountDatumizo){
        this.MountDatumizo.SetSelectedRows([]);
      }
    });
  }

  Refresh = async () => {
    let {selectedRole} = this.state;
    let {onUpdate} = this.props;
    if(onUpdate) await onUpdate();

    if(selectedRole){
      let doc = this.MountDatumizo.GetDoc(selectedRole);
      if(!doc) return;
      this.setState({
        selectedRole: doc._id,
        selectedRoleDoc: doc
      });
    }
  }

  EditRoleAT = (id, doc) => {
    this.setState({
      selectedRole: id,
      selectedRoleDoc: doc
    }, () => {
      if(this.MountDatumizo){
        this.MountDatumizo.SetSelectedRows([id]);
      }
    });
  }

  onRoleTreeCtrlSet = async (_, role, field, ctrl) => {
    let res = await SUAC.SetRoleTreeNodeActive(role, field, ctrl);
    if(res.Success){
      this.MountDatumizo.Reload();
      await this.Refresh();
    }
  }

  renderRoleTree(){
    let {projDoc} = this.props;
    let {selectedRole, selectedRoleDoc} = this.state;
    if(!selectedRoleDoc) return <VStack width="100%"/>;
    let overrideCtrl = {
      ...projDoc.SYSAuthCtrl.AuthTree,
      ...selectedRoleDoc.override
    };
    return (
      <VStack width="100%" alignItems="flex-start" paddingY={1}>
        <Typography style={{
          textAlign: "left", 
          width: "100%",
          fontSize: 25,
          color: ColorX.GetColorCSS(IZOTheme.foreground)
          }}>
          {"[" + LocaleX.Parse(selectedRoleDoc.name) + "] " + LocaleX.Parse({
            EN: "Authority Tree",
            TC: "權限樹"
          })}
        </Typography>
        <Box width={700}>
          <AuthTreeNode
            projID={projDoc._id}
            tree={projDoc.SYSAuth.AuthTree}
            ctrl={overrideCtrl}
            refCtrl={projDoc.SYSAuthCtrl.AuthTree}
            onCtrlSet={(projID, field, ctrl) => {
              this.onRoleTreeCtrlSet(projID, selectedRole, field, ctrl);
            }}
            />
        </Box>
      </VStack>
    );
  }

  render(){
    let {addOns, projDoc, onUpdate} = this.props;
    let {base, serverSidePagination, title} = this.state;
    if(!Authority.IsAccessibleQ("System.UAC.Roles")) return <Denied/>;
    
    let pageTitle = title;
    if(_.isFunction(title)){
      pageTitle = title();
    }

    return (
      <VStack alignItems="flex-start" height="100%">
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
        <HStack height="100%">
          <Datumizo 
            width={700}
            height={"100%"}
            lang={STORE.lang}
            base={base}
            addOns={{...addOns, projID: projDoc._id, projDoc: projDoc, Refresh: onUpdate, onCtrlSet: this.ToggleCtrl}} 
            serverSidePagination={serverSidePagination} 
            onMounted={this.onMountDatumizo} 
            />
          {this.renderRoleTree()}
        </HStack>
      </VStack>
    );
  }

}

export default observer(RoleConfig);
