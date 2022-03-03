import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { Spacer, VStack } from "IZOArc/LabIZO/Stackizo";
import { Typography } from "@mui/material";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";
import { Box } from "@mui/system";

/**
 * @augments {Component<Props, State>}
 */
class WMenu extends Component {

  static propTypes = {
    theme: PropsType.string,
    menu: PropsType.arrayOf(PropsType.shape({
      icon: PropsType.oneOfType([PropsType.func, PropsType.string, PropsType.object]),
      cap: PropsType.oneOfType([PropsType.func, PropsType.string]),
      func: PropsType.func
    })),
    _setShowMenu: PropsType.func,
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMenu.defaultProps))){
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

  renderButton(o){
    let {theme, _setShowMenu} = this.props;
    return (
      <Box className={theme + " chatizo-menu-btn"}>
        <Holdable onPress={() => {
            _setShowMenu(false);
            o.func();
          }}>
          <VStack height={70}>
            <Spacer/>
            {o.icon}
            <Typography className={theme + " chatizo-menu-text"}>
              {o.cap}
            </Typography>
            <Spacer/>
          </VStack>
        </Holdable>
      </Box>
    );
  }

  render(){
    let {theme, menu} = this.props;
    return (
      <div className={theme + " chatizo-menu"}>  
        <div className="chatizo-hexagon center">  
          {this.renderButton(menu[0])}
        </div>  
        <div className="chatizo-hexagon top">  
      
        </div>  
        <div className="chatizo-hexagon top-left">  
      
        </div>  
        <div className="chatizo-hexagon top-right">  
      
        </div>  
        <div className="chatizo-hexagon bottom">  
      
        </div>  
        <div className="chatizo-hexagon bottom-left">  
      
        </div>  
        <div className="chatizo-hexagon bottom-right">  
      
        </div>  
      </div>  
    );
  }

}

export default WMenu;
