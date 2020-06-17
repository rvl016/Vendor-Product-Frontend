import React from 'react';

import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';   
import DialogContent from '@material-ui/core/DialogContent'; 
import DialogActions from '@material-ui/core/DialogActions'; 
import Dialog from '@material-ui/core/Dialog'; 

import './DeleteDialogView.scss';


class DeleteDialogView extends React.Component {

  constructor( props) {
    super( props);
    this.state = {
      number_selected: this.props.number_selected,
      open: this.props.open
    }
    this.on_toggle = props.on_toggle;
    this.submit = props.on_submit;
  }

  componentWillReceiveProps( props) {
    this.setState( { number_selected: props.number_selected, 
      open: props.open });
  }

  on_submit = async () => {
    const response = await this.submit();
    if (response.status === 200) return this.on_toggle();
    console.log( "DELETE request failed! Response:");
    console.log( response);
  }

  render() {
    return (
      <Dialog 
        disableBackdropClick 
        open = { this.state.open } 
        onClose = { this.on_toggle }>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>  
          <h4>Are you sure you want to delete { 
            this.state.number_selected } entries?</h4>
        </DialogContent>
        <DialogActions>
          <Button onClick = { this.on_toggle }>
            Cancel
          </Button>
          <Button onClick = { this.on_submit }>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteDialogView;
