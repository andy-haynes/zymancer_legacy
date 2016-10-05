import { connect } from 'react-redux';
import { calculateGrainRGB } from '../utils/BrewMath';
import { convertToUnit } from '../utils/core';
import { Pound } from '../constants/Units';
import GrainChart from '../components/GrainChart';

const chartWidth = '350px';
const chartHeight = '350px';

function mapStateToProps(state) {
  return {
    grains: state.currentRecipe.grains.map(grain => Object.assign({}, grain, {
      color: calculateGrainRGB(state.currentRecipe.targetVolume, grain),
      chartValue: convertToUnit(grain.weight, Pound, 2)
    }))
  };
}

const GrainChartContainer = connect(
  mapStateToProps
)(GrainChart);

export default GrainChartContainer;