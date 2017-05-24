import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './IngredientDetail.css';
import { displayKeys, detailDisplay } from '../../constants/IngredientDetailDisplay';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentRemoveCircle from 'material-ui/svg-icons/content/remove-circle';

class IngredientDetail extends React.Component {
  static propTypes = {
    ingredient: DefinedTypes.ingredientDetail.isRequired,
    children: PropTypes.element.isRequired
  };

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
            {(ingredient.description || ingredient.flavor) && (
              <div className="pure-u-1-1">
                {ingredient.description || ingredient.flavor}
                <hr />
              </div>
            )}
            {Object.keys(ingredient).map((key, i) => (detailDisplay[key] && detailDisplay[key](ingredient) && (
              <div key={`ingredient-detail-${i}`} className="pure-u-1-2">
                <div className={s.detailLabel}>
                  {displayKeys[key]}
                </div>
                <div className={s.detailValue}>
                  {detailDisplay[key](ingredient)}
                </div>
              </div>
            )) || '')}
          </div>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(s)(IngredientDetail);