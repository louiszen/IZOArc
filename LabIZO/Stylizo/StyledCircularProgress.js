import React, { Component } from "react";

import PropsType from "prop-types";
import { Box, CircularProgress, Typography, withStyles } from "@material-ui/core";

import MUIUtils from "./_gears/MUIUtils";

import { Accessor, ColorX } from "IZOArc/STATIC";

const styles = {
  root: {
    color: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.bar"),
  }
};

/**
 * Styled circular progress bar
 * @augments {Component<Props, State>}
 * @property {{
 *  bar: Color
 * }} theme
 */
class StyledCircularProgress extends Component {

  static propTypes = {
    theme: PropsType.object,
    withLabel: PropsType.bool,
    value: PropsType.number,
    dp: PropsType.number,
    size: PropsType.number, 
  }

  static defaultProps = {
    theme: {},
    withLabel: false,
    value: undefined,
    dp: 2,
    size: 50
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(StyledCircularProgress.defaultProps))){
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
    let {classes, theme, withLabel, value, size, dp, ...other} = this.props;
    if(withLabel){
      return (
        <Box position="relative" display="inline-flex" style={{width: size, height: size}}>
          <CircularProgress
            variant="determinate"
            value={100}
            style={{color: theme.background || "transparent", width: size, height: size}}
            />
          <CircularProgress 
            classes={classes}
            style={{position: "absolute", width: size, height: size }}
            variant="determinate" 
            value={value}/>
          <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography style={{fontSize: 9, color: theme.label || "black"}}>
              {value.toFixed(dp) + "%"}
            </Typography>
          </Box>
        </Box>
      );
    }
    return (
      <Box>
        <CircularProgress
          variant="determinate"
          value={100}
        />
        <CircularProgress
          classes={classes}
          style={{position: "relative"}}
          value={value}
          {...other}
          />
      </Box>
      
    );
  }

}

export default withStyles(styles)(StyledCircularProgress);
