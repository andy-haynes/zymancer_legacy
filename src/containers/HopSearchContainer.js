import { connect } from 'react-redux';
import { addHop, filterHops, clearHopSearch } from '../actions/calculator';
import HopSearch from '../components/HopSearch';

const mapStateToProps = (state) => ({
  originalGravity: state.currentRecipe.originalGravity,
  boilVolume: state.currentRecipe.boilVolume,
  ...state.currentRecipe.hopSearch
});

const mapDispatchToProps = (dispatch) => {
  return {
    addHop: (hop) => {
      dispatch(addHop(hop));
      dispatch(clearHopSearch());
    },
    filterHops: (query) => {
      dispatch(filterHops(query));
    }
  };
};

const HopSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HopSearch);

export default HopSearchContainer;