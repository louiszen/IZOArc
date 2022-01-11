import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Typography } from "@mui/material";

import "./animatizo.css";

import { Accessor } from "IZOArc/STATIC";

/**
 * Horizontal Marquee for overflow text
 * @augments {Component<Props, State>}
 */
class HMarquee extends Component {

  static propTypes = {
    width: PropsType.any,
    speed: PropsType.number,
    pause: PropsType.number,
  }

  static defaultProps = {
    width: "100%",
    speed: 1.5,
    pause: 2
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(HMarquee.defaultProps))){
      this._setAllStates();
      return;
    }

    if(!this.state.element || 
        (this.element 
          && prevState 
          && prevState.sWidth !== this.element.scrollWidth)){
      this._setAllStates();
      return;
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
      element: this.element,
      sWidth: this.element && this.element.scrollWidth, 
      oWidth: this.element && this.element.offsetWidth,
      overflowed: this.isElementOverflowing(),
      speed: this.getSpeed()
    }));
  }

  isElementOverflowing = () => {
    let {oWidth, sWidth} = this.state;
    let overflowX = oWidth < sWidth;
    return overflowX;
  }

  getSpeed = () => {
    let {sWidth} = this.state;
    let {speed} = this.props;
    return (sWidth / 30 * speed).toFixed(3);
  }

  renderChildren(children){
    let {speed, overflowed, pause} = this.state;
    let style = {};
    
    if(overflowed){
      style = {
        animation: "scroll " + speed + "s linear " + pause + "s infinite"
      };
    }

    if(React.isValidElement(children)){
      return React.cloneElement(children, 
        {
          ...children.props,
          style: {
            ...children.props.style,
            ...style
          }
        });
    }
    return _.map(children, (o, i) => {
      if(!o){
        return null;
      }else if(_.isArray(o)){
        return _.map(o, (v, x) => {
          return this.renderChildren(v);
        });
      }else if(_.isString(o)){
        return <Typography key={i} style={style}>{o}</Typography>;
      }else if(!React.isValidElement(o)){
        console.log(o);
        //return o;
      }else if(i === children.length - 1 || !o.props){
        return React.cloneElement(o, {...o.props, key: i});
      }else{
        return React.cloneElement(o, 
          {
            ...o.props, 
            key: i, 
            style: {
              ...o.props.style,
              ...style
            }
          });
      }
    });
  }

  render(){
    let {children, width} = this.props;

    let style = {
      overflowX: "hidden",
      flexWrap: "nowrap",
      width: width
    };

    return (
      <div style={style} ref={(e) => {this.element = e;}}>
        {this.renderChildren(children)}
      </div>
    );
  }

}

export default HMarquee;
