import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Recipe.css';
import Measurement from '../Measurement';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Link from '../Link';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ImportExport from 'material-ui/svg-icons/communication/import-export';

class Recipe extends React.PureComponent {
  static propTypes = {
    recipe: DefinedTypes.savedRecipe.isRequired,
    loadRecipe: PropTypes.func.isRequired
  };

  render() {
    const { recipe, loadRecipe } = this.props;
    return (
      <Paper className={s.recipe} zDepth={2}>
        <div className="pure-g">
          <div className="pure-u-1-24"></div>
          <div className="pure-u-10-24">
            <div className={s.recipeName}>
              <Link to={`/recipe/${recipe.id}`}>
                {recipe.name}
              </Link>
            </div>
          </div>
          <div className="pure-u-3-24">
            <span className={s.recipeLabel}>OG</span>
            <div className={s.recipeValue}>{recipe.OG}</div>
          </div>
          <div className="pure-u-3-24">
            <span className={s.recipeLabel}>IBU</span>
            <div className={s.recipeValue}>{recipe.IBU}</div>
          </div>
          <div className="pure-u-1-24">
            <Link to="/">
              <ImportExport className={s.recipeAction} onClick={() => loadRecipe(recipe.id)} />
            </Link>
          </div>
          <div className="pure-u-1-24">
            <RemoveCircle className={s.recipeAction} />
          </div>
        </div>
        <div className="pure-g">
          <div className="pure-u-1-24"></div>
          <div className="pure-u-10-24">
            <div className={s.recipeStyle}>
              {recipe.style.code}. {recipe.style.name}
            </div>
          </div>
          <div className="pure-u-3-24">
            <span className={s.recipeLabel}>FG</span>
            <div className={s.recipeValue}>{recipe.FG}</div>
          </div>
          <div className="pure-u-3-24">
            <span className={s.recipeLabel}>ABV</span>
            <div className={s.recipeValue}>{recipe.ABV}%</div>
          </div>
        </div>
      </Paper>
    );
  }
}

export default withStyles(s)(Recipe);