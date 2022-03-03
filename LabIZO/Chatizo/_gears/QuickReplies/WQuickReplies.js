import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import Scroller from "IZOArc/LabIZO/Controlizo/Scoller";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";

import _ from "lodash";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { HStack } from "IZOArc/LabIZO/Stackizo";

/**
 * @augments {Component<Props, State>}
 */
class WQuickReplies extends Component {

  static propTypes = {
    _onQuickReply: PropsType.func,
    disabled: PropsType.bool
  }

  static defaultProps = {
    _onQuickReply: () => {},
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WQuickReplies.defaultProps))){
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

  onMountScroll = (callbacks) => {
    this.MountScroll = callbacks;
  }

  scrollLeft = () => {
    this.MountScroll.scroll(-50);
  }

  scrollRight = () => {
    this.MountScroll.scroll(50);
  }

  renderButtons(){
    let {theme, quickReplies, _onQuickReply, onPhoneClick, onWebClick, disabled, addOns} = this.state;
    let rendered = [];

    _.map(quickReplies, (o, i) => {

      let func = null;
      switch (o.type){
        case "web":
          func = () => onWebClick(o.payload);
          break;
        case "phone":
          func = () => onPhoneClick(o.payload);
          break;
        default:
          func = () => _onQuickReply(o);
          break;
      } 

      let textClass = theme + " chatizo-qrbar-btn-text" 
      + (disabled? " disabled" : "")
      + (o.color? (" " + o.color) : "");

      let sTitle = ZFunc.IfFuncExec(o.title, addOns);
      if(_.isString(sTitle)){
        sTitle = (
          <Typography className={textClass}>
            {sTitle}
          </Typography>
        );
      }

      rendered.push(
        <Box key={i} className={theme + " chatizo-qrbar-btn" 
          + (disabled? " disabled" : "") 
          + (o.color? (" " + o.color) : "")}>
          <Holdable onPress={func} disabled={disabled}>
            <HStack>
              {sTitle}
            </HStack>
          </Holdable>
        </Box>
      );
    })

    return rendered;

  }

  renderHandler(direction, func){
    let {theme} = this.props;
    return (
      <div key={direction} className={theme + " chatizo-qrbar-arrows"}>
        <Holdable onHold={func} forceLongPress={false}>
          <i className={"fas fa-chevron-" + direction + " fa-lg"}/>
        </Holdable>
      </div>
    )
  }

  render(){
    let {theme} = this.props;

    return (
      <HStack alignItems="center">
        {this.renderHandler("left", () => this.scrollLeft())}
        <Scroller theme={theme + " chatizo-qrbar-list"} onMounted={this.onMountScroll}>
          {this.renderButtons()}
        </Scroller>
        {this.renderHandler("right", () => this.scrollRight())}
      </HStack>
    )
  }

}

export default WQuickReplies;
