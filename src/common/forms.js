import React from 'react';

import TextField from '@material-ui/core/TextField';

// Product form ////////////////////////////////////////////////////////////////
export const product_form = {
  name: "",
  code: "",
  price: null
};

export const product_errors = {
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

export const ProductForm = props => (
  <div className = "product-form form" key = { props.index }>
    <div>
      <TextField
        defaultValue = { props.default ? props.default.name : null }
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
        defaultValue = { props.default ? props.default.code : null }
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
        defaultValue = { props.default ? props.default.price : null }
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
)


// Vendor form ////////////////////////////////////////////////////////////////

export const vendor_form = {
  name: "",
  cnpj: "",
  city: ""
};

export const vendor_errors = {
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


export const VendorForm = props => (
  <div className = "vendor-form form">
    <div>
      <TextField
        defaultValue = { props.default ? props.default.name : null }
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
        defaultValue = { props.default ? props.default.cnpj : null }
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
        defaultValue = { props.default ? props.default.city : null }
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
);
