import React, { Component } from "react";

import PropsType from "prop-types";

import FFDropdown from "./FFDropdown";
import FFCheckbox from "./FFCheckbox";
import FFRadio from "./FFRadio";
import FFAutoComplete from "./FFAutoComplete";

import { Accessor } from "IZOArc/STATIC";

/**
 * @augments {Component<Props, State>}
 */
class FFSelect extends Component {

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
    ignoreValidate: PropsType.bool,
visible: PropsType.bool,

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
    ignoreValidate: true,
    visible: true,
    
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFSelect.defaultProps))){
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
    }));
  }

  renderDropdown(){
    return <FFDropdown {...this.props} />;
  }

  renderCheckbox(){
    return <FFCheckbox {...this.props} />;
  }

  renderRadio(){
    return <FFRadio {...this.props} />;
  }

  renderAutoComplete(){
    return <FFAutoComplete {...this.props} />;
  }

  render(){
    let {ischema} = this.state;
    if(!ischema){
      return null;
    }
    switch(ischema.selectStyle){
      case "dropdown": return this.renderDropdown();
      case "checkbox": return this.renderCheckbox();
      case "radio": return this.renderRadio();
      case "autocomplete": return this.renderAutoComplete();
      default: return this.renderDropdown();
    }
  }

}

export default FFSelect;
