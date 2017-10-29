import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './YeastSearch.css';
import IngredientSearch from '../IngredientSearch';
import zymath from '../../../utils/zymath';
import Units from '../../../constants/Units';
import { List, ListItem } from 'material-ui/List';

class YeastSearch extends React.PureComponent {
  static propTypes = {
    search: DefinedTypes.search.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    const { search, configuration, actions } = this.props;
    return (
      <IngredientSearch
        {...search}
        filter={actions.createFilter(search.cache)}
      >
        <List style={{paddingTop: '0.6em', paddingBottom: '2em'}}>
          {search.results.map((yeast, i) => (
            <ListItem
              key={i}
              innerDivStyle={{
                padding: '0',
                height: '3.5em'
              }}
              onTouchTap={() => {
                actions.addIngredient(yeast, configuration);
                dismiss && dismiss();
              }}
            >
              <div className={s.yeastDetail}>
                <div>
                  {yeast.code} - {yeast.name}
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </IngredientSearch>
    );
  }
}

export default withStyles(s)(YeastSearch);
