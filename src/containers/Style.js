import { connect } from 'react-redux';
import actions from '../actions';
import Style from '../components/Style';
import MobileStyle from '../components/_mobile/Style';

function mapState(state) {
  const { originalGravity, finalGravity, IBU, ABV, SRM, style = {} } = state.currentRecipe;

  let ranges = {};
  if (style) {
    ranges = {
      inOGRange: originalGravity <= style.ogHigh && originalGravity >= style.ogLow,
      inFGRange: finalGravity <= style.fgHigh && finalGravity >= style.fgLow,
      inABVRange: ABV <= style.abvHigh && ABV >= style.abvLow,
      inIBURange: IBU <= style.ibuHigh && IBU >= style.ibuLow,
      inSRMRange: SRM <= style.srmHigh && SRM >= style.srmLow
    };
  }

  return {
    style: style ? Object.assign({}, style, ranges) : null
  };
}

function mapDispatch(dispatch) {
  return {
    actions: {
      loadStyle: (styleId) => dispatch(actions.recipe.loadRecipeStyle(styleId))
    }
  }
}

export default connect(mapState, mapDispatch)(Style);
export const MobileStyleContainer = connect(mapState, mapDispatch)(MobileStyle);
