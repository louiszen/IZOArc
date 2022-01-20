import React, { Component } from "react";

import { Accessor } from "IZOArc/STATIC";
import { VStack } from "IZOArc/LabIZO/Stackizo";

import _ from "lodash";
import PropsType from "prop-types";

import AuthTreeBlock from "./AuthTreeBlock";

/**
 * @augments {Component<Props, State>}
 */
class AuthTreeNode extends Component {

  static propTypes = {
    projID: PropsType.string,
    tree: PropsType.object,
    ctrl: PropsType.object,
    refCtrl: PropsType.object,
    level: PropsType.string,
    onCtrlSet: PropsType.func,
    parentAccessible: PropsType.bool
  }

  static defaultProps = {
    projID: "",
    tree: {},
    ctrl: {},
    refCtrl: {},
    level: "",
    onCtrlSet: () => {},
    parentAccessible: true
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(AuthTreeNode.defaultProps))){
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

  renderBlockList(){
    let {tree, ctrl, level, projID, onCtrlSet, refCtrl, parentAccessible} = this.props;
    return _.map(tree, (o, i) => {
      let nextlevel = level + (level === ""? i : ("." + i)); 
      return (
        <AuthTreeBlock
          key={i}
          tree={o}
          ctrl={ctrl}
          refCtrl={refCtrl}
          level={nextlevel}
          projID={projID}
          nodeKey={i}
          onCtrlSet={onCtrlSet}
          parentAccessible={parentAccessible && ctrl[nextlevel] 
            && (refCtrl !== undefined && refCtrl[nextlevel])}
          />
      );
    });
  }

  render(){
    return (
      <VStack height="100%" alignItems="flex-start" width="100%">
        {this.renderBlockList()}
      </VStack>
    );
  }

}

export default AuthTreeNode;
