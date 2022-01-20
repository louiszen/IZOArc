import React, { Component } from "react";
import { Accessor, AuthX, ColorX, LocaleX, STORE } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import Formizo from "IZOArc/LabIZO/Formizo";
import BMarkdown from "IZOArc/BLOCKS/Display/BMarkdown";
import Tabbizo from "IZOArc/LabIZO/Tabbizo/Tabbizo";

import tabs from "./tabs/generalTabs";
import * as md from "./md";
import { Box } from "@mui/material";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";
import SUAC from "IZOArc/API/SUAC";
import { Denied } from "IZOArc/Fallback";
/**
 * @augments {Component<Props, State>}
 */
class General extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(General.defaultProps))){
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

  SetProjectActive = {
    onClick: () => {
      let {projDoc} = this.props;
      STORE.Ask(LocaleX.Parse({
        EN: "Allow access",
        TC: "允許存取"
      }), 
      LocaleX.Parse({
        EN: "Do you confirm to allow access right to the project " + projDoc.projectname + "?",
        TC: "你是否確認允許對項目 " + projDoc.projectname + "的存取?"
      }), this.SetProjectActive.onConfirm);
    },
    onConfirm: async () => {
      await SUAC.SetProjectActive(true);
      await this.Refresh();
    },

  }

  SetProjectInactive = {
    onClick: () => {
      let {projDoc} = this.props;
      STORE.Ask(LocaleX.Parse({
        EN: "Deny access",
        TC: "禁止存取"
      }), 
      LocaleX.Parse({
        EN: "Do you confirm to deny access right to the project " + projDoc.projectname + " ?",
        TC: "你是否確認禁止對項目 " + projDoc.projectname + " 的存取?"
      }), this.SetProjectInactive.onConfirm);
    },
    onConfirm: async () => {
      await SUAC.SetProjectActive(false);
      await this.Refresh();
    },
  }

  renderForm(){
    let {projDoc} = this.props;
    return (
      <HStack width={700}>
        <Formizo
          formID="general"
          schema={[
            {
              label: () => LocaleX.Parse({
                EN: "Project Code",
                TC: "項目代號"
              }),
              name: "projectID",
              format: "text"
            },
            {
              label: "APIKEY",
              name: "APIKEY",
              format: "password"
            }
          ]}
          readOnly={true}
          formValue={projDoc}
          buttons={[]}
          labelXS={1}
          fieldXS={8}/>
      </HStack>
    );
  }

  renderButtons(){
    let {projDoc} = this.props;
    if(!AuthX.PassF("System.UAC.General.Edit")) return;
    if(projDoc.active){
      return (
        <StyledButton theme={{
          color: "red",
          hover: {
            color: "white",
            background: ColorX.GetColorCSS("red"),
          }}} 
          style={{width: 150}} 
          onClick={() => this.SetProjectInactive.onClick()}>
          {LocaleX.Parse({
            EN: "Inactivate",
            TC: "停用"
          })}
        </StyledButton>
      );
    }
    return (
      <StyledButton theme={{
        color: "green",
        hover: {
          color: "white",
          background: ColorX.GetColorCSS("green"),
        }}} 
        style={{width: 150}} 
        onClick={() => this.SetProjectActive.onClick()}>
        {LocaleX.Parse({
            EN: "Activate",
            TC: "啟用"
          })}
      </StyledButton>
    );
  }

  renderInfo(){
    return (
      <HStack alignItems="flex-start" paddingTop={1}>
        {this.renderForm()}
        <Spacer/>
        {this.renderButtons()}
      </HStack>
    );
  }

  renderREADME(){
    return (
      <VStack justifyContent="flex-start" alignItems="flex-start" paddingX={2} width="100%"  height="100%">
        <BMarkdown width="100%">
          {md.APIHeader()}
        </BMarkdown>
        <HStack width="100%" alignItems="flex-start" spacing={10} height="100%">
          <Box width="100%">
            <Tabbizo
              tabs={tabs}
              addOns={{lang: STORE.lang}}
              height={"100%"}
              panelHeight={"100%"}
              />
          </Box>
          <Box width="100%">
            <BMarkdown width="100%">
              {md.CommonRtn()}
            </BMarkdown>
          </Box>
        </HStack>
      </VStack>
    );
  }

  render(){
    let {projDoc} = this.props;
    if(!projDoc) return <div/>;
    if(!AuthX.Pass("System.UAC.General")) return <Denied/>;
    return (
      <VStack width="100%" spacing={20} height="100%">
        {this.renderInfo()}
        {this.renderREADME()}
      </VStack>
    );
  }

}

export default General;
