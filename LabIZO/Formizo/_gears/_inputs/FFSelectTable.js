import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import Tablizo from "IZOArc/LabIZO/Tablizo";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { AuthX } from "IZOArc/STATIC";
import { Typography } from "@material-ui/core";
import _ from "lodash";

/**
 * @augments {Component<Props, State>}
 */
class FFSelectTable extends Component {

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
    addOns: {},

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFSelectTable.defaultProps))){
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
      let {formValue, ischema, iname, _Validate, _onValueChange, ignoreValidate, visible} = this.state;
      let ivalue = Accessor.Get(formValue, iname);
      if(!_.isEmpty(ischema.validate)){
        _Validate(iname, ivalue, ischema.validate, ignoreValidate, visible);
      }
      if(!ivalue && ischema.defaultValue){
        _onValueChange(iname, ischema.defaultValue, ischema.validate, ignoreValidate, visible);
      }
      if(this.MountTablizo){
        this.MountTablizo.SetSelectedRows(ivalue);
      }
    });
  }

  onMountTablizo = (callbacks) => {
    this.MountTablizo = callbacks;
  }

  getSchema = () => {
    let {ischema} = this.props;
    return ischema.selectSchema || [];
  }

  getData = () => {
    let {ischema, addOns} = this.props;
    return Accessor.Get(addOns, ischema.selectRef || "" );
  }

  getIdAccessor = () => {
    let {ischema} = this.props;
    return ischema.selectIdAccessor;
  }

  getLabel = () => {
    let {ischema, formValue, addOns} = this.props;
    let label = ZFunc.IfFuncExec(ischema.label, formValue, addOns);

    if(_.isString(ischema.label)){
      return (
        <HStack width="100%">
          <Typography style={{fontWeight: "bold"}}>
            {label}
          </Typography>
          <Spacer/>
        </HStack>
      );
    }
    return label;
  }

  _onRowSelected = (n) => {
    let selectedRows = this.MountTablizo.GetSelectedRows();
    let {_onValueChange, iname, ischema, ignoreValidate, visible} = this.props;
    _onValueChange(iname, selectedRows, ischema.validate, ignoreValidate, visible);
  }

  render(){
    let {ischema} = this.props;
    let schema = this.getSchema();
    let data = this.getData();
    
    data = _.filter(data, o =>  AuthX.Pass(o.reqAuth, o.reqLevel, o.reqFunc, o.reqGroup, o.reqRole));
    let rowIdAccessor = this.getIdAccessor();
    let label = this.getLabel();
    
    return (
      <VStack width="100%">
        {label}
        <Tablizo
          height="100%"
          schema={schema}
          data={data}
          rowIdAccessor={rowIdAccessor}
          onMounted={this.onMountTablizo}
          showSelector={true}
          density={ischema.density || "compact"}
          onRowSelected={this._onRowSelected}
          datagridProps={{
            hideFooter: true,
            autoHeight: true
          }}
          />
      </VStack>
      
    );
  }

}

export default FFSelectTable;
