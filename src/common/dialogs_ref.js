import React from 'react';
import ControlBarView from '../componets/common/ControlBarView';
import DeleteDialogView from '../components/common/DeleteDialogView';
import ModifyDialogView from '../components/vendors/ModifyDialogView';
import CreateDialogView from '../components/vendors/CreateDialogView';

export const DeleteDialog = React.forwardRef( (props, ref) => (
  <DeleteDialogView ref = { ref } { ...props } />
));

export const CreateDialog = React.forwardRef( (props, ref) => (
  <CreateDialogView ref = { ref } { ...props } />
));

export const ModifyDialog = React.forwardRef( (props, ref) => (
  <ModifyDialogView ref = { ref } { ...props } />
));

export const ControlBar = React.forwardRef( (props, ref) => (
  <ControlBarView ref = { ref } { ...props } />
));