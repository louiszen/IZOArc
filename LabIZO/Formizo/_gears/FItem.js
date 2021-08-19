import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import {Box} from '@material-ui/core';

import FField from './FField';
import {FGAccess, FGInline, FGArray, 
  FGFold, FGCollapse, FGTabs, FGColumns} from './_groups';

import { Accessor } from 'IZOArc/STATIC';

class FItem extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    preAccessor: PropsType.string.isRequired,
    addOns: PropsType.object.isRequired,

    //function
    _onValueChange: PropsType.func.isRequired,
    _onBlurInlineSubmit: PropsType.func.isRequired,
    _onInlineSubmit: PropsType.func.isRequired,
    _onInlineRevert: PropsType.func.isRequired,
    _setHiddenValue: PropsType.func.isRequired,
    _Validate: PropsType.func.isRequired,

    //runtime
    formValue: PropsType.object.isRequired,
    formError: PropsType.object.isRequired,

    //access
    auth: PropsType.object.isRequired,
    level: PropsType.number.isRequired,

    //controls
    enableInlineSubmit: PropsType.bool.isRequired,
    errorsShowOnHelperText: PropsType.bool.isRequired,
    readOnly: PropsType.bool.isRequired,

    //style
    fieldStyle: PropsType.oneOf([
      "grid", "standard", "filled", "outlined"
    ]).isRequired,

    //grid specific
    labelXS: PropsType.number.isRequired,
    labelPaddingX: PropsType.number.isRequired,
    labelJustify: PropsType.string.isRequired,
    fieldXS: PropsType.number.isRequired,
    fieldPaddingX: PropsType.number.isRequired,
    separator: PropsType.string.isRequired,

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

    auth: {},
    level: 999,

    enableInlineSubmit: false,
    errorsShowOnHelperText: true,
    readOnly: false,

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

  renderHeader(){
    let {ischema} = this.state;
    let {textAlign, fontSize, fontWeight, color} = ischema;
    return (
      <Box
        textAlign={textAlign || "center"} 
        fontSize={fontSize || 16} 
        fontWeight={fontWeight || "bold"}
        color={color || "black"}>
        {ischema.header}
      </Box>
    );
  }

  renderInject(){
    let {ischema} = this.state;
    return ischema.inject;
  }

  renderAccessizo(){
    return (
      <FGAccess
        key="accessizo"
        {...this.props}
        />
    );
  }

  renderArray(){
    return (
      <FGArray
        key="array"
        {...this.props}
        />
    );
  }

  renderInline(){
    return (
      <FGInline
        key="inline"
        {...this.props}
        />
    );
  }

  renderFold(){
    return (
      <FGFold
        key="fold"
        {...this.props}
        />
    );
  }

  renderCollapse(){
    return (
      <FGCollapse
        key="collapse"
        {...this.props}
        />
    );
  }

  renderTabs(){
    return (
      <FGTabs
        key="tabs"
        {...this.props}
        />
    );
  }

  renderField(){
    let {ischema, preAccessor} = this.state;
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
      />
    );
  }

  renderColumns(){
    return (
      <FGColumns
        key="columns"
        {...this.props}
        />
    );
  }

  renderItem(){
    let {ischema} = this.state;
    
    if(ischema.header){
      return this.renderHeader();
    }

    if(ischema.inject){
      return this.renderInject();
    }

    if(ischema.accessizo){
      return this.renderAccessizo();
    }

    if(ischema.array){
      return this.renderArray();
    }

    if(ischema.inline){
      return this.renderInline();
    }

    if(ischema.fold){
      return this.renderFold();
    }

    if(ischema.collapse){
      return this.renderCollapse();
    }

    if(ischema.tabs){
      return this.renderTabs();
    }

    if(ischema.columns){
      return this.renderColumns();
    }

    return this.renderField();
  }

  render(){
    if(!this.state || !this.state.ischema) return null;
    return (
      <Box marginY={0.75} lineHeight={"30px"}
        width="100%">
        {this.renderItem()}
      </Box>
    );

  }

}

export default FItem;
