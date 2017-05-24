import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopSearch.css';
import IngredientSearch from '../IngredientSearch';
import zymath from '../../../utils/zymath';
import Units from '../../../constants/Units';
import { List, ListItem } from 'material-ui/List';

class HopSearch extends React.PureComponent {
  static propTypes = {
    search: DefinedTypes.search.isRequired,
    boilMinutes: PropTypes.number.isRequired,
    actions: PropTypes.object.isRequired,
    dismiss: PropTypes.func.isRequired
  };

  render() {
    const { search, boilMinutes, actions, dismiss } = this.props;
    return (
      <IngredientSearch
        {...search}
        filter={actions.createFilter(search.cache)}
      >
        <List style={{paddingTop: '0.6em', paddingBottom: '2em'}}>
          {search.results.map((hop, i) => (
            <ListItem
              key={i}
              innerDivStyle={{
                padding: '0',
                height: '3.5em'
              }}
              onTouchTap={() => {
                actions.addIngredient(hop, boilMinutes);
                dismiss && dismiss();
              }}
            >
              <div className={s.hopDetail}>
                <div>
                  {hop.name}
                </div>
                <div className={s.hopSubtext}>
                  {(hop.categories || []).join(', ')}
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </IngredientSearch>
    );
  }
}

export default withStyles(s)(HopSearch);