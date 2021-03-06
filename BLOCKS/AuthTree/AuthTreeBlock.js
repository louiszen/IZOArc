import React, { Component } from "react";

import { Accessor, ColorX } from "IZOArc/STATIC";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";
import { LEDSwitch } from "IZOArc/BLOCKS/Ctrls";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";

import { Typography } from "@mui/material";
import { ArrowRight, ArrowDropDown } from "@mui/icons-material";

import _ from "lodash";
import PropsType from "prop-types";

/**
 * @augments {Component<Props, State>}
 */
class AuthTreeBlock extends Component {

  static propTypes = {
    projID: PropsType.string,
    tree: PropsType.oneOfType([PropsType.object, PropsType.array]),
    ctrl: PropsType.object,
    refCtrl: PropsType.object,
    level: PropsType.string,
    nodeKey: PropsType.string,
    onCtrlSet: PropsType.func,
    parentAccessible: PropsType.bool
  }

  static defaultProps = {
    projID: "",
    tree: {},
    ctrl: {},
    refCtrl: {},
    level: "",
    nodeKey: "",
    onCtrlSet: () => {},
    parentAccessible: true
  }

  constructor(){
    super();
    this.state = {
      show: true
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(AuthTreeBlock.defaultProps))){
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

  renderNextTree(){
    let {tree, ctrl, level, projID, onCtrlSet, refCtrl, parentAccessible} = this.props;
    return _.map(tree, (o, i) => {
      let nextlevel = level + (level === ""? i : ("." + i)); 
      return (
        <VStack height={"fit-content"} key={i} width="100%" alignItems="flex-start">
          <AuthTreeBlock
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
        </VStack>
      );
    });
  }

  toggleShow = () => {
    this.setState((state, props) => ({
      show: !state.show
    }));
  }

  renderToggle(){
    let {show} = this.state;
    return (
      <StyledButton onClick={() => this.toggleShow()} theme={{height: 30}}>
        {show? <ArrowDropDown/> : <ArrowRight/>}
      </StyledButton>
    );
  }

  renderNodeKey(){
    let {nodeKey} = this.props;
    return (
      <HStack width={150} paddingX={1}>
        <Typography style={{color: ColorX.GetColorCSS("blue"), fontSize: 15}}>
          {nodeKey}
        </Typography>
        <Spacer/>
      </HStack>
    );
  }

  renderLED(){
    let {ctrl, level, projID, onCtrlSet, refCtrl, parentAccessible} = this.props;
    let nodeCtrl = ctrl[level];
    let nodeRefCtrl = parentAccessible && (refCtrl !== undefined && refCtrl[level]);
    return (
      <LEDSwitch
        size={20}
        projID={projID}
        field={level}
        ctrl={nodeCtrl}
        refCtrl={nodeRefCtrl}
        onCtrlSet={onCtrlSet}
        />
    );
  }

  renderFunc(){
    let {projID, tree, ctrl, level, onCtrlSet, refCtrl, parentAccessible} = this.props;
    let funcs = _.map(tree, (o, i) => {
      let thisLevel = level + "." + o;
      let nodeCtrl = ctrl[thisLevel];
      let nodeRefCtrl = ctrl[level] && parentAccessible && (refCtrl !== undefined && refCtrl[thisLevel]);
      return (
        <HStack key={i} width="fit-content" height={"fit-content"}
          justifyContent="flex-start">
          <Typography style={{fontSize: 14}}>
            {o}
          </Typography>
          <LEDSwitch
            size={16}
            projID={projID}
            field={thisLevel}
            ctrl={nodeCtrl}
            refCtrl={nodeRefCtrl}
            onCtrlSet={onCtrlSet}
            />
        </HStack>
      );
    });
    return (
      <HStack justifyContent="flex-start" height={"fit-content"}>
        <HStack width="fit-content" 
          justifyContent="flex-start"
          paddingX={1}
          spacing={6}
          style={{
            background: ColorX.GetColorCSS("white"),
            borderRadius: 5,
            flexWrap: "wrap"
          }}>
          {funcs}
        </HStack>
        <Spacer/>
      </HStack>
    );
  }

  renderThisNode(){
    let {tree} = this.props;
    let isEnd = _.isArray(tree);
    return (
      <HStack width="100%" height={"fit-content"} spacing={20} justifyContent="flex-start">
        {this.renderLED()}
        {this.renderNodeKey()}
        <Spacer/>
        {isEnd? this.renderFunc() : this.renderToggle()}
      </HStack>
    );
  }

  render(){
    let {tree} = this.props;
    let {show} = this.state;
    let isEnd = _.isArray(tree);
    return (
      <VStack 
        height={"fit-content"}
        width={"100%"}
        justifyContent="flex-start"
        style={{
          padding: "2px 10px",
          borderRadius: 5,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: ColorX.GetColorCSS("grey", 0.2),
          background: ColorX.GetColorCSS("aliceblue")
        }}>
        {this.renderThisNode()}
        {!isEnd && show && this.renderNextTree()}
      </VStack>
    );
  }

}

export default AuthTreeBlock;
