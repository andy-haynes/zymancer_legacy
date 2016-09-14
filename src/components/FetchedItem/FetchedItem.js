import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FetchedItem.css';

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
        {this.props.isFetching && 'looking for your objects'}
        {!this.props.isFetching && !this.props.children && `you fucked up! null? ${this.props.children == null}`}
        {!this.props.isFetching && this.props.children}
      </div>
    );
  }
}

/*
FetchedItem.propTypes = {
};
*/

export default withStyles(s)(FetchedItem);