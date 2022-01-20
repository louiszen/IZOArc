import React, { Component } from "react";

import tabs from "./tabs";

import { Accessor, AuthX, QsX, STORE } from "IZOArc/STATIC";
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
    this._setAllStates(() => {
      let qs = QsX.Parse(this.props.location.search);
      if(qs.p){
        this.setDefaultTab(qs.p);
      }
    });
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

  setDefaultTab = (t) => {
    this.setState({
      defaultTab: Number(t)
    });
  }

  render(){
    if(!AuthX.IsAccessibleQ("System")) return <Denied/>;
    if(!this.state) return <div/>;
    let {defaultTab} = this.state;
    let {location} = this.props;
    return (
      <Tabbizo tabs={tabs} height="100%" panelHeight="100%" addOns={{lang: STORE.lang, location: location}} defaultTab={defaultTab}/>
    );
  }

}

export default observer(System);
