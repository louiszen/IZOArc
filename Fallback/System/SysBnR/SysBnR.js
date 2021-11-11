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
import { Accessor, ColorX, store, ErrorX } from 'IZOArc/STATIC';
import { HStack, Spacer, VStack } from 'IZOArc/LabIZO/Stackizo';
import { StyledButton } from 'IZOArc/LabIZO/Stylizo';

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
    let url = DOMAIN + "/Data/General/Info";
    let payloadOut = {
      JWT: store.user.JWT,
    };

    try{
      console.log("/Data/General/Info", payloadOut);
      let res = await axios.post(url, payloadOut);

      console.log("/Data/General/Info", res.data);

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
        store.Alert("Server return error.", "error")
      }
    } catch (e) {
      console.log(e);
      store.Alert("Cannot connect to Server.", "error")
    }
  }

  _Backup = {
    onClick: () => {
      store.Ask("Backup", "Backup System?", this._Backup.onSubmit);
    }, 
    onSubmit: async () => {
      let url = DOMAIN + "/Data/General/Backup";
      let payloadOut = {
        JWT: store.user.JWT,
      };

      try{
        let res = await axios.post(url, payloadOut);
        console.log(res);
        let {Success} = res.data;
        if (Success === true) {
          store.Alert("Backup Successful.", "success");
          this._GetInfo();
        } else {
          this._Backup.onError(res.data);
        }
      } catch (e) {
        this._Backup.onError(e);
      }
    },
    onError: (e) => {
      store.Alert(ErrorX.Handle(e), "error");
    },
  }

  _IncToggle = async (dbname, f) => {
    console.log(dbname, f);
    let url = DOMAIN + "/Config/Database/Include";
    let payloadOut = {
      JWT: store.user.JWT,
      data: {
        dbname: dbname,
        include: f
      }
    }; 

    try{
      let res = await axios.post(url, payloadOut);
      console.log(res);
      let {Success} = res.data;
      if (Success === true) {

        this._GetInfo();

      }else{
        store.Alert("Cannot Update Doc Status.", "error");
      }
    }catch(e){
      store.Alert(ErrorX.Handle(e), "error");
    }
  }

  _Restore = {
    onClick: (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      store.Ask("Restore", "Restore System to " + str + "?<br/>The current state of the system will be backup-ed automatically.", async () => {
        await this._Restore.onSubmit(datestr);
      });
    }, 
    onSubmit: async (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      let url = DOMAIN + "/Data/General/Restore";
      let payloadOut = {
        JWT: store.user.JWT,
        data: {
          datestr: datestr
        }
      };

      try{
        let res = await axios.post(url, payloadOut);
        console.log(res);
        let {Success} = res.data;
        if (Success === true) {
          store.Alert("Restore Successful to \n" + str + ".", "success");
          this._GetInfo();
        } else {
          this._Restore.onError(res.data);
        }
      } catch (e) {
        this._Restore.onError(e);
      }
    },
    onError: (e) => {
      store.Alert(ErrorX.Handle(e), "error");
    },
  }

  _Delete = {
    onClick: (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      store.Ask("Delete", "Delete Backup " + str + "?", async () => {
        await this._Delete.onSubmit(datestr);
      });
    }, 
    onSubmit: async (datestr) => {
      let mObj = this._dateStrToMomemt(datestr);
      let str = this._momentToDisplay(mObj);
      let url = DOMAIN + "/Data/General/Delete";
      let payloadOut = {
        JWT: store.user.JWT,
        data: {
          datestr: datestr
        }
      };

      try{
        let res = await axios.post(url, payloadOut);
        console.log(res);
        let {Success} = res.data;
        if (Success === true) {
          store.Alert(str + " Successfully Deleted.", "success");
          this._GetInfo();
        } else {
          this._Delete.onError(res.data);
        }
      } catch (e) {
        this._Delete.onError(e);
      }
    },
    onError: (e) => {
      store.Alert(ErrorX.Handle(e), "error");
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
                Backup
              </Typography>
            </HStack>            
        </StyledButton>
        <Typography>
          Last Backup:
        </Typography>
        <Typography style={{fontWeight: "bold"}}>
          {LastBackup || "No Backup Available."}
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
      <Accessizo reqLevel={0} auth={store.user.auth} level={store.user.level}>
        <VStack paddingY={2}>
          <Tablizo 
          width={400} 
          height="100%" 
          density="compact"
          auth={store.user.auth}
          level={store.user.level}
          rowIdAccessor="name"
          schema={schema.database}
          showSelector={false}
          data={dbs}
          addOns={{
            onToggle: this._IncToggle
          }}
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
        auth={store.user.auth}
        level={store.user.level}
        schema={schema.restore}
        showSelector={false}
        data={Backups}
        addOns={{
          Restore: this._Restore.onClick,
          Delete: this._Delete.onClick
        }}
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

export default SysBnR;
