import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainChart.css';
import { Doughnut } from 'react-chartjs';

class GrainChart extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.grains.length !== nextProps.grains.length
       || !this.props.grains.every(g => g.chartValue === nextProps.grains.filter(n => n.id === g.id)[0].chartValue);
  }

  render() {
    return (
      <div className={s.grainChart} >
        <Doughnut
          data={this.props.grains.map(grain => ({
            key: grain.id,
            value: grain.chartValue,
            label: grain.name,
            color: grain.color,
            fillColor: grain.color
          }))}
          width={this.props.diameter}
          height={this.props.diameter}
        />
      </div>
    );
  }
}

/*
GrainChart.propTypes = {
};
*/

export default withStyles(s)(GrainChart);