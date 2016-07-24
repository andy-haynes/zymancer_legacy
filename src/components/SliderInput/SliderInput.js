import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import s from './SliderInput.css';

const SliderInput = ({ value, min, max, update, children, sliderWidth = '7-8', inputWidth = '1-8', step = 1 }) => {
  const sliderContainer = `pure-u-${sliderWidth}`;
  const inputContainer = `pure-u-${inputWidth}`;
  const input = children ? children : (
    <TextField
      name="slider-input"
      className={s.input}
      value={value}
      onChange={(e) => update(e.target.value)}
    />
  );

  return (
    <div className={s.sliderInput}>
      <div className="pure-g">
        <div className={sliderContainer}>
          <Slider
            className={s.slider}
            value={value}
            min={min} max={max} step={step}
            onChange={(e, v) => update(v)}
          />
        </div>
        <div className={inputContainer}>
          {input}
        </div>
      </div>
    </div>
  );
};

/*
SliderInput.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(SliderInput);