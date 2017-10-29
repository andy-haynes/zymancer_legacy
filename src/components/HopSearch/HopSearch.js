import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import HopSearchOption from '../HopSearchOption';
import s from './HopSearch.css';
import IngredientSearch from '../IngredientSearch';

class HopSearch extends React.PureComponent {
  static propTypes = {
    search: DefinedTypes.search.isRequired,
    boilMinutes: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { search, configuration, boilMinutes, actions } = this.props;
    return (
      <IngredientSearch
        {...search}
        filter={actions.createFilter(search.cache)}
        create={(hop) => actions.addIngredient(hop, configuration, boilMinutes)}
        header={(
          <div className="pure-g">
            <div className="pure-u-12-24">
              <span>Name</span>
            </div>
            <div className="pure-u-6-24">
              <span>Alpha</span>
            </div>
            <div className="pure-u-6-24">
              <span>Beta</span>
            </div>
          </div>
        )}
      >
        {search.results.map(hop => (
          <HopSearchOption
            key={hop.id}
            addHop={() => actions.addIngredient(hop, configuration, boilMinutes)}
            hop={hop}
          />
        ))}
      </IngredientSearch>
    );
  }
}

export default withStyles(s)(HopSearch);
