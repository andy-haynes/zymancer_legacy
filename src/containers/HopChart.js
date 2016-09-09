import { connect } from 'react-redux';
import { Radar } from 'react-chartjs';
import _ from 'lodash';

//const categories = [
//  'Citrus',
//  'Herbal',
//  'Earthy',
//  'Floral',
//  'Spicy',
//  'Green',
//  'Grassy',
//  'Stone Fruit',
//  'Tropical Fruit',
//  'Fruity',
//  'Pine',
//  'Cedar'
//];

const datasetOptionDefaults = {
  backgroundColor: 'rgba(179,181,198,0.2)',
  borderColor: 'rgba(179,181,198,1)',
  pointBackgroundColor: 'rgba(179,181,198,1)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgba(179,181,198,1)'
};

const chartWidth = '350px';
const chartHeight = '350px';

const getChartItems = (hops, categories) => hops.map((hop, i) => {
  const score = hop.beta * _.sumBy(hop.additions, addition => addition.weight.value);
  return Object.assign({}, datasetOptionDefaults, {
    label: hop.name,
    data: categories.map(c => hop.categories.includes(c) ? score : 0)
  })
});

const mapStateToProps = (state) => {
  const currentCategories = [].concat.apply([], state.currentRecipe.hops.map(hop => hop.categories))
                              .filter((v, i, a) => a.indexOf(v) === i);
  return {
    redraw: true,
    width: chartWidth,
    height: chartHeight,
    data: {
      labels: currentCategories,
      datasets: getChartItems(state.currentRecipe.hops, currentCategories)
    }
  };
};

const HopChart = connect(
  mapStateToProps
)(Radar);

export default HopChart;