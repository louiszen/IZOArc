import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { observer } from 'mobx-react';

import { ExitToAppOutlined } from '@material-ui/icons';
import { Box, IconButton, Typography, Tooltip } from '@material-ui/core';

import './Container.css';
import Version from '__Base/version';
import IZOVersion from '../version';

import { Accessor, ColorX, store } from 'IZOArc/STATIC';
import { HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';
import Accessizo from 'IZOArc/LabIZO/Accessizo';
import { IZOTheme, NavbarDis, Project } from '__Base/config';

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
    store.Alert("Logout Successful", "success");
  }

  render(){
    return (
      <Box width="100%" height="30px" bgcolor={ColorX.GetColorCSS(IZOTheme.background, 1)}  paddingRight={2} position="fixed" zIndex="300" overflow="hidden" style={{transition: "top 1s", userSelect: "none"}}>
        <HStack>
          <HStack width="fit-content">
            <Typography style={{marginLeft: 10, fontFamily: "Palanquin", fontSize: 14, fontWeight: "bold", color: ColorX.GetColorCSS(IZOTheme.foreground, 0.2)}}>
              {"IZO"}
            </Typography>
            <Typography style={{marginLeft: 10, fontFamily: "Palanquin", fontSize: 14, color: ColorX.GetColorCSS(IZOTheme.foreground, 0.2)}}>
              {IZOVersion}
            </Typography>
          </HStack>
          <HStack width="fit-content">
            <Typography style={{marginLeft: 30, fontFamily: "Palanquin", fontSize: 14, color: ColorX.GetColorCSS(IZOTheme.foreground, 1)}}>
              {"Logged in as "}
            </Typography>
            <Typography style={{marginLeft: 10, fontFamily: "Palanquin", fontSize: 14, color: ColorX.GetColorCSS(IZOTheme.foreground, 0.8)}}>
              {store.user && store.user.UserDisplayName}
            </Typography>
          </HStack>
          <Spacer/>
          <Accessizo reqLevel={0} auth={store.user.auth} level={store.user.level}>
            <Typography style={{fontFamily: "Palanquin", color: ColorX.GetColorCSS(IZOTheme.foreground, 0.3)}}>
              {"v" + Version}
            </Typography>
          </Accessizo>
          <Box width="fit-content" marginX={3}>
            {Project}
          </Box>
          <Box position="absolute" style={NavbarDis && NavbarDis.style}>
            <img src={NavbarDis && NavbarDis.src} alt="elain" draggable={false}/>
          </Box>
          <Tooltip title="Logout" arrow={true} placement="bottom">
            <IconButton style={{color: ColorX.GetColorCSS(IZOTheme.foreground, 1)}} size="small" onClick={() => this._Logout()}>
              <ExitToAppOutlined/>
            </IconButton>
          </Tooltip>
        </HStack>
      </Box>
    );
  }

}

export default withRouter(observer(NavBar));
