import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Player } from "video-react";
import { Box } from "@mui/system";

/**
 * @augments {Component<Props, State>}
 */
class WMVideo extends Component {

  static propTypes = {
    theme: PropsType.string,
    ovideo: PropsType.object,
  }

  static defaultProps = {
    theme: "",
    ovideo: {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMVideo.defaultProps))){
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
    let {theme, ovideo} = this.props;
    return (
      <Box className={theme + " chatizo-msg-video"}>
        <Player
          autoPlay={false}
          src={ovideo.src}
          poster={ovideo.poster}/>
      </Box>
    );
  }

}

export default WMVideo;
