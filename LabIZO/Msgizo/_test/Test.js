import React, { Component } from 'react';
import Accessor from 'IZOArc/STATIC/Accessor';
/* import PropsType from 'prop-types';

import schema from './_schema';
import data from './_data'; */

import Msgizo from 'IZOArc/LabIZO/Msgizo';

class Test extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Test.defaultProps))){
      this._setAllStates();
    }
  }

  _setAllStates = (callback) => {
    this.setState((state, props) => ({
      ...props,
    }), callback);
  }

  render(){
    return (
      <Msgizo>

      </Msgizo>
    );
  }

}

export default Test;
