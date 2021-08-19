import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PropsType from 'prop-types';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { Typography, Tooltip } from '@material-ui/core';

import MenuButtonList from './MenuButtonList';

import Accessizo from 'IZOArc/LabIZO/Accessizo';
import { HStack, Spacer, VStack } from 'IZOArc/LabIZO/Stackizo';
import { Accessor, store, ColorX } from 'IZOArc/STATIC';
import { StyledButton } from 'IZOArc/LabIZO/Stylizo';
import { HMarquee } from 'IZOArc/LabIZO/Animatizo';

class MenuButton extends Component {

  static propTypes = {
    caption: PropsType.string,
    path: PropsType.string,
    fafa: PropsType.any,
    reqAuth: PropsType.string,
    reqLevel: PropsType.number,
    submenu: PropsType.array,
    mini: PropsType.bool,
    zIndex: PropsType.number
  }

  static defaultProps = {
    caption: "",
    path: "",
    fafa: "",
    reqAuth: "",
    reqLevel: 999,
    submenu: [],
    mini: false,
    zIndex: 50
  }

  constructor(){
    super();
    this.state = {
      openNested: false
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(MenuButton.defaultProps))){
      this._setAllStates();
    }

    if(prevProps.location.pathname !== this.props.location.pathname){
      this.setState({
        inPage: (this.props.location && this.props.location.pathname) === this.props.path
      });
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props
    }), callback);
  }

  _onClick = (path) => {
    this.props.history.push(path);
  }

  openNestedMenu = () => {
    this.setState({
      openNested: true
    });
  }

  closeNestedMenu = () => {
    this.setState({
      openNested: false
    });
  }

  renderButton(){
    let {caption, fafa, location, path, zIndex, mini} = this.props;
    let inPage =  (location && location.pathname).includes(path);
    let inPageTheme = {
      padding: "0 !important",
      borderRadius: "0px",
      textTransform: "none",
      background: ColorX.GetColorCSS("pureWhite"),
      label: ColorX.GetColorCSS("elainOrange"),
      hover: {
        color: ColorX.GetColorCSS("black"),
        background: ColorX.GetColorCSS("pureWhite"),
      },
      position: "relative",
      zIndex: zIndex
    };

    let theme = {
      padding: "0 !important",
      textTransform: "none",
      borderRadius: "0px",
      color: ColorX.GetColorCSS("elainOrange"),
      background: ColorX.GetColorCSS("black"),
      hover: {
        color: ColorX.GetColorCSS("black"),
        background: ColorX.GetColorCSS("pureWhite"),
      },
      position: "relative",
      zIndex: zIndex
    };
    
    return (
      <StyledButton theme={inPage? inPageTheme : theme}>
        <HStack padding={1} width="140px">
          <HMarquee width="90px">
            <Typography style={{fontSize: 14, opacity: store.mini? 0: 1, whiteSpace: "nowrap"}}>
              {caption}
            </Typography>
          </HMarquee>
          <Spacer/>
          <VStack>
            <Spacer/>
            <Tooltip title={mini? caption : ""} aria-label="label" placement="right" arrow={true}>
              <HStack width={24} height={24}>
                <Spacer/>
                { _.isString(fafa)?
                  <i className={fafa}/> : fafa 
                }
                <Spacer/>
              </HStack>
            </Tooltip>
            <Spacer/>
          </VStack> 
        </HStack>
      </StyledButton>
    );
  }

  renderNested(){
    let {submenu, mini, zIndex} = this.props;
    let {openNested} = this.state;
    if(openNested && submenu){
      return (
        <MenuButtonList buttons={submenu} mini={mini} zIndex={zIndex}/>
      );
    }
  }

  renderInner(){
    let {path, disabled} = this.props;
      return (
        <HStack style={{width: "100%", position: "relative"}}
          onClick={(e) => {e.stopPropagation(); if(!disabled){this._onClick(path)}}}
          onMouseEnter={() => {this.openNestedMenu()}}
          onMouseLeave={() => {this.closeNestedMenu()}}
          >
          {this.renderButton()}
          {this.renderNested()}
        </HStack>
      );
    //}
  }

  render(){
    let {caption, reqAuth, reqLevel} = this.props;
    return (
      <Accessizo 
        key={caption}
        reqAuth={reqAuth} 
        reqLevel={reqLevel}
        auth={store.user.authority} 
        level={store.user.level}>
          {this.renderInner()}
      </Accessizo>
    );
  }

}

export default withRouter(observer(MenuButton));
