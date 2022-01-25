import React, { Component } from "react";
import { Accessor, ColorX } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Handle } from "react-flow-renderer";
import { Box } from "@mui/material";
import { Cancel, PlayForWork } from "@mui/icons-material";
import { VStack } from "IZOArc/LabIZO/Stackizo";
import { FFDropdown } from "IZOArc/LabIZO/Formizo/_gears/_inputs";

/**
 * @augments {Component<Props, State>}
 */
class Tube_End extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Tube_End.defaultProps))){
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

  renderDisplay(){
    let {id, data} = this.props;
    return (
      <VStack>
        <FFDropdown
          iname={"selected"}
          ischema={
            {
              label: "Answer Template",
              name: "selected",
              selectRef: "Answers",
              selectCap: "refID",
              selectVal: "refID",
              showTooltip: true,
              selectTip: "description"
            }
          }
          addOns={data.addOns}
          ifieldStyle="outlined"
          _onValueChange={(iname, value, validate, ignoreValidate, visible) => data.callback?.onValueChange(id, iname, value, validate, ignoreValidate, visible)}
          formValue={data}
          />
      </VStack>
    );
  }

  renderHandlerOverlay(){
    let {data, id} = this.props;
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
            top: -20,
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
          <Cancel onClick={() => {if(data.callback?.onDelete) data.callback.onDelete(id);}} 
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
    return [
      <Handle
        key={"in"}
        type="target"
        position="top"
        style={{ width: 20, height: 20, background: "transparent", borderWidth: 0 }}
      />
    ];
  }

  render(){
    return (
      <Box style={{
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5, 
        width: 300, 
        height: 110, 
        background: ColorX.GetBGColorCSS("lightBlue"),
        padding: 12
        }}>
        {this.renderDisplay()}
        {this.renderHandlerOverlay()}
        {this.renderHandle()}
      </Box>
    );
  }

}

export default Tube_End;
