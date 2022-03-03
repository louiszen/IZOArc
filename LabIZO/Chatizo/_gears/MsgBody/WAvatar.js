import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/system";
import { ButtonBase } from "@mui/material";

/**
 * @augments {Component<Props, State>}
 */
class WAvatar extends Component {

  static propTypes = {
    theme: PropsType.string,

    iuser: PropsType.shape({
      ID: PropsType.string,
      name: PropsType.string,
      avatar: PropsType.string
    }),

    hideImg: PropsType.bool,

    onAvatarClicked: PropsType.func,

  }

  static defaultProps = {

  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WAvatar.defaultProps))){
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

  renderImg(){
    let {iuser, hideImg, onAvatarClicked, theme} = this.props;
    if(hideImg) return;
    return (
      <ButtonBase className={theme + " chatizo-avatar-btn"} onClick={onAvatarClicked}>
        <img src={iuser.avatar} title={iuser.name} alt={iuser.name}/>
      </ButtonBase>
    );
  }

  render(){
    let {theme} = this.props;
    return (
      <Box className={theme + " chatizo-avatar-main"}>
        {this.renderImg()}
      </Box>
    );
  }

}

export default WAvatar;
