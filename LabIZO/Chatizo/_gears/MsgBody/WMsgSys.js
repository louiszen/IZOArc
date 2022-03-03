import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/system";

/**
 * @augments {Component<Props, State>}
 */
class WMsgSys extends Component {

  static propTypes = {
    theme: PropsType.string,
    text: PropsType.oneOfType([PropsType.string, PropsType.func]),
    
    addOns: PropsType.object
  }

  static defaultProps = {
    text: ""
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMsgSys.defaultProps))){
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
    let {theme, text, addOns} = this.props;
    let stext = ZFunc.IfFuncExec(text, addOns);
    return (
      <Box className={theme + " chatizo-msg-system"}>
        {stext}
      </Box>
    );
  }

}

export default WMsgSys;
