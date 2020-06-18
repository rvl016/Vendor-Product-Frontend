import React from 'react';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export const ActionButton = props => (
  <Button 
    tag = { props.tag }
    disabled = { props.disabled }
    edge = "start" 
    className = "action-button" 
    color = "inherit"
    onClick = { props.onClick }
  >
    <Typography>{ props.tag }</Typography>
  </Button>
);
