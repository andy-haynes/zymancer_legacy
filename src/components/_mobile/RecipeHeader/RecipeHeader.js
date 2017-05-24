import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecipeHeader.css';
import zymath from '../../../utils/zymath';
import round from 'lodash/round';
import { Tab } from 'material-ui/Tabs';
import RecipeIcon from 'material-ui/svg-icons/av/featured-play-list';
import GrainIcon from 'material-ui/svg-icons/action/donut-large';
import HopIcon from 'material-ui/svg-icons/places/spa';
import MashIcon from 'material-ui/svg-icons/image/timelapse';
import FermentationIcon from 'material-ui/svg-icons/action/bug-report';
import StyleIcon from 'material-ui/svg-icons/image/style';

class RecipeHeader extends React.PureComponent {
  static propTypes = {
    recipe: DefinedTypes.recipe.isRequired
  };

  render() {
    const { recipe } = this.props;
    return (
      <div className={s.recipeTab}>
        <div className="pure-g" style={{marginLeft: '-1em', paddingTop: '2%'}}>
          <div className="pure-u-1-4">
            <div className={s.calculatedParam}>
              <div className={s.headerLabel}>
                OG
              </div>
              <div className={s.calculatedValue}>
                {zymath.formatGravity(recipe.originalGravity)}
              </div>
            </div>
          </div>
          <div className="pure-u-1-4">
            <div className={s.calculatedParam}>
              <div className={s.headerLabel}>
                FG
              </div>
              <div className={s.calculatedValue}>
                {zymath.formatGravity(recipe.finalGravity)}
              </div>
            </div>
          </div>
          <div className="pure-u-1-4">
            <div className={s.calculatedParam} style={{marginLeft: '3em'}}>
              <div className={s.headerLabel}>
                IBU
              </div>
              <div className={s.calculatedValue}>
                {round(recipe.IBU, 1)}
              </div>
            </div>
          </div>
          <div className="pure-u-1-4">
            <div className={s.calculatedParam}>
              <div className={s.headerLabel}>
                ABV
              </div>
              <div className={s.calculatedValue}>
                {recipe.ABV}%
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(RecipeHeader);