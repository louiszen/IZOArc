import React, { Component } from "react";

import PropsType from "prop-types";
import { Box } from "@material-ui/core";

import { Accessor } from "IZOArc/STATIC";

/**
 * Flex grow spacer for alignment
 * @augments {Component<Props, State>}
 */
class Spacer extends Component {

  static propTypes = {
    cssPrefix: PropsType.string
  }

  static defaultProps = {
    cssPrefix: "",
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Spacer.defaultProps))){
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
    let {cssPrefix, ...other} = this.props;

    return (
      <Box className={cssPrefix}
        flexGrow={1}
        {...other}
        />
    );
  }

}

export default Spacer;
