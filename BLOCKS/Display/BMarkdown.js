import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";

import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";

import emoji from "emoji-dictionary";
import _ from "lodash";

import "./_css/github-markdown-light.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import * as theme from "react-syntax-highlighter/dist/esm/styles/prism";

/**
 * @augments {Component<Props, State>}
 */
class BMarkdown extends Component {

  static propTypes = {
    width: PropsType.oneOfType([PropsType.string, PropsType.number]),
    height: PropsType.oneOfType([PropsType.string, PropsType.number]),
  }

  static defaultProps = {
    width: "100%",
    height: "fit-content",
    codeTheme: "vs"
  }

  emojiSupport = text => {
    return text.replace(/:\w+:/gi, name => emoji.getUnicode(name));
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(BMarkdown.defaultProps))){
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
    let {width, height, children, codeTheme} = this.props;
    if(!_.isString(children)) return <div/>;
    let emojied = this.emojiSupport(children);

    return (
      <div className="markdown-body" style={{width: width, height: height}}>
        <ReactMarkDown 
          children={emojied} 
          skipHtml={false} 
          remarkPlugins={[[remarkGfm]]}
          components={{
            code({node, inline, className, children, ...props}) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  style={theme[codeTheme]}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
          }}/>
      </div>
    );
  }


}

export default BMarkdown;
