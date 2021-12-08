import React, { Component } from "react";
import { Accessor } from "IZOArc/STATIC";
import PropsType from "prop-types";
import ReactMarkdown from "react-markdown";
import emoji from "emoji-dictionary";
import _ from "lodash";
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import {unified} from 'unified';
import rehypeStringify from 'rehype-stringify';
import Badge from "react-bootstrap/Badge";

/**
 * @augments {Component<Props, State>}
 */
class ZMarkdown extends Component {

  static propTypes = {

  }

  static defaultProps = {

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
    let {children} = this.props;
    let markdown = `
    ## header1
    # *header2*
| Feature    | Support              |
| ---------: | :------------------- |
| CommonMark | 100%                 |
| GFM        | 100% w/ \`remark-gfm\` |

~~strikethrough~~

* [ ] task list
* [x] checked item
    `;
    let emojied = this.emojiSupport(markdown);

    return (
      <ReactMarkdown>
        {markdown}
      </ReactMarkdown> 
    );
  }


}

export default ZMarkdown;
