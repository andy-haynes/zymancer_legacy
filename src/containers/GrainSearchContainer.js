import { connect } from 'react-redux';
import { addGrain, filterGrains, clearGrainSearch } from '../actions/calculator';
import { SRMtoRGB } from '../utils/BrewMath';
import GrainSearch from '../components/GrainSearch';

const mapStateToProps = (state) => ({ ...state.currentRecipe.grainSearch });

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