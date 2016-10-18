import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Grain.css';
import Measurement from '../Measurement';
import MeasurementUnits from '../../constants/MeasurementUnits';
import zymath from '../../utils/zymath';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';

const Grain = ({ grain, targetVolume, removeGrain, setWeight, setGravity, setLovibond }) => (
  <Paper className={s.grain} zDepth={2}>
    <div className="pure-g">
      <div className="pure-u-1-24">
        <div className={s.grainColor} style={{backgroundColor: zymath.calculateGrainRGB(targetVolume, grain)}}></div>
      </div>
      <div className="pure-u-9-24">
        <div className={s.grainName}>
          {grain.name}
        </div>
      </div>
      <div className="pure-u-4-24">
        <TextField id="lovibond-input" className={s.lovibondInput} value={grain.lovibond} onChange={(e) => setLovibond(e.target.value)} />
      </div>
      <div className="pure-u-4-24">
        <TextField id="gravity-input" className={s.gravityInput} value={grain.gravity} onChange={(e) => setGravity(e.target.value)} />
      </div>
      <div className="pure-u-5-24">
        <Measurement measurement={grain.weight} update={setWeight} options={MeasurementUnits.GrainWeight} />
      </div>
      <div className="pure-u-1-24">
        <ContentRemoveCircle className={s.removeGrain} onClick={removeGrain} />
      </div>
    </div>
  </Paper>
);
/*
SelectedGrain.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Grain);