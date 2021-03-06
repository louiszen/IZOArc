import React, { Component } from "react";

import _ from "lodash";
import moment from "moment";
import { observer } from "mobx-react";

import { Typography } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

import schema from "./schema";

import { BnRBackup, BnRDBInclude, BnRDelete, BnRInfo, BnRRestore } from "IZOArc/API/SysAPI";

import Tablizo from "IZOArc/LabIZO/Tablizo";
import { Accessor, ColorX, STORE, ErrorX, LocaleX, ReqX, AuthX } from "IZOArc/STATIC";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";

class SysBnR extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates(() => {
      this._GetInfo();
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(SysBnR.defaultProps))){
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  _dateStrToMomemt = (str) => {
    return moment(str, "YYYYMMDDHHmmss");
  }

  _momentToDisplay = (obj) => {
    return obj.format("DD MMM, YYYY HH:mm:ss");
  }

  _GetInfo = async () => {
    let res = await ReqX.SendBE(BnRInfo, {}, {}, null, 
      () => {
        STORE.Alert(LocaleX.GetIZO("Alert.ServerReturnError"), "error");
      });

    let {Success, payload} = res;
    if(Success){
      let {dbs, LastBackup, Backups, include} = payload;
      dbs = _.map(dbs, (o, i) => {
        return {
          name: o,
          included: include.includes(o)
        };
      });

      Backups = _.map(Backups, (o, i) => {
        return {
          _id: o,
          name: this._momentToDisplay(this._dateStrToMomemt(o))
        };
      });

      this.setState({
        dbs: dbs,
        LastBackup: LastBackup,
        Backups: Backups,
        includeDB: include
      });
    }
  }

  _Backup = {
    onClick: () => {
      STORE.Ask(LocaleX.GetIZO("System.Backup"), LocaleX.GetIZO("System.BackupSystem"), this._Backup.onSubmit);
    }, 
    onSubmit: async () => {
      let res = await ReqX.SendBE(BnRBackup, {}, {}, null, null,
        this._Backup.onError);

      let {Success, payload} = res;
      if(Success){
        STORE.Alert(LocaleX.GetIZO("Alert.BackupSuccess"), "success");
        this._GetInfo();
      }else {
        this._Backup.onError(payload);
      }  
    },
    onError: (e) => {
      STORE.Alert(ErrorX.Handle(e), "error");
    },
  }

  _IncToggle = async (dbname, f) => {

    await ReqX.SendBE(BnRDBInclude, {
      dbname: dbname,
      include: f
    }, {}, 
    () => {
      this._GetInfo();
    },
    () => {
      STORE.Alert(LocaleX.GetIZO("Alert.UpdateError"), "error");
    },
    (e) => {
      STORE.Alert(ErrorX.Handle(e), "error");
    });
  }

  _Restore = {
    onClick: (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      STORE.Ask(LocaleX.GetIZO("System.Restore"), LocaleX.GetIZO("System.RestoreTo", {str: str}), async () => {
        await this._Restore.onSubmit(datestr);
      });
    }, 
    onSubmit: async (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);

      let res = await ReqX.SendBE(BnRRestore, {
        datestr: datestr
      }, {}, null, null, this._Restore.onError);

      let {Success, payload} = res;
      if(Success){
        STORE.Alert(LocaleX.GetIZO("Alert.RestoreSuccess", {str: str}), "success");
        this._GetInfo();
      } else {
        this._Restore.onError(payload);
      }
    },
    onError: (e) => {
      STORE.Alert(ErrorX.Handle(e), "error");
    },
  }

  _Delete = {
    onClick: (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      STORE.Ask(LocaleX.GetIZO("System.Delete"), LocaleX.GetIZO("System.DeleteBackup", {str: str}), async () => {
        await this._Delete.onSubmit(datestr);
      });
    }, 
    onSubmit: async (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      let res = await ReqX.SendBE(BnRDelete, {
        datestr: datestr
      }, {}, null, null, this._Delete.onError);

      let {Success, payload} = res;
      if(Success){
        STORE.Alert(str + " " + LocaleX.GetIZO("Alert.DeleteSuccess"), "success");
        this._GetInfo();
      }else {
        this._Delete.onError(payload);
      }

    },
    onError: (e) => {
      STORE.Alert(ErrorX.Handle(e), "error");
    },
  }

  renderBackup(){
    let {LastBackup} = this.state;
    return (
      <HStack justifyContent="flex-start" spacing={10}>
        {AuthX.PassF("System.BnR", "Backup") && <StyledButton 
          onClick={this._Backup.onClick}
          theme={{
            width: 200,
            color: "blue",
            hover: {
              background: ColorX.GetColorCSS("blue"),
              color: ColorX.GetBGColorCSS("blue")
            }
          }}>
            <HStack spacing={5}>
              <SaveOutlined/>
              <Typography>
                {LocaleX.GetIZO("System.Backup")}
              </Typography>
            </HStack>            
        </StyledButton>}
        <Typography>
          {LocaleX.GetIZO("System.LastBackup")}
        </Typography>
        <Typography style={{fontWeight: "bold"}}>
          {LastBackup || LocaleX.GetIZO("System.NoBackup")}
        </Typography>
      </HStack>
    );
  }

  renderOperations(){
    return (
      <VStack justifyContent="flex-start" spacing={10} padding={2}>
        {this.renderBackup()}
        {this.renderVersions()}
        <Spacer/>
      </VStack>
    );
  }

  renderDatabases(){
    let {dbs} = this.state;
    if(!AuthX.PassF("System.BnR", "Database", "", "", 0)){
      return;
    }
    return (
      <VStack paddingY={2}>
        <Tablizo 
        width={400} 
        height="100%" 
        density="compact"
        user={STORE.user}
        rowIdAccessor="name"
        schema={schema.database}
        showSelector={false}
        data={dbs}
        addOns={{
          onToggle: this._IncToggle
        }}
        lang={STORE.lang}
        />
      </VStack>
    );
  }

  renderVersions(){
    let {Backups} = this.state;
    return (
      <Tablizo 
        width={500} 
        height="100%" 
        density="compact"
        user={STORE.user}
        schema={schema.restore}
        showSelector={false}
        data={Backups}
        addOns={{
          Restore: this._Restore.onClick,
          Delete: this._Delete.onClick
        }}
        lang={STORE.lang}
        /> 
    );
  }

  render(){
    return (
      <HStack justifyContent="flex-start" height="100%" spacing={10} paddingX={2}>
        {this.renderDatabases()}
        {this.renderOperations()}
      </HStack>
    );
  }

}

export default observer(SysBnR);
