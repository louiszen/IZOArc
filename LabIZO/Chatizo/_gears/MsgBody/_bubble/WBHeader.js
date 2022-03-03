import React, { Component } from "react";
import { Accessor, ZFunc } from "IZOArc/STATIC";
import PropsType from "prop-types";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";
import { Typography } from "@mui/material";

/**
 * @augments {Component<Props, State>}
 */
class WBHeader extends Component {

  static propTypes = {

    themeCSS: PropsType.object,

    sender: PropsType.shape({
      ID: PropsType.string,
      name: PropsType.string,
      avatar: PropsType.string
    }),

    onHeaderClicked: PropsType.func,
  }

  static defaultProps = {
    sender: {},
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WBHeader.defaultProps))){
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
    let { sender, themeCSS, onHeaderClicked } = this.props;
    return (
      <Holdable onPress={() => ZFunc.IfFuncExec(onHeaderClicked, sender)}>
        <Typography style={themeCSS?.msgbody?.bubble?.header}>
          {sender.name}
        </Typography>
      </Holdable>
    );
  }

}

export default WBHeader;
