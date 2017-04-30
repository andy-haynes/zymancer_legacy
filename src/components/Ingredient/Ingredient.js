import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Ingredient.css';
import { displayKeys, detailDisplay } from '../../constants/IngredientDetails';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';

class Ingredient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { ingredient } = this.props;
    return (
      <div className={s.ingredient}>
        {React.cloneElement(this.props.children, { showDetailModal: this.handleOpen })}
        <Dialog
          title={ingredient.name}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div className="pure-g">
            {ingredient.description && (
              <div className="pure-u-1-1">
                {ingredient.description}
              </div>
            )}
            {Object.keys(ingredient).map((key, i) => detailDisplay[key] && detailDisplay[key](ingredient) ? (
              <div key={`ingredient-detail-${i}`} className="pure-u-1-2">
                <div className={s.detailLabel}>
                  {displayKeys[key]}
                </div>
                <div className={s.detailValue}>
                  {detailDisplay[key](ingredient)}
                </div>
              </div>
            ) : console.log(key))}
          </div>
        </Dialog>
      </div>
    );
  }
}
/*
IngredientDetail.propTypes = {
  onRemove: PropTypes.func.isRequired,
  name:     PropTypes.string.isRequired,
  gravity:  PropTypes.number.isRequired,
  color:    PropTypes.string.isRequired
};
*/
export default withStyles(s)(Ingredient);