import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FetchedItem.css';
import CircularProgress from 'material-ui/CircularProgress';

class FetchedItem extends React.PureComponent {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    children: PropTypes.arrayOf(PropTypes.element),
    load: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <div className={s.fetchedItem}>
        {!this.props.isFetching && this.props.children}
        {this.props.isFetching && <CircularProgress />}
      </div>
    );
  }
}

export default withStyles(s)(FetchedItem);