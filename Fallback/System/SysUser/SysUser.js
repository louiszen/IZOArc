import React, { Component } from 'react';
import PropsType from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import _ from 'lodash';

import schema from './schema';
import datalink from './datalink';

import Datumizo from 'IZOArc/LabIZO/Datumizo/Datumizo';
import { VStack } from 'IZOArc/LabIZO/Stackizo';
import { Accessor, ColorX, Authority, STORE, LocaleX } from 'IZOArc/STATIC';
import { IZOTheme } from '__SYSDefault/Theme';
import { Denied } from 'IZOArc/Fallback';
import { observer } from 'mobx-react';

/**
 * @augments {Component<Props, State>}
 */
class SysUser extends Component {

  static propTypes = {
    addOns: PropsType.object
  }

  static defaultProps = {
    addOns: {}
  }

  constructor(){
    super();
    this.state = {
      title: () => LocaleX.Get("__IZO.UAC.PageTitle"),
      serverSidePagination: false, 
      base: {
        title: () => LocaleX.Get("__IZO.UAC.Title"),
        exportDoc: "users",
        schema: schema,
        reqAuth: "System.User",

        noDefaultTable: false,
        noDefaultButtons: false,

        tablizo: {
          columnsToolbar: true,
          filterToolbar: true,
          densityToolbar: true,
          exportToolbar: false,
          density: "compact", //compact, standard, comfortable
          defaultPageSize: 50,
          showSelector: true,
        },

        formizo: {

        },

        Connect: {
          DBInfo: datalink.Request.DBInfo,
          List: datalink.Request.List,
          schema: schema.Table
        },

        operations: {
          Add: {
            title: () => LocaleX.Get("__IZO.UAC.Add.title"),
            url: datalink.Request.Add,
            success: () => LocaleX.Get("__IZO.UAC.Add.success"),
            fail: () => LocaleX.Get("__IZO.UAC.Add.fail"),
            schema: schema.Add,
            buttons: ["Clear", "Submit"],
            onSubmit: "Add"
          },
          Delete: {
            title: () => LocaleX.Get("__IZO.UAC.Delete.title"),
            content: () => LocaleX.Get("__IZO.UAC.Delete.content"),
            url: datalink.Request.Delete,
            success: () => LocaleX.Get("__IZO.UAC.Delete.success"),
            fail: () => LocaleX.Get("__IZO.UAC.Delete.fail"),
            onSubmit: "Delete"
          },
          Edit: {
            title: () => LocaleX.Get("__IZO.UAC.Edit.title"),
            url: datalink.Request.Edit,
            success: () => LocaleX.Get("__IZO.UAC.Edit.success"),
            fail: () => LocaleX.Get("__IZO.UAC.Edit.fail"),
            schema: schema.Edit,
            buttons: ["Revert", "Submit"],
            onSubmit: "Edit"
          },
          Info: {
            title: () => LocaleX.Get("__IZO.UAC.Info.title"),
            url: datalink.Request.Info,
            success: () => LocaleX.Get("__IZO.UAC.Info.success"),
            fail: () => LocaleX.Get("__IZO.UAC.Info.fail"),
            schema: schema.Info,
            readOnly: true
          },
          Import: {
            title: () => LocaleX.Get("__IZO.UAC.Import.title"),
            content: "",
            url: datalink.Request.Import,
            success: () => LocaleX.Get("__IZO.UAC.Import.success"),
            fail: () => LocaleX.Get("__IZO.UAC.Import.fail"),
            schema: schema.ImportFormat,
            replace: false
          },
          Export: {
            url: datalink.Request.Export,
            schema: schema.Export,
          },
          DeleteBulk: {
            title: (n) => LocaleX.Get("__IZO.UAC.DeleteBulk.title", {n: n}),
            content: () => LocaleX.Get("__IZO.UAC.DeleteBulk.content"),
            url: datalink.Request.DeleteBulk,
            success: () => LocaleX.Get("__IZO.UAC.DeleteBulk.success"),
            fail: () => LocaleX.Get("__IZO.UAC.DeleteBulk.fail"),
            onSubmit: "DeleteBulk",
          },
        },

        buttons: {
          inline: [
            { icon: "edit", func: "Edit", caption: () => LocaleX.Get("__IZO.UAC.ButtonCaption.Edit"), reqFunc: "Edit" },
            { icon: "info", func: "Info", caption: () => LocaleX.Get("__IZO.UAC.ButtonCaption.Info") },
            { icon: "delete", func: "Delete", caption: () => LocaleX.Get("__IZO.UAC.ButtonCaption.Delete"), reqFunc: "Delete" },
          ],
          left: [{ icon: "add", func: "Add", caption: () => LocaleX.Get("__IZO.UAC.ButtonCaption.Add"), reqFunc: "Add" }],
          right: [
            { icon: "deletebulk", func: "DeleteBulk", caption: (n) => LocaleX.Get("__IZO.UAC.ButtonCaption.DeleteBulk", {n: n}), reqFunc: "Delete", theme: "caution" },
            { icon: "export", func: "Export", caption: (n) => LocaleX.Get("__IZO.UAC.ButtonCaption.Export", {n: n === 0? LocaleX.Get("__IZO.Datumizo.All") : n}), reqFunc: "Export" },
            { icon: "import", func: "Import", caption: () => LocaleX.Get("__IZO.UAC.ButtonCaption.Import"), reqFunc: "Import" },
          ],
        },
      }
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(SysUser.defaultProps))){
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

  render(){
    let {addOns} = this.props;
    let {base, serverSidePagination, title} = this.state;
    if(!Authority.IsAccessibleQ("System.User")) return <Denied/>;

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
            color: ColorX.GetColorCSS(IZOTheme.menuFG)
            }}>
            {pageTitle}
          </Typography>
        </Box>
        <Datumizo lang={STORE.lang}
          base={base} serverSidePagination={serverSidePagination} onMounted={this.onMountDatumizo} addOns={addOns}
          />
      </VStack>
    );
  }

}

export default observer(SysUser);
