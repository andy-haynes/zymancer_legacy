import React, { PropTypes } from 'react';
import SliderInput from '../SliderInput';
import Yeast from '../Yeast';
import _ from 'lodash';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Paper from 'material-ui/Paper';
import s from './Fermentation.css';
import YeastSearchContainer from '../../containers/YeastSearch';

const Fermentation = ({ fermentation, actions }) => (
  <div className={s.fermentation}>
    <div className="pure-g">
      <div className="pure-u-1-2">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <Paper className={s.fermentationControl} zDepth={2}>
              <div className="pure-g">
                <div className="pure-u-5-8">
                  Cell Count
                </div>
                <div className="pure-u-3-8">
                  <span>
                    {_.round(fermentation.cellCount / Math.pow(10, 9), 1)} x 10<sup>9</sup>
                  </span>
                </div>
              </div>
            </Paper>
          </div>
          <div className="pure-u-1-2">
            <Paper className={s.fermentationControl} zDepth={2}>
              <div className="pure-g">
                <div className="pure-u-5-8">
                  Recommended
                </div>
                <div className="pure-u-3-8">
                  <span>
                    {_.round(fermentation.recommendedCellCount / Math.pow(10, 9), 1)} x 10<sup>9</sup>
                  </span>
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
                <div className="pure-u-14-24">
                  <SliderInput
                    value={fermentation.pitchRate}
                    min={0.1} max={2} step={0.05}
                    update={actions.setPitchRate}
                  />
                </div>
                <div className="pure-u-6-24">
                  <span className={s.pitchUnits}>
                    10<sup>6</sup> cells / mL / °P
                  </span>
                </div>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      <div className="pure-u-1-2">
        <YeastSearchContainer />
        {fermentation.yeasts.map(yeast => (
          <Yeast
            key={yeast.id}
            yeast={yeast}
            actions={{
              setMfgDate: (date) => actions.setMfgDate(yeast, date),
              setApparentAttenuation: (attenuation) => actions.setApparentAttenuation(yeast, attenuation),
              setViability: (viability) => actions.setViability(yeast, viability),
              setQuantity: (quantity) => actions.setQuantity(yeast, quantity),
              removeYeast: () => actions.removeYeast(yeast),
              addStarterStep: (gravity, hours) => actions.addStarterStep(yeast, gravity, hours),
              removeStarterStep: (step) => actions.removeStarterStep(yeast, step),
            }}
          />
        ))}
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