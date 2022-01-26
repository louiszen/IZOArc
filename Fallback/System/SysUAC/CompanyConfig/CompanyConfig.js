import React, { Component } from "react";
import PropsType from "prop-types";
import { observer } from "mobx-react";

import _ from "lodash";
import { Box, Typography } from "@mui/material";

import schema from "./schema";
import datalink from "./datalink";

import Datumizo from "IZOArc/LabIZO/Datumizo/Datumizo";
import { VStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, ColorX, AuthX, STORE, LocaleX } from "IZOArc/STATIC";
import { IZOTheme } from "__SYSDefault/Theme";
import { Denied } from "IZOArc/Fallback";
import SUAC from "IZOArc/API/SUAC";

/**
 * add ~react-datalink.js as datalink.js in the same scope
 * add ~react-schema.js as schema.js in the same scope
 * @augments {Component<Props, State>}
 */
class CompanyConfig extends Component {

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
      title: () => LocaleX.Parse({
        EN: "Company",
        TC: "公司"
      }),
      serverSidePagination: false, 
      base: {
        title: () => LocaleX.Parse({
          EN: "Company",
          TC: "公司"
        }),
        exportDoc: "companies",
        schema: schema,
        rowIdAccessor: "_id",
        reqAuth: "System.UAC.Companies",

        noDefaultTable: false,
        noDefaultButtons: false,
        refreshButton: "none",
        usePropsData: false,
        timeRanged: "none",

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
              EN: "Add Company",
              TC: "新增公司"
            }),
            url: datalink.Request.Add,
            success:  () => LocaleX.Parse({
              EN: "Company Added Successfully",
              TC: "成功新增公司"
            }),
            fail:  () => LocaleX.Parse({
              EN: "Company Add Failed: ",
              TC: "新增公司失敗: "
            }),
            schema: schema.Add,
            buttons: ["Clear", "Submit"],
            onSubmit: "Add"
          },
          Delete: {
            title: () => LocaleX.Parse({
              EN: "Delete this Company?",
              TC: "刪除公司"
            }),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.Delete,
            success: () => LocaleX.Parse({
              EN: "Company Deleted Successfully.",
              TC: "成功刪除公司"
            }),
            fail: () => LocaleX.Parse({
              EN: "Company Delete Failed: ",
              TC: "刪除公司失敗: "
            }),
            onSubmit: "Delete"
          },
          Edit: {
            title: () => LocaleX.Parse({
              EN: "Edit Company",
              TC: "編輯公司"
            }),
            url: datalink.Request.Edit,
            success: () => LocaleX.Parse({
              EN: "Company Edited Successfully",
              TC: "成功編輯公司"
            }),
            fail: () => LocaleX.Parse({
              EN: "Company Edit Failed: ",
              TC: "編輯公司失敗: "
            }),
            schema: schema.Edit,
            buttons: ["Revert", "Submit"],
            onSubmit: "Edit"
          },
          Info: {
            title: () => LocaleX.Parse({
              EN: "Company",
              TC: "公司"
            }),
            url: datalink.Request.Info,
            success: () => LocaleX.Parse({
              EN: "Company Load Successfully",
              TC: "成功載入公司"
            }),
            fail: () => LocaleX.Parse({
              EN: "Company Load Failed: ",
              TC: "載入公司失敗: "
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
              EN: "Company Duplicated Successfully.",
              TC: "成功複製公司"
            }),
            fail: () => LocaleX.Parse({
              EN: "Company Duplicate Failed: ",
              TC: "複製公司失敗: "
            }),
            onSubmit: "Duplicate"
          },
          Import: {
            title: () => LocaleX.Parse({
              EN: "Import Companies",
              TC: "導入公司"
            }),
            content: "",
            url: datalink.Request.Import,
            success: () => LocaleX.Parse({
              EN: "Companies Imported Successfully.",
              TC: "成功導入公司"
            }),
            fail: () => LocaleX.Parse({
              EN: "Companies Import Failed: ",
              TC: "導入公司失敗: "
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
              EN: "Delete these @n Companies?",
              TC: "刪除這@n個公司?"
            }, {n:n}),
            content: () => LocaleX.Parse({
              EN: "Caution: This is irrevertable.",
              TC: "注意: 這操作不可逆轉"
            }),
            url: datalink.Request.DeleteBulk,
            success: () => LocaleX.Parse({
              EN: "Companies Deleted Successfully.",
              TC: "成功刪除公司"
            }),
            fail: () => LocaleX.Parse({
              EN: "Companies Delete Failed: ",
              TC: "刪除公司失敗: "
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
              EN: "Add Company",
              TC: "新增公司"
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(CompanyConfig.defaultProps))){
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

  ToggleCtrl = async (_, company, ctrl) => {
    if(!AuthX.PassF("System.UAC.Companies", "Terminate")){
      STORE.Alert(LocaleX.GetIZO("Alert.NoAuthority"), "error");
      return;
    }
    let {onUpdate} = this.props;
    let res = await SUAC.SetProjectCompanyActive(company, ctrl);
    if(res.Success){
      await onUpdate();
    }
  }

  render(){
    let {addOns, projDoc, onUpdate} = this.props;
    let {base, serverSidePagination, title} = this.state;
    if(!AuthX.Pass("System.UAC.Companies")) return <Denied/>;
    
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
        <Datumizo lang={STORE.lang}
          base={base}
          addOns={{...addOns, projID: projDoc._id, projDoc: projDoc, Refresh: onUpdate, onCtrlSet: this.ToggleCtrl}} 
          serverSidePagination={serverSidePagination} 
          onMounted={this.onMountDatumizo} 
          />
      </VStack>
    );
  }

}

export default observer(CompanyConfig);
