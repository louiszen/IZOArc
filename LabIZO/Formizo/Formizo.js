import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Box } from "@material-ui/core";

import FItem from "./_gears/FItem";
import Validation from "./Validation";
import "./Formizo.css";

import { Accessor, ColorX, LocaleX } from "IZOArc/STATIC";
import { VStack, HStack, Spacer } from "IZOArc/LabIZO/Stackizo";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";

/**
 * Formizo - Generic form generator
 * @augments {Component<Props, State>}
 * @property {{
 *  textfield: { ... }
 * }} theme
 */
class Formizo extends Component {

  static propTypes = {
    //basic
    width: PropsType.oneOfType([PropsType.string, PropsType.number]),
    height: PropsType.oneOfType([PropsType.string, PropsType.number]),
    formID: PropsType.string,

    //schema
    schema: PropsType.oneOfType([PropsType.array.isRequired, PropsType.func.isRequired]),

    //listeners
    onMounted: PropsType.func,
    onSubmit: PropsType.func,
    onCancel: PropsType.func,
    onClear: PropsType.func,
    onRevert: PropsType.func,
    onInvalid: PropsType.func,
    onInlineSubmit: PropsType.func,
    onInlineRevert: PropsType.func,
    onChange: PropsType.func,

    //disability
    enableOnChangeValidation: PropsType.bool,
    enableInlineSubmit: PropsType.bool,
    enableOnBlurInlineSubmit: PropsType.bool,
    enableOnBlurAutoSubmit: PropsType.bool,
    errorsShowOnHelperText: PropsType.bool,
    readOnly: PropsType.bool,

    //access
    user: PropsType.object,

    //data
    defaultValue: PropsType.object,
    addOns: PropsType.object,

    //bottom buttons
    buttons: PropsType.array,

    //style
    buttonAlign: PropsType.string,
    buttonPadding: PropsType.oneOfType([PropsType.number, PropsType.string]),
    buttonWidth: PropsType.oneOfType([PropsType.number, PropsType.string]),
    fieldStyle: PropsType.oneOf(["grid", "standard", "filled", "outlined"]),

    //grid specific
    labelXS: PropsType.number,
    labelPaddingX: PropsType.number,
    labelJustify: PropsType.string,
    fieldXS: PropsType.number,
    fieldPaddingX: PropsType.number,
    separator: PropsType.string,

    //input style
    fieldSize: PropsType.string,
    theme: PropsType.object,
  };

  static defaultProps = {
    width: "100%",
    height: "100%",
    formID: "",
    schema: [],

    onMounted: undefined,
    onSubmit: () => {},
    onCancel: () => {},
    onClear: () => {},
    onRevert: () => {},
    onInvalid: () => {},
    onInlineSubmit: () => {},
    onChange: () => {},

    enableOnChangeValidation: false,
    enableInlineSubmit: false,
    enableOnBlurAutoSubmit: false,
    errorsShowOnHelperText: true,
    readOnly: false,

    user: {},

    defaultValue: {},
    addOns: {},

    buttons: ["Cancel", "Submit"],

    buttonAlign: "center",
    buttonPadding: 2,
    buttonWidth: 100,
    fieldStyle: "grid",

    labelXS: 3,
    labelPaddingX: 1,
    labelJustify: "flex-end",
    fieldXS: 6,
    fieldPaddingX: 1,
    separator: "1px solid rgba(125, 125, 125, 0.2)",

    fieldSize: "medium",
    theme: {},
  };

  constructor() {
    super();
    this.state = {
      formValue: {},
      formError: {},
      formHidden: {},
    };
  }

  componentDidMount() {
    this._setAllStates(() => {
      this._FillForm(this.props.defaultValue);
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!Accessor.IsIdentical(prevProps, this.props, Object.keys(Formizo.defaultProps))) {
      if (!Accessor.IsIdentical(prevProps.schema, this.props.schema)) {
        this._ClearError();
        this._ClearHidden();
        this._onClear();
      }
      this._setAllStates();

      if (!Accessor.IsIdentical(prevProps.defaultValue, this.props.defaultValue)) {
        this._FillForm(this.props.defaultValue);
      }
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  _setAllStates = (callback) => {
    this.setState(
      (state, props) => ({
        ...props,
      }),
      () => {
        if (this.props.onMounted) {
          this.props.onMounted({
            Submit: this._onSubmit,
            InlineSubmit: this._onInlineSubmit,
            Clear: this._onClear,
            Cancel: this._onCancel,
            Revert: this._onRevert,
            Fill: this._FillForm,
            SetValue: this._onValueChange,
            GetValue: this._GetValue,
          });
        }
        if (callback) callback();
      }
    );
  };

  _FillForm = (data) => {
    this.setState(
      {
        formValue: _.cloneDeep(data),
      },
      () => {
        this.ValidateForm();
      }
    );
  };

  _GetValue = (accessor) => {
    let { formValue } = this.state;
    return Accessor.Get(formValue, accessor);
  };

  _SetError = (accessor, message) => {
    let { formError } = this.state;
    if (formError) {
      Accessor.Set(formError, accessor, message);
      this.setState({ formError });
    }
  };

  _GetError = (accessor) => {
    let { formError } = this.state;
    return Accessor.Get(formError, accessor);
  };

  _ClearError = () => {
    this.setState({
      formError: {},
    });
  };

  _onValueChange = (name, value, criteria) => {
    
    let { formValue, onChange } = this.state;
    this._Validate(name, value, criteria);
    if (formValue) {
      let names = name.split(".");
      if (!isNaN(names[names.length - 1])) {
        let parentName = names.slice(0, -1).join(".");
        if (Accessor.Get(formValue, parentName) === undefined) {
          Accessor.Set(formValue, parentName, []);
        }
      }

      if(value instanceof File){
        Accessor.Set(formValue, name, value);
      }else{
        Accessor.Set(formValue, name, _.cloneDeep(value));
      }

      this.setState({ formValue });
      if (onChange) {
        onChange(formValue, name, value);
      }
    }
  };

  _setHiddenValue = (name, value) => {
    let { formHidden } = this.state;
    if (formHidden) {
      Accessor.Set(formHidden, name, value);
      this.setState({ formHidden });
    }
  };

  _ClearHidden = () => {
    this.setState({
      formHidden: {},
    });
  };

  _onBlurAutoSubmit = () => {
    let { enableOnBlurAutoSubmit } = this.state;
    if (enableOnBlurAutoSubmit) {
      console.log("_onBlurAutoSubmit");
      this._onSubmit();
    }
  };

  _onBlurInlineSubmit = (field, crteria) => {
    let { enableOnBlurInlineSubmit } = this.state;
    if (enableOnBlurInlineSubmit) {
      console.log("_onBlurInlineSubmit");
      this._onInlineSubmit(field, crteria);
    }
  };

  _onSubmit = (e) => {
    console.log("_onSubmit");
    if (e && e.preventDefault) e.preventDefault();
    let { onSubmit, formValue, formHidden, onInvalid, formError } = this.state;

    if (!this.ValidateForm()) {
      console.log("Form invalid", formError);
      if (onInvalid) {
        onInvalid(formValue, formError);
      }
      return;
    }

    if (onSubmit) {
      onSubmit(_.merge(formValue, formHidden));
    }
    return false;
  };

  _onInlineSubmit = (field, criteria) => {
    console.log("_onInlineSubmit");
    let { onInlineSubmit, formValue, formHidden } = this.state;
    let value = Accessor.Get(formValue, field);

    if (!this._Validate(field, value, criteria)) {
      return;
    }

    let fprops = {
      [field]: value,
    };
    let props = _.merge(fprops, formHidden);

    if (onInlineSubmit) {
      onInlineSubmit(field, value, props);
    }
    return false;
  };

  _onCancel = () => {
    console.log("_onCancel");
    let { onCancel } = this.state;
    if (onCancel) {
      onCancel();
    }
  };

  _onClear = () => {
    console.log("_onClear");

    this.setState({
      formValue: {},
    });
    let { onClear } = this.state;
    if (onClear) {
      onClear();
    }
  };

  _onRevert = () => {
    console.log("_onRevert");
    let { onRevert } = this.state;
    let { defaultValue } = this.props;
    this._FillForm(defaultValue);
    if (onRevert) {
      onRevert();
    }
  };

  _onInlineRevert = (field) => {
    console.log("_onInlineRevert");
    let { onInlineRevert, defaultValue, formValue } = this.state;
    let dvalue = Accessor.Get(_.clone(defaultValue), field);
    Accessor.Set(formValue, field, dvalue);

    this.setState(
      {
        formValue: _.clone(formValue),
      },
      () => {
        if (onInlineRevert) {
          onInlineRevert(field);
        }
      }
    );
  };

  getSchema = () => {
    let {schema, formValue, addOns} = this.props;
    if(_.isFunction(schema)){
      return schema(formValue, addOns);
    }
    return schema;
  }

  getInnerSchema = (cschema) => {
    let {formValue, addOns} = this.props;
    if(_.isFunction(cschema)){
      return cschema(formValue, addOns);
    }
    return cschema;
  }

  ValidateForm = () => {
    let { formError } = this.state;
    if (Accessor.isDeepEmpty(formError)) {
      this._ClearError();
      return true;
    }
    return false;
  };

  _Validate = (name, value, criteria = []) => {
    let { formError } = this.state;
    if (_.isEmpty(criteria)) return true;

    let error = "";
    _.map(criteria, (o, i) => {
      if (!Validation.Rules[o](value)) {
        if (_.isEmpty(error)) {
          error = Validation.ErrorMsg[o];
        }
      }
    });

    if (_.isEmpty(error)) {
      Accessor.Delete(formError, name);
    } else {
      Accessor.Set(formError, name, error);
    }

    this.setState({
      formError,
    });

    return _.isEmpty(error);
  };

  renderSchema() {
    let schema = this.getSchema();
    let blocks = [];

    _.map(schema, (o, i) => {
      if(_.isFunction(o)){
        let subschema = this.getInnerSchema(o);
        console.log(subschema);
        _.map(subschema, (v, w) => {
          if(_.isArray(v)){
            _.map(v, (j, k) => {
              let id = "inner_" + i + "_" + w + "_" + k;
              blocks.push(this.renderBlock(j, id));
            });
          } else {
            let id = "inner_" + i + "_" + w;
            blocks.push(this.renderBlock(v, id));
          }
        });
      } else if(_.isArray(o)){
        _.map(o, (v, w) => {
          if(_.isArray(v)){
            _.map(v, (j, k) => {
              let id = "inner_" + i + "_" + w + "_" + k;
              blocks.push(this.renderBlock(j, id));
            });
          } else {
            let id = "inner_" + i + "_" + w;
            blocks.push(this.renderBlock(v, id));
          }
        });
      } else {
        blocks.push(this.renderBlock(o, i));
      }
    });

    return blocks;
  }

  renderBlock(schema, id){
    let { formValue, formError } = this.state;
    return (
      <FItem
        key={id}
        ischema={schema}
        preAccessor=""
        _onValueChange={this._onValueChange}
        _onBlurInlineSubmit={this._onBlurInlineSubmit}
        _onInlineSubmit={this._onInlineSubmit}
        _onInlineRevert={this._onInlineRevert}
        _setHiddenValue={this._setHiddenValue}
        _Validate={this._Validate}
        formValue={formValue}
        formError={formError}
        {...this.props}
      />
    );
  }

  renderButtons() {
    let { buttons, buttonWidth } = this.state;
    let buttonsJSX = {
      OK: (
        <StyledButton className={"formizo-h-m"} addkey={0} 
          theme={{ 
            color: "grey", 
            background: "white",
            boxShadow: ColorX.GetBoxShadowCSS("grey"),
            width: buttonWidth 
          }} onClick={this._onCancel}>
          <i className="fas fa-check" />
          <div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.OK")}</div>
        </StyledButton>
      ),
      Submit: (
        <StyledButton className={"formizo-h-m"} key={1} 
          theme={{ 
            color: "green", 
            background: "white", 
            boxShadow: ColorX.GetBoxShadowCSS("grey"),
            width: buttonWidth
             }} onClick={this._onSubmit}>
          <i className="fas fa-paper-plane" />
          <div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.Submit")}</div>
        </StyledButton>
      ),
      Cancel: (
        <StyledButton className={"formizo-h-m"} key={2}  
          theme={{ 
            color: "red", 
            background: "white", 
            boxShadow: ColorX.GetBoxShadowCSS("grey"),
            width: buttonWidth 
            }} onClick={this._onCancel}>
          <i className="fas fa-ban" />
          <div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.Cancel")}</div>
        </StyledButton>
      ),
      Clear: (
        <StyledButton className={"formizo-h-m"} key={3} 
          theme={{ 
            color: "blue", 
            background: "white", 
            boxShadow: ColorX.GetBoxShadowCSS("grey"),
            width: buttonWidth 
            }} onClick={this._onClear}>
          <i className="fas fa-undo" />
          <div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.Clear")}</div>
        </StyledButton>
      ),
      Revert: (
        <StyledButton className={"formizo-h-m"} key={4} 
          theme={{ 
            color: "orange", 
            background: "white", 
            boxShadow: ColorX.GetBoxShadowCSS("grey"),
            width: buttonWidth 
            }} onClick={this._onRevert}>
          <i className="fas fa-history" />
          <div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.Revert")}</div>
        </StyledButton>
      ),
      Login: (
        <StyledButton className={"formizo-h-m"} key={5} 
          theme={{ 
            color: "purple",
            background: "white", 
            boxShadow: ColorX.GetBoxShadowCSS("grey"),
            width: buttonWidth 
            }} onClick={this._onSubmit}>
          <i className="fas fa-sign-in-alt" />
          <div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.Login")}</div>
        </StyledButton>
      ),
      Logout: (
        <StyledButton className={"formizo-h-m"} key={6} 
          theme={{ 
            color: "yellow", 
            background: "white", 
            boxShadow: ColorX.GetBoxShadowCSS("grey"),
            width: buttonWidth 
            }} onClick={this._onSubmit}>
          <i className="fas fa-sign-out-alt" />
          <div className="formizo-h-m">{LocaleX.Get("__IZO.Formizo.Logout")}</div>
        </StyledButton>
      ),
    };

    return _.map(buttons, (o, i) => {
      if (_.isString(o) && buttonsJSX[o]) return buttonsJSX[o];
      else {
        return o;
      }
    });
  }

  renderForm() {
    let { buttons, buttonAlign, buttonPadding } = this.state;
    return (
      <VStack>
        <VStack alignItems={"flex-start"} padding="0 5px" width="100%" flexGrow={1} overflow={"auto"}>
          {this.renderSchema()}
          <Spacer/>
        </VStack>
        {buttons && buttons.length> 0 &&
          <HStack padding={buttonPadding}>
            {buttonAlign === "right" && <Spacer/> }
            {this.renderButtons()}
            {buttonAlign === "left" && <Spacer/> }
          </HStack>
        }
        <Spacer/>
      </VStack>
    );
  }

  render() {
    let { formID, width, height } = this.props;
    return (
      <Box width={width} height={height} overflow="auto">
        <form id={formID} style={{ width: "100%", height: "100%" }} onBlur={() => this._onBlurAutoSubmit()} noValidate onSubmit={(e) => this._onSubmit(e)}>
          {this.renderForm()}
        </form>
      </Box>
    );
  }
}

export default Formizo;
