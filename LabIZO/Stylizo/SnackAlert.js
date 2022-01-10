import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { IconButton, Typography } from "@mui/material";
import { Check, Close, ErrorOutlined, InfoOutlined, ReportProblemOutlined } from "@mui/icons-material";

import { Accessor, ColorX } from "IZOArc/STATIC";
import { HStack, VStack } from "IZOArc/LabIZO/Stackizo";

/**
 * Snack Alert for IZO Container
 * @augments {Component<Props, State>}
 */
class SnackAlert extends Component {

  static propTypes = {
    severity: PropsType.string,
    message: PropsType.any,
    onClose: PropsType.func
  }

  static defaultProps = {
    severity: "success",
    message: "",
    onClose: () => {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(SnackAlert.defaultProps))){
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

  _close = () => {
    let {onClose} = this.state;
    if(onClose) onClose();
  }

  bgColor = () => {
    let {severity} = this.state;
    switch(severity){
      default: case "success": return ColorX.GetColorCSS("Success", 0.9);
      case "warn": case "warning": return ColorX.GetColorCSS("Warn", 0.9);
      case "info": return ColorX.GetColorCSS("Info", 0.9);
      case "error": return ColorX.GetColorCSS("Error", 0.9);
    }
  }

  renderIcon(){
    let {severity} = this.state;
    switch(severity){
      default: case "success": return <Check/>;
      case "warn": case "warning": return <ReportProblemOutlined/>;
      case "info": return <InfoOutlined/>;
      case "error": return <ErrorOutlined/>;
    }
  }

  renderClose(){
    return (
      <IconButton onClick={() => this._close()} size="small" style={{color: "white"}}>
        <Close fontSize="small"/>
      </IconButton>
    );
      
  }

  renderInside(){
    let {message} = this.props;
    if(!_.isEmpty(message)){
      let msgs = message.toString().split("\n");
      let jsx = [];
      _.map(msgs, (o, i) => {
        jsx.push(<Typography style={{fontSize: 14}} key={i}>{o}</Typography>);
      });
      return (
        <HStack>
          {this.renderIcon()}
          <VStack marginX={1} spacing={1}>
            {jsx}
          </VStack>
          {this.renderClose()}
        </HStack>
      );
    }
  }

  render(){
    let {message, ...other} = this.props;
    return (
      <HStack
        color="white"
        bgcolor={this.bgColor()}
        padding={!_.isEmpty(message)? 1: 0}
        borderRadius={5}
        boxShadow="0px 1px 2px 1px rgba(0, 0, 0, 0.2)"
        {...other}>
        {this.renderInside()}
      </HStack>
    );
  }

}

export default SnackAlert;
