import React, { Component } from 'react';
import { Accessor } from 'IZOArc/STATIC';

import data from './_data';
import Flowizo from '../Flowizo';
import { VStack,HStack } from 'IZOArc/LabIZO/Stackizo';
import { StyledButton } from 'IZOArc/LabIZO/Stylizo';

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

  onDataUpdated = (data) => {
    console.log("onDataUpdated");
  }

  addQ = () => {
    this.MountFlowizo.AddNode("Rect_YesNo");
  }

  addA = () => {
    this.MountFlowizo.AddNode("Tube_End");
  }


  render(){
    return (
      <VStack>
        <HStack>
          <StyledButton onClick={() => this.addQ()}>
            {"Add Question"}
          </StyledButton>
          <StyledButton onClick={() => this.addA()}>
            {"Add Answer"}
          </StyledButton>
        </HStack>
        <Flowizo
          defaultData={data}
          onMounted={this.onMountFlowizo}
          onDataUpdated={this.onDataUpdated}
          controlsProps={{}}
          reactFlowProps={{}}
          />
      </VStack>
      
    );
  }

}

export default Test;
