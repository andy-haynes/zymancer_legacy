import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './GrainSearchOption.css';
import zymath from '../../utils/zymath';
import Units from '../../constants/Units';

const GrainSearchOption = ({ grain, addGrain }) => (
  <div className={s.grainSearchOption} onClick={addGrain}>
    <div className="pure-g">
      <div className="pure-u-15-24">
        <div className={s.grainDetail}>
          {grain.name}
          <div className={s.grainSubtext}>
            {grain.flavor || grain.characteristics || (desc => desc.length > 100 ? `${desc}...` : desc)(grain.description.substring(0, 100))}
          </div>
        </div>
      </div>
      <div className="pure-u-6-24">
        <div className={s.grainDetail}>
          {grain.mfg}
        </div>
      </div>
      <div
        className="pure-u-3-24"
        style={{
          backgroundColor: zymath.calculateGrainRGB({
              value: 1,
              unit: Units.Gallon
            }, Object.assign({}, grain, {
              weight: { value: 1, unit: Units.Pound }
            })
          )
        }}
      />
    </div>
  </div>
);

/*
GrainSearchOption.propTypes = {
};
*/

export default withStyles(s)(GrainSearchOption);