import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import SliderInput from '../SliderInput';
import Yeast from '../Yeast';
import round from 'lodash/round';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Fermentation.css';
import IngredientTab from '../IngredientTab';
import Search from '../../../containers/IngredientSearch';

class Fermentation extends React.PureComponent {
  static propTypes = {
    fermentation: PropTypes.shape({
      yeasts: PropTypes.arrayOf(DefinedTypes.yeast).isRequired,
      cellCount: PropTypes.number.isRequired,
      recommendedCellCount: PropTypes.number.isRequired,
      pitchRate: PropTypes.number.isRequired
    }).isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { fermentation, actions } = this.props;
    return (
      <div className={s.fermentation}>
        <IngredientTab
          ingredients={
            fermentation.yeasts.map((yeast, i) => (
              <Yeast
                key={`${yeast.id}-${i}`}
                yeast={yeast}
                actions={actions}
              />
            ))
          }
          search={Search.MobileYeastSearch}
          removeIngredient={actions.removeYeast}
          detail={(
            <div>
              <div className="pure-g" style={{marginBottom: '-2.2em'}}>
                <div className="pure-u-3-4">
                  <div className={s.fermentationLabel}>
                    Pitch Rate
                  </div>
                  <SliderInput
                    value={fermentation.pitchRate}
                    min={0.1} max={2} step={0.05}
                    update={actions.setPitchRate}
                    sliderWidth="17-24"
                    inputWidth="7-24"
                  />
                </div>
                <div className="pure-u-1-4">
                  <div className={s.pitchUnits}>
                    10<sup>6</sup> cells
                    <hr className={s.division} />
                    mL / °P
                  </div>
                </div>
              </div>
              <div className="pure-g">
                <div className="pure-u-1-2">
                  <div className={s.fermentationLabel}>
                    Cell Count
                  </div>
                  <div className={s.cellCount}>
                    <span className={s.cellCountValue}>
                      {round(fermentation.cellCount / Math.pow(10, 9), 1)}
                    </span>
                    &nbsp;&times; 10<sup>9</sup>
                  </div>
                </div>
                <div className="pure-u-1-2">
                  <div className={s.fermentationLabel}>
                    Recommended
                  </div>
                  <div className={s.cellCount}>
                    <span className={s.cellCountValue}>
                      {round(fermentation.recommendedCellCount / Math.pow(10, 9), 1)}
                    </span>
                    &nbsp;&times; 10<sup>9</sup>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default withStyles(s)(Fermentation);