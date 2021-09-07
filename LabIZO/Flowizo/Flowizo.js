import React, { Component } from 'react';
import { Accessor } from 'IZOArc/STATIC';
import PropsType from 'prop-types';

import ReactFlow from 'react-flow-renderer';

import nodeTypes from './_gears/CustomNodes';

/**
 * @augments {Component<Props, State>}
 */
class Flowizo extends Component {

  static propTypes = {
    onMounted: PropsType.func,
    reactFlowProps: PropsType.object,

    data: PropsType.array,

    customNodeTypes: PropsType.object
  }

  static defaultProps = {
    onMounted: null,
    reactFlowProps: {},
    customNodeTypes: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Flowizo.defaultProps))){
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
    }), () => {
      if(this.props.onMounted){
        this.props.onMounted({
          
        });
      }
      if(callback) callback();
    });
  }

  render(){
    let {data, customNodeTypes, reactFlowProps} = this.props;
    return (
      <ReactFlow
        elements={data}
        nodeTypes={{...nodeTypes, ...customNodeTypes}}
        {...reactFlowProps}
        />
    );
  }

}

export default Flowizo;
