import React, { Component } from 'react';
import { withRouter } from 'react-router';

import { observer } from 'mobx-react';

import { ExitToAppOutlined } from '@material-ui/icons';
import { Box, IconButton, Typography, Tooltip } from '@material-ui/core';

import './Container.css';
import Version from '__Base/version';

import { Accessor, ColorX, store } from 'IZOArc/STATIC';
import { HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';
import Accessizo from 'IZOArc/LabIZO/Accessizo';
import { NavbarDis, Project } from '__Base/config';

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
      <Box width="100%" height="30px" bgcolor="rgba(29, 29, 29, 1)"  paddingRight={2} position="fixed" zIndex="300" overflow="hidden" style={{transition: "top 1s", userSelect: "none"}} >
        <HStack>
          <Box style={{color: "rgba(242, 132, 62, 1)"}} marginLeft={10}>
            {"Logged in as "}
          </Box>
          <Box style={{color: "rgba(242, 132, 62, 0.8)"}} marginLeft={1}>
            {store.user.UserDisplayName}
          </Box>
          <Spacer/>
          <Accessizo reqLevel={0} auth={store.user.auth} level={store.user.level}>
            <Typography style={{color: ColorX.GetColorCSS("elainOrange", 0.3)}}>
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
            <IconButton style={{color: "rgba(242, 132, 62, 1)"}} size="small" onClick={() => this._Logout()}>
              <ExitToAppOutlined/>
            </IconButton>
          </Tooltip>
        </HStack>
      </Box>
    );
  }

}

export default withRouter(observer(NavBar));
