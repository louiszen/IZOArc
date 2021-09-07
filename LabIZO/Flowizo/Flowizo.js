import React, { Component } from 'react';
import { Accessor } from 'IZOArc/STATIC';
import PropsType from 'prop-types';

import ReactFlow from 'react-flow-renderer';

import nodeTypes from './_gears/CustomNodes';
import { Box } from '@material-ui/core';

/**
 * @augments {Component<Props, State>}
 */
class Flowizo extends Component {

  static propTypes = {
    onMounted: PropsType.func,
    reactFlowProps: PropsType.object,

    data: PropsType.array,

    customNodeTypes: PropsType.object,
    width: PropsType.oneOf([PropsType.string, PropsType.number]),
    height: PropsType.oneOf([PropsType.string, PropsType.number])
  }

  static defaultProps = {
    onMounted: null,
    reactFlowProps: {},

    data: [],

    customNodeTypes: {},
    width: "100%",
    height: "100%"
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
    let {data, customNodeTypes, reactFlowProps, width, height} = this.props;
    return (
      <Box width={width} height={height}>
        <ReactFlow
          elements={data}
          nodeTypes={{...nodeTypes, ...customNodeTypes}}
          {...reactFlowProps}
          />
      </Box>
    );
  }

}

export default Flowizo;
