import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Box } from "@mui/material";

import FField from "./FField";
import {FGAccess, FGInline, FGArray, 
  FGFold, FGCollapse, FGTabs, FGColumns, FGBox, FGTable} from "./_groups";

import { Accessor, ZFunc } from "IZOArc/STATIC";

class FItem extends Component {

  static propTypes = {
    //data
    ischema: PropsType.oneOfType([PropsType.object.isRequired, PropsType.func.isRequired]),
    preAccessor: PropsType.string,
    addOns: PropsType.object,

    //function
    _onValueChange: PropsType.func.isRequired,
    _onBlurInlineSubmit: PropsType.func,
    _onInlineSubmit: PropsType.func,
    _onInlineRevert: PropsType.func,
    _setHiddenValue: PropsType.func,
    _Validate: PropsType.func,

    //runtime
    formValue: PropsType.object.isRequired,
    formError: PropsType.object,

    //access
    user: PropsType.object,

    //controls
    enableInlineSubmit: PropsType.bool,
    errorsShowOnHelperText: PropsType.bool,
    readOnly: PropsType.bool,
    ignoreValidate: PropsType.bool,
    visible: PropsType.bool,

    //style
    fieldStyle: PropsType.oneOf([
      "grid", "standard", "filled", "outlined"
    ]),

    //grid specific
    labelXS: PropsType.number,
    labelPaddingX: PropsType.number,
    labelJustify: PropsType.string,
    fieldXS: PropsType.number,
    fieldPaddingX: PropsType.number,
    separator: PropsType.string,

    //input style
    fieldSize: PropsType.string,
    theme: PropsType.object
  }

  static defaultProps = {
    ischema: {},
    preAccessor: "",
    addOns: {},

    _onValueChange: () => {},
    _onBlurInlineSubmit: () => {},
    _onInlineSubmit: () => {},
    _onInlineRevert: () => {},
    _setHiddenValue: () => {},
    _Validate: () => {},

    formValue: {},
    formError: {},

    user: null,

    enableInlineSubmit: false,
    errorsShowOnHelperText: true,
    readOnly: false,
    ignoreValidate: true,
    visible: true,

    fieldStyle: "grid",

    fieldSize: "normal",
    theme: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FItem.defaultProps))){
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

  getSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema)){
      return ischema(formValue, addOns);
    }
    return ischema;
  }

  renderHeader(ischema){
    let {textAlign, fontSize, fontWeight, color} = ischema;
    let header = ZFunc.IfFuncExec(ischema.header);
    return (
      <Box
        textAlign={textAlign || "center"} 
        fontSize={fontSize || 16} 
        fontWeight={fontWeight || "bold"}
        color={color || "black"}>
        {header}
      </Box>
    );
  }

  renderInject(ischema){
    let {formValue, addOns} = this.props;
    return ZFunc.IfFuncExec(ischema.inject, formValue, addOns);
  }

  renderAccessizo(ischema){
    return (
      <FGAccess
        key="accessizo"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderArray(ischema){
    return (
      <FGArray
        key="array"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderInline(ischema){
    return (
      <FGInline
        key="inline"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderFold(ischema){
    return (
      <FGFold
        key="fold"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderBox(ischema){
    return (
      <FGBox
        key="box"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderTable(ischema){
    return (
      <FGTable
        key="table"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderCollapse(ischema){
    return (
      <FGCollapse
        key="collapse"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderTabs(ischema){
    return (
      <FGTabs
        key="tabs"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderField(ischema){
    let {preAccessor} = this.state;
    let iname = ischema.name;
    if(!_.isEmpty(preAccessor)){
      if(!_.isEmpty(ischema.name)){
        iname = preAccessor + "." + ischema.name;
      }else{
        iname = preAccessor;
      }
    }
    return (
      <FField
        key={0}
        iname={iname}
        {...this.props}
        ischema={ischema}
      />
    );
  }

  renderColumns(ischema){
    return (
      <FGColumns
        key="columns"
        {...this.props}
        ischema={ischema}
        />
    );
  }

  renderItem(ischema){
   
    if(ischema.header){
      return this.renderHeader(ischema);
    }

    if(ischema.inject){
      return this.renderInject(ischema);
    }

    if(ischema.accessizo){
      return this.renderAccessizo(ischema);
    }

    if(ischema.array){
      return this.renderArray(ischema);
    }

    if(ischema.inline){
      return this.renderInline(ischema);
    }

    if(ischema.fold){
      return this.renderFold(ischema);
    }

    if(ischema.collapse){
      return this.renderCollapse(ischema);
    }

    if(ischema.tabs){
      return this.renderTabs(ischema);
    }

    if(ischema.columns){
      return this.renderColumns(ischema);
    }

    if(ischema.box){
      return this.renderBox(ischema);
    }

    if(ischema.table){
      return this.renderTable(ischema);
    }

    return this.renderField(ischema);
  }

  render(){
    if(!this.state || !this.state.ischema) return null;
    let ischema = this.getSchema();
    return (
      <Box marginY={0.75} lineHeight={"30px"}
        width="100%">
        {this.renderItem(ischema)}
      </Box>
    );

  }

}

export default FItem;
