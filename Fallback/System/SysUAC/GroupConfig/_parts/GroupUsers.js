import React, { Component } from "react";
import PropsType from "prop-types";
import { observer } from "mobx-react";

import _ from "lodash";
import { Box, Typography } from "@mui/material";

import schema from "./schema";
import datalink from "./datalink";

import Datumizo from "IZOArc/LabIZO/Datumizo/Datumizo";
import { VStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, ColorX, Authority, STORE, LocaleX } from "IZOArc/STATIC";
import { IZOTheme } from "__SYSDefault/Theme";
import { Denied } from "IZOArc/Fallback";

/**
 * add ~react-datalink.js as datalink.js in the same scope
 * add ~react-schema.js as schema.js in the same scope
 * @augments {Component<Props, State>}
 */
class GroupUsers extends Component {

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
      title: (addOns) => "[" + LocaleX.Parse(addOns.selectedGroupDoc.name) + "] " + LocaleX.Parse({
        EN: "Users",
        TC: "使用者"
      }),
      serverSidePagination: false, 
      base: {
        title: () => LocaleX.Parse({
          EN: "Users",
          TC: "使用者"
        }),
        exportDoc: "group_users",
        rowIdAccessor: "username",
        schema: schema,
        reqAuth: "ProjConfig.Group",

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
              EN: "Add Users",
              TC: "新增使用者"
            }),
            url: datalink.Request.Add,
            success:  () => LocaleX.Parse({
              EN: "Users Added Successfully",
              TC: "成功新增使用者"
            }),
            fail:  () => LocaleX.Parse({
              EN: "Users Add Failed: ",
              TC: "新增使用者失敗: "
            }),
            schema: schema.Add,
            buttons: ["Clear", "Submit"],
            onSubmit: "Add",
            onSuccess: this.ReloadTable
          },
          Delete: {
            title: () => LocaleX.Parse({
              EN: "Delete this Users?",
              TC: "刪除使用者"
            }),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.Delete,
            success: () => LocaleX.Parse({
              EN: "Users Deleted Successfully.",
              TC: "成功刪除使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Users Delete Failed: ",
              TC: "刪除使用者失敗: "
            }),
            onSubmit: "Delete",
            onSuccess: this.ReloadTable
          },
          Edit: {
            title: () => LocaleX.Parse({
              EN: "Edit Users",
              TC: "編輯使用者"
            }),
            url: datalink.Request.Edit,
            success: () => LocaleX.Parse({
              EN: "Users Edited Successfully",
              TC: "成功編輯使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Users Edit Failed: ",
              TC: "編輯使用者失敗: "
            }),
            schema: schema.Edit,
            buttons: ["Revert", "Submit"],
            onSubmit: "Edit",
            onSuccess: this.ReloadTable
          },
          Info: {
            title: () => LocaleX.Parse({
              EN: "Users",
              TC: "使用者"
            }),
            url: datalink.Request.Info,
            success: () => LocaleX.Parse({
              EN: "Users Load Successfully",
              TC: "成功載入使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Users Load Failed: ",
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
              EN: "Users Duplicated Successfully.",
              TC: "成功複製使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Users Duplicate Failed: ",
              TC: "複製使用者失敗: "
            }),
            onSubmit: "Duplicate"
          },
          Import: {
            title: () => LocaleX.Parse({
              EN: "Import Userss",
              TC: "導入使用者"
            }),
            content: "",
            url: datalink.Request.Import,
            success: () => LocaleX.Parse({
              EN: "Userss Imported Successfully.",
              TC: "成功導入使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Userss Import Failed: ",
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
              EN: "Delete these @n Users?",
              TC: "刪除這@n個使用者?"
            }, {n:n}),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.DeleteBulk,
            success: () => LocaleX.Parse({
              EN: "Users Deleted Successfully.",
              TC: "成功刪除使用者"
            }),
            fail: () => LocaleX.Parse({
              EN: "Users Delete Failed: ",
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
              EN: "Add Users",
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(GroupUsers.defaultProps))){
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
          Reload: this.GroupUpdate,
        });
      }
      if (callback) callback();
    });
  }

  ReloadTable = (payload, success) => {
    let {addOns} = this.props;
    addOns.Refresh();
    success();
  }

  GroupUpdate = () => {
    this.MountDatumizo.Reload();
  }

  onMountDatumizo = (callbacks) => {
    this.MountDatumizo = callbacks;
  }

  render(){
    let {addOns, onDataChange, data} = this.props;
    let {base, serverSidePagination, title} = this.state;
    if(!Authority.IsAccessibleQ("ProjConfig.Group")) return <Denied/>;
    
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
        <Datumizo lang={STORE.lang}
          base={base}
          addOns={addOns} 
          data={data}
          serverSidePagination={serverSidePagination} 
          onMounted={this.onMountDatumizo} 
          onDataChange={onDataChange}
          />
      </VStack>
    );
  }

}

export default observer(GroupUsers);
