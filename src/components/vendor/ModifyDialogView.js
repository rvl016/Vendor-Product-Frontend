import React from 'react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';   
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogActions from '@material-ui/core/DialogActions'; 
import Dialog from '@material-ui/core/Dialog'; 
import TextField from '@material-ui/core/TextField';

import './ModifyDialogView.scss';

class ModifyDialogView extends React.Component {

  constructor( props) {
    super( props);
    this.state = {
      open: this.props.open,
      product_form: { ...product_form },
      product_errors: { ...product_errors },
      product_id: null
    };
    this.on_toggle = props.on_toggle;
    this.submit = props.on_submit;
  }

  componentWillReceiveProps( props) {
    const product_data = props.products_data.filter( product =>
      props.selected[product.id])[0];
    const product_form = product_data ? this.copy_data_to_form( 
      product_data) : this.state.product_form;
    const product_id = product_data ? product_data.id : null;
    this.setState( { open: props.open, product_form, 
      product_data, product_id });
  }

  on_submit = async () => {
    const data = this.make_submition_data();
    const response = await this.submit( data, this.state.product_id);
    if (response.status === 200) return this.on_toggle();
    this.set_errors( response.body.errors);
  };

  set_errors( errors) {
    const product_errors = this.get_product_errors( errors);
    this.setState( { product_errors }) 
  }

  on_product_change = field => event => {
    const product_form = this.state.product_form;
    product_form[field] = event.target.value;
    this.setState( { product_form })
  };

  render() {
    if (! this.state.product_data)
      return (<></>);
    return (
      <Dialog 
        disableBackdropClick 
        open = { this.state.open } 
        onClose = { this.on_toggle }>
        <DialogTitle>
          Modify { this.state.product_data.name } Vendor
        </DialogTitle>
        <DialogContent>
          <form>
            <VendorForm 
              on_change = { this.on_product_change }
              errors = { this.state.product_errors }
              default = { this.state.product_data }
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick = { this.on_toggle }>
            Cancel
          </Button>
          <Button onClick = { this.on_submit }>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  get_product_errors( errors) {
    return Object.keys( this.state.product_errors).reduce( (acc, key) => ({ 
      [key]: { 
        error: errors.hasOwnProperty( key), 
        message: errors[key] && errors[key][0]
      }, 
      ...acc 
    }), {});
  }

  make_submition_data() {
    const product = this.filter_null_and_blanks( this.state.product_form);
    return { product };
  }

  copy_data_to_form( product_data) {
    const product_form = this.state.product_form;
    product_form.name = product_data.name;
    product_form.code = product_data.code;
    product_form.price = product_data.price;
    return product_form;
  }
  
  filter_null_and_blanks( data) {
    return Object.keys( data).reduce( (acc, key) => ({
      ...( data[key] !== null && data[key] !== "" && { [key]: data[key] }),
      ...acc
    }), {});
  }
}

export default ModifyDialogView;

const VendorForm = props => (
  <>
    <div className = "product-form form">
      <div>
        <TextField
          defaultValue = { props.default.name }
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
          defaultValue = { props.default.code }
          error = { props.errors.code.error }
          margin = 'none'
          id = 'code'
          label = 'UPC-A Code'
          type = 'string'
          variant = 'filled'
          required
          onChange = { props.on_change( 'code') }
          helperText = { props.errors.code.message }
        />
      </div>
      <div>
        <TextField
          defaultValue = { props.default.price }
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
