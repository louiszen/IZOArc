import React, { Component } from "react";
import { withRouter } from "react-router";

import { when } from "mobx";
import { observer } from "mobx-react";
import _ from "lodash";
import axios from "axios";
import htmlParser from "html-react-parser";
import { Close } from "@material-ui/icons";
import { Backdrop, Box, CircularProgress, Snackbar } from "@material-ui/core";

import Footer from "./Footer";
import Menu from "./Menu";
import NavBar from "./NavBar";
import "./Container.css";

import { IZOTheme } from "__SYSDefault/Theme";
import { DOMAIN } from "__SYSDefault/Domain";
import { FirstPage, hasContainer, loginSys, serverCheck } from "__SYSDefault/Config";
import { StartUp } from "__SYSDefault/StartUp";

import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { SnackAlert, StyledButton, StyledLinearProgress } from "IZOArc/LabIZO/Stylizo";
import { StyledIconButton } from "IZOArc/LabIZO/Stylizo";
import { ColorX, LocaleX, STORE } from "IZOArc/STATIC";
import { EnvInfoAPI } from "__SYSDefault/SysAPI";

class Container extends Component {

  constructor(){
    super();
    this.state = {
      snackOpen: false,
      loadingOpen: false,
      dialogOpen: false,
      backdropOpen: false,
      buttonWidth: "100px"
    };
  }

  componentDidMount(){
    this._setAllStates(() => {
      if(serverCheck){
        this.GetServerDetail();
      }
      _.map(StartUp, (o, i) => {
        o();
      });
    });
  }

  componentDidUpdate(prevProps, prevState){
  
    when(() => this.state.snackOpen !== !_.isEmpty(STORE.alert), 
      () => {
        this.setState({
          snackOpen: !_.isEmpty(STORE.alert)
        });
      }
    );

    when(() => this.state.loadingOpen !== STORE.loading,
      () => {
        this.setState({
          loadingOpen: STORE.loading
        });
      }
    );

    when(() => this.state.dialogOpen !== !_.isEmpty(STORE.ask),
      () => {
        this.setState({
          dialogOpen: !_.isEmpty(STORE.ask)
        });
      }
    );

    when(() => this.state.backdropOpen !== !_.isEmpty(STORE.backdrop),
      () => {
        this.setState({
          backdropOpen: !_.isEmpty(STORE.backdrop)
        });
      }
    );
    
    if(loginSys){
      let {location} = this.props;
      let isPublic = (location && location.pathname) === "/";
      let isLogin = (location && location.pathname) === "/Login";
      let isTest = location && location.pathname && location.pathname.startsWith("/Test/");

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
      this.props.history.push(FirstPage);
      STORE.Alert(LocaleX.Get("__IZO.Alert.AutoLogin"), "success");
    }, 1000);
  }

  AutoLogout = () => {
    setTimeout(() => {
      STORE.Alert(LocaleX.Get("__IZO.Alert.Unauthorized"), "warn");
      STORE.clearUser();
      this.props.history.push("/Login");
    }, 1000);
  }

  GetServerDetail = async () => {
    let url = DOMAIN + EnvInfoAPI;
    
    try{
      let rtn = await axios.post(url);
      console.log(EnvInfoAPI, rtn.data);
      if(rtn.data.Success === true){
        STORE.setServer(rtn.data.payload);
      }else{
        STORE.Alert(LocaleX.Get("__IZO.Alert.InternalServerError"), "error");
      }
    }catch{
      let {location} = this.props;
      let isPublic = (location && location.pathname) === "/";
      let isTest = location && location.pathname && location.pathname.startsWith("/Test/");

      STORE.Alert(LocaleX.Get("__IZO.Alert.CannotConnect"), "error");
      if(!isPublic && !isTest){
        this.AutoLogout();
      }
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

  renderButtons(){
    let {buttonWidth} = this.state;
    let buttonsJSX = {
      "OK":
      <StyledButton className={"formizo-h-m"} key={0} theme={{
          color: "green", 
          background:"white",
          width: buttonWidth,
          disabled: {
            color: ColorX.GetColorCSS("grey"),
            background: ColorX.GetColorCSS("lightGrey")
          }
        }}
        onClick={this._onOK} 
        disabled={STORE.ask.loading}
        >
        <i className="fas fa-check"/><div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.Confirm")}</div>
      </StyledButton>,
      "Cancel":
      <StyledButton className={"formizo-h-m"} key={2} theme={{
          color: "red", 
          background:"white", 
          width: buttonWidth,
          disabled: {
            color: ColorX.GetColorCSS("grey"),
            background: ColorX.GetColorCSS("lightGrey")
          }
        }} 
        onClick={this._onCancel} 
        disabled={STORE.ask.loading}
        >
        <i className="fas fa-ban"/><div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.Cancel")}</div>
      </StyledButton>,
    };

    return _.map(STORE.ask.buttons, (o, i) => {
      if(_.isString(o) && buttonsJSX[o])
        return buttonsJSX[o];
      else{
        return o;
      }
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
    if(_.isString(message)){
      message = htmlParser(message);
    }

    return (
      <Box bgcolor={ColorX.GetColorCSS("darkBox")}
        padding={2}
        borderRadius={5} 
        boxShadow={"0px 0px 2px 2px " + ColorX.GetColorCSS(IZOTheme.menuFG, 0.2)}
        minWidth={250}
        >
        <VStack width="100%">
          <HStack>
            <Box fontSize="large" 
              fontWeight="bold" 
              textAlign="left" 
              width="100%"
              marginBottom={1}>
              {title}
            </Box>
            <Spacer/>
            { STORE.ask.showCloseIcon && 
              <StyledIconButton onClick={() => STORE.clearAsk()}
                theme={{label: ColorX.GetColorCSS(IZOTheme.menuFG), width: 24}}>
                <Close/>
              </StyledIconButton>
            }
          </HStack>
          <Box fontSize="normal" 
            textAlign="left" 
            width="100%"
            marginY={1}>
            {message}
          </Box>
          <StyledLinearProgress 
            theme={{
              bar: ColorX.GetColorCSS(IZOTheme.menuFG, STORE.ask.loading? 0.5 : 0.0),
              background: ColorX.GetColorCSS(IZOTheme.menuFG, STORE.ask.loading? 0.2 : 0.0)
              }}/>
          {STORE.ask.inner && STORE.ask.inner(STORE.ask.loading)}
          {STORE.ask.buttons && STORE.ask.buttons.length > 0 &&
            <HStack marginTop={2}>
              {this.renderButtons()}
            </HStack> 
          }
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
    let isContained = hasContainer && !isPublic && !isTest && !isLogin && STORE.isLoggedIn();

    return (
      <Box className="container" height="100%">
        {isContained && <Menu/>}
        {isContained && <NavBar/>}
        <Box className="main-content"
          paddingTop={isContained? "30px" : 0}
          paddingLeft={isContained? "40px" : 0}
          paddingBottom={"5px"}
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
