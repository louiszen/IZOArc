import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';

import { Accessor } from 'IZOArc/STATIC';

import { Slider } from "@material-ui/core";

/**
 * @augments {Component<Props, State>}
 */
class FFSlider extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    iname: PropsType.string.isRequired,

    //root func
    _onValueChange: PropsType.func.isRequired,
    _onBlurInlineSubmit: PropsType.func.isRequired,
    _onInlineSubmit: PropsType.func.isRequired,
    _onFieldFocus: PropsType.func.isRequired,
    _onFieldBlur: PropsType.func.isRequired,

    //controls
    errorsShowOnHelperText: PropsType.bool.isRequired,
    readOnly: PropsType.bool.isRequired,

    //runtime
    formValue: PropsType.object.isRequired,
    formError: PropsType.object.isRequired,

    //style
    ifieldStyle: PropsType.oneOf([
      "grid", "standard", "filled", "outlined"
    ]).isRequired,

    fieldSize: PropsType.string,
  }

  static defaultProps = {
    ischema: {},
    iname: "",

    _onValueChange: () => {},
    _onBlurInlineSubmit: () => {},
    _onInlineSubmit: () => {},
    _onFieldFocus: () => {},
    _onFieldBlur: () => {},

    errorsShowOnHelperText: true,
    readOnly: false,
    
    formValue: {},
    formError: {},

    fieldStyle: "grid",

    fieldSize: "normal"
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFSlider.defaultProps))){
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
    }), () => {
      let {formValue, ischema, iname, _Validate, _onValueChange} = this.state;
      let ivalue = Accessor.Get(formValue, iname);
      if(!_.isEmpty(ischema.validate)){
        _Validate(iname, ivalue, ischema.validate);
      }
      if(!ivalue && ischema.defaultValue){
        _onValueChange(iname, ischema.defaultValue, ischema.validate);
      }
    });
  }

  render(){
    let { ischema, iname, formValue, _onValueChange, readOnly } = this.state;
    if(!ischema){ return null; }
    let ivalue = Accessor.Get(formValue, iname);
    if(ivalue === undefined || ivalue === null) ivalue = null;
    let ireadOnly = ischema.readOnly || readOnly;
    return (
      <Slider
        key='slidebar'
        style={{ width: "50%" }}
        onChange={(event, newValue) => {
          _onValueChange(iname, newValue, ischema.validate)
        }}
        defaultValue={ischema.defaultValue}
        step={ischema.step || 1}
        marks={ischema.marks}
        min={ischema.min}
        max={ischema.max}
        value={ivalue}
        valueLabelDisplay={ischema.valueLabelDisplay || "auto"}
        valueLabelFormat={ischema.valueLabelFormat}
        disabled={ireadOnly}
      />
    );
  }

}

export default FFSlider;
