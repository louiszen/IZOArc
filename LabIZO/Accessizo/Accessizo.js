import React, { Component } from "react";

import PropsType from "prop-types";

import { Accessor, AuthX } from "IZOArc/STATIC";

/**
 * Accessizo - Control access with IZO authority tree
 * @augments {Component<Props, State>}
 */
class Accessizo extends Component {

  static propTypes = {
    reqAuth: PropsType.string,
    reqLevel: PropsType.number,
    reqFunc: PropsType.string,
    reqGroup: PropsType.string,
    reqRole: PropsType.string,
    user: PropsType.object
  }

  static defaultProps = {
    reqAuth: "",
    reqLevel: 999,
    reqFunc: "",
    reqGroup: "",
    reqRole: "",
    user: {}
  }

  constructor(){
    super();
    this.state = {
      pass: false
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Accessizo.defaultProps))){
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
    }), () => {
      let {user, reqLevel, reqAuth, reqFunc, reqGroup, reqRole} = this.state;
      this.setState({
        pass: AuthX.IsAccessible(user, reqAuth, reqLevel, reqFunc, reqGroup, reqRole)
      });
    });
  }

  render(){
    let {pass} = this.state;
    if(pass) return this.props.children;
    return <div/>;
  }

}

export default Accessizo;
