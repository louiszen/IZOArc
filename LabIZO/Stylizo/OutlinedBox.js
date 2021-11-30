import React, { Component } from "react";

import PropsType from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import NotchedOutline from "@material-ui/core/OutlinedInput/NotchedOutline";
import { withStyles } from "@material-ui/core/styles";

import MUIUtils from "./_gears/MUIUtils";

import { Accessor, ColorX } from "IZOArc/STATIC";
import { HStack } from "IZOArc/LabIZO/Stackizo";

const styles = {
  root: {
    position: "relative",
    width: "100%"
  },
  content: {
    padding: "18.5px 14px",
    borderRadius: "5px",
    width: "100%"
  },
  inputLabel: {
    color: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.label", "theme.color"),
    position: "absolute",
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: "translate(0, 24px) scale(1)",
    fontWeight: "bold"
    
  },
  notched: {
    borderColor: MUIUtils.getMappedProps(ColorX.GetBorderColorCSS, "theme.border", "theme.color"),
    width: "100%"
  }
};

/**
 * Outlined Box
 * @augments {Component<Props, State>}
 * @property {{
 *  color: Color,
 *  label: Color,
 *  border: Color
 * }} theme
 */
class OutlinedBox extends Component {

  static propTypes = {
    label: PropsType.string,
    theme: PropsType.object,
    style: PropsType.object
  }

  static defaultProps = {
    label: "",
    theme: {},
    style: { 
      position: "relative", 
      marginTop: "8px", 
      width: "100%" 
    }
  }

  constructor(){
    super();

    this.state = {
      labelWidth: 100,
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(OutlinedBox.defaultProps))){
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
      this.setState({
        labelWidth: (this.labelRef != null ? this.labelRef.offsetWidth : 0)
      });
    });
  }

  render(){
    let {classes, id, label, children, style} = this.props;
    let {labelWidth} = this.state;
    return (
      <div style={{...OutlinedBox.defaultProps.style, ...style}}>
        <InputLabel
          ref={e => this.labelRef = e}
          htmlFor={id}
          variant="outlined"
          className={classes.inputLabel}
          shrink
        >
          {label}
        </InputLabel>
        <div className={classes.root}>
          <div id={id} className={classes.content}>
            <HStack>
              {children}
            </HStack>
            <NotchedOutline notched 
              labelWidth={labelWidth} 
              className={classes.notched}/>
          </div>
        </div>
      </div>
    );
  }

}

export default withStyles(styles)(OutlinedBox);

