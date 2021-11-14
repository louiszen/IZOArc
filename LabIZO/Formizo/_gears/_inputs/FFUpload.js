import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { v1 } from 'uuid';
import { CloudUpload } from '@material-ui/icons';
import { FormHelperText, FormLabel, Typography } from '@material-ui/core';

import { Accessor, ColorX, LocaleX } from 'IZOArc/STATIC';
import { HStack, Spacer } from 'IZOArc/LabIZO/Stackizo';
import { OutlinedBox, StyledButton } from 'IZOArc/LabIZO/Stylizo';

/**
 * @augments {Component<Props, State>}
 */
class FFUpload extends Component {

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
    this.state = {
      uuid: v1()
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFUpload.defaultProps))){
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

  renderUploader(){
    let {ischema, iname, formValue, formError, uuid, readOnly, errorsShowOnHelperText} = this.state;
    
    if(!ischema) return null;
    let ivalue = Accessor.Get(formValue, iname);
    if(ivalue === undefined || ivalue === null) ivalue = "";
    let ierror = Accessor.Get(formError, iname);
    let ireadOnly = ischema.readOnly || readOnly;

    let helperText = ischema.helperText;
    if(errorsShowOnHelperText){
      helperText = ierror;
    }

    let theme = ireadOnly?
    {
      color: ColorX.GetColorCSS("grey"),
      background: ColorX.GetColorCSS("lightGrey"),
      hover: {
        color: ColorX.GetColorCSS("grey"),
        background: ColorX.GetColorCSS("lightGrey"),
      }
    } : {
      color: "blue",
      background: "white"
    };

    return(
      <HStack className="formizo-h-m">
        {ischema.middle && <Spacer/>}
        <label htmlFor={uuid}>
          <StyledButton 
            variant="contained" 
            theme={theme} 
            component={"span"}>
            <HStack spacing={5}>
              <CloudUpload/>
              <Typography style={{fontSize:14, fontWeight: 500}}>
                {LocaleX.Get("__IZO.Formizo.Upload")}
              </Typography>
            </HStack>
          </StyledButton>
        </label>
        {
          ischema.showFilename !== false &&
          <FormLabel className="formizo-h-m">
            {ivalue.name}
          </FormLabel>
        }
        {
          !_.isEmpty(helperText) &&
          <FormHelperText>
            {helperText}
          </FormHelperText>
        }
        <Spacer/>
      </HStack>
      
    );
  }

  render(){
    let {ischema, iname, formError, uuid, 
      _onValueChange, _onBlurInlineSubmit, 
      _onFieldFocus, _onFieldBlur, errorsShowOnHelperText, 
      ifieldStyle, readOnly, formValue, addOns} = this.state;
    if(!ischema) return null;

    let label = _.isFunction(ischema.label)? ischema.label(formValue, addOns) : ischema.label;

    let ierror = Accessor.Get(formError, iname);
    let ireadOnly = ischema.readOnly || readOnly;

    let helperText = ischema.helperText;
    if(errorsShowOnHelperText){
      helperText = ierror;
    }

    return (
      <HStack>
        <input
          accept={ischema.accept}
          id={uuid}
          onChange={(e) => {
            _onValueChange(iname, 
              e.target.files[0], ischema.validate)
          }}
          onFocus={(e) => {
            _onFieldFocus();
          }}
          onBlur={(e) => {
            _onFieldBlur();
            _onBlurInlineSubmit(iname)
          }}
          multiple={false}
          type="file"
          style={{
            display: "none"
          }}
          disabled={ireadOnly}
        />
        {ifieldStyle === "grid"? 
          this.renderUploader() : 
          ifieldStyle === "outlined" ?
          <OutlinedBox label={label}>
            {this.renderUploader()}
          </OutlinedBox> :
          <HStack>
            <FormLabel className="formizo-h-m">{label}</FormLabel>
            {this.renderUploader()}
          </HStack>
        }
        {
          !_.isEmpty(helperText) &&
          <FormHelperText>
            {helperText}
          </FormHelperText>
        }
      </HStack>
    );
  }

}

export default FFUpload;
