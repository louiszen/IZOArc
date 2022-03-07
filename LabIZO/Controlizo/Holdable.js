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
      startTime: null
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

  handlePress = (e) => {
    let {longPressInterval, disabled, onHold, onHoldInterval, forceLongPress, stopPropagation} = this.props;
    if(stopPropagation){
      e.stopPropagation();
    }
    
    clearInterval(this.repeat);

    if(onHold){
      onHold();
      this.repeat = setInterval(onHold, onHoldInterval);
    }
    if(disabled) return;
    this.setState({
      pressed: true,
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
      pressed: false
    });

    if(onLongPress){
      onLongPress();
    }else{
      if(onPress){
        onPress();
      } 
    }
  }

  handleRelease = (e) => {
    let {pressed, startTime} = this.state;
    let {longPressInterval, onPress, onLongPress, disabled} = this.props;

    if(!pressed) return;
    if(disabled) return;

    let timeLapse = ZTime.Now() - startTime;

    this.setState({ 
      pressed: false
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

  handleLeave = (e) => {
    let {pressed} = this.state;
    let {disabled} = this.props;

    if(!pressed) return;
    if(disabled) return;
    this.setState({ 
      pressed: false
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
          onTouchStart={(e) => this.handlePress(e)}
          onTouchMove={(e) => this.handleLeave(e)}
          onTouchEnd={(e) => this.handleRelease(e)}
          >
            {children}
        </div>
      );
    }else{
      return (
        <div 
          className={"holdable" + (pressed? " pressed" : "") + (disabled? " disabled" : "")}
          onMouseDown={(e) => this.handlePress(e)}
          onMouseUp={(e) => this.handleRelease(e)}
          onMouseLeave={(e) => this.handleLeave(e)}
          >
            {children}
        </div>
      );
    }
    
  }

}

export default Holdable;
