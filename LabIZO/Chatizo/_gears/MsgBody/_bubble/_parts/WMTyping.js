import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";

/**
 * @augments {Component<Props, State>}
 */
class WMTyping extends Component {

  static propTypes = {
    theme: PropsType.string
  }

  static defaultProps = {
    theme: ""
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMTyping.defaultProps))){
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
    let {theme} = this.props;
    return (
      <div className={theme + " chatizo-typing"} key={"loading"}>
        <div className={theme + " chatizo-typing-circles"}/>
        <div className={theme + " chatizo-typing-circles"}/>
        <div className={theme + " chatizo-typing-circles"}/>
      </div>
    );
  }

}

export default WMTyping;
