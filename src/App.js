import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import MenuBarView from './components/common/MenuBarView';
import VendorsView from './components/VendorsView';
import VendorView from './components/VendorView';

import { APP_BASE } from './common/request_helpers';

import { mui_theme } from './styles/themes';
import './App.css';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      view_name: "Vendors View",
      backdrop_open: false,
    }
  }

  set_view_name = view_name => {
    this.setState( { view_name })
  };

  render() {
    return (
      <MuiThemeProvider theme = { mui_theme }>
        <BrowserRouter>
          <MenuBarView view_name = { this.state.view_name }/>
          <div className = "spacer"></div>
          <Switch>
            <Route exact path = { APP_BASE + "/vendors/" } render = { props => 
              <VendorsView { ...props }
                set_view_name = { this.set_view_name } /> } />
            <Route exact path = { APP_BASE + "/vendors/:vendor_id/" } 
              render = { props => 
              <VendorView
                set_view_name = { this.set_view_name } /> } />
            <Redirect to = { APP_BASE + "/vendors/" } />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
