import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/system";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";
import { Typography } from "@mui/material";
import { VStack } from "IZOArc/LabIZO/Stackizo";
import _ from "lodash";

/**
 * @augments {Component<Props, State>}
 */
class WMImgButtons extends Component {

  static propTypes = {
    theme: PropsType.string,
    oimgbtns: PropsType.array,
    _onQuickReply: PropsType.func, 
    onPhoneClick: PropsType.func,
    onWebClick: PropsType.func,
    disabled: PropsType.bool
  }

  static defaultProps = {
    theme: "",
    oimgbtns: {},
    _onQuickReply: () => {},
    onPhoneClick: () => {},
    onWebClick: () => {},
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMImgButtons.defaultProps))){
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

  renderImgButtons(){
    let {theme, oimgbtns, _onQuickReply, onPhoneClick, onWebClick, disabled} = this.state;

    let rendered = [];
    _.map(oimgbtns, (o, i) => {
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

      rendered.push(
        <Holdable onPress={func}disabled={disabled} key={i}>
          <VStack className={theme + " chatizo-msg-imgbtn" + (disabled? " disabled" : "")}>
            <Box className={theme + " chatizo-msg-imgbtn-img" + (disabled? " disabled" : "")}>
              <img src={o.image} alt={o.title} draggable={false}/>
            </Box>
            {o.showText &&
              <Typography className={theme + " chatizo-msg-imgbtn-text" + (disabled? " disabled" : "")}>
                {o.title}
              </Typography>
            }
          </VStack>
        </Holdable>
      );
    });

    return rendered;
  }

  render(){
    let {theme} = this.props;
    
    return (
      <Box className={theme + " chatizo-msg-imgbtnlist"}>
        {this.renderImgButtons()}
      </Box>
    );
  }

}

export default WMImgButtons;
