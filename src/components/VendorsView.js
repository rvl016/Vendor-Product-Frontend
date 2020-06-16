import React from 'react';
import * as helper from '../common/helpers';  

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';

import ControlBarView from './common/ControlBarView';
import './VendorsView.scss';

class VendorsView extends React.Component {

  constructor() {
    super();
    this.state = {
      vendors_data: [],
      selected: {},
      current_page: 0,
      number_selected: 0,
      rows_per_page: 10
    };
  }

  async componentDidMount() {
    await this.get_vendors();
  }

  async make_vendor() {

  }

  

  async get_vendors() {
    const response_body = await this.get_vendors_request();
    const vendor_data = response_body.data;
    this.update_state_with( vendor_data);
  }

  async remove_vendors() {
    const vendors_id = this.state.vendor_data.reduce( (acc, vendor) => 
      this.state.selected[vendor.id] ? acc.concat( vendor.id) : acc, []);
    try {
      await this.delete_vendors_request( vendors_id);
      this.clean_vendors( vendors_id);
    }
    catch (error) {
      console.log( error.message);
    }
  }

  clean_vendors( vendors_id) {
    const updated_vendors = this.state.vendors_data.filter( vendor => 
      vendors_id.includes( vendor.id));
    this.update_state_with( updated_vendors);
  }

  on_row_click = (event, vendor_id) => {
    this.props.history.push( `/vendors/${ vendor_id }`); 
  }

  on_row_check = (event, vendor_id) => {
    const selected = { ...this.state.selected, 
      [vendor_id]: ! this.state.selected[vendor_id] };
    const number_selected = this.state.number_selected + 
      selected[vendor_id] ? 1 : -1;
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
        <Paper class = "table-background">
          <VendorsTable { ...this.state } onCheck = { this.on_row_check } 
            onClick = { this.on_row_click }></VendorsTable>
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
        <ControlBarView { ...this.state } />
      </div>
    );
  }

  update_state_with( vendors_data) {
    const selected = vendors_data.reduce( (acc, vendor_data) => ({ 
      [vendor_data.id]: false, ...acc 
    }), {});
    this.setState( { vendors_data, selected });
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

  async delete_vendors_request( vendors_id) {
    const request = helper.make_request_on_by_with( helper.VENDORS_URL, 
      { method: 'DELETE' }, vendors_id);
    return await helper.call_api( request.url, request.request);
  }

}

export default VendorsView;


const VendorsTable = props => (
  <TableContainer>
    <Table stickyHeader aria-label = "sticky table">
      <VendorsTableHead/>
      <TableBody>
        <VendorsTableContent { ...props }/>
      </TableBody>
    </Table>
  </TableContainer>
);

const VendorsTableHead = props => (
  <TableHead>
    <TableRow>
      <TableCell padding = "checkbox"></TableCell>
      <TableCell>Company</TableCell>
      <TableCell align = "right">CNPJ</TableCell>
      <TableCell align = "right">City</TableCell>
    </TableRow>
  </TableHead>
);

const VendorsTableContent = props => (
  <>
    { props.vendors_data.map( vendor_data => (
      <TableRow
        hover 
        key = { vendor_data.id } 
        role = "checkbox"
        aria-checked = { props.selected[vendor_data.id] }
        tabIndex = { -1 }
        selected = { props.selected[vendor_data.id] }
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked = { props.selected[vendor_data.id] }
            onClick = { event => props.onCheck( event, vendor_data.id) }
            inputProps = {{ 'aria-labelledby': vendor_data.id }}
          />
        </TableCell>
        <TableCell onClick = { event => props.onClick( event, vendor_data.id) }>
          { vendor_data.name }</TableCell>
        <TableCell align="right" 
          onClick = { event => props.onClick( event, vendor_data.id) }>
          { vendor_data.cnpj }</TableCell>
        <TableCell align="right"
          onClick = { event => props.onClick( event, vendor_data.id) }>
          { vendor_data.city || "Not Available" }</TableCell>
      </TableRow>
    ))}
  </>
);
