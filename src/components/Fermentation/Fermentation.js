import React, { PropTypes } from 'react';
import SliderInput from '../SliderInput';
import Yeast from '../Yeast';
import round from 'lodash/round';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from 'material-ui/Paper';
import s from './Fermentation.css';
import Search from '../../containers/IngredientSearch';

const Fermentation = ({ fermentation, actions }) => (
  <div className={s.fermentation}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <Paper className={s.fermentationControl} zDepth={2}>
              <div className="pure-g">
                <div className="pure-u-1-1">
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
              </div>
            </Paper>
          </div>
          <div className="pure-u-1-2">
            <Paper className={s.fermentationControl} zDepth={2}>
              <div className="pure-g">
                <div className="pure-u-1-1">
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
            </Paper>
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <Paper className={s.fermentationControl} zDepth={2}>
              <div className="pure-g">
                <div className="pure-u-4-24">
                  <div className={s.fermentationLabel}>
                    Pitch Rate
                  </div>
                </div>
                <div className="pure-u-16-24">
                  <SliderInput
                    value={fermentation.pitchRate}
                    min={0.1} max={2} step={0.05}
                    update={actions.setPitchRate}
                  />
                </div>
                <div className="pure-u-4-24">
                  <div className={s.pitchUnits}>
                    10<sup>6</sup> cells
                    <hr className={s.division} />
                    mL / °P
                  </div>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      <div className="pure-u-1-2">
        <Search.YeastSearch />
        <div className={s.yeasts}>
          {fermentation.yeasts.map(yeast => (
            <Yeast
              key={yeast.id}
              yeast={yeast}
              actions={actions}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);
/*
Fermentation.propTypes = {
  grains: PropTypes.arrayOf(PropTypes.shape({
    id:         PropTypes.number.isRequired,
    name:       PropTypes.string.isRequired,
    gravity:    PropTypes.number.isRequired,
    color:      PropTypes.string.isRequired
  }).isRequired).isRequired,
  onTodoClick:  PropTypes.func.isRequired
};
*/
export default withStyles(s)(Fermentation);