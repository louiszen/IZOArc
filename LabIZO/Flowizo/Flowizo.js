import React, { Component } from 'react';
import { Accessor } from 'IZOArc/STATIC';
import PropsType from 'prop-types';

import ReactFlow, { ControlButton, Controls } from 'react-flow-renderer';

import nodeTypes from './_gears/CustomNodes';
import edgeTypes from './_gears/CustomLine';
import { Box } from '@material-ui/core';
import _ from 'lodash';

/**
 * @augments {Component<Props, State>}
 */
class Flowizo extends Component {

  static propTypes = {
    onMounted: PropsType.func,
    
    defaultData: PropsType.array,

    customNodeTypes: PropsType.object,
    customEdgeTypes: PropsType.object,
    width: PropsType.oneOfType([PropsType.string, PropsType.number]),
    height: PropsType.oneOfType([PropsType.string, PropsType.number]),

    showControl: PropsType.bool,
    controlsProps: PropsType.shape({
      showZoom: PropsType.bool,
      showFitView: PropsType.bool,
      showInteractive: PropsType.bool,
      style: PropsType.object,
      className: PropsType.string,
      onZoomIn: PropsType.func,
      onZoomOut: PropsType.func,
      onFitView: PropsType.func,
      onInteractiveChange: PropsType.func
    }),
    customControls: PropsType.arrayOf(PropsType.shape({
      icon: PropsType.object,
      func: PropsType.func
    })),

    reactFlowProps: PropsType.shape({
      ...ReactFlow.propTypes,
    }),
  }

  static defaultProps = {
    onMounted: null,

    defaultData: [],

    customNodeTypes: {},
    customEdgeTypes: {},
    width: "100%",
    height: "100%",

    showControl: true,

    reactFlowProps: {}
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
      data: props.defaultData
    }), () => {
      if(this.props.onMounted){
        this.props.onMounted({
          
        });
      }
      if(callback) callback();
    });
  }

  _onConnect = ({source, target}) => {
    console.log(source, target);
  }

  AddNode = () => {

  }



  

  renderControl(){
    let {customControls, controlsProps} = this.props;
    let btns = _.map(customControls, (o, i) => {
      return (
        <ControlButton key={i} onClick={() => o.func()}>
          {o.icon}
        </ControlButton>
      );
    });

    return (
      <Controls {...controlsProps}>
        {btns}
      </Controls>
    );
  }

  render(){
    let {customNodeTypes, customEdgeTypes, reactFlowProps, width, height, showControl} = this.props;
    let {data} = this.state;
    return (
      <Box width={width} height={height}>
        <ReactFlow
          elements={data}
          nodeTypes={{...nodeTypes, ...customNodeTypes}}
          edgeTypes={{...edgeTypes, ...customEdgeTypes}}
          onConnect={this._onConnect}
          onSet
          {...reactFlowProps}
          >
          {showControl && this.renderControl()}
        </ReactFlow>
      </Box>
    );
  }

}

export default Flowizo;
