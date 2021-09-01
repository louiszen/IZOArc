import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { Paper, Tab, Tabs } from '@material-ui/core';

import FItem from '../FItem';

import { Accessor, Authority } from 'IZOArc/STATIC';
import { VStack } from 'IZOArc/LabIZO/Stackizo';

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
    let {ischema, ...other} = this.props;
    let pageSchema = this.getPageSchema(page);
    return _.map(pageSchema, (o, i) => {
      return (
        <FItem
          key={i}
          ischema={o}
          {...other}/>
      );
    });
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
    let {ischema, auth, level} = this.props;
    let tabSchema = this.getTabSchema();
    return _.map(tabSchema, (o, i) => {
      if(Authority.IsAccessible(auth, level, o.reqAuth, o.reqLevel, o.reqFunc)){
        return (
          <Tab key={o.label} label={o.label} icon={o.icon} disabled={o.disabled} style={{minHeight: ischema.height, minWidth: ischema.width}}/>
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
