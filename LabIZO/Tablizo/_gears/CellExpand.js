import React, { Component } from 'react';

import PropsType from 'prop-types';
import { Paper, Popper, Typography } from '@material-ui/core';

import { Accessor } from 'IZOArc/STATIC';

class CellExpand extends Component {

  static propTypes = {
    value: PropsType.oneOfType([PropsType.string, PropsType.number, PropsType.bool])
  }

  static defaultProps = {
    value: ""
  }

  constructor(){
    super();
    this.state = {
      inDiv: false,
      showPopper: false,
      showFullCell: false,
      anchorEl: null
    };
  }

  componentDidMount(){
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(CellExpand.defaultProps))){
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

  onMouseEnter = (e) => {
    let {clientHeight, scrollHeight, clientWidth, scrollWidth} = this.cellValue;
    let isCurrentlyOverflown = clientHeight < scrollHeight || clientWidth < scrollWidth;
    this.setState({
      inDiv: true
    }, () => {
      setTimeout(() => {
        let {inDiv} = this.state;
        if(inDiv){
          this.setState({
            showFullCell: true,
            showPopper: isCurrentlyOverflown,
            anchorEl: this.cellDiv
          })
        }
      }, 500);
    });
  }

  onMouseLeave = () => {
    this.setState({
      inDiv: false,
      showFullCell: false
    });
  }

  render(){
    let {value, width} = this.props;
    let {showPopper, showFullCell, anchorEl} = this.state;
    return (
      <div
      ref={e => this.wrapper = e}
      style={{
        alignItems: "center",
        lineHeight: "24px",
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex"
      }}
      onMouseEnter={this.onMouseEnter}
      onMouseLeave={this.onMouseLeave}
    >
      <div
        ref={e => this.cellDiv = e}
        style={{
          height: 1,
          width,
          display: "block",
          position: "absolute",
          top: 0
        }}
      />
      <div ref={e => this.cellValue = e} className="cellValue" style={{
        width: "100%",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        alignItems: "center"
      }}>
        {value}
      </div>
      {showPopper && (
        <Popper
          open={showFullCell && anchorEl != null}
          anchorEl={anchorEl}
          style={{ width, marginLeft: -17, zIndex: 50}}
        >
          <Paper
            elevation={1}
            style={{ 
              minHeight: this.wrapper && this.wrapper.offsetHeight - 3
            }}

          >
            <Typography variant="body2" style={{ 
              padding: 8,
              wordWrap: "break-word"
              }}>
              {value}
            </Typography>
          </Paper>
        </Popper>
      )}
    </div>
    );
  }

}

export default CellExpand;
