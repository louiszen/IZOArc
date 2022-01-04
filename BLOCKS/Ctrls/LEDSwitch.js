import React, { Component } from "react";
import { Accessor, LocaleX } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { StyledIconButton } from "IZOArc/LabIZO/Stylizo";
import { LEDz } from "IZOArc/LabIZO/Luminizo";
import { HStack } from "IZOArc/LabIZO/Stackizo";
import { Tooltip } from "@material-ui/core";

/**
 * @augments {Component<Props, State>}
 */
class LEDSwitch extends Component {

  static propTypes = {
    projID: PropsType.string,
    field: PropsType.string,
    ctrl: PropsType.bool,
    refCtrl: PropsType.bool,
    onCtrlSet: PropsType.func,
    size: PropsType.number
  }

  static defaultProps = {
    projID: "",
    field: "",
    ctrl: false,
    refCtrl: true,
    onCtrlSet: () => {},
    size: 25
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(LEDSwitch.defaultProps))){
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

  Refresh = async () => {
    let {onUpdate} = this.props;
    await onUpdate();
  }

  render(){
    let {ctrl, onCtrlSet, projID, field, refCtrl, size} = this.props;
    return (
      <StyledIconButton size={"small"} onClick={() => onCtrlSet(projID, field, !ctrl)}>
        <Tooltip title={LocaleX.Parse({
          EN: ctrl? (refCtrl !== false? "Accessible" : "Inherited Inaccessible") : "Inaccessible",
          TC: ctrl? (refCtrl !== false? "允許存取" : "上層櫂限禁止存取") : "禁止存取"
        })}>
          <HStack>
            <LEDz color={ctrl? (refCtrl !== false? "pureGreen" : "Warning") : "pureRed"} size={size}/>
          </HStack>
        </Tooltip>
      </StyledIconButton>
    );
  }

}

export default LEDSwitch;
