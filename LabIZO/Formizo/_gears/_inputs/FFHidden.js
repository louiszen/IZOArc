import { Component } from 'react';

import PropsType from 'prop-types';

import { Accessor } from 'IZOArc/STATIC';

/**
 * @augments {Component<Props, State>}
 */
class FFHidden extends Component {

  static propTypes = {
    //data
    ischema: PropsType.object.isRequired,
    iname: PropsType.string.isRequired,

    //root func
    _setHiddenValue: PropsType.func.isRequired,

    //runtime
    formValue: PropsType.object.isRequired,
  }

  static defaultProps = {
    ischema: {},
    iname: "",

    _setHiddenValue: () => {},

    formValue: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(FFHidden.defaultProps))){
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
      let {iname, defaultValue, _setHiddenValue} = this.state;
      let ivalue = Accessor.Get(defaultValue, iname);
      _setHiddenValue(iname, ivalue);
      if(callback) callback();
    });
  }

  render(){
    return null;
  }

}

export default FFHidden;
