import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";
import { Step, StepButton, Stepper } from "@material-ui/core";

import { Accessor } from "IZOArc/STATIC";

import "./style.css";

/**
 * Stepizo - step tabs
 * @augments {Component<Props, State>}
 */
class Stepizo extends Component {

  static propTypes = {
    //runtime data
    steps: PropsType.arrayOf(PropsType.object),
    defaultCompleted: PropsType.arrayOf(PropsType.number),

    activeStep: PropsType.number,
    
    //function
    onMounted: PropsType.func,
    onStepChange: PropsType.func,

    //control
    nonLinear: PropsType.bool,

    //style
    stepWidth: PropsType.oneOfType([PropsType.string, PropsType.number]),
    orientation: PropsType.oneOf(["vertical", "horizontal"]),
    addOns: PropsType.object
  }

  static defaultProps = {
    steps: [],
    defaultCompleted: [],

    activeStep: 0,

    onMounted: undefined,
    onStepChange: () => {},

    nonLinear: true,

    stepWidth: 150,
    orientation: "horizontal",
    addOns: {}
  }

  constructor(){
    super();
    this.state = {
      completed: []
    };
  }

  componentDidMount(){
    this._setAllStates(() => {
      this.setState({
        completed: this.props.defaultCompleted
      });
    });
  }

  componentDidUpdate(prevProps, prevState){
    if(!Accessor.IsIdentical(prevProps, this.props, Object.keys(Stepizo.defaultProps))){
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
    }), () => {
      if(this.props.onMounted){
        this.props.onMounted({
          activeStep: this._getActiveStep,
          setStep: this._setActiveStep,
          isCompleted: this._isCompleted,
          isDisabled: this._isDisabled,
          setCompleted: this._setCompleted,
          setIdxCompleted: this._setIdxCompleted,
          setIdxIncomplete: this._setIdxIncomplete,
          IsAllComplete: this._IsAllComplete,
          Reset: this._Reset
        });
      }
      if(callback) callback();
    });
  }

  _isCompleted = (idx) => {
    return this.state.completed.includes(idx);
  }

  _isDisabled = (idx) => {
    return this.state.disabled.includes(idx);
  }

  _getActiveStep = () => {
    return this.state.activeStep;
  }

  _setActiveStep = (idx) => {
    let {onStepChange} = this.props;  
    if(onStepChange){
      onStepChange(idx);
    }
  }

  _stepOnClick = (idx) => {
    this._setActiveStep(idx);
  }

  _IsAllComplete = () => {
    let {steps} = this.props;
    let {completed} = this.state;

    return steps.length === completed.length;
  }

  _Reset = () => {
    this.setState({
      activeStep: 0,
      completed: []
    });
  }

  _setCompleted = (idxs) => {
    this.setState({
      completed: idxs
    });
  }

  _setIdxCompleted = (idx) => {
    let newCompleted = this.state.completed;
    newCompleted.push(idx);
    this.setState({
      completed: newCompleted
    });
  }

  _setIdxIncomplete = (idx) => {
    let newCompleted = this.state.completed;
    newCompleted = _.filter(newCompleted, o => o !== idx);
    this.setState({
      completed: newCompleted
    });
  }

  isCompleted = (idx) => {
    let {completed} = this.state;
    return completed.includes(idx);
  }

  renderSteps(){
    let {steps, stepWidth} = this.props;
    return _.map(steps, (o, i) => {
      let label = o.label;
      if(_.isFunction(label)){
        label = label();
      }
      return (
        <Step key={i} completed={this.isCompleted(i)} 
          disabled={o.disabled}>
          <StepButton
            onClick={() => this._stepOnClick(i)}
            completed={this.isCompleted(i)}
            style={{
              marginRight: stepWidth
            }}
          >
            {label}
          </StepButton>
        </Step>
      );
    });
  }

  render(){
    let {activeStep} = this.state;
    let {nonLinear, orientation} = this.props;

    return (
      <Stepper alternativeLabel={orientation === "horizontal"} 
        nonLinear={nonLinear} activeStep={activeStep} 
        style={{
          background: "transparent"
        }} orientation={orientation}>
        {this.renderSteps()}
      </Stepper>
    );
  }

}

export default Stepizo;
