import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

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
    <TableRow hover>
      <TableCell padding = "checkbox"></TableCell>
      <TableCell>Company</TableCell>
      <TableCell align = "right">CNPJ</TableCell>
      <TableCell align = "right">City</TableCell>
    </TableRow>
  </TableHead>
);

const VendorsTableContent = props => (
  <>
   { (props.rows_per_page > 0 ? props.vendors_data.slice( 
      props.current_page * props.rows_per_page, 
      (props.current_page + 1) * props.rows_per_page)
      : props.vendors_data).map( vendor_data => (
      <TableRow
        hover 
        key = { vendor_data.id } 
        style = {{ cursor: 'pointer' }}
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
        <TableCell 
          onClick = { event => props.onClick( event, vendor_data.id) }
        >
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

export default VendorsTable; 