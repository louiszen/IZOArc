import React, { Component } from "react";

import PropsType from "prop-types";
import { Tooltip } from "@material-ui/core";
import { Grid, Box, Typography } from "@mui/material";

import {FFText, FFHidden, FFPassword, FFNumber,
  FFBool, FFTextarea, FFSelect, FFDate, 
  FFDateRange, FFUpload, FFSlider} from "./_inputs";
  
import { Accessor, ZFunc } from "IZOArc/STATIC";
import { StyledButton } from "IZOArc/LabIZO/Stylizo";
import { HStack, Spacer } from "IZOArc/LabIZO/Stackizo";
import FFRichText from "./_inputs/FFRichText";
import FFSelectTable from "./_inputs/FFSelectTable";

class FField extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    iname: PropsType.string,
    inTable: PropsType.bool,

    //root func
    _onValueChange: PropsType.func.isRequired,
    _onInlineSubmit: PropsType.func,
    _onInlineRevert: PropsType.func,
    _onBlurInlineSubmit: PropsType.func,
    _setHiddenValue: PropsType.func,
    _Validate: PropsType.func,

    //data
    addOns: PropsType.object,

    //runtime
    formValue: PropsType.object.isRequired,
    formError: PropsType.object,

    //access
    user: PropsType.object,

    //controls
    enableInlineSubmit: PropsType.bool,
    errorsShowOnHelperText: PropsType.bool,
    readOnly: PropsType.bool,
    ignoreValidate: PropsType.bool,
    visible: PropsType.bool,

    //style
    fieldStyle: PropsType.oneOf([
      "grid", "standard", "filled", "outlined"
    ]),

    //grid specific
    labelXS: PropsType.number,
    labelPaddingX: PropsType.number,
    labelJustify: PropsType.string,
    fieldXS: PropsType.number,
    fieldPaddingX: PropsType.number,
    separator: PropsType.string,

    //input style
    fieldSize: PropsType.string,
    theme: PropsType.object
  }

  static defaultProps = {
    ischema: {},
    iname: "",
    inTable: false,

    _onValueChange: () => {},
    _onBlurInlineSubmit: () => {},
    _onInlineSubmit: () => {},
    _onInlineRevert: () => {},
    _setHiddenValue: () => {},
    _Validate: () => {},

    addOns: {},
    
    formValue: {},
    formError: {},

    user: null,

    enableInlineSubmit: false,
    errorsShowOnHelperText: true, 
    readOnly: false,
    ignoreValidate: true,
    visible: true,

    fieldStyle: "grid",

    labelXS: 3,
    labelPaddingX: 1,
    labelJustify: "flex-end",
    fieldXS: 6,
    fieldPaddingX: 1,
    separator: "1px solid rgba(125, 125, 125, 0.2)",

    fieldSize: "normal",
    theme: {}
    
  }

  constructor(){
    super();
    this.state = {
      focusing: false
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FField.defaultProps))){
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
      ...props
    }), callback);
  }

  _onFieldFocus = () => {
    this.setState({
      focusing: true
    });
  }

  _onFieldBlur = () => {
    setTimeout( () => {
      this.setState({
        focusing: false
      });
    }, 150);
  }

  renderDisplay(){
    let {formValue, addOns, ischema, iname, _onValueChange} = this.state;
    let {Custom} = ischema;
    
    let fvalue = Accessor.Get(formValue, iname);

    if(Custom){
      return (
        <HStack key={"display"}>
          {Custom(formValue, fvalue, addOns, _onValueChange)}
        </HStack>
      );
    }
    return (
      <HStack key={"display"}>
        <HStack justifyContent="flex-start">
          <Typography>
            {fvalue}
          </Typography>
        </HStack>
      </HStack>
    );
  }

  renderText(){

    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);

    return (
      <FFText
        key={"text"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderTextarea(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);

    return (
      <FFTextarea
        key={"textarea"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderRichText(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);

    return (
      <FFRichText
        key={"richtext"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderNumber(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);

    return (
      <FFNumber
        key={"number"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderPassword(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);
    return (
      <FFPassword
        key={"password"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderBool(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);
    return (
      <FFBool
        key={"bool"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderSelect(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);
    return (
      <FFSelect
        key={"bool"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderSlider(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);

    return (
      <FFSlider
        key={"slider"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderHidden(){
    return (
      <FFHidden
        key={"hidden"}
        {...this.props}
        />
    );
  }

  renderDate(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);
    return (
      <FFDate
        key={"date"}
        itype={ischema.dateType || "date"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderDateRange(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);
    return (
      <FFDateRange
        key={"date"}
        itype={ischema.dateType || "date"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderUpload(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);
    return (
      <FFUpload
        key={"date"}
        itype={ischema.dateType || "date"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderSelectTable(){
    let {ischema, fieldStyle} = this.state;
    let ifieldStyle = (ischema.variant || fieldStyle);
    return (
      <FFSelectTable
        key={"selectTable"}
        ifieldStyle={ifieldStyle}
        _onFieldFocus={this._onFieldFocus}
        _onFieldBlur={this._onFieldBlur}
        {...this.props}
        />
    );
  }

  renderInside(){
    let {ischema} = this.state;
    let {format} = ischema;
    if(!format) return null;
    switch(format){
      case "display": case "custom": 
        return this.renderDisplay();
      case "text":
        return this.renderText();
      case "textarea":
        return this.renderTextarea();
      case "hidden":
        return this.renderHidden();
      case "number":
        return this.renderNumber();
      case "password":
        return this.renderPassword();
      case "bool":
        return this.renderBool();
      case "select":
        return this.renderSelect();
      case "date":
        return this.renderDate();
      case "daterange":
        return this.renderDateRange();
      case "file":
        return this.renderUpload();
      case "slider":
        return this.renderSlider();
      case "richtext":
        return this.renderRichText();
      case "selectTable":
        return this.renderSelectTable();
      default:
    }
  }

  renderInlineSubmitButtons(){
    let {ischema, enableInlineSubmit, focusing, preAccessor, 
      _onInlineSubmit, _onInlineRevert} = this.state;
    
    let {format} = ischema;
    if(format === "display" || format === "hidden") return null;

    if(enableInlineSubmit){
      return [
        <StyledButton
          className="formizo-h-m" 
          theme={{
            color: "green", 
            display: focusing? "inline-flex" : "none",
            width: 30
          }}
          onClick={() => _onInlineSubmit(preAccessor + ischema.name)}>
          <Tooltip title="Submit" key={0} arrow={true}>
            <i className="far fa-check-circle"/>
          </Tooltip>
        </StyledButton>,
        <StyledButton
          className="formizo-h-m" 
          theme={{
            color: "orange",
            display: focusing? "inline-flex" : "none",
            width: 30
          }}
          onClick={() => _onInlineRevert(preAccessor + ischema.name)}>
          <Tooltip title="Revert" key={1} arrow={true}>
            <i className="fas fa-history"/>
          </Tooltip>
        </StyledButton>
      ];
    }
  }

  renderField(){
    
    let {ischema, fieldStyle, inTable, enableInlineSubmit, formValue, addOns} = this.state;
    let vstyle = (ischema.variant || fieldStyle);

    let label = ZFunc.IfFuncExec(ischema.label, formValue, addOns);
    
    if(!inTable && vstyle === "grid" && !ischema.noLabelGrid && ischema.format !== "selectTable"){
      let {labelXS, labelPaddingX, labelJustify,
        fieldXS, fieldPaddingX, separator} = this.state;
      return (
        <Grid container key={"grid"}>
          <Grid container item xs={labelXS + (enableInlineSubmit? 0: 1)} key={0}>
            <Box paddingX={labelPaddingX} borderRight={separator} width={"100%"} height={"100%"}>
              <HStack justifyContent={labelJustify} height="100%">
                <Typography>
                  {label}
                </Typography> 
              </HStack>
            </Box>              
          </Grid>
          <Grid container item xs={fieldXS + (enableInlineSubmit? 0: 2)} key={1} >
            <Box paddingX={fieldPaddingX} width={"100%"}>
              {this.renderInside()}
            </Box>  
          </Grid>
          {enableInlineSubmit && 
            <Grid container item xs={3}  key={2}>
              <Box paddingX={fieldPaddingX} width={"100%"}>
                {this.renderInlineSubmitButtons()}
              </Box>  
            </Grid>
          }
        </Grid>
      );
    }else{
      if(enableInlineSubmit){
        return [
          this.renderInside(),
          this.renderInlineSubmitButtons()
        ];
      }else{
        return this.renderInside();
      }
      
    }
  }

  render(){
    if(!this.state || !this.state.ischema) return null;

    return (
      <HStack>
        {this.renderField()}
        <Spacer/>
      </HStack>
    );
  }

}

export default FField;
