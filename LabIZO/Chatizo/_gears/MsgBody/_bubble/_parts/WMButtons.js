import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { VStack } from "IZOArc/LabIZO/Stackizo";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";
import { Typography } from "@mui/material";

import _ from "lodash";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";

/**
 * @augments {Component<Props, State>}
 */
class WMButtons extends Component {

  static propTypes = {
    themeCSS: PropsType.object,
    buttons: PropsType.array,
    disabled: PropsType.bool,

    _onQuickReply: PropsType.func,
    onWebClicked: PropsType.func,
    onPhoneClicked: PropsType.func,
    buttonWidthFitContent: PropsType.bool,
    
    addOns: PropsType.object
  }

  static defaultProps = {
    themeCSS: {},
    buttons: [],
    disabled: false
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMButtons.defaultProps))){
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

  renderButtons(){
    let {themeCSS, buttons, 
      _onQuickReply, onPhoneClick, onWebClick, 
      disabled, buttonWidthFitContent, addOns} = this.props;

    let rendered = [];
    _.map(buttons, (o, i) => {
      let func = null;
      switch (o.type){
        case 'web':
          func = () => onWebClick(o.payload);
          break;
        case 'phone':
          func = () => onPhoneClick(o.payload);
          break;
        default:
          func = () => _onQuickReply(o);
          break;
      } 

      let node = themeCSS?.msgbody?.msg?.buttons;
      let btnStyle = {...node?.button};
      let btnTextStyle = {...node?.text};

      if(disabled) {
        btnStyle = {...btnStyle, ...node?.disabledButton};
        btnTextStyle = {...btnTextStyle, ...node?.disabledText};
      }

      if(buttonWidthFitContent){
        btnStyle = {...btnStyle, ...node?.fitContent};
      }

      let sTitle = ZFunc.IfFuncExec(o.title, addOns);

      rendered.push(

      );
    })

    return rendered;
  }

  render(){
    let { themeCSS } = this.props;
    return (
      <VStack style={themeCSS?.msgbody?.msg?.buttons?.main}>
        {this.renderButtons()}
      </VStack>
    );
  }

}

export default WMButtons;
