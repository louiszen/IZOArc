import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Box } from "@mui/system";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";

/**
 * @augments {Component<Props, State>}
 */
class WMImage extends Component {

  static propTypes = {
    theme: PropsType.string,
    oimage: PropsType.object,
    _onImageClicked: PropsType.func,
  }

  static defaultProps = {
    theme: "",
    oimage: {},
    _onImageClicked: () => {}
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMImage.defaultProps))){
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
    let {theme, oimage, _onImageClicked} = this.props;
    return (
      <Holdable onPress={_onImageClicked}>
        <Box className={theme + " chatizo-msg-image"} style={oimage.style}>
          <img src={oimage.src} alt=""/>
        </Box>
      </Holdable>
    );
  }

}

export default WMImage;
