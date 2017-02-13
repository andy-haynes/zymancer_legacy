import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopChart.css';
import { Radar } from 'react-chartjs';

class HopChart extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.hops.length !== nextProps.hops.length
       || !this.props.hops.every(hop => {
        const nextHop = nextProps.hops.filter(next => next.id === hop.id)[0];
        return hop.chartValue === nextHop.chartValue
            && hop.alpha === nextHop.alpha
            && hop.beta === nextHop.beta;
      });
  }

  render() {
    return (
      <div className={s.hopChart} >
        <Radar
          data={this.props.data}
          options={this.props.options}
          redraw={true}
          width={this.props.diameter}
          height={this.props.diameter}
        />
      </div>
    );
  }
}

/*
HopChart.propTypes = {
};
*/

export default withStyles(s)(HopChart);