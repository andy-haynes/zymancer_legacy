import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import s from './SliderInput.css';

const SliderInput = ({ value, min, max, update, children, sliderWidth = '4-5', inputWidth = '1-5', step = 1, disabled = false }) => {
  value = typeof value === 'string' ? parseFloat(value) : value;
  const sliderContainer = `pure-u-${sliderWidth}`;
  const inputContainer = `pure-u-${inputWidth}`;
  const input = children ? children : (
    <TextField
      name="slider-input"
      className={s.input}
      value={value}
      onChange={(e) => update(e.target.value)}
      disabled={disabled || value === null}
    />
  );

  if (value > max) {
    value = max;
  } else if (value < min) {
    value = min;
  }

  // warnings are annoying, just fudge this for equal values
  if (min === max) {
    min -= step;
    max += step;
  }

  return (
    <div className={s.sliderInput}>
      <div className={sliderContainer}>
        <Slider
          className={s.slider}
          value={value}
          min={min} max={max} step={step}
          onChange={(e, v) => update(v)}
          disabled={disabled || value === null}
          disableFocusRipple
        />
      </div>
      <div className={inputContainer}>
        {input}
      </div>
    </div>
  );
};

/*
SliderInput.propTypes = {
};
*/
export default withStyles(s)(SliderInput);