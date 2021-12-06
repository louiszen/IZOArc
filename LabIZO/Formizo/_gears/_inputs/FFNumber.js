import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import {FormControl, FormHelperText} from "@material-ui/core";

import { Accessor } from "IZOArc/STATIC";
import { StyledInput, StyledTextField } from "IZOArc/LabIZO/Stylizo";

/**
 * @augments {Component<Props, State>}
 */
class FFNumber extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFNumber.defaultProps))){
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
        _Validate(iname, Number(ivalue), ischema.validate);
      }
      if(!ivalue && ischema.defaultValue){
        _onValueChange(iname, Number(ischema.defaultValue), ischema.validate);
      }
    });
  }

  renderInput(){
    let {ischema, iname, formValue, formError, 
      _onValueChange, _onBlurInlineSubmit, 
      _onFieldFocus, _onFieldBlur, errorsShowOnHelperText, 
      readOnly, theme} = this.state;
    if(!ischema) return null;

    let ivalue = Accessor.Get(formValue, iname);
    if(ivalue === undefined || ivalue === null) ivalue = "";
    let ierror = Accessor.Get(formError, iname);
    let ireadOnly = ischema.readOnly || readOnly;

    if(_.isFunction(ierror)){
      ierror = ierror();
    }

    let helperText = ischema.helperText;
    if(errorsShowOnHelperText){
      helperText = ierror;
    }
    
    return (
      <FormControl
        error={!_.isEmpty(ierror)}
        disabled={ireadOnly}
        fullWidth={ischema.fullWidth !== false} 
        name={iname}
        onChange={(e) => 
          _onValueChange(iname, 
            Number(e.target.value), ischema.validate)
        }
        onFocus={(e) => {
          _onFieldFocus();
        }}
        onBlur={(e) => {
          _onFieldBlur();
          _onBlurInlineSubmit(iname);
        }}
        defaultValue={ischema.defaultValue}
        >
          <StyledInput 
            value={ivalue} 
            type="number"
            inputProps={{
              min: ischema.min,
              max: ischema.max,
              step: ischema.step
            }}
            placeholder={ischema.placeholder}
            startAdornment={ischema.before}
            endAdornment={ischema.after}
            theme={theme && theme.textfield}
            />
          {
            !_.isEmpty(helperText) &&
            <FormHelperText>
              {helperText}
            </FormHelperText>
          }
      </FormControl>
    );
  }

  renderTextField(){
    let {ischema, iname, formValue, formError, 
      _onValueChange, _onBlurInlineSubmit, 
      _onFieldFocus, _onFieldBlur, errorsShowOnHelperText, 
      ifieldStyle, readOnly, fieldSize, theme, addOns} = this.state;
    if(!ischema) return null;

    let label = _.isFunction(ischema.label)? ischema.label(formValue, addOns) : ischema.label;

    let ivalue = Accessor.Get(formValue, iname);
    if(ivalue === undefined || ivalue === null) ivalue = "";
    let ierror = Accessor.Get(formError, iname);
    let ireadOnly = ischema.readOnly || readOnly;

    if(_.isFunction(ierror)){
      ierror = ierror();
    }

    let helperText = ischema.helperText;
    if(errorsShowOnHelperText){
      helperText = ierror;
    }

    return(
      <StyledTextField
        value={ivalue} 
        type="number"
        label={label || ""}
        helperText={helperText || ""}
        placeholder={ischema.placeholder || ""}
        onChange={(e) => 
          _onValueChange(iname, 
            Number(e.target.value), ischema.validate)} 
        onFocus={(e) => {
          _onFieldFocus();
        }}
        onBlur={(e) => {
          _onFieldBlur();
          _onBlurInlineSubmit(iname);
        }}
        name={iname}
        variant={ifieldStyle}
        fullWidth={ischema.fullWidth !== false}
        error={!_.isEmpty(ierror)}
        disabled={ireadOnly}
        InputProps={{
          startAdornment: ischema.before,
          endAdornment: ischema.after,
          inputProps:{
            min: ischema.min,
            max: ischema.max,
            step: ischema.step
          }
        }}
        defaultValue={ischema.defaultValue}
        size={fieldSize}
        theme={theme && theme.textfield}
        />
    );
  }

  render(){
    let {ischema, ifieldStyle} = this.state;
    if(!ischema){ return null; }
    if(ifieldStyle === "grid"){
      return this.renderInput();
    }else{
      return this.renderTextField();
    }
  }

}

export default FFNumber;
