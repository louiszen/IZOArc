import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';

import { Accessor } from 'IZOArc/STATIC';
import RichTextEditor from 'react-rte';

/**
 * @augments {Component<Props, State>}
 */
class FFRichText extends Component {

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
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFRichText.defaultProps))){
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

  renderRTE(){
    let {ischema, iname, formValue,  
      _onValueChange, _onBlurInlineSubmit, 
      _onFieldFocus, _onFieldBlur, readOnly } = this.state;
    if(!ischema) return null;

    let ivalue = Accessor.Get(formValue, iname);
    if(ivalue === undefined || ivalue === null) ivalue = RichTextEditor.createEmptyValue();
    //let ierror = Accessor.Get(formError, iname);
    let ireadOnly = ischema.readOnly || readOnly;

    /*
    let helperText = ischema.helperText;
    if(errorsShowOnHelperText){
      helperText = ierror;
    }
    */

    let toolbarConfig = {
      // Optionally specify the groups to display (displayed in the order listed).
      display: [
        'INLINE_STYLE_BUTTONS', 
        'BLOCK_TYPE_BUTTONS', 
        'BLOCK_TYPE_DROPDOWN', 
        'HISTORY_BUTTONS'
      ],
      INLINE_STYLE_BUTTONS: [
        {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
        {label: 'Italic', style: 'ITALIC'},
        {label: 'Underline', style: 'UNDERLINE'}
      ],
      BLOCK_TYPE_DROPDOWN: [
        {label: 'Normal', style: 'unstyled'},
        {label: 'Heading Large', style: 'header-one'},
        {label: 'Heading Medium', style: 'header-two'},
        {label: 'Heading Small', style: 'header-three'}
      ],
      BLOCK_TYPE_BUTTONS: [
        {label: 'UL', style: 'unordered-list-item'},
        {label: 'OL', style: 'ordered-list-item'}
      ]
    };

    return <RichTextEditor
      toolbarConfig={toolbarConfig}
      value={ivalue} 
      onChange={(e) => 
        _onValueChange(iname, 
          e, ischema.validate)} 
      readOnly={ireadOnly}
      onFocus={(e) => {
        _onFieldFocus();
      }}
      onBlur={(e) => {
        _onFieldBlur();
        _onBlurInlineSubmit(iname);
      }}
      />
  }

  render(){
    let {ischema} = this.state;
    if(!ischema){
      return null;
    }
    return this.renderRTE();
  }

}

export default FFRichText;
