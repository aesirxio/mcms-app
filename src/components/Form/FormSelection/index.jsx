import React, { Component } from 'react';

import SelectComponent from '../../../components/Select';
import './index.scss';

class FormSelection extends Component {
  constructor(props) {
    super(props);

    this.field = this.props.field;
  }

  render() {
    return (
      <SelectComponent
        value={this.field.value}
        options={this.field.options}
        // className="mb-3 text-danger"
        isBorder={true}
        plColor="rgba(8, 18, 64, 0.8)"
        //onFocus={this.field.changed}
        onBlur={this.field.blurred}
        isMulti={this.field.isMulti}
        onChange={this.field.changed}
      />
    );
  }
}

export default FormSelection;
