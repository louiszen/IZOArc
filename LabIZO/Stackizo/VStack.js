import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Box, Typography } from "@material-ui/core";

import { Accessor } from "IZOArc/STATIC";

/**
 * Stack the children component vertically
 * @augments {Component<Props, State>}
 */
class VStack extends Component {

  static propTypes = {
    flexWrap: PropsType.string,
    justifyContent: PropsType.string,
    alignContent: PropsType.string,
    alignItems: PropsType.string,
    height: PropsType.oneOfType([PropsType.string, PropsType.number]),
    spacing: PropsType.oneOfType([PropsType.string, PropsType.number]),
  }

  static defaultProps = {
    flexWrap: "nowrap",
    justifyContent: "flex-start",
    alignContent: undefined,
    alignItems: "center",
    height: "100%",
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
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(VStack.defaultProps))){
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
    }else{
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
                marginBottom: o.props.margin || o.props.marginBottom || (o.props.style && o.props.style.marginBottom) || spacing,
                ...o.props.style,
              }
            });
        }
      });
    }
  }

  render(){
    // eslint-disable-next-line no-unused-vars
    let {children, spacing, ...other} = this.props;
    return (
      <Box
        display="flex" 
        flexDirection="column"
        {...other}
        >
        {this.renderChildren(children)}
      </Box>
    );
  }

}

export default VStack;
