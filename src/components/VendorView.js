import React from 'react';
import { withRouter } from "react-router-dom";

import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import ControlBarView from './common/ControlBarView';
import DeleteDialogView from './common/DeleteDialogView';
import ModifyDialogView from './vendor/ModifyDialogView';
import CreateDialogView from './vendor/CreateDialogView';

import ProductsTable from './vendor/table';

import Search from '../common/search';
import * as helper from '../common/request_helpers';  
import './VendorView.scss';

class VendorView extends React.Component {

  constructor( props) {
    super( props);
    this.set_view_name = this.props.set_view_name;
    this.state = {
      products_data: [],
      vendor_data: {},
      selected: {},
      current_page: 0,
      number_selected: 0,
      rows_per_page: 10,

      delete_dialog_open: false,
      create_dialog_open: false,
      modify_dialog_open: false
    };
  }

  async componentDidMount() {
    this.vendor_id = this.props.match.params.vendor_id;
    await this.get_products();
    await this.get_vendor();
    this.set_view_name( `${ this.state.vendor_data.name } Products View`);
  }

  async get_vendor() {
    const response = await this.get_vendor_request();
    const vendor_data = response.body.data;
    this.setState( { vendor_data });
  }

  async get_products() {
    const response = await this.get_products_request();
    if (response.status != 200) return;
    const products_data = response.body.data;
    this.update_state_with( products_data);
    Search.set_terms( this.state.products_data);
  }

  make_products = async (products_data) => {
    const response = await this.post_products_request( products_data);
    if (response.status !== 201) return response
    await this.get_products();
    return response;
  }

  modify_product = async (product_data, product_id) => {
    const response = await this.put_product_request( 
      product_data, product_id);
    if (response.status !== 200) return response
    this.setState( { number_selected: 0 });
    await this.get_products();
    return response;
  };

  remove_products = async () => {
    const products_id = this.state.products_data.reduce( (acc, product) => 
      this.state.selected[product.id] ? acc.concat( product.id) : acc, []);
    const response = await this.delete_products_request( { 
      products: products_id 
    });
    if (response.status !== 200) return response;
    this.clean_products( products_id);
    return response;
  }

  clean_products( products_id) {
    const updated_products = this.state.products_data.filter( product => 
      ! products_id.includes( product.id));
    this.setState( { number_selected: 0 });
    this.update_state_with( updated_products);
  }
  
  on_search = event => {
    const phrase = event.target.value;
    if (phrase === null || phrase === "") 
      return;
    this.setState( { products_data: Search.get_ordered_records( phrase) });
  }

  on_row_check = (event, product_id) => {
    const selected = { ...this.state.selected, 
      [product_id]: ! this.state.selected[product_id] };
    const number_selected = this.state.number_selected + 
      (selected[product_id] ? 1 : -1);
    this.setState( { selected, number_selected });
  }

  on_page_change = (event, new_page) => {
    this.setState( { current_page: new_page });
  }

  on_rows_per_page_change = event => {
    const rows_per_page = parseInt( event.target.value, 10);
    this.setState( { current_page: 0, rows_per_page });
  }

  render() {
    return (
      <div>
        <Paper className = "table-background">
          <TextField
            className = "search-bar"
            label = 'Search'
            type = 'string'
            variant = 'filled'
            disabled = { this.state.products_data.length === 0 }
            onChange = { this.on_search }
          />
          <ProductsTable { ...this.state } onCheck = { this.on_row_check } 
            onClick = { this.on_row_click }></ProductsTable>
          <TablePagination
            component = "div"
            count = { this.state.products_data.length }
            rowsPerPage = { this.state.rows_per_page }
            page = { this.state.current_page }
            onChangePage = { this.on_page_change }
            onChangeRowsPerPage = { this.on_rows_per_page_change }
            rowsPerPageOptions = { [10, 25, { label: 'All', value: -1 }] }
            SelectProps = { {
              inputProps: { 'aria-label': 'rows per page' },
              native: true,
            } }
          />
        </Paper>
        <CreateDialogView
          on_submit = { this.make_products } 
          open = { this.state.create_dialog_open }
          on_toggle = { this.toggle_create_dialog } 
        />
        <ModifyDialogView
          on_submit = { this.modify_product }
          open = { this.state.modify_dialog_open }
          products_data = { this.state.products_data }
          selected = { this.state.selected }
          on_toggle = { this.toggle_modify_dialog } 
        />
        <DeleteDialogView
          on_submit = { this.remove_products } 
          number_selected = { this.state.number_selected }
          open = { this.state.delete_dialog_open } 
          on_toggle = { this.toggle_delete_dialog } 
        />
        <ControlBarView
          number_selected = { this.state.number_selected }
          toggle_delete = { this.toggle_delete_dialog } 
          toggle_create = { this.toggle_create_dialog } 
          toggle_modify = { this.toggle_modify_dialog }
        />
      </div>
    );
  }

  update_state_with( products_data) {
    const selected = products_data.reduce( (acc, product_data) => ({ 
      [product_data.id]: false, ...acc 
    }), {});
    Search.set_terms( products_data);
    this.setState( { products_data, selected, number_selected: 0 });
  }
  
  toggle_create_dialog = () => {
    this.setState( { create_dialog_open: ! this.state.create_dialog_open });
  }

  toggle_modify_dialog = () => {
    this.setState( { modify_dialog_open: ! this.state.modify_dialog_open });
  }

  toggle_delete_dialog = () => {
    this.setState( { delete_dialog_open: ! this.state.delete_dialog_open });
  }

  async get_vendor_request() {
    const request = helper.make_request_on_by_with( 
      helper.VENDOR_URL, { method: 'GET', id: this.vendor_id });
    return await helper.call_api( request.url, request.request);
  }

  async get_products_request() {
    const request = helper.make_request_on_by_with( 
      helper.VENDOR_PRODUCTS_URL, { method: 'GET', id: this.vendor_id });
    return await helper.call_api( request.url, request.request);
  }

  async post_products_request( products_data) {
    const request = helper.make_request_on_by_with( 
      helper.VENDOR_PRODUCTS_URL, { method: 'POST', id: this.vendor_id },
      products_data);
    return await helper.call_api( request.url, request.request);
  }

  async put_product_request( product_data, product_id) {
    const request = helper.make_request_on_by_with( 
      helper.PRODUCT_URL, { method: 'PUT', id: product_id },
      product_data);
    return await helper.call_api( request.url, request.request);
  }

  async delete_products_request( products_id) {
    const request = helper.make_request_on_by_with( 
      helper.PRODUCTS_URL, { method: 'DELETE', id: this.vendor_id },
      products_id);
    return await helper.call_api( request.url, request.request);
  }

}

export default withRouter( VendorView);

