import React from 'react';

import './index.scss';
import { withTranslation } from 'react-i18next';

class Checkbox extends React.Component {
  render() {
    let { name, text, checked, onCheckBoxChange, disabled } = this.props;
    const { t } = this.props;
    return (
      <div className="form-check mb-0 d-flex align-items-center">
        <input
          name={name}
          id={`id_${name}`}
          className={`form-check-input cursor-pointer p-11`}
          type="checkbox"
          checked={checked}
          onChange={onCheckBoxChange}
          disabled={disabled}
        />
        <label
          className="form-check-label cursor-pointer mt-1 ms-2 text-black"
          htmlFor={`id_${name}`}
        >
          {t(text)}
        </label>
      </div>
    );
  }
}

export default withTranslation('common')(Checkbox);
