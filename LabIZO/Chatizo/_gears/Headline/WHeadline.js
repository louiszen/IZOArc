import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { HStack, Spacer } from "IZOArc/LabIZO/Stackizo";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { MoreVert } from "@mui/icons-material";

/**
 * @augments {Component<Props, State>}
 */
class WHeadline extends Component {

  static propTypes = {
    theme: PropsType.string,
    iconSrc: PropsType.oneOfType([PropsType.func, PropsType.string]),
    text: PropsType.oneOfType([PropsType.string, PropsType.func]),

    addOns: PropsType.object,
  }

  static defaultProps = {
    theme: "",
    iconSrc: "",
    text: "",

    addOns: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WHeadline.defaultProps))){
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

  renderText(){
    let {theme, addOns, text} = this.props;
    text = ZFunc.IfFuncExec(text, addOns);
    return (
      <Typography className={theme + " chatizo-headline-text"}>
        {text}
      </Typography>
    );
  }

  renderIcon(){
    let {theme, addOns, iconSrc} = this.props;
    iconSrc = ZFunc.IfFuncExec(iconSrc, addOns);
    return (
      <Box className={theme + " chatizo-headline-icon"}>
        <img src={iconSrc} alt=""/>
      </Box>
    );
  }

  renderSettings(){
    let {theme} = this.props;
    return (
      <IconButton className={theme + " chatizo-headline-settings"}>
        <MoreVert/>
      </IconButton>
    );
  }

  render(){
    let {theme} = this.props;
    return (
      <HStack className={theme + " chatizo-headline-main"}>
        {this.renderIcon()}
        {this.renderText()}
        <Spacer/>
        {this.renderSettings()}
      </HStack>
    );
  }

}

export default WHeadline;
