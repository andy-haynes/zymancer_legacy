import { connect } from 'react-redux';
import zymath from '../utils/zymath';
import helpers from '../utils/helpers';
import Units from '../constants/Units';
import GrainChart from '../components/GrainChart';

const chartWidth = '350px';
const chartHeight = '350px';

function mapStateToProps(state) {
  return {
    grains: state.currentRecipe.grains.map(grain => Object.assign({}, grain, {
      color: zymath.calculateGrainRGB(state.currentRecipe.targetVolume, grain),
      chartValue: helpers.convertToUnit(grain.weight, Units.Pound, 2)
    }))
  };
}

const GrainChartContainer = connect(
  mapStateToProps
)(GrainChart);

export default GrainChartContainer;