import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import MenuBarView from './components/common/MenuBarView';
import VendorsView from './components/VendorsView';
import VendorView from './components/VendorView';
import ProductsView from './components/ProductsView';

import { mui_theme } from './styles/themes';
import './App.css';


class App extends React.Component {

  constructor() {
    super();
    this.state = {
      view_name: "Vendors View"
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
            <Route exact path = "/vendors/" render = { props => 
              <VendorsView { ...props } 
                set_view_name = { this.set_view_name } /> } />
            <Route exact path = "/products/" render = { props => 
              <ProductsView { ...props } 
                set_view_name = { this.set_view_name } /> } />
            <Route exact path = "/vendors/:vendor_id/" render = { props => 
              <VendorView { ...props } 
                set_view_name = { this.set_view_name } /> } />
            <Redirect to = "/vendors/" />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
