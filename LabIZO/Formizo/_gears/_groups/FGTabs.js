import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Paper, Tab, Tabs } from "@material-ui/core";

import FItem from "../FItem";

import { Accessor, Authority } from "IZOArc/STATIC";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { Typography } from "antd";

class FGTabs extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    formValue: PropsType.object,
    addOns: PropsType.object

  }

  static defaultProps = {
    //data
    ischema: {},
    formValue: {},
    addOns: {}
  }

  constructor(){
    super();
    this.state = {
      selectedTab: 0
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGTabs.defaultProps))){
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

  getPageSchema = (page) => {
    let {formValue, addOns} = this.props;
    if(_.isFunction(page)){
      return page(formValue, addOns);
    }
    return page;
  }

  getTabSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.tabs)){
      return ischema.tabs(formValue, addOns);
    }
    return ischema.tabs;
  }

  onChangeTab = (e, tab) => {
    this.setState({
      selectedTab: tab
    });
  }

  renderSchema(page){
    // eslint-disable-next-line no-unused-vars
    let {ischema, ...other} = this.props;
    let pageSchema = this.getPageSchema(page);
    let rtn = [];
    _.map(pageSchema, (o, i) => {
      if(_.isArray(o)){
        _.map(o, (v, w) => {
          rtn.push(
            <FItem
              key={i + "_" + w}
              ischema={v}
              {...other}/>
          );
        });
      }else{
        rtn.push(
          <FItem
            key={i}
            ischema={o}
            {...other}/>
        );
      }
    });
    return rtn;
  }

  renderTabPanels(){
    let { selectedTab} = this.state;
    let tabSchema = this.getTabSchema();
    return _.map(tabSchema, (o, i) => {
      return (
        <div key={i} hidden={selectedTab !== i} style={{width: "100%"}}>
          {this.renderSchema(o.page)}
        </div>
      );
    });
  }

  renderTabButtons(){
    let {ischema, user} = this.props;
    let tabSchema = this.getTabSchema();
    return _.map(tabSchema, (o, i) => {
      if(Authority.IsAccessible(user, o.reqAuth, o.reqLevel, o.reqFunc, o.reqGroup, o.reqRole)){
        let label = o.label;
        let icon = o.icon;
        if(o.noTransform){
          label = <Typography style={{textTransform: "none"}}>{o.label}</Typography>;
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
          <Tab key={i} label={label} icon={icon} disabled={o.disabled} style={{minHeight: ischema.height, minWidth: ischema.width}}/>
        );
      }
    });
  }

  render(){
    let {selectedTab} = this.state;
    let {ischema} = this.props;
    if(!ischema) return null;

    ischema.height = ischema.height || 20;
    return (
      <VStack width="100%">
        <Paper position="static" style={{width: "100%"}}>
          <Tabs value={selectedTab} 
            indicatorColor="primary"
            textColor="primary"
            onChange={this.onChangeTab} 
            style={{backgroundColor: "aliceblue", color: "blue", minHeight: ischema.height}}
            variant="scrollable"
            scrollButtons="auto"
            >
            {this.renderTabButtons()}
          </Tabs>
        </Paper>
        <Paper style={{width: "100%", background: "transparent", padding: "0 5px"}}>
          {this.renderTabPanels()}
        </Paper> 
      </VStack>
    );
  }

}

export default FGTabs;
