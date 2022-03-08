import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/system";
import EmojiPicker from "emoji-picker-react";

/**
 * @augments {Component<Props, State>}
 */
class WEmoji extends Component {

  static propTypes = {
    theme: PropsType.string,
    _onEmojiClick: PropsType.func
  }

  static defaultProps = {
    theme: "",
    _onEmojiClick: () => {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WEmoji.defaultProps))){
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
    let {theme, _onEmojiClick} = this.props;
    return (
      <Box className={theme + " chatizo-emoji"}>
        <EmojiPicker onEmojiClick={_onEmojiClick}/>
      </Box>
    );
  }

}

export default WEmoji;
