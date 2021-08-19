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

  }

  static defaultProps = {
    //data
    ischema: {}
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

  onChangeTab = (e, tab) => {
    this.setState({
      selectedTab: tab
    });
  }

  renderSchema(page){
    let {ischema, ...other} = this.props;
    return _.map(page, (o, i) => {
      return (
        <FItem
          key={i}
          ischema={o}
          {...other}/>
      );
    });
  }

  renderTabPanels(){
    let {ischema, selectedTab} = this.state;
    return _.map(ischema.tabs, (o, i) => {
      return (
        <div key={i} hidden={selectedTab !== i} style={{width: "100%"}}>
          {this.renderSchema(o.page)}
        </div>
      );
    });
  }

  renderTabButtons(){
    let {ischema, auth, level} = this.state;
    return _.map(ischema.tabs, (o, i) => {
      if(Authority.IsAccessible(auth, level, o.reqAuth, o.reqLevel, o.reqFunc)){
        return (
          <Tab key={o.label} label={o.label} icon={o.icon} disabled={o.disabled} style={{minHeight: ischema.height, minWidth: ischema.width}}/>
        );
      }
    });
  }

  render(){
    let {ischema, selectedTab} = this.state;
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
