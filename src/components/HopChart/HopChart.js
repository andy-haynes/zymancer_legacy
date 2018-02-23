import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import s from './HopChart.css';

class HopChart extends React.Component {
  static propTypes = {
    chartData: PropTypes.array.isRequired,
    hops: PropTypes.array.isRequired,
  };

  render() {
    const { chartData, hops } = this.props;
    return (
      <div className={s.hopChart}>
        <RadarChart
          outerRadius={150}
          width={500}
          height={500}
          data={chartData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="aroma" />
          {hops.map((hop, i) => (
            <Radar
              key={`${hop.name}-${i}`}
              name={hop.name}
              dataKey={hop.name}
              stroke={hop.strokeColor}
              fill={hop.fillColor}
              fillOpacity={0.6}
            />
          ))}
        </RadarChart>
      </div>
    );
  }
}

export default withStyles(s)(HopChart);
