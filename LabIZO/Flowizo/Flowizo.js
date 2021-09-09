import React, { Component } from 'react';
import { Accessor, ColorX } from 'IZOArc/STATIC';
import PropsType from 'prop-types';

import ReactFlow, { 
  ControlButton, 
  Controls, 
  addEdge,
  removeElements,
  isNode
} from 'react-flow-renderer';

import nodeTypes from './_gears/CustomNodes';
import edgeTypes from './_gears/CustomEdges';
import { Box, Typography } from '@material-ui/core';
import _ from 'lodash';
import { v1 } from 'uuid';
import { Close } from '@material-ui/icons';

/**
 * @augments {Component<Props, State>}
 */
class Flowizo extends Component {

  static propTypes = {
    onMounted: PropsType.func,
    onDataUpdated: PropsType.func,
    
    defaultData: PropsType.array,

    customNodeTypes: PropsType.object,
    customEdgeTypes: PropsType.object,
    width: PropsType.oneOfType([PropsType.string, PropsType.number]),
    height: PropsType.oneOfType([PropsType.string, PropsType.number]),

    oneWayIn: PropsType.bool,
    oneWayOut: PropsType.bool,

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
    onDataUpdated: null,

    defaultData: [],

    customNodeTypes: {},
    customEdgeTypes: {},
    width: "100%",
    height: "100%",

    oneWayIn: false,
    oneWayOut: true,

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
      data: this._setCallback(props.defaultData)
    }), () => {
      if(this.props.onMounted){
        this.props.onMounted({
          AddNode: this._AddNode
        });
      }
      if(callback) callback();
    });
  }

  _setCallback = (data) => {
    let rtn = [];
    _.map(data, (o, i) => {
      if(isNode(o)){
        Accessor.Set(o, "data.callback", this._getCallbacks);
      }
      rtn.push(o);
    });
    return rtn;
  }

  _getCallbacks = () => {
    return  {
      onDelete: this._onDelete
    }
  }

  _onDelete = (id) => {
    console.log(id);
    let {data} = this.state;
    let elementsToRemove = _.filter(data, (o, i) => o.id === id || o.source === id || o.target === id);
    console.log(elementsToRemove)
    this.setState((state, props) => ({
      data: removeElements(elementsToRemove, state.data)
    }), () => {
      let {data} = this.state;
      let {onDataUpdated} = this.props;
      if(onDataUpdated){
        onDataUpdated(data);
      }
    });
  }

  IsSourceConnected = (source, sourceHandle) => {
    let {data} = this.state;
    
    for(let i=0; i<data.length; i++){
      if(data[i].source === source && data[i].sourceHandle === sourceHandle){
        return true;
      }
    }
    return false;
  }

  IsTargetConnected = (target, targetHandle) => {
    let {data} = this.state;
    
    for(let i=0; i<data.length; i++){
      if(data[i].target === target && data[i].targetHandle === targetHandle){
        return true;
      }
    }
    return false;
  }

  _onConnect = ({source, sourceHandle, target, targetHandle}) => {
    //Add Edge
    console.log("onConnect");
    let {oneWayIn, oneWayOut} = this.props;

    //Check if the source is connected
    if(oneWayOut && this.IsSourceConnected(source, sourceHandle)){
      return;
    }

    //Check if the target is connected
    if(oneWayIn && this.IsTargetConnected(target, targetHandle)){
      return;
    }


    let strokeColor = ColorX.GetColorCSS("black", 0.75);
    switch(sourceHandle){
      case 'yes': strokeColor = ColorX.GetColorCSS("green", 0.75); break;
      case 'no': strokeColor = ColorX.GetColorCSS("red", 0.75); break;
      default: break;
    }
    
    let id = v1();
    let newEdge = {
      id: id,
      source: source,
      sourceHandle: sourceHandle,
      target: target,
      targetHandle: targetHandle,
      style: {
        stroke: strokeColor,
        strokeWidth: 3
      },
      animated: true
    };

    this.setState((state, props) => ({
      data: addEdge(newEdge, state.data)
    }), () => {
      let {data} = this.state;
      let {onDataUpdated} = this.props;
      if(onDataUpdated){
        onDataUpdated(data);
      }
    });
  }

  _onElementRemove = (param) => {
    console.log(param);
  }

  _AddNode = (type) => {
    let newID = v1();
    let {data} = this.state;

    data.push({
      id: newID,
      type: type,
      data: {
        callback: this._getCallbacks()
      },
      position: { x: Math.random() * 500, y: Math.random() * 500 }
    });

    this.setState((state, props) => ({
      data: removeElements([], state.data)
    }), () => {
      let {data} = this.state;
      let {onDataUpdated} = this.props;
      if(onDataUpdated){
        onDataUpdated(data);
      }
    });

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
          onElementsRemove={this._onElementRemove}
          arrowHeadColor={ColorX.GetColorCSS("green", 0.8)}
          {...reactFlowProps}
          >
          {showControl && this.renderControl()}
        </ReactFlow>
      </Box>
    );
  }

}

export default Flowizo;
