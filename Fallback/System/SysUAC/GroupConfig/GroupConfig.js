import React, { Component } from "react";
import PropsType from "prop-types";
import { observer } from "mobx-react";

import _ from "lodash";
import { Box, Typography } from "@material-ui/core";

import schema from "./schema";
import datalink from "./datalink";

import Datumizo from "IZOArc/LabIZO/Datumizo/Datumizo";
import { VStack, HStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, ColorX, Authority, STORE, LocaleX } from "IZOArc/STATIC";
import { IZOTheme } from "__SYSDefault/Theme";
import { Denied } from "IZOArc/Fallback";
import { GroupRounded } from "@mui/icons-material";
import GroupUsers from "./_parts/GroupUsers";
import SUAC from "IZOArc/API/SUAC";

/**
 * add ~react-datalink.js as datalink.js in the same scope
 * add ~react-schema.js as schema.js in the same scope
 * @augments {Component<Props, State>}
 */
class GroupConfig extends Component {

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
      selectedGroup: null,
      selectedGroupDoc: null,
      title: () => LocaleX.Parse({
        EN: "Groups",
        TC: "資源組"
      }),
      serverSidePagination: false, 
      base: {
        title: () => LocaleX.Parse({
          EN: "Groups",
          TC: "資源組"
        }),
        exportDoc: "groups",
        schema: schema,
        reqAuth: "ProjConfig.Group",

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
              EN: "Add Groups",
              TC: "新增資源組"
            }),
            url: datalink.Request.Add,
            success:  () => LocaleX.Parse({
              EN: "Groups Added Successfully",
              TC: "成功新增資源組"
            }),
            fail:  () => LocaleX.Parse({
              EN: "Groups Add Failed: ",
              TC: "新增資源組失敗: "
            }),
            schema: schema.Add,
            buttons: ["Clear", "Submit"],
            onSubmit: "Add",
            onSuccess: (payload, success) => {
              this.Refresh();
              success();
            }
          },
          Delete: {
            title: () => LocaleX.Parse({
              EN: "Delete this Groups?",
              TC: "刪除資源組"
            }),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.Delete,
            success: () => LocaleX.Parse({
              EN: "Groups Deleted Successfully.",
              TC: "成功刪除資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Groups Delete Failed: ",
              TC: "刪除資源組失敗: "
            }),
            onSubmit: "Delete",
            onSuccess: (payload, success) => {
              this.Refresh();
              success();
            }
          },
          Edit: {
            title: () => LocaleX.Parse({
              EN: "Edit Groups",
              TC: "編輯資源組"
            }),
            url: datalink.Request.Edit,
            success: () => LocaleX.Parse({
              EN: "Groups Edited Successfully",
              TC: "成功編輯資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Groups Edit Failed: ",
              TC: "編輯資源組失敗: "
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
              EN: "Groups",
              TC: "資源組"
            }),
            url: datalink.Request.Info,
            success: () => LocaleX.Parse({
              EN: "Groups Load Successfully",
              TC: "成功載入資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Groups Load Failed: ",
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
              EN: "Groups Duplicated Successfully.",
              TC: "成功複製資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Groups Duplicate Failed: ",
              TC: "複製資源組失敗: "
            }),
            onSubmit: "Duplicate"
          },
          Import: {
            title: () => LocaleX.Parse({
              EN: "Import Groupss",
              TC: "導入資源組"
            }),
            content: "",
            url: datalink.Request.Import,
            success: () => LocaleX.Parse({
              EN: "Groupss Imported Successfully.",
              TC: "成功導入資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Groupss Import Failed: ",
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
              EN: "Delete these @n Groups?",
              TC: "刪除這@n個資源組?"
            }, {n:n}),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.DeleteBulk,
            success: () => LocaleX.Parse({
              EN: "Groups Deleted Successfully.",
              TC: "成功刪除資源組"
            }),
            fail: () => LocaleX.Parse({
              EN: "Groups Delete Failed: ",
              TC: "刪除資源組失敗: "
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
            { icon: <GroupRounded/> , func: this.EditUserAT,  
              caption: () => LocaleX.Parse({
                EN: "Edit Users",
                TC: "編輯使用者"
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
              EN: "Add Groups",
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(GroupConfig.defaultProps))){
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

  onMountGroupUser = (callbacks) => {
    this.MountGroupUser = callbacks;
  }

  onMountDatumizo = (callbacks) => {
    this.MountDatumizo = callbacks;
  }

  ToggleCtrl = async (_, group, ctrl) => {
    let {onUpdate} = this.props;
    let res = await SUAC.SetProjectGroupActive(group, ctrl);
    if(res.Success){
      await onUpdate();
    }
  }

  ClearSelected = () => {
    this.setState({
      selectedGroup: null,
      selectedGroupDoc: null,
      selectedGroupUserData: null
    }, () => {
      this.MountDatumizo.SetSelectedRows([]);
    });
  }

  Refresh = async () => {
    let {selectedGroup} = this.state;
    let {onUpdate} = this.props;
    if(onUpdate) await onUpdate();

    if(selectedGroup){
      this.MountDatumizo.Reload(() => {
        let doc = this.MountDatumizo.GetDoc(selectedGroup);
        this.EditUserAT(selectedGroup, doc);
      });
    }
  }

  EditUserAT = (id, doc) => {
    if(!doc) return;
    let dataMod = _.map(doc.users, (o, i) => {
      return {
        ...o,
        _id: o.username
      };
    });
    this.setState({
      selectedGroup: id,
      selectedGroupDoc: doc,
      selectedGroupUserData: dataMod
    }, () => {
      this.MountDatumizo.SetSelectedRows([id]);
      if(this.MountGroupUser) this.MountGroupUser.Reload();
    });
  }

  setGroupUserActive = async (_, field, ctrl) => {
    let {selectedGroup} = this.state;
    let res = await SUAC.SetGroupUserActive(selectedGroup, field, ctrl);
    if(res.Success){
      this.MountDatumizo.Reload();
      await this.Refresh();
    } 
  }

  renderUserList(){
    let {selectedGroupDoc, selectedGroupUserData} = this.state;
    let {addOns, projDoc, userlist, rolelist} = this.props;
    if(!selectedGroupDoc) return <VStack width="100%"/>;
    
    return (
      <VStack width="100%" alignItems="flex-start">
        <GroupUsers
          addOns={{...addOns, projID: projDoc._id, projDoc: projDoc,
            userlist: userlist, rolelist: rolelist, 
            Refresh: this.Refresh, selectedGroupDoc: selectedGroupDoc,
            onCtrlSet: this.setGroupUserActive
          }} 
          data={selectedGroupUserData}
          onMounted={this.onMountGroupUser}
          />
      </VStack>
    );
  }

  render(){
    let {addOns, projDoc} = this.props;
    let {base, serverSidePagination, title} = this.state;
    if(!Authority.IsAccessibleQ("ProjConfig.Group")) return <Denied/>;
    
    let pageTitle = title;
    if(_.isFunction(title)){
      pageTitle = title();
    }

    return (
      <VStack>
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
            addOns={{...addOns, projID: projDoc._id, projDoc: projDoc, 
              Refresh: this.Refresh, onCtrlSet: this.ToggleCtrl}} 
            serverSidePagination={serverSidePagination} 
            onMounted={this.onMountDatumizo}
            />
          {this.renderUserList()}
        </HStack>
      </VStack>
    );
  }

}

export default observer(GroupConfig);
