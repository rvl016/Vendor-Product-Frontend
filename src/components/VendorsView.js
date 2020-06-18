import React from 'react';

import TablePagination from '@material-ui/core/TablePagination';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';

import ControlBarView from './common/ControlBarView';
import DeleteDialogView from './common/DeleteDialogView';
import ModifyDialogView from './vendors/ModifyDialogView';
import CreateDialogView from './vendors/CreateDialogView';

import VendorsTable from './vendors/table';

import Search from '../common/search';
import * as helper from '../common/request_helpers';  
import './VendorsView.scss';

class VendorsView extends React.Component {

  constructor( props) {
    super( props);
    props.set_view_name( "Vendors View");

    this.state = {
      vendors_data: [],
      selected: {},

      number_selected: 0,
      current_page: 0,
      rows_per_page: 10,

      delete_dialog_open: false,
      create_dialog_open: false,
      modify_dialog_opne: false
    };
  }

  async componentDidMount() {
    await this.get_vendors();
  }

  make_vendor = async (vendor_data) => {
    const response = await this.post_vendor_request( vendor_data);
    if (response.status !== 201) return response
    await this.get_vendors();
    return response;
  }

  async get_vendors() {
    const response = await this.get_vendors_request();
    if (response.status != 200) return;
    const vendor_data = response.body.data;
    this.update_state_with( vendor_data);
    Search.set_terms( this.state.vendors_data);
  }

  modify_vendor = async (vendor_data, vendor_id) => {
    const response = await this.put_vendor_request( vendor_data, vendor_id);
    if (response.status !== 200) return response
    this.setState( { number_selected: 0 });
    await this.get_vendors();
    return response;
  };

  remove_vendors = async () => {
    const vendors_id = this.state.vendors_data.reduce( (acc, vendor) => 
      this.state.selected[vendor.id] ? acc.concat( vendor.id) : acc, []);
    const response = await this.delete_vendors_request( { 
      vendors: vendors_id 
    });
    if (response.status !== 200) return response;
    this.clean_vendors( vendors_id);
    return response;
  }

  clean_vendors( vendors_id) {
    const updated_vendors = this.state.vendors_data.filter( vendor => 
      ! vendors_id.includes( vendor.id));
    this.setState( { number_selected: 0 });
    this.update_state_with( updated_vendors);
  }

  on_search = event => {
    const phrase = event.target.value;
    if (phrase === null || phrase === "") 
      return;
    this.setState( { vendors_data: Search.get_ordered_records( phrase) });
  }

  on_row_click = (event, vendor_id) => {
    this.props.history.push( `${ helper.APP_BASE }/vendors/${ vendor_id }`); 
  }

  on_row_check = (event, vendor_id) => {
    const selected = { ...this.state.selected, 
      [vendor_id]: ! this.state.selected[vendor_id] };
    const number_selected = this.state.number_selected + 
      (selected[vendor_id] ? 1 : -1);
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
            disabled = { this.state.vendors_data.length === 0 }
            onChange = { this.on_search }
          />
          <VendorsTable { ...this.state } onCheck = { this.on_row_check } 
            onClick = { this.on_row_click } 
          />
          <TablePagination
            component = "div"
            count = { this.state.vendors_data.length }
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
          on_submit = { this.make_vendor } 
          open = { this.state.create_dialog_open }
          on_toggle = { this.toggle_create_dialog } 
        />
        <ModifyDialogView
          on_submit = { this.modify_vendor } 
          open = { this.state.modify_dialog_open } 
          vendors_data = { this.state.vendors_data }
          selected = { this.state.selected }
          on_toggle = { this.toggle_modify_dialog } 
        />
        <DeleteDialogView
          on_submit = { this.remove_vendors } 
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

  update_state_with( vendors_data) {
    const selected = vendors_data.reduce( (acc, vendor_data) => ({ 
      [vendor_data.id]: false, ...acc 
    }), {});
    Search.set_terms( vendors_data);
    this.setState( { vendors_data, selected, number_selected: 0 });
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

  async get_vendors_request() {
    const request = helper.make_request_on_by_with( helper.VENDORS_URL, 
      { method: 'GET' });
    return await helper.call_api( request.url, request.request);
  }

  async post_vendor_request( vendor_data) {
    const request = helper.make_request_on_by_with( helper.VENDORS_URL, 
      { method: 'POST' }, vendor_data);
    return await helper.call_api( request.url, request.request);
  }

  async put_vendor_request( vendor_data, vendor_id) {
    const request = helper.make_request_on_by_with( helper.VENDOR_URL, 
      { method: 'PUT', id: vendor_id }, vendor_data);
    return await helper.call_api( request.url, request.request);
  }

  async delete_vendors_request( vendors_id) {
    const request = helper.make_request_on_by_with( helper.VENDORS_URL, 
      { method: 'DELETE' }, vendors_id);
    return await helper.call_api( request.url, request.request);
  }

}

export default VendorsView;
