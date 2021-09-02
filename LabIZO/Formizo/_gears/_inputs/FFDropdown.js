import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { FormControl, FormHelperText, FormLabel, MenuItem, Select, Tooltip, Typography } from '@material-ui/core';

import { Accessor } from 'IZOArc/STATIC';
import { OutlinedBox } from 'IZOArc/LabIZO/Stylizo';
import { HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';

class FFDropdown extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFDropdown.defaultProps))){
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
      let v = _.isEmpty(ischema.selectVal) ? o : Accessor.Get(o, ischema.selectVal);
      let c = _.isEmpty(ischema.selectCap) ? o : Accessor.Get(o, ischema.selectCap);
      let t = _.isEmpty(ischema.selectTip) ? o : Accessor.Get(o, ischema.selectTip);
      if(ischema.showTooltip){
        return (
          <MenuItem key={v} 
            value={v} 
            disabled={ischema.selectDisable && o[ischema.selectDisable]}>
            <Tooltip title={t || ""} placement="top" arrow>
              <Typography>
                {c}
              </Typography>
            </Tooltip>
          </MenuItem>
        );
      }else{
        return (
          <MenuItem key={v} 
            value={v} 
            disabled={ischema.selectDisable && o[ischema.selectDisable]}>
            {c}
          </MenuItem>
        );
      }
    });
  }

  renderSelect(){
    let {ischema, iname, formValue, _onValueChange} = this.state;
    let ivalue = Accessor.Get(formValue, iname);
    if(ivalue === undefined || ivalue === null) ivalue = "";
    return (
      <Select
        value={ivalue}
        onChange={(e) => {
          e.stopPropagation();
          _onValueChange(iname, 
            e.target.value, ischema.validate);
          }
        }
        fullWidth={ischema.fullWidth !== false}
        >
        {this.renderOption()}  
      </Select>
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
        defaultValue={ischema.defaultValue || ""}
        >
        {ifieldStyle === "grid"? 
            this.renderSelect() : 
            ifieldStyle === "outlined" ?
            <OutlinedBox label={ischema.label}>
              {this.renderSelect()}
            </OutlinedBox> :
            <HStack>
              <FormLabel className="formizo-h-m">{ischema.label}</FormLabel>
              {this.renderSelect()}
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

export default FFDropdown;
