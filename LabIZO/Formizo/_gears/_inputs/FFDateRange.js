import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import { DatePicker } from 'antd';
import { FormControl, FormHelperText, FormLabel } from '@material-ui/core';

import 'antd/dist/antd.css';

import { Accessor } from 'IZOArc/STATIC';
import { HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';
import { OutlinedBox } from 'IZOArc/LabIZO/Stylizo';

const { RangePicker } = DatePicker;

/**
 * @augments {Component<Props, State>}
 */
class FFDateRange extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    iname: PropsType.string.isRequired,
    itype: PropsType.string.isRequired,

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
    itype: "date",

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFDateRange.defaultProps))){
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

  _handleReturn = (value, dateFormat) => {
    console.log(value, dateFormat);
    if(_.isNull(value) || _.isUndefined(value)) return value;
    if(dateFormat === "moment"){
      if(moment.isMoment(value)) return value;
      return moment(value, "DD/MM/YYYY HH:mm");
    }
    if(moment.isMoment(value)) return value.format(dateFormat);
  }

  renderDatePicker(){
    let {ischema, iname, itype, formValue,  
      _onValueChange, _onBlurInlineSubmit, 
      _onFieldFocus, _onFieldBlur, readOnly} = this.state;
    if(!ischema) return null;
    let ivalue = Accessor.Get(formValue, iname);
    let idateformat = ischema.dateFormat || "moment";
    let mvalue = ivalue ? _.map(ivalue, (o, i) => moment(o, idateformat)) : ["", ""];
    
    let ireadOnly = ischema.readOnly || readOnly;
    let istartReadOnly = ischema.startReadOnly || ireadOnly;
    let iendReadOnly = ischema.endReadOnly || ireadOnly;
    let istartEmpty = ischema.startEmpty || false;
    let iendEmpty = ischema.endEmpty || false;

    return (
      <RangePicker
        value={mvalue}
        picker={itype}
        showTime={itype === "datetime"}
        onChange={(moments) => {
          _onValueChange(iname, 
            _.map(moments, (o, i) => this._handleReturn(o, idateformat)), ischema.validate)
        }}
        onFocus={(e) => {
          _onFieldFocus();
        }}
        onBlur={(e) => {
          _onFieldBlur();
          _onBlurInlineSubmit(iname);
        }}
        disabled={[istartReadOnly, iendReadOnly]}
        allowEmpty={[istartEmpty, iendEmpty]}
        />
    );
  }

  render(){
    let {ischema, iname, ifieldStyle, formError, 
      errorsShowOnHelperText, readOnly, formValue, addOns} = this.state;
    if(!ischema) return null;

    let label = _.isFunction(ischema.label)? ischema.label(formValue, addOns) : ischema.label;
    
    let ireadOnly = ischema.readOnly || readOnly;

    let ierror = Accessor.Get(formError, iname);
    let helperText = ischema.helperText;
    if(errorsShowOnHelperText){
      helperText = ierror;
    }

    return (
      <FormControl 
        error={!_.isEmpty(ierror)}
        disabled={ireadOnly}>
          {ifieldStyle === "grid"? 
            this.renderDatePicker() : 
            ifieldStyle === "outlined" ?
            <OutlinedBox label={label}>
              {this.renderDatePicker()}
            </OutlinedBox> :
            <HStack>
              <FormLabel className="formizo-h-m">{ischema.label}</FormLabel>
              {this.renderDatePicker()}
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

}

export default FFDateRange;
