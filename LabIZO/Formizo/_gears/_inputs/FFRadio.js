import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { FormControl, FormControlLabel, FormHelperText, FormLabel, Radio, RadioGroup } from '@material-ui/core';

import { Accessor } from 'IZOArc/STATIC';
import { HStack, Spacer, VStack } from 'IZOArc/LabIZO/Stackizo';
import { OutlinedBox } from 'IZOArc/LabIZO/Stylizo';

/**
 * @augments {Component<Props, State>}
 */
class FFRadio extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    iname: PropsType.string.isRequired,
    addOns: PropsType.object.isRequired,

    //root func
    _onValueChange: PropsType.func.isRequired,
    _onBlurInlineSubmit: PropsType.func.isRequired,
    _onInlineSubmit: PropsType.func.isRequired,
    _onFieldFocus: PropsType.func.isRequired,
    _onFieldBlur: PropsType.func.isRequired,

    //disability
    errorsShowOnHelperText: PropsType.bool.isRequired,
    readOnly: PropsType.bool.isRequired,

    //runtime
    formValue: PropsType.object.isRequired,
    formError: PropsType.object.isRequired,

    //style
    ifieldStyle: PropsType.oneOf([
      "grid", "standard", "filled", "outlined"
    ]).isRequired
  }

  static defaultProps = {
    ischema: {},
    iname: "",
    addOns: {},

    _onValueChange: () => {},
    _onBlurInlineSubmit: () => {},
    _onInlineSubmit: () => {},
    _onFieldFocus: () => {},
    _onFieldBlur: () => {},

    errorsShowOnHelperText: true,
    readOnly: false,
    
    formValue: {},
    formError: {},

    fieldStyle: "grid"
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFRadio.defaultProps))){
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

  renderOption(){
    let {ischema, addOns} = this.state;
    let options;
    if(_.isArray(ischema.selectRef)){
      options = ischema.selectRef;
    }else{
      options = Accessor.Get(addOns, ischema.selectRef);
    }
    return _.map(options, (o, i) => {
      let val; 
      let cap; 
      if(_.isEmpty(ischema.selectVal)){
        val = o;
      }else{
        val = Accessor.Get(o, ischema.selectVal);
      }
      if(_.isEmpty(ischema.selectCap)){
        cap = o;
      }else{
        cap = Accessor.Get(o, ischema.selectCap);
      }
      let disabled = ischema.selectDisable && Accessor.Get(o, ischema.selectDisable);
      return (        
        <FormControlLabel 
          key={val} 
          value={val} 
          disabled={disabled}
          control={<Radio color="primary"/>}
          label={cap}
        />
      );
    });
  }

  renderRadioGroup(){
    let {ischema, iname, formValue, _onValueChange} = this.state;
    let ivalue = Accessor.Get(formValue, iname);
    if(ivalue === undefined || ivalue === null) ivalue = "";
    return (
      <RadioGroup
        key={iname}
        name={iname}
        value={ivalue}
        onChange={(e) => 
          _onValueChange(iname, 
            e.target.value, ischema.validate)
        }
        >
        <HStack justifyContent={ischema.selectAlignment || "flex-start"}>
          {
            ischema.selectDirection === "row"?
            <HStack flexWrap="wrap" justifyContent={ischema.selectAlignment || "flex-start"}>
              {this.renderOption()}
            </HStack> :
            <VStack flexWrap="wrap">
              {this.renderOption()}
            </VStack>
          }
        </HStack>    
      </RadioGroup>
    );
  }

  renderInside(){
    let {ischema, iname, formError, ifieldStyle,
      _onBlurInlineSubmit, 
      _onFieldFocus, _onFieldBlur, errorsShowOnHelperText, readOnly} = this.state;
    if(!ischema) return null;

    let ierror = Accessor.Get(formError, iname);
    let ireadOnly = ischema.readOnly || readOnly;

    let helperText = ischema.helperText;
    if(errorsShowOnHelperText){
      helperText = ierror;
    }

    return(
      <FormControl 
        error={!_.isEmpty(ierror)}
        disabled={ireadOnly}
        fullWidth={ischema.fullWidth !== false} 
        style={{
          minWidth: 200
        }}
        name={iname}
        onFocus={(e) => {
          _onFieldFocus();
        }}
        onBlur={(e) => {
          _onFieldBlur();
          _onBlurInlineSubmit(iname);
        }}
        defaultValue={ischema.defaultValue}
        >
        {ifieldStyle === "grid"? 
          this.renderRadioGroup() : 
          ifieldStyle === "outlined" ?
          <OutlinedBox label={ischema.label}>
            {this.renderRadioGroup()}
          </OutlinedBox> :
          <HStack>
            <FormLabel className="formizo-h-m">{ischema.label}</FormLabel>
            {this.renderRadioGroup()}
            <Spacer/>
          </HStack>
        }
        {
          !_.isEmpty(helperText) &&
          <FormHelperText>
            {helperText}
          </FormHelperText>
        }
      </FormControl>
    );

  }

  render(){
    return this.renderInside();
  }

}

export default FFRadio;
