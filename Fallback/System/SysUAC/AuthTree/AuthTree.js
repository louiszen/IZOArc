import React, { Component } from "react";
import { Accessor, AuthX, LocaleX, STORE } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Typography } from "@mui/material";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { IZOFontFamily } from "__SYSDefault/Theme";
import { AuthTreeNode } from "IZOArc/BLOCKS/AuthTree";
import SUAC from "IZOArc/API/SUAC";
import { Denied } from "IZOArc/Fallback";

/**
 * @augments {Component<Props, State>}
 */
class AuthTree extends Component {

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
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(AuthTree.defaultProps))){
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

  Refresh = async () => {
    let {onUpdate} = this.props;
    await onUpdate();
  }

  ToggleCtrl = async (_, level, value) => {
    if(!AuthX.PassF("System.UAC.AuthTree", "Edit")){
      STORE.Alert(LocaleX.GetIZO("Alert.NoAuthority"), "error");
      return;
    }
    let res = await SUAC.SetTreeNodeActive(level, value);
    if(res.Success){
      this.Refresh();
    }
  }

  renderAuthTree(){
    let {projDoc} = this.props;
    let {SYSAuth, SYSAuthCtrl} = projDoc;
    if(!SYSAuth || !SYSAuthCtrl) return;
    let authtree = SYSAuth.AuthTree;
    let authtreeCtrl = SYSAuthCtrl.AuthTree;
    return (
      <VStack paddingBottom={1} paddingX={1} alignItems="flex-start" 
        flexGrow={1}
        maxHeight={"75vh"}
        width={650} style={{
          overflow: "auto"
          }}>
        <AuthTreeNode 
          tree={authtree} 
          ctrl={authtreeCtrl} 
          onUpdate={this.Refresh}
          onCtrlSet={this.ToggleCtrl}
          />
      </VStack>
    );
  }

  renderTitle(){
    return (
      <HStack width="100%" padding={1}>
        <Typography style={{
          fontFamily: IZOFontFamily,
          fontSize: 20,
          fontWeight: "bold"
          }}>
          {LocaleX.Parse({
            EN: "Entire Authority Tree",
            TC: "???????????????"
          })}
        </Typography>
        <Spacer/>
      </HStack>
    );
  }

  render(){
    if(!AuthX.Pass("System.UAC.AuthTree")) return <Denied/>;
    return (
      <VStack 
        height="100%"
        alignItems="flex-start" 
        paddingX={2} paddingBottom={3}>
        {this.renderTitle()}
        {this.renderAuthTree()}
      </VStack>
    );
  }

}

export default AuthTree;
