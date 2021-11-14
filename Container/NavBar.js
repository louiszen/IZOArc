import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { observer } from 'mobx-react';

import { ExitToAppOutlined, Language } from '@material-ui/icons';
import { Box, IconButton, Typography, Tooltip } from '@material-ui/core';

import './Container.css';
import Version from '__SYSDefault/Version';
import IZOVersion from '../version';

import { Accessor, ColorX, store } from 'IZOArc/STATIC';
import { HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';
import Accessizo from 'IZOArc/LabIZO/Accessizo';

import { CompanyDis, IZOFontFamily, IZOTheme, NavbarDis, ProjectDis } from '__SYSDefault/Theme';
import { LocaleConfig } from '__SYSDefault/Locale';
import LocaleX from 'IZOArc/STATIC/LocaleX';

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

  _Logout = () => {
    store.clearUser();
    this.props.history.push("/");
    store.Alert(LocaleX.Get("__IZO.Alert.SuccessLogout"), "success");
  }

  _ToggleLanguage = () => {
    let max = LocaleConfig.length;
    let idx = LocaleConfig.findIndex(o => o.code === store.lang);
    idx += 1;
    if(idx >= max) idx = 0;
    let newLang = LocaleConfig[idx].code;
    store.setLang(newLang);
  }

  renderLocale(){
    let langO = LocaleConfig.find(o => o.code === store.lang);
    let langLabel = langO.caption;
    return (
      <HStack width="fit-content" marginX={5}>
        <Tooltip title={LocaleX.Get("__IZO.NavBar.SwitchLang")} arrow={true} placement="bottom">
          <IconButton style={{color: ColorX.GetColorCSS(IZOTheme.menuFG, 1)}} size="small" onClick={() => this._ToggleLanguage()}>
            <Language/>
          </IconButton>
        </Tooltip>
        <Typography style={{width: 60, marginLeft: 5, fontFamily: IZOFontFamily, fontSize: 14, fontWeight: "bold", color: ColorX.GetColorCSS(IZOTheme.menuFG)}}>
          {langLabel}
        </Typography>
      </HStack>
    );
  }

  renderIZO(){
    return (
      <HStack width="fit-content">
        <Typography style={{marginLeft: 10, fontFamily: IZOFontFamily, fontSize: 14, fontWeight: "bold", color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.3)}}>
          {"IZO"}
        </Typography>
        <Typography style={{marginLeft: 10, fontFamily: IZOFontFamily, fontSize: 14, color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.3)}}>
          {IZOVersion}
        </Typography>
        <Box position="absolute" style={{
          width: 150,
          marginTop: 0,
          opacity: 0.15,
          }}>
          <img src={"/Images/izo.png"} alt="elain" draggable={false}/>
        </Box>
      </HStack>
    )
  }

  renderLogin(){
    return (
      <HStack width="fit-content">
        <Typography style={{
          width: 80, marginLeft: 30, 
          fontFamily: IZOFontFamily, fontSize: 14, 
          color: ColorX.GetColorCSS(IZOTheme.menuFG, 1),
          textAlign: "right"
          }}>
          {LocaleX.Get("__IZO.NavBar.LoggedInAs")}
        </Typography>
        <Typography style={{marginLeft: 10, marginRight: 5, fontFamily: IZOFontFamily, fontSize: 14, color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.8)}}>
          {store.user && store.user.UserDisplayName}
        </Typography>
        <Typography style={{marginLeft: 5, marginRight: 5, fontFamily: IZOFontFamily, fontSize: 14, color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.8)}}>
          {store.user && ("[" + store.user.role + "]")}
        </Typography>
      </HStack>
    );
  }

  renderVersion(){
    return (
      <Accessizo reqLevel={0} user={store.user}>
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
          <img src={NavbarDis.src} alt="elain" draggable={false}/>
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
          <img src={CompanyDis.src} alt="elain" draggable={false}/>
        </Box>
        {CompanyDis.postRender}
      </HStack>
    );
  }

  renderLogout(){
    return (
      <Tooltip title={LocaleX.Get("__IZO.NavBar.Logout")} arrow={true} placement="bottom">
        <IconButton style={{color: ColorX.GetColorCSS(IZOTheme.menuFG, 1)}} size="small" onClick={() => this._Logout()}>
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
          {this.renderLocale()}
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
