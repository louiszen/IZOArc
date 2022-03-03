import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import WMsgSys from "./WMsgSys";
import Holdable from "IZOArc/LabIZO/Controlizo/Holdable";
import { Box } from "@mui/system";
import WBHeader from "./_bubble/WBHeader";
import WBFooter from "./_bubble/WBFooter";
import WBBody from "./_bubble/WBBody";

/**
 * @augments {Component<Props, State>}
 */
class WMsg extends Component {

  static propTypes = {
    theme: PropsType.string,

    onMsgPressed: PropsType.func,
    onMsgLongPressed: PropsType.func,

    showHeader: PropsType.bool,
    showFooter: PropsType.bool,

    canClickOnIn: PropsType.bool,
    canClickOnOut: PropsType.bool,

    //base func
    _onQuickReply: PropsType.func,

    //runtime
    pos: PropsType.oneOf(["in", "out"]),
    item: PropsType.object,
    last: PropsType.bool,
    typingBubbles: PropsType.bool,
    hideHeader: PropsType.bool
  }

  static defaultProps = {
    _onQuickReply: () => {},

    pos: "in",
    item: {msg:{text: ""}},
    last: false,
    typingBubbles: false
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WMsg.defaultProps))){
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

  renderHeader(){
    let {showHeader, typingBubbles, item, pos, hideHeader} = this.props;
    if(pos !== "in" || !showHeader || typingBubbles || hideHeader) return;
    let {user} = item;

    return (
      <WBHeader
        {...this.props}
        sender={user}
        />
    );
  }

  renderMsg(){
    let {item} = this.props;
    let {msg} = item;
    return (
      <WBBody
        {...this.props}
        imsg={msg}
        />
    );
  }

  renderFooter(){
    let {showFooter, typingBubbles, item} = this.props;
    if(!showFooter || typingBubbles) return;
    let {createdAt, status, lapseTime} = item;

    return (
      <WBFooter
        {...this.props}
        createdAt={createdAt}
        status={status}
        lapseTime={lapseTime}
        />
    );
  }

  render(){

    let {theme, onMsgPressed, onMsgLongPressed,
      canClickOnIn, canClickOnOut,
      item, pos} = this.props;
    let {_id, msg} = item;

    if(msg && msg.system){
      return (
        <WMsgSys
          {...this.props}
          key={_id}
          text={msg.system}
          />
      )
    }

    let canClick = (canClickOnIn && pos === "in") || (canClickOnOut && pos === "out");

    if(canClick){
      return (
        <Holdable onPress={onMsgPressed} onHold={onMsgLongPressed}>
          <Box className={theme + " chatizo-msg-bubble" + (pos === "in"? " in" : " out")}>
            {this.renderHeader()}
            {this.renderMsg()}
            {this.renderFooter()}
          </Box>
        </Holdable>
      );
    }
    return (
      <Box className={theme + " chatizo-msg-bubble" + (pos === "in"? " in" : " out")}>
        {this.renderHeader()}
        {this.renderMsg()}
        {this.renderFooter()}
      </Box>
    );
  }

}

export default WMsg;
