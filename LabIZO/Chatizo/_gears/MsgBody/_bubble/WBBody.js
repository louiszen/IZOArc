import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import { VStack } from "IZOArc/LabIZO/Stackizo";
import WMText from "./_parts/WMText";
import WMButtons from "./_parts/WMButtons";
import WMTyping from "./_parts/WMTyping";

/**
 * @augments {Component<Props, State>}
 */
class WBBody extends Component {

  static propTypes = {
    theme: PropsType.string,

    showQuickRepliesAsButtons: PropsType.bool,
    disableButtonsAfterSend: PropsType.bool, 
    disableTemplateButtonsAfterSend: PropsType.bool,
    typingBubbles: PropsType.bool,
    last: PropsType.bool,

    imsg: PropsType.object
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(WBBody.defaultProps))){
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

  renderText(xtext){
    return (
      <WMText
        {...this.props}
        text={xtext}
        />
    );
  }

  renderImage(ximg){

  }

  renderVideo(xvideo){

  }

  renderButtons(xbtns){
    return (
      <WMButtons
        {...this.props}
        buttons={xbtns}
        />
    );
  }

  renderImgButtons(ximgbtns){
    
  }

  renderTemplates(xtemplates){

  }

  render(){
    let {imsg, theme, showQuickRepliesAsButtons, typingBubbles} = this.props;
    if (typingBubbles){
      return (
        <VStack width="100%" className={theme + " chatizo-msg-body"}>
          <WMTyping {...this.props}/>
        </VStack>
      );
    }
    return (
      <VStack width="100%" className={theme + " chatizo-msg-body"}>
        {imsg.title && this.renderText(imsg.title)}
        {imsg.image && this.renderImage(imsg.image)}
        {imsg.video && this.renderVideo(imsg.video)}
        {imsg.text && this.renderText(imsg.text)}
        {showQuickRepliesAsButtons && imsg.quickReplies && this.renderButtons(imsg.quickReplies)}
        {imsg.buttons && this.renderButtons(imsg.buttons)}
        {imsg.imgButtons && this.renderImgButtons(imsg.imgButtons)}
        {imsg.templates && this.renderTemplates(imsg.tempaltes)}
      </VStack>
    );
  }

}

export default WBBody;
