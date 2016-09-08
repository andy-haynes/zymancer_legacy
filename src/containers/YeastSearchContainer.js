import { connect } from 'react-redux';
import { addYeast, filterYeast, clearYeastSearch } from '../actions/calculator';
import YeastSearch from '../components/YeastSearch';

const mapStateToProps = (state) => ({ ...state.recipe.yeastSearch });

const mapDispatchToProps = (dispatch) => {
  return {
    addYeast: (yeast) => {
      dispatch(addYeast(yeast));
      dispatch(clearYeastSearch());
    },
    filterYeast: (query) => {
      dispatch(filterYeast(query));
    }
  };
};

const YeastSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(YeastSearch);

export default YeastSearchContainer;