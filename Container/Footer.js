import React, { Component } from 'react';

import { Typography } from '@material-ui/core';

import { IZOTheme, DOMAIN } from '__Base/config';

import Accessizo from 'IZOArc/LabIZO/Accessizo';
import { HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';
import { Accessor, store, ColorX, BrowserX } from 'IZOArc/STATIC';

class Footer extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Footer.defaultProps))){
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

  render(){
    let style = {
      color: ColorX.GetColorCSS(IZOTheme.menuFG), 
      paddingRight: 5,
      fontSize: 9
    };
    return (
      <Accessizo reqLevel={0} auth={store.user.auth} level={store.user.level}>
        <HStack height={15} style={{
          position: "fixed", 
          paddingLeft: 40,
          bottom: 0,
          background: ColorX.GetColorCSS(IZOTheme.menuBG),
          zIndex: 100,
          }}>
          <Typography style={style}>
            {"[" + BrowserX.getBrowser() + "] " + BrowserX.getUserAgent()}
          </Typography>
          <Spacer/>
          <Typography style={style}>
            {DOMAIN}
          </Typography>
        </HStack>
      </Accessizo>
    );
  }

}

export default Footer;
