import React, { Component } from "react";
import { Accessor, ColorX } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/material";

/**
 * @augments {Component<Props, State>}
 */
class LEDz extends Component {

  static propTypes = {
    size: PropsType.number,
    color: PropsType.string
  }

  static defaultProps = {
    size: 25,
    color: "pureGreen"
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  shouldComponentUpdate(nextProps, nextState){
    if(!Accessor.IsIdentical(nextProps, this.props, Object.keys(LEDz.defaultProps))){
      return true;
    }
    return false;
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(LEDz.defaultProps))){
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
    let {size, color} = this.props;
    return (
      <Box style={{
        height: size,
        width: size,
        backgroundImage: ColorX.GetLEDLight(color),
        borderRadius: "50%",
        display: "inline-block"
      }}/>
    );
  }

}

export default LEDz;
