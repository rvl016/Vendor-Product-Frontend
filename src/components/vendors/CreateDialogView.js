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
      number_selected: this.props.number_selected,
      open: this.props.open,
      vendor_form: { ...vendor_form },
      products_forms: [],
      vendor_errors: { ...vendor_errors },
      products_errors: []
    };
    this.products_number = 0;
    this.on_toggle = props.on_toggle;
    this.submit = props.on_submit;
  }

  componentWillReceiveProps( props) {
    this.setState( { number_selected: props.number_selected, 
      open: props.open });
  }

  on_submit = async () => {
    const data = this.make_submition_data();
    console.log( data)
    const response = await this.submit( data);
    if (response.status === 201) return this.on_toggle();
    console.log( response.body);
    this.set_errors( response.body.errors);
  };

  set_errors( errors) {
    const vendor_errors = this.get_vendor_errors( 
      this.products_number === 0 ? errors : errors.vendor);
    const products_errors = this.products_number === 0 ? 
      [] : this.get_products_errors( errors.products);
    this.setState( { vendor_errors, products_errors }) 
  }

  on_vendor_change = field => event => {
    const vendor_form = this.state.vendor_form;
    vendor_form[field] = event.target.value;
    this.setState( { vendor_form })
  };

  on_product_change = index => field => event => {
    console.log( index)
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
        <DialogTitle>Create New Vendor</DialogTitle>
        <DialogContent>
          <form>
            <VendorForm 
              on_change = { this.on_vendor_change }
              errors = { this.state.vendor_errors }
            />
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

  get_vendor_errors( errors) {
    return Object.keys( this.state.vendor_errors).reduce( (acc, key) => ({ 
      [key]: { 
        error: errors.hasOwnProperty( key), 
        message: errors[key] && errors[key][0]
      }, 
      ...acc 
    }), {});
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
    const vendor = this.filter_null_and_blanks( this.state.vendor_form);
    const products = this.state.products_forms.map( 
      product_form => this.filter_null_and_blanks( product_form)
    );
    return {
      vendor,
      ...( products.length > 0 && { products })
    };
  }

  filter_null_and_blanks( data) {
    return Object.keys( data).reduce( (acc, key) => ({
      ...( data[key] != null && data[key] != "" && { [key]: data[key] }),
      ...acc
    }), {});
  }
}

export default CreateDialogView;

const VendorForm = props => (
  <>
    <div><Typography>Vendor</Typography></div>
    <div className = "vendor-form form">
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
          error = { props.errors.cnpj.error }
          margin = 'none'
          id = 'username'
          label = 'CNPJ'
          type = 'string'
          variant = 'filled'
          required
          onChange = { props.on_change( 'cnpj') }
          helperText = { props.errors.cnpj.message }
        />
      </div>
      <div>
        <TextField
          error = { props.errors.city.error }
          margin = 'none'
          id = 'city'
          label = 'City'
          type = 'city'
          variant = 'filled'
          onChange = { props.on_change( 'city') }
          helperText = { props.errors.city.message }
        />
      </div>
    </div>
  </>
);

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
          error = { props.errors.code.error }
          margin = 'none'
          id = 'username'
          label = 'UPC-A code'
          type = 'string'
          variant = 'filled'
          required
          onChange = { props.on_change( 'code') }
          helperText = { props.errors.code.message }
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
  }
};

const vendor_form = {
  name: "",
  cnpj: "",
  city: ""
};

const vendor_errors = {
  name: {
    error: false,
    message: null
  },
  cnpj: {
    error: false,
    message: null
  },
  city: {
    error: false,
    message: null
  }
};
