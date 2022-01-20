import React, { Component } from "react";
import PropsType from "prop-types";
import { observer } from "mobx-react";

import _ from "lodash";
import { Box, Typography } from "@mui/material";

import schema from "./schema";
import datalink from "./datalink";

import { IZOTheme } from "__SYSDefault/Theme";

import Datumizo from "IZOArc/LabIZO/Datumizo/Datumizo";
import { VStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, ColorX, AuthX, STORE, LocaleX } from "IZOArc/STATIC";
import { Denied } from "IZOArc/Fallback";

/**
 * add ~react-datalink.js as datalink.js in the same scope
 * add ~react-schema.js as schema.js in the same scope
 * @augments {Component<Props, State>}
 */
class SysTickets extends Component {

  static propTypes = {
    addOns: PropsType.object,
    onDataChange: PropsType.func
  }

  static defaultProps = {
    addOns: {},
    onDataChange: undefined
  }

  constructor(){
    super();
    this.state = {
      title: () => LocaleX.Parse({
        EN: "Bug Report Tickets",
        TC: "錯誤報告存票"
      }),
      serverSidePagination: false, 
      base: {
        title: () => LocaleX.Parse({
          EN: "Bug Report Ticket",
          TC: "錯誤報告存票"
        }),
        exportDoc: "ticket",
        schema: schema,
        rowIdAccessor: "_id",
        reqAuth: "System.Tickets",

        noDefaultTable: false,
        noDefaultButtons: false,
        refreshButton: "none",
        usePropsData: false,
        timeRanged: "none",

        tablizo: {
          columnsToolbar: true,
          filterToolbar: true,
          densityToolbar: true,
          exportToolbar: false,
          density: "compact", //compact, standard, comfortable
          defaultPageSize: 50,
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
              EN: "Add Bug Report Ticket",
              TC: "新增錯誤報告存票"
            }),
            url: datalink.Request.Add,
            success:  () => LocaleX.Parse({
              EN: "Bug Report Ticket Added Successfully",
              TC: "成功新增錯誤報告存票"
            }),
            fail:  () => LocaleX.Parse({
              EN: "Bug Report Ticket Add Failed: ",
              TC: "新增錯誤報告存票失敗: "
            }),
            schema: schema.Add,
            buttons: ["Clear", "Submit"],
            onSubmit: "Add"
          },
          Delete: {
            title: () => LocaleX.Parse({
              EN: "Delete this Bug Report Ticket?",
              TC: "刪除錯誤報告存票"
            }),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.Delete,
            success: () => LocaleX.Parse({
              EN: "Bug Report Ticket Deleted Successfully.",
              TC: "成功刪除錯誤報告存票"
            }),
            fail: () => LocaleX.Parse({
              EN: "Bug Report Ticket Delete Failed: ",
              TC: "刪除錯誤報告存票失敗: "
            }),
            onSubmit: "Delete"
          },
          Edit: {
            title: () => LocaleX.Parse({
              EN: "Edit Bug Report Ticket",
              TC: "編輯錯誤報告存票"
            }),
            url: datalink.Request.Edit,
            success: () => LocaleX.Parse({
              EN: "Bug Report Ticket Edited Successfully",
              TC: "成功編輯錯誤報告存票"
            }),
            fail: () => LocaleX.Parse({
              EN: "Bug Report Ticket Edit Failed: ",
              TC: "編輯錯誤報告存票失敗: "
            }),
            schema: schema.Edit,
            buttons: ["Revert", "Submit"],
            onSubmit: "Edit"
          },
          Info: {
            title: () => LocaleX.Parse({
              EN: "Bug Report Ticket",
              TC: "錯誤報告存票"
            }),
            url: datalink.Request.Info,
            success: () => LocaleX.Parse({
              EN: "Bug Report Ticket Load Successfully",
              TC: "成功載入錯誤報告存票"
            }),
            fail: () => LocaleX.Parse({
              EN: "Bug Report Ticket Load Failed: ",
              TC: "載入錯誤報告存票失敗: "
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
              EN: "Bug Report Ticket Duplicated Successfully.",
              TC: "成功複製錯誤報告存票"
            }),
            fail: () => LocaleX.Parse({
              EN: "Bug Report Ticket Duplicate Failed: ",
              TC: "複製錯誤報告存票失敗: "
            }),
            onSubmit: "Duplicate"
          },
          Import: {
            title: () => LocaleX.Parse({
              EN: "Import Bug Report Tickets",
              TC: "導入錯誤報告存票"
            }),
            content: "",
            url: datalink.Request.Import,
            success: () => LocaleX.Parse({
              EN: "Bug Report Tickets Imported Successfully.",
              TC: "成功導入錯誤報告存票"
            }),
            fail: () => LocaleX.Parse({
              EN: "Bug Report Tickets Import Failed: ",
              TC: "導入錯誤報告存票失敗: "
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
              EN: "Delete these @n Bug Report Tickets?",
              TC: "刪除這@n個錯誤報告存票?"
            }, {n:n}),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.DeleteBulk,
            success: () => LocaleX.Parse({
              EN: "Bug Report Tickets Deleted Successfully.",
              TC: "成功刪除錯誤報告存票"
            }),
            fail: () => LocaleX.Parse({
              EN: "Bug Report Tickets Delete Failed: ",
              TC: "刪除錯誤報告存票失敗: "
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
            { icon: "info", func: "Info", 
              caption: () => LocaleX.Parse({
                EN: "Details",
                TC: "詳細資料"
              })},
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
              EN: "Add Bug Report Tickets",
              TC: "新增錯誤報告存票"
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(SysTickets.defaultProps))){
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
    }), callback);
  }

  onMountDatumizo = (callbacks) => {
    this.MountDatumizo = callbacks;
  }

  renderProjectDetails(){
    let {addOns, onDataChange} = this.props;
    let {base, serverSidePagination, title} = this.state;
    if(!AuthX.Pass("System.Tickets")) return <Denied/>;

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
        <Datumizo lang={STORE.lang}
          base={base}
          addOns={{...addOns}} 
          serverSidePagination={serverSidePagination} 
          onMounted={this.onMountDatumizo} 
          onDataChange={onDataChange}
          />
      </VStack>
    );
  }

  render(){
    return (
      <VStack width="100%" height="100%">
        {this.renderProjectDetails()}
      </VStack>
    );
  }

}

export default observer(SysTickets);
