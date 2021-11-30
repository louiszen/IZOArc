import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Collapse } from "@material-ui/core";
import { KeyboardArrowDown, KeyboardArrowRight } from "@material-ui/icons";

import FItem from "../FItem";

import { Accessor } from "IZOArc/STATIC";
import { HStack, VStack, Spacer } from "IZOArc/LabIZO/Stackizo";
import { OutlinedBox, StyledButton } from "IZOArc/LabIZO/Stylizo";

class FGCollapse extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    formValue: PropsType.object,
    addOns: PropsType.object
  }

  static defaultProps = {
    ischema: {},
    formValue: {},
    addOns: {}
  }

  constructor(){
    super();
    this.state = {
      open: true
    };
  }

  componentDidMount(){
    this._setAllStates(() => {
      let {ischema} = this.state;
      this.setState({
        open: ischema.defaultShow
      });
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGCollapse.defaultProps))){
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

  onToggle = () => {
    this.setState((state, props) => ({
      open: !state.open
    }));
  }

  getCollapseSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.collapse)){
      return ischema.collapse(formValue, addOns);
    }
    return ischema.collapse;
  }

  renderSchema(){
    // eslint-disable-next-line no-unused-vars
    let {ischema, ...other} = this.props;
    let collapseSchema = this.getCollapseSchema();
    return _.map(collapseSchema, (o, i) => {
      return (
        <FItem
          key={i}
          ischema={o}
          {...other}/>
      );
    });
  }

  renderInside(){
    let {ischema, open, formValue, addOns} = this.state;
    let label = _.isFunction(ischema.label)? ischema.label(formValue, addOns) : ischema.label;
    return (
      <VStack style={{width: "100%"}}>
        <StyledButton theme={{
            width:"100%"
          }} 
          onClick={() => this.onToggle()}>
          <HStack>
            {label}
            {
              open? <KeyboardArrowDown/>
              : <KeyboardArrowRight/> 
            }
            <Spacer/>
          </HStack>
        </StyledButton>
        <Collapse in={open} style={{width:"100%"}}>
          {this.renderSchema()}
        </Collapse>
      </VStack>
    );
  }

  render(){
    let {ischema} = this.state;
    if(!ischema) return null;

    let ifoldStyle = ischema.foldStyle || "outlined";
    switch(ifoldStyle){
      case "outlined": 
        return (
          <OutlinedBox>
            {this.renderInside()}
          </OutlinedBox>
        );
      case "none":
        return this.renderInside();
      default:
        return (
          <OutlinedBox>
            {this.renderInside()}
          </OutlinedBox>
        );
    }
    
  }

}

export default FGCollapse;
