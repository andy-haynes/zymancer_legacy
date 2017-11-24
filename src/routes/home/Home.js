import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import Link from '../../components/Link';
import Paper from 'material-ui/Paper';

const title = 'Zymancer';

class Home extends React.PureComponent {
  static contextTypes = {
    setTitle: PropTypes.func.isRequired
  };

  render() {
    this.context.setTitle(title);
    return (
      <div className={s.home}>
        <div className="pure-g">
          <div className="pure-u-1-2">
            <Paper className={s.pageSection} zDepth={2}>
              <div className={s.pageHeader}>
                <Link to="/calculator">Calculator</Link>
              </div>
              <hr />
              <div className={s.pageDescription}>
                Start building your own recipe. Add fermentables, hops, and yeast and
                see how they impact the final product. Set your mash profile, check
                your recipe against BJCP styles, and save it for future reference.
              </div>
            </Paper>
          </div>
          <div className="pure-u-1-2">
            <Paper className={s.pageSection} zDepth={2}>
              <div className={s.pageHeader}>
                <Link to="/recipes">Recipes</Link>
              </div>
              <hr />
              <div className={s.pageDescription}>
                View your saved recipes.
              </div>
            </Paper>
          </div>
          <div className="pure-u-1-2">
            <Paper className={s.pageSection} zDepth={2}>
              <div className={s.pageHeader}>
                <Link to="/parser">Parser</Link>
              </div>
              <hr />
              <div className={s.pageDescription}>
                Got a homebrew recipe you want to load into the calculator? Paste the
                text, match up the ingredients, and load the recipe into the calculator.
              </div>
            </Paper>
          </div>
          <div className="pure-u-1-2">
            <Paper className={s.pageSection} zDepth={2}>
              <div className={s.pageHeader}>
                <Link to="/config">Configure</Link>
              </div>
              <hr />
              <div className={s.pageDescription}>
                Set default values for recipe volume, hop and grain weights, and more.
                Edit the formulas that go into calculating values like hop utilization,
                SRM, and IBU.
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Home);
