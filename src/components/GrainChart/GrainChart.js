import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import round from 'lodash/round';
import { PieChart, Pie, Sector } from 'recharts';
import s from './GrainChart.css';
import DefinedTypes from '../DefinedTypes';

/* adapted from http://jsfiddle.net/ro31mjuf/ */
function renderActiveShape(section) {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = section;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + ((outerRadius + 10) * cos);
  const sy = cy + ((outerRadius + 10) * sin);
  const mx = cx + ((outerRadius + 30) * cos);
  const my = cy + ((outerRadius + 30) * sin);
  const ex = mx + ((cos >= 0 ? 1 : -1) * 22);
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const captionX = ex + ((cos >= 0 ? 1 : -1) * 12);

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle
        cx={ex}
        cy={ey}
        r={2}
        fill={fill}
        stroke="none"
      />
      <text
        x={captionX}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >
        {payload.name}
      </text>
      <text
        x={captionX}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`${round(percent * 100)}%`}
      </text>
    </g>
  );
}

class GrainChart extends React.Component {
  static propTypes = {
    grains: PropTypes.arrayOf(DefinedTypes.grain).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    const grains = this.props.grains
      .map(grain => ({
        name: grain.name,
        value: grain.weight.value,
        fill: grain.color,
      }));

    return (
      <PieChart width={800} height={800}>
        <Pie
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={grains}
          cx={350}
          cy={200}
          innerRadius={60}
          outerRadius={120}
          onMouseEnter={this.onPieEnter}
        />
      </PieChart>
    );
  }
}

export default withStyles(s)(GrainChart);
