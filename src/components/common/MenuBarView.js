import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from "prop-types";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { ActionButton } from '../../common/buttons';

import './MenuBarView.scss';

class MenuBarView extends React.Component {

  constructor( props) {
    super( props);
    this.state = {
      view_name: null
    }
  }

  static propTypes = {
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
  };

  componentWillReceiveProps( props) {
    const view_name = props.view_name;
    this.setState( { view_name });
  }

  render() {
    return (
      <AppBar 
        position = "sticky" 
        color = "primary"
        className = "app-bar" >
        <Toolbar className = "tool-bar" variant = 'dense'>
          <Typography variant = "h6">
            { this.state.view_name }
          </Typography>
          <div className = "app-bar-buttons">
            <div>
              <ActionButton tag = "All Vendors" 
                onClick = { () => this.props.history.push( "/vendors") }
                disabled = { this.state.view_name === "Vendors View" }
              />
            </div>
          </div>
        </Toolbar>
      </AppBar>
    );
  };
};

export default withRouter( MenuBarView);
