import React from 'react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';   
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogActions from '@material-ui/core/DialogActions'; 
import Dialog from '@material-ui/core/Dialog'; 
import TextField from '@material-ui/core/TextField';


import './CreateDialogView.scss';
import { Typography } from '@material-ui/core';

class CreateDialogView extends React.Component {

  constructor( props) {
    super( props);
    this.state = {
      open: this.props.open,
      products_forms: [ { ...product_form }],
      products_errors: [ { ...product_errors }]
    };
    this.products_number = 1;
    this.on_toggle = props.on_toggle;
    this.submit = props.on_submit;
  }

  componentWillReceiveProps( props) {
    this.setState( { open: props.open });
  }

  on_submit = async () => {
    const data = this.make_submition_data();
    console.log( data)
    const response = await this.submit( data);
    if (response.status === 201) return this.on_toggle();
    this.set_errors( response.body.errors);
  };

  set_errors( errors) {
    const products_errors = this.get_products_errors( errors.products);
    this.setState( { products_errors }) 
  }

  on_product_change = index => field => event => {
    const products_forms = this.state.products_forms;
    products_forms[index][field] = event.target.value;
    this.setState( { products_forms });
  };

  on_new_product = () => {
    const products_forms = this.state.products_forms.concat( 
      [ { ...product_form }]);
    const products_errors = this.state.products_errors.concat( 
      [ { ...product_errors }]);
    this.products_number += 1;
    this.setState( { products_forms, products_errors });
  };

  render() {
    return (
      <Dialog 
        disableBackdropClick 
        open = { this.state.open } 
        onClose = { this.on_toggle }>
        <DialogTitle>Create New Products</DialogTitle>
        <DialogContent>
          <form>
            <div className = "products-forms">
            { this.state.products_forms.map( (product_form, idx) => (
              <ProductForm 
                index = { idx }
                key = { idx } 
                on_change = { this.on_product_change( idx) }
                errors = { this.state.products_errors[idx] } 
              />
            ))}
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick = { this.on_toggle }>
            Cancel
          </Button>
          <Button onClick = { this.on_new_product }>
            Add Product
          </Button>
          <Button onClick = { this.on_submit }>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  get_products_errors( errors) { 
    return this.state.products_errors.map( (product_errors, idx) => 
      Object.keys( product_errors).reduce( (acc, key) => ({ 
        [key]: { 
          error: errors[idx] && errors[idx].hasOwnProperty( key), 
          message: errors[idx] && errors[idx][key] && errors[idx][key][0]
        }, 
        ...acc 
      }), {})
    );
  }

  make_submition_data() {
    const products = this.state.products_forms.map( 
      product_form => this.filter_null_and_blanks( product_form)
    );
    return { products };
  }

  filter_null_and_blanks( data) {
    return Object.keys( data).reduce( (acc, key) => ({
      ...( data[key] != null && data[key] != "" && { [key]: data[key] }),
      ...acc
    }), {});
  }
}

export default CreateDialogView;

const ProductForm = props => (
  <>
    <div><Typography>Product { props.index + 1 }</Typography></div>
    <div className = "product-form form" key = { props.index }>
      <div>
        <TextField
          error = { props.errors.name.error }
          margin = 'none'
          id = 'name'
          label = 'Name'
          type = 'name'
          variant = 'filled'
          required
          onChange = { props.on_change( 'name') }
          helperText = { props.errors.name.message }
        />
      </div>
      <div>
        <TextField
          error = { props.errors.code.error || props.errors.__all__.error }
          margin = 'none'
          id = 'username'
          label = 'UPC-A code'
          type = 'string'
          variant = 'filled'
          required
          onChange = { props.on_change( 'code') }
          helperText = { props.errors.code.message 
            || props.errors.__all__.message }
        />
      </div>
      <div>
        <TextField
          error = { props.errors.price.error }
          margin = 'none'
          id = 'price'
          label = 'Price'
          type = 'number'
          variant = 'filled'
          onChange = { props.on_change( 'price') }
          helperText = { props.errors.price.message }
        />
      </div>
    </div>
  </>
);

const product_form = { 
  name: "",
  code: "",
  price: null
};

const product_errors = {
  name: {
    error: false,
    message: null
  },
  code: {
    error: false,
    message: null
  },
  price: {
    error: false,
    message: null
  },
  __all__: {
    error: false,
    message: null
  }
};
