import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';

import FItem from '../FItem';

import { Accessor } from 'IZOArc/STATIC';
import { HStack, VStack } from 'IZOArc/LabIZO/Stackizo';

class FGColumns extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
  }

  static defaultProps = {
    ischema: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGColumns.defaultProps))){
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

  renderColumns(){
    let {ischema} = this.state;
    return _.map(ischema.columns, (o, i) => {
      return (
        <VStack key={i} width={o.width} height={ischema.height} paddingX={o.paddingX || 1} flexGrow={1} overflow={"auto"}>
          {this.renderSchema(o.page)}
        </VStack>
      );
    });
  }

  render(){
    let {ischema} = this.state;
    if(!ischema) return null;
    return (
      <HStack alignItems={"flex-start"} height="100%" overflow="hidden">
        {this.renderColumns()}
      </HStack>
    );
  }

}

export default FGColumns;
