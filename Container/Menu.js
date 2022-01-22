import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import _ from "lodash";

import { Tooltip } from "@material-ui/core";
import { Box } from "@mui/material";
import { VerticalSplit } from "@mui/icons-material";

import { IZOTheme } from "__SYSDefault/Theme";
import { LowerMenu, MainMenu, UpperMenu } from "__SYSDefault/Menu";

import { Accessor, AuthX, ColorX, LocaleX, STORE } from "IZOArc/STATIC";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import StyledIconButton from "IZOArc/LabIZO/Stylizo/StyledIconButton";

import MenuButton from "./_gears/MenuButton";

import "./Container.css";

/**
 * @typedef {{
 *    caption: String | (() => String),
 *    link: String,
 *    faIcon: JSX.Element | String,
 *    auth?: String,
 *    level?: Number,
 *    group?: String,
 *    role?: String,
 *    func?: String
 *    disabled?: Boolean,
 *    submenu?: [Menu]
 * }} Menu
 */

class Menu extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Menu.defaultProps))){
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
    return (
      <MenuButton
        key={caption}
        caption={caption}
        path={path}
        fafa={fafa}
        submenu={submenu}
        disabled={disabled}
        mini={STORE.mini}
        zIndex={50}
        />
    );
  }

  toggleMini(){
    STORE.toggleMini();
  }

  renderButtons(buttons){
    return (
      <VStack height="fit-content">
        {_.map(buttons, (o, i) => {
          if(AuthX.Pass(o.auth, o.level, o.group, o.role, o.func)){
            return this.menuButton(o.caption, o.link, o.faIcon, o.submenu, o.disabled);
          }
        })}
      </VStack>
    );
  }

  renderPin(){

    let baseCSS = {
      padding: "5px !important",
      width: 25,
      height: 25,
      textTransform: "none",
      color: ColorX.GetColorCSS(IZOTheme.menuFG),
      background: ColorX.GetColorCSS("transparent"),
      hover: {
        color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.4),
        background: ColorX.GetColorCSS("transparent"),
      },
      position: "relative"
    };

    let theme = {
      ...baseCSS
    };

    let minitheme = {
      ...baseCSS,
      color: ColorX.GetColorCSS(IZOTheme.menuFG, 0.4),
      hover: {
        color: ColorX.GetColorCSS(IZOTheme.menuFG),
        background: ColorX.GetColorCSS("transparent"),
      }
    };

    return (
      <HStack style={{paddingRight: 7}}>
        <Spacer/>
        <StyledIconButton theme={STORE.mini? minitheme : theme} onClick={() => this.toggleMini()}>
          <Tooltip title={LocaleX.Get(STORE.mini? "__IZO.MenuBar.ShowLabels" : "__IZO.MenuBar.HideLabels") || ""} aria-label="label" arrow={true} placement="right">
            <VerticalSplit/>
          </Tooltip>
        </StyledIconButton>
      </HStack>
    );
    
  }

  render(){
    return (
      <Box className={"menu " + (STORE.mini? "mini" : "")} width={140} height="100%" bgcolor={ColorX.GetColorCSS(IZOTheme.menuBG)} position="fixed" zIndex={300}>
        <VStack width="100%" style={{paddingTop: 50}}>
          {this.renderPin()}
          <VStack width="100%" style={{paddingTop: 40, paddingBottom: 40}}>
            <VStack spacing={40}>
              {this.renderButtons(UpperMenu)}
              {this.renderButtons(MainMenu)}
            </VStack>
            <Spacer/>
            {this.renderButtons(LowerMenu)}
          </VStack>
        </VStack>
      </Box>
    );
  }

}

export default withRouter(observer(Menu));
