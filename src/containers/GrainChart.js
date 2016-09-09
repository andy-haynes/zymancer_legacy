import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs';
import { SRMtoRGB, calculateSRM } from '../utils/BrewMath';
import { convertToUnit } from '../utils/core';
import { Pound } from '../constants/Units';

const chartWidth = '350px';
const chartHeight = '350px';

const mapStateToProps = (state) => {
  return {
    data: state.currentRecipe.grains.map(grain => ({
      key: grain.id,
      value: convertToUnit(grain.weight, Pound, 2),
      label: grain.name,
      color: SRMtoRGB(calculateSRM(state.currentRecipe.targetVolume, [grain]))
    })),
    width: chartWidth,
    height: chartHeight
  };
};

const GrainChart = connect(
  mapStateToProps
)(Doughnut);

export default GrainChart;