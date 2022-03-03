import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/system";

/**
 * @augments {Component<Props, State>}
 */
class WMsgSys extends Component {

  static propTypes = {
    themeCSS: PropsType.object,
    text: PropsType.oneOfType([PropsType.string, PropsType.func]),
    
    addOns: PropsType.object
  }

  static defaultProps = {
    themeCSS: {},
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
    let {themeCSS, text, addOns} = this.props;
    let stext = ZFunc.IfFuncExec(text, addOns);
    return (
      <Box style={themeCSS?.msgbody?.msg?.system}>
        {stext}
      </Box>
    );
  }

}

export default WMsgSys;
