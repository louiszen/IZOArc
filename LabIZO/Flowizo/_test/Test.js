import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";

import data from "./_data";
import Flowizo from "../Flowizo";
import { VStack, HStack } from "IZOArc/LabIZO/Stackizo";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";
import addOns from "./_addOns";

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
    this.setState({
      flowizoData: data
    });
  }

  addQ = () => {
    this.MountFlowizo.AddNode("Rect_YesNo");
  }

  addA = () => {
    this.MountFlowizo.AddNode("Tube_End");
  }

  getData = () => {
    console.log(this.state.flowizoData);
  }


  render(){
    return (
      <VStack>
        <HStack spacing={10}>
          <StyledButton onClick={() => this.addQ()} theme={{color: "yellow"}}>
            {"Add Question"}
          </StyledButton>
          <StyledButton onClick={() => this.addA()} theme={{color: "blue"}}>
            {"Add Answer"}
          </StyledButton>
          <StyledButton onClick={() => this.getData()}  theme={{color: "red"}}>
            {"GetData"}
          </StyledButton>
        </HStack>
        <Flowizo
          defaultData={data}
          onMounted={this.onMountFlowizo}
          onDataUpdated={this.onDataUpdated}
          controlsProps={{}}
          reactFlowProps={{}}
          addOns={addOns}
          />
      </VStack>
      
    );
  }

}

export default Test;
