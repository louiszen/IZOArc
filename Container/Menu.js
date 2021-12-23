import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import _ from "lodash";

import { Box, Tooltip } from "@material-ui/core";
import { VerticalSplit } from "@material-ui/icons";

import { Accessor, ColorX, LocaleX, STORE } from "IZOArc/STATIC";
import { HStack, Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import StyledIconButton from "IZOArc/LabIZO/Stylizo/StyledIconButton";

import { IZOTheme } from "__SYSDefault/Theme";
import { LowerMenu, MainMenu, UpperMenu } from "__SYSDefault/Menu";

import MenuButton from "./_gears/MenuButton";

import "./Container.css";

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

  menuButton(caption, path, fafa, reqAuth, reqLevel = Number.MAX_SAFE_INTEGER, reqGroup = "", reqRole = "", submenu = null, disabled = false){
    return (
      <MenuButton
        key={caption}
        caption={caption}
        path={path}
        fafa={fafa}
        reqAuth={reqAuth}
        reqLevel={reqLevel}
        reqGroup={reqGroup}
        reqRole={reqRole}
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
            return this.menuButton(o.caption, o.link, o.faIcon, o.auth, o.level, o.group, o.role, o.submenu, o.disabled);
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
    }

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
