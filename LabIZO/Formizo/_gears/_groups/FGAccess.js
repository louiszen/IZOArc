import React, { Component } from 'react';

import PropsType from 'prop-types';
import _ from 'lodash';

import FItem from '../FItem';

import Accessizo from 'IZOArc/LabIZO/Accessizo';
import { Accessor } from 'IZOArc/STATIC';

class FGAccess extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,

    formValue: PropsType.object.isRequired,

    //access
    user: PropsType.object,

    addOns: PropsType.object
  }

  static defaultProps = {
    //data
    ischema: {},
    formValue: {},
    
    //access
    user: null,

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FGAccess.defaultProps))){
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

  getAccessizoSchema = () => {
    let {ischema, formValue, addOns} = this.props;
    if(_.isFunction(ischema.accessizo)){
      return ischema.accessizo(formValue, addOns);
    }
    return ischema.accessizo;
  }

  renderSchema(){
    let {ischema, ...other} = this.props;
    let schema = this.getAccessizoSchema();

    return _.map(schema, (o, i) => {
      return (
        <FItem
          key={i}
          ischema={o}
          {...other}/>
      );
    });
  }

  render(){
    let {ischema, user} = this.state;
    if(!ischema) return null;
    return (
      <Accessizo 
        reqAuth={ischema.reqAuth} 
        reqLevel={ischema.reqLevel} 
        reqFunc={ischema.reqFunc}
        reqGroup={ischema.reqGroup}
        reqRole={ischema.reqRole}
        user={user}>
        {this.renderSchema()}
      </Accessizo>
    );
  }

}

export default FGAccess;
