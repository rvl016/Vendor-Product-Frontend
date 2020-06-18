import React from 'react';

import { ActionButton } from '../../common/buttons';

import './ControlBarView.scss';


class ControlBarView extends React.Component {

  constructor( props) {
    super( props);
    
    this.toggle_create_dialog = props.toggle_create ? 
      props.toggle_create : null;
    this.toggle_delete_dialog = props.toggle_delete ? 
      props.toggle_delete : null;
    this.toggle_modify_dialog = props.toggle_modify ? 
      props.toggle_modify : null;

    this.state = {
      number_selected: 0
    }
  }

  componentWillReceiveProps( props) {
    this.setState( { number_selected: props.number_selected });
  }

  render() {
    return (
      <div className = "control-bar" >
        <div className = "buttons">
          <div id = "create-button">
            <ActionButton tag = "New"
              onClick = { this.toggle_create_dialog }/>
          </div>
          <div id = "modify-button">
            <ActionButton tag = "Modify"
              disabled = { this.state.number_selected !== 1 }
              onClick = { this.toggle_modify_dialog }/>
          </div>
          <div id = "delete-button">
            <ActionButton tag = "Delete" 
              disabled = { this.state.number_selected === 0 }
              onClick = { this.toggle_delete_dialog }/> 
          </div>
        </div>
        <div className = "selected-div">
          <p className = "selected-field">
            Selected: { this.state.number_selected }
          </p>
        </div>
      </div>
    );
  }
}

export default ControlBarView;

