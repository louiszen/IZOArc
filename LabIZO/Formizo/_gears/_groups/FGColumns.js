import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";

import FItem from "../FItem";

import { Accessor } from "IZOArc/STATIC";
import { HStack, VStack } from "IZOArc/LabIZO/Stackizo";

class FGColumns extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    formValue: PropsType.object,
    addOns: PropsType.object
  }

  static defaultProps = {
    ischema: {},
    formValue: {},
    addOns: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGColumns.defaultProps))){
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

  getColmunSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.columns)){
      return ischema.columns(formValue, addOns);
    }
    return ischema.columns;
  }

  getPageSchema = (page) => {
    let {formValue, addOns} = this.props;
    if(_.isFunction(page)){
      return page(formValue, addOns);
    }
    return page;
  }

  renderSchema(page){
    // eslint-disable-next-line no-unused-vars
    let {ischema, ...other} = this.props;
    let pageSchema = this.getPageSchema(page);
    return _.map(pageSchema, (o, i) => {
      return (
        <FItem
          key={i}
          ischema={o}
          {...other}/>
      );
    });
  }

  renderColumns(){
    let {ischema} = this.props;
    if(!ischema) return null;
    let columnSchema = this.getColmunSchema();
    return _.map(columnSchema, (o, i) => {
      return (
        <VStack key={i} width={o.width} height={ischema.height} paddingX={o.paddingX || 1} flexGrow={1} overflow={"auto"}>
          {this.renderSchema(o.page)}
        </VStack>
      );
    });
  }

  render(){
    let {ischema} = this.props;
    if(!ischema) return null;
    return (
      <HStack alignItems={"flex-start"} height="100%" overflow="hidden">
        {this.renderColumns()}
      </HStack>
    );
  }

}

export default FGColumns;
