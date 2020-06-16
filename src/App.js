import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import MenuBarView from './components/common/MenuBarView';
import VendorsView from './components/VendorsView';
import VendorView from './components/VendorView';
import ProductsView from './components/ProductsView';

import { mui_theme } from './styles/themes';
import './App.css';


class App extends React.Component {

  render() {
    return (
      <MuiThemeProvider theme = { mui_theme }>
        <MenuBarView/>
        <BrowserRouter>
          <Switch>
            <Route exact path = "/vendors/" render = { props => 
              <VendorsView { ...props } /> } />
            <Route exact path = "/products/" render = { props => 
              <ProductsView { ...props } /> } />
            <Route exact path = "/vendors/:vendor_id/" render = { props => 
              <VendorView { ...props } /> } />
          </Switch>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
