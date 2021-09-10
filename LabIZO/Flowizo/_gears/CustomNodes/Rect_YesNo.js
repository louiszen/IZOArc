import React, { Component } from 'react';
import { Accessor, ColorX } from 'IZOArc/STATIC';
import PropsType from 'prop-types';
import { Handle } from 'react-flow-renderer';
import { Box } from '@material-ui/core';
import { CancelOutlined, CheckCircleOutlined, PlayForWork, Cancel } from '@material-ui/icons';
import { VStack } from 'IZOArc/LabIZO/Stackizo';
import { FFDropdown } from 'IZOArc/LabIZO/Formizo/_gears/_inputs';

/**
 * @augments {Component<Props, State>}
 */
class Rect_YesNo extends Component {

  static propTypes = {
    data: PropsType.object
  }

  static defaultProps = {
    data: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Rect_YesNo.defaultProps))){
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

  renderHandleOverlay(){
    let {id, data} = this.props;
    return [
      <Box 
        key={0}
        style={{
          width: 40,
          height: 40,
          top: 0,
          position: "absolute", 
          left: "50%"
        }}>
        <PlayForWork
          style={{
            width: "100%",
            height: "100%",
            color: ColorX.GetColorCSS("blue"),
            position: "relative",
            left: -20,
            top: -20
          }}/>
      </Box>,
      <Box 
        key={1}
        style={{
          width: 30,
          height: 30,
          bottom: 0,
          position: "absolute", 
          left: "20%"
        }}>
        <CheckCircleOutlined
          style={{
            width: "100%",
            height: "100%",
            color: ColorX.GetColorCSS("green"),
            position: "relative",
            left: -15,
            top: 15
          }}/>
      </Box>,
      <Box 
      key={2}
      style={{
        width: 30,
        height: 30,
        bottom: 0,
        position: "absolute", 
        left: "80%"
      }}>
      <CancelOutlined
        style={{
          width: "100%",
          height: "100%",
          color: ColorX.GetColorCSS("red"),
          position: "relative",
          left: -15,
          top: 15
        }}/>
      </Box>,
      <Box 
        key={"del"}
        style={{
          width: 15,
          height: 15,
          top: -20,
          position: "absolute", 
          right: -20
        }}>
          <Cancel onClick={() => {
            if(data.callback?.onDelete) {
              data.callback.onDelete(id);
            }}}
            style={{
              width: "100%",
              height: "100%",
              
              color: ColorX.GetColorCSS("red"),
              position: "relative",
              left: -15,
              top: 15,
              cursor: "pointer"
            }}
            size="small"/>
      </Box>
    ];
  }

  renderHandle(){
    let {id} = this.props;
    return [
      <Handle
        key={"in"}
        id={"in"}
        type="target"
        position="top"
        style={{ width: 20, height: 20, background: "transparent", borderWidth: 0, top: -5 }}
      />,
      <Handle
        key={"out1"}
        id={"yes"}
        type="source"
        position="bottom"
        style={{ left: "20%", width: 20, height: 20, background: "transparent", borderWidth: 0, bottom: -10 }}
      />,
      <Handle
        key={"out2"}
        id={"no"}
        type="source"
        position="bottom"
        style={{ left: "80%", width: 20, height: 20, background: "transparent", borderWidth: 0, bottom: -10 }}
      />
    ];
  }

  renderDisplay(){
    let {data} = this.props;
    return (
      <VStack>
        <FFDropdown
          ischema={
            {
              label: "Question",
              name: "selected",
              selectRef: "Questions",
              selectCap: "refID",
              selectVal: "refID",
              showTooltip: true,
              selectTip: "description"
            }
          }
          addOns={data.addOns}
          ifieldStyle="outlined"
          />
      </VStack>
    );
  }

  render(){
    return (
      <Box style={{
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 0, 
        width: 300, 
        height: 120, 
        background: ColorX.GetBGColorCSS("lightYellow"),
        }}>
        {this.renderDisplay()}
        {this.renderHandleOverlay()}
        {this.renderHandle()}
      </Box>
    );
  }

}

export default Rect_YesNo;
