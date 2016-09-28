import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FetchedItem.css';
import CircularProgress from 'material-ui/CircularProgress';

class FetchedItem extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <div className={s.fetchedItem}>
        {!this.props.isFetching && !this.props.children && `you fucked up! null? ${this.props.children == null}`}
        {!this.props.isFetching && this.props.children}
        {this.props.isFetching && <CircularProgress />}
      </div>
    );
  }
}

/*
FetchedItem.propTypes = {
};
*/

export default withStyles(s)(FetchedItem);