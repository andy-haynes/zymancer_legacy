import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import helpers from '../../utils/helpers';
import s from './SliderInput.css';

class SliderInput extends React.PureComponent {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired,
    children: PropTypes.element,
    sliderWidth: PropTypes.string,
    inputWidth: PropTypes.string,
    step: PropTypes.number,
    disabled: PropTypes.bool
  };

  render() {
    let {
      value, min, max,
      update,
      children,
      sliderWidth = '7-8',
      inputWidth = '1-8',
      step = 1,
      disabled = false
    } = this.props;
    value = typeof value === 'string' ? parseFloat(value) : value;
    const sliderContainer = `pure-u-${sliderWidth}`;
    const inputContainer = `pure-u-${inputWidth}`;
    const input = children ? children : (
      <TextField
        name="slider-input"
        className={s.input}
        value={helpers.displayMeasurementValue(value)}
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
        <div className="pure-g">
          <div className={sliderContainer}>
            <Slider
              className={s.slider}
              value={value}
              min={min} max={max} step={step}
              onChange={(e, v) => update(v)}
              disabled={disabled || value === null}
            />
          </div>
          <div className={inputContainer}>
            {input}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SliderInput);