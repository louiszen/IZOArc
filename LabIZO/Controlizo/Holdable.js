import React, { Component } from "react";
import { Accessor, ZTime } from "IZOArc/STATIC";
import PropsType from "prop-types";

import "./Holdable.css";

/**
 * @augments {Component<Props, State>}
 */
class Holdable extends Component {

  static propTypes = {
    onHold: PropsType.func,
    onPress: PropsType.func,
    onLongPress: PropsType.func,

    longPressInterval: PropsType.number,
    onHoldInterval: PropsType.number,
    
    forceLongPress: PropsType.bool,
    stopPropagation: PropsType.bool,

    disabled: PropsType.bool,
  }

  static defaultProps = {
    onHold: null,
    onPress: null,
    onLongPress: null,

    longPressInterval: 1500,
    onHoldInterval: 100,
    
    forceLongPress: true,
    stopPropagation: true,

    disabled: false
  }

  constructor(){
    super();
    this.state = {
      pressed: false,
      startTime: null,
      touching: false
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Holdable.defaultProps))){
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

  handlePress = (e, touch) => {
    let {touching} = this.state;
    let {longPressInterval, disabled, onHold, onHoldInterval, forceLongPress, stopPropagation} = this.props;
    if(stopPropagation){
      e.stopPropagation();
    }
    if(touching) return;
    
    clearInterval(this.repeat);

    if(onHold){
      onHold();
      this.repeat = setInterval(onHold, onHoldInterval);
    }
    if(disabled) return;
    this.setState({
      pressed: true,
      touching: touch,
      startTime: ZTime.Now()
    });
    if(forceLongPress){
      this.timer = setTimeout(this.forceLongPress, longPressInterval);
    }
  }

  forceLongPress = () => {
    let {onPress, onLongPress, disabled} = this.props;
    if(disabled) return;
    this.setState({ 
      pressed: false,
      touching: false
    });

    if(onLongPress){
      onLongPress();
    }else{
      if(onPress){
        onPress();
      } 
    }
  }

  handleRelease = (e, touch) => {
    let {pressed, startTime} = this.state;
    let {longPressInterval, onPress, onLongPress, disabled} = this.props;

    if(!pressed) return;
    if(disabled) return;

    let timeLapse = ZTime.Now() - startTime;

    this.setState({ 
      pressed: false,
      touching: false
    });
    
    if(timeLapse < longPressInterval){
      if(onPress) onPress();
    }else{
      if(onLongPress){
        onLongPress();
      }else{
        if(onPress){
          onPress();
        } 
      }
    }
    clearTimeout(this.timer);
    clearInterval(this.repeat);
  }

  handleLeave = (e, touch) => {
    let {pressed} = this.state;
    let {disabled} = this.props;

    if(!pressed) return;
    if(disabled) return;
    this.setState({ 
      pressed: false,
      touching: false
    });
    clearTimeout(this.timer);
    clearInterval(this.repeat);
  }

  render(){
    let { children, disabled } = this.props;
    let { pressed } = this.state;
    let isTouchDevice = "ontouchstart" in document.documentElement;
    if(isTouchDevice){
      return (
        <div 
          className={"holdable" + (pressed? " pressed" : "") + (disabled? " disabled" : "")}
          onTouchStart={(e) => this.handlePress(e, true)}
          onTouchMove={(e) => this.handleLeave(e, true)}
          onTouchEnd={(e) => this.handleRelease(e, true)}
          >
            {children}
        </div>
      );
    }else{
      return (
        <div 
          className={"holdable" + (pressed? " pressed" : "") + (disabled? " disabled" : "")}
          onMouseDown={(e) => this.handlePress(e, false)}
          onMouseUp={(e) => this.handleRelease(e, false)}
          onMouseLeave={(e) => this.handleLeave(e, false)}
          >
            {children}
        </div>
      );
    }
    
  }

}

export default Holdable;
