import React, { Component } from 'react';

import { Cancel, CheckCircle } from '@material-ui/icons';
import { IconButton, Tooltip } from '@material-ui/core';

import { Accessor, ColorX } from 'IZOArc/STATIC';
import { HStack } from 'IZOArc/LabIZO/Stackizo';

class SysDBInc extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(SysDBInc.defaultProps))){
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

  _onToggle = (f) => {
    let {dbname, onToggle} = this.props;
    if(onToggle){
      onToggle(dbname, f);
    }
  }

  render(){
    let {included} = this.props;
    return (
      <HStack>
        <Tooltip title={included? "Exclude" : "Include"} arrow={true} placement="top">
          <IconButton
            onClick={() => {this._onToggle(!included);}}
            style={{color: ColorX.GetColorCSS(included ? "green" : "lightGrey")}}>
            {included ? <CheckCircle/> : <Cancel/>}
          </IconButton>
        </Tooltip>
      </HStack> 
    );
  }

}

export default SysDBInc;
