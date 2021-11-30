import React, { Component } from "react";

import schema from "./_schema";

import Stepizo from "IZOArc/LabIZO/Stepizo";
import { Accessor } from "IZOArc/STATIC";
import { VStack } from "IZOArc/LabIZO/Stackizo";

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

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  _onStepChange = (step) => {
    this.setState({
      activeStep: step
    });
  }

  onMountStepizo = (callbacks) => {
    this.MountStepizo = callbacks;
  }

  render(){
    return (
      <VStack padding={1}>
        <Stepizo
          steps={schema.simple}
          activeStep={this.state.activeStep}
          onMounted={this.onMountStepizo}
          onStepChange={this._onStepChange}
          stepWidth={100}
          />
      </VStack>
    );
  }

}

export default Test;
