import React, { Component } from "react";
import { Accessor, AuthX, LocaleX, STORE } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Typography } from "@mui/material";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import _ from "lodash";
import { IZOFontFamily } from "__SYSDefault/Theme";
import Tablizo from "IZOArc/LabIZO/Tablizo";

import schema from "./schema";
import SUAC from "IZOArc/API/SUAC";
import { Denied } from "IZOArc/Fallback";

/**
 * @augments {Component<Props, State>}
 */
class APIAvail extends Component {

  static propTypes = {
    projDoc: PropsType.object,
    onUpdate: PropsType.func
  }

  static defaultProps = {
    projDoc: {},
    onUpdate: () => {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates(() => {
      this.getAPITable();
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(APIAvail.defaultProps))){
      this._setAllStates(() => {
        this.getAPITable();
      });
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

  Refresh = async () => {
    let {onUpdate} = this.props;
    await onUpdate();
  }

  ToggleCtrl = async (_, api, ctrl) => {
    let {onUpdate} = this.props;
    let res = await SUAC.SetProjectAPIActive(api, ctrl);
    if(res.Success){
      await onUpdate();
    }
  }

  getAPITable = () => {
    let {projDoc} = this.props;
    let data = _.map(projDoc.SYSAPI, (o, i) => {
      let accessor = o.replaceAll("/", ".");
      let req = Accessor.Get(projDoc.SYSReqAuth, accessor);
      let ctrl = projDoc.SYSAPICtrl[o];
      return {
        _id: o,
        api: o,
        ctrl: ctrl,
        req: req
      };
    });
    this.setState({
      APIData: data
    });
  }

  renderAPIList(){
    let {APIData} = this.state;
    return (
      <VStack padding={1} width="100%" height="100%">
        <Tablizo
          height={"100%"}
          schema={schema.Table}
          data={APIData}
          user={STORE.user}
          defaultPageSize={100}
          density="compact"
          addOns={{
            Refresh: this.Refresh,
            onCtrlSet: this.ToggleCtrl
          }}
          lang={STORE.lang}
          showSelector={false}
          />
      </VStack>
    );
  }

  renderTitle(){
    return (
      <HStack width="100%" height="fit-content" padding={1}>
        <Typography style={{
          fontFamily: IZOFontFamily,
          fontSize: 20,
          fontWeight: "bold"
          }}>
          {LocaleX.Parse({
            EN: "All Connectable Endpoints",
            TC: "所有可連結接口"
          })}
        </Typography>
        <Spacer/>
      </HStack>
    );
  }

  render(){
    if(!AuthX.IsAccessibleQ("System.UAC.API")) return <Denied/>;
    return (
      <VStack width="100%" height="100%">
        {this.renderTitle()}
        {this.renderAPIList()}
      </VStack>
    );
  }

}

export default APIAvail;
