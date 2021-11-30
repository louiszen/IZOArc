import React, { Component } from "react";

import PropsType from "prop-types";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import MUIUtils from "./_gears/MUIUtils";

import { Accessor, ColorX } from "IZOArc/STATIC";

const styles = {
  root: {
    background: MUIUtils.getMappedProps(ColorX.GetBGColorCSS, "theme.background", "theme.color"),
    borderRadius: MUIUtils.getProps("theme.borderRadius"),
    border:  MUIUtils.getProps("theme.border"),
    borderBottom: MUIUtils.getProps("theme.borderBottom"),
    borderTop: MUIUtils.getProps("theme.borderTop"),
    borderLeft: MUIUtils.getProps("theme.borderLeft"),
    borderRight: MUIUtils.getProps("theme.borderRight"),
    color: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.label", "theme.color"),
    height: MUIUtils.getProps("theme.height"),
    width: MUIUtils.getProps("theme.width"),
    minHeight: MUIUtils.getProps("theme.minHeight"),
    minWidth: MUIUtils.getProps("theme.minWidth"),
    maxHeight: MUIUtils.getProps("theme.maxHeight"),
    maxWidth: MUIUtils.getProps("theme.maxWidth"),
    padding: MUIUtils.getProps("theme.padding"),
    margin: MUIUtils.getProps("theme.margin"),
    position: MUIUtils.getProps("theme.position"),
    boxShadow: MUIUtils.getProps("theme.boxShadow", "theme.color"),
    "&:hover": {
      color: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.hover.color", "theme.label", "theme.color"),
      fontWeight: MUIUtils.getProps("theme.hover.fontWeight"),
      background: MUIUtils.getMappedProps(ColorX.GetBGColorCSS, "theme.hover.background", "theme.color"),
      border: MUIUtils.getProps("theme.hover.border"),
      borderBottom: MUIUtils.getProps("theme.hover.borderBottom"),
      borderTop: MUIUtils.getProps("theme.hover.borderTop"),
      borderLeft: MUIUtils.getProps("theme.hover.borderLeft"),
      borderRight: MUIUtils.getProps("theme.hover.borderRight"),
    },
    "&:disabled": {
      color: MUIUtils.getMappedProps(ColorX.GetColorCSS, "theme.disabled.color"),
      fontWeight: MUIUtils.getProps("theme.disabled.fontWeight"),
      background: MUIUtils.getMappedProps(ColorX.GetBGColorCSS, "theme.disabled.background"),
      border: MUIUtils.getProps("theme.disabled.border"),
      borderBottom: MUIUtils.getProps("theme.disabled.borderBottom"),
      borderTop: MUIUtils.getProps("theme.disabled.borderTop"),
      borderLeft: MUIUtils.getProps("theme.disabled.borderLeft"),
      borderRight: MUIUtils.getProps("theme.disabled.borderRight"),
    },
    display: MUIUtils.getProps("theme.display"),
    visibility: MUIUtils.getProps("theme.visibility"),
    opacity: MUIUtils.getProps("theme.opacity"),
    textTransform: MUIUtils.getProps("theme.textTransform"),
    zIndex: MUIUtils.getProps("theme.zIndex"),
  },
};

/**
 * Styled Buttons
 * @augments {Component<Props, State>}
 * @property {{
 *  color: Color,
 *  background: Color,
 *  label: Color,
 *  boxShadow: Color,
 *  hover: Color,
 * }} theme
 */
class StyledButton extends Component {

  static propTypes = {
    theme: PropsType.object
  }

  static defaultProps = {
    theme: {},
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.setState((state, props) => ({
      ...props,
    }));
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props)){
      this.componentDidMount();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  render(){
    let props = Accessor.Exclude(this.props, Object.keys(StyledButton.defaultProps));
    return (
      <Button
        {...props}
      />
    );
  }

}

export default withStyles(styles)(StyledButton);
