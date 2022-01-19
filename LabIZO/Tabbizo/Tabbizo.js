import React, { Component } from "react";
import PropsType from "prop-types";

import _ from "lodash";
import { Box, Paper, Tab, Tabs, Typography } from "@material-ui/core";

import { Accessor, Authority } from "IZOArc/STATIC";
import { VStack, HStack, Spacer } from "IZOArc/LabIZO/Stackizo";

/** 
 * Add ~react-tabs.js as props "tab"
 * 
 * @typedef {{
 *   label: String,
 *   icon: String | JSX,
 *   reqAuth: String,
 *   render: JSX,
 *   iconPos: "top" | "left" | "right" | "bottom",
 *   noTransform: Boolean | false,
 *   spacing: Number | 5,
 *   alignment: "center" | "left" | "right",
 *   width: Number | 200,
 *   height: Number | 20
 * }} tab
 * 
 * @typedef {[tab]} tabs
 */

/**
 * @augments {Component<Props, State>}
 */
class Tabbizo extends Component {

  static propTypes = {
    addOns: PropsType.object,
    tabs: PropsType.array,
    width: PropsType.oneOfType([PropsType.string, PropsType.number]),
    height: PropsType.oneOfType([PropsType.string, PropsType.number]),
    panelHeight: PropsType.oneOfType([PropsType.string, PropsType.number]),
    defaultTab: PropsType.number
  }

  static defaultProps = {
    addOns: {},
    tabs: [],
    width: "100%",
    height: "100%",
    panelHeight: "100%",
    defaultTab: 0
  }

  constructor(){
    super();
    this.state = {
      selectedTab: 0
    };
  }

  componentDidMount(){
    this._setAllStates(() => {
      this.onChangeTab(null, this.props.defaultTab);
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Tabbizo.defaultProps))){
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

  onChangeTab = (e, tab) => {
    this.setState({
      selectedTab: tab
    });
  }

  renderTabPanels(){
    let {selectedTab} = this.state;
    let {tabs, addOns, panelHeight} = this.props;
    return _.map(tabs, (o, i) => {
      return (
        <Box key={i} hidden={selectedTab !== i} style={{width: "100%", height: panelHeight}}>
          {_.isFunction(o.render)? o.render(addOns) : o.render}
        </Box>
      );
    });
  }

  renderTabButtons(){
    let {tabs} = this.props;
    return _.map(tabs, (o, i) => {
      if(Authority.IsAccessibleQ(o.reqAuth, o.reqLevel, o.reqFunc, o.reqGroup, o.reqRole)){
        let label = _.isFunction(o.label)? o.label() : o.label;
        let icon = o.icon;
        if(o.noTransform){
          label = <Typography style={{textTransform: "none"}}>{label}</Typography>;
        }
        switch(o.iconPos){
          case "top": default: 
            break;
          case "bottom":
            label = <VStack spacing={o.spacing || 5}>{label}{icon}</VStack>; 
            icon = null; break;
          case "left": 
            label = <HStack spacing={o.spacing || 5}>
              {o.alignment === "right" && <Spacer/>}
              {icon}{label}
              {o.alignment === "left" && <Spacer/>}
              </HStack>; 
            icon = null; break;
          case "right":
            label = <HStack spacing={o.spacing || 5}>
              {o.alignment === "right" && <Spacer/>}
              {label}{icon}
              {o.alignment === "left" && <Spacer/>}
              </HStack>; 
            icon = null; break;
        }
        return (
          <Tab key={i} label={label} icon={icon} disabled={o.disabled} style={{minHeight: o.height || 20, minWidth: o.width || 200}}/>
        );
      }
    });
  }

  render(){
    let {selectedTab} = this.state;
    let {width, height, panelHeight} = this.props;
    return (
      <VStack width={width} height={height}>
        <Paper position="static" style={{width: "100%", height: "fit-content"}}>
          <Tabs value={selectedTab} 
            indicatorColor="primary"
            textColor="primary"
            onChange={this.onChangeTab} 
            style={{backgroundColor: "aliceblue", color: "blue", minHeight: 20}}
            variant="scrollable"
            scrollButtons="auto"
            >
            {this.renderTabButtons()}
          </Tabs>
        </Paper>
        <Paper style={{width: "100%", height: panelHeight, background: "transparent", padding: "5px"}}>
          {this.renderTabPanels()}
        </Paper> 
      </VStack>
    );
  }

}

export default Tabbizo;