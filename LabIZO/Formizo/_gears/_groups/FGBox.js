import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";

import FItem from "../FItem";

import { Accessor, ColorX } from "IZOArc/STATIC";
import { Box } from "@mui/system";

class FGBox extends Component {

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
    this.state = {
      open: false
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGBox.defaultProps))){
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

  getBoxSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.box)){
      return ischema.box(formValue, addOns);
    }
    return ischema.box;
  }

  renderSchema(){
    // eslint-disable-next-line no-unused-vars
    let {ischema, ...other} = this.props;
    let foldSchema = this.getBoxSchema();
    return _.map(foldSchema, (o, i) => {
      return (
        <FItem
          key={i}
          ischema={o}
          {...other}/>
      );
    });
  }

  renderInside(){
    let {ischema} = this.state;
    return (
      <Box style={{
        width: "100%", 
        border: "1px solid " + ColorX.GetColorCSS("grey", 0.2), 
        borderRadius: 10,
        padding: 10,
        ...ischema.style
        }}>
        {this.renderSchema()}
      </Box>
    );
  }

  render(){
    let {ischema} = this.state;
    if(!ischema) return null;

    return this.renderInside();
        
  }

}

export default FGBox;
