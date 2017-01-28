import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './UserMenu.css';
import RecipeParserContainer from '../../containers/RecipeParser';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import ImportExport from 'material-ui/svg-icons/communication/import-export';
import CodeIcon from 'material-ui/svg-icons/action/code';
import SaveIcon from 'material-ui/svg-icons/content/save';
import ShareIcon from 'material-ui/svg-icons/social/share';
import ClearIcon from 'material-ui/svg-icons/content/clear';
import ContentSave from 'material-ui/svg-icons/content/save';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

class UserMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      parseOpen: false,
      recipeText: ''
    };
  }

  openModal = () => {
    this.setState({ parseOpen: true });
  };

  closeModal = () => {
    this.setState({ parseOpen: false });
  };

  render() {
    const { recipe, authenticated, actions } = this.props;

    return (
      <div>
        <Dialog
          title="Parse Recipe"
          modal={false}
          open={this.state.parseOpen}
          onRequestClose={this.closeModal}
          actions={[
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.closeModal}
            />,
            <FlatButton
              label="Load"
              primary
              onClick={this.closeModal}
            />
          ]}
        >
          <RecipeParserContainer />
        </Dialog>
        <IconMenu
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          targetOrigin={{horizontal: 'right', vertical: 'top'}}
        >
          <MenuItem
            onClick={() => actions.saveRecipe(recipe)}
            primaryText="Save"
            leftIcon={<SaveIcon />}
            disabled={!authenticated}
          />
          <MenuItem
            onClick={this.openModal}
            primaryText="Parse"
            leftIcon={<CodeIcon />}
          />
          <Divider />
          <MenuItem
            onClick={actions.clearRecipe}
            primaryText="Reset"
            leftIcon={<ClearIcon />}
          />
        </IconMenu>
      </div>
    );
  }
}

/*
UserMenu.propTypes = {
};
*/

export default withStyles(s)(UserMenu);