import React, { Component } from "react";
import { withRouter } from "react-router";

import { when } from "mobx";
import { observer } from "mobx-react";
import _ from "lodash";
import htmlParser from "html-react-parser";
import { Close } from "@mui/icons-material";
import { Backdrop, Snackbar } from "@material-ui/core";
import { Box, CircularProgress } from "@mui/material";

import Footer from "./Footer";
import Menu from "./Menu";
import NavBar from "./NavBar";
import "./Container.css";

import { IZOTheme } from "__SYSDefault/Theme";
import { StartUp } from "__SYSDefault/StartUp";
import { EnvInfoAPI } from "IZOArc/API/SysAPI";
import { SysConfig } from "__SYSDefault/Config";

import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { SnackAlert, StyledButton, StyledLinearProgress } from "IZOArc/LabIZO/Stylizo";
import { StyledIconButton } from "IZOArc/LabIZO/Stylizo";
import { ColorX, LocaleX, STORE, ReqX } from "IZOArc/STATIC";


class Container extends Component {

  constructor(){
    super();
    this.state = {
      snackOpen: false,
      loadingOpen: false,
      dialogOpen: false,
      backdropOpen: false,
      buttonWidth: "100%"
    };
  }

  componentDidMount(){
    this._setAllStates(() => {
      let {serverCheck} = SysConfig.Settings;
      if(serverCheck){
        this.GetServerDetail();
      }
      _.map(StartUp, (o, i) => {
        o();
      });
    });
  }

  componentDidUpdate(prevProps, prevState){

    let {snackOpen, loadingOpen, dialogOpen, backdropOpen} = this.state;
  
    when(() => snackOpen !== !_.isEmpty(STORE.alert), 
      () => {
        this.setState({
          snackOpen: !_.isEmpty(STORE.alert)
        });
      }
    );

    when(() => loadingOpen !== STORE.loading,
      () => {
        this.setState({
          loadingOpen: STORE.loading
        });
      }
    );

    when(() => dialogOpen !== !_.isEmpty(STORE.ask),
      () => {
        this.setState({
          dialogOpen: !_.isEmpty(STORE.ask)
        });
      }
    );

    when(() => backdropOpen !== !_.isEmpty(STORE.backdrop),
      () => {
        this.setState({
          backdropOpen: !_.isEmpty(STORE.backdrop)
        });
      }
    );
    
    let {loginSys} = SysConfig.Settings;

    if(loginSys){
      let {location} = this.props;
      let isPublic = (location?.pathname) === "/";
      let isLogin = (location?.pathname) === "/Login";
      let isTest = location?.pathname?.startsWith("/Test/");

      if(loginSys && !isPublic && !isLogin && !isTest && (!STORE.isLoggedIn() || !STORE.isInitialized())){
        this.AutoLogout();
      }

      if(loginSys && (isPublic || isLogin) && STORE.isLoggedIn() && STORE.isInitialized()){
        this.AutoLogin();
      }
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

  AutoLogin = () => {
    setTimeout(() => {
      let {FirstPage} = SysConfig.Project;
      this.props.history.push(FirstPage);
      STORE.Alert(LocaleX.GetIZO("Alert.AutoLogin"), "success");
    }, 1000);
  }

  AutoLogout = () => {
    setTimeout(() => {
      STORE.Alert(LocaleX.GetIZO("Alert.Unauthorized"), "warn");
      STORE.clearUser();
      this.props.history.push("/Login");
    }, 1000);
  }

  GetServerDetail = async () => {
    let res = await ReqX.SendBE(EnvInfoAPI, {}, {}, null, 
      () => {
        STORE.Alert(LocaleX.GetIZO("Alert.InternalServerError"), "error");
      },
      () => {
        let {location} = this.props;
        let isPublic = (location?.pathname) === "/";
        let isTest = location?.pathname?.startsWith("/Test/");
  
        STORE.Alert(LocaleX.GetIZO("Alert.CannotConnect"), "error");
        if(!isPublic && !isTest){
          this.AutoLogout();
        }
      }, false, true);

    let {Success, payload} = res;
    if(Success){
      STORE.setServer(payload);
    }
  }

  closeSnack = () => {
    this.setState({
      snackOpen: false
    }, () => {
      setTimeout(() => {
        STORE.clearAlert();
      }, 1000);
    });
  }

  _onOK = async () => {
    if(STORE.ask.onConfirm && _.isFunction(STORE.ask.onConfirm)){
      STORE.SetAskLoading(true);
      let res = await STORE.ask.onConfirm();
      if (STORE.ask.autoClose){
        STORE.SetAskLoading(false);
        if(!res || res.Success === undefined || (res && res.Success)){
          STORE.clearAsk();
        }
      }
    }else{
      STORE.clearAsk();
    }
  }

  _onCancel = async () => {
    if(STORE.ask.onCancel && _.isFunction(STORE.ask.onCancel)){
      STORE.SetAskLoading(true);
      await STORE.ask.onCancel();
      STORE.SetAskLoading(false);
    }
    STORE.clearAsk();
  }

  getTheme = (name, order) => {
    let {buttonWidth} = this.state;
    let borderRadius = "0 0 0 0";
    switch(order){
      case "first": borderRadius = "0 0 0 12px"; break;
      case "last": borderRadius = "0 0 12px 0"; break;
      case "only": borderRadius = "0 0 12px 12px"; break;
      default: break;
    }

    let theme = {};
    switch(name){
      case "OK":
        theme = {
          color: "green", 
          background: ColorX.GetColorCSS("transparent"), 
          width: buttonWidth,
          borderRadius: borderRadius,
          margin: "0",
          disabled: {
            color: ColorX.GetColorCSS("grey")
          }
        };
        break;
      case "Cancel":
        theme = {
          color: "red", 
          background: ColorX.GetColorCSS("transparent"), 
          width: buttonWidth,
          borderRadius: borderRadius,
          disabled: {
            color: ColorX.GetColorCSS("grey")
          }
        };
        break;
      default: break;
    }
    return theme;
  }

  getOnClick = (name) => {
    let func = () => {};
    switch(name){
      case "OK": func = this._onOK; break;
      case "Cancel": func = this._onCancel; break;
      default: break;
    }
    return func;
  }

  getIcon = (name) => {
    let icon = <div/>;
    switch(name){
      case "OK": icon = <i className="fas fa-check"/>; break;
      case "Cancel": icon = <i className="fas fa-ban"/>; break;
      default: break;
    }
    return icon;
  }

  getContent = (name) => {
    let content = <div/>;
    switch(name){
      case "OK": content = (
        <div className="formizo-h-m">
          {LocaleX.GetIZO("Formizo.Confirm")}
        </div>
      ); break;
      case "Cancel": content = (
        <div className="formizo-h-m">
          {LocaleX.GetIZO("Formizo.Cancel")}
        </div>
      ); break;
      default: break;
    }
    return content;
  }

  getJSX = (i, name, order) => {
    let theme = this.getTheme(name, order);
    let func = this.getOnClick(name);
    let content = this.getContent(name);
    let icon = this.getIcon(name);
    return (
      <StyledButton key={i} theme={theme}
        onClick={func} 
        disabled={STORE.ask.loading}>
        {icon}
        {content}
      </StyledButton>
    );
  }

  renderButtons(){
    return _.map(STORE.ask.buttons, (o, i) => {
      let order = "middle";
      if(i===0 && STORE.ask.buttons.length === 1) order = "only";
      else if (i===0) order = "first";
      else if(i===STORE.ask.buttons.length - 1) order = "last";

      if(_.isString(o))
        return this.getJSX(i, o, order);
    });
  }

  renderBackDrop(justifyContent = "center"){
    if(STORE.backdrop){
      let {render, addOns} = STORE.backdrop;
      return (
        <VStack width="100%" justifyContent={justifyContent}>
          {_.isFunction(render) && render(addOns)}
        </VStack>
      );
    }
  }

  renderDialog(){
    let title = STORE.ask.title;
    if(_.isString(title)){
      title = htmlParser(title);
    }
    let message = STORE.ask.message;
    if(_.isFunction(message)){
      message = message();
    }
    if(_.isString(message)){
      message = htmlParser(message);
    }

    return (
      <Box bgcolor={ColorX.GetColorCSS(IZOTheme.popupBG)}
        borderRadius={3} 
        boxShadow={"0px 0px 2px 2px " + ColorX.GetColorCSS(IZOTheme.popupFG, 0.2)}
        minWidth={300}
        maxWidth={420}
        color={ColorX.GetColorCSS(IZOTheme.popupFG)}
        >
        <VStack width="100%">
          <HStack>
            <Box fontSize="large" 
              fontWeight="bold" 
              textAlign="left" 
              width="100%"
              marginBottom={1}
              padding={1}
              bgcolor={ColorX.GetColorCSS(IZOTheme.popupTitleBG)}
              color={ColorX.GetColorCSS(IZOTheme.popupTitleFG)}>
              {title}
            </Box>
            <Spacer/>
            { STORE.ask.showCloseIcon && 
              <StyledIconButton onClick={() => STORE.clearAsk()}
                theme={{label: ColorX.GetColorCSS(IZOTheme.popupFG), width: 24}}>
                <Close/>
              </StyledIconButton>
            }
          </HStack>
          <Box style={{fontFamily: "Arial"}}
            fontSize="normal" 
            textAlign="left" 
            width="100%"
            marginY={1}
            padding={1}>
            {message}
          </Box>
          <StyledLinearProgress 
            theme={{
              bar: ColorX.GetColorCSS(IZOTheme.popupFG, STORE.ask.loading? 0.5 : 0.0),
              background: ColorX.GetColorCSS(IZOTheme.popupFG, STORE.ask.loading? 0.2 : 0.0)
              }}/>
          {STORE.ask.inner && STORE.ask.inner(STORE.ask.loading)}
          {STORE.ask.buttons && STORE.ask.buttons.length > 0 &&
          <HStack 
            marginTop={2}
            bgcolor={ColorX.GetColorCSS(IZOTheme.popupBtnBG)}
            spacing={0}>
            {this.renderButtons()}
          </HStack>}
        </VStack>
      </Box>
    );
  }

  SnackDuration = () => {
    if(!STORE.alert || !STORE.alert.severity) return 3000;
    switch(STORE.alert.severity){
      default: case "success": return 3000;
      case "warn": case "warning": return 6000;
      case "info": return 4000;
      case "error": return 6000;
    }
  }

  render(){
    let {snackOpen, loadingOpen, dialogOpen, backdropOpen} = this.state;
    let {location} = this.props;
    let isPublic = (location && location.pathname) === "/";
    let isLogin = (location && location.pathname) === "/Login";
    let isTest = (location && location.pathname).startsWith("/Test/");
    let {hasContainer} = SysConfig.Settings;
    let isContained = hasContainer && !isPublic && !isTest && !isLogin && STORE.isLoggedIn();

    return (
      <Box className="container" height="100%">
        {isContained && <Menu/>}
        {isContained && <NavBar/>}
        <Box className="main-content"
          paddingTop={isContained? "30px" : 0}
          paddingLeft={isContained? "40px" : 0}
          paddingBottom={isContained? "5px" : 0}
          height="100vh">
          {this.props.children}
        </Box>
        <Snackbar open={snackOpen} autoHideDuration={this.SnackDuration()} onClose={this.closeSnack}>
          <SnackAlert 
            message={STORE.alert && STORE.alert.message}
            severity={STORE.alert && STORE.alert.severity} 
            onClose={this.closeSnack}/>
        </Snackbar>
        <Backdrop open={loadingOpen} style={{zIndex: 500, color: ColorX.GetColorCSS(IZOTheme.menuFG)}}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Backdrop open={dialogOpen} style={{zIndex: 500, color: ColorX.GetColorCSS(IZOTheme.menuFG)}}>
          {this.renderDialog()}
        </Backdrop>
        <Backdrop open={backdropOpen} style={{zIndex: 500, color: ColorX.GetColorCSS(IZOTheme.menuFG)}} onClick={() => STORE.clearBackdrop()}>
          {this.renderBackDrop()}
        </Backdrop>
        {isContained && <Footer/>}
      </Box>
      
    );
  }

}

export default withRouter(observer(Container));
