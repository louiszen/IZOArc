import React, { Component } from 'react';

import _ from 'lodash';
import moment from 'moment';
import axios from 'axios';
import { Typography } from '@material-ui/core';
import { SaveOutlined } from '@material-ui/icons';

import schema from './schema';
import { DOMAIN } from '__SYSDefault/Domain';

import Tablizo from 'IZOArc/LabIZO/Tablizo';
import Accessizo from 'IZOArc/LabIZO/Accessizo';
import { Accessor, ColorX, STORE, ErrorX, LocaleX } from 'IZOArc/STATIC';
import { HStack, Spacer, VStack } from 'IZOArc/LabIZO/Stackizo';
import { StyledButton } from 'IZOArc/LabIZO/Stylizo';
import { observer } from 'mobx-react';
import { BnRBackup, BnRDBInclude, BnRDelete, BnRInfo, BnRRestore } from '__SYSDefault/SysAPI';

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
    return moment(str, "YYYYMMDDHHmmss")
  }

  _momentToDisplay = (obj) => {
    return obj.format("DD MMM, YYYY HH:mm:ss");
  }

  _GetInfo = async () => {
    let url = DOMAIN + BnRInfo;
    let payloadOut = {
      JWT: STORE.user.JWT,
    };

    try{
      console.log(BnRInfo, payloadOut);
      let res = await axios.post(url, payloadOut);

      console.log(BnRInfo, res.data);

      let {Success, payload} = res.data;
      if (Success === true) {
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
        })
      } else {
        STORE.Alert(LocaleX.Get("__IZO.Alert.ServerReturnError"), "error")
      }
    } catch (e) {
      console.log(e);
      STORE.Alert(LocaleX.Get("__IZO.Alert.CannotConnect"), "error")
    }
  }

  _Backup = {
    onClick: () => {
      STORE.Ask(LocaleX.Get("__IZO.System.Backup"), LocaleX.Get("__IZO.System.BackupSystem"), this._Backup.onSubmit);
    }, 
    onSubmit: async () => {
      let url = DOMAIN + BnRBackup;
      let payloadOut = {
        JWT: STORE.user.JWT,
      };

      try{
        let res = await axios.post(url, payloadOut);
        console.log(BnRBackup, res.data);

        let {Success} = res.data;
        if (Success === true) {
          STORE.Alert(LocaleX.Get("__IZO.Alert.BackupSuccess"), "success");
          this._GetInfo();
        } else {
          this._Backup.onError(res.data);
        }
      } catch (e) {
        this._Backup.onError(e);
      }
    },
    onError: (e) => {
      STORE.Alert(ErrorX.Handle(e), "error");
    },
  }

  _IncToggle = async (dbname, f) => {
    console.log(dbname, f);
    let url = DOMAIN + BnRDBInclude;
    let payloadOut = {
      JWT: STORE.user.JWT,
      data: {
        dbname: dbname,
        include: f
      }
    }; 

    try{
      let res = await axios.post(url, payloadOut);
      console.log(BnRDBInclude, res.data);
      let {Success} = res.data;
      if (Success === true) {

        this._GetInfo();

      }else{
        STORE.Alert(LocaleX.Get("__IZO.Alert.UpdateError"), "error");
      }
    }catch(e){
      STORE.Alert(ErrorX.Handle(e), "error");
    }
  }

  _Restore = {
    onClick: (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      STORE.Ask(LocaleX.Get("__IZO.System.Restore"), LocaleX.Get("__IZO.System.RestoreTo", {str: str}), async () => {
        await this._Restore.onSubmit(datestr);
      });
    }, 
    onSubmit: async (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      let url = DOMAIN + BnRRestore;
      let payloadOut = {
        JWT: STORE.user.JWT,
        data: {
          datestr: datestr
        }
      };

      try{
        let res = await axios.post(url, payloadOut);
        console.log(BnRRestore, res.data);
        let {Success} = res.data;
        if (Success === true) {
          STORE.Alert(LocaleX.Get("__IZO.Alert.RestoreSuccess", {str: str}), "success");
          this._GetInfo();
        } else {
          this._Restore.onError(res.data);
        }
      } catch (e) {
        this._Restore.onError(e);
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
      STORE.Ask(LocaleX.Get("__IZO.System.Delete"), LocaleX.Get("__IZO.System.DeleteBackup", {str: str}), async () => {
        await this._Delete.onSubmit(datestr);
      });
    }, 
    onSubmit: async (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      let url = DOMAIN + BnRDelete;
      let payloadOut = {
        JWT: STORE.user.JWT,
        data: {
          datestr: datestr
        }
      };

      try{
        let res = await axios.post(url, payloadOut);
        console.log(BnRDelete, res.data);
        let {Success} = res.data;
        if (Success === true) {
          STORE.Alert(str + " " + LocaleX.Get("__IZO.Alert.DeleteSuccess"), "success");
          this._GetInfo();
        } else {
          this._Delete.onError(res.data);
        }
      } catch (e) {
        this._Delete.onError(e);
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
        <StyledButton 
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
                {LocaleX.Get("__IZO.System.Backup")}
              </Typography>
            </HStack>            
        </StyledButton>
        <Typography>
          {LocaleX.Get("__IZO.System.LastBackup")}
        </Typography>
        <Typography style={{fontWeight: "bold"}}>
          {LastBackup || LocaleX.Get("__IZO.System.NoBackup")}
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
    return (
      <Accessizo reqLevel={0} user={STORE.user}>
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
      </Accessizo>
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
