import { connect } from 'react-redux';
import HopChart from '../components/HopChart';
import _ from 'lodash';

const datasetOptionDefaults = {
  pointStrokeColor: "#fff",
  pointHighlightFill: "rgba(8, 19, 7, 1)",
  pointHighlightStroke: "rgba(220,220,220,1)"
};

function getChartItems(hopData, categories) {
  return hopData.map((hop, i) => {
    const green = Math.round(Math.abs(200 - Math.pow(2, hop.alpha / 2))) % 255;
    return Object.assign({}, datasetOptionDefaults, {
      pointColor: `rgba(26,${green},18,1)`,
      strokeColor: `rgba(26,${green},18,0.7)`,
      fillColor: `rgba(26,${green},18,0.2)`,
      label: hop.name,
      data: categories.map(c => hop.categories.includes(c) ? hop.chartValue : null)
    });
  });
}

function mapState(state) {
  const hopData = state.currentRecipe.hops.map(hop => Object.assign({}, hop, {
    chartValue: hop.beta * _.sumBy(hop.additions, addition => addition.weight.value)
  }));
  const currentCategories = _.flatten(state.currentRecipe.hops.map(hop => hop.categories))
                             .filter((v, i, a) => a.indexOf(v) === i);

  return {
    hops: hopData,
    data: {
      labels: currentCategories,
      datasets: getChartItems(hopData, currentCategories)
    },
    options: {
      scaleShowLine : false,
      angleShowLineOut : false
    }
  };
}

export default connect(mapState)(HopChart);