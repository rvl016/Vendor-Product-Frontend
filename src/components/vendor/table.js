import React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Checkbox from '@material-ui/core/Checkbox';

const ProductsTable = props => (
  <TableContainer>
    <Table stickyHeader aria-label = "sticky table">
      <ProductsTableHead/>
      <TableBody>
        <ProductsTableContent { ...props }/>
      </TableBody>
    </Table>
  </TableContainer>
);

const ProductsTableHead = props => (
  <TableHead>
    <TableRow hover>
      <TableCell padding = "checkbox"></TableCell>
      <TableCell>Product Name</TableCell>
      <TableCell align = "right">UPC-A Code</TableCell>
      <TableCell align = "right">Price</TableCell>
    </TableRow>
  </TableHead>
);

const ProductsTableContent = props => (
  <>
   { (props.rows_per_page > 0 ? props.products_data.slice( 
      props.current_page * props.rows_per_page, 
      (props.current_page + 1) * props.rows_per_page)
      : props.products_data).map( product_data => (
      <TableRow
        hover 
        key = { product_data.id } 
        role = "checkbox"
        aria-checked = { props.selected[product_data.id] }
        tabIndex = { -1 }
        selected = { props.selected[product_data.id] }
      >
        <TableCell padding="checkbox">
          <Checkbox
            checked = { props.selected[product_data.id] }
            onClick = { event => props.onCheck( event, product_data.id) }
            inputProps = {{ 'aria-labelledby': product_data.id }}
          />
        </TableCell>
        <TableCell>
          { product_data.name }</TableCell>
        <TableCell align="right" >
          { product_data.code }</TableCell>
        <TableCell align="right" >
          { product_data.price || "Not Available" }</TableCell>
      </TableRow>
    ))}
  </>
);

export default ProductsTable;
