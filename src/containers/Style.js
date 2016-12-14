import { connect } from 'react-redux';
//import actions from '../actions';
import Style from '../components/Style';

function mapState(state) {
  const { originalGravity, finalGravity, IBU, ABV, SRM, style } = state.currentRecipe;
  return { style: Object.assign({}, style, {
    inOGRange: originalGravity <= style.ogHigh && originalGravity >= style.ogLow,
    inFGRange: finalGravity <= style.fgHigh && finalGravity >= style.fgLow,
    inABVRange: ABV <= style.abvHigh && ABV >= style.abvLow,
    inIBURange: IBU <= style.ibuHigh && IBU >= style.ibuLow,
    inSRMRange: SRM <= style.srmHigh && SRM >= style.srmLow
  })
}

}

function mapDispatch(dispatch) {
  return {
    actions: {
    }
  }
}

export default connect(mapState, mapDispatch)(Style);