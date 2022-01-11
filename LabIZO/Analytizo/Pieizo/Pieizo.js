import React, { Component } from "react";

import PropsType from "prop-types";
import _ from "lodash";

import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Typography } from "@mui/material";
import MaterialTooltip from "@material-ui/core/Tooltip";

import { Accessor } from "IZOArc/STATIC";
import { VStack } from "IZOArc/LabIZO/Stackizo";

/**
 * Pie chart
 * @augments {Component<Props, State>}
 */
class Pieizo extends Component {
  static propTypes = {
    //basic
    width: PropsType.oneOfType([PropsType.string, PropsType.number]),
    height: PropsType.oneOfType([PropsType.string, PropsType.number]),
  };

  static defaultProps = {
    width: "100%",
    height: "100%",

    title: "Test",
    titleAlign: "left", //"inherit"| "left"| "center"| "right"| "justify"
    titleColor: "initial", //material ui default colors
    titleVariant: "h3", //"h1"| "h2"| "h3"| "h4"| "h5"| "h6"| "subtitle1"| "subtitle2"| "body1"| "body2"| "caption"| "button"| "overline"| "srOnly"| "inherit"
    titleStyle: {}, //override the default styles
    data: [],

    //Pie
    pieColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#003f5c", "#58508d", "#bc5090", "#ff6361", "#ffa600"],

    cx: "50%",
    cy: "50%",
    innerRadius: "55%",
    outerRadius: "90%",

    //ToolTip
    toPercent: false,

    //Legend
    maxLegend: 18, //max stringLength
    legendWrapperStyle: {},

    //data
    schema: {
      dataKey: "value",
    },
  };

  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this._setAllStates();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!Accessor.IsIdentical(prevProps, this.props, Object.keys(Pieizo.defaultProps))) {
      this._setAllStates();
    }
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  _setAllStates = (callback) => {
    this.setState(
      (state, props) => ({
        ...props,
      }),
      callback
    );
  };

  rederTooltip = () => {
    let { toPercent, data } = this.props;
    const sumValue = _.sumBy(data, (o) => o.value) || 1;
    const Round = (o) => Math.round(o * 100);
    return (
      <Tooltip
        isAnimationActive={false}
        formatter={(value, name, props) => {
          if (toPercent) {
            return [Round(value / sumValue) + "%", name];
          } else {
            return [value, name];
          }
        }}
      />
    );
  };

  rederLegend = () => {
    let { maxLegend } = this.props;

    return (
      <Legend
        layout="vertical"
        align="right"
        verticalAlign={"top"}
        wrapperStyle={this.props.legendWrapperStyle}
        formatter={(value, entry) => {
          const { color } = entry;
          if (value && value.length >= maxLegend) {
            let value_sliced = value.slice(0, maxLegend) + "...";
            return (
              <MaterialTooltip title={value}>
                <span style={{ color }}>{value_sliced}</span>
              </MaterialTooltip>
            );
          }
          return <span style={{ color }}>{value}</span>;
        }}
      />
    );
  };

  renderTitle = () => {
    return (
      <Typography align={this.props.titleAlign} color={this.props.titleColor} variant={this.props.titleVariant} style={this.props.titleStyle}>
        {this.props.title}
      </Typography>
    );
  };

  renderPie = () => {
    let { width, height, data, pieColor, innerRadius, outerRadius, schema, cx, cy } = this.props;

    return (
      <VStack width={width} height={height}>
        {this.renderTitle()}
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {this.rederTooltip()}
            <Pie data={data} innerRadius={innerRadius} outerRadius={outerRadius} fill="#8884d8" paddingAngle={5} dataKey={schema.dataKey} cx={cx} cy={cy}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColor[index % pieColor.length]} />
              ))}
            </Pie>
            {this.rederLegend()}
          </PieChart>
        </ResponsiveContainer>
      </VStack>
    );
  };

  render() {
    return this.renderPie();
  }
}

export default Pieizo;
