import React, { Component } from "react";
import { Accessor, LocaleX, ReqX } from "IZOArc/STATIC";

import { Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import Formizo from "IZOArc/LabIZO/Formizo";

import schema from "./schema";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";
import { STORE } from "../../../STATIC";

import crypto from "crypto";

/**
 * @augments {Component<Props, State>}
 */
class SysDANGER extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(SysDANGER.defaultProps))){
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

  onMountFormizo = (callbacks) => {
    this.MountFormizo = callbacks;
  }

  deleteInit = async () => {
    STORE.Ask(LocaleX.Parse({
      EN: "Confirm",
      TC: "確認"
    }), LocaleX.Parse({
      EN: "Caution: This is irrevertable.",
      TC: "注意: 這操作不可逆轉"
    }), async () => {
      if(!this.MountFormizo) return;
      let formValue = this.MountFormizo.GetForm();

      let password = formValue.password;
      await ReqX.SendBE("/CommonAPI/DANGER/DeleteINITIALIZED", {
        ...formValue,
        password: password
      });
    });
    
  }

  requestOTP = async () => {

    STORE.Ask(LocaleX.Parse({
      EN: "Confirm",
      TC: "確認"
    }), LocaleX.Parse({
      EN: "Confirm to send.",
      TC: "確認傳送"
    }), async () => {
      await ReqX.SendBE("/CommonAPI/DANGER/GetOTP");
    });
  }

  renderDeleteInit(){
    return (
      <StyledButton onClick={this.deleteInit} 
        theme={{
          color: "red"
        }}>
        {LocaleX.Parse({
          EN: "Delete INITIALIZED",
          TC: "刪除 INITIALIZED"
        })}
      </StyledButton>
    );
  }

  renderRequestOTP(addOns){
    return (
      <StyledButton onClick={addOns.requestOTP} 
        theme={{
          color: "blue"
        }}>
        {LocaleX.Parse({
          EN: "Send OTP to Mobile",
          TC: "傳送OTP至手機"
        })}
      </StyledButton>
    );
  }

  renderForm(){
    return (
      <Formizo
        width={700}
        height="fit-content"
        schema={schema}
        buttons={[]}
        onMounted={this.onMountFormizo}
        addOns={{OTP: this.renderRequestOTP, requestOTP: this.requestOTP}}
        />
    );
  }

  render(){
    return (
      <VStack height="100%" spacing={20}>
        <Spacer/>
        {this.renderForm()}
        {this.renderDeleteInit()}
        <Spacer/>
      </VStack>
    );
  }

}

export default SysDANGER;
