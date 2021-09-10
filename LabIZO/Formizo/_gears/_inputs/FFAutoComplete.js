import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { AutoComplete } from 'antd';

import { Accessor } from 'IZOArc/STATIC';

/**
 * @augments {Component<Props, State>}
 */
class FFAutoComplete extends Component {

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
    let {formValue, ischema, iname, addOns} = this.state;
    let ivalue = Accessor.Get(formValue, iname);
    if(ivalue){
      let options;
      if(_.isArray(ischema.selectRef)){
        options = ischema.selectRef;
      }else{
        options = Accessor.Get(addOns, ischema.selectRef);
      }
      let filtered = _.filter(options, (o, i) => Accessor.Get(o, ischema.selectVal) === ivalue);
      if(filtered.length === 1){
        let capValue = Accessor.Get(filtered[0], ischema.selectCap);
        this.setState({
          value: capValue
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFAutoComplete.defaultProps))){
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
      let {formValue, ischema, iname, _Validate, _onValueChange, addOns, value} = this.state;
      let ivalue = Accessor.Get(formValue, iname);
      if(!_.isEmpty(ischema.validate)){
        _Validate(iname, ivalue, ischema.validate);
      }
      if(!ivalue && ischema.defaultValue){       
        _onValueChange(iname, ischema.defaultValue, ischema.validate);
      }
      if(ivalue && !value){
        let options = Accessor.Get(addOns, ischema.selectRef);
        let filtered = _.filter(options, (o, i) => Accessor.Get(o, ischema.selectVal) === ivalue);
        if(filtered.length === 1){
          let capValue = Accessor.Get(filtered[0], ischema.selectCap);
          this.setState({
            value: capValue,
          });
        }
      }
    });
  }

  onSelect = (data) => {
    let {ischema, iname, _onValueChange, addOns} = this.props;
    let options = Accessor.Get(addOns, ischema.selectRef);
    let filtered = _.filter(options, (o, i) => Accessor.Get(o, ischema.selectCap) === data);
    if(filtered.length === 1){
      let trueValue = Accessor.Get(filtered[0], ischema.selectVal);
      _onValueChange(iname, trueValue, ischema.validate);
    }
    this.setState({
      value: data
    });
    
  }

  onSearch = (data) => {
    this.setState({
      value: data
    });
  }

  render(){
    let {ischema, addOns, value} = this.state;
    if(!ischema) return <div/>;
    let options = Accessor.Get(addOns, ischema.selectRef);
    let ioptions = _.map(options, (o, i) => {
      return {
        value: Accessor.Get(o, ischema.selectCap)
      }
    });
    return (
      <AutoComplete
        value={value}
        options={ioptions}
        onSelect={this.onSelect}
        onSearch={this.onSearch}
        placeholder={ischema.placeholder || "Suggested FAQ"}
        filterOption={(inputValue, option) => {
          if(!option) return false;
          return option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }}
        style={{
          width: ischema.width,
          minWidth: ischema.width,
          maxWidth: ischema.width
        }}
        notFoundContent={ischema.noMatchText || "No matches found."}
        />
    );
  }

}

export default FFAutoComplete;
