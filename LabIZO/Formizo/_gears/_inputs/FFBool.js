import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { Checkbox, FormControlLabel, Switch } from '@material-ui/core';
import { Favorite, FavoriteBorder } from '@material-ui/icons';

import { Accessor } from 'IZOArc/STATIC';

class FFBool extends Component {

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
    readOnly: PropsType.bool.isRequired,

    //runtime
    formValue: PropsType.object.isRequired,

    //style
    ifieldStyle: PropsType.oneOf([
      "grid", "standard", "filled", "outlined"
    ]).isRequired
  }

  static defaultProps = {
    ischema: {},
    iname: "",

    _onValueChange: () => {},
    _onBlurInlineSubmit: () => {},
    _onInlineSubmit: () => {},
    _onFieldFocus: () => {},
    _onFieldBlur: () => {},

    readOnly: false,

    formValue: {},

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFBool.defaultProps))){
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
      if(callback) callback();
    });
  }

  renderCheckBox(){
    let {formValue, iname, ischema, readOnly, _onValueChange, ifieldStyle} = this.state;
    let ivalue = Accessor.Get(formValue, iname) || false;
    let ireadOnly = ischema.readOnly || readOnly;

    if(ifieldStyle === "grid"){
      return (
        <Checkbox 
          color="primary"
          name={iname}
          checked={ivalue}
          onChange={(e) => 
            _onValueChange(iname, 
              e.target.checked, ischema.validate)} 
          disabled={ireadOnly}/>
      );
    }else{
      return(
        <FormControlLabel className="formizo-h-m"
          control={
            <Checkbox 
              color="primary"
              name={iname}
              checked={ivalue}
              onChange={(e) => 
                _onValueChange(iname, 
                  e.target.checked, ischema.validate)} 
              disabled={ireadOnly}/>
          }
          label={ischema.label}
          />
      );
    }
  }

  renderSwitch(){

    let {formValue, iname, ischema, readOnly, _onValueChange, ifieldStyle} = this.state;
    let ivalue = Accessor.Get(formValue, iname) || false;
    let ireadOnly = ischema.readOnly || readOnly;

    if(ifieldStyle === "grid"){
      return (
        <Switch
          color="primary"
          name={iname}
          checked={ivalue}
          onChange={(e) => 
            _onValueChange(iname, 
              e.target.checked, ischema.validate)} 
          inputProps={{ 'aria-label': 'primary checkbox' }}
          disabled={ireadOnly}
          />
      );
    }else{
      return(
        <FormControlLabel className="formizo-h-m"
          control={
            <Switch
              color="primary"
              name={iname}
              checked={ivalue}
              onChange={(e) => 
                _onValueChange(iname, 
                  e.target.checked, ischema.validate)} 
              inputProps={{ 'aria-label': 'primary checkbox' }}
              disabled={ireadOnly}
              />
          }
          label={ischema.label}
          />
      );
    }
  }

  renderHeart(){
    let {formValue, iname, ischema, readOnly, _onValueChange, ifieldStyle} = this.state;
    let ivalue = Accessor.Get(formValue, iname) || false;
    let ireadOnly = ischema.readOnly || readOnly;

    if(ifieldStyle === "grid"){
      return (
        <Checkbox 
          name={iname}
          checked={ivalue}
          onChange={(e) => 
            _onValueChange(iname, 
              e.target.checked, ischema.validate)} 
          disabled={ireadOnly}
          icon={<FavoriteBorder />} 
          checkedIcon={<Favorite />} 
          />
      );
    }else{
      return(
        <FormControlLabel className="formizo-h-m"
          control={
            <Checkbox 
              name={iname}
              checked={ivalue}
              onChange={(e) => 
                _onValueChange(iname, 
                  e.target.checked, ischema.validate)} 
              disabled={ireadOnly}
              icon={<FavoriteBorder />} 
              checkedIcon={<Favorite />} 
              />
          }
          label={ischema.label}
          />
      );
    }
  }

  renderInside(){
    let {ischema} = this.state;
    let iboolStyle = ischema.boolStyle || "checkbox";
    switch(iboolStyle){
      case "checkbox": return this.renderCheckBox();
      case "switch": return this.renderSwitch();
      case "heart": return this.renderHeart();
      default: return this.renderCheckBox();
    }
  }

  render(){
    let {ischema} = this.state;
    if(!ischema){ return null; }

    return this.renderInside();

  }

}

export default FFBool;
