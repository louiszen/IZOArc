import React, { Component } from "react";

import { HStack } from "IZOArc/LabIZO/Stackizo";
import { Accessor, STORE, ColorX, LocaleX } from "IZOArc/STATIC";
import { IZOTheme, IZOFontFamily } from "__SYSDefault/Theme";

import { LocaleConfig } from "__SYSDefault/Locale";

import { IconButton, Typography, Tooltip } from "@material-ui/core";
import { Language } from "@material-ui/icons";


/**
 * @augments {Component<Props, State>}
 */
class BLangToggler extends Component {

  static propTypes = {

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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(BLangToggler.defaultProps))){
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

  _ToggleLanguage = () => {
    console.log("_ToggleLanguage");
    let max = LocaleConfig.length;
    let idx = LocaleConfig.findIndex(o => o.code === STORE.lang);
    idx += 1;
    if(idx >= max) idx = 0;
    let newLang = LocaleConfig[idx].code;
    STORE.setLang(newLang);
  }

  render(){
    let langO = LocaleConfig.find(o => o.code === STORE.lang);
    let langLabel = langO.caption;
    return (
      <HStack width="fit-content" marginRight={5}>
        <Tooltip title={LocaleX.GetIZO("NavBar.SwitchLang")} arrow={true} placement="bottom">
          <IconButton style={{color: ColorX.GetColorCSS(IZOTheme.menuFG, 1)}} size="small" onClick={() => this._ToggleLanguage()}>
            <Language/>
          </IconButton>
        </Tooltip>
        <Typography style={{width: 60, marginLeft: 5, fontFamily: IZOFontFamily, fontSize: 14, fontWeight: "bold", color: ColorX.GetColorCSS(IZOTheme.menuFG)}}>
          {langLabel}
        </Typography>
      </HStack>
    );
  }

}

export default BLangToggler;
