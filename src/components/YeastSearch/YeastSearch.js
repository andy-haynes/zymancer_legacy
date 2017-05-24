import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import YeastSearchOption from '../YeastSearchOption';
import s from './YeastSearch.css';
import IngredientSearch from '../IngredientSearch';

class YeastSearch extends React.PureComponent {
  static propTypes = {
    search: DefinedTypes.search.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { search, actions } = this.props;
    return (
      <IngredientSearch
        {...search}
        filter={actions.createFilter(search.cache)}
        header={(
          <div className="pure-g">
            <div className="pure-u-12-24">
              <span>Name</span>
            </div>
            <div className="pure-u-6-24">
              <span>ABV</span>
            </div>
            <div className="pure-u-6-24">
              <span>Attenuation</span>
            </div>
          </div>
        )}
      >
        {search.results.map(yeast => (
          <YeastSearchOption
            key={yeast.id}
            addYeast={() => actions.addIngredient(yeast)}
            yeast={yeast}
          />
        ))}
      </IngredientSearch>
    );
  }
}

export default withStyles(s)(YeastSearch);