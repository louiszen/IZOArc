import React, { Component } from "react";

import _ from "lodash";
import ReactJson from "react-json-view";
import { Box, Button } from "@material-ui/core";

import schema from "./_schema";
import data from "./_data";

import Formizo from "IZOArc/LabIZO/Formizo";
import { Accessor, STORE } from "IZOArc/STATIC";
import { HStack, VStack } from "IZOArc/LabIZO/Stackizo";
import { BLangToggler } from "IZOArc/BLOCKS";
import { observer } from "mobx-react";

class Test extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {
      tab: "simple",
      vtype: "grid",
      test: Object.keys(schema),
      type: [
        "grid", 
        "standard", 
        "filled", 
        "outlined"
      ],
      value: {}
    };
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

  onSubmit = async (formProps) => {
    console.log(formProps);
    this.setState({
      value: _.clone(formProps)
    });
  }

  onInlineSubmit = async (field, value, props) => {
    console.log(field, value, props);
    this.setState({
      value: props
    });
  }

  onChangeTab = (tab) => {
    this.setState({
      tab
    });
  }

  onChangeType = (vtype) => {
    this.setState({
      vtype
    });
  }

  renderButtons(array, modifier, color, compare){

    let btns = [];

    _.map(array, (o, i) => {
      btns.push (
        <Button 
          key={i}
          className="h-margin" 
          color={color} 
          variant={o === compare ? "contained" : "outlined"}
          onClick={() => modifier(o)}>{o.charAt(0).toUpperCase() + o.slice(1)}</Button>
      );
    });

    return (
      <HStack className="v-margin">
        {btns}
      </HStack>
    );
  }

  render(){
    let {tab, value, test, type, vtype} = this.state;
    console.log(STORE.lang);
    return (
      <VStack overflow={"scroll"} style={{background: "aliceblue"}}>
        <BLangToggler/>
        {this.renderButtons(test, this.onChangeTab, "primary", tab)}
        {this.renderButtons(type, this.onChangeType, "secondary", vtype)}
        <HStack alignItems="flex-start" flexGrow={1} overflow={"scroll"}>
          <Box height="100%" flexGrow={1} style={{background: "white"}}>
            <ReactJson 
              name={false}
              enableClipboard={false}
              src={value}
              style={{height: "100%", overflow: "auto"}}
              />
          </Box>
          <Box width="70vw" height="85vh" style={{background: "aliceblue"}}>
            <Formizo
              width="100%"
              height="100%"
              form="login"
              schema={schema[tab]}
              buttons={["Submit", "Revert", "Clear"]}
              buttonsAlign={"center"}
              onSubmit={this.onSubmit}
              onInlineSubmit={this.onInlineSubmit}
              enableInlineSubmit={false}
              defaultValue={data.defaultV}
              addOns={data.addOns}
              user={{
                level: 1,
                authority: {
                  System: ["*"]
                },
                groups: ["Test"]
              }}
              fieldStyle={vtype}
              fieldSize="small"
              inputColor={{
                text: "red"
              }}
              />
          </Box>
        </HStack>
      </VStack>
    );
  }

}

export default observer(Test);
