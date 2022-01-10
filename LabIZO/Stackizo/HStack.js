import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";

import { Accessor } from "IZOArc/STATIC";
import { Box, Typography } from "@mui/material";

/**
 * Stack children components horizontally
 * @augments {Component<Props, State>}
 */
class HStack extends Component {

  static propTypes = {
    flexWrap: PropsType.string,
    justifyContent: PropsType.string,
    alignContent: PropsType.string,
    alignItems: PropsType.string,
    width: PropsType.oneOfType([PropsType.string, PropsType.number]),
    spacing: PropsType.oneOfType([PropsType.string, PropsType.number]),
  }

  static defaultProps = {
    flexWrap: "nowrap",
    justifyContent: "center",
    alignContent: undefined,
    alignItems: "center",
    width: "100%",
    spacing: 0
  }

  constructor(){
    super();
    this.state = {};
  }

  componentDidMount(){
    this.setState((state, props) => ({
      ...props,
    }));
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(HStack.defaultProps))){
      this.componentDidMount();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
        return;
    };
  }

  renderChildren(children){
    let {spacing} = this.props;
    if(React.isValidElement(children)){
      return children;
    }
    return _.map(children, (o, i) => {
      if(!o){
        return null;
      }else if(_.isArray(o)){
        return _.map(o, (v, x) => {
          return this.renderChildren(v);
        });
      }else if(_.isString(o)){
        return <Typography key={i}>{o}</Typography>;
      }else if(!React.isValidElement(o)){
        console.log(o);
        //return o;
      }else if(i === children.length - 1 || !o.props || !spacing){
        return React.cloneElement(o, {...o.props, key: i});
      }else{
        return React.cloneElement(o, 
          {
            ...o.props, 
            key: i, 
            style: {
              marginRight: o.props.margin || o.props.marginRight || (o.props.style && o.props.style.marginRight) || spacing,
              ...o.props.style,
            }
          });
      }
    });
  }

  render(){
    // eslint-disable-next-line no-unused-vars
    let {children, spacing, ...other} = this.props;
    return (
      <Box 
        display="flex" 
        flexDirection="row"
        {...other}
        >
        {this.renderChildren(children)}
      </Box>
    );
  }

}

export default HStack;
