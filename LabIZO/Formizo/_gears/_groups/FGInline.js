import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { Box } from '@material-ui/core';

import FItem from '../FItem';

import { Accessor } from 'IZOArc/STATIC';
import { HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';

class FGInline extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
  }

  static defaultProps = {
    //data
    ischema: {},
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGInline.defaultProps))){
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

  renderSchema(){
    let {ischema, ...other} = this.props;
    return _.map(ischema.inline, (o, i) => {
      return (
        <Box marginX={0.5} width="100%" key={i}>
          <FItem
            key={i}
            ischema={o}
            {...other}/>
        </Box>
        
      );
    });
  }

  render(){
    return (
      <HStack>
        {this.renderSchema()}
        <Spacer/>
      </HStack>
    );
  }

}

export default FGInline;
