import React, { Component } from "react";
import { observer } from "mobx-react";
import { Accessor, ColorX, LocaleX } from "IZOArc/STATIC";
import { VStack, HStack } from "IZOArc/LabIZO/Stackizo";
import {Typography} from "@material-ui/core";
import { LEDz } from "IZOArc/LabIZO/Luminizo";
import Tabbizo from "IZOArc/LabIZO/Tabbizo";

import tabs from "./tabs";
import SUAC from "IZOArc/API/SUAC";
import { Refresh } from "@mui/icons-material";
import { StyledIconButton } from "IZOArc/LabIZO/Stylizo";

/**
 * @augments {Component<Props, State>}
 */
class SysUAC extends Component {

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
      this.getProject();
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(SysUAC.defaultProps))){
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  getProject = async ()  => {
    let res = await SUAC.GetProject();
    let {Success, payload} = res;
    if (Success === true) {
      let { projDoc, userlist, rolelist, grouplist } = payload;
      this.setState({
        projDoc: projDoc,
        userlist: userlist,
        rolelist: rolelist,
        grouplist: grouplist
      });
    }
  }

  _Refresh = async () => {
    await this.getProject();
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  renderRefreshButton(){
    return (
      <StyledIconButton onClick={() => this.getProject()} size="small">
        <Refresh/>
      </StyledIconButton>
    );
  }

  renderProjectTabs(){
    let {projDoc, userlist, rolelist, grouplist} = this.state;
    return (
      <Tabbizo
        tabs={tabs}
        width="100%"
        height="100%"
        panelHeight="100%"
        addOns={{
          projDoc: projDoc, 
          userlist: userlist,
          rolelist: rolelist,
          grouplist: grouplist,
          Refresh: this._Refresh
        }}
        />
    );
  }

  renderProjectStatus(){
    let {projDoc} = this.state;
    let {active} = projDoc;
    return (
      <HStack width="100%" height="fit-content" paddingX={4} justifyContent="flex-start" spacing={20}>
        <HStack width="fit-content" height="fit-content" spacing={20}>
          <HStack width="fit-content">
            <LEDz color={active? "pureGreen": "pureRed"}/>
          </HStack> 
          <Typography style={{
            width: 75, 
            color: ColorX.GetColorCSS(active? "green" : "red"),
            fontWeight: "bold"
            }}>
            {LocaleX.Parse({
              EN: active? "Accessible" : "Inaccessible",
              TC: active? "允許存取" : "禁止存取"
            })}
          </Typography>
        </HStack>
        {this.renderRefreshButton()}
      </HStack>
    );
  }

  renderProjectDetails(){
    let {projDoc} = this.state;
    if(!projDoc) return;
    return (
      <VStack width="100%" height="100%" spacing={10}>
        {this.renderProjectStatus()}
        {this.renderProjectTabs()}
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

export default observer(SysUAC);
