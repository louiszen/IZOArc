import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';
import { Collapse } from '@material-ui/core';

import FItem from '../FItem';

import { Accessor } from 'IZOArc/STATIC';

class FGFold extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGFold.defaultProps))){
      this._setAllStates();
    }

    let {ischema, formValue, open, preAccessor} = this.state;
    if(!ischema) return;
    let controlV;
    let iname = ischema.control;
    if(!_.isEmpty(preAccessor)){
      if(!_.isEmpty(ischema.control)){
        iname = preAccessor + "." + ischema.control;
      }else{
        iname = preAccessor;
      }
    }

    if(ischema.controlFunc && _.isFunction(ischema.controlFunc)){
      let v = Accessor.Get(formValue, iname);
      controlV = ischema.controlFunc(formValue, v);
    }else{
      controlV = Accessor.Get(formValue, iname);
    }

    if(ischema.inverse) { controlV = !controlV; }
    if(controlV !== open){
      this.setState({
        open: controlV
      });
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

  getFoldSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.fold)){
      return ischema.fold(formValue, addOns);
    }
    return ischema.fold;
  }

  renderSchema(){
    let {ischema, ...other} = this.props;
    let foldSchema = this.getFoldSchema();
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
    let {open} = this.state;
    return (
      <Collapse in={open} style={{width:"100%"}}>
        {this.renderSchema()}
      </Collapse>
    );
  }

  render(){
    let {ischema} = this.state;
    if(!ischema) return null;

    return this.renderInside();
        
  }

}

export default FGFold;
