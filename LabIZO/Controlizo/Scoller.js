import React, { Component } from "react";
import PropsType from "prop-types";

import "./Scroller.css";

class Scroller extends Component {

  static propTypes = {
    onMounted: PropsType.func,

    theme: PropsType.string,
    pressed: PropsType.bool,
    disabled: PropsType.bool,
  }

  static defaultProps = {
    onMounted: null,
    theme: "",
    pressed: false,
    disabled: false,
  }

  constructor(){
    super();
    this.state = {
      isScrolling: false,
      offset: 0
    };
  }

  componentDidMount(){
    this.setState((state, props) => ({ 
      ...props
    }));

    if(this.props.onMounted){
      this.props.onMounted({
        getScroll: this._getScroll,
        setOffset: this._setOffset,
        getOffset: this._getOffset,
        scroll: this._scroll
      });
    }
  }

  _getScroll = () => {
    if(this._scroller)
      return this._scroller;
    return null;
  }

  _getOffset = () => {
    return this.state.offset;
  }

  _setOffset = (v, callback) => {
    this.setState({
      offset: v
    }, callback);
  }

  _scrollTo(offset, animated = true) {
    this._scroller.scrollTo({
      left: offset,
      behavior: "smooth"
    });
  }

  _scrollToIE11(offset) {
    this._scroller.scrollLeft = offset;
  }

  _scroll = (x) => {
    let limit = this._scroller.scrollWidth - this._scroller.clientWidth;
    this.setState((stat, prop) => ({
      offset: Math.max(0, Math.min(limit, stat.offset + x))
    }), () => {
      let newOffset = this.state.offset;
      let isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
      if(!isIE11){
        this._scrollTo(newOffset);
      }else{
        this._scrollToIE11(newOffset);
      }
    });
  }

  static getDerivedStateFromProps(nextProps, prevStat){
    if(prevStat !== nextProps){
      return {
        ...nextProps
      };
    }
  }

  componentDidUpdate(prevProps){
    if(this.state !== prevProps){
      this.toggleScrolling(this.state.isScrolling);
    }
  }

  componentWillUnmount(){
    this.removeListener();
  }

  toggleScrolling = (isEnable) => {
    if (isEnable) {
      this.addListener();
    } else {
      this.removeListener();
    }
  };

  onMouseMove = (event) => {
    if(!this._scroller) return;
    const {clientX, scrollLeft, scrollTop, clientY} = this.state;
    this._scroller.scrollLeft = scrollLeft - (event.clientX - clientX);
    this._scroller.scrollTop = scrollTop - (event.clientY - clientY);
  };

  onMouseUp =  () => {
    this.setState({
      isScrolling: false, 
      scrollLeft: 0, 
      scrollTop: 0,
      clientX: 0, 
      clientY:0
    });
  };

  onMouseDown = (event) => {
    const {scrollLeft, scrollTop} = this._scroller;
    this.setState({
      isScrolling: true, 
      scrollLeft, 
      scrollTop, 
      clientX:event.clientX, 
      clientY:event.clientY
    });
  };

  mountRef = (e) => {
    this._scroller = e;
  };

  addListener(){
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  }

  removeListener(){
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  }

  render(){
    let { children, theme, disabled, pressed} = this.props;
    return (
      <div 
        className={theme + " controlizo-scroll" + (pressed? " pressed " : "") + (disabled? " disabled" : "")}
        ref={e => this.mountRef(e)}
        onMouseDown={e => this.onMouseDown(e)}
        >
          {children}
      </div>
    );
  }
}

export default Scroller;