import React, { Component } from 'react';

import PropsType from 'prop-types';
import { LinearProgress, withStyles } from '@material-ui/core';

import MUIUtils from './_gears/MUIUtils';

import { Accessor, ColorX } from 'IZOArc/STATIC';

const styles = {
  root:{
    width: "100%"
  },
  colorPrimary: {
    backgroundColor: MUIUtils.getMappedProps(ColorX.GetBGColorCSS, "theme.background"),
  },
  barColorPrimary: {
    backgroundColor: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.bar"),
  }
};

/**
 * Styled Linear progress bar
 * @augments {Component<Props, State>}
 * @property {{
 *  background: Color,
 *  bar: Color
 * }} theme
 */
class StyledLinearProgress extends Component {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(StyledLinearProgress.defaultProps))){
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
    let props = Accessor.Exclude(this.props, Object.keys(StyledLinearProgress.defaultProps));
    return (
      <LinearProgress
        {...props}
        />
    );
  }

}

export default withStyles(styles)(StyledLinearProgress);
