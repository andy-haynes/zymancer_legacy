import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchDrawer.css';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';

class SearchDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false
    }
  }

  openDrawer = () => this.setState({ drawerOpen: true });
  closeDrawer = () => this.setState({ drawerOpen: false });

  render() {
    return (
      <div className={s.searchDrawer}>
        <Drawer open={this.state.drawerOpen} width={280}>
          <IconButton
            onTouchTap={this.closeDrawer}
            style={{position: 'fixed'}}
          >
            <CloseIcon />
          </IconButton>
          {React.createElement(this.props.search, { dismiss: this.closeDrawer })}
        </Drawer>
        {this.props.children}
        {!this.state.drawerOpen &&
          <FloatingActionButton
            onTouchTap={this.openDrawer}
            className={s.addIcon}
            mini
          >
            <AddCircleIcon />
          </FloatingActionButton>
        }
      </div>
    );
  }
}
/*
SearchDrawer.propTypes = {
};
*/
export default withStyles(s)(SearchDrawer);