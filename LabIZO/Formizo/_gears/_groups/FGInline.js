import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Box } from "@mui/material";

import FItem from "../FItem";

import { Accessor } from "IZOArc/STATIC";
import { HStack, Spacer } from "IZOArc/LabIZO/Stackizo";

class FGInline extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    formValue: PropsType.object,
    addOns: PropsType.object
  }

  static defaultProps = {
    //data
    ischema: {},
    formValue: {},
    addOns: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGInline.defaultProps))){
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

  getInlineSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.inline)){
      return ischema.inline(formValue, addOns);
    }
    return ischema.inline;
  }

  renderSchema(){
    // eslint-disable-next-line no-unused-vars
    let {ischema, ...other} = this.props;
    let inlineSchema = this.getInlineSchema();
    return _.map(inlineSchema, (o, i) => {
      return (
        <Box marginX={0.5} width={o.width || "100%"} key={i}>
          <FItem
            key={i}
            ischema={o}
            {...other}/>
        </Box>
        
      );
    });
  }

  render(){
    return (
      <HStack>
        {this.renderSchema()}
        <Spacer/>
      </HStack>
    );
  }

}

export default FGInline;
