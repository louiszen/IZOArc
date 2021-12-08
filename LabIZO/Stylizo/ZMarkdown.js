import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";

import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

import emoji from "emoji-dictionary";
import _ from "lodash";

import "./_css/github-markdown-light.css";

/**
 * @augments {Component<Props, State>}
 */
class ZMarkdown extends Component {

  static propTypes = {
    width: PropsType.oneOfType([PropsType.string, PropsType.number]),
    height: PropsType.oneOfType([PropsType.string, PropsType.number]),
  }

  static defaultProps = {
    width: "100%",
    height: "fit-to-content"
  }

  emojiSupport = text => {
    return text.replace(/:\w+:/gi, name => emoji.getUnicode(name));
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(ZMarkdown.defaultProps))){
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
    let {width, height, children} = this.props;
    if(!_.isString(children)) return <div/>;

    let emojied = this.emojiSupport(children);

    return (
      <div className='markdown-body' style={{width: width, height: height}}>
        <ReactMarkDown 
          children={emojied} 
          skipHtml={false} 
          remarkPlugins={[[remarkGfm]]}/>
      </div>
    );
  }


}

export default ZMarkdown;
