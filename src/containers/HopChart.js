import { connect } from 'react-redux';
import sumBy from 'lodash/sumBy';
import flatten from 'lodash/flatten';
import HopChart from '../components/HopChart';

function mapState(state) {
  const hopData = state.currentRecipe.hops.map(hop => Object.assign({}, hop, {
    chartValue: hop.beta * sumBy(hop.additions, addition => addition.weight.value),
  }));

  const categories = flatten(state.currentRecipe.hops.map(hop => hop.categories))
                             .filter((v, i, a) => a.indexOf(v) === i);

  const chartData = categories.reduce((hopCategories, category) => {
    const hopCategory = { aroma: category };
    hopData
      .filter(hop => hop.categories.includes(category))
      .forEach((hop) => { hopCategory[hop.name] = hop.chartValue; });

    hopCategories.push(hopCategory);
    return hopCategories;
  }, []);

  return {
    chartData,
    hops: hopData.map((hop) => {
      const green = Math.round(Math.abs(200 - Math.pow(2, hop.alpha / 2))) % 255;
      return {
        name: hop.name,
        strokeColor: `rgba(26,${green},18,0.7)`,
        fillColor: `rgba(26,${green},18,0.2)`,
      };
    }),
  };
}

export default connect(mapState)(HopChart);
