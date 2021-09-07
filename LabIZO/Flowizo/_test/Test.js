import React, { Component } from 'react';
import { Accessor } from 'IZOArc/STATIC';
import PropsType from 'prop-types';

import data from './_data';
import Flowizo from '../Flowizo';

/**
 * @augments {Component<Props, State>}
 */
class Test extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Test.defaultProps))){
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  onMountFlowizo = (callbacks) => {
    this.MountFlowizo = callbacks;
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  render(){
    return (
      <Flowizo
        data={data}
        onMounted={this.onMountFlowizo}
        reactFlowProps={{
          
        }}
        />
    );
  }

}

export default Test;
