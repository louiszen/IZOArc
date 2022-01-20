import React, { Component } from "react";
import { withRouter } from "react-router";

import { observer } from "mobx-react";

import { ExitToAppOutlined, Cached } from "@mui/icons-material";
import { Tooltip } from "@material-ui/core";
import { Box, IconButton, Typography } from "@mui/material";

import "./Container.css";
import Version from "__SYSDefault/Version";
import { SITEBASE } from "__SYSDefault/Domain";
import { CompanyDis, IZOFontFamily, IZOTheme, NavbarDis, ProjectDis } from "__SYSDefault/Theme";
import IZOVersion from "../version";

import { Accessor, ColorX, STORE } from "IZOArc/STATIC";
import { HStack, Spacer } from "IZOArc/LabIZO/Stackizo";
import Accessizo from "IZOArc/LabIZO/Accessizo";
import LocaleX from "IZOArc/STATIC/LocaleX";
import { BLangToggler } from "IZOArc/BLOCKS/Ctrls";

import SLogin from "../API/SLogin";

class NavBar extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(NavBar.defaultProps))){
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

  _Logout = {
    onClick: () => {
      STORE.Ask(LocaleX.GetIZO("Alert.AskLogout.title"), 
        LocaleX.GetIZO("Alert.AskLogout.message"),
        this._Logout.onConfirm);
    },
    onConfirm: () => {
      STORE.clearUser();
      this.props.history.push("/");
      STORE.Alert(LocaleX.GetIZO("Alert.SuccessLogout"), "success");
    }
  }

  ReloadAuth = async () => {
    await SLogin.RenewAuth();
  }

  renderIZO(){
    let fontCSS = {
      marginLeft: 10, 
      fontFamily: IZOFontFamily, 
      fontSize: 14, 
      color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.3)
    };
    return (
      <HStack width="fit-content">
        <Typography style={{...fontCSS, fontWeight: "bold"}}>
          {"IZO"}
        </Typography>
        <Typography style={fontCSS}>
          {IZOVersion}
        </Typography>
        <Box position="absolute" style={{
          width: 150,
          marginTop: 0,
          opacity: 0.15,
          }}>
          <img src={SITEBASE + "Images/izo.png"} alt="izo" draggable={false}/>
        </Box>
      </HStack>
    );
  }

  renderLogin(){
    let fontCSS = {
      fontFamily: IZOFontFamily, 
      fontSize: 14, 
      color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.8)
    };
    return (
      <HStack width="fit-content">
        <Typography style={{
          width: 80, marginLeft: 30, 
          fontFamily: IZOFontFamily, fontSize: 14, 
          color: ColorX.GetColorCSS(IZOTheme.menuFG, 1),
          textAlign: "right"
          }}>
          {LocaleX.GetIZO("NavBar.LoggedInAs")}
        </Typography>
        <Typography style={{...fontCSS, marginLeft: 10, marginRight: 5}}>
          {STORE.user && STORE.user.UserDisplayName}
        </Typography>
        <Typography style={{...fontCSS, width: 150, marginLeft: 5, marginRight: 5}}>
          {STORE.user && ("[" + LocaleX.Parse(STORE.user.roleName) + "]")}
        </Typography>
        <Tooltip title={LocaleX.GetIZO("NavBar.Reload")}>
          <IconButton size="small" style={{color: ColorX.GetColorCSS(IZOTheme.menuFG, 1)}} onClick={() => this.ReloadAuth()}>
            <Cached/>
          </IconButton>
        </Tooltip>
      </HStack>
    );
  }

  renderVersion(){
    return (
      <Accessizo reqLevel={0} user={STORE.user}>
        <Typography style={{fontFamily: IZOFontFamily, color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.3)}}>
          {"v" + Version}
        </Typography>
      </Accessizo>
    );
  }

  renderProject(){
    return (
      <Box width="fit-content" marginX={3}>
        {ProjectDis}
      </Box>
    );
  }

  renderIcon(){
    if(!NavbarDis) return;
    return (
      <HStack position="absolute" style={NavbarDis.style}>
        {NavbarDis.preRender}
        <Box style={NavbarDis.imgStyle}>
          <img src={NavbarDis.src} alt="izo" draggable={false}/>
        </Box>
        {NavbarDis.postRender}
      </HStack>
    );
  }

  renderCompany(){
    if(!CompanyDis) return;
    return (
      <HStack position="absolute" style={CompanyDis.style}>
        {CompanyDis.preRender}
        <Box style={CompanyDis.imgStyle}>
          <img src={CompanyDis.src} alt="company" draggable={false}/>
        </Box>
        {CompanyDis.postRender}
      </HStack>
    );
  }

  renderLogout(){
    return (
      <Tooltip title={LocaleX.GetIZO("NavBar.Logout")} arrow={true} placement="bottom">
        <IconButton style={{color: ColorX.GetColorCSS(IZOTheme.menuFG, 1)}} size="small" onClick={() => this._Logout.onClick()}>
          <ExitToAppOutlined/>
        </IconButton>
      </Tooltip>
    );
  }

  render(){
    return (
      <Box width="100%" height="30px" bgcolor={ColorX.GetColorCSS(IZOTheme.menuBG, 1)}  paddingRight={2} position="fixed" zIndex="300" overflow="hidden" style={{transition: "top 1s", userSelect: "none"}}>
        <HStack>
          {this.renderIZO()}
          {this.renderLogin()}
          {this.renderCompany()}
          <Spacer/>
          <BLangToggler/>
          {this.renderVersion()}
          {this.renderProject()}
          {this.renderIcon()}
          {this.renderLogout()}
        </HStack>
      </Box>
    );
  }

}

export default withRouter(observer(NavBar));
