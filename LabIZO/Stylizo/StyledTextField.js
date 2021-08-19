import React, { Component } from 'react';

import PropsType from 'prop-types';
import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MUIUtils from './_gears/MUIUtils';

import { Accessor, ColorX } from 'IZOArc/STATIC';

const styles = {
  root:{
    '& label.Mui-focused': {
      color: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.label", "theme.input"),
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.lineBefore", "theme.line", "theme.field"),
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.lineAfter", "theme.line", "theme.field"),
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.lineHover", "theme.line", "theme.field"),
    },
    '& .MuiInput-underline:hover:after': {
      borderBottomColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.lineHover", "theme.line", "theme.field"),
    },
    '& .MuiInput-underline:invalid': {
      borderBottomColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.lineError", "theme.line", "theme.field"),
    },
    '& .MuiInput-underline:disabled': {
      borderBottomColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.lineDisabled", "theme.line", "theme.field"),
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.box", "theme.field"),
      },
      '&:hover fieldset': {
        borderColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.boxHover", "theme.field"),
      },
      '&.Mui-focused fieldset': {
        borderColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.boxFocused", "theme.field"),
      },
    },
    color: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.text", "theme.input"),
    backgroundColor: MUIUtils.getMappedProps(ColorX.GetBGColorCSS, "theme.background")
  },
  
}

/**
 * Styled Text Fields
 * @augments {Component<Props, State>}
 * @property {{
 *  input: Color,
 *  label: Color,
 *  line: Color,
 *  field: Color,
 *  lineBefore: Color,
 *  lineAfter: Color,
 *  lineHover: Color,
 *  lineError: Color,
 *  box: Color,
 *  boxHover: Color,
 *  boxFocused: Color,
 *  text: Color,
 *  background: Color
 * }} theme
 */
class StyledTextField extends Component {

  static propTypes = {
    theme: PropsType.object
  }

  static defaultProps = {
    theme: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(StyledTextField.defaultProps))){
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

  render(){
    let props = Accessor.Exclude(this.props, Object.keys(StyledTextField.defaultProps));
    let {classes, InputProps, ...other} = props;
    return (
      <TextField 
        className={classes.root}
        InputProps={{
          className: classes.root,
          ...InputProps
        }}
        {...other}
        />
    );
  }

}

export default withStyles(styles)(StyledTextField);
