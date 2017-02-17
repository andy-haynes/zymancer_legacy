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
            style={{
              zIndex: 2,
              position: 'absolute',
              top: '1em',
              left: '1em'
            }}
          >
            <CloseIcon />
          </IconButton>
          {React.createElement(this.props.search, {
            dismiss: this.closeDrawer
          })}
        </Drawer>
        <FloatingActionButton
          onTouchTap={this.openDrawer}
          className={s.addIcon}
          mini
        >
          <AddCircleIcon />
        </FloatingActionButton>
        {this.props.children}
      </div>
    );
  }
}
/*
SearchDrawer.propTypes = {
};
*/
export default withStyles(s)(SearchDrawer);