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
      vendor_form: { ...vendor_form },
      vendor_errors: { ...vendor_errors }
    };
    this.on_toggle = props.on_toggle;
    this.submit = props.on_submit;
  }

  componentWillReceiveProps( props) {
    const vendor_data = props.vendors_data.filter( vendor =>
      props.selected[vendor.id])[0];
    this.setState( { open: props.open, 
      vendor_data: vendor_data });
  }

  on_submit = async () => {
    const data = this.make_submition_data();
    const response = await this.submit( data);
    if (response.status === 200) return this.on_toggle();
    this.set_errors( response.body.errors);
  };

  set_errors( errors) {
    const vendor_errors = this.get_vendor_errors( errors);
    this.setState( { vendor_errors }) 
  }

  on_vendor_change = field => event => {
    const vendor_form = this.state.vendor_form;
    vendor_form[field] = event.target.value;
    this.setState( { vendor_form })
  };

  render() {
    if (! this.state.vendor_data)
      return (<></>);
    return (
      <Dialog 
        disableBackdropClick 
        open = { this.state.open } 
        onClose = { this.on_toggle }>
        <DialogTitle>
          Modify { this.state.vendor_data.name } Vendor
        </DialogTitle>
        <DialogContent>
          <form>
            <VendorForm 
              on_change = { this.on_vendor_change }
              errors = { this.state.vendor_errors }
              default = { this.state.vendor_data }
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

  get_vendor_errors( errors) {
    return Object.keys( this.state.vendor_errors).reduce( (acc, key) => ({ 
      [key]: { 
        error: errors.hasOwnProperty( key), 
        message: errors[key] && errors[key][0]
      }, 
      ...acc 
    }), {});
  }

  make_submition_data() {
    const vendor = this.filter_null_and_blanks( this.state.vendor_form);
    return { vendor };
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
    <div className = "vendor-form form">
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
          defaultValue = { props.default.cnpj }
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
          defaultValue = { props.default.city }
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
