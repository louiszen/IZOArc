import React, { Component } from 'react';
import { Accessor, ColorX } from 'IZOArc/STATIC';
import PropsType from 'prop-types';
import { Handle } from 'react-flow-renderer';
import { Box, Typography } from '@material-ui/core';
import { AllOutOutlined} from '@material-ui/icons';
import { HStack } from 'IZOArc/LabIZO/Stackizo';
import _ from 'lodash';

/**
 * @augments {Component<Props, State>}
 */
class Tube_Src extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Tube_Src.defaultProps))){
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

  renderInner(){
    let {data, id} = this.props;
    if(_.isFunction(data.inner)){
      return data.inner(id)
    }else if (_.isString(data.inner)){
      return (
        <HStack>
          <Typography>
            {data.inner}
          </Typography>
        </HStack>
      );
    }
    return data.inner;
  }

  renderHandlerOverlay(){
    let {id, data} = this.props;
    return [
      <Box 
        key={0}
        style={{
          width: 30,
          height: 30,
          bottom: 0,
          position: "absolute", 
          left: "50%"
        }}>
        <AllOutOutlined
          style={{
            width: "100%",
            height: "100%",
            
            color: ColorX.GetColorCSS("blue"),
            position: "relative",
            left: -15,
            top: 15,
          }}/>
      </Box>
    ];
  }

  renderHandle(){
    return [
      <Handle
        key={"out"}
        type="source"
        position="bottom"
        style={{ width: 20, height: 20, background: "transparent", borderWidth: 0 }}
      />
    ];
  }

  render(){
    return (
      <Box style={{
        borderRadius: 50, 
        width: 160, 
        height: 60, 
        background: ColorX.GetBGColorCSS("yellow"),
        padding: 12
        }}>
        {this.renderInner()}
        {this.renderHandlerOverlay()}
        {this.renderHandle()}
      </Box>
    );
  }

}

export default Tube_Src;
