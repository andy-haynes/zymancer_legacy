import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './ParsedGrain.css';
import ParsedSuggestion from '../ParsedSuggestion';
import Measurement from '../Measurement';
import MeasurementUnits from '../../constants/MeasurementUnits';
import { ExtractType } from '../../constants/AppConstants';
import zymath from '../../utils/zymath';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';

class ParsedGrain extends React.PureComponent {
  static propTypes = {
    grain: DefinedTypes.grain.isRequired,
    actions: PropTypes.object.isRequired,
    toggleSuggestion: PropTypes.func.isRequired
  };

  render() {
    const { grain, actions, toggleSuggestion } = this.props;
    return (
      <Paper className={s.parsedGrain} zDepth={2}>
        <div className="pure-g">
          <div className="pure-u-10-24">
            <div className={s.grainName}>
              {grain.name}
            </div>
          </div>
          <div className="pure-u-12-24">
            <div className="pure-g">
              <div className="pure-u-1-2" style={{marginTop: '-0.8em'}}>
                <Measurement
                  measurement={grain.weight}
                  update={(weight) => actions.setWeight(grain, weight)}
                  options={MeasurementUnits.GrainWeight}
                />
              </div>
              <div className="pure-u-1-2" style={{marginTop: '-0.8em', display: grain.extractType !== null ? 'block' : 'none'}}>
                <SelectField
                  value={grain.extractType}
                  onChange={(e, k, v) => actions.setExtractType(grain, v)}
                  style={{width: '6em'}}
                >
                  <MenuItem value={ExtractType.Dry} primaryText="Dry" />
                  <MenuItem value={ExtractType.Liquid} primaryText="Liquid" />
                </SelectField>
              </div>
              <div className="pure-u-1-2" style={{marginTop: '-0.8em', display: grain.extractType !== null ? 'none' : 'block'}}>
                <TextField
                  id="lintner-input"
                  value={grain.lintner}
                  onChange={(e) => actions.setLintner(grain, e.target.value)}
                  style={{width: '3em'}}
                />&deg;L
              </div>
              <div className="pure-u-1-2" style={{marginTop: '-0.8em'}}>
                <TextField
                  id="gravity-input"
                  value={zymath.formatGravity(grain.gravity)}
                  onChange={(e) => actions.setGravity(grain, e.target.value)}
                  style={{width: '3em'}}
                />
              </div>
              <div className="pure-u-1-2" style={{marginTop: '-0.8em'}}>
                <TextField
                  id="lovibond-input"
                  value={grain.lovibond}
                  onChange={(e) => actions.setLovibond(grain, e.target.value)}
                  style={{width: '3em'}}
                />&deg;Lov
              </div>
            </div>
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-1-1">
            <div className={s.suggestions}>
              {grain.suggestions.map((suggestion, i) => (
                <ParsedSuggestion
                  key={`grain-suggestion-${i}`}
                  suggestion={suggestion}
                  toggle={() => toggleSuggestion(suggestion.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(s)(ParsedGrain);