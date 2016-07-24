import { connect } from 'react-redux';
import { addGrain, filterGrains, clearGrainSearch } from '../actions';
import { SRMtoRGB } from '../utils/BrewMath';
import GrainSearch from '../components/GrainSearch';

const mapStateToProps = (state) => ({ ...state.recipe.grainSearch });

const mapDispatchToProps = (dispatch) => {
  return {
    addGrain: (grain) => {
      dispatch(addGrain(grain));
      dispatch(clearGrainSearch());
    },
    filterGrains: (query) => {
      dispatch(filterGrains(query));
    }
  };
};

const GrainSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GrainSearch);

export default GrainSearchContainer;