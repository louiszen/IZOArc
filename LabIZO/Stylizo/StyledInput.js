import React, { Component } from 'react';

import PropsType from 'prop-types';
import { Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import MUIUtils from './_gears/MUIUtils';

import { Accessor, ColorX } from 'IZOArc/STATIC';

const styles = {
  root:{
    '&:hover:before': {
      borderBottomColor: MUIUtils.getImportantMappedProps(ColorX.GetColorCSS, "theme.lineHover", "theme.line", "theme.input"),
    },
    '&:before': {
      borderBottomColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.lineBefore", "theme.line", "theme.input"),
    },
    '&:after': {
      borderBottomColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.lineAfter", "theme.line", "theme.input"),
    },
    color: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.text", "theme.input"),
    backgroundColor: MUIUtils.getMappedProps(ColorX.GetBGColorCSS, "theme.background")
  },
}

/**
 * Styled Input Field
 * @augments {Component<Props, State>}
 * @property {{
 *  input: Color,
 *  label: Color,
 *  line: Color,
 *  lineBefore: Color,
 *  lineAfter: Color,
 *  lineHover: Color,
 *  lineDisabled: Color,
 *  lineError: Color,
 *  box: Color,
 *  boxHover: Color,
 *  boxFocused: Color,
 *  text: Color,
 *  background: Color
 * }} theme
 */
class StyledInput extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(StyledInput.defaultProps))){
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
    let props = Accessor.Exclude(this.props, Object.keys(StyledInput.defaultProps));
    let {classes, ...other} = props;
    return (
      <Input
        className={classes.root}
        {...other}
        />
    );
  }

}

export default withStyles(styles)(StyledInput);
