import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";

import MenuButton from "./MenuButton";

import { Accessor, AuthX, ColorX } from "IZOArc/STATIC";
import { VStack } from "IZOArc/LabIZO/Stackizo";

class MenuButtonList extends Component {

  static propTypes = {
    buttons: PropsType.array,
    mini: PropsType.bool,
    zIndex: PropsType.number
  }

  static defaultProps = {
    buttons: [],
    mini: false,
    zIndex: 50
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(MenuButtonList.defaultProps))){
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

  menuButton(caption, path, fafa, submenu = null, disabled = false){
    let {zIndex, mini} = this.props;
    return (
      <MenuButton
        key={caption}
        caption={caption}
        path={path}
        fafa={fafa}
        submenu={submenu}
        zIndex={zIndex - 1}
        mini={mini}
        disabled={disabled}
        />
    );
  }

  renderButtons(){
    let {buttons} = this.props;
    return _.map(buttons, (o, i) => {
      if(AuthX.Pass(o.auth, o.level, o.group, o.role, o.func)){
        return this.menuButton(o.caption, o.link, o.faIcon, o.submenu, o.disabled);
      }
    });
  }

  render(){
    let {mini, zIndex} = this.props;
    return (
      <VStack style={{
        background: ColorX.GetColorCSS("black"),
        position: "absolute", 
        height: "fit-content",
        top: 0, 
        left: mini? 40: 140,
        zIndex: zIndex - 1,
        boxShadow: ColorX.GetBoxShadowCSS("black")
        }}>
        {this.renderButtons()}
      </VStack>
    );
  }

}

export default MenuButtonList;
