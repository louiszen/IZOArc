import React, { Component } from "react";

import tabs from "./tabs";

import { Accessor, Authority } from "IZOArc/STATIC";
import { Denied } from "IZOArc/Fallback";
import { observer } from "mobx-react";
import Tabbizo from "IZOArc/LabIZO/Tabbizo";

/** 
 * Add ~react-tabs.js as tab.js in the same scope
tabs = [
  {
    label: String,
    icon: String | JSX,
    reqAuth: String,
    render: JSX,
    iconPos: "top" | "left" | "right" | "bottom",
    noTransform: Boolean | false,
    spacing: Number | 5,
    alignment: "center" | "left" | "right",
    width: Number | 200,
    height: Number | 20
  }
];
*/

/**
 * @augments {Component<Props, State>}
 */
class System extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(System.defaultProps))){
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
    if(!Authority.IsAccessibleQ("System")) return <Denied/>;
    return (
      <Tabbizo tabs={tabs} height="100%" panelHeight="100%"/>
    );
  }

}

export default observer(System);
