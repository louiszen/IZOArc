import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import { SysConfig } from "__SYSDefault/Config";

class Landing extends Component {

  static propTypes = {}

  static defaultProps = {}

  componentDidMount(){
    this.setState((state, props) => ({
      ...props,
    }), () => {
      let {loginSys} = SysConfig.Settings;
      this.props.history.push(loginSys? "/Login" : "/Home");
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Landing.defaultProps))){
      this.componentDidMount();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  render(){
    return (
      <div/>
    );
  }

}

export default Landing;
